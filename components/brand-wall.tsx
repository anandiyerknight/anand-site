"use client";

const brands = [
  { name: "Netflix", src: "/brand-logos-white/netflix.png" },
  { name: "Amazon Prime Video", src: "/brand-logos-white/amazon-prime-video-12d1-1920.png" },
  { name: "Adidas", src: "/brand-logos-white/adidas-thmb.png" },
  { name: "Byju's", src: "/brand-logos-white/byjus.png" },
  { name: "Cadbury", src: "/brand-logos-white/cadbury.png" },
  { name: "ICICI", src: "/brand-logos-white/icici.png" },
  { name: "LG", src: "/brand-logos-white/lg-logo-png4.png" },
  { name: "MakeMyTrip", src: "/brand-logos-white/mmt.png" },
  { name: "Movies Now", src: "/brand-logos-white/movies-now.png" },
  { name: "Pantaloons", src: "/brand-logos-white/new-pantaloons-logo-big.png" },
  { name: "Nick", src: "/brand-logos-white/nick.png" },
  { name: "Times of India", src: "/brand-logos-white/toi.png" },
  { name: "Viacom18", src: "/brand-logos-white/viacom-18.png" },
  { name: "ZEE5", src: "/brand-logos-white/zee-5.png" },
];

export function BrandWall() {
  return (
    <section className="relative bg-black py-14 md:py-20 border-y border-[var(--color-rule)] overflow-hidden">
      <div className="relative overflow-x-auto scrollbar-hide">
        <div
          className="marquee-track items-center py-2"
          style={{ animationDuration: "65s" }}
        >
          {[...brands, ...brands].map((b, i) => (
            <div
              key={i}
              className="flex h-24 w-48 md:h-32 md:w-72 shrink-0 items-center justify-center whitespace-nowrap px-8"
            >
              <img
                src={b.src}
                alt={b.name}
                className="max-h-14 max-w-full object-contain opacity-80 transition duration-500 hover:opacity-100 md:max-h-20"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent pointer-events-none md:w-40" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent pointer-events-none md:w-40" />
      </div>
    </section>
  );
}
