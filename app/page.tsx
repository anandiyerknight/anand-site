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

export default function Page() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <AppsShowcase />
      <BrandWall />
      <CinemaSection />
      <Methodology />
      <ReelGallery />
      <AfterGrid />
      <TechSkills />
      <Testimonial />
      <FAQ />
      <AuditForm />
      <Footer />
    </main>
  );
}
