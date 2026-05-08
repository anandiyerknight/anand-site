"use client";
import { useRef, useState, useEffect } from "react";
import { Reveal } from "./reveal";

const pairs = [
  {
    id: "01",
    label: "Apparel · Editorial Re-light",
    before: "/before-after/01-before.jpg",
    after: "/before-after/01-after.jpg",
  },
  {
    id: "02",
    label: "Textile · Tonal Restoration",
    before: "/before-after/02-before.jpg",
    after: "/before-after/02-after.jpg",
  },
  {
    id: "03",
    label: "Crystal · Macro Studio",
    before: "/before-after/03-before.jpg",
    after: "/before-after/03-after.jpg",
  },
  {
    id: "04",
    label: "Hobo Bag · AI Realism",
    before: "/before-after/04-before.jpg",
    after: "/before-after/04-after.jpg",
  },
  {
    id: "05",
    label: "Handbag · Variation Generation",
    before: "/before-after/05-before.jpg",
    after: "/before-after/05-after.jpg",
  },
  {
    id: "06",
    label: "Crystal Bag · Gold Treatment",
    before: "/before-after/06-before.jpg",
    after: "/before-after/06-after.jpg",
  },
];

function Slider({ pair, idx }: { pair: typeof pairs[number]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const update = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (dragging.current) update(e.clientX);
    };
    const onUp = () => (dragging.current = false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div
      ref={ref}
      data-cursor="link"
      onPointerDown={(e) => {
        dragging.current = true;
        update(e.clientX);
      }}
      className="relative aspect-[4/5] overflow-hidden glass select-none"
    >
      <img
        src={pair.before}
        alt="Before"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={pair.after}
          alt="After"
          className="w-full h-full object-cover"
        />
      </div>

      {/* labels */}
      <div className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.22em] uppercase text-white/85 bg-black/40 px-2 py-1 backdrop-blur">
        Before
      </div>
      <div className="absolute top-3 right-3 font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-cyan)] bg-black/40 px-2 py-1 backdrop-blur">
        After
      </div>

      {/* divider */}
      <div
        className="absolute top-0 bottom-0 w-px bg-[var(--color-cyan)] pointer-events-none"
        style={{ left: `${pos}%`, boxShadow: "0 0 24px var(--color-cyan)" }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[var(--color-bg)] border border-[var(--color-cyan)] flex items-center justify-center font-mono text-xs">
          ↔
        </div>
      </div>

      <div className="absolute bottom-3 left-3 right-3 font-mono text-[10px] tracking-[0.22em] uppercase text-white/80">
        {pair.label}
      </div>
    </div>
  );
}

export function BeforeAfter() {
  return (
    <section className="relative py-32 px-6 md:px-10 border-t border-[var(--color-rule)]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-mute)] mb-6">
            <span className="text-[var(--color-cyan)]">[ 07 ]</span>
            <span className="ml-3">Before / After — Transformation Proof</span>
          </div>
          <Reveal>
            <h2 className="font-display text-[clamp(2.4rem,5.5vw,5rem)] leading-[0.95] tracking-tight max-w-[18ch]">
              Drag to wipe. <span className="italic">This is what AI-augmented production actually looks like.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {pairs.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <Slider pair={p} idx={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
