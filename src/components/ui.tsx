import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { ICONS, type IconName } from '../data/icons'
import { HERO_PIGMENT } from '../lib/pigment'
import { reveal } from '../lib/reveal'

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {ICONS[name].split(/(?=M)/).map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  )
}

export function Badge({ tone = 'neutral', icon, children }: { tone?: string; icon?: IconName; children: ReactNode }) {
  return (
    <span className={`badge badge-${tone}`}>
      {icon && <Icon name={icon} size={14} />}
      {children}
    </span>
  )
}

export function Button({
  href,
  variant = 'secondary',
  icon,
  iconEnd,
  children,
}: {
  href: string
  variant?: 'primary' | 'secondary'
  icon?: IconName
  iconEnd?: IconName
  children: ReactNode
}) {
  const external = href.startsWith('http')
  return (
    <a className={`btn btn-${variant}`} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {icon && <Icon name={icon} size={18} />}
      <span>{children}</span>
      {iconEnd && <Icon name={iconEnd} size={18} />}
    </a>
  )
}

export function Eyebrow({ idx, children }: { idx: string; children: ReactNode }) {
  return (
    <div className="eyebrow" {...reveal('rise')}>
      <span className="idx">{idx}</span>
      <span className="rule" {...reveal('wipe')} />
      <span>{children}</span>
    </div>
  )
}

export function Heading({ id, lines }: { id: string; lines: [string, string] }) {
  return (
    // The heading is the observed element: a line pushed out of its own overflow mask would never
    // count as visible. Lines then slide up behind the mask (transform only, no clip-path repaint).
    <h2 id={id} className="h2" data-reveal="heading">
      {lines.map((ln, i) => (
        <span key={i} className="ln">
          <span className="ln-in" style={i ? ({ '--d': i } as CSSProperties) : undefined}>
            {ln}
          </span>
        </span>
      ))}
    </h2>
  )
}

/** Gradient "glass" lettering: a static paint, no per-frame filters. */
export function GlassTitle({ as: Tag = 'h1', className, children }: { as?: 'h1' | 'h2'; className?: string; children: string }) {
  return <Tag className={`glass-title ${className ?? ''}`}>{children}</Tag>
}

/* ---------- LensTitle: Prism LensText ----------
   Glyph alpha → blurred height field → x/y gradients → normal map; the Prism pigment is displaced
   through it (with slight RGB split) and lit with a specular rim. The filter lives inside an inline
   SVG and is static, so it is rasterized once with its layer: no CSS filter, no per-scroll updates.
   Prerendered HTML and the first client render show the GlassTitle gradient, so text is never blank. */
type LensGeo = { fs: number; lh: number; pad: number; w: number; h: number; lines: string[] }

let measureCtx: CanvasRenderingContext2D | null = null
function measureLine(text: string, cs: CSSStyleDeclaration) {
  if (!measureCtx) measureCtx = document.createElement('canvas').getContext('2d')
  if (!measureCtx) return 0
  measureCtx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
  const ls = parseFloat(cs.letterSpacing) || 0
  return measureCtx.measureText(text).width + ls * Array.from(text).length
}

function lensFilter(id: string, g: LensGeo, strength: number) {
  const fs = g.fs
  const blur = Math.max(1.6, fs * 0.045)
  const n = Math.max(2, Math.round(fs * 0.03))
  const row = Array.from({ length: n * 2 + 1 }, (_, i) => (i < n ? -0.9 : i > n ? 0.9 : 0)).join(' ')
  const scale = Math.round(34 * strength * fs / 72)
  const surface = Math.max(2, fs * 0.05)
  const rim = Math.max(1, fs * 0.03)
  const pig = { x: Math.round(-g.w * 0.9), y: Math.round(-g.h * 0.25), w: Math.round(g.w * 2), h: Math.round(g.h * 1.55) }
  // feDisplacementMap samples up to ±scale/2 (×1.08 for the red pass) away, and anything outside the
  // filter region is transparent. Glyph edges near the SVG box (the g descender, the last e) would sample
  // nothing and drop out, so the region reaches past the box by the displacement reach plus the bg blur.
  const m = Math.ceil(scale * 0.54 + 1.2 * 3 + 2)
  return (
    `<filter id="${id}" x="${-m}" y="${-m}" width="${g.w + m * 2}" height="${g.h + m * 2}" filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">` +
    `<feFlood flood-color="#0b0d10" result="ground"/>` +
    `<feImage href="${HERO_PIGMENT}" x="${pig.x}" y="${pig.y}" width="${pig.w}" height="${pig.h}" preserveAspectRatio="none" result="pig"/>` +
    `<feComposite in="pig" in2="ground" operator="over" result="bg0"/><feColorMatrix in="bg0" type="saturate" values="1.7" result="bg1"/><feGaussianBlur in="bg1" stdDeviation="1.2" result="bg"/>` +
    `<feGaussianBlur in="SourceAlpha" stdDeviation="${blur}" result="hgt"/>` +
    `<feColorMatrix in="hgt" type="matrix" values="0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 0 1" result="hh"/>` +
    `<feConvolveMatrix in="hh" order="${n * 2 + 1} 1" kernelMatrix="${row}" divisor="1" bias="0.5" preserveAlpha="true" edgeMode="duplicate" result="gx"/>` +
    `<feConvolveMatrix in="hh" order="1 ${n * 2 + 1}" kernelMatrix="${row}" divisor="1" bias="0.5" preserveAlpha="true" edgeMode="duplicate" result="gy"/>` +
    `<feColorMatrix in="gx" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0 1" result="nx"/>` +
    `<feColorMatrix in="gy" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 0 1" result="ny"/>` +
    `<feComposite in="nx" in2="ny" operator="arithmetic" k2="1" k3="1" result="nmap"/>` +
    `<feDisplacementMap in="bg" in2="nmap" scale="${scale}" xChannelSelector="R" yChannelSelector="G" result="g1"/>` +
    `<feDisplacementMap in="bg" in2="nmap" scale="${(scale * 1.08).toFixed(1)}" xChannelSelector="R" yChannelSelector="G" result="g2"/>` +
    `<feColorMatrix in="g2" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g2r"/>` +
    `<feColorMatrix in="g1" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="g1gb"/>` +
    `<feComposite in="g2r" in2="g1gb" operator="arithmetic" k2="1" k3="1" result="refr"/>` +
    `<feComponentTransfer in="refr" result="lit"><feFuncR type="linear" slope="0.6" intercept="0.42"/><feFuncG type="linear" slope="0.6" intercept="0.42"/><feFuncB type="linear" slope="0.6" intercept="0.432"/></feComponentTransfer>` +
    `<feComposite in="lit" in2="SourceAlpha" operator="in" result="body"/>` +
    `<feGaussianBlur in="hgt" stdDeviation="${(blur * 0.5).toFixed(1)}" result="hs"/>` +
    `<feSpecularLighting in="hs" surfaceScale="${surface}" specularConstant="1.1" specularExponent="38" lighting-color="#ffffff" result="sp"><feDistantLight azimuth="235" elevation="42"/></feSpecularLighting>` +
    `<feComposite in="sp" in2="SourceAlpha" operator="in" result="spec"/>` +
    `<feOffset in="SourceAlpha" dy="${-rim}" result="up"/><feComposite in="SourceAlpha" in2="up" operator="out" result="le0"/><feGaussianBlur in="le0" stdDeviation="${rim * 0.6}" result="le1"/><feComposite in="le1" in2="SourceAlpha" operator="in" result="lowEdge"/>` +
    `<feFlood flood-color="#000000" flood-opacity="0.2"/><feComposite in2="lowEdge" operator="in" result="shade"/>` +
    `<feComposite in="spec" in2="body" operator="arithmetic" k2="0.7" k3="1" result="bs"/>` +
    `<feMerge><feMergeNode in="bs"/><feMergeNode in="shade"/></feMerge></filter>`
  )
}

