"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import TimelineClip from "@/components/TimelineClip";
import BackgroundEffects from "@/components/BackgroundEffects";
import YinYangButton from "@/components/YinYangButton";
import { useNeonAudio } from "@/app/hooks/useNeonAudio";

const PROJECTS = [
  { 
    id: 1, 
    title: "Cinematic story AMV", 
    category: "AMV", 
    timecode: "00:04:20:10", 
    duration: 23, 
    videoId: "bna4Lg_Wzjo" // Example ID, replace with yours
  },
  { 
    id: 2, 
    title: "Bury The Light", 
    category: "AMV Collab", 
    timecode: "00:04:12:00", 
    duration: 25, 
    videoId: "LFzCkTZMuzg" // Example ID, replace with yours
  },
  { 
    id: 3, 
    title: "Sacrifice", 
    category: "VFX", 
    timecode: "00:01:53:08", 
    duration: 32, 
    videoId: "Lx5df1AIdUY" // Example ID, replace with yours
  },
  { 
    id: 4, 
    title: "Dubstep", 
    category: "Trailer-like", 
    timecode: "00:01:53:08", 
    duration: 32, 
    videoId: "ci1fnQnOjyA" // Example ID, replace with yours
  },
   { 
    id: 5, 
    title: "Dubstep", 
    category: "Collaborative Efforts", 
    timecode: "00:04:06:08", 
    duration: 32, 
    videoId: "39dM0WKgH_0" // Example ID, replace with yours
  },
];
export default function VideoPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const { playClick } = useNeonAudio();

  // BUTTERY SMOOTH MOUSE WHEEL HIJACK
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let targetScroll = container.scrollLeft;
    let animationFrameId: number;

    // Linear Interpolation (Lerp) function for smooth gliding inertia
    const smoothScroll = () => {
      // Moves 8% of the remaining distance per frame
      container.scrollLeft += (targetScroll - container.scrollLeft) * 0.08; 
      
      // Keep animating until we are basically at the target
      if (Math.abs(targetScroll - container.scrollLeft) > 0.5) {
        animationFrameId = requestAnimationFrame(smoothScroll);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); 
      
      // Update our target destination based on wheel movement
      targetScroll += e.deltaY * 1.5; 
      
      // Clamp the target so we don't scroll past the actual content
      const maxScroll = container.scrollWidth - container.clientWidth;
      targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

      // Cancel any ongoing animations and start a new glide
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener("wheel", handleWheel);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleReturn = () => {
    playClick();
    setIsExiting(true);
    setTimeout(() => router.push("/fullstack"), 800);
  };

  return (
    <main className="relative h-screen w-full bg-white text-black overflow-hidden font-sans">
      <BackgroundEffects intensity="low" showLines={true} />
      
      <div className="fixed top-0 left-0 w-full h-[12vh] bg-black z-40 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-full h-[12vh] bg-black z-40 pointer-events-none" />

      <AnimatePresence>
        {isExiting && (
          <motion.div initial={{ width: 0 }} animate={{ width: "100vw" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="fixed inset-0 z-[100] bg-black pointer-events-none" />
        )}
      </AnimatePresence>

      <div className="absolute top-0 left-0 w-full h-[12vh] px-8 md:px-12 flex flex-col justify-center z-50 pointer-events-none">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1, delay: 0.2 }} 
          className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white"
        >
          Video Editing
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 0.6 }} 
          transition={{ duration: 1, delay: 0.4 }} 
          className="flex items-center gap-4 mt-1 text-white"
        >
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-black tracking-[0.4em] uppercase">Rec // Timeline</span>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0 }} 
        animate={{ opacity: 1, scale: 0.5 }} 
        whileHover={{ scale: 0.55 }}
        whileTap={{ scale: 0.45 }}
        transition={{ duration: 0.8, delay: 0.5 }} 
        className="fixed top-[6vh] -translate-y-1/2 right-8 md:right-12 z-50 pointer-events-auto origin-center cursor-pointer"
      >
        <div className="bg-white rounded-full p-1.5 shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-shadow hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          <YinYangButton onClick={handleReturn} text="" activePage="both" />
        </div>
      </motion.div>

      {/* TIMELINE TRACK - Removed snap-x and snap-mandatory to allow smooth free-scrolling */}
      <div 
        ref={scrollRef} 
        className="relative z-20 w-full h-full flex items-center overflow-x-hidden" 
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style dangerouslySetInnerHTML={{__html: `::-webkit-scrollbar { display: none; }`}} />
        <div className="absolute top-1/2 left-0 w-[500vw] h-[1px] bg-black/10 -translate-y-1/2 pointer-events-none" />
        
        <div className="flex flex-row items-center h-full gap-16 md:gap-24 w-max">
          
          {/* MASSIVE START BUFFER - Allows first item to start near center */}
          <div className="w-[30vw] md:w-[40vw] shrink-0" />

          {PROJECTS.map((project, index) => (
            <motion.div 
              key={project.id} 
              initial={{ opacity: 0, x: 50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, delay: 0.4 + (index * 0.1), ease: "easeOut" }} 
              className="shrink-0"
            >
              <TimelineClip {...project} />
            </motion.div>
          ))}
          
          <div className="shrink-0 w-32 flex flex-col items-center justify-center opacity-30">
            <div className="h-16 w-[1px] bg-black mb-4" />
            <span className="text-[9px] font-black tracking-[0.4em] uppercase whitespace-nowrap">End of Sequence</span>
          </div>

          {/* MASSIVE END BUFFER - Absolutely guarantees the last item can reach the center without cutting off */}
          <div className="w-[30vw] md:w-[40vw] shrink-0" />
          
        </div>
      </div>
    </main>
  );
}