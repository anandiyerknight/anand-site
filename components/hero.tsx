"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const videoOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.1]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const savedMuted = window.localStorage.getItem("hero-video-muted") === "true";
    video.muted = savedMuted;
    setMuted(savedMuted);

    if (savedMuted) {
      video.play().catch(() => {});
      return;
    }

    const play = video.play();
    if (!play) return;

    play.catch(() => {
      video.muted = true;
      setMuted(true);
      video.play().catch(() => {});
    });
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
    window.localStorage.setItem("hero-video-muted", String(nextMuted));
    video.play().catch(() => {});
  };

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-screen pt-20 md:pt-32 pb-16 md:pb-24 px-6 md:px-10 overflow-hidden"
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
            ref={videoRef}
            src="/reels/game-trailer.mp4"
            autoPlay
            muted={muted}
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={toggleSound}
            className="absolute right-5 bottom-5 z-20 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur-md transition hover:border-white/50 hover:bg-black/65"
            aria-pressed={!muted}
            aria-label={muted ? "Turn hero video sound on" : "Mute hero video"}
          >
            <span
              className={`h-2 w-2 rounded-full ${muted ? "bg-white/35" : "bg-white"}`}
              aria-hidden
            />
            {muted ? "Sound" : "Mute"}
          </button>
        </div>
      </motion.div>


      <div className="relative z-10 max-w-7xl mx-auto pt-8 md:pt-12">

        {/* Headline */}
        <h1 className="mt-6 md:mt-10 font-display text-[clamp(2rem,7vw,9rem)] leading-[0.95] tracking-[-0.025em] max-w-full md:max-w-[14ch] break-words">
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
          className="mt-6 md:mt-10 max-w-xl text-[var(--color-ink-2)] text-base md:text-lg leading-relaxed"
        >
          Systems at the intersection of creative, marketing, branding and engineering.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15 }}
          className="mt-8 md:mt-12 flex flex-wrap items-center gap-3 md:gap-4"
        >
          <Magnetic strength={0.25}>
            <a href="#audit" className="btn-primary text-xs md:text-sm px-6 md:px-8">
              See If You Qualify
              <span aria-hidden>→</span>
            </a>
          </Magnetic>
        </motion.div>


      </div>
    </section>
  );
}
