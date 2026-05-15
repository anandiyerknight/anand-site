"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface CollapsibleSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function CollapsibleSection({
  title,
  description,
  children,
  defaultOpen = false
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <>
      {/* Header */}
      <section className="relative py-6 md:py-10 px-6 md:px-10 border-t border-[var(--color-rule)]">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => setOpen(!open)}
            className="w-full text-left flex items-center justify-between gap-4 group"
          >
            <div className="flex-1">
              <h2 className="font-display text-[clamp(1.6rem,5vw,2.8rem)] leading-[0.95] tracking-tight">
                {title}
              </h2>
              {description && (
                <p className="mt-1 md:mt-2 text-[var(--color-ink-2)] text-xs md:text-sm max-w-2xl">
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
        </div>
      </section>

      {/* Content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
