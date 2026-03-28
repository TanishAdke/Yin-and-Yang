"use client";

import { useCallback } from "react";

// The Global Engine ensures we don't crash the browser with too many audio contexts
let globalAudioCtx: AudioContext | null = null;

export function useNeonAudio() {
  
  const initAudio = () => {
    if (typeof window === "undefined") return null;

    if (!globalAudioCtx) {
      globalAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    // Unlock audio if the browser suspended it
    if (globalAudioCtx.state === "suspended") {
      globalAudioCtx.resume();
    }
    
    return globalAudioCtx;
  };

  // 1. THE HOVER: "Neon Hum" (Now much louder)
  const playHover = useCallback(() => {
    const ctx = initAudio();
    if (!ctx) return; 

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "sine";
    // Pitch: 250Hz to 350Hz (a warm electric hum)
    osc.frequency.setValueAtTime(250, ctx.currentTime); 
    osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.3);

    // VOLUME BOOST: Ramping up to 0.5 (50% max volume)
    gainNode.gain.setValueAtTime(0.0001, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.1); 
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.45);
  }, []);

  // 2. THE CLICK: "Deep Pulse" (Maximum bass impact)
  const playClick = useCallback(() => {
    const ctx = initAudio();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "triangle";
    // Pitch: 150Hz dropping to 40Hz (Sub-bass thud)
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.4);

    // VOLUME BOOST: Ramping up to 1.0 (100% max volume)
    gainNode.gain.setValueAtTime(0.0001, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(1.0, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  }, []);

  return { playHover, playClick };
}