import { Reveal } from "../reveal";

interface ServiceItem {
  eyebrow: string;
  title: string;
  description: string;
  details: string[];
  layoutClassName: string;
  borderClassName: string;
}

const services: ServiceItem[] = [
  {
    eyebrow: "Acquisition",
    title: "Lead gen + AI qualification",
    description:
      "Funnels that capture demand, score intent, route the right leads, and reduce the manual back-and-forth before sales.",
    details: ["Lead capture", "AI scoring", "CRM routing"],
    layoutClassName: "md:col-span-3",
    borderClassName: "md:border-r md:border-b",
  },
  {
    eyebrow: "Content Ops",
    title: "Content pipeline automations",
    description:
      "Systems that turn briefs, raw footage, assets, and approvals into repeatable publishing workflows across channels.",
    details: ["Brief to output", "Asset workflows", "Approval loops"],
    layoutClassName: "md:col-span-3",
    borderClassName: "md:border-b",
  },
  {
    eyebrow: "Growth",
    title: "Performance marketing",
    description:
      "Meta, Google, WhatsApp, and full-funnel campaign infrastructure with tracking, creative testing, and conversion loops.",
    details: ["Meta", "Google", "WhatsApp"],
    layoutClassName: "md:col-span-2",
    borderClassName: "md:border-r",
  },
  {
    eyebrow: "Intelligence",
    title: "BI apps + dashboards",
    description:
      "Internal tools and business dashboards that make revenue, ops, marketing, and customer data easier to act on.",
    details: ["Ops dashboards", "Data apps", "Decision views"],
    layoutClassName: "md:col-span-2",
    borderClassName: "md:border-r",
  },
  {
    eyebrow: "Engineering",
    title: "AI systems engineering",
    description:
      "Custom AI workflows, agents, automations, and production systems built around the way your business actually runs.",
    details: ["Agents", "RAG", "Automation"],
    layoutClassName: "md:col-span-2",
    borderClassName: "",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="relative py-12 md:py-28 px-6 md:px-10 border-t border-[var(--color-rule)]">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mb-8 md:mb-14">
            <div className="lg:col-span-7">
              <p className="font-mono text-[10px] md:text-xs tracking-[0.22em] uppercase text-[var(--color-mute)] mb-4">
                Services
              </p>
              <h2 className="font-display text-[clamp(1.8rem,5vw,4rem)] leading-[1] tracking-tight">
                What I can build into your business.
              </h2>
            </div>
            <p className="lg:col-span-5 text-sm md:text-lg leading-relaxed text-[var(--color-ink-2)] lg:pt-9 max-w-2xl">
              Practical growth and automation systems for teams that need more qualified demand, faster content throughput,
              cleaner reporting, and AI-native operations.
            </p>
          </div>
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
                      className="font-mono text-[10px] md:text-xs px-2.5 py-1.5 rounded-full border border-[var(--color-rule-2)] text-[var(--color-mute)]"
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
