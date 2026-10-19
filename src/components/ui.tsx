import type { CSSProperties, ReactNode } from 'react'
import { ICONS, type IconName } from '../data/icons'
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
  return (
    <Tag className={`glass-title ${className ?? ''}`} data-text={children}>
      {children}
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
