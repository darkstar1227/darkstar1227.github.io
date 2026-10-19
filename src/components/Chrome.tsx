import { memo, useState, useSyncExternalStore } from 'react'
import { CHAPTERS, SCENES, type Copy, type Lang } from '../data/content'
import { getScene, getServerScene, subscribeScene } from '../lib/stage'
import { Icon } from './ui'

const useScene = () => useSyncExternalStore(subscribeScene, getScene, getServerScene)

/** Fixed glass nav. Only this and the chapter pill re-render when the active section changes. */
export const NavBar = memo(function NavBar({ t, lang, onLang }: { t: Copy; lang: Lang; onLang: (l: Lang) => void }) {
  const scene = useScene()
  const [open, setOpen] = useState(false)
  const current = `#${SCENES[scene]}`
  return (
    <div className="navslot">
      <nav className="nav glass-control" aria-label={t.navLabel}>
        <a className="nav-brand" href="#top">
          <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
            <path d="M9 1.5 16.5 15H1.5L9 1.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M9 6.5 12.6 13H5.4L9 6.5Z" fill="var(--accent)" opacity=".9" />
          </svg>
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
