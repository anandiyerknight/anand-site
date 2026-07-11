import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { WorkShowcase } from "@/components/work-showcase";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { workItems } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work · Landing Pages & Case Studies | Anand Iyer",
  description:
    "Selected work: live landing pages and the case studies behind them. The brands, the builds, and the math behind them.",
};

export default function WorkPage() {
  return (
    <main className="relative">
      <Nav />

      <PageHeader
        tag="Selected Work"
        title={
          <>
            The brands. The builds. <span className="italic">The math behind them.</span>
          </>
        }
        description="Live landing pages and the case studies behind them. Open the real sites, read the results."
      />

      <Section spacing="tight" bordered={false}>
        <WorkShowcase items={workItems} />
      </Section>

      <Footer />
    </main>
  );
}
