"use client";
import { useRef } from "react";

const images = [
  { id: "calvin", src: "/images/after/calvin.jpg", label: "Calvin Klein" },
  { id: "maggi", src: "/images/after/maggi-korean-spicy-cheesy-cup-noodles-.jpg", label: "Maggi" },
  { id: "magnum", src: "/images/after/magnum_02.jpg", label: "Magnum" },
  { id: "mokobara", src: "/images/after/mokobara.jpg", label: "Mokobara" },
  { id: "real", src: "/images/after/real-fruit-power-pomegranate-juice-pack-.jpg", label: "Real" },
  { id: "redbull", src: "/images/after/redbull.jpg", label: "Red Bull" },
  { id: "reebok", src: "/images/after/reebok.jpg", label: "Reebok" },
  { id: "wagonr", src: "/images/after/wagonr.jpg", label: "Maruti WagonR" },
];

export function AfterGrid() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative py-8 px-6 md:px-10 border-t border-[var(--color-rule)]">
      <div className="max-w-7xl mx-auto">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x"
          style={{ scrollbarWidth: 'none' }}
        >
          {images.map((img) => (
            <div
              key={img.id}
              className="flex-shrink-0 w-[120px] md:w-[140px] snap-start"
            >
              <div className="relative group aspect-[3/4] glass rounded-lg overflow-hidden">
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="font-mono text-[7px] tracking-[0.1em] uppercase text-white/80">
                    {img.label}
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
