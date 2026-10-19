# darkstar1227.github.io

Personal site of Hao-Ting Lee (Justin). React 19 + Vite + TypeScript, styled with the Prism design system tokens. English first, with a Chinese toggle.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with HMR |
| `npm run build` | Type-check, client build, SSR build, then prerender the page into `dist/index.html` |
| `npm run preview` | Serve `dist/` locally |
| `npm run images` | Rebuild the responsive portrait set (AVIF + WebP) in `public/img/` from `scripts/portrait-source.jpg` |
| `npm run lint` | oxlint |

## Layout

- `src/data/content.ts`: all copy (en / zh). Every figure comes from the resume profile; edit text here.
- `src/data/icons.ts`: Prism line icons.
- `src/components/Sections.tsx`: one component per page section.
- `src/components/Chrome.tsx`: fixed nav, language switch, chapter pill, progress bar.
- `src/lib/stage.ts`: scroll stage controller (page flip, pinning, active chapter, reveals). Runs outside React.
- `src/styles/tokens.css`: Prism tokens (Graphite theme). `src/styles/app.css`: everything else.

## Performance rules

The page is built so first paint needs no JavaScript and scrolling never drops frames. Keep these when editing:

1. **Prerendered HTML.** `npm run build` renders the page on the server side and React hydrates it. Content is visible before any JS runs.
2. **Animate only `transform` and `opacity`.** Reveals, the page flip overlay, the progress bar and the chapter pill all stay on the compositor. No `filter`, `clip-path`, `color` or layout properties in transitions.
3. **No `backdrop-filter` or SVG filters inside the stacked pages.** They re-filter every frame and, combined with `position: sticky`, trigger Chromium compositing bugs (lower pages drawing through upper ones). Glass cards and glass lettering are static paints (gradients + inset highlights).
4. **Scrolling never touches React or layout.** `stage.ts` measures pages once (and on resize / language change) and caches the numbers; scroll and wheel handlers only do arithmetic. Only the nav and chapter pill subscribe to the active section.
5. **One `IntersectionObserver`** for every reveal; elements are revealed once and unobserved.
6. **Page flips use native smooth scrolling**, which the browser runs on the compositor thread.
7. **Images**: the portrait ships as AVIF/WebP at four widths with `fetchpriority="high"` and a preload, so the largest image arrives first.

Reduced motion: when the OS asks for it, the inline script in `index.html` leaves the `motion` class off, so nothing is hidden or animated and the page scrolls normally.
