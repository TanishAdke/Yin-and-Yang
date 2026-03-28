"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import CodeProject from "@/components/CodeProject";
import YinYangButton from "@/components/YinYangButton";
import { useNeonAudio } from "@/app/hooks/useNeonAudio";

const CODE_PROJECTS = [
  { id: "Voice Assistant", title: "Voice Assistant", description: "A simple voice assistant built with Python with limited functionality", techStack: ["Python", "API", "Local Database"], githubUrl: "https://github.com/TanishAdke/Voice-Assistant.git" },
  { id: "Zenith", title: "Dual-State Portfolio", description: "Highly interactive, state-driven portfolio utilizing the Web Audio API and Framer Motion.", techStack: ["Next.js", "React", "Framer Motion"], githubUrl: "https://github.com/TanishAdke/Yin-and-Yang.git" },
  { id: "YouTube Downloader", title: "YouTube Downloader executable", description: "A simple executable for downloading YouTube videos.", techStack: ["Python", "yt-dlp", "ffmpeg"], githubUrl: "https://github.com/TanishAdke/YouTubeDownloader.git" },
  { id: "Socket_Chat", title: "Text app", description: "Real-time chat application built with WebSockets, featuring dynamic rooms and user authentication.", techStack: ["Java", "JavaFX", "Socket.io"], githubUrl: "https://github.com/TanishAdke/SocketChat-JavaFX.git" },
  { id: "Atmosphere", title: "Atmosphere", description: "A simple weather checking application with API integration.", techStack: ["CSS", "HTML", "JavaScript","API Integration"], githubUrl: "https://github.com/TanishAdke/WeatherChecker.git" },
];

export default function CodePage() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const { playClick } = useNeonAudio();

  const handleReturn = () => {
    playClick();
    setIsExiting(true);
    setTimeout(() => router.push("/fullstack"), 800);
  };

  return (
    <main className="relative min-h-screen w-full bg-black text-white overflow-x-hidden font-sans">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <AnimatePresence>
        {isExiting && <motion.div initial={{ width: 0 }} animate={{ width: "100vw" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="fixed top-0 right-0 bottom-0 z-[100] bg-white pointer-events-none" />}
      </AnimatePresence>

      <div className="w-full p-8 md:p-12 flex justify-between items-start z-50 relative">
        <div className="flex flex-col">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-black uppercase tracking-tighter text-white">Programming</motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 0.2 }} className="flex items-center gap-4 mt-2 font-mono">
            <span className="text-[10px] tracking-[0.4em] uppercase text-green-500">System.Ready</span>
            <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-2 h-4 bg-green-500" />
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="pointer-events-auto z-50 relative">
          <div className="w-16 h-16 scale-75 origin-top-right"><YinYangButton onClick={handleReturn} text="" activePage="yang" /></div>
        </motion.div>
      </div>

      <div className="relative z-20 w-full max-w-4xl mx-auto px-8 pb-24 mt-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          {CODE_PROJECTS.map((project, index) => (
            <motion.div key={project.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + (index * 0.1) }}>
              <CodeProject {...project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}