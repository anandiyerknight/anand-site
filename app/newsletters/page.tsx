import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { NewsletterLibrary } from "@/components/newsletter-library";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
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

      <PageHeader
        tag="The Automation Series"
        title={
          <>
            20 systems. One page each. <span className="italic">The math, not the hype.</span>
          </>
        }
        description="Every issue is a one-page case study: a real-world example, what they did, and the money saved or earned. From ecommerce listings to cold outreach to the newsletter machine itself. Free to download, one at a time."
        note="Scenario numbers are illustrative models built to make the math concrete, not named client results."
      />

      <Section spacing="tight" bordered={false}>
        <NewsletterLibrary issues={newsletterIssues} />
      </Section>

      <Footer />
    </main>
  );
}
