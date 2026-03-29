"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import YinYangButton from "@/components/YinYangButton";
import BackgroundEffects from "@/components/BackgroundEffects";
import MagneticWrapper from "@/components/MagneticWrapper"; 
import { useNeonAudio } from "@/app/hooks/useNeonAudio"; 

export default function FullStackPage() {
  const router = useRouter();
  
  const [exitTarget, setExitTarget] = useState<"video" | "code" | "center" | null>(null);
  const { playHover, playClick } = useNeonAudio();

  const cinematicEase = [0.16, 1, 0.3, 1] as const;

  const handleTransition = (target: "video" | "code" | "center") => {
    playClick();
    setExitTarget(target);
    
    const delay = target === "video" ? 1200 : 850;
    
    setTimeout(() => {
      if (target === "video") router.push("/video"); 
      else if (target === "code") router.push("/code");
      else router.push("/"); 
    }, delay);
  };

  const skills = {
    editing: [
     { name: "Fast Paced Editing", level: "70%"},
     { name: "Cinematic Editing", level: "55%" },
      { name: "Color Grading", level: "80%"},
      { name: "Cinematography", level: "95%" },
    ],
    programming: [
     { name: "UI/UX Design", level: "90%"},
  { name: "Machine Learning", level: "85%" },
  { name: "Object Oriented Programming", level: "80%" },
  { name: "API Development", level: "70%" },
    ],
    integration: [
      { name: "Creative Direction", level: "92%" },
      { name: "UI/UX Design", level: "88%" },
      { name: "Project Management", level: "85%" },
    ]
  };

  return (
    <main className="relative h-screen w-full overflow-hidden font-sans">
      <div className="absolute inset-0 flex flex-col md:flex-row z-0">
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-black" />
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, ease: cinematicEase }} className="absolute inset-0 z-10 pointer-events-none">
        <BackgroundEffects intensity="high" showLines={true} />
      </motion.div>

      <AnimatePresence>
        {exitTarget === "video" && (
          <motion.div className="fixed inset-0 z-[100] pointer-events-none flex">
            <motion.div initial={{ width: "50vw" }} animate={{ width: "100vw" }} transition={{ duration: 0.8, ease: cinematicEase }} className="h-full bg-white relative z-10" />
            <motion.div initial={{ left: "50%" }} animate={{ left: "100%" }} transition={{ duration: 0.8, ease: cinematicEase }} className="absolute top-0 bottom-0 w-[2px] bg-red-500 shadow-[0_0_15px_red] z-20">
              <div className="w-4 h-4 bg-red-500 absolute -top-2 -left-[7px] rotate-45" />
            </motion.div>
            <motion.div initial={{ y: "-100%" }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: "circOut", delay: 0.2 }} className="absolute top-0 left-0 w-full h-[12vh] bg-black z-30" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: "circOut", delay: 0.2 }} className="absolute bottom-0 left-0 w-full h-[12vh] bg-black z-30" />
          </motion.div>
        )}

        {(exitTarget === "code" || exitTarget === "center") && (
          <motion.div
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className={`absolute inset-0 z-[100] ${exitTarget === "code" ? "bg-black" : "bg-white"}`}
          />
        )}
      </AnimatePresence>

      <div className="relative z-20 w-full h-full flex flex-col md:flex-row pointer-events-none pb-24 pt-16">
        
        {/* Left Content (Video Editing) */}
        <section className="flex-1 px-8 flex flex-col justify-center items-center md:items-end border-r border-zinc-100/50 pointer-events-auto">
          <div className="w-full max-w-[18rem] xl:max-w-[22rem] flex flex-col items-end text-right">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ duration: 1.2, delay: 0.4 }} className="text-[9px] font-black tracking-[0.6em] uppercase text-black mb-2">Yin</motion.p>
            <motion.h2 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, ease: cinematicEase, delay: 0.2 }} className="text-4xl xl:text-5xl font-black uppercase tracking-tighter text-black mb-6 whitespace-nowrap">Video Editing</motion.h2>
            
            <div className="space-y-4 w-full">
              {skills.editing.map((s, i) => {
                // THE CRESCENT CURVE LOGIC (Left Side)
                // Pushes the middle items further out, and top/bottom items slightly out
                let targetX = 0;
                if (i === 1 || i === 2) targetX = -72;
                else if (i === 0 || i === 3) targetX = -32;
                
                const initialX = targetX - 20;

                return (
                  <motion.div key={s.name} initial={{ opacity: 0, x: initialX }} animate={{ opacity: 1, x: targetX }} transition={{ duration: 1.0, ease: cinematicEase, delay: 0.6 + (i * 0.1) }} onMouseEnter={playHover} className="w-full">
                    <MagneticWrapper className="w-full py-2 group/skill cursor-default">
                      <div className="flex justify-between md:flex-row-reverse text-[10px] font-bold uppercase text-black/50 group-hover/skill:text-black mb-2 transition-colors duration-300">
                        <span className="md:ml-4 tracking-widest group-hover/skill:tracking-[0.3em] transition-all duration-300">{s.name}</span>
                        <span className="font-mono">{s.level}</span>
                      </div>
                      <div className="h-[2px] w-full bg-zinc-200 overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: s.level }} transition={{ duration: 1.8, ease: cinematicEase, delay: 0.8 + (i * 0.1) }} className="h-full bg-zinc-400 group-hover/skill:bg-black transition-colors duration-300" />
                      </div>
                    </MagneticWrapper>
                  </motion.div>
                );
              })}
            </div>

            <motion.button onClick={() => handleTransition("video")} onMouseEnter={playHover} whileTap={{ scale: 0.95 }} className="mt-8 px-8 py-3 border border-black text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors duration-300">
              View Edits
            </motion.button>
          </div>
        </section>

        {/* Right Content (Programming) */}
        <section className="flex-1 px-8 flex flex-col justify-center items-center md:items-start pointer-events-auto">
          <div className="w-full max-w-[18rem] xl:max-w-[22rem] flex flex-col items-start text-left">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ duration: 1.2, delay: 0.4 }} className="text-[9px] font-black tracking-[0.6em] uppercase text-white mb-2">Yang</motion.p>
            <motion.h2 initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, ease: cinematicEase, delay: 0.2 }} className="text-4xl xl:text-5xl font-black uppercase tracking-tighter text-white mb-6 whitespace-nowrap">Programming</motion.h2>
            
            <div className="space-y-4 w-full">
              {skills.programming.map((s, i) => {
                // THE CRESCENT CURVE LOGIC (Right Side)
                let targetX = 0;
                if (i === 1 || i === 2) targetX = 72;
                else if (i === 0 || i === 3) targetX = 32;
                
                const initialX = targetX + 20;

                return (
                  <motion.div key={s.name} initial={{ opacity: 0, x: initialX }} animate={{ opacity: 1, x: targetX }} transition={{ duration: 1.0, ease: cinematicEase, delay: 0.6 + (i * 0.1) }} onMouseEnter={playHover} className="w-full">
                    <MagneticWrapper className="w-full py-2 group/skill cursor-default">
                      <div className="flex justify-between text-[10px] font-bold uppercase text-white/50 group-hover/skill:text-white mb-2 transition-colors duration-300">
                        <span className="tracking-widest group-hover/skill:tracking-[0.3em] transition-all duration-300">{s.name}</span>
                        <span className="font-mono">{s.level}</span>
                      </div>
                      <div className="h-[2px] w-full bg-zinc-800 overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: s.level }} transition={{ duration: 1.8, ease: cinematicEase, delay: 0.8 + (i * 0.1) }} className="h-full bg-zinc-600 group-hover/skill:bg-white transition-colors duration-300" />
                      </div>
                    </MagneticWrapper>
                  </motion.div>
                );
              })}
            </div>

            <motion.button onClick={() => handleTransition("code")} onMouseEnter={playHover} whileTap={{ scale: 0.95 }} className="mt-8 px-8 py-3 border border-white text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors duration-300">
              View Code
            </motion.button>
          </div>
        </section>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] flex items-center justify-center pointer-events-auto">
        <div className="bg-white rounded-full p-2 shadow-2xl">
          {/* Removed the 'Cycle' text here */}
          <YinYangButton onClick={() => handleTransition("center")} text="" activePage="both" />
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.5 }} className="absolute top-8 w-full flex justify-center pointer-events-none z-[60]">
        <div className="flex w-full max-w-[100vw] text-[10px] md:text-[12px] font-black tracking-[1.8em] uppercase">
          <div className="w-1/2 text-right pr-4 text-black mix-blend-difference">Tanish Adke</div>
          <div className="w-1/2 text-left pl-4 text-white">Class of 2027</div>
        </div>
      </motion.div>
      
      <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, ease: cinematicEase, delay: 1.0 }} className="absolute bottom-0 w-full bg-zinc-950/80 backdrop-blur-lg border-t border-white/10 py-4 flex flex-wrap justify-center items-center gap-x-12 gap-y-2 z-[60] pointer-events-auto">
        <div className="w-full text-center">
          <span className="text-[8px] font-black tracking-[1em] uppercase text-zinc-500">Core Integrations</span>
        </div>
        <div className="flex flex-wrap justify-center gap-x-8">
          {skills.integration.map((s, i) => (
            <div key={s.name} className="flex flex-col items-center" onMouseEnter={playHover}>
              <MagneticWrapper className="flex flex-col items-center py-2 group cursor-default">
                <span className="text-[9px] font-bold uppercase text-white/50 group-hover:text-white transition-colors duration-300 mb-1">{s.name}</span>
                <div className="w-24 h-[1px] bg-white/10">
                  <motion.div initial={{ width: 0 }} animate={{ width: s.level }} transition={{ duration: 1.5, ease: cinematicEase, delay: 1.4 + (i * 0.1) }} className="h-full bg-zinc-500 group-hover:bg-white transition-colors duration-300" />
                </div>
              </MagneticWrapper>
            </div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}