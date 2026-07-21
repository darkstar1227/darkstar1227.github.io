# Portfolio Website Design Spec: Deep Ocean & Premium Glass

## 1. Overview
A highly interactive, visually stunning personal portfolio website for Hao-Ting Lee (Justin). The design bridges the gap between Apple's premium minimalism and cutting-edge creative agency aesthetics, reflecting his expertise in AI/Medical Imaging, Full-Stack Development, and SRE.

## 2. Visual Identity & Vibe
- **Theme**: "Deep Ocean & Premium Glass"
- **Background**: A slow-moving, dark blue/teal WebGL fluid shader simulating deep ocean currents. It provides a natural, organic feel without being overly distracting.
- **Typography**: Apple-level precision using SF Pro or Inter. Large, bold headers with generous negative space (whitespace).
- **Components**: Heavy use of "Liquid Glass" (advanced glassmorphism using SVG `feDisplacementMap` for physical light refraction, chromatic aberration, and edge distortion) for cards and UI elements.

## 3. Architecture & Tech Stack
- **Framework**: Vite + React (TypeScript) for fast builds and lightweight SPA architecture.
- **3D/Graphics**: React Three Fiber (R3F) for the fluid background shader.
- **Animations**: Framer Motion for scroll reveals, smooth text transitions, and layout animations.
- **Scroll**: Lenis for premium, buttery-smooth scrolling.
- **Styling**: Tailwind CSS for responsive layout + Vanilla CSS for complex SVG filter effects (Liquid Glass).
- **Data Management**: Static `src/data.ts` acting as a local CMS for all content (Experience, Projects, Publications), keeping components clean.

## 4. Page Structure
1. **Hero Section**
   - Full-screen fluid WebGL background.
   - Huge typographic introduction ("JUSTIN LEE" / "SYSTEM & AI").
   - A floating Liquid Glass card with a short bio (e.g., SRE | Medical AI | Full-Stack).
2. **About & Experience**
   - Smooth scroll reveals (gentle fade and translateY, like water droplets rising).
   - Clean, timeline-based or staggered list layout of experiences.
3. **Projects (Bento Box Layout)**
   - Projects (14O, Prometheus, ISO, etc.) presented as a Bento Box grid.
   - Each project container is a `<LiquidGlassCard>`.
   - Hovering triggers fluid edge highlights and amplifies background refraction.
4. **Publications & Research**
   - Sleek, minimalist list to reflect academic rigor. 
   - Hovering on titles creates a small liquid glass magnifying effect at the cursor.
5. **Contact/Footer**
   - Massive Liquid Glass block: "LET'S BUILD SYSTEMS." with email and GitHub links.

## 5. Component Boundaries
- `App.tsx`: Main layout orchestrator, Lenis scroll initialization.
- `FluidBackground.tsx`: Encapsulates R3F and shader logic. Fixed positioned at `z-index: -1`.
- `LiquidGlassCard.tsx`: Reusable wrapper applying the `backdrop-filter` and SVG displacement logic. Accepts children.
- Section Components: `Hero.tsx`, `Experience.tsx`, `Projects.tsx`, `Publications.tsx`.

## 6. Implementation Constraints & Notes
- **Performance**: The fluid shader must be optimized (e.g., using a lightweight fragment shader) so it doesn't cause frame drops on mobile devices.
- **SVG Filters**: The `feDisplacementMap` must correctly recalculate its boundaries if the browser is resized to prevent visual clipping on the glass cards.
- **Stateless UI**: No backend or database is required. All state is UI-driven.
