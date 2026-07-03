"use client";

import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { profileData } from '@/data/profile';
import { FadeUp } from '../animations/FadeUp';
import { ArrowRight, Mail } from 'lucide-react';

export const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-accent/5 rounded-[3rem] -z-10 blur-3xl"></div>
      
      <div className="glass-panel rounded-[2rem] md:rounded-[3rem] p-10 md:p-20 text-center flex flex-col items-center border-white/10 shadow-2xl">
        <FadeUp>
          <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-medium uppercase tracking-widest mb-8 inline-block">
            {profileData.availability}
          </span>
        </FadeUp>
        
        <FadeUp delay={0.1}>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter mb-8 leading-[1.1]">
            Let's build <br className="hidden md:block"/> something <span className="text-white/50">extraordinary.</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Looking for a premium digital experience? I'm currently accepting new freelance projects and full-time opportunities.
          </p>
        </FadeUp>

        <FadeUp delay={0.3} className="flex flex-col sm:flex-row items-center gap-6">
          <a href={`mailto:${profileData.socials.email}`} className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center gap-3">
            <Mail className="w-5 h-5" />
            Send a message
          </a>
          <a href={profileData.socials.linkedin} className="text-white px-8 py-4 rounded-full font-medium border border-white/20 hover:bg-white/5 transition-colors flex items-center gap-3">
            LinkedIn <ArrowRight className="w-4 h-4" />
          </a>
        </FadeUp>
      </div>
    </section>
  );
};
