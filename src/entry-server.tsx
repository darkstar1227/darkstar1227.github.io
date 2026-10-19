import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'

// Used at build time only (scripts/prerender.mjs) to emit static HTML for the first paint.
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
