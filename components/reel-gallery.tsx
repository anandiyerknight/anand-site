"use client";
import { useState } from "react";
import { reels, type Reel } from "@/lib/reels";
import { ReelCard } from "./reel-card";
import { ReelModal } from "./reel-modal";
import { Reveal } from "./reveal";

export function ReelGallery() {
  const [active, setActive] = useState<Reel | null>(null);

  return (
    <section id="work" className="relative py-10 md:py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-8 md:mb-12">
          <div>
            <Reveal>
              <h2 className="font-display text-[clamp(1.6rem,5vw,5.5rem)] leading-[0.95] tracking-tight max-w-[16ch]">
                A decade of broadcast.{" "}
                <span className="italic">A year of AI-augmented output.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--color-mute)] max-w-xs">
              Hover to preview · Click to play full reel with audio
            </p>
          </Reveal>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[18rem] md:auto-rows-[14rem] gap-4 md:gap-5">
          {reels.map((r, i) => {
            const span =
              r.span === "lg"
                ? "md:col-span-4 md:row-span-2"
                : r.span === "md"
                ? "md:col-span-2 md:row-span-2"
                : "md:col-span-2";
            return (
              <ReelCard
                key={r.id}
                reel={r}
                index={i}
                onOpen={setActive}
                className={span}
              />
            );
          })}
        </div>


      </div>

      <ReelModal reel={active} onClose={() => setActive(null)} />
    </section>
  );
}
