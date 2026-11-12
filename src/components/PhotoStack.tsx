import { useEffect, useRef, useState } from 'react'
import { STACK_PHOTOS, STACK_WIDTHS } from '../data/photos'
import { getScene } from '../lib/stage'

/** How long each photo stays on top, and how long the top card takes to fly out. */
const HOLD_MS = 4000
const OUT_MS = 480
/** Card positions past this are kept invisible behind the stack. */
const VISIBLE = 3
const SIZES = '(max-width: 1000px) 300px, 420px'

const srcSet = (base: string, ext: string, widths: readonly number[]) => widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(', ')
const extras = STACK_PHOTOS.map((name) => ({ name, base: `/img/stack/${name}` }))
const COUNT = 1 + extras.length

/** Fisher–Yates shuffle into a new array. */
function shuffled<T>(items: T[]): T[] {
  const a = [...items]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** The name strip shown at the bottom of every photo. */
function Caption() {
  return (
    <figcaption>
      <span>HAO-TING LEE</span>
      <span>SOFTWARE ENGINEER</span>
    </figcaption>
  )
}

/**
 * The hero portrait plus any extra photos, layered as a stack. Every few seconds the top photo
 * slides out and is tucked under the rest, like a shuffled card.
 * Cards keep a fixed DOM order; only their position (data-pos) changes, so CSS transitions run.
 * The portrait is on top at load (it is the LCP image and matches the prerendered HTML); the
 * rest follow in a random order picked on each page load; every photo shows once per round.
 */
export function PhotoStack({ alt, pauseLabel, playLabel }: { alt: string; pauseLabel: string; playLabel: string }) {
  // deck[0] is the top card; values are card indices (0 = portrait).
  const [deck, setDeck] = useState(() => Array.from({ length: COUNT }, (_, i) => i))
  const [ready, setReady] = useState(false)
  const [out, setOut] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const busy = useRef(false)
  const hover = useRef(false)
  const timers = useRef<number[]>([])

  const shuffle = () => {
    if (busy.current || COUNT < 2) return
    busy.current = true
    const motion = document.documentElement.classList.contains('motion')
    const tuck = () => {
      setOut(false)
      setDeck((d) => [...d.slice(1), d[0]])
      timers.current.push(window.setTimeout(() => (busy.current = false), motion ? 700 : 0))
    }
    if (!motion) return tuck()
    setOut(true)
    timers.current.push(window.setTimeout(tuck, OUT_MS))
  }

  useEffect(() => {
    if (COUNT < 2 || userPaused || !document.documentElement.classList.contains('motion')) return
    const tick = window.setInterval(() => {
      // Pause while hovered, while the tab is hidden, and once another page covers the hero.
      if (hover.current || document.hidden || getScene() !== 0) return
      shuffle()
    }, HOLD_MS)
    return () => window.clearInterval(tick)
  }, [userPaused])

  useEffect(() => {
    // Randomise the cards behind the portrait, then enable transitions on the next frame so the
    // initial reorder does not animate.
    let raf = requestAnimationFrame(() => {
      setDeck((d) => [d[0], ...shuffled(d.slice(1))])
      raf = requestAnimationFrame(() => setReady(true))
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    const t = timers.current
    return () => t.forEach((id) => window.clearTimeout(id))
  }, [])

  return (
    <div
      className="stack"
      data-ready={ready ? '' : undefined}
      onPointerEnter={() => (hover.current = true)}
      onPointerLeave={() => (hover.current = false)}
      onClick={COUNT > 1 ? shuffle : undefined}
    >
      <figure className="photo stack-card" data-pos={Math.min(deck.indexOf(0), VISIBLE)} data-out={out && deck[0] === 0 ? '' : undefined}>
        <picture>
          <source type="image/avif" sizes={SIZES} srcSet="/img/portrait-360.avif 360w, /img/portrait-540.avif 540w, /img/portrait-720.avif 720w, /img/portrait-960.avif 960w" />
          <source type="image/webp" sizes={SIZES} srcSet="/img/portrait-360.webp 360w, /img/portrait-540.webp 540w, /img/portrait-720.webp 720w, /img/portrait-960.webp 960w" />
          <img src="/img/portrait-720.webp" width={741} height={1058} alt={alt} fetchPriority="high" decoding="async" />
        </picture>
        <Caption />
      </figure>
      {extras.map((p, i) => {
        return (
          <figure key={p.name} className="photo stack-card" data-pos={Math.min(deck.indexOf(i + 1), VISIBLE)} data-out={out && deck[0] === i + 1 ? '' : undefined} aria-hidden="true">
            <picture>
              <source type="image/avif" sizes={SIZES} srcSet={srcSet(p.base, 'avif', STACK_WIDTHS)} />
              <source type="image/webp" sizes={SIZES} srcSet={srcSet(p.base, 'webp', STACK_WIDTHS)} />
              <img src={`${p.base}-540.webp`} width={741} height={1058} alt="" loading="lazy" decoding="async" />
            </picture>
            <Caption />
          </figure>
        )
      })}
      {COUNT > 1 && (
        <button
          type="button"
          className="stack-toggle"
          aria-label={userPaused ? playLabel : pauseLabel}
          aria-pressed={userPaused}
          onClick={(e) => {
            e.stopPropagation()
            setUserPaused((v) => !v)
          }}
        >
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            {userPaused ? <path d="M5 3.5v9l7-4.5z" fill="currentColor" /> : <path d="M5 3.5h2v9H5zM9 3.5h2v9H9z" fill="currentColor" />}
          </svg>
        </button>
      )}
    </div>
  )
}
