import { Reveal } from "../reveal";
import { Section } from "../ui/section";
import { SectionHead } from "../ui/section-head";

interface ServiceItem {
  eyebrow: string;
  title: string;
  description: string;
  details: string[];
  layoutClassName: string;
  borderClassName: string;
}

const flagship = {
  eyebrow: "Flagship · The outreach machine",
  title: "Multi-channel B2B outreach automation",
  description:
    "LinkedIn, email, Instagram and WhatsApp run as one daily, AI-driven machine. It sources the right accounts, personalizes every message, sends the follow-ups, posts the content, and verifies each action, so your pipeline keeps building whether anyone logs in or not.",
  tags: ["LinkedIn", "Email", "Instagram", "WhatsApp", "5,000+ connections / month"],
};

const services: ServiceItem[] = [
  {
    eyebrow: "Acquisition",
    title: "Lead gen + AI qualification",
    description:
      "Funnels that capture demand, score intent with AI, route the right leads, and cut the manual back-and-forth before sales picks up the phone.",
    details: ["Lead capture", "AI scoring", "CRM routing"],
    layoutClassName: "md:col-span-3",
    borderClassName: "md:border-r md:border-b",
  },
  {
    eyebrow: "Growth",
    title: "Performance marketing",
    description:
      "Meta, Google and WhatsApp full-funnel campaigns with server-side tracking, CAPI, creative testing, and conversion loops that actually attribute.",
    details: ["Meta", "Google", "Pixel + CAPI"],
    layoutClassName: "md:col-span-3",
    borderClassName: "md:border-b",
  },
  {
    eyebrow: "Content Ops",
    title: "Content pipeline automation",
    description:
      "Briefs, assets and approvals turned into repeatable publishing workflows, fed by AI image, poster and video engines that ship to every channel daily.",
    details: ["Brief to output", "Image engine", "Daily publish"],
    layoutClassName: "md:col-span-2",
    borderClassName: "md:border-r",
  },
  {
    eyebrow: "Intelligence",
    title: "BI apps + dashboards",
    description:
      "Internal tools and dashboards that make revenue, ops, marketing, and customer data easy to act on, instead of buried in spreadsheets.",
    details: ["Ops dashboards", "Data apps", "Decision views"],
    layoutClassName: "md:col-span-2",
    borderClassName: "md:border-r",
  },
  {
    eyebrow: "Engineering",
    title: "AI systems engineering",
    description:
      "Custom AI agents, automations, and production systems built around the way your business actually runs, end to end.",
    details: ["Agents", "RAG", "Automation"],
    layoutClassName: "md:col-span-2",
    borderClassName: "",
  },
];

export function ServicesSection() {
  return (
    <Section id="services" spacing="base">
      <SectionHead
        layout="split"
        index="01"
        tag="Services"
        title="The systems that fill your pipeline."
        description="It starts with the outreach machine: LinkedIn, email, Instagram and WhatsApp running as one AI system that fills your pipeline every day. Then the funnels, campaigns, content, and dashboards that turn that demand into revenue."
      />

        {/* Flagship - the outreach machine */}
        <Reveal>
          <article className="group mb-4 md:mb-6 rounded-2xl border border-[var(--color-rule)] bg-white/[0.025] p-6 md:p-9 transition-colors duration-300 hover:bg-white/[0.05]">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)] mb-5">
              {flagship.eyebrow}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-start">
              <h3 className="lg:col-span-5 font-display text-2xl md:text-[2.6rem] leading-[1.04] tracking-tight group-hover:text-white transition-colors">
                {flagship.title}
              </h3>
              <div className="lg:col-span-7">
                <p className="text-sm md:text-lg leading-relaxed text-[var(--color-ink-2)]">
                  {flagship.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {flagship.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] md:text-xs px-2.5 py-1.5 rounded-sm border border-[var(--color-rule-2)] text-[var(--color-mute)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-6 border-y border-[var(--color-rule)]">
          {services.map((service, index) => (
            <Reveal
              key={service.title}
              delay={index * 0.06}
              className={service.layoutClassName}
            >
              <article className={`group flex h-full min-h-[260px] flex-col border-b border-[var(--color-rule)] last:border-b-0 md:border-b-0 p-5 md:p-7 transition-colors duration-300 hover:bg-white/[0.04] ${service.borderClassName}`}>
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)] mb-5">
                  {service.eyebrow}
                </div>
                <h3 className="font-display text-2xl md:text-3xl leading-[1.05] tracking-tight mb-4 group-hover:text-white transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-[var(--color-ink-2)] mb-7">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {service.details.map((detail) => (
                    <span
                      key={detail}
                      className="font-mono text-[10px] md:text-xs px-2.5 py-1.5 rounded-sm border border-[var(--color-rule-2)] text-[var(--color-mute)]"
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
    </Section>
  );
}
