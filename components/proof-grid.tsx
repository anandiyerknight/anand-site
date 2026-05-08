"use client";
import { Spotlight } from "./spotlight";
import { Counter } from "./kpi-counter";
import { Reveal } from "./reveal";

const cells = [
  {
    span: "lg",
    label: "Venture-Scale ROI",
    proof: "Kvarski exit · Luxury D2C",
    body: "Engineered the brand, funnel, and content engine for an India top-1% fashion house. Raised, scaled, exited.",
    metric: <Counter to={15} suffix="×" />,
    accent: "cyan",
  },
  {
    span: "md",
    label: "Operational Collapse",
    proof: "GutGuru clinical AI",
    body: "Spreadsheet diet plans → AI pipeline grounded in 60+ lab markers and 15 condition protocols.",
    metric: <span>5h → <span className="grad-text">15m</span></span>,
    accent: "magenta",
  },
  {
    span: "md",
    label: "Lead-Gen Scale",
    proof: "Ecole Chantemerle / Swiss",
    body: "Stalled Swiss educational institution turned around via WhatsApp + API + Web automation.",
    metric: <span>200 <span className="text-[var(--color-mute)]">→</span> 2,000<span className="text-[var(--color-mute)] text-3xl">/mo</span></span>,
    accent: "cyan",
  },
  {
    span: "md",
    label: "LTV-to-CAC",
    proof: "Across portfolios",
    body: "Consistent across luxury, healthcare, services. CAC ₹3,000 → ₹300. ROAS 6.0.",
    metric: <span>6 <span className="text-[var(--color-mute)]">:</span> 1</span>,
    accent: "magenta",
  },
];

export function ProofGrid() {
  return (
    <section id="proof" className="relative py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-mute)] mb-6">
              <span className="text-[var(--color-cyan)]">[ 03 ]</span>
              <span className="ml-3">The Proof — Engineering the Delta</span>
            </div>
            <Reveal>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight max-w-[18ch]">
                Numbers that{" "}
                <span className="italic">survived</span>{" "}
                first contact with the market.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--color-mute)] max-w-xs">
              All metrics audited from live production deployments. Source data available on
              request as part of the audit.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6">
          {cells.map((c, i) => {
            const span = c.span === "lg"
              ? "md:col-span-3 md:row-span-2"
              : c.span === "md"
              ? "md:col-span-3"
              : "md:col-span-2";
            return (
              <Reveal key={i} delay={i * 0.08} className={span}>
                <Spotlight className="glass glass-hover h-full p-8 md:p-10 flex flex-col justify-between min-h-[320px]">
                  <div className="flex items-start justify-between">
                    <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)]">
                      [ {String(i + 1).padStart(2, "0")} ] {c.label}
                    </div>
                    <span
                      className={`text-[10px] font-mono ${
                        c.accent === "cyan" ? "text-[var(--color-cyan)]" : "text-[var(--color-magenta)]"
                      }`}
                    >
                      ●
                    </span>
                  </div>

                  <div className="kpi text-[clamp(3.5rem,9vw,9rem)] my-8">{c.metric}</div>

                  <div className="space-y-2">
                    <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--color-ink-2)]">
                      {c.proof}
                    </div>
                    <p className="text-sm text-[var(--color-mute)] max-w-md">{c.body}</p>
                  </div>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
