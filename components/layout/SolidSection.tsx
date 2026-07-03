"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SolidSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const SolidSection = ({ children, className = "" }: SolidSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Track the full lifecycle: from section entering the viewport bottom
  // all the way to it exiting from the top.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // 0.0 → section just entering (transparent, delayed)
  // 0.25 → fade in starts
  // 0.4 → fully solid
  // 0.6 → still solid
  // 0.75 → fade out starts
  // 1.0 → fully transparent again (delayed)
  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.4, 0.6, 0.75, 1],
    [0,  0,   1,   1,   0,   0]
  );

  return (
    <div ref={ref} className={`relative w-full border-t border-white/[0.07] ${className}`}>

      {/* Contained rounded background panel — starts lower, doesn't touch Hero */}
      <motion.div
        aria-hidden
        className="absolute top-16 md:top-20 bottom-0 left-3 right-3 md:left-8 md:right-8 xl:left-14 xl:right-14 rounded-3xl pointer-events-none"
        style={{
          backgroundColor: "#05050d",
          opacity: bgOpacity,
        }}
      />

      {/* Content sits above the bg */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {children}
      </div>
    </div>
  );
};
