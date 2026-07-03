import { FadeUp } from "@/components/animations/FadeUp";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { SolidSection } from "@/components/layout/SolidSection";
import { Hobbies } from "@/components/sections/Hobbies";
import { profileData } from "@/data/profile";

export default function Home() {
  return (
    <div className="flex flex-col">

      {/* ─── TRANSPARENT ─── Hero: shader visible */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 max-w-7xl mx-auto w-full"
      >
        <FadeUp delay={0.2} className="flex items-center gap-4 mb-6">
          <div className="h-px w-8 bg-violet-400/60"></div>
          <span className="text-violet-300 tracking-widest text-sm uppercase font-semibold">
            {profileData.role}
          </span>
        </FadeUp>

        <FadeUp delay={0.4}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic tracking-tight mb-4 leading-[1.05]">
            Hello,<br />
            I&apos;m Shantanu Shewale
          </h1>
        </FadeUp>

        <FadeUp delay={0.5}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-8 leading-[1.2] text-white/50">
            Turning ambitious ideas <br className="hidden md:block" />
            into premium digital products.
          </h2>
        </FadeUp>

        <FadeUp delay={0.6} className="flex flex-col sm:flex-row sm:items-center gap-6 mt-4">
          <a
            href="#projects"
            className="bg-white text-black px-6 py-2 text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white border-2 border-white transition-colors duration-300 inline-flex justify-center"
          >
            View Projects
          </a>
        </FadeUp>
      </section>

      {/* ─── SOLID (fade-in) ─── About */}
      <SolidSection>
        <About />
      </SolidSection>

      {/* ─── TRANSPARENT ─── Skills: shader re-emerges */}
      <div className="relative w-full border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Skills />
        </div>
      </div>

      {/* ─── SOLID (fade-in) ─── Projects */}
      <SolidSection>
        <FeaturedProjects />
      </SolidSection>

      {/* ─── TRANSPARENT ─── Experience: shader visible again */}
      <div className="relative w-full border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Experience />
        </div>
      </div>

      {/* ─── SOLID (fade-in) ─── Hobbies */}
      <SolidSection>
        <Hobbies />
      </SolidSection>

      {/* ─── TRANSPARENT ─── Contact: shader visible */}
      <div className="relative w-full border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Contact />
        </div>
      </div>

    </div>
  );
}
