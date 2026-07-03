"use client";

import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { experienceData, qualificationsData } from '@/data/experience';
import { FadeUp } from '../animations/FadeUp';

export const Experience = () => {
  return (
    <section id="experience" className="py-24 md:py-32">
      <SectionHeading title="Experience." subtitle="A history of building great products." />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mt-16">
        
        {/* Experience Timeline */}
        <div>
          <FadeUp>
            <h3 className="text-2xl font-medium mb-10 flex items-center gap-3">
              <span className="w-8 h-px bg-white/30 block"></span> Work
            </h3>
          </FadeUp>
          
          <div className="space-y-12 pl-4 border-l border-white/10 relative">
            {experienceData.map((exp, index) => (
              <FadeUp key={exp.id} delay={index * 0.1}>
                <div className="relative">
                  <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent-foreground shadow-[0_0_10px_rgba(167,139,250,0.5)]"></div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h4 className="text-xl font-medium text-white">{exp.role}</h4>
                    <span className="text-sm text-gray-400 font-mono tracking-tight">{exp.period}</span>
                  </div>
                  <div className="text-accent-foreground/80 mb-4 font-medium text-sm">{exp.company} • {exp.type}</div>
                  <p className="text-gray-400 font-light leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Education Timeline */}
        <div>
          <FadeUp>
            <h3 className="text-2xl font-medium mb-10 flex items-center gap-3">
              <span className="w-8 h-px bg-white/30 block"></span> Education
            </h3>
          </FadeUp>
          
          <div className="space-y-12 pl-4 border-l border-white/10 relative">
            {qualificationsData.map((edu, index) => (
              <FadeUp key={edu.id} delay={index * 0.1}>
                <div className="relative">
                  <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-white/50"></div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h4 className="text-xl font-medium text-white">{edu.degree}</h4>
                    <span className="text-sm text-gray-400 font-mono tracking-tight">{edu.period}</span>
                  </div>
                  <div className="text-gray-300 mb-4 font-medium text-sm">{edu.institution}</div>
                  <p className="text-gray-400 font-light leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
