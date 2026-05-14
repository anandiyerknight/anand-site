"use client";
import { useEffect, useRef } from "react";

const brands = [
  { name: "Netflix", src: "/brand-logos/Netflix.png" },
  { name: "Amazon Prime Video", src: "/brand-logos/amazon-prime-video_12d1.1920.jpg" },
  { name: "Adidas", src: "/brand-logos/adidas-thmb.jpg" },
  { name: "Byju's", src: "/brand-logos/byjus.png" },
  { name: "Cadbury", src: "/brand-logos/Cadbury.png" },
  { name: "ICICI", src: "/brand-logos/ICICI.jpg" },
  { name: "LG", src: "/brand-logos/lg_logo_PNG4.png" },
  { name: "MakeMyTrip", src: "/brand-logos/MMT.png" },
  { name: "Movies Now", src: "/brand-logos/Movies Now.jpeg" },
  { name: "Pantaloons", src: "/brand-logos/New-Pantaloons-Logo-big.png" },
  { name: "Nick", src: "/brand-logos/Nick.png" },
  { name: "Times of India", src: "/brand-logos/Toi.png" },
  { name: "Viacom18", src: "/brand-logos/Viacom 18.png" },
  { name: "ZEE5", src: "/brand-logos/zee 5.png" },
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
    <section className="relative py-14 md:py-20 border-y border-[var(--color-rule)] overflow-hidden">
      <div className="relative">
        <div
          ref={ref}
          className="marquee-track py-2"
          style={{ animationDuration: "70s" }}
        >
          {[...brands, ...brands].map((b, i) => (
            <div
              key={i}
              className="flex items-center gap-4 whitespace-nowrap"
            >
              <div className="h-24 w-44 md:h-32 md:w-64 rounded-lg border border-white/10 bg-white/[0.03] px-6 py-5 flex items-center justify-center grayscale hover:grayscale-0 transition duration-500">
                <img
                  src={b.src}
                  alt={b.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--color-bg)] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--color-bg)] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
