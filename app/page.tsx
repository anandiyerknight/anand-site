import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { BrandWall } from "@/components/brand-wall";
import { AfterGrid } from "@/components/after-grid";
import { Methodology } from "@/components/methodology";
import { StackPinned } from "@/components/stack-pinned";
import { ReelGallery } from "@/components/reel-gallery";
import { PosterScroll } from "@/components/poster-scroll";
import { MusicSection } from "@/components/music-section";
import { AppsShowcase } from "@/components/apps-showcase";
import { Testimonial } from "@/components/testimonial";
import { FAQ } from "@/components/faq";
import { AuditForm } from "@/components/audit-form";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <BrandWall />
      <AfterGrid />
      <Methodology />
      <ReelGallery />
      <PosterScroll />
      <MusicSection />
      <StackPinned />
      <AppsShowcase />
      <Testimonial />
      <FAQ />
      <AuditForm />
      <Footer />
    </main>
  );
}
