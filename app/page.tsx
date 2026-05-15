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

      {/* === 4 MAIN SECTIONS - Always Visible === */}
      {/* 1. Hero with video */}
      <Hero />

      {/* 2. Film section - poster grid (2 cols on mobile) */}
      <CinemaSection />

      {/* 3. About section */}
      <Methodology />

      {/* 4. Application form */}
      <AuditForm />

      {/* === COLLAPSIBLE SECTIONS AFTER FORM === */}
      <CollapsibleSection title="Product Gallery" description="Production-grade systems built and shipped">
        <AppsShowcase />
      </CollapsibleSection>

      <CollapsibleSection title="Reel & Visual Work" description="A decade of broadcast and AI-augmented output">
        <ReelGallery />
        <AfterGrid />
      </CollapsibleSection>

      <CollapsibleSection title="The Architect Behind" description="Full tech stack powering every system">
        <TechSkills />
      </CollapsibleSection>

      <CollapsibleSection title="What Builders Say" description="Reviews from founders after systems ship">
        <Testimonial />
      </CollapsibleSection>

      <CollapsibleSection title="FAQ" description="Common questions about the approach and process">
        <FAQ />
      </CollapsibleSection>

      <CollapsibleSection title="Brand Gallery" description="Clients and collaborators across industries">
        <BrandWall />
      </CollapsibleSection>

      <Footer />
    </main>
  );
}
