import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { NewsletterLibrary } from "@/components/newsletter-library";
import { SubstackSignup } from "@/components/substack-signup";
import { newsletterIssues } from "@/lib/newsletters";

const issueCount = newsletterIssues.length;

export const metadata: Metadata = {
  title: "The Automation Series — Free Case Studies | Anand Iyer",
  description:
    `${issueCount} practical case studies on automating content, outreach and revenue for small Indian businesses. Read each one as a standalone page, with the math behind the system.`,
  alternates: { canonical: "/newsletters" },
  openGraph: {
    title: "The Automation Series — Free Case Studies | Anand Iyer",
    description:
      `${issueCount} practical case studies on automating content, outreach and revenue for small Indian businesses.`,
    type: "website",
    url: "https://anandiyer.co.in/newsletters",
    images: [{ url: "/profile.jpg", width: 864, height: 1184, alt: "Anand Iyer" }],
  },
};

export default function NewslettersPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://anandiyer.co.in/newsletters#collection",
        name: "The Automation Series — Free Case Studies",
        description:
          `${issueCount} practical case studies on automating content, outreach and revenue for small Indian businesses.`,
        url: "https://anandiyer.co.in/newsletters",
        isPartOf: { "@id": "https://anandiyer.co.in/#website" },
        mainEntity: { "@id": "https://anandiyer.co.in/newsletters#issues" },
      },
      {
        "@type": "ItemList",
        "@id": "https://anandiyer.co.in/newsletters#issues",
        name: "Automation Series case studies",
        numberOfItems: newsletterIssues.length,
        itemListElement: newsletterIssues.map((issue, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: issue.title,
          url: `https://anandiyer.co.in/newsletters/${issue.slug}`,
          description: issue.blurb,
        })),
      },
    ],
  };

  return (
    <main className="relative">
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="px-6 md:px-10 pt-32 md:pt-44 pb-10 md:pb-16 border-b border-[var(--color-rule)]">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-mute)]">
            The Automation Series
          </div>
          <h1 className="mt-5 font-display text-[clamp(2.2rem,6vw,5rem)] leading-[0.95] tracking-tight max-w-4xl">
            {issueCount} systems. One page each. <span className="italic">The math, not the hype.</span>
          </h1>
          <p className="mt-6 md:mt-8 text-base md:text-lg text-[var(--color-ink-2)] leading-relaxed max-w-2xl">
            Every issue is a one-page case study: a real-world example, what they did, and the money
            saved or earned. From ecommerce listings to cold outreach to the newsletter machine itself.
            Read the system, then share the page.
          </p>
          <p className="mt-4 text-xs md:text-sm text-[var(--color-mute)] italic max-w-2xl">
            Scenario numbers are illustrative models built to make the math concrete, not named client results.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-5 border-y border-[var(--color-rule)] py-6 md:py-8">
            <div className="md:col-span-7">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-cyan)]">
                Want the system behind the case study?
              </p>
              <h2 className="mt-3 font-display text-2xl md:text-3xl leading-tight">
                Turn the math into an operating system for your business.
              </h2>
            </div>
            <div className="md:col-span-5 flex flex-wrap content-start gap-4 md:justify-end md:pt-1">
              <Link href="/services/outbound-automation" className="btn-ghost !rounded-none !text-[10px]">
                Outbound automation <span aria-hidden>→</span>
              </Link>
              <Link href="/services/content-automation" className="btn-ghost !rounded-none !text-[10px]">
                Content automation <span aria-hidden>→</span>
              </Link>
              <Link href="/?source=automation-series#audit" className="btn-primary !rounded-none !text-[10px]">
                Request an audit <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SubstackSignup />

      <section className="px-6 md:px-10 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <NewsletterLibrary issues={newsletterIssues} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
