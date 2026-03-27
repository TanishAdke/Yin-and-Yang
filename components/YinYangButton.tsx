import React from "react";
import { motion } from "framer-motion";

export default function YinYangButton({ onClick, text, activePage }) {
  const isYinActive = activePage === "yin" || activePage === "both";
  const isYangActive = activePage === "yang" || activePage === "both";
  const hoverRotate = activePage === "both" ? -180 : 180;

  return (
    <div className="flex flex-col items-center justify-center group relative">
      
      {/* FIX 1: The Halo is now permanently visible at 20% opacity to separate the black shape from a black background */}
      <motion.div 
        className="absolute top-0 w-40 h-40 rounded-full bg-zinc-500 blur-2xl opacity-20 group-hover:opacity-50 transition-opacity duration-500"
        whileHover={{ scale: 1.3 }}
      />

      <motion.div
        onClick={onClick}
        whileHover={{ rotate: hoverRotate, scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        // FIX 2: Added a subtle border ring (border-zinc-500/30) so the edge is always defined
        className="relative z-10 w-40 h-40 rounded-full shadow-2xl cursor-pointer border border-zinc-500/30"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl rounded-full">
          
          {/* Optional: A crisp inner SVG ring for extra definition */}
          <circle cx="50" cy="50" r="49.5" fill="none" stroke="#71717a" strokeWidth="0.5" className="opacity-50" />

          {/* Yin Group */}
          <g className={`transition-opacity duration-700 ${isYinActive ? "opacity-100" : "opacity-20"}`}>
            <path d="M 50 100 A 50 50 0 0 1 50 0 A 25 25 0 0 0 50 50 A 25 25 0 0 1 50 100 Z" fill="white" />
            <circle cx="50" cy="75" r="8" fill="black" />
          </g>

          {/* Yang Group */}
          <g className={`transition-opacity duration-700 ${isYangActive ? "opacity-100" : "opacity-20"}`}>
            <path d="M 50 0 A 50 50 0 0 1 50 100 A 25 25 0 0 0 50 50 A 25 25 0 0 1 50 0 Z" fill="black" />
            <circle cx="50" cy="25" r="8" fill="white" />
          </g>

        </svg>
      </motion.div>

      {text && (
        <span className="relative z-10 mt-8 text-[10px] font-black tracking-[0.4em] uppercase text-zinc-500 group-hover:text-current transition-colors duration-500">
          {text}
        </span>
      )}
    </div>
  );
}