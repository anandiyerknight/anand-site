"use client";
import { Reveal } from "./reveal";

const images = [
  { id: "calvin", src: "/images/after/calvin.jpg", label: "Calvin Klein · Campaign" },
  { id: "maggi", src: "/images/after/maggi-korean-spicy-cheesy-cup-noodles-.jpg", label: "Maggi · Product Film" },
  { id: "magnum", src: "/images/after/magnum_02.jpg", label: "Magnum · Editorial" },
  { id: "mokobara", src: "/images/after/mokobara.jpg", label: "Mokobara · Travel" },
  { id: "real", src: "/images/after/real-fruit-power-pomegranate-juice-pack-.jpg", label: "Real · Juice Campaign" },
  { id: "redbull", src: "/images/after/redbull.jpg", label: "Red Bull · High-Speed" },
  { id: "reebok", src: "/images/after/reebok.jpg", label: "Reebok · Sport Editorial" },
  { id: "wagonr", src: "/images/after/wagonr.jpg", label: "Maruti Suzuki WagonR · Automotive" },
];

export function AfterGrid() {
  return (
    <section id="work-grid" className="relative py-32 px-6 md:px-10 border-t border-[var(--color-rule)]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <Reveal>
            <h2 className="font-display text-[clamp(2.4rem,5.5vw,5rem)] leading-[0.95] tracking-tight max-w-[20ch]">
              High-performance visuals. <span className="italic">Delivered.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {images.map((img, i) => (
            <Reveal key={img.id} delay={i * 0.05}>
              <div className="relative group aspect-[4/5] glass overflow-hidden rounded-[2rem]">
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/90">
                    {img.label}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
