"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";

interface CollapsibleSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  autoOpen?: boolean;
}

export function CollapsibleSection({
  title,
  description,
  children,
  defaultOpen = false,
  autoOpen = false
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoOpen || open) return;

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOpen(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "0px 0px -35% 0px",
        threshold: 0.2
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [autoOpen, open]);

  const handleToggle = () => {
    const next = !open;
    setOpen(next);
    if (next) {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };

  return (
    <div ref={sectionRef} onMouseEnter={() => autoOpen && setOpen(true)}>
      {/* Header — identical layout on mobile and desktop */}
      <div className="border-t border-[var(--color-rule)] px-6 md:px-10 py-5 md:py-7">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={handleToggle}
            className="w-full text-left flex items-center justify-between gap-6 group focus:outline-none"
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
              className={`shrink-0 w-8 h-8 rounded-md border flex items-center justify-center transition-all duration-300 text-base font-light ${
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
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
