"use client";
import { Reveal } from "./reveal";

const categories = [
  {
    label: "Languages",
    skills: ["TypeScript", "Python", "JavaScript"],
  },
  {
    label: "Frontend",
    skills: ["Next.js", "React 19", "Tailwind CSS", "Framer Motion", "GSAP"],
  },
  {
    label: "Backend",
    skills: ["FastAPI", "Node.js", "PostgreSQL", "Prisma", "MySQL"],
  },
  {
    label: "AI/LLM",
    skills: ["Claude API", "OpenAI", "LangChain", "RAG", "Prompt Engineering"],
  },
  {
    label: "Infrastructure",
    skills: ["Railway", "Docker", "GitHub Actions", "Vercel"],
  },
  {
    label: "Trading/Quant",
    skills: ["Freqtrade", "Backtrader", "ccxt", "RegimeRouter"],
  },
  {
    label: "Video/Media",
    skills: ["Remotion", "FFmpeg", "AI Video Pipelines"],
  },
  {
    label: "Automation",
    skills: ["WhatsApp API", "Webhooks", "Custom automation flows"],
  },
];

export function TechSkills() {
  return (
    <section id="tech" className="relative py-20 md:py-32 px-6 md:px-10 border-t border-[var(--color-rule)]">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-12 md:mb-16">
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1] tracking-tight mb-4">
              The architecture behind the systems.
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {categories.map((cat, idx) => (
            <Reveal key={cat.label} delay={idx * 0.05}>
              <div>
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-cyan)] mb-3">
                  {cat.label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block px-3 py-1.5 rounded-full border border-[var(--color-rule-2)] text-[var(--color-ink-2)] text-sm font-medium hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
