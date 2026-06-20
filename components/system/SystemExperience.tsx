"use client";

import { useState } from "react";
import { STAGES } from "@/lib/system";
import { StageLoop } from "./StageLoop";
import { StagePanel } from "./StagePanel";
import { AssetLightbox, type LightboxData } from "./AssetLightbox";

export function SystemExperience() {
  const [active, setActive] = useState(0);
  const [box, setBox] = useState<LightboxData | null>(null);

  return (
    <>
      <section className="px-6 md:px-10 pt-32 md:pt-40 pb-8 md:pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-mute)]">
            The System
          </div>
          <h1 className="mt-5 font-display text-[clamp(2rem,5.5vw,4rem)] leading-[0.98] tracking-tight">
            Four systems.
            <br />
            <span className="text-[var(--color-mute)]">One compounding loop.</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-[var(--color-ink-2)] max-w-2xl leading-relaxed">
            Each stage feeds the next. The last feeds the first. Pick a stage to see how we do it,
            how it works, and what it actually ships.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <StageLoop stages={STAGES} active={active} onSelect={setActive} />
        </div>
      </section>

      <section className="px-6 md:px-10 pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto">
          <StagePanel stage={STAGES[active]} onOpenAsset={setBox} />
        </div>
      </section>

      <AssetLightbox data={box} onClose={() => setBox(null)} />
    </>
  );
}
