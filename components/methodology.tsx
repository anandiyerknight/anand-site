"use client";
import { Reveal } from "./reveal";

const credentials = [
  { label: "Experience", value: "15+ years in Content Production" },
  { label: "Entrepreneur", value: "5+ years building ventures" },
  { label: "AI Content", value: "2+ years in AI Content Systems" },
  { label: "AI Coding", value: "1 year in AI Agentic Coding" },
  { label: "Context Eng.", value: "Harness architecture · MCP · Agent orchestration" },
  { label: "Brand Automation", value: "ManyChat · Meta CAPI · D2C pipeline design" },
  { label: "Education", value: "SAE + Berklee College of Music, Boston MA" },
  { label: "Mirchi Kaan", value: "Jingle of the Year" },
];

export function Methodology() {
  return (
    <section id="methodology" className="relative py-12 md:py-32 px-6 md:px-10 border-t border-[var(--color-rule)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
        <div className="md:col-span-5 md:sticky md:top-32">
          <Reveal>
            <img
              src="/profile.jpg"
              alt="Anand Iyer"
              className="w-full aspect-[4/5] object-cover rounded-[2rem] md:rounded-[2.5rem] border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)]"
            />
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,5vw,4.8rem)] leading-[0.98] tracking-tight">
              I build the systems.
              <br />
              You focus on the vision.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 md:mt-10 text-base md:text-lg leading-relaxed text-[var(--color-ink-2)] max-w-2xl">
              With 15+ years in content production and 5+ years as an entrepreneur, I build AI-native systems and context engineering frameworks for creative and tech founders who want to compound their leverage through automation.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 md:mt-12 space-y-3">
              {credentials.map(({ label, value }) => (
                <div
                  key={label}
                  className="border-l-2 border-[var(--color-rule-2)] pl-4 py-1.5"
                >
                  <div className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)]">
                    {label}
                  </div>
                  <div className="text-sm md:text-base text-[var(--color-ink)] mt-0.5 font-medium">{value}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
