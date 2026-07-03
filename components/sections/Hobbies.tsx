"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hobbiesData } from "@/data/hobbies";
import { FadeUp } from "@/components/animations/FadeUp";
import { X, ArrowRight } from "lucide-react";
import Image from "next/image";
import { createPortal } from "react-dom";

export function Hobbies() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedId]);

  const selectedHobby = hobbiesData.find((h) => h.id === selectedId);

  return (
    <div className="py-24 relative w-full" id="hobbies">
      <FadeUp className="mb-16">
        <h2 className="text-3xl md:text-5xl font-serif italic mb-6">Off the Desk.</h2>
        <p className="text-white/60 max-w-2xl text-lg">
          A glimpse into what keeps me inspired and energized when I&apos;m not coding or designing.
        </p>
      </FadeUp>

      {/* Grid of Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hobbiesData.map((hobby) => {
          const Icon = hobby.icon;
          return (
            <motion.div
              layoutId={`card-container-${hobby.id}`}
              key={hobby.id}
              onClick={() => setSelectedId(hobby.id)}
              className="group cursor-pointer relative flex flex-col h-[400px] rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
            >
              {/* Top Info Half */}
              <motion.div
                layoutId={`card-info-${hobby.id}`}
                className="p-8 flex flex-col h-1/2 z-10"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white/10 text-white">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-xl font-medium">{hobby.title}</h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight size={16} />
                  </div>
                </div>
                <p className="text-white/60 text-sm">{hobby.shortDesc}</p>
              </motion.div>

              {/* Bottom Image Half */}
              <motion.div
                layoutId={`card-image-container-${hobby.id}`}
                className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${hobby.color} opacity-40 mix-blend-overlay z-10 pointer-events-none`}></div>
                <motion.div layoutId={`card-image-${hobby.id}`} className="relative w-full h-full">
                  <Image
                    src={hobby.coverImage}
                    alt={hobby.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
                {/* Fade gradient so it blends with the dark top */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#111] to-transparent z-10"></div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded Modal Overlay */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedId && selectedHobby && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
              />

              {/* Modal Content */}
              <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 pointer-events-none">
                <motion.div
                  layoutId={`card-container-${selectedHobby.id}`}
                  className="w-full max-w-4xl max-h-[90vh] bg-[#111] rounded-[2rem] overflow-hidden flex flex-col pointer-events-auto border border-white/10 shadow-2xl relative"
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedId(null)}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center z-50 hover:bg-white/20 transition-colors"
                  >
                    <X size={20} />
                  </button>

                  {/* Modal Header / Cover Image */}
                  <motion.div
                    layoutId={`card-image-container-${selectedHobby.id}`}
                    className="relative w-full h-[300px] shrink-0"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent z-10`}></div>
                    <div className={`absolute inset-0 bg-gradient-to-b ${selectedHobby.color} opacity-30 mix-blend-overlay z-10 pointer-events-none`}></div>
                    <motion.div layoutId={`card-image-${selectedHobby.id}`} className="relative w-full h-full">
                      <Image
                        src={selectedHobby.coverImage}
                        alt={selectedHobby.title}
                        fill
                        className="object-cover object-center"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Modal Scrollable Content */}
                  <div className="overflow-y-auto p-8 md:p-12 relative z-20 -mt-16 flex-1 no-scrollbar">
                    <motion.div
                      layoutId={`card-info-${selectedHobby.id}`}
                      className="flex items-center gap-4 mb-6"
                    >
                      <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md text-white">
                        <selectedHobby.icon size={28} />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold">{selectedHobby.title}</h2>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-white/80 text-lg leading-relaxed mb-12 max-w-3xl"
                    >
                      {selectedHobby.detailText}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-xl font-medium mb-6">Gallery</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedHobby.gallery.map((img, idx) => (
                          <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group">
                            <Image
                              src={img}
                              alt={`${selectedHobby.title} gallery ${idx + 1}`}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
