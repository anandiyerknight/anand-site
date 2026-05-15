import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { AppsShowcase } from "@/components/apps-showcase";
import { BrandWall } from "@/components/brand-wall";
import { AfterGrid } from "@/components/after-grid";
import { Methodology } from "@/components/methodology";
import { ReelGallery } from "@/components/reel-gallery";
import { CinemaSection } from "@/components/cinema-section";
import { TechSkills } from "@/components/tech-skills";
import { Testimonial } from "@/components/testimonial";
import { FAQ } from "@/components/faq";
import { AuditForm } from "@/components/audit-form";
import { Footer } from "@/components/footer";
import { CollapsibleSection } from "@/components/collapsible-section";

export default function Page() {
  return (
    <main className="relative">
      <Nav />

      {/* Main 4 Sections - Always Visible */}
      <Hero />
      <AppsShowcase />
      <Methodology />
      <AuditForm />

      {/* Collapsible Sections Below Form */}
      <CollapsibleSection title="Gallery & Work" description="Extended gallery of branded work">
        <BrandWall />
      </CollapsibleSection>

      <CollapsibleSection title="Cinema & Visual Work" description="Behind-the-scenes and cinematic samples">
        <CinemaSection />
        <ReelGallery />
        <AfterGrid />
      </CollapsibleSection>

      <CollapsibleSection title="Tech Stack & Architecture" description="Production-grade technologies">
        <TechSkills />
      </CollapsibleSection>

      <CollapsibleSection title="What builders say" description="Testimonials from founders">
        <Testimonial />
      </CollapsibleSection>

      <CollapsibleSection title="FAQ" description="Common questions about the approach">
        <FAQ />
      </CollapsibleSection>

      <Footer />
    </main>
  );
}
