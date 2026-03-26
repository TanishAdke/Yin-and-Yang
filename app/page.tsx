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

export default function YinPage() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  const handleTransition = () => {
    setIsExiting(true);
    setTimeout(() => {
      router.push("/yang");
    }, 600);
  };

  return (
    <main className="relative min-h-screen w-full bg-white text-black overflow-hidden flex items-center justify-center">
      <AnimatePresence>
        {isExiting && (
          <motion.div
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-black z-[100]"
          />
        )}
      </AnimatePresence>

      <div className="max-w-6xl w-full px-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center z-10">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl font-black uppercase mb-4"
          >
            Tanish Adke
          </motion.h1>
          <p className="text-xl tracking-[0.3em] uppercase opacity-50 mb-12">Class of 2027 • Frontend</p>
          
          <div className="space-y-6">
            {skills.map((skill, i) => (
              <motion.div key={skill.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
                <div className="flex justify-between text-xs font-bold uppercase mb-1">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="h-1 w-full bg-gray-100">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-full bg-black" 
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <motion.div 
            onClick={handleTransition}
            whileHover={{ scale: 1.1 }}
            className="w-64 h-64 rounded-full border-[12px] border-black flex items-center justify-center cursor-pointer relative group"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="w-32 h-32 bg-black rounded-lg flex items-center justify-center"
            >
              <span className="text-white text-[10px] font-bold uppercase rotate-[-360] group-hover:scale-110 transition-transform">
                Go Yang
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}