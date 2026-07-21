import { useEffect } from "react";
import Lenis from "lenis";
import { LiquidGlassCard } from "./components/LiquidGlassCard";
import { FluidBackground } from "./components/FluidBackground";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

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
      
      <main className="min-h-[200vh] w-full max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center">
        {/* Hero Section */}
        <div className="min-h-[80vh] flex flex-col items-center justify-center gap-12 w-full text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mix-blend-screen text-white/90">
            JUSTIN LEE
          </h1>
          
          <LiquidGlassCard className="w-full max-w-sm p-8 text-white/90 flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
              SYSTEM & AI
            </h2>
            <div className="h-px w-full bg-white/20"></div>
            <p className="text-sm tracking-widest opacity-80 uppercase">
              SRE • Full-Stack • Medical Imaging
            </p>
          </LiquidGlassCard>
        </div>

        {/* Mock Bento Box Section for Projects */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-32">
          <LiquidGlassCard className="col-span-1 md:col-span-2 min-h-[300px] p-8" radius={24}>
            <div className="flex flex-col h-full justify-between">
              <h3 className="text-3xl font-bold">14O / cf-crm</h3>
              <p className="text-white/70">React, FastAPI, Supabase Auth, RabbitMQ</p>
            </div>
          </LiquidGlassCard>
          
          <LiquidGlassCard className="col-span-1 min-h-[300px] p-8" radius={24}>
            <div className="flex flex-col h-full justify-between">
              <h3 className="text-3xl font-bold">Prometheus</h3>
              <p className="text-white/70">AI-powered SOP records</p>
            </div>
          </LiquidGlassCard>
          
          <LiquidGlassCard className="col-span-1 min-h-[300px] p-8" radius={24}>
            <div className="flex flex-col h-full justify-between">
              <h3 className="text-3xl font-bold">ISO Workflow</h3>
              <p className="text-white/70">Next.js, Neon PG</p>
            </div>
          </LiquidGlassCard>

          <LiquidGlassCard className="col-span-1 md:col-span-2 min-h-[300px] p-8" radius={24}>
            <div className="flex flex-col h-full justify-between">
              <h3 className="text-3xl font-bold">LabMonitor</h3>
              <p className="text-white/70">Edge-to-cloud IoT monitoring</p>
            </div>
          </LiquidGlassCard>
        </div>

        {/* Footer */}
        <div className="w-full mt-32 mb-16">
          <LiquidGlassCard className="w-full min-h-[40vh] flex flex-col items-center justify-center p-12 text-center" radius={40}>
            <h2 className="text-5xl md:text-7xl font-bold mb-6">LET'S BUILD SYSTEMS.</h2>
            <p className="text-xl text-white/70">justin30303.jl@gmail.com</p>
          </LiquidGlassCard>
        </div>
      </main>
    </>
  );
}
