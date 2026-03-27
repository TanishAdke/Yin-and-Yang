import React from "react";
import { motion } from "framer-motion";

export default function YinYangButton({ onClick, text, activePage }) {
  const isYinActive = activePage === "yin" || activePage === "both";
  const isYangActive = activePage === "yang" || activePage === "both";
  const hoverRotate = activePage === "both" ? -180 : 180;

  return (
    <div className="flex flex-col items-center justify-center group relative">
      
      {/* FIX: The Halo now "blooms" in from 0 opacity over 1.5 seconds */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        whileHover={{ scale: 1.3, opacity: 0.5 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-0 w-40 h-40 rounded-full bg-zinc-500 blur-2xl"
      />

      <motion.div
        onClick={onClick}
        whileHover={{ rotate: hoverRotate, scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
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
      </motion.div>

      {text && (
        <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-10 text-[10px] font-black tracking-[0.4em] uppercase text-zinc-500 group-hover:text-current transition-colors duration-500 whitespace-nowrap">
          {text}
        </span>
      )}
    </div>
  );
}