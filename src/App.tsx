import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { motion, useScroll, useTransform } from "framer-motion";
import { LiquidGlassCard } from "./components/LiquidGlassCard";
import { FluidBackground } from "./components/FluidBackground";

export default function App() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8, // More premium, slightly heavier scroll feel
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    return () => lenis.destroy();
  }, []);

  return (
    <div ref={container} className="relative bg-[#0c0e14] text-[#eaeef5] selection:bg-white/20">
      <FluidBackground />
      
      {/* 
        Custom Grid Lines for Structure (like cinetica/haoqi) 
        This provides architectural structure behind the elements
      */}
      <div className="fixed inset-0 pointer-events-none opacity-20" 
           style={{ background: "repeating-linear-gradient(90deg, transparent, transparent calc(25% - 1px), rgba(255,255,255,0.1) 25%)" }} />

      <main className="relative w-full">
        {/* === HERO SECTION === */}
        <motion.section 
          style={{ y: heroY, opacity: heroOpacity }}
          className="h-screen w-full flex flex-col justify-end pb-32 px-6 md:px-12 lg:px-24"
        >
          <div className="flex flex-col md:flex-row justify-between items-end w-full gap-12">
            <div className="max-w-2xl origin-left">
              <motion.h1 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[12vw] md:text-[8vw] leading-[0.85] font-extrabold tracking-tighter"
              >
                JUSTIN <br /> LEE.
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="mt-8 flex gap-4"
              >
                {['SRE', 'AI RESEARCH', 'FULL-STACK'].map((tag) => (
                  <span key={tag} className="px-4 py-1.5 rounded-full border border-white/20 text-xs tracking-widest bg-white/5 backdrop-blur-md">
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <LiquidGlassCard className="w-64 h-64 md:w-80 md:h-80 p-8 flex flex-col justify-between" radius={24}>
                <p className="text-sm tracking-widest leading-relaxed opacity-70">
                  Bridging the gap between medical AI research and scalable infrastructure. Based in Taiwan.
                </p>
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center relative overflow-hidden group cursor-pointer">
                  <span className="group-hover:translate-y-full transition-transform duration-500 absolute">↓</span>
                  <span className="-translate-y-full group-hover:translate-y-0 transition-transform duration-500 absolute">↓</span>
                </div>
              </LiquidGlassCard>
            </motion.div>
          </div>
        </motion.section>

        {/* === EDITORIAL EXPERIENCE SECTION === */}
        <section className="min-h-screen w-full px-6 md:px-12 lg:px-24 py-32 z-10 relative bg-gradient-to-b from-transparent to-[#0c0e14]/90">
          <div className="flex flex-col md:flex-row gap-24">
            <div className="md:w-1/3">
              <h2 className="text-xl tracking-[0.2em] uppercase sticky top-32 text-white/50">
                Selected Work <br/> & Architecture
              </h2>
            </div>
            
            <div className="md:w-2/3 flex flex-col gap-32">
              {/* Project 1: Asymmetric left */}
              <div className="flex justify-start">
                <LiquidGlassCard className="w-full max-w-lg p-10 group" radius={16}>
                  <p className="text-xs tracking-widest text-white/40 mb-4">01 — INFRASTRUCTURE</p>
                  <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 group-hover:pl-4 transition-all duration-500">14O / cf-crm</h3>
                  <p className="text-white/60 leading-relaxed font-light">
                    Architected a robust CRM platform with RabbitMQ-based asynchronous OCR workers. Integrated Supabase authentication and complete Docker Compose deployment pipelines.
                  </p>
                </LiquidGlassCard>
              </div>

              {/* Project 2: Asymmetric right */}
              <div className="flex justify-end">
                <LiquidGlassCard className="w-full max-w-md p-10 group" radius={16}>
                  <p className="text-xs tracking-widest text-white/40 mb-4">02 — MEDICAL AI</p>
                  <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 group-hover:pl-4 transition-all duration-500">Prometheus</h3>
                  <p className="text-white/60 leading-relaxed font-light">
                    AI-powered smart glasses system for laboratory personnel. Features multimodal AI for SOP records, combining Vue/React gateways with edge-device interfaces.
                  </p>
                </LiquidGlassCard>
              </div>

              {/* Project 3: Wide cinematic */}
              <div className="flex justify-center w-full">
                <LiquidGlassCard className="w-full p-12 group" radius={16}>
                  <div className="md:flex justify-between items-end gap-12">
                    <div>
                      <p className="text-xs tracking-widest text-white/40 mb-4">03 — IOT & CLOUD</p>
                      <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 group-hover:pl-4 transition-all duration-500">LabMonitor</h3>
                      <p className="text-white/60 leading-relaxed font-light max-w-md">
                        Evolution from a lightweight edge prototype to an enterprise IoT platform. Edge-to-cloud integration using Next.js, Azure AD, and hardware-accelerated Flask proxies.
                      </p>
                    </div>
                    <div className="mt-8 md:mt-0 opacity-50 text-xs tracking-widest text-right">
                      NEXT.JS / NEON PG / VERCEL
                    </div>
                  </div>
                </LiquidGlassCard>
              </div>
            </div>
          </div>
        </section>

        {/* === FOOTER / CONTACT === */}
        <section className="h-screen w-full flex items-center justify-center relative overflow-hidden">
          <LiquidGlassCard className="w-[90vw] h-[80vh] flex flex-col items-center justify-center p-8 text-center" radius={40}>
            <motion.h2 
              whileHover={{ scale: 1.05, letterSpacing: "0.05em" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-[10vw] md:text-[8vw] font-black tracking-tighter leading-none cursor-pointer mb-8"
            >
              LET'S BUILD<br/>SYSTEMS.
            </motion.h2>
            <div className="flex gap-8 text-sm tracking-widest">
              <a href="#" className="hover:text-white/50 transition-colors">EMAIL</a>
              <a href="#" className="hover:text-white/50 transition-colors">GITHUB</a>
              <a href="#" className="hover:text-white/50 transition-colors">LINKEDIN</a>
            </div>
          </LiquidGlassCard>
        </section>
      </main>
    </div>
  );
}
