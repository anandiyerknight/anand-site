import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { WorkShowcase } from "@/components/work-showcase";
import { workItems } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work — Landing Pages, Carousels & Case Studies | Anand Iyer",
  description:
    "Selected work: live landing pages, B2B LinkedIn carousel systems, branded guides and case studies. The brands, the builds and the math behind them.",
};

export default function WorkPage() {
  return (
    <main className="relative">
      <Nav />

      <section className="px-6 md:px-10 pt-32 md:pt-44 pb-10 md:pb-16 border-b border-[var(--color-rule)]">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-mute)]">
            Selected Work
          </div>
          <h1 className="mt-5 font-display text-[clamp(2.2rem,6vw,5rem)] leading-[0.95] tracking-tight max-w-4xl">
            The brands. The builds. <span className="italic">The math behind them.</span>
          </h1>
          <p className="mt-6 md:mt-8 text-base md:text-lg text-[var(--color-ink-2)] leading-relaxed max-w-2xl">
            Live landing pages, B2B carousel systems, branded guides and the case studies they came
            from. Filter by type, open the live sites, flip through the decks.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-10 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <WorkShowcase items={workItems} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
