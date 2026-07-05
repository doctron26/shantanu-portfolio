"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Gallery3DCarouselProps {
  images: string[];
}

export function Gallery3DCarousel({ images }: Gallery3DCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const N = images.length;

  if (N === 0) return null;

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {images.map((img, i) => {
        const relativeIndex = (i - currentIndex + N) % N;
        
        let position = "hidden";
        if (relativeIndex === 0) position = "center";
        else if (relativeIndex === 1) position = "right";
        else if (relativeIndex === N - 1) position = "left";

        const variants = {
          center: { x: "0%", scale: 1, zIndex: 20, opacity: 1 },
          left: { x: "-60%", scale: 0.75, zIndex: 10, opacity: 0.5 },
          right: { x: "60%", scale: 0.75, zIndex: 10, opacity: 0.5 },
          hidden: { x: "0%", scale: 0.5, zIndex: 0, opacity: 0 },
        };

        return (
          <motion.div
            key={i}
            className={`absolute w-full max-w-[320px] sm:max-w-[400px] aspect-square rounded-2xl overflow-hidden cursor-pointer ${position === 'hidden' ? 'pointer-events-none' : 'pointer-events-auto'}`}
            variants={variants}
            initial="center"
            animate={position}
            transition={{ type: "spring", stiffness: 250, damping: 30 }}
            onClick={() => setCurrentIndex(i)}
            style={{ 
              boxShadow: position === 'center' ? '0 25px 50px -12px rgba(0, 0, 0, 0.7)' : 'none'
            }}
          >
            <Image
              src={img}
              alt={`Gallery image ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
            {/* Darken side items slightly for depth */}
            {position !== 'center' && (
              <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors duration-300"></div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
