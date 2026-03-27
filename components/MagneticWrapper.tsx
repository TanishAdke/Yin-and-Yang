"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticWrapper({ children, className = "" }) {
  const ref = useRef(null);
  
  // Motion values track the pull offset
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Apply a "bouncy" spring physics profile so it snaps back into place
  const springConfig = { damping: 15, stiffness: 300, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Find the exact dead-center of the element
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Calculate how far the mouse is from the center, and pull it by 15%
    const distanceX = (e.clientX - centerX) * 0.10;
    const distanceY = (e.clientY - centerY) * 0.10;

    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    // Snap back to exactly 0,0 when the mouse leaves
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}