"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { musicReels } from "@/lib/reels";
import { Reveal } from "./reveal";

export function MusicSection() {
  const [open, setOpen] = useState(false);

  return (
    <section id="sonic" className="relative py-24 px-6 md:px-10 border-t border-[var(--color-rule)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-tight tracking-tight max-w-[30ch]">
              Berklee acoustics · 100+ Tier-1 sonic identities · 500+ ad films · Atmos / spatial mixing.
            </h2>
          </Reveal>
          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="https://www.imdb.com/name/nm12355762/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-ghost shrink-0"
            >
              IMDb Profile
              <span aria-hidden>↗</span>
            </a>
            <a 
              href="https://www.youtube.com/watch?v=G9cUY_rzHp8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-ghost shrink-0"
            >
              Watch Work
              <span aria-hidden>↗</span>
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className="btn-primary shrink-0"
              aria-expanded={open}
            >
              {open ? "Hide sonic work" : "Reveal sonic work"}
              <span aria-hidden>{open ? "↑" : "↓"}</span>
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="music-grid"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
                {musicReels.map((m, i) => (
                  <div key={m.id} className="relative aspect-video glass overflow-hidden group">
                    <video
                      src={m.src}
                      poster={m.poster}
                      muted
                      loop
                      playsInline
                      controls
                      onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,6,10,0.95)] to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="font-display italic text-xl">{m.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
