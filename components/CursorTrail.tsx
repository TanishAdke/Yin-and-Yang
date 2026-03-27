"use client";

import React, { useEffect, useRef } from "react";

export default function CursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let points = [];
    
    // REDUCED: The trail vanishes much faster now to prevent screen clutter
    const MAX_AGE = 25;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const onMouseMove = (e) => {
      points.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
      });
    };
    window.addEventListener("mousemove", onMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points.forEach((p) => (p.age += 1));
      points = points.filter((p) => p.age < MAX_AGE);

      if (points.length > 1) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        for (let i = 1; i < points.length; i++) {
          const p0 = points[i - 1];
          const p1 = points[i];

          const dx = p1.x - p0.x;
          const dy = p1.y - p0.y;
          const speed = Math.sqrt(dx * dx + dy * dy);
          
          const ageProgress = p1.age / MAX_AGE;
          
          // Sharper taper curve for a faster needle-point drop off
          const ageFactor = Math.pow(Math.max(0, 1 - ageProgress), 2);

          // REDUCED: Extremely thin base line (2.5px max)
          const baseThickness = Math.max(0.5, 2.5 - speed * 0.05); 
          const thickness = baseThickness * ageFactor; 
          
          // REDUCED: Max opacity is only 40%, fading to 0. It's a true "ghost" trail now.
          const opacity = Math.max(0, 1 - ageProgress) * 0.4; 

          // Core Stroke
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`; 
          ctx.lineWidth = thickness;
          ctx.stroke();

          // Delicate Feather Edge (Opacity reduced to just 10% for the barest hint of texture)
          const angle = Math.atan2(dy, dx);
          const offset = thickness * 0.8; 
          
          ctx.beginPath();
          ctx.moveTo(p0.x + Math.cos(angle + Math.PI/2) * offset, p0.y + Math.sin(angle + Math.PI/2) * offset);
          ctx.lineTo(p1.x + Math.cos(angle + Math.PI/2) * offset, p1.y + Math.sin(angle + Math.PI/2) * offset);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.25})`;
          ctx.lineWidth = 0.2;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[999] mix-blend-difference"
    />
  );
}