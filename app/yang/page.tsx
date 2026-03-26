"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const skills = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 88 },
  { name: "Tailwind CSS", level: 92 },
  { name: "UI/UX Design", level: 80 },
  { name: "Framer Motion", level: 85 },
];

export default function YangPage() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  const handleTransition = () => {
    setIsExiting(true);
    setTimeout(() => {
      // Adjusted to teleport to your unified page
      router.push("/fullstack"); 
    }, 600);
  };

  return (
    // Inverted: bg-black text-white
    <main className="relative min-h-screen w-full bg-black text-white overflow-hidden flex items-center justify-center">
      <AnimatePresence>
        {isExiting && (
          <motion.div
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            // Inverted: exit wipe is now white
            className="absolute inset-0 bg-white z-[100]"
          />
        )}
      </AnimatePresence>

      <div className="max-w-6xl w-full px-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center z-10">
        
        {/* BALL MOVED TO THE LEFT */}
        <div className="flex justify-center">
          <motion.div 
            onClick={handleTransition}
            whileHover={{ scale: 1.1 }}
            // Inverted: border-white
            className="w-64 h-64 rounded-full border-[12px] border-white flex items-center justify-center cursor-pointer relative group"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              // Inverted: bg-white
              className="w-32 h-32 bg-white rounded-lg flex items-center justify-center text-center p-2"
            >
              {/* Inverted: text-black, updated text */}
              <span className="text-black text-[10px] font-bold uppercase rotate-[-360] group-hover:scale-110 transition-transform">
                Yin and Yang
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* TEXT AND SKILLS MOVED TO THE RIGHT */}
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
                {/* Inverted: bg-zinc-800 for the track */}
                <div className="h-1 w-full bg-zinc-800">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    // Inverted: bg-white for the fill
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