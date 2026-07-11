"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

export type LightboxData = { title: string; images: string[] };

export function WorkLightbox({
  data,
  onClose,
}: {
  data: LightboxData | null;
  onClose: () => void;
}) {
  const [i, setI] = useState(0);
  const count = data?.images.length ?? 0;

  // Reset to the first slide whenever a new carousel opens.
  useEffect(() => {
    setI(0);
  }, [data]);

  const next = useCallback(() => setI((p) => (count ? (p + 1) % count : 0)), [count]);
  const prev = useCallback(() => setI((p) => (count ? (p - 1 + count) % count : 0)), [count]);

  useEffect(() => {
    if (!data) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [data, next, prev, onClose]);

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[rgba(2,2,6,0.92)] backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          <div className="w-full max-w-3xl flex items-center justify-between mb-4 font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)]">
            <span>
              {data.title} — {i + 1}/{count}
            </span>
            <button onClick={onClose} className="hover:text-[var(--color-accent)]">
              Close [esc] ✕
            </button>
          </div>

          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl aspect-[4/5] glass overflow-hidden"
          >
            <Image
              src={data.images[i]}
              alt={`${data.title} slide ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-contain"
              priority
            />
          </motion.div>

          <div
            className="w-full max-w-3xl mt-4 flex items-center justify-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={prev} className="btn-ghost !py-2 !px-4" aria-label="Previous slide">
              <span aria-hidden>←</span>
            </button>
            <div className="flex items-center gap-1.5">
              {data.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === i ? "w-6 bg-[var(--color-accent)]" : "w-1.5 bg-[var(--color-rule-2)]"
                  }`}
                />
              ))}
            </div>
            <button onClick={next} className="btn-ghost !py-2 !px-4" aria-label="Next slide">
              <span aria-hidden>→</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
