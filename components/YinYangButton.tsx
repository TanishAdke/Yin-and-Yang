"use client";

import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function YinYangButton({ onClick, text, activePage }) {
  const isYinActive = activePage === "yin" || activePage === "both";
  const isYangActive = activePage === "yang" || activePage === "both";
  const hoverRotate = activePage === "both" ? -180 : 180;

  // State to track if the user broke the balance
  const [isGlitching, setIsGlitching] = useState(false);
  const glitchControls = useAnimation();

  // Triggered when the user drags the button
  const handleDrag = async (event, info) => {
    // If they drag it more than 40 pixels away from the dead-center
    if (Math.abs(info.offset.x) > 40 || Math.abs(info.offset.y) > 40) {
      if (!isGlitching) {
        setIsGlitching(true);

        // 1. Fire a violent, jagged animation sequence
        await glitchControls.start({
          x: [0, -15, 15, -15, 15, -10, 10, 0],
          y: [0, 15, -15, 15, -15, 10, -10, 0],
          skewX: [0, 15, -15, 10, -10, 0],
          filter: [
            "invert(0%) hue-rotate(0deg)",
            "invert(100%) hue-rotate(90deg) contrast(200%)",
            "invert(100%) hue-rotate(-90deg) contrast(200%)",
            "invert(0%) hue-rotate(0deg)",
          ],
          transition: { duration: 0.5, ease: "linear" },
        });

        // 2. Lock them out for 1.5 seconds before they can try again
        setTimeout(() => {
          setIsGlitching(false);
        }, 1500);
      }
    }
  };

  // Block the routing click if the button is currently glitching
  const safeOnClick = (e) => {
    if (isGlitching) return;
    if (onClick) onClick(e);
  };

  return (
    <div className="flex flex-col items-center justify-center group relative">
      
      {/* The Halo turns a violent red during a glitch */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        whileHover={!isGlitching ? { scale: 1.3, opacity: 0.5 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={`absolute top-0 w-40 h-40 rounded-full blur-2xl transition-colors duration-300 ${isGlitching ? 'bg-red-600' : 'bg-zinc-500'}`}
      />

      <motion.div
        // 1. Make it draggable, but bound heavily to its starting position (0,0)
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.15} // Acts like a stiff rubber band
        onDrag={handleDrag}
        onClick={safeOnClick}
        animate={glitchControls} // Attach the glitch physics
        whileHover={!isGlitching ? { rotate: hoverRotate, scale: 1.05 } : {}} 
        whileTap={!isGlitching ? { scale: 0.95 } : {}}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        className="relative z-10 w-40 h-40 rounded-full shadow-2xl cursor-pointer border border-zinc-500/30"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl rounded-full">
          <circle cx="50" cy="50" r="49.5" fill="none" stroke="#71717a" strokeWidth="0.5" className="opacity-50" />
          
          <g className={`transition-opacity duration-700 ${isYinActive ? "opacity-100" : "opacity-20"}`}>
            <path d="M 50 100 A 50 50 0 0 1 50 0 A 25 25 0 0 0 50 50 A 25 25 0 0 1 50 100 Z" fill="white" />
            <circle cx="50" cy="75" r="8" fill="black" />
          </g>

          <g className={`transition-opacity duration-700 ${isYangActive ? "opacity-100" : "opacity-20"}`}>
            <path d="M 50 0 A 50 50 0 0 1 50 100 A 25 25 0 0 0 50 50 A 25 25 0 0 1 50 0 Z" fill="black" />
            <circle cx="50" cy="25" r="8" fill="white" />
          </g>
        </svg>

        {/* 2. The secret warning text that flashes inside the button */}
        {isGlitching && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0, 1, 0, 1], scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-black/80 px-3 py-1 rounded backdrop-blur-md border border-red-600/50 shadow-[0_0_15px_red]">
              <span className="text-red-500 font-mono font-black text-[10px] tracking-[0.3em] whitespace-nowrap">
                BALANCE REQUIRED
              </span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* 3. The bottom text switches to ERROR during the glitch */}
      {text && (
        <span className={`absolute -bottom-10 left-1/2 -translate-x-1/2 z-10 text-[10px] font-black tracking-[0.4em] uppercase group-hover:text-current transition-colors duration-500 whitespace-nowrap ${isGlitching ? 'text-red-500' : 'text-zinc-500'}`}>
          {isGlitching ? 'ERROR' : text}
        </span>
      )}
    </div>
  );
}