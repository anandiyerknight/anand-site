"use client";
import { Reveal } from "./reveal";

export function Testimonial() {
  return (
    <section className="relative py-32 px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0 aurora opacity-40" />
      <div className="relative max-w-6xl mx-auto text-center">

        <Reveal>
          <blockquote className="font-display text-[clamp(2.2rem,5vw,4.4rem)] leading-[1.05] tracking-tight">
            <span aria-hidden className="text-[var(--color-magenta)] mr-2">“</span>
            Anand treats brand architecture like a high-level{" "}
            <span className="italic">chess match.</span> Every automation is a move toward total
            market efficiency. The outcome was a calculated result,{" "}
            <span className="italic">not a surprise.</span>
            <span aria-hidden className="text-[var(--color-cyan)] ml-2">”</span>
          </blockquote>
        </Reveal>
        <div className="mt-12 font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)]">
          ── Strategy Review · 2026
        </div>
      </div>
    </section>
  );
}
