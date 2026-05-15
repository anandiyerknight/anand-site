"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./reveal";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  title: string;
  description?: string;
  items: AccordionItem[];
  defaultOpen?: boolean;
}

export function Accordion({ title, description, items, defaultOpen = false }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="relative py-12 md:py-20 px-6 md:px-10 border-t border-[var(--color-rule)]">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left mb-6 flex items-center justify-between gap-4 group"
        >
          <div className="flex-1">
            <Reveal>
              <h2 className="font-display text-[clamp(1.8rem,5vw,3rem)] leading-[0.95] tracking-tight">
                {title}
              </h2>
            </Reveal>
            {description && (
              <p className="mt-2 text-[var(--color-ink-2)] text-sm md:text-base max-w-2xl">
                {description}
              </p>
            )}
          </div>
          <div
            className={`shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full border border-[var(--color-rule-2)] flex items-center justify-center transition-all ${
              open ? "rotate-45 border-[var(--color-cyan)] text-[var(--color-cyan)] bg-white/5" : ""
            }`}
            aria-hidden
          >
            <span className="text-lg md:text-xl">+</span>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4 md:pt-8 space-y-8 md:space-y-12">
                {items.map((item, idx) => (
                  <div key={idx} className="pb-8 md:pb-12 border-b border-[var(--color-rule-2)] last:border-0">
                    {item.title && (
                      <h3 className="font-display text-lg md:text-xl mb-3 text-[var(--color-cyan)]">
                        {item.title}
                      </h3>
                    )}
                    <div className="text-[var(--color-ink-2)] leading-relaxed text-sm md:text-base">
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