export function LensTitle({ as: Tag = 'h1', className, children, strength = 1 }: { as?: 'h1' | 'h2'; className?: string; children: string; strength?: number }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const id = 'lens' + useId().replace(/[^a-zA-Z0-9]/g, '')
  const [geo, setGeo] = useState<LensGeo | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-contrast: more)').matches) return
    const lines = children.split('\n')
    let raf = 0
    const measure = () => {
      const cs = getComputedStyle(el)
      const fs = parseFloat(cs.fontSize)
      if (!fs) return
      const lh = parseFloat(cs.lineHeight) || fs * 1.1
      const maxW = Math.max(...lines.map((ln) => measureLine(ln, cs)))
      if (maxW < fs * 0.5) return
      const pad = Math.ceil(fs * 0.14)
      const next: LensGeo = { fs, lh, pad, w: Math.ceil(maxW + pad * 2), h: Math.ceil(lh * lines.length + pad * 2), lines }
      setGeo((prev) => (prev && prev.fs === next.fs && prev.w === next.w && prev.h === next.h && prev.lines.join('\n') === children ? prev : next))
    }
    const schedule = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(measure)
    }
    const ro = new ResizeObserver(schedule)
    ro.observe(el)
    document.fonts?.ready.then(schedule)
    schedule()
    return () => {
      ro.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [children])

  if (!geo || geo.lines.join('\n') !== children) {
    return (
      <Tag ref={ref} className={`glass-title ${className ?? ''}`}>
        {children}
      </Tag>
    )
  }
  return (
    <Tag ref={ref} className={`lens-title ${className ?? ''}`}>
      <span className="sr">{geo.lines.join(' ')}</span>
      <svg aria-hidden="true" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`}>
        <defs dangerouslySetInnerHTML={{ __html: lensFilter(id, geo, strength) }} />
        <g filter={`url(#${id})`}>
          {geo.lines.map((ln, i) => (
            <text key={i} x={geo.pad} y={geo.pad + geo.lh * i + geo.lh * 0.5 + geo.fs * 0.36} fontSize={geo.fs}>
              {ln}
            </text>
          ))}
        </g>
      </svg>
    </Tag>
  )
}

/** Static airbrush pigment painted with CSS gradients (cheap to paint, cached by the compositor). */
export function Pigment({ kind }: { kind: 'hero' | 'band' | 'product' | 'quiet' }) {
  return <div className={`pigment pigment-${kind}`} aria-hidden="true" />
}

export function Card({ glass, className, children }: { glass?: boolean; className?: string; children: ReactNode }) {
  return <div className={`card ${glass ? 'card-glass' : 'card-quiet'} ${className ?? ''}`}>{children}</div>
}

/** Number that counts up once revealed (CSS @property transition, no JS per frame). */
export function Counter({ value, suffix, unit, sr }: { value: number; suffix?: string; unit?: string; sr: string }) {
  const groups = value.toLocaleString('en-US').split(',')
  return (
    <>
      <div className="fact-num" aria-hidden="true">
        {groups.map((g, i) => (
          <span key={i}>
            {i > 0 && ','}
            <span className={`cnt${i > 0 ? ' pad' : ''}`} style={{ '--n': Number(g) } as CSSProperties} {...{ 'data-reveal': 'count' }} />
          </span>
        ))}
        {suffix}
        {unit && <span className="u">{unit}</span>}
      </div>
      <span className="sr">{sr}</span>
    </>
  )
}
