"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./reveal";

const posters = [
  { id: 1, title: "Gangs of Wasseypur", meta: "Sound Design", src: "https://m.media-amazon.com/images/M/MV5BMTc5NjY4MjUwNF5BMl5BanBnXkFtZTcwNDIzMTk4Nw@@._V1_FMjpg_UX1000_.jpg" },
  { id: 3, title: "The Lift", meta: "Original Score", src: "https://m.media-amazon.com/images/M/MV5BNzFmYzlkM2MtNWI4Yy00YjFmLWFlN2UtNmQ3YjU4YmZlZTRiXkEyXkFqcGdeQXVyMTE0MzQwMjgz._V1_.jpg" },
  { id: 4, title: "Ludo", meta: "Sound Effects", src: "https://m.media-amazon.com/images/M/MV5BMDA4ZjEyZTMtN2Q5MS00OTVlLWE4OTItYTUzMTJjYmZlOWI4XkEyXkFqcGdeQXVyMTAyMTE1NzIz._V1_.jpg" },
  { id: 5, title: "Udaan", meta: "Atmospheric Mixing", src: "https://m.media-amazon.com/images/M/MV5BMjExMTg5OTU0NF5BMl5BanBnXkFtZTcwMjMxMzcyMw@@._V1_.jpg" },
];

export function PosterScroll() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: targetRef });

  return (
    <section className="relative py-32 px-6 md:px-10 border-t border-[var(--color-rule)] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <Reveal>
            <h2 className="font-display text-[clamp(2.4rem,5.5vw,5rem)] leading-[0.95] tracking-tight max-w-[20ch]">
              From high-stakes <span className="italic">cinema</span> to digital infrastructure.
            </h2>
          </Reveal>
        </div>

        <div 
          ref={targetRef}
          className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide snap-x"
          style={{ scrollbarWidth: 'none' }}
        >
          {posters.map((p) => (
            <div 
              key={p.id} 
              className="flex-shrink-0 w-[280px] md:w-[320px] snap-start"
            >
              <div className="aspect-[2/3] glass rounded-[2.5rem] overflow-hidden group relative">
                <img 
                  src={p.src} 
                  alt={p.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="font-display text-xl text-white">{p.title}</div>
                  <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/60 mt-1">
                    {p.meta}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
