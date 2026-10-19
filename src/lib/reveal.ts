import type { CSSProperties } from 'react'

type RevealKind = 'rise' | 'card' | 'lite' | 'wipe' | 'count'

/** Props that mark an element for the one-time reveal (see stage.scanReveals). */
export function reveal(kind: RevealKind = 'rise', delay = 0) {
  return {
    'data-reveal': kind,
    style: delay ? ({ '--d': delay } as CSSProperties) : undefined,
  }
}
