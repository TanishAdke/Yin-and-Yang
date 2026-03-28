"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import YinYangButton from "@/components/YinYangButton";
import BackgroundEffects from "@/components/BackgroundEffects";
import MagneticWrapper from "@/components/MagneticWrapper";
import { useNeonAudio } from "@/app/hooks/useNeonAudio"; // 1. Imported the audio hook

const skills = [
  { name: "Adobe Premiere Pro", level: 70 },
  { name: "Adobe After Effects", level: 55 },
  { name: "Photoshop", level: 80 },
  { name: "Vegas Pro 16", level: 95 },
  { name: "Sapphire/BCC/Universe", level: 85 },
];

export default function YinPage() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  
  // 2. Initialized the hover sound
  const { playHover } = useNeonAudio();

  const handleTransition = () => {
    setIsExiting(true);
  };

  return (
    <main className="relative min-h-screen w-full bg-white text-black overflow-hidden flex items-center justify-center">
      
      <BackgroundEffects intensity="high" showLines={true} />

      {/* --- FLUID MORPH & SLIDE OVERLAY --- */}
      <AnimatePresence>
        {isExiting && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 bg-black"
            />

            <div className="max-w-6xl w-full px-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
              
              <div className="flex justify-center">
                <motion.div
                  layoutId="yin-yang-transit"
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  onLayoutAnimationComplete={() => router.push("/yang")}
                  className="rounded-full p-2"
                >
                  <YinYangButton activePage="yang" />
                </motion.div>
              </div>

              <div />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Grid */}
      <motion.div 
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-6xl w-full px-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center z-10"
      >
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl font-black uppercase mb-4"
          >
            Tanish Adke
          </motion.h1>
          <p className="text-xl tracking-[0.3em] uppercase opacity-50 mb-12">Class of 2027 • Video Editing</p>
          
          <div className="space-y-6">
            {skills.map((skill, i) => (
              <motion.div 
                key={skill.name} 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: i * 0.1 }}
                onMouseEnter={playHover} // 3. Attached the hover sound to the skill wrapper
              >
                <MagneticWrapper className="py-2 group cursor-default">
                  
                  <div className="flex justify-between text-xs font-bold uppercase mb-1 text-black/60 group-hover:text-black transition-colors duration-300">
                    <span className="group-hover:tracking-[0.2em] transition-all duration-300 ease-out">
                      {skill.name}
                    </span>
                    <span>{skill.level}%</span>
                  </div>
                  
                  <div className="h-1 w-full bg-gray-100">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className="h-full bg-zinc-700 group-hover:bg-black transition-colors duration-300" 
                    />
                  </div>

                </MagneticWrapper>
              </motion.div>
            ))}
          </div>
        </div>

        {/* STARTING POSITION */}
        <div className="flex justify-center">
          {!isExiting && (
            <motion.div layoutId="yin-yang-transit">
              <YinYangButton 
                onClick={handleTransition} 
                text="Go Yang" 
                activePage="yin" 
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </main>
  );
}