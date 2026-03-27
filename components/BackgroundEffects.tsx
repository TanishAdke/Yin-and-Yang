"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BackgroundEffects({ intensity = "normal", showLines = false }) {
  // Boosts opacity if intensity is set to "high"
  const isHigh = intensity === "high";

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* --- NEW: Edge Lines --- */}
      {showLines && (
        <svg className={`absolute inset-0 w-full h-full mix-blend-difference ${isHigh ? 'opacity-30' : 'opacity-15'}`}>
          <g stroke="white" strokeWidth="1.5" strokeLinecap="round">
            {/* Top Edge Group */}
            <motion.line x1="20%" y1="0" x2="20%" y2="15%" animate={{ y2: ["15%", "18%", "15%"] }} transition={{ duration: 8, repeat: Infinity }} />
            <motion.line x1="22%" y1="0" x2="22%" y2="8%" animate={{ y2: ["8%", "10%", "8%"] }} transition={{ duration: 10, repeat: Infinity }} />
            
            {/* Bottom Edge Group */}
            <motion.line x1="80%" y1="100%" x2="80%" y2="80%" animate={{ y2: ["80%", "75%", "80%"] }} transition={{ duration: 9, repeat: Infinity }} />
            <motion.line x1="78%" y1="100%" x2="78%" y2="90%" animate={{ y2: ["90%", "85%", "90%"] }} transition={{ duration: 11, repeat: Infinity }} />

            {/* Left Edge Group */}
            <motion.line x1="0" y1="40%" x2="10%" y2="40%" animate={{ x2: ["10%", "15%", "10%"] }} transition={{ duration: 12, repeat: Infinity }} />
            <motion.line x1="0" y1="42%" x2="5%" y2="42%" animate={{ x2: ["5%", "8%", "5%"] }} transition={{ duration: 7, repeat: Infinity }} />

            {/* Right Edge Group */}
            <motion.line x1="100%" y1="60%" x2="85%" y2="60%" animate={{ x2: ["85%", "80%", "85%"] }} transition={{ duration: 10, repeat: Infinity }} />
            <motion.line x1="100%" y1="62%" x2="92%" y2="62%" animate={{ x2: ["92%", "88%", "92%"] }} transition={{ duration: 13, repeat: Infinity }} />
          </g>
        </svg>
      )}

      {/* 1. Large Ambient Orb (Top Left) */}
      <motion.div
        className={`absolute top-[10%] left-[10%] w-[40vw] h-[40vw] bg-white rounded-full mix-blend-difference blur-[120px] transition-opacity duration-1000 ${isHigh ? 'opacity-40' : 'opacity-20'}`}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 80, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 2. Large Ambient Orb (Bottom Right) */}
      <motion.div
        className={`absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] bg-white rounded-full mix-blend-difference blur-[150px] transition-opacity duration-1000 ${isHigh ? 'opacity-25' : 'opacity-10'}`}
        animate={{
          x: [0, -120, 60, 0],
          y: [0, 100, -80, 0],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 3. Slow Drifting Geometric Box */}
      <motion.div
        className={`absolute top-1/2 left-1/3 w-96 h-96 border rounded-3xl mix-blend-difference transition-opacity duration-1000 ${isHigh ? 'border-zinc-500/40' : 'border-zinc-500/20'}`}
        animate={{
          rotate: [0, 360],
          x: [0, 200, -150, 0],
          y: [0, -200, 150, 0],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      />

       {/* 4. Secondary Drifting Box */}
       <motion.div
        className={`absolute bottom-1/4 right-1/3 w-64 h-64 border rounded-full mix-blend-difference transition-opacity duration-1000 ${isHigh ? 'border-zinc-500/30' : 'border-zinc-500/10'}`}
        animate={{
          rotate: [360, 0],
          x: [0, -150, 200, 0],
          y: [0, 150, -200, 0],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}