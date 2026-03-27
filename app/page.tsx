"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import YinYangButton from "@/components/YinYangButton";
import BackgroundEffects from "@/components/BackgroundEffects";
import MagneticWrapper from "@/components/MagneticWrapper";
const skills = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 88 },
  { name: "Tailwind CSS", level: 92 },
  { name: "UI/UX Design", level: 80 },
  { name: "Framer Motion", level: 85 },
];

export default function YinPage() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

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
            
            {/* Background smoothly morphs to black */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 bg-black"
            />

            {/* THE MAGIC GRID: This perfectly mimics your actual layout constraints */}
            <div className="max-w-6xl w-full px-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
              
              {/* TARGET DESTINATION: The left column */}
              <div className="flex justify-center">
                <motion.div
                  layoutId="yin-yang-transit" // Matches the layoutId below!
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  onLayoutAnimationComplete={() => router.push("/yang")}
                  className="rounded-full p-2"
                >
                  <YinYangButton activePage="yang" />
                </motion.div>
              </div>

              {/* Empty right column to keep the grid spacing perfect */}
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
          <p className="text-xl tracking-[0.3em] uppercase opacity-50 mb-12">Class of 2027 • Frontend</p>
          
          <div className="space-y-6">
  {skills.map((skill, i) => (
    <motion.div 
      key={skill.name} 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ delay: i * 0.1 }}
    >
      {/* 1. Wrap the item in the Magnet, and add 'group' so children can react */}
      <MagneticWrapper className="py-2 group cursor-default">
        
        {/* The text starts slightly faded (black/60) and goes full solid black on hover */}
        <div className="flex justify-between text-xs font-bold uppercase mb-1 text-black/60 group-hover:text-black transition-colors duration-300">
          
          {/* 2. The letter spacing stretches outwards when the magnet pulls */}
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
            // 3. The bar starts as a dark grey (zinc-700) and swells to pure black on hover
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
          {/* By removing this button and spawning the identical layoutId above, Framer bridges the gap automatically */}
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