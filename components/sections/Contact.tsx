"use client";

import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { profileData } from '@/data/profile';
import { FadeUp } from '../animations/FadeUp';
import { ArrowRight, Mail, Loader2, CheckCircle, XCircle } from 'lucide-react';

export const Contact = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to send');
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
  };
  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-accent/5 rounded-[3rem] -z-10 blur-3xl"></div>
      
      <div className="glass-panel rounded-[2rem] md:rounded-[3rem] p-10 md:p-20 text-right flex flex-col items-end border-white/10 shadow-2xl">
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
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl ml-auto mb-12">
            Looking for a premium digital experience? I'm currently accepting new freelance projects and full-time opportunities.
          </p>
        </FadeUp>

        {!isFormOpen ? (
          <FadeUp delay={0.3} className="flex flex-col sm:flex-row items-center gap-6">
            <button onClick={() => setIsFormOpen(true)} className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-200 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center gap-3">
              <Mail className="w-5 h-5" />
              Send a message
            </button>
            <a href={profileData.socials.linkedin} className="text-white px-8 py-4 rounded-full font-medium border border-white/20 hover:bg-white/5 transition-colors flex items-center gap-3">
              LinkedIn <ArrowRight className="w-4 h-4" />
            </a>
          </FadeUp>
        ) : (
          <FadeUp delay={0.1} className="w-full max-w-2xl bg-white/5 border border-white/10 p-8 rounded-2xl text-left ml-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-medium">Send a Message</h3>
              <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                Cancel
              </button>
            </div>
            
            {status === 'success' ? (
              <div className="flex flex-col items-center py-8 text-green-400">
                <CheckCircle className="w-16 h-16 mb-4" />
                <p className="text-xl text-center">Message sent successfully!<br/><span className="text-sm text-gray-400">I'll get back to you soon.</span></p>
                <button onClick={() => { setIsFormOpen(false); setStatus('idle'); }} className="mt-8 text-white underline">Close</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30"
                />
                <textarea
                  placeholder="Your Message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 resize-none"
                />
                
                {status === 'error' && (
                  <p className="text-red-400 flex items-center gap-2">
                    <XCircle className="w-4 h-4" /> Failed to send message. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-white text-black px-8 py-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex justify-center items-center gap-2 mt-4 disabled:opacity-50"
                >
                  {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Message'}
                </button>
              </form>
            )}
          </FadeUp>
        )}
      </div>
    </section>
  );
};
