import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";

const description =
  "Build a repeatable content system that turns founder input into approved, on-brand assets across channels—without making the founder the production bottleneck.";

export const metadata: Metadata = {
  title: "AI Content Automation for Founders | Anand Iyer",
  description,
  alternates: { canonical: "/services/content-automation" },
  openGraph: {
    title: "AI Content Automation for Founders | Anand Iyer",
    description,
    type: "website",
    images: [{ url: "/profile.jpg", width: 864, height: 1184, alt: "Anand Iyer" }],
  },
};

const steps = [
  ["01", "Capture", "Turn a voice note, brief, call, or raw idea into a structured source the system can reuse."],
  ["02", "Repurpose", "Extract the strongest ideas and reshape them for the formats and channels that matter."],
  ["03", "Produce", "Generate drafts, visuals, carousels, and campaign assets from the same approved source."],
  ["04", "Approve", "Keep the human judgment where it matters, then publish from a repeatable queue."],
];

const faqs = [
  ["Does this replace the founder's voice?", "No. The system starts from the founder's actual input and keeps approval in the loop. It removes repetitive production work, not judgment."],
  ["What can the system produce?", "Depending on the workflow, it can support written posts, carousels, briefs, product visuals, campaign variations, and publishing queues."],
  ["Which channels can it support?", "The workflow can be shaped around the channels you already use, including LinkedIn, Instagram, email, and your owned content library."],
  ["Who is this for?", "It is for founders and small teams that have useful knowledge but lose momentum because every asset starts from a blank page."],
];

export default function ContentAutomationPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "AI Content Automation for Founders",
        description,
        provider: { "@type": "Person", name: "Anand Iyer", url: "https://anandiyer.co.in" },
        areaServed: "Worldwide",
        url: "https://anandiyer.co.in/services/content-automation",
      },
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
          { "@type": "ListItem", position: 2, name: "Content automation", item: "https://anandiyer.co.in/services/content-automation" },
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
            <span>Content automation</span>
          </div>
          <div className="mt-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-24 items-end">
            <div>
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)]">Revenue infrastructure · Content ops</div>
              <h1 className="mt-5 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.87] tracking-tight max-w-5xl">One idea in. A publishing system out.</h1>
              <p className="mt-8 text-lg md:text-xl text-[var(--color-ink-2)] leading-relaxed max-w-2xl">{description}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/?source=service-content-automation#audit" className="btn-primary">Request an audit <span aria-hidden>→</span></Link>
                <Link href="/newsletters/06-repetition-problem" className="btn-ghost">See the content model <span aria-hidden>→</span></Link>
              </div>
            </div>
            <div className="border border-[var(--color-rule)] bg-[var(--color-bg-2)] p-6 md:p-8">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-magenta)]">The content loop</div>
              <div className="mt-6 space-y-4 text-sm md:text-base text-[var(--color-ink-2)] leading-relaxed">
                <div className="border-b border-[var(--color-rule)] pb-4">Founder input → structured source</div>
                <div className="border-b border-[var(--color-rule)] pb-4">Source → formats → channel queue</div>
                <div>Approval → publishing rhythm → reusable library</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="px-6 md:px-10 py-16 md:py-24 border-b border-[var(--color-rule)]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-24">
          <div>
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)]">The bottleneck</div>
            <h2 className="mt-5 font-display text-4xl md:text-6xl leading-[0.92] tracking-tight">Your best ideas should not disappear in the sent folder.</h2>
          </div>
          <div className="space-y-6 text-base md:text-lg text-[var(--color-ink-2)] leading-relaxed max-w-2xl">
            <p>Most teams do not have an idea problem. They have a translation problem: one useful thought has to become a brief, a draft, a visual, a review, and a publishable asset every time.</p>
            <p>A content operations system makes that translation repeatable. It protects the source voice, reduces blank-page work, and gives the team a queue they can actually keep alive.</p>
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
            <h2 className="mt-5 font-display text-4xl md:text-6xl leading-[0.92] tracking-tight">See how the content machine compounds.</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              ["06", "The repetition problem", "/newsletters/06-repetition-problem"],
              ["12", "The carousel factory", "/newsletters/12-carousel-factory"],
              ["19", "The newsletter sales asset", "/newsletters/19-newsletter-sales-asset"],
            ].map(([num, title, href]) => (
              <Link key={num} href={href} className="border border-[var(--color-rule)] p-5 hover:border-[var(--color-cyan)] transition-colors">
                <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-mute)]">Issue {num}</div>
                <div className="mt-4 font-display text-2xl leading-tight">{title}</div>
                <div className="mt-5 font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-cyan)]">Read the model →</div>
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
              <h2 className="font-display text-3xl">Turn the ideas you already have into a system.</h2>
              <p className="mt-3 text-sm text-[var(--color-ink-2)]">Send the brief. I will tell you what to automate first.</p>
            </div>
            <Link href="/?source=service-content-automation-final#audit" className="btn-primary shrink-0">Request an audit <span aria-hidden>→</span></Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
