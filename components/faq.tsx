"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "./reveal";

const faqs = [
  {
    q: "Why a Lead Generation form instead of a direct booking?",
    a: "Our systems are built for high-stakes environments. We vet for unit economics and product-market fit to ensure our automations provide maximum leverage. Direct calendars get filled with browsers; the form filters for operators.",
  },
  {
    q: 'What makes this "Premium Done-For-You"?',
    a: "We don't hand you a tool and a tutorial. We build the system, integrate the APIs, train the models on your proprietary data, and hand you the keys to a finished revenue machine. The operating burden never lands on your team.",
  },
  {
    q: "What types of brands and stages do you take on?",
    a: "Series A startups, luxury entities, and ambitious D2C operators. Anyone with capital to deploy and the discipline to honor unit economics. We work with founders who treat infrastructure as leverage, not overhead.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-32 px-6 md:px-10 border-t border-[var(--color-rule)]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">

          <Reveal>
            <h2 className="font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.98] tracking-tight">
              The questions{" "}
              <span className="italic">serious operators</span>{" "}
              ask first.
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
                  className="w-full text-left py-6 md:py-8 flex items-start justify-between gap-6 group"
                  data-cursor="link"
                >
                  <div className="flex items-baseline gap-3 md:gap-6 flex-1">
                    <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-cyan)] shrink-0">
                      Q · 0{i + 1}
                    </span>
                    <span className="font-display text-lg md:text-3xl leading-tight">
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
