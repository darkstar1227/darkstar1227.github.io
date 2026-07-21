# Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a highly interactive personal portfolio website for Justin using React, Vite, Framer Motion, Lenis, R3F, and Liquid Glass UI.

**Architecture:** A static SPA built with Vite and React. Uses a stateless data-driven approach where all content lives in a static `data.ts` file. Features a fixed WebGL fluid background with a scrollable foreground overlay featuring Liquid Glass components.

**Tech Stack:** React, TypeScript, Vite, Tailwind CSS, Framer Motion, React Three Fiber, Lenis.

## Global Constraints

- Must use Vite React TypeScript template.
- All styles use Tailwind CSS + Vanilla CSS.
- The repository is `/Users/ds-anxing/GitHub/darkstar1227.github.io`.
- All text must use Apple-level typography (clean sans-serif).

---

### Task 1: Project Scaffolding & Dependencies

**Files:**
- Create: `package.json`, `vite.config.ts`, `tailwind.config.js`, `postcss.config.js`, `src/main.tsx`, `src/App.tsx`, `src/index.css`

**Interfaces:**
- Produces: A running Vite app with Tailwind configured on port 5173.

- [ ] **Step 1: Initialize Vite**
```bash
npx -y create-vite@latest . --template react-ts --force
```

- [ ] **Step 2: Install dependencies**
```bash
npm install tailwindcss postcss autoprefixer framer-motion @studio-freight/lenis @react-three/fiber @react-three/drei three
npm install -D @types/three
```

- [ ] **Step 3: Setup Tailwind**
```bash
npx tailwindcss init -p
```
Update `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0c0e14",
      }
    },
  },
  plugins: [],
}
```

- [ ] **Step 4: Configure Global CSS**
Modify `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-white antialiased overflow-x-hidden;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
}
```

- [ ] **Step 5: Minimal App Component**
Modify `src/App.tsx`:
```tsx
export default function App() {
  return <div className="p-8 text-4xl font-bold">Hello Portfolio</div>
}
```

- [ ] **Step 6: Commit**
```bash
git add .
git commit -m "chore: initialize vite project with tailwind and dependencies"
```

---

### Task 2: Liquid Glass Component

