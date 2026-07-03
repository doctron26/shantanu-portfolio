"use client";

import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { profileData } from '@/data/profile';
import { FadeUp } from '../animations/FadeUp';
import { BlurReveal } from '../animations/BlurReveal';

export const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <SectionHeading title="About." subtitle="My journey and philosophy." />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Photo Left Side */}
        <div className="lg:col-span-4 order-2 lg:order-1">
          <FadeUp delay={0.1}>
            <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 glass-panel group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/profile.jpg" 
                alt={profileData.name}
                className="object-cover w-full h-full filter grayscale-[30%] group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-700 ease-out"
              />
            </div>
          </FadeUp>
        </div>

        {/* Content Right Side */}
        <div className="lg:col-span-8 order-1 lg:order-2 flex flex-col justify-between">
          <BlurReveal delay={0.2}>
            <div className="prose prose-invert prose-lg max-w-none mb-12">
              <p className="text-gray-300 leading-relaxed font-light mb-6 text-xl">
                {profileData.about}
              </p>
              <p className="text-gray-300 leading-relaxed font-light">
                {profileData.journey}
              </p>
            </div>
          </BlurReveal>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-auto">
            {Object.entries(profileData.stats).map(([key, value], index) => (
              <FadeUp key={key} delay={0.3 + (index * 0.1)}>
                <div className="glass-panel p-6 rounded-2xl flex flex-col justify-center border-white/10 hover:border-accent/50 transition-colors h-full">
                  <span className="text-3xl md:text-4xl font-medium text-white mb-2">{value}+</span>
                  <span className="text-xs text-gray-400 capitalize tracking-wide font-medium">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
