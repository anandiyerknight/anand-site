import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "Outbound Automation for B2B Founders | Anand Iyer",
  description:
    "Build a multi-channel outbound system across LinkedIn, email, Instagram, and WhatsApp with research, sequencing, follow-up, and response handling built in.",
  alternates: { canonical: "/services/outbound-automation" },
  openGraph: {
    title: "Outbound Automation for B2B Founders | Anand Iyer",
    description:
      "A multi-channel outbound system that researches accounts, personalizes messages, runs follow-ups, and routes real conversations.",
    type: "website",
  },
};

const steps = [
  ["01", "Research", "Define the account list, buying signals, offer, and message angles before anything is sent."],
  ["02", "Sequence", "Turn one message into a considered sequence across the channels your buyers already use."],
  ["03", "Follow up", "Keep the system moving through the follow-ups most teams stop before they matter."],
  ["04", "Route", "Separate interest, objections, and no-fit replies so the right conversation reaches the right person."],
];

const faqs = [
  ["Which channels can the system use?", "The flagship system is designed around LinkedIn, email, Instagram, and WhatsApp. The mix depends on where your buyers actually respond."],
  ["Is everything sent without review?", "No. The system is built with verification and human approval points where the risk or judgment calls require them."],
  ["What happens after a reply?", "Replies are classified into interested, objection, unsubscribe, bounce, or other paths so the next action is clear instead of sitting in an inbox."],
  ["Who is this for?", "It is for founders and small teams with a defined offer, a reachable market, and enough capacity to act when qualified conversations arrive."],
];

export default function OutboundAutomationPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Outbound Automation for B2B Founders",
    description: metadata.description,
    provider: { "@type": "Person", name: "Anand Iyer", url: "https://anandiyer.co.in" },
    areaServed: "Worldwide",
    url: "https://anandiyer.co.in/services/outbound-automation",
  };
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      serviceSchema,
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://anandiyer.co.in" },
          { "@type": "ListItem", position: 2, name: "Outbound automation", item: "https://anandiyer.co.in/services/outbound-automation" },
        ],
      },
    ],
  };

  return (
    <main className="relative">
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <header className="px-6 md:px-10 pt-32 md:pt-44 pb-16 md:pb-24 border-b border-[var(--color-rule)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)]">
            <Link href="/" className="hover:text-[var(--color-ink)] transition-colors">Home</Link>
            <span aria-hidden>/</span>
            <span>Outbound automation</span>
          </div>
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)]">Revenue infrastructure · Outbound</div>
          <div className="mt-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-24 items-end">
            <div>
              <h1 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.87] tracking-tight max-w-5xl">
                Stop asking the founder to remember who needs a follow-up.
              </h1>
              <p className="mt-8 text-lg md:text-xl text-[var(--color-ink-2)] leading-relaxed max-w-2xl">
                Build an outbound system that researches the right accounts, personalizes the first message, runs the sequence, and routes real conversations across LinkedIn, email, Instagram, and WhatsApp.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/?source=service-outbound-automation#audit" className="btn-primary">Request an audit <span aria-hidden>→</span></Link>
                <Link href="/newsletters/21-cold-outbound" className="btn-ghost">Read the outbound case study <span aria-hidden>→</span></Link>
              </div>
            </div>
            <div className="border border-[var(--color-rule)] bg-[var(--color-bg-2)] p-6 md:p-8">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-magenta)]">The operating system</div>
              <div className="mt-6 space-y-4 text-sm md:text-base text-[var(--color-ink-2)] leading-relaxed">
                <div className="border-b border-[var(--color-rule)] pb-4">Account research → message angle</div>
                <div className="border-b border-[var(--color-rule)] pb-4">Sequence → follow-up → response</div>
                <div>Interested → qualified conversation → human handoff</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="px-6 md:px-10 py-16 md:py-24 border-b border-[var(--color-rule)]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-24">
          <div>
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)]">What changes</div>
            <h2 className="mt-5 font-display text-4xl md:text-6xl leading-[0.92] tracking-tight">Outbound becomes a system, not a burst of effort.</h2>
          </div>
          <div className="space-y-6 text-base md:text-lg text-[var(--color-ink-2)] leading-relaxed max-w-2xl">
            <p>Most outreach breaks in the gaps: the account was not researched, the follow-up was forgotten, or a positive reply waited too long for a useful response.</p>
            <p>This system makes those handoffs visible. Every stage has an owner, a next action, and a verification point. The goal is not more noise. It is more qualified conversations from the market you already want to reach.</p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)]">How it works</div>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 border-y border-[var(--color-rule)]">
            {steps.map(([number, title, body]) => (
              <div key={number} className="border-b md:border-b-0 md:border-r last:border-r-0 border-[var(--color-rule)] p-6 md:p-8">
                <div className="font-mono text-xs text-[var(--color-cyan)]">{number}</div>
                <h2 className="mt-8 font-display text-3xl leading-none">{title}</h2>
                <p className="mt-5 text-sm md:text-base text-[var(--color-ink-2)] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-16 md:py-24 border-y border-[var(--color-rule)] bg-[var(--color-bg-2)]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.75fr_1.25fr] gap-10 lg:gap-24">
          <div>
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)]">Proof to inspect</div>
            <h2 className="mt-5 font-display text-4xl md:text-6xl leading-[0.92] tracking-tight">See the math before you buy the system.</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              ["17", "Outbound machine", "100 personalised emails a day, with cost-per-meeting math."],
              ["18", "Sequence math", "The 5-touch sequence built around replies after the first email."],
              ["21", "Cold outbound", "The complete 60-day model: touchpoints, conversations, leads, and revenue."],
            ].map(([num, title, body]) => (
              <Link key={num} href={`/newsletters/${num === "17" ? "17-outbound-machine" : num === "18" ? "18-sequence-math" : "21-cold-outbound"}`} className="border border-[var(--color-rule)] p-5 hover:border-[var(--color-cyan)] transition-colors">
                <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-mute)]">Issue {num}</div>
                <div className="mt-4 font-display text-2xl leading-tight">{title}</div>
                <p className="mt-4 text-sm text-[var(--color-ink-2)] leading-relaxed">{body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)]">Questions founders ask</div>
          <div className="mt-8 divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
            {faqs.map(([question, answer]) => (
              <div key={question} className="py-6">
                <h2 className="font-display text-2xl md:text-3xl">{question}</h2>
                <p className="mt-3 text-base text-[var(--color-ink-2)] leading-relaxed max-w-2xl">{answer}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 border border-[var(--color-cyan)] bg-[var(--color-bg-2)] p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="font-display text-3xl">Find the bottleneck in your outbound.</h2>
              <p className="mt-3 text-sm text-[var(--color-ink-2)]">Send the brief. I will tell you what I would wire first.</p>
            </div>
            <Link href="/?source=service-outbound-automation-final#audit" className="btn-primary shrink-0">Request an audit <span aria-hidden>→</span></Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
