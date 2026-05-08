"use client";
import { useEffect, useRef } from "react";

const brands = [
  "Netflix",
  "Amazon Prime",
  "Gillette",
  "Adidas",
  "Reebok",
  "HDFC",
  "Havmor",
  "Byju's",
  "Royal Guard of Oman",
  "Movie Max",
  "ITC Bingo",
];

export function BrandWall() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let direction = 1;
    const onScroll = () => {
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      if (Math.abs(dy) > 1) direction = dy > 0 ? 1 : -1;
      if (ref.current)
        ref.current.style.animationDirection = direction === 1 ? "normal" : "reverse";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative py-16 border-y border-[var(--color-rule)] overflow-hidden">
      <div className="px-6 md:px-10 mb-8 flex items-center justify-between max-w-7xl mx-auto">
        <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-mute)]">
          <span className="text-[var(--color-cyan)]">[ 02 ]</span>
          <span className="ml-3">Trusted Pedigree</span>
        </div>
        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)]">
          15 yrs · Tier-1
        </div>
      </div>

      <div className="relative">
        <div
          ref={ref}
          className="marquee-track py-4"
          style={{ animationDuration: "55s" }}
        >
          {[...brands, ...brands].map((b, i) => (
            <div
              key={i}
              className="flex items-center gap-12 whitespace-nowrap"
            >
              <span className="font-display italic text-4xl md:text-6xl text-[var(--color-ink-2)] hover:text-[var(--color-ink)] transition-colors">
                {b}
              </span>
              <span className="text-[var(--color-cyan)] text-3xl">✦</span>
            </div>
          ))}
        </div>

        {/* edge fades */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--color-bg)] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--color-bg)] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
