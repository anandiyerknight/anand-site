"use client";
import { Reveal } from "./reveal";
import { Section } from "./ui/section";

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
    <Section
      id="methodology"
      spacing="large"
      containerClassName="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start"
    >
        <div className="md:col-span-5 md:sticky md:top-32">
          <Reveal>
            <img
              src="/profile.jpg"
              alt="Anand Iyer"
              className="w-full aspect-[4/5] object-cover rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)]"
            />
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <p className="font-mono text-[10px] md:text-xs tracking-[0.22em] uppercase text-[var(--color-mute)] mb-4">
            <span className="text-[var(--color-accent)] mr-3">04</span>About
          </p>
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
    </Section>
  );
}
