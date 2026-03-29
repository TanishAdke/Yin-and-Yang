"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import YinYangButton from "@/components/YinYangButton";
import BackgroundEffects from "@/components/BackgroundEffects";
import MagneticWrapper from "@/components/MagneticWrapper"; // <-- Imported Magnet
import { useNeonAudio } from "@/app/hooks/useNeonAudio"; // 1. Import the audio hook

const skills = [
  { name: "JavaScript / TypeScript", level: 90 },
  { name: "Python", level: 85 },
  { name: "NextJS", level: 75 },
  { name: "Java", level: 80 },
  { name: "API Development", level: 70 },
];

export default function YangPage() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  // 2. Initialize the hover sound
  const { playHover } = useNeonAudio();

  const cinematicEase = [0.16, 1, 0.3, 1] as const;

  const handleTransition = () => {
    setIsExiting(true);
    setTimeout(() => {
      router.push("/fullstack");
    }, 1050);
  };

  return (
    <main className="relative min-h-screen w-full bg-black text-white overflow-hidden flex items-center justify-center">
      
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1.5, ease: cinematicEase }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <BackgroundEffects />
      </motion.div>

      <AnimatePresence>
        {isExiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "50vw" }}
              transition={{ duration: 0.8, ease: cinematicEase, delay: 0.2 }}
              className="absolute left-0 top-0 h-full bg-white border-r border-zinc-100"
            />
            <motion.div
              initial={{ x: "-25vw" }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8, ease: cinematicEase, delay: 0.2 }}
              className="relative z-10 bg-white rounded-full p-2 shadow-2xl pointer-events-none"
            >
              <YinYangButton activePage="both" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="max-w-6xl w-full px-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center z-10"
      >
        <div className="flex justify-center">
          <YinYangButton onClick={handleTransition} text="Yin and Yang" activePage="yang" />
        </div>

        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: cinematicEase, delay: 0.6 }} 
            className="text-7xl font-black uppercase mb-4"
          >
            Tanish Adke
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1.2, ease: cinematicEase, delay: 0.8 }}
            className="text-xl tracking-[0.3em] uppercase mb-12"
          >
            Class of 2027 • Programming
          </motion.p>
          
          <div className="space-y-6">
            {skills.map((skill, i) => (
              <motion.div 
                key={skill.name} 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 1.0, ease: cinematicEase, delay: 1.0 + (i * 0.1) }} 
                onMouseEnter={playHover} // 3. Attached the hover sound to the skill wrapper
              >
                {/* INVERTED MAGNET: Stretches to pure white on hover */}
                <MagneticWrapper className="py-2 group cursor-default">
                  <div className="flex justify-between text-xs font-bold uppercase mb-1 text-white/60 group-hover:text-white transition-colors duration-300">
                    <span className="group-hover:tracking-[0.2em] transition-all duration-300 ease-out">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-1 w-full bg-zinc-900 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.8, ease: cinematicEase, delay: 1.2 + (i * 0.1) }} 
                      className="h-full bg-zinc-700 group-hover:bg-white transition-colors duration-300" 
                    />
                  </div>
                </MagneticWrapper>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </main>
  );
}