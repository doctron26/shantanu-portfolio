"use client";

import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { skillsData } from '@/data/skills';
import { FadeUp } from '../animations/FadeUp';

export const Skills = () => {
  return (
    <section id="skills" className="py-24 md:py-32">
      <SectionHeading title="Expertise." subtitle="Technologies and tools I use to build premium products." align="right" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mt-12">
        {skillsData.map((category, index) => {
          const Icon = category.icon;
          return (
            <FadeUp key={category.category} delay={index * 0.1} className="h-full">
              <div className="glass-panel p-8 rounded-2xl h-full border border-white/5 hover:border-accent/30 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-white/5 rounded-xl group-hover:bg-accent/10 transition-colors">
                    <Icon className="w-6 h-6 text-gray-300 group-hover:text-accent-foreground transition-colors" />
                  </div>
                  <h3 className="text-xl font-medium tracking-wide">{category.category}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.items.map(skill => (
                    <span 
                      key={skill} 
                      className="px-3 py-1.5 text-sm bg-black/20 border border-white/5 rounded-full text-gray-300 hover:text-white hover:border-white/20 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>
          );
        })}
      </div>
    </section>
  );
};
