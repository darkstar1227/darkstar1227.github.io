import { memo, useState, useSyncExternalStore } from 'react'
import { CHAPTERS, SCENES, type Copy, type Lang } from '../data/content'
import { getScene, getServerScene, subscribeScene } from '../lib/stage'
import { Icon } from './ui'

const useScene = () => useSyncExternalStore(subscribeScene, getScene, getServerScene)

const STAR = 'M26 16Q27.3 24.7 36 26Q27.3 27.3 26 36Q24.7 27.3 16 26Q24.7 24.7 26 16Z'

/** 闇星 "Night crescent" mark, kept in sync with public/favicon.svg. IDs are prefixed to stay unique in the page. */
function BrandMark() {
  return (
    <svg viewBox="0 0 64 64" width="24" height="24" aria-hidden="true">
      <defs>
        <radialGradient id="bm-disc" cx="26" cy="20" r="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1e252d" />
          <stop offset="1" stopColor="#0b0d10" />
        </radialGradient>
        <linearGradient id="bm-rim" x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity=".62" />
          <stop offset=".32" stopColor="#fff" stopOpacity=".14" />
          <stop offset=".7" stopColor="#72ddeb" stopOpacity=".1" />
          <stop offset="1" stopColor="#edbe8c" stopOpacity=".22" />
        </linearGradient>
        <linearGradient id="bm-pigment" x1="12" y1="52" x2="52" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#edbe8c" />
          <stop offset=".5" stopColor="#ef9aae" />
          <stop offset="1" stopColor="#72ddeb" />
        </linearGradient>
        <filter id="bm-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
        <mask id="bm-crescent" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
          <rect width="64" height="64" fill="#000" />
          <circle cx="32" cy="32" r="24" fill="#fff" />
          <circle cx="28.5" cy="28.5" r="25" fill="#000" />
        </mask>
      </defs>
      <circle cx="32" cy="32" r="29" fill="url(#bm-disc)" />
      <circle cx="32" cy="32" r="28.4" fill="none" stroke="url(#bm-rim)" strokeWidth="1.2" />
      <circle cx="32" cy="32" r="24" fill="url(#bm-pigment)" mask="url(#bm-crescent)" opacity=".7" filter="url(#bm-glow)" />
      <circle cx="32" cy="32" r="24" fill="url(#bm-pigment)" mask="url(#bm-crescent)" />
      <path d={STAR} fill="#a8eff7" opacity=".5" filter="url(#bm-glow)" />
      <path d={STAR} fill="#f4f6f8" />
    </svg>
  )
}

/** Fixed glass nav. Only this and the chapter pill re-render when the active section changes. */
export const NavBar = memo(function NavBar({ t, lang, onLang }: { t: Copy; lang: Lang; onLang: (l: Lang) => void }) {
  const scene = useScene()
  const [open, setOpen] = useState(false)
  const current = `#${SCENES[scene]}`
  return (
    <div className="navslot">
      <nav className="nav glass-control" aria-label={t.navLabel}>
        <a className="nav-brand" href="#top">
          <BrandMark />
          {t.brand}
        </a>
        <button className="nav-menu" type="button" aria-expanded={open} aria-controls="nav-links" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
          <Icon name={open ? 'close' : 'menu'} />
        </button>
        <ul id="nav-links" className={`nav-links${open ? ' is-open' : ''}`}>
          {t.nav.map((n) => (
            <li key={n.href}>
              <a className="nav-link" href={n.href} aria-current={n.href === current ? 'true' : undefined} onClick={() => setOpen(false)}>
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="seg glass-control" role="group" aria-label={t.langLabel}>
        {(['en', 'zh'] as const).map((l) => (
          <button key={l} type="button" className="seg-btn" aria-pressed={lang === l} onClick={() => onLang(l)}>
            {l === 'en' ? 'EN' : '中文'}
          </button>
        ))}
      </div>
    </div>
  )
})

export const ChapterPill = memo(function ChapterPill({ lang }: { lang: Lang }) {
  const scene = useScene()
  const labels = CHAPTERS[lang]
  return (
    <div className={`chapter${scene === 0 ? ' is-hidden' : ''}`} aria-hidden="true">
      <div className="chapter-track">
        {labels.map((label, i) => (
          <span key={i} className={`ch${i === scene ? ' on' : i < scene ? ' past' : ''}`}>
            <span className="ch-n">{String(i).padStart(2, '0')}</span>
            {label}
          </span>
        ))}
      </div>
      <div className="chapter-bar">
        <span style={{ transform: `scaleX(${scene / (labels.length - 1)})` }} />
      </div>
    </div>
  )
})

export function Progress() {
  return <div className="progress" aria-hidden="true" />
}
