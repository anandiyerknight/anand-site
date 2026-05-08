"use client";
import { AnimatePresence, motion } from "framer-motion";
import type { Reel } from "@/lib/reels";
import { useEffect } from "react";

export function ReelModal({ reel, onClose }: { reel: Reel | null; onClose: () => void }) {
  useEffect(() => {
    if (!reel) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [reel, onClose]);

  return (
    <AnimatePresence>
      {reel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[rgba(2,2,6,0.92)] backdrop-blur-md flex items-center justify-center p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl"
          >
            <div className="flex justify-between items-start mb-4 font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-mute)]">
              <div>
                <span className="text-[var(--color-cyan)]">●</span>
                <span className="ml-2">Now Playing — {reel.client}</span>
              </div>
              <button
                onClick={onClose}
                className="hover:text-[var(--color-cyan)] transition"
              >
                Close [esc] ✕
              </button>
            </div>
            <div className="relative aspect-video bg-black overflow-hidden glass">
              <video
                src={reel.src}
                poster={reel.poster}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
            <div className="mt-4 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
              <div className="font-display italic text-3xl md:text-4xl">{reel.title}</div>
              <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-mute)]">
                {reel.meta}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
