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

      {/* 1. Hero with video */}
      <Hero />

      {/* 2. Product Gallery — the highlight */}
      <AppsShowcase />

      {/* 3. Clients & Brands — right below, always visible */}
      <BrandWall />

      {/* 4. About */}
      <Methodology />

      {/* 5. Apply */}
      <AuditForm />

      {/* === COLLAPSIBLE AFTER FORM === */}

      <CollapsibleSection title="Film & Cinema Work" description="Sound design and direction credits across major productions">
        <CinemaSection />
      </CollapsibleSection>

      <CollapsibleSection title="Performance Marketing" description="A decade of AI-augmented video and campaign work">
        <ReelGallery />
        <AfterGrid />
      </CollapsibleSection>

      <CollapsibleSection title="Skills" description="The full tech behind every system I build">
        <TechSkills />
      </CollapsibleSection>

      <CollapsibleSection title="Reviews" description="What founders say after the system ships">
        <Testimonial />
      </CollapsibleSection>

      <CollapsibleSection title="FAQ" description="How I work, who this is for, and what to expect">
        <FAQ />
      </CollapsibleSection>

      <Footer />
    </main>
  );
}
