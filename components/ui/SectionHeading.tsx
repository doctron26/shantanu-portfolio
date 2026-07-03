"use client";

import React from 'react';
import { FadeUp } from '@/components/animations/FadeUp';

export const SectionHeading = ({ 
  title, 
  subtitle, 
  align = "left" 
}: { 
  title: string; 
  subtitle?: string;
  align?: "left" | "center" | "right";
}) => {
  return (
    <div className={`mb-16 md:mb-24 flex flex-col ${align === 'center' ? 'items-center text-center' : align === 'right' ? 'items-end text-right' : 'items-start text-left'}`}>
      <FadeUp>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">
          {title}
        </h2>
      </FadeUp>
      {subtitle && (
        <FadeUp delay={0.1}>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
            {subtitle}
          </p>
        </FadeUp>
      )}
      <FadeUp delay={0.2} className="w-full mt-8">
        <div className={`h-px w-24 bg-accent-foreground/30 ${align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''}`}></div>
      </FadeUp>
    </div>
  );
};
