"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "./reveal";

const faqs = [
  {
    q: "You're a creative director AND an engineer — how?",
    a: "15 years in both worlds taught me they're not separate. Creative direction without engineering is a spec; engineering without creative is just infrastructure. The leverage emerges at the intersection. I build systems that solve creative problems at scale.",
  },
  {
    q: "What exactly do you build?",
    a: "Custom AI-native platforms, video automation pipelines, revenue systems, trading infrastructure, and content engines. Whatever compounds your leverage and removes friction from high-volume repetitive work. Every system is production-grade, documented, and transferable.",
  },
  {
    q: "Who is this NOT for?",
    a: "If you're still evaluating, exploring, or learning, this isn't for you. I work with founders and teams who already know they need systems built and are ready to deploy. You need capital, conviction, and the discipline to operationalize.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-10 md:py-32 px-6 md:px-10 border-t border-[var(--color-rule)]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 md:mb-12">
          <Reveal>
            <h2 className="font-display text-[clamp(1.6rem,5vw,4.5rem)] leading-[0.98] tracking-tight">
              Common questions.
            </h2>
          </Reveal>
        </div>

        <ul className="divide-y divide-[var(--color-rule-2)] border-y border-[var(--color-rule-2)]">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left py-4 md:py-8 flex items-start justify-between gap-4 group"
                  data-cursor="link"
                >
                  <div className="flex items-baseline gap-3 md:gap-6 flex-1">
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-cyan)] shrink-0">
                      Q · 0{i + 1}
                    </span>
                    <span className="font-display text-base md:text-3xl leading-tight">
                      {f.q}
                    </span>
                  </div>
                  <span
                    className={`shrink-0 w-10 h-10 rounded-full border border-[var(--color-rule-2)] flex items-center justify-center transition-transform ${
                      isOpen ? "rotate-45 border-[var(--color-cyan)] text-[var(--color-cyan)]" : ""
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-0 md:pl-[calc(40px+1.5rem)] pr-4 md:pr-12 max-w-3xl text-[var(--color-ink-2)] leading-relaxed text-sm md:text-base">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
