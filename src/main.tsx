import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/app.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// The production build ships prerendered HTML; hydrate it instead of re-rendering from scratch.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
