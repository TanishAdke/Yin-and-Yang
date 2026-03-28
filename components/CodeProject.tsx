"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNeonAudio } from "@/app/hooks/useNeonAudio";

interface CodeProjectProps {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string; // Optional GitHub Link
  liveUrl?: string;   // Optional Deployment Link
}

export default function CodeProject({ 
  id, 
  title, 
  description, 
  techStack, 
  githubUrl, 
  liveUrl 
}: CodeProjectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { playHover, playClick } = useNeonAudio();

  return (
    <div 
      className="w-full border-b border-zinc-800 font-mono text-sm group" 
      onMouseEnter={playHover}
    >
      {/* 1. The Terminal Trigger */}
      <button 
        onClick={() => { playClick(); setIsOpen(!isOpen); }} 
        className="w-full flex items-center justify-between py-6 text-left focus:outline-none cursor-crosshair"
      >
        <div className="flex items-center gap-4 text-zinc-400 group-hover:text-white transition-colors duration-300">
          <span className="text-green-500 font-black">{">"}</span>
          <span className="tracking-widest">execute ./{id}.sh</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 group-hover:text-zinc-400 transition-colors">
            {isOpen ? "Running" : "Standby"}
          </span>
          <motion.div 
            animate={{ rotate: isOpen ? 90 : 0 }} 
            className="text-zinc-600"
          >
            [+]
          </motion.div>
        </div>
      </button>

      {/* 2. Expanded Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            className="overflow-hidden"
          >
            <div className="pb-8 pl-6 border-l border-zinc-800 ml-[6px] space-y-6">
              <div className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase">
                [SYSTEM] Execution successful...
              </div>
              
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-2">
                  {title}
                </h3>
                <p className="text-zinc-400 leading-relaxed max-w-2xl text-xs sm:text-sm font-sans">
                  {description}
                </p>
              </div>

              {/* Tech Stack Rendering */}
              <div>
                <span className="text-[10px] text-zinc-500 tracking-[0.2em] uppercase block mb-3">
                  const dependencies = [
                </span>
                <div className="flex flex-wrap gap-2 pl-4">
                  {techStack.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-green-400 text-[10px] tracking-widest uppercase">
                      "{tech}"
                    </span>
                  ))}
                </div>
                <span className="text-[10px] text-zinc-500 tracking-[0.2em] uppercase block mt-2">
                  ];
                </span>
              </div>

              {/* 3. External Links Section */}
              <div className="flex gap-6 pt-4">
                {githubUrl && (
                  <motion.a 
                    href={githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ x: 5, color: "#fff" }}
                    className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-zinc-400 transition-colors border-b border-zinc-800 hover:border-white pb-1"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span>[View_Source]</span>
                  </motion.a>
                )}

                {liveUrl && (
                  <motion.a 
                    href={liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ x: 5, color: "#fff" }}
                    className="text-xs tracking-[0.2em] uppercase text-zinc-400 transition-colors border-b border-zinc-800 hover:border-white pb-1"
                  >
                    [Deploy_Live]
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}