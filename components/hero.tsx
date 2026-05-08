"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Magnetic } from "./magnetic";

const headlineWords = [
  { text: "Automation", italic: false },
  { text: "is", italic: false },
  { text: "not", italic: false },
  { text: "a", italic: false },
  { text: "Strategy.", italic: false, brk: true },
  { text: "It's", italic: false },
  { text: "an", italic: false },
  { text: "Infrastructure.", italic: false },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const videoOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.1]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-screen pt-32 pb-24 px-6 md:px-10 overflow-hidden"
    >
      {/* Aurora atmosphere */}
      <div className="aurora" />
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Hero video — right side, framed */}
      <motion.div
        style={{ y: videoY, opacity: videoOpacity }}
        className="absolute right-0 top-0 h-full w-[58%] hidden md:block"
      >
        <div className="absolute inset-y-6 right-6 w-[calc(100%-1.5rem)] h-[calc(100%-3rem)] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)]">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[rgba(10,10,10,0.3)] to-[var(--color-bg)] z-10 pointer-events-none" />
          <video
            src="/reels/game-trailer.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>


      <div className="relative z-10 max-w-7xl mx-auto pt-12">


        {/* Headline */}
        <h1 className="mt-10 font-display text-[clamp(2.8rem,9vw,9rem)] leading-[0.95] tracking-[-0.025em] max-w-[14ch]">
          {headlineWords.map((w, i) => (
            <span
              key={i}
              className={`inline-block overflow-hidden align-baseline ${w.brk ? "block" : ""}`}
            >
              <motion.span
                className={`inline-block ${w.italic ? "italic" : ""} ${
                  w.text === "not" ? "text-[var(--color-magenta)]" : ""
                } ${w.text === "Infrastructure." ? "grad-text" : ""}`}
                initial={{ y: "115%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.95,
                  delay: 0.15 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {w.text}
                {!w.brk && i < headlineWords.length - 1 ? " " : ""}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0 }}
          className="mt-10 max-w-xl text-[var(--color-ink-2)] text-lg md:text-xl leading-relaxed"
        >
          We architect high-output content &amp; revenue systems for the ambitious. Stop solving
          scaling problems with headcount — deploy custom, automated pipelines that collapse weeks
          of manual labor into minutes of high-performance output.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <Magnetic strength={0.25}>
            <a href="#audit" className="btn-primary">
              <span className="text-[var(--color-cyan)]">[ 01 ]</span>
              Request a Systems Audit
              <span aria-hidden>→</span>
            </a>
          </Magnetic>
          <a href="#work" className="btn-ghost">
            View Reels
            <span aria-hidden>↓</span>
          </a>
        </motion.div>


      </div>
    </section>
  );
}
