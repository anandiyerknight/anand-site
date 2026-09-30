import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { ServicesSection } from "@/components/features/ServicesSection";
import { AppsShowcase } from "@/components/apps-showcase";
import { WorkGrid } from "@/components/work-grid";
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

export const metadata: Metadata = {
  title: "AI Automation & Revenue Infrastructure for Founders | Anand Iyer",
  description:
    "Anand Iyer builds AI-powered content, marketing, and outbound systems that help ambitious founders create demand and convert it into revenue.",
};

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "You're a creative director AND an engineer — how?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "15 years in both worlds taught me they're not separate. Creative direction without engineering is a spec; engineering without creative is just infrastructure. The leverage emerges at the intersection. I build systems that solve creative problems at scale.",
        },
      },
      {
        "@type": "Question",
        name: "What exactly do you build?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Custom AI-native platforms, video automation pipelines, revenue systems, trading infrastructure, and content engines. Whatever compounds your leverage and removes friction from high-volume repetitive work. Every system is production-grade, documented, and transferable.",
        },
      },
      {
        "@type": "Question",
        name: "Who is this NOT for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If you're still evaluating, exploring, or learning, this isn't for you. I work with founders and teams who already know they need systems built and are ready to deploy. You need capital, conviction, and the discipline to operationalize.",
        },
      },
    ],
  };

  return (
    <main className="relative">
      <Nav />

      {/* 1. Hero with video */}
      <Hero />

      {/* 2. Services */}
      <ServicesSection />

      {/* 3. Product Gallery — the highlight */}
      <AppsShowcase />

      {/* 3b. Selected Work teaser — fills the nav's /#work-grid anchor, links to /work */}
      <WorkGrid />

      {/* 4. Clients & Brands — right below, always visible */}
      <BrandWall />

      {/* 5. About */}
      <Methodology />

      {/* 6. Apply */}
      <AuditForm />

      {/* === COLLAPSIBLE AFTER FORM === */}

      <CollapsibleSection
        title="Film & Cinema Work"
        description="Sound design and direction credits across major productions"
        autoOpen
      >
        <CinemaSection />
      </CollapsibleSection>

      <CollapsibleSection
        title="Performance Marketing"
        description="A decade of AI-augmented video and campaign work"
        autoOpen
      >
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}
