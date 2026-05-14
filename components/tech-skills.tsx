"use client";
import { Reveal } from "./reveal";

const categories = [
  {
    label: "Product Engineering",
    skills: ["TypeScript", "JavaScript", "Python", "Next.js", "React 19", "Tailwind CSS", "Framer Motion", "GSAP", "Remotion"],
  },
  {
    label: "Backend & Data",
    skills: ["Node.js", "FastAPI", "PostgreSQL", "MySQL", "Prisma", "REST APIs", "Webhooks", "Google Sheets API", "Auth flows"],
  },
  {
    label: "AI Systems",
    skills: ["OpenAI", "Claude API", "LangChain", "RAG", "Embeddings", "Prompt engineering", "Evaluation loops", "Agent workflows", "AI Agent Designer"],
  },
  {
    label: "Infrastructure",
    skills: ["Railway", "Vercel", "Docker", "GitHub Actions", "CI/CD", "Cron jobs", "Environment strategy", "Monitoring"],
  },
  {
    label: "Automation",
    skills: ["WhatsApp API", "Email pipelines", "Lead routing", "CRM workflows", "Automated Lead Gen Qualification", "Custom ops tools"],
  },
  {
    label: "Media & Quant",
    skills: ["FFmpeg", "AI video pipelines", "Audio post", "Spatial workflows", "Freqtrade", "Backtrader", "ccxt", "Regime routing"],
  },
];

export function TechSkills() {
  return (
    <section id="tech" className="relative py-20 md:py-28 px-6 md:px-10 border-t border-[var(--color-rule)]">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-12 md:mb-14 max-w-5xl">
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1] tracking-tight mb-4">
              The architecture behind the systems.
            </h2>
            <p className="text-base md:text-xl text-[var(--color-ink-2)] leading-relaxed max-w-3xl">
              A practical stack for building, shipping, automating, and maintaining production workflows across creative and technical teams.
            </p>
          </div>
        </Reveal>

        <div className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
          {categories.map((cat, idx) => (
            <Reveal key={cat.label} delay={idx * 0.05}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 py-7 md:py-8">
                <h3 className="md:col-span-3 font-display text-2xl md:text-3xl leading-tight">
                  {cat.label}
                </h3>
                <div className="md:col-span-9 flex flex-wrap gap-x-4 gap-y-3 md:gap-x-6">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-base md:text-lg text-[var(--color-ink-2)] leading-none before:content-[''] before:inline-block before:w-1.5 before:h-1.5 before:rounded-full before:bg-white/35 before:mr-3 before:align-middle"
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
