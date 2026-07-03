"use client";

import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { projectsData } from '@/data/projects';
import { FadeUp } from '../animations/FadeUp';
import { ArrowUpRight } from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export const FeaturedProjects = () => {
  return (
    <section id="projects" className="py-24 md:py-32">
      <SectionHeading title="Featured Work." subtitle="Selected case studies." />
      
      <div className="flex flex-col gap-24 mt-16">
        {projectsData.map((project, index) => (
          <div key={project.id} className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}>
            
            {/* Image Side */}
            <div className="w-full lg:w-3/5 group cursor-pointer">
              <FadeUp delay={0.1}>
                <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 glass-panel">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
                    <div className="flex gap-2">
                      {project.stack.slice(0, 3).map(tech => (
                        <span key={tech} className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-white/90">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-2/5 flex flex-col justify-center">
              <FadeUp delay={0.2}>
                <span className="text-accent-foreground text-sm font-semibold tracking-widest uppercase mb-4 block">
                  {project.category}
                </span>
                <h3 className="text-3xl md:text-4xl font-medium mb-6 hover:text-gray-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed font-light">
                  {project.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-10 border-t border-b border-white/5 py-6">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-white font-medium">{metric}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-6">
                  <a href={project.links.live} className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full transition-all text-sm font-medium">
                    Live Demo <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <a href={project.links.github} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
                    <GithubIcon className="w-5 h-5" /> View Source
                  </a>
                </div>
              </FadeUp>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};
