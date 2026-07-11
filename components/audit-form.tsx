"use client";
import { Reveal } from "./reveal";
import { Section } from "./ui/section";
import { LeadForm } from "./ui/lead-form";

export function AuditForm() {
  return (
    <Section
      id="audit"
      spacing="large"
      className="bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg-2)] overflow-hidden"
      containerClassName="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10"
    >
        <div className="md:col-span-5 flex flex-col justify-center">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,5vw,4.5rem)] leading-[0.95] tracking-tight">
              Not everyone
              <br />
              <span className="italic">qualifies.</span>
            </h2>
          </Reveal>
          <p className="mt-6 md:mt-8 text-[var(--color-ink-2)] text-base md:text-lg leading-relaxed max-w-md">
            Currently accepting 6 new systems builds for Q3 2026.
          </p>
          <p className="mt-8 md:mt-12 text-xs md:text-sm text-[var(--color-mute)] italic">
            If you're still evaluating, this isn't for you.
          </p>
        </div>

        <div className="md:col-span-7">
          <Reveal>
            <div className="glass p-6 md:p-10 bg-gradient-to-br from-white/8 to-white/3 border-2 border-white/20 shadow-2xl">
              <LeadForm type="audit" />
            </div>
          </Reveal>
        </div>
    </Section>
  );
}
