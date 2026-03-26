"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function FullStackPage() {
  const router = useRouter();

  const skills = {
    front: [
      { name: "React / Next.js", level: "95%" },
      { name: "Tailwind / CSS", level: "92%" },
      { name: "TypeScript", level: "88%" },
    ],
    back: [
      { name: "Node.js / Express", level: "90%" },
      { name: "PostgreSQL / SQL", level: "85%" },
      { name: "System Architecture", level: "80%" },
    ],
    integration: [
      { name: "API Design", level: "92%" },
      { name: "Docker / CI/CD", level: "75%" },
      { name: "Auth / Security", level: "88%" },
    ]
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col md:flex-row bg-white overflow-hidden font-sans">
      <section className="flex-1 bg-white text-black p-10 md:p-24 flex flex-col justify-center items-center md:items-end border-r border-zinc-100">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-sm md:text-right"
        >
          <p className="text-[10px] font-black tracking-[0.6em] uppercase opacity-30 mb-2">Yin</p>
          <h2 className="text-6xl font-black uppercase tracking-tighter mb-12">Frontend</h2>
          <div className="space-y-10">
            {skills.front.map((s, i) => (
              <div key={s.name}>
                <div className="flex justify-between md:flex-row-reverse text-[10px] font-bold uppercase mb-3">
                  <span className="md:ml-4 tracking-widest">{s.name}</span>
                  <span className="opacity-40 font-mono">{s.level}</span>
                </div>
                <div className="h-[2px] w-full bg-zinc-100 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} animate={{ width: s.level }} 
                    transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                    className="h-full bg-black" 
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <motion.div
          onClick={() => router.push("/")}
          whileHover={{ rotate: 180, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-32 h-32 md:w-44 md:h-44 rounded-full border-[12px] border-zinc-50 bg-white shadow-2xl flex flex-col overflow-hidden cursor-pointer group"
        >
          <div className="flex-1 bg-black w-full flex items-end justify-center pb-2">
            <span className="text-[8px] text-white font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Cycle</span>
          </div>
          <div className="flex-1 bg-white w-full" />
        </motion.div>
      </div>

      <section className="flex-1 bg-black text-white p-10 md:p-24 flex flex-col justify-center items-center md:items-start">
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-sm"
        >
          <p className="text-[10px] font-black tracking-[0.6em] uppercase opacity-30 mb-2">Yang</p>
          <h2 className="text-6xl font-black uppercase tracking-tighter mb-12">Backend</h2>
          <div className="space-y-10">
            {skills.back.map((s, i) => (
              <div key={s.name}>
                <div className="flex justify-between text-[10px] font-bold uppercase mb-3">
                  <span className="tracking-widest">{s.name}</span>
                  <span className="opacity-40 font-mono">{s.level}</span>
                </div>
                <div className="h-[2px] w-full bg-zinc-900 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} animate={{ width: s.level }} 
                    transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                    className="h-full bg-white" 
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-0 w-full bg-zinc-950/80 backdrop-blur-lg border-t border-white/10 p-6 flex flex-wrap justify-center items-center gap-x-12 gap-y-4"
      >
        <div className="w-full text-center mb-2">
          <span className="text-[9px] font-black tracking-[1em] uppercase text-zinc-500">Core Integrations</span>
        </div>
        {skills.integration.map((s) => (
          <div key={s.name} className="flex flex-col items-center">
            <span className="text-[10px] font-bold uppercase text-white/70 mb-2">{s.name}</span>
            <div className="w-32 h-[1px] bg-white/10">
              <motion.div initial={{ width: 0 }} animate={{ width: s.level }} className="h-full bg-white" />
            </div>
          </div>
        ))}
      </motion.div>

     <div className="absolute top-10 w-full flex justify-center pointer-events-none z-50">
  <div className="flex w-full max-w-[100vw] text-[12px] font-black tracking-[1.8em] uppercase">
    {/* Left Side - Black text on White background */}
    <div className="w-1/2 text-right pr-4 text-black">
      Tanish Adke 
    </div>
    
    {/* Right Side - White text on Black background */}
    <div className="w-1/2 text-left pl-4 text-white">
       Class of 2027
    </div>
  </div>
</div>
    </main>
  );
}