"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNeonAudio } from "@/app/hooks/useNeonAudio";

interface TimelineClipProps {
  title: string;
  category: string;
  timecode: string;
  videoId: string;
  duration: number; 
}

export default function TimelineClip({ title, category, timecode, videoId }: TimelineClipProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { playHover, playClick } = useNeonAudio();
  
  const youtubeLink = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <motion.a 
      href={youtubeLink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      // FIX 1: Removed dynamic width. Added fixed widths and let aspect-video handle the height!
      className="relative flex flex-col group cursor-pointer shrink-0 w-[80vw] md:w-[28rem]"
      onMouseEnter={() => { setIsHovered(true); playHover(); }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={playClick}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex justify-between items-end mb-3 border-b-2 border-black/10 pb-2 transition-colors duration-300 group-hover:border-black">
        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black/40 group-hover:text-black">{category}</span>
        <span className="font-mono text-[10px] text-black/50 tracking-widest">{timecode}</span>
      </div>

      {/* FIX 2: aspect-video forces a strict 16:9 ratio across all clips */}
      <div className="relative w-full aspect-video bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 group-hover:border-black/20 group-hover:shadow-2xl transition-all duration-500">
        
        {/* FIX 3: Bulletproof native DOM fallback for the image */}
        <motion.img 
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          onError={(e) => {
            e.currentTarget.onerror = null; // Prevents an infinite loop if the fallback also fails
            e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          }}
          alt={title}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: isHovered ? 1 : 0 }} 
          className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none backdrop-blur-[2px]"
        >
          <div className="w-16 h-16 rounded-full border border-white/50 flex items-center justify-center bg-black/60 text-white backdrop-blur-md pl-1.5 shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-110">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </motion.div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <h3 className="text-xl font-black uppercase tracking-tighter text-black">{title}</h3>
        
        <svg className="w-4 h-4 text-black/20 group-hover:text-black transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
      
      <div className="absolute -bottom-10 left-0 w-full h-2 bg-zinc-200 group-hover:bg-[#FF0000] transition-colors duration-300">
         <div className="h-full w-1/4 bg-black/10" />
      </div>
    </motion.a>
  );
}