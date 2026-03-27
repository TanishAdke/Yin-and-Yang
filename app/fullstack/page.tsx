"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import YinYangButton from "@/components/YinYangButton";
import BackgroundEffects from "@/components/BackgroundEffects";
import MagneticWrapper from "@/components/MagneticWrapper"; // <-- Imported Magnet

export default function FullStackPage() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  const cinematicEase = [0.16, 1, 0.3, 1];

  const handleTransition = () => {
    setIsExiting(true);
    setTimeout(() => {
      router.push("/"); 
    }, 850); // Kept the slight buffer stretch here too!
  };

  const skills = {
    front: [
      { name: "React / Next.js", level: "95%" },
      { name: "Tailwind / CSS", level: "92%" },
      { name: "TypeScript", level: "88%" },
    ],
    back: [
      { name: "Node.js / Express", level: "90%" },
      { name: "PostgreSQL / SQL", level: "85%" },
      { name: "System Architecture", level: "80%" },
    ],
    integration: [
      { name: "API Design", level: "92%" },
      { name: "Docker / CI/CD", level: "75%" },
      { name: "Auth / Security", level: "88%" },
    ]
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden font-sans">
      
      <div className="absolute inset-0 flex flex-col md:flex-row z-0">
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-black" />
      </div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1.5, ease: cinematicEase }}
        className="absolute inset-0 z-10 pointer-events-none"
      >
        <BackgroundEffects intensity="high" showLines={true} />
      </motion.div>

      <AnimatePresence>
        {isExiting && (
          <motion.div
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-white z-[100]"
          />
        )}
      </AnimatePresence>

      <div className="relative z-20 w-full min-h-screen flex flex-col md:flex-row pointer-events-none">
        
        {/* Left Content (Yin - Black Hover) */}
        <section className="flex-1 p-10 md:p-24 flex flex-col justify-center items-center md:items-end border-r border-zinc-100/50 pointer-events-auto">
          <div className="w-full max-w-sm md:text-right">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ duration: 1.2, delay: 0.4 }} className="text-[10px] font-black tracking-[0.6em] uppercase text-black mb-2">
              Yin
            </motion.p>
            <motion.h2 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, ease: cinematicEase, delay: 0.2 }} className="text-6xl font-black uppercase tracking-tighter text-black mb-12">
              Frontend
            </motion.h2>
            
            <div className="space-y-10 text-left md:text-right">
              {skills.front.map((s, i) => (
                <motion.div key={s.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.0, ease: cinematicEase, delay: 0.6 + (i * 0.1) }}>
                  <MagneticWrapper className="py-2 group cursor-default">
                    <div className="flex justify-between md:flex-row-reverse text-[10px] font-bold uppercase text-black/50 group-hover:text-black mb-3 transition-colors duration-300">
                      <span className="md:ml-4 tracking-widest group-hover:tracking-[0.3em] transition-all duration-300">{s.name}</span>
                      <span className="font-mono">{s.level}</span>
                    </div>
                    <div className="h-[2px] w-full bg-zinc-200 overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: s.level }} transition={{ duration: 1.8, ease: cinematicEase, delay: 0.8 + (i * 0.1) }} className="h-full bg-zinc-400 group-hover:bg-black transition-colors duration-300" />
                    </div>
                  </MagneticWrapper>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Right Content (Yang - White Hover) */}
        <section className="flex-1 p-10 md:p-24 flex flex-col justify-center items-center md:items-start pointer-events-auto">
          <div className="w-full max-w-sm">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ duration: 1.2, delay: 0.4 }} className="text-[10px] font-black tracking-[0.6em] uppercase text-white mb-2">
              Yang
            </motion.p>
            <motion.h2 initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, ease: cinematicEase, delay: 0.2 }} className="text-6xl font-black uppercase tracking-tighter text-white mb-12">
              Backend
            </motion.h2>
            
            <div className="space-y-10">
              {skills.back.map((s, i) => (
                <motion.div key={s.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.0, ease: cinematicEase, delay: 0.6 + (i * 0.1) }}>
                  <MagneticWrapper className="py-2 group cursor-default">
                    <div className="flex justify-between text-[10px] font-bold uppercase text-white/50 group-hover:text-white mb-3 transition-colors duration-300">
                      <span className="tracking-widest group-hover:tracking-[0.3em] transition-all duration-300">{s.name}</span>
                      <span className="font-mono">{s.level}</span>
                    </div>
                    <div className="h-[2px] w-full bg-zinc-800 overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: s.level }} transition={{ duration: 1.8, ease: cinematicEase, delay: 0.8 + (i * 0.1) }} className="h-full bg-zinc-600 group-hover:bg-white transition-colors duration-300" />
                    </div>
                  </MagneticWrapper>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] flex items-center justify-center pointer-events-auto">
        <div className="bg-white rounded-full p-2 shadow-2xl">
          <YinYangButton onClick={handleTransition} text="Cycle" activePage="both" />
        </div>
      </div>

      <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, ease: cinematicEase, delay: 1.0 }} className="absolute bottom-0 w-full bg-zinc-950/80 backdrop-blur-lg border-t border-white/10 p-6 flex flex-wrap justify-center items-center gap-x-12 gap-y-4 z-[60] pointer-events-auto">
        <div className="w-full text-center mb-2">
          <span className="text-[9px] font-black tracking-[1em] uppercase text-zinc-500">Core Integrations</span>
        </div>
        {skills.integration.map((s, i) => (
          <div key={s.name} className="flex flex-col items-center">
            {/* Added subtle magnet to the footer items too! */}
            <MagneticWrapper className="flex flex-col items-center py-2 group cursor-default">
              <span className="text-[10px] font-bold uppercase text-white/50 group-hover:text-white transition-colors duration-300 mb-2">{s.name}</span>
              <div className="w-32 h-[1px] bg-white/10">
                <motion.div initial={{ width: 0 }} animate={{ width: s.level }} transition={{ duration: 1.5, ease: cinematicEase, delay: 1.4 + (i * 0.1) }} className="h-full bg-zinc-500 group-hover:bg-white transition-colors duration-300" />
              </div>
            </MagneticWrapper>
          </div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.5 }} className="absolute top-10 w-full flex justify-center pointer-events-none z-[60]">
        <div className="flex w-full max-w-[100vw] text-[12px] font-black tracking-[1.8em] uppercase">
          <div className="w-1/2 text-right pr-4 text-black mix-blend-difference">
            Tanish Adke 
          </div>
          <div className="w-1/2 text-left pl-4 text-white">
             Class of 2027
          </div>
        </div>
      </motion.div>
    </main>
  );
}