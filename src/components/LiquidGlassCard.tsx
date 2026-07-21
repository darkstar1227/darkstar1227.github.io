import { useEffect, useRef, useState } from "react";

export function LiquidGlassCard({ children, className = "", radius = 36 }: { children: React.ReactNode, className?: string, radius?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mapUri, setMapUri] = useState("");

  useEffect(() => {
    const refresh = () => {
      if (!cardRef.current) return;
      const r = cardRef.current.getBoundingClientRect();
      const edge = 22;
      const w = Math.round(r.width);
      const h = Math.round(r.height);
      if (w === 0 || h === 0) return;
      
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
    
    // Initial render and slight delay for layout shifts
    refresh();
    setTimeout(refresh, 100);
    
    window.addEventListener('resize', refresh);
    return () => window.removeEventListener('resize', refresh);
  }, [radius]);

  return (
    <>
      {/* SVG Filter Definition */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <filter id="refraction" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feImage href={mapUri} result="map" preserveAspectRatio="none" x="0" y="0" width="100%" height="100%"/>
            
            {/* Red Channel Displacement */}
            <feDisplacementMap in="SourceGraphic" in2="map" scale="86" xChannelSelector="R" yChannelSelector="G" result="dR"/>
            <feColorMatrix in="dR" type="matrix" result="onlyR" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/>
            
            {/* Green Channel Displacement */}
            <feDisplacementMap in="SourceGraphic" in2="map" scale="74" xChannelSelector="R" yChannelSelector="G" result="dG"/>
            <feColorMatrix in="dG" type="matrix" result="onlyG" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"/>
            
            {/* Blue Channel Displacement */}
            <feDisplacementMap in="SourceGraphic" in2="map" scale="62" xChannelSelector="R" yChannelSelector="G" result="dB"/>
            <feColorMatrix in="dB" type="matrix" result="onlyB" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"/>
            
            {/* Blend Channels for Chromatic Aberration */}
            <feBlend in="onlyR" in2="onlyG" mode="screen" result="rg"/>
            <feBlend in="rg" in2="onlyB" mode="screen" result="rgb"/>
            <feGaussianBlur in="rgb" stdDeviation="0.4"/>
          </filter>
        </defs>
      </svg>
      
      <div ref={cardRef} className={`liquid-glass ${className}`} style={{ borderRadius: radius }}>
        <div className="relative z-10 w-full h-full">{children}</div>
      </div>
    </>
  );
}