**Files:**
- Create: `src/components/LiquidGlassCard.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Produces: `LiquidGlassCard` component taking `children` and `className` props.

- [ ] **Step 1: Add Glass CSS**
Append to `src/index.css`:
```css
.liquid-glass {
  position: relative;
  isolation: isolate;
  backdrop-filter: url(#refraction) blur(1.5px) saturate(1.5) brightness(1.06);
  -webkit-backdrop-filter: blur(14px) saturate(1.6) brightness(1.08);
  background: linear-gradient(135deg, #ffffff14, #ffffff05 38%, #ffffff0e 80%);
  box-shadow: 0 24px 60px -12px #00000080, 0 4px 12px #00000040, inset 0 1px 1px #ffffffa6, inset 1px 2px 8px -2px #ffffff66, inset 0 -1px 1px #ffffff30, inset -2px -6px 14px -6px #00000059;
}
.liquid-glass::before {
  content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 1.5px;
  background: linear-gradient(125deg, #ffffffcc 0%, #ffffff22 18%, transparent 40%, transparent 62%, #ffffff55 84%, #ffffffaa 100%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
}
```

- [ ] **Step 2: Create Component with SVG Filter Generation**
Create `src/components/LiquidGlassCard.tsx`:
```tsx
import { useEffect, useRef, useState } from "react";

export function LiquidGlassCard({ children, className = "", radius = 36 }: { children: React.ReactNode, className?: string, radius?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mapUri, setMapUri] = useState("");
  const id = useRef(`dispMap-${Math.random().toString(36).substr(2, 9)}`).current;

  useEffect(() => {
    const refresh = () => {
      if (!cardRef.current) return;
      const r = cardRef.current.getBoundingClientRect();
      const edge = 22;
      const w = Math.round(r.width);
      const h = Math.round(r.height);
      if(w === 0 || h === 0) return;
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
        <defs>
          <linearGradient id="gx" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#f00"/></linearGradient>
          <linearGradient id="gy" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#0f0"/></linearGradient>
          <filter id="soft"><feGaussianBlur stdDeviation="${edge}"/></filter>
        </defs>
        <rect width="${w}" height="${h}" fill="#808000"/>
        <rect width="${w}" height="${h}" rx="${radius}" fill="url(#gx)"/>
        <rect width="${w}" height="${h}" rx="${radius}" fill="url(#gy)" style="mix-blend-mode:screen"/>
        <rect x="${edge*1.6}" y="${edge*1.6}" width="${w-edge*3.2}" height="${h-edge*3.2}" rx="${Math.max(radius-edge,8)}" fill="#808000" filter="url(#soft)"/>
      </svg>`;
      setMapUri('data:image/svg+xml;utf8,' + encodeURIComponent(svg));
    };
    refresh();
    window.addEventListener('resize', refresh);
    return () => window.removeEventListener('resize', refresh);
  }, [radius]);

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id="refraction" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feImage href={mapUri} result="map" preserveAspectRatio="none" x="0" y="0" width="100%" height="100%"/>
            <feDisplacementMap in="SourceGraphic" in2="map" scale="86" xChannelSelector="R" yChannelSelector="G" result="dR"/>
            <feColorMatrix in="dR" type="matrix" result="onlyR" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/>
            <feDisplacementMap in="SourceGraphic" in2="map" scale="74" xChannelSelector="R" yChannelSelector="G" result="dG"/>
            <feColorMatrix in="dG" type="matrix" result="onlyG" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"/>
            <feDisplacementMap in="SourceGraphic" in2="map" scale="62" xChannelSelector="R" yChannelSelector="G" result="dB"/>
            <feColorMatrix in="dB" type="matrix" result="onlyB" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"/>
            <feBlend in="onlyR" in2="onlyG" mode="screen" result="rg"/>
            <feBlend in="rg" in2="onlyB" mode="screen" result="rgb"/>
            <feGaussianBlur in="rgb" stdDeviation="0.4"/>
          </filter>
        </defs>
      </svg>
      <div ref={cardRef} className={`liquid-glass ${className}`} style={{ borderRadius: radius }}>
        <div className="relative z-10">{children}</div>
      </div>
    </>
  );
}
```

- [ ] **Step 3: Test Component in App**
Modify `src/App.tsx`:
```tsx
import { LiquidGlassCard } from "./components/LiquidGlassCard";
export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <LiquidGlassCard className="w-[340px] h-[210px] p-6 text-white">
        <h2 className="text-xl font-bold">Liquid Glass</h2>
      </LiquidGlassCard>
    </div>
  )
}
```

- [ ] **Step 4: Commit**
```bash
git add src/components/LiquidGlassCard.tsx src/index.css src/App.tsx
git commit -m "feat: add LiquidGlassCard component"
```

---

### Task 3: Fluid Background and Smooth Scroll

**Files:**
- Create: `src/components/FluidBackground.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Produces: `FluidBackground` canvas behind content, Lenis scroll enabled globally.

- [ ] **Step 1: Create Background Shader Component**
Create `src/components/FluidBackground.tsx`:
```tsx
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const fragmentShader = `
uniform float u_time;
varying vec2 vUv;
void main() {
  vec2 uv = vUv;
  float color1 = sin(uv.x * 5.0 + u_time) * 0.5 + 0.5;
  float color2 = cos(uv.y * 3.0 + u_time * 0.5) * 0.5 + 0.5;
  gl_FragColor = vec4(0.05, color1 * 0.2 + 0.1, color2 * 0.3 + 0.1, 1.0);
}
`;
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

function FluidPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ u_time: { value: 0.0 } }), []);
  
  useFrame((state) => {
    if (materialRef.current) materialRef.current.uniforms.u_time.value = state.clock.elapsedTime * 0.5;
  });

  return (
    <mesh>
      <planeGeometry args={[100, 100]} />
      <shaderMaterial ref={materialRef} fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} />
    </mesh>
  );
}

export function FluidBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#0c0e14]">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <FluidPlane />
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 2: Add Lenis to App**
Modify `src/App.tsx`:
```tsx
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { LiquidGlassCard } from "./components/LiquidGlassCard";
import { FluidBackground } from "./components/FluidBackground";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <FluidBackground />
      <div className="min-h-[200vh] flex flex-col items-center pt-[30vh] gap-[20vh]">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mix-blend-screen text-white/90">
          JUSTIN LEE
        </h1>
        <LiquidGlassCard className="w-80 p-8 text-white">
          <p className="text-xl">SYSTEM & AI</p>
          <p className="text-sm opacity-70 mt-2">SRE • Full-Stack • Medical Imaging</p>
        </LiquidGlassCard>
      </div>
    </>
  )
}
```

- [ ] **Step 3: Commit**
```bash
git add src/components/FluidBackground.tsx src/App.tsx
git commit -m "feat: add fluid background and lenis scroll"
```
