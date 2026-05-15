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
      {/* Header — identical layout on mobile and desktop */}
      <div className="border-t border-[var(--color-rule)] px-6 md:px-10 py-5 md:py-7">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => setOpen(!open)}
            className="w-full text-left flex items-center justify-between gap-6 group"
            aria-expanded={open}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-4">
                <h2 className="font-display text-[clamp(1.4rem,3vw,2.2rem)] leading-none tracking-tight">
                  {title}
                </h2>
                {description && (
                  <span className="hidden md:inline font-mono text-xs tracking-[0.14em] text-[var(--color-mute)] uppercase truncate">
                    — {description}
                  </span>
                )}
              </div>
              {description && (
                <p className="md:hidden mt-1 text-[var(--color-mute)] text-xs">
                  {description}
                </p>
              )}
            </div>
            <div
              className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 text-base font-light ${
                open
                  ? "rotate-45 border-white text-white bg-white/8"
                  : "border-[var(--color-rule-2)] text-[var(--color-mute)]"
              }`}
              aria-hidden
            >
              +
            </div>
          </button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
