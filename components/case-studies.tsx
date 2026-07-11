"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { caseStudies, type CaseStudy } from "@/lib/case-studies";
import { Spotlight } from "./spotlight";
import { Reveal } from "./reveal";

export function CaseStudies() {
  const [active, setActive] = useState<CaseStudy | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="cases" className="relative py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 max-w-3xl">
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-mute)] mb-6">
            <span className="text-[var(--color-accent)]">[ 08 ]</span>
            <span className="ml-3">Case Studies — Logic in Production</span>
          </div>
          <Reveal>
            <h2 className="font-display text-[clamp(2.4rem,5.5vw,5rem)] leading-[0.95] tracking-tight">
              Three different markets.{" "}
              <span className="italic">One repeatable pattern.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {caseStudies.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.08}>
              <Spotlight
                onClick={() => setActive(c)}
                className="glass glass-hover cursor-pointer p-7 md:p-8 h-full flex flex-col justify-between min-h-[420px]"
                role="button"
                tabIndex={0}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === "Enter") setActive(c);
                }}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)]">
                    <span>// 0{i + 1}</span>
                    <span>{c.category}</span>
                  </div>
                  <div className="mt-8 font-display italic text-5xl md:text-6xl leading-none">
                    {c.brand}
                  </div>
                  <p className="mt-6 text-[var(--color-ink-2)] leading-snug">{c.headline}</p>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-4">
                  {c.metrics.slice(0, 4).map((m) => (
                    <div key={m.label}>
                      <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)]">
                        {m.label}
                      </div>
                      <div className="font-display italic text-2xl mt-1 grad-text">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 font-mono text-[11px] tracking-[0.22em] uppercase flex items-center gap-2 text-[var(--color-ink)]">
                  Read full case <span aria-hidden>→</span>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[rgba(2,2,6,0.92)] backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl glass p-8 md:p-12"
            >
              <div className="flex items-center justify-between mb-8 font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)]">
                <span>{active.category}</span>
                <button onClick={() => setActive(null)} className="hover:text-[var(--color-accent)]">
                  Close [esc] ✕
                </button>
              </div>
              <h3 className="font-display italic text-5xl md:text-7xl leading-none">
                {active.brand}
              </h3>
              <p className="mt-6 text-xl text-[var(--color-ink-2)]">{active.headline}</p>
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                {active.metrics.map((m) => (
                  <div key={m.label} className="border-l border-[var(--color-rule-2)] pl-3">
                    <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)]">
                      {m.label}
                    </div>
                    <div className="font-display italic text-xl md:text-2xl mt-1">{m.value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-4">
                {active.body.map((p, i) => (
                  <p key={i} className="text-[var(--color-ink-2)] leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
