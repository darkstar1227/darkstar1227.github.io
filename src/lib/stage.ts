// Scroll stage controller. Lives outside React so scrolling never triggers a render.
//
// Pages are `main > .pin` sections. Each one is `position: sticky` with `top: --stick`, where
// --stick = min(0, viewport - height): a page pins once its bottom reaches the bottom of the
// screen and the next page slides over it. One wheel gesture at a page edge flips to the next
// page with native smooth scrolling (compositor-driven, so it stays smooth even if the main
// thread is busy). Everything is measured once and cached; scroll handlers never read layout.

import { SCENES } from '../data/content'

type Page = { top: number; height: number }

let pages: Page[] = []
let sceneTops: number[] = []
let scene = 0
const listeners = new Set<() => void>()

let started = false
let reduceMotion = false
let flipping = false
let flipTimer = 0
let restUntil = 0
let scrollRaf = 0
let measureRaf = 0
let revealIO: IntersectionObserver | null = null
let ro: ResizeObserver | null = null

export function subscribeScene(cb: () => void) {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}
export const getScene = () => scene
export const getServerScene = () => 0

function setScene(next: number) {
  if (next === scene) return
  scene = next
  listeners.forEach((l) => l())
}

function measure() {
  measureRaf = 0
  const main = document.querySelector('main')
  if (!main) return
  const vh = window.innerHeight
  const pins = Array.from(main.children).filter((el): el is HTMLElement => el.classList.contains('pin'))
  const foot = document.querySelector<HTMLElement>('.site-foot')
  let y = main.getBoundingClientRect().top + window.scrollY
  pages = pins.map((el, i) => {
    if (ro && !el.dataset.sized) {
      el.dataset.sized = '1'
      ro.observe(el)
    }
    const h = el.offsetHeight
    el.style.setProperty('--stick', `${Math.min(0, vh - h)}px`)
    // The last page also owns the footer so the very end of the document stays reachable.
    const page = { top: y, height: i === pins.length - 1 && foot ? h + foot.offsetHeight : h }
    y += h
    return page
  })
  sceneTops = SCENES.map((id) => {
    const idx = pins.findIndex((el) => el.id === id)
    return idx >= 0 ? pages[idx].top : Number.POSITIVE_INFINITY
  })
  updateScene()
}

export function remeasure() {
  if (!measureRaf) measureRaf = requestAnimationFrame(measure)
}

function updateScene() {
  const probe = window.scrollY + window.innerHeight * 0.5
  let next = 0
  for (let i = 0; i < sceneTops.length; i++) if (sceneTops[i] <= probe) next = i
  setScene(next)
}

function onScroll() {
  if (scrollRaf) return
  scrollRaf = requestAnimationFrame(() => {
    scrollRaf = 0
    updateScene()
  })
}

function endFlip() {
  if (!flipping) return
  flipping = false
  window.clearTimeout(flipTimer)
  restUntil = performance.now() + 380 // swallow trackpad momentum: one gesture, one page
}

function flipTo(top: number) {
  flipping = true
  window.scrollTo({ top, behavior: 'smooth' })
  window.clearTimeout(flipTimer)
  flipTimer = window.setTimeout(endFlip, 1100) // fallback where `scrollend` is unsupported
}

function onWheel(e: WheelEvent) {
  if (reduceMotion || e.ctrlKey || !pages.length) return
  const now = performance.now()
  if (flipping || now < restUntil) {
    e.preventDefault()
    return
  }
  const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY
  if (Math.abs(dy) < 2) return
  const vh = window.innerHeight
  const y = window.scrollY
  let i = 0
  for (let k = 0; k < pages.length; k++) if (pages[k].top <= y + 2) i = k
  const cur = pages[i]
  const end = cur.top + Math.max(0, cur.height - vh)

  if (dy > 0) {
    if (y < end - 2) {
      // Inside a page taller than the screen: scroll normally, but stop at its bottom edge first.
      if (y + dy >= end) {
        e.preventDefault()
        window.scrollTo({ top: end, behavior: 'instant' })
        restUntil = now + 380
      }
      return
    }
    if (i < pages.length - 1) {
      e.preventDefault()
      flipTo(pages[i + 1].top)
    }
    return
  }
  if (y > cur.top + 2) {
    if (y + dy <= cur.top) {
      e.preventDefault()
      window.scrollTo({ top: cur.top, behavior: 'instant' })
      restUntil = now + 380
    }
    return
  }
  if (i > 0) {
    const prev = pages[i - 1]
    e.preventDefault()
    flipTo(prev.top + Math.max(0, prev.height - vh))
  }
}

/** Jump to a section from the nav, with a view transition where supported. */
export function goTo(id: string) {
  const idx = SCENES.indexOf(id as (typeof SCENES)[number])
  const top = idx >= 0 ? sceneTops[idx] : undefined
  if (top === undefined || !Number.isFinite(top)) return
  const target = id === 'top' ? 0 : top
  const jump = () => window.scrollTo({ top: target, behavior: 'instant' })
  if (reduceMotion || !document.startViewTransition) {
    window.scrollTo({ top: target, behavior: reduceMotion ? 'instant' : 'smooth' })
    return
  }
  document.startViewTransition(jump)
}

function onClick(e: MouseEvent) {
  const a = (e.target as Element | null)?.closest?.('a[href^="#"]')
  if (!a) return
  const id = a.getAttribute('href')!.slice(1)
  if (!SCENES.includes(id as (typeof SCENES)[number])) return
  e.preventDefault()
  goTo(id)
}

/** Watch `[data-reveal]` elements and mark them `data-in` once they come into view. */
export function scanReveals() {
  if (!started) return
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-in])')
  if (reduceMotion || !revealIO) {
    els.forEach((el) => el.setAttribute('data-in', ''))
    return
  }
  els.forEach((el) => revealIO!.observe(el))
}

export function startStage() {
  started = true
  reduceMotion = !document.documentElement.classList.contains('motion')
  if (!reduceMotion && 'IntersectionObserver' in window) {
    revealIO = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (!en.isIntersecting) continue
          en.target.setAttribute('data-in', '')
          revealIO!.unobserve(en.target)
        }
      },
      { threshold: 0.12 },
    )
  }
  if ('ResizeObserver' in window) ro = new ResizeObserver(remeasure)

  window.addEventListener('resize', remeasure)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('scrollend', endFlip)
  window.addEventListener('wheel', onWheel, { passive: false })
  document.addEventListener('click', onClick)
  document.fonts?.ready.then(remeasure)

  measure()
  scanReveals()

  return () => {
    started = false
    document.querySelectorAll<HTMLElement>('main > .pin').forEach((el) => delete el.dataset.sized)
    window.removeEventListener('resize', remeasure)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('scrollend', endFlip)
    window.removeEventListener('wheel', onWheel)
    document.removeEventListener('click', onClick)
    revealIO?.disconnect()
    ro?.disconnect()
    cancelAnimationFrame(scrollRaf)
    cancelAnimationFrame(measureRaf)
    window.clearTimeout(flipTimer)
  }
}
