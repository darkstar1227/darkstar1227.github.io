import type { ReactNode } from 'react'
import type { Copy } from '../data/content'
import type { IconName } from '../data/icons'
import { reveal } from '../lib/reveal'
import { Badge, Button, Card, Counter, Eyebrow, Heading, LensTitle, Icon, Pigment } from './ui'

const EMAIL = 'mailto:justin30303.jl@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/justin-lee-dst1227'
const GITHUB = 'https://github.com/darkstar1227'
const ITHOME_SERIES = 'https://ithelp.ithome.com.tw/users/20163611/ironman/9343'

/** A stacked page: pins at the bottom edge and gets covered by the next one. */
function Page({ id, className, label, labelledBy, children }: { id?: string; className?: string; label?: string; labelledBy?: string; children: ReactNode }) {
  return (
    <section id={id} className={`pin ${className ?? ''}`} aria-label={label} aria-labelledby={labelledBy}>
      {children}
    </section>
  )
}

export function Hero({ t }: { t: Copy }) {
  const h = t.hero
  return (
    <Page id="top" className="hero-sec" label={h.aria}>
      <div className="stage">
        <Pigment kind="hero" />
        <div className="hero-orb" aria-hidden="true" />
        <div className="hero">
          <div className="wide hero-inner">
            <div className="hero-copy">
              <div className="eyebrow ld l1">
                <span className="idx">{h.idx}</span>
                <span className="rule" />
                <span>{h.eyebrow}</span>
              </div>
              <p className="kicker ld l1">{h.kicker}</p>
              <LensTitle className="hero-title ld l2">{h.name}</LensTitle>
              <p className="hero-sub-name ld l2">{h.subName}</p>
              <p className="hero-sub ld l3">
                {h.a}
                <em>{h.em}</em>
                {h.b}
              </p>
              <div className="hero-tags ld l4">
                {h.chips.map((c) => (
                  <Badge key={c.label} tone={c.tone}>
                    {c.label}
                  </Badge>
                ))}
              </div>
              <div className="hero-cta ld l5">
                <Button href="#mission" variant="primary" iconEnd="arrow-right">
                  {h.cta1}
                </Button>
                <Button href={EMAIL}>{h.cta2}</Button>
              </div>
            </div>
            <div className="portrait">
              <figure className="photo">
                <picture>
                  <source type="image/avif" sizes="(max-width: 1000px) 300px, 420px" srcSet="/img/portrait-360.avif 360w, /img/portrait-540.avif 540w, /img/portrait-720.avif 720w, /img/portrait-960.avif 960w" />
                  <source type="image/webp" sizes="(max-width: 1000px) 300px, 420px" srcSet="/img/portrait-360.webp 360w, /img/portrait-540.webp 540w, /img/portrait-720.webp 720w, /img/portrait-960.webp 960w" />
                  <img src="/img/portrait-720.webp" width={741} height={1058} alt={h.photoAlt} fetchPriority="high" decoding="async" />
                </picture>
                <figcaption>
                  <span>HAO-TING LEE</span>
                  <span>SOFTWARE ENGINEER</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

type Fact = { value: number; sr: string; label: string; suffix?: string; unit?: string }

export function Traction({ t }: { t: Copy }) {
  const f = t.facts
  const rows: { group: string; facts: Fact[] }[] = [
    {
      group: f.g1,
      facts: [
        { value: 2016, sr: '2,016', label: f.l1 },
        { value: 8, sr: '8', label: f.l2, unit: f.u2 },
        { value: 99, sr: '99.79%', label: f.l3, suffix: '.79', unit: '%' },
        { value: 15831, sr: '15,831', label: f.l4 },
      ],
    },
    {
      group: f.g2,
      facts: [
        { value: 2091, sr: '2,091', label: f.l5 },
        { value: 6, sr: '6×', label: f.l6, unit: '×' },
        { value: 8, sr: '8.2×', label: f.l7, suffix: '.2', unit: '×' },
        { value: 33, sr: '33%', label: f.l8, unit: '%' },
      ],
    },
    {
      group: f.g3,
      facts: [
        { value: 7, sr: '7', label: f.l9 },
        { value: 3, sr: '3', label: f.l10 },
        { value: 2, sr: '2', label: f.l11, unit: f.u11 },
        { value: 4, sr: '4+', label: f.l12, unit: '+' },
      ],
    },
  ]
  return (
    <Page className="scene band traction" label={f.eyebrow}>
      <div className="wide">
        <div className="eyebrow" {...reveal('rise')}>
          <span className="idx">KPI</span>
          <span className="rule" {...reveal('wipe')} />
          <span>{f.eyebrow}</span>
        </div>
        <div className="facts-rows">
          {rows.map((row) => (
            <div className="facts-row" key={row.group}>
              <div className="facts-group" {...reveal('rise')}>
                {row.group}
              </div>
              <div className="facts">
                {row.facts.map((fact, i) => (
                  <div className="fact" key={i} {...reveal('rise', i)}>
                    <Counter value={fact.value} suffix={fact.suffix} unit={fact.unit} sr={fact.sr} />
                    <div className="fact-label">{fact.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  )
}

export function Mission({ t }: { t: Copy }) {
  const m = t.mission
  return (
    <Page id="mission" className="scene sec" labelledBy="mission-h">
      <div className="wrap">
        <Eyebrow idx="01">{m.eyebrow}</Eyebrow>
        <Heading id="mission-h" lines={[m.h1, m.h2]} />
        <p className="intro">
          {m.lines.map((line, i) => (
            <span key={i} className="lite" {...reveal('lite', i)}>
              {line}{' '}
            </span>
          ))}
        </p>
        <div className="sign" {...reveal('rise')}>
          <span className="line" />
          <span>{m.sign}</span>
        </div>
      </div>
    </Page>
  )
}

export function Story({ t }: { t: Copy }) {
  const o = t.origin
  return (
    <Page id="origin" className="scene sec band" labelledBy="origin-h">
      <div className="wrap">
        <Eyebrow idx="02">{o.eyebrow}</Eyebrow>
        <Heading id="origin-h" lines={[o.h1, o.h2]} />
        <div className="tl" data-reveal="line">
          <div className="tl-line" aria-hidden="true">
            <div className="tl-fill" />
          </div>
          {o.items.map((m) => (
            <article className="tl-item" key={m.when} data-reveal="dot">
              <span className="tl-dot" aria-hidden="true" />
              <div {...reveal('rise')}>
                <div className="tl-when">
                  <span className="tl-year">{m.when}</span>
                  <Badge tone={m.tone}>{m.stage}</Badge>
                </div>
                <h3>{m.title}</h3>
                <div className="tl-org">{m.org}</div>
              </div>
              <p className="tl-text" {...reveal('rise', 1)}>
                {m.a}
                <strong>{m.s}</strong>
                {m.b}
              </p>
            </article>
          ))}
        </div>
      </div>
    </Page>
  )
}

export function Strengths({ t }: { t: Copy }) {
  const p = t.product
  return (
    <Page id="product" className="scene" labelledBy="product-h">
      <div className="stage">
        <Pigment kind="band" />
        <div className="sec wide">
          <Eyebrow idx="03">{p.eyebrow}</Eyebrow>
          <Heading id="product-h" lines={[p.h1, p.h2]} />
          <p className="lede" {...reveal('rise', 1)}>
            {p.lede}
          </p>
          <div className="products eq">
            {p.items.map((it, i) => (
              <div key={it.name} {...reveal('card', i)}>
                <Card glass>
                  <div className="prod">
                    <span className="prod-ic">
                      <Icon name={it.icon as IconName} size={22} />
                    </span>
                    <div>
                      <div className="prod-tag">{it.tag}</div>
                      <h3 className="prod-name">{it.name}</h3>
                    </div>
                    <p>{it.desc}</p>
                    <ul>
                      {it.feats.map((feat) => (
                        <li key={feat}>
                          <span className="ic">
                            <Icon name="check" size={16} />
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  )
}

export function HowIWork({ t }: { t: Copy }) {
  const c = t.culture
  return (
    <Page id="culture" className="scene sec band" labelledBy="culture-h">
      <div className="wrap">
        <Eyebrow idx="04">{c.eyebrow}</Eyebrow>
        <Heading id="culture-h" lines={[c.h1, c.h2]} />
        <div className="deck">
          {c.items.map((v, i) => (
            <div className="trait" key={v.n} style={{ top: 104 + i * 16 }}>
              <Pigment kind="product" />
              <Card glass>
                <div className="tr">
                  <div>
                    <div className="tr-n">{v.n}</div>
                    <h3 className="tr-title">
                      {v.t1}
                      <br />
                      {v.t2}
                    </h3>
                    <div className="tr-kw">
                      <Badge icon={v.icon as IconName}>{v.kw}</Badge>
                    </div>
                  </div>
                  <div className="tr-story">
                    <p>
                      {v.a}
                      <strong>{v.s}</strong>
                      {v.b}
                    </p>
                    <div className="tr-proof">
                      <span className="ic">
                        <Icon name="check-circle" size={18} />
                      </span>
                      <span>{v.proof}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Page>
  )
}

function CardGrid({ children }: { children: ReactNode }) {
  return <div className="grid3 eq">{children}</div>
}

export function Cases({ t }: { t: Copy }) {
  const c = t.cases
  return (
    <Page id="cases" className="scene" labelledBy="cases-h">
      <div className="stage">
        <Pigment kind="band" />
        <div className="sec wrap">
          <Eyebrow idx="05">{c.eyebrow}</Eyebrow>
          <Heading id="cases-h" lines={[c.h1, c.h2]} />
          <CardGrid>
            {c.items.map((it, i) => (
              <div key={it.title} {...reveal('card', i % 3)}>
                <Card glass>
                  <div className="case">
                    <h3 className="card-title">{it.title}</h3>
                    <div className="card-meta">{it.meta}</div>
                    <p>{it.text}</p>
                    {it.link && (
                      <p>
                        <a href={it.link} target="_blank" rel="noopener noreferrer">
                          {it.linkLabel}
                        </a>
                      </p>
                    )}
                    <p className="why">{it.why}</p>
                  </div>
                </Card>
              </div>
            ))}
          </CardGrid>
        </div>
      </div>
    </Page>
  )
}

export function Talks({ t }: { t: Copy }) {
  const p = t.press
  return (
    <Page id="press" className="scene sec" labelledBy="press-h">
      <div className="wrap">
        <Eyebrow idx="06">{p.eyebrow}</Eyebrow>
        <Heading id="press-h" lines={[p.h1, p.h2]} />
        <p className="lede" {...reveal('rise', 1)}>
          {p.lede}
        </p>
        <CardGrid>
          {p.items.map((s, i) => (
            <div key={s.title} {...reveal('card', i % 3)}>
              <Card glass>
                <div className="stage-item">
                  <div className="stage-y">{s.y}</div>
                  <div className="stage-place">{s.place}</div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  {s.link && (
                    <p>
                      <a href={s.link} target="_blank" rel="noopener noreferrer">
                        {s.linkLabel}
                      </a>
                    </p>
                  )}
                  {s.award && (
                    <div className="stage-badge">
                      <Badge tone="accent" icon="star">
                        {s.award}
                      </Badge>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          ))}
        </CardGrid>
      </div>
    </Page>
  )
}

export function Life({ t }: { t: Copy }) {
  const l = t.life
  return (
    <Page id="life" className="scene" labelledBy="life-h">
      <div className="stage">
        <Pigment kind="product" />
        <div className="sec wrap">
          <Eyebrow idx="07">{l.eyebrow}</Eyebrow>
          <Heading id="life-h" lines={[l.h1, l.h2]} />
          <p className="lede" {...reveal('rise', 1)}>
            {l.lede}
          </p>
          <CardGrid>
            {l.items.map((it, i) => (
              <div key={it.kw} {...reveal('card', i)}>
                <Card glass>
                  <div className="life">
                    <span className="prod-ic">
                      <Icon name={it.icon as IconName} size={22} />
                    </span>
                    <div className="prod-tag">{it.kw}</div>
                    <h3 className="life-title">{it.title}</h3>
                    <p>{it.a}</p>
                  </div>
                </Card>
              </div>
            ))}
          </CardGrid>
        </div>
      </div>
    </Page>
  )
}

export function Roadmap({ t }: { t: Copy }) {
  const r = t.roadmap
  return (
    <Page id="roadmap" className="scene sec band" labelledBy="roadmap-h">
      <div className="wrap">
        <Eyebrow idx="08">{r.eyebrow}</Eyebrow>
        <Heading id="roadmap-h" lines={[r.h1, r.h2]} />
        <div className="now-grid">
          <div>
            <p className="lede lede-flush" {...reveal('rise')}>
              {r.a}
              <strong>{r.s}</strong>
              {r.b}
            </p>
            <ul className="now-list" {...reveal('rise', 1)}>
              {r.rows.map((row) => (
                <li key={row.k}>
                  <b>{row.k}</b>
                  <span>{row.v}</span>
                </li>
              ))}
            </ul>
            <div className="write" {...reveal('rise', 2)}>
              <Card>
                <div className="write-in">
                  <div className="prod-tag">{r.writeTag}</div>
                  <h3 className="write-title">{r.writeTitle}</h3>
                  <p>{r.writeText}</p>
                  <p className="write-line">Build → Trace → Break → Measure → Evaluate → Recover → Improve</p>
                  <div className="write-links">
                    <a className="write-link" href={ITHOME_SERIES} target="_blank" rel="noopener noreferrer">
                      {r.writeLinkIthome} →
                    </a>
                    <a className="write-link" href="https://github.com/darkstar1227/learning-sre-for-ai-era" target="_blank" rel="noopener noreferrer">
                      {r.writeLink} →
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <div {...reveal('rise', 2)}>
            {r.stack.map((g) => (
              <div className="sk-group" key={g.title}>
                <h3>{g.title}</h3>
                <ul className="sk-list">
                  {g.items.map((it) => (
                    <li key={it.name} className={it.cls}>
                      {it.name}
                    </li>
                  ))}
                </ul>
                {g.note && <p className="sk-note">{g.note}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  )
}

export function Contact({ t }: { t: Copy }) {
  const c = t.contact
  return (
    <Page id="contact" className="scene" labelledBy="ct-h">
      <div className="stage">
        <Pigment kind="quiet" />
        <div className="contact">
          <div className="wrap">
            <Eyebrow idx="09">{c.eyebrow}</Eyebrow>
            <div {...reveal('rise', 1)}>
              <LensTitle as="h2" className="contact-title" strength={0.8}>
                {c.title}
              </LensTitle>
            </div>
            <p className="lede" {...reveal('rise', 2)}>
              {c.lede}
            </p>
            <div className="contact-cta" {...reveal('rise', 3)}>
              <Button href={EMAIL} variant="primary" icon="inbox">
                justin30303.jl@gmail.com
              </Button>
              <Button href={LINKEDIN} icon="user">
                LinkedIn
              </Button>
              <Button href={GITHUB} icon="branch">
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export function Footer({ t }: { t: Copy }) {
  return (
    <footer className="site-foot">
      <div className="wrap foot">
        <span>© 2026 Hao-Ting Lee 李浩廷</span>
        <span>{t.foot}</span>
      </div>
    </footer>
  )
}
