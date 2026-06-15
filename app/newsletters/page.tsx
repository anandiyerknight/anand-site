import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { NewsletterLibrary } from "@/components/newsletter-library";
import { newsletterIssues } from "@/lib/newsletters";

export const metadata: Metadata = {
  title: "The Automation Series — Free Case Studies | Anand Iyer",
  description:
    "20 one-page case studies on automating content, outreach and revenue for small Indian businesses. Each shows what they did and the money saved or earned. Free to download.",
};

export default function NewslettersPage() {
  return (
    <main className="relative">
      <Nav />

      <section className="px-6 md:px-10 pt-32 md:pt-44 pb-10 md:pb-16 border-b border-[var(--color-rule)]">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-mute)]">
            The Automation Series
          </div>
          <h1 className="mt-5 font-display text-[clamp(2.2rem,6vw,5rem)] leading-[0.95] tracking-tight max-w-4xl">
            20 systems. One page each. <span className="italic">The math, not the hype.</span>
          </h1>
          <p className="mt-6 md:mt-8 text-base md:text-lg text-[var(--color-ink-2)] leading-relaxed max-w-2xl">
            Every issue is a one-page case study: a real-world example, what they did, and the money
            saved or earned. From ecommerce listings to cold outreach to the newsletter machine itself.
            Free to download, one at a time.
          </p>
          <p className="mt-4 text-xs md:text-sm text-[var(--color-mute)] italic max-w-2xl">
            Scenario numbers are illustrative models built to make the math concrete, not named client results.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-10 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <NewsletterLibrary issues={newsletterIssues} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
