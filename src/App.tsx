import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { I18N, type Lang } from './data/content'
import { remeasure, scanReveals, startStage } from './lib/stage'
import { ChapterPill, NavBar, Progress } from './components/Chrome'
import { Cases, Contact, Footer, Hero, HowIWork, Life, Mission, Roadmap, Story, Strengths, Talks, Traction } from './components/Sections'

const LANG_KEY = 'pf-lang'

// useLayoutEffect warns during server rendering; it only matters in the browser.
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

export default function App() {
  // English is the default (and what gets prerendered); a saved preference applies after hydration.
  const [lang, setLang] = useState<Lang>('en')
  const t = I18N[lang]

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY)
      // Applied after hydration on purpose: the prerendered HTML is English, so reading storage
      // during the first render would make the client markup differ from the server markup.
      // eslint-disable-next-line react/set-state-in-effect
      if (saved === 'zh' || saved === 'en') setLang(saved)
    } catch {
      /* storage unavailable: keep English */
    }
    return startStage()
  }, [])

  useIsoLayoutEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en'
    // Copy length changes page heights; re-measure pin points and pick up any new reveal targets.
    remeasure()
    scanReveals()
  }, [lang])

  const onLang = useCallback((next: Lang) => {
    setLang(next)
    try {
      localStorage.setItem(LANG_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  return (
    <div className="pf">
      <Progress />
      <NavBar t={t} lang={lang} onLang={onLang} />
      <ChapterPill lang={lang} />
      <main>
        <Hero t={t} />
        <Traction t={t} />
        <Mission t={t} />
        <Story t={t} />
        <Strengths t={t} />
        <HowIWork t={t} />
        <Cases t={t} />
        <Talks t={t} />
        <Life t={t} />
        <Roadmap t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
    </div>
  )
}
