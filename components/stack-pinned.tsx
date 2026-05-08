"use client";
import { useEffect, useRef } from "react";
import { stackLoops } from "@/lib/reels";

const panels = [
  {
    idx: "01",
    title: "Creative Systems Architecture",
    logic: "4K broadcast-quality video pipelines tailored for D2C.",
    impact: ["Automated processing", "Scalable output", "Maintains broadcast standards"],
    video: stackLoops.content,
    accent: "var(--color-cyan)",
  },
  {
    idx: "02",
    title: "Custom AI-Native Platforms",
    logic: "Custom AI-native CRM and platform engineering.",
    impact: ["Proprietary data architecture", "Immediate operational efficiency", "Personalized RAG pipelines"],
    video: stackLoops.saas,
    accent: "var(--color-magenta)",
  },
  {
    idx: "03",
    title: "End-to-End Automation",
    logic: "Automated end-to-end pipelines across WhatsApp, API, and Web.",
    impact: ["High engagement optimization", "Automated distribution", "Sustained performance analytics"],
    video: stackLoops.funnels,
    accent: "var(--color-violet)",
  },
];

export function StackPinned() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      const gsap = gsapMod.default ?? gsapMod;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (!sectionRef.current || !trackRef.current) return;
        const track = trackRef.current;
        const totalScroll = () => track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => -totalScroll(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${totalScroll()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }, sectionRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative h-screen overflow-hidden border-y border-[var(--color-rule)]"
    >

      <div ref={trackRef} className="flex h-full will-change-transform">
        {panels.map((p) => (
          <div
            key={p.idx}
            className="w-screen h-full flex items-center px-6 md:px-20 shrink-0"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 w-full max-w-7xl mx-auto items-center">
              <div className="md:col-span-7">
                <div
                  className="font-mono text-[11px] tracking-[0.22em] uppercase mb-4"
                  style={{ color: p.accent }}
                >
                  / {p.idx} — Layer
                </div>
                <h3 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-8 text-xl md:text-2xl text-[var(--color-ink-2)] max-w-lg leading-snug">
                  {p.logic}
                </p>
                <ul className="mt-10 space-y-3">
                  {p.impact.map((i) => (
                    <li
                      key={i}
                      className="flex items-baseline gap-3 font-mono text-sm text-[var(--color-ink-2)]"
                    >
                      <span style={{ color: p.accent }}>▸</span>
                      <span className="tracking-wide">{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-5">
                <div className="relative aspect-[4/5] glass overflow-hidden">
                  <video
                    src={p.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 mix-blend-screen opacity-30"
                    style={{
                      background: `linear-gradient(135deg, ${p.accent}, transparent 60%)`,
                    }}
                  />
                  <div className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.22em] uppercase text-white/80">
                    // {p.idx}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
