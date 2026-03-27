"use client";

import React, { useEffect, useRef } from "react";

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<{ x: number; y: number; age: number; speed: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // --- SETTINGS ---
    const NORMAL_LIFE = 12; // Length of trail when slow
    const SPEED_LIFE = 30;  // Length of trail when fast
    const THRESHOLD = 35;   // Speed needed to trigger the "Long Line"

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const lastPoint = points.current[points.current.length - 1];
      let currentSpeed = 0;

      if (lastPoint) {
        const dx = e.clientX - lastPoint.x;
        const dy = e.clientY - lastPoint.y;
        currentSpeed = Math.sqrt(dx * dx + dy * dy);
      }

      points.current.push({ 
        x: e.clientX, 
        y: e.clientY, 
        age: 0, 
        speed: currentSpeed 
      });
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    resize();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Update Age
      points.current.forEach(p => p.age++);

      // 2. Filter out old points
      // If the point was created during a high-speed move, it lives longer
      points.current = points.current.filter(p => {
        const lifeSpan = p.speed > THRESHOLD ? SPEED_LIFE : NORMAL_LIFE;
        return p.age < lifeSpan;
      });

      // 3. Draw the Trail
      if (points.current.length > 1) {
        for (let i = 1; i < points.current.length; i++) {
          const p0 = points.current[i - 1];
          const p1 = points.current[i];
          
          // Calculate fade based on age vs its specific lifespan
          const lifeSpan = p1.speed > THRESHOLD ? SPEED_LIFE : NORMAL_LIFE;
          const opacity = 1 - (p1.age / lifeSpan);

          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);

          // THE STRETCH EFFECT:
          // Fast movements get a thicker, brighter glow
          if (p1.speed > THRESHOLD) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
            ctx.lineWidth = 2.5 * opacity;
            ctx.shadowBlur = 10;
            ctx.shadowColor = "white";
          } else {
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.4})`;
            ctx.lineWidth = 1.2 * opacity;
            ctx.shadowBlur = 0;
          }

          ctx.lineCap = "round";
          ctx.stroke();
        }
      }

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] mix-blend-difference"
    />
  );
}