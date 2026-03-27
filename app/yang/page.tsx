"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import YinYangButton from "@/components/YinYangButton";

const skills = [
  { name: "Node.js / Express", level: 90 },
  { name: "PostgreSQL / Prisma", level: 85 },
  { name: "Docker / AWS", level: 75 },
  { name: "System Architecture", level: 80 },
  { name: "API Design", level: 92 },
];

export default function YangPage() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  const handleTransition = () => {
    setIsExiting(true);
    setTimeout(() => {
      // Teleports to the unified fullstack page
      router.push("/fullstack"); 
    }, 600);
  };

  return (
    <main className="relative min-h-screen w-full bg-black text-white overflow-hidden flex items-center justify-center">
      <AnimatePresence>
        {isExiting && (
          <motion.div
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-white z-[100]"
          />
        )}
      </AnimatePresence>

      <div className="max-w-6xl w-full px-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center z-10">
        
        {/* Left Side: The new YinYang button set to "yang" */}
        <div className="flex justify-center">
          <YinYangButton 
            onClick={handleTransition} 
            text="Yin and Yang" 
            activePage="yang" 
          />
        </div>

        {/* Right Side: Yang / Backend Info */}
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl font-black uppercase mb-4"
          >
            Tanish Adke
          </motion.h1>
          <p className="text-xl tracking-[0.3em] uppercase opacity-50 mb-12">Class of 2027 • Backend</p>
          
          <div className="space-y-6">
            {skills.map((skill, i) => (
              <motion.div key={skill.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
                <div className="flex justify-between text-xs font-bold uppercase mb-1">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="h-1 w-full bg-zinc-800">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-full bg-white" 
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}