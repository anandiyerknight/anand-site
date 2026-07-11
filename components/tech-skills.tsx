"use client";
import { Reveal } from "./reveal";
import { Section } from "./ui/section";
import { SectionHead } from "./ui/section-head";

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
  {
    label: "Context & Harness",
    skills: ["Claude Code", "CLAUDE.md architecture", "MCP servers", "Context engineering", "Agent orchestration", "Session protocols", "Hook systems", "Tool scaffolding", "Prompt architecture"],
  },
];

export function TechSkills() {
  return (
    <Section id="tech" spacing="base">
        <SectionHead
          title="The architecture behind the systems."
          description="A practical stack for building, shipping, automating, and maintaining production workflows across creative and technical teams."
        />

        <div className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
          {categories.map((cat, idx) => (
            <Reveal key={cat.label} delay={idx * 0.05}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-4 md:py-8">
                <h3 className="md:col-span-3 font-display text-lg md:text-3xl leading-tight">
                  {cat.label}
                </h3>
                <div className="md:col-span-9 flex flex-wrap gap-x-3 gap-y-2 md:gap-x-6">
                  {cat.skills.map((skill) => (
                    <span // @allow-circle: 4px bullet dot
                      key={skill}
                      className="text-sm md:text-lg text-[var(--color-ink-2)] leading-none before:content-[''] before:inline-block before:w-1 before:h-1 before:rounded-full before:bg-white/35 before:mr-2 before:align-middle"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
    </Section>
  );
}
