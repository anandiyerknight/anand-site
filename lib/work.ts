export type WorkType = "landing-page" | "carousel" | "guide" | "case-study";

export type WorkItem = {
  slug: string; // unique; also the public/work/<slug>/ folder name
  type: WorkType;
  title: string;
  category: string;
  blurb: string;
  brandColor?: string; // accent hairline on the card
  featured?: boolean; // surfaces on the home teaser
  order?: number; // sort within its group (lower first)
  // landing-page
  liveUrl?: string; // external link, opens new tab
  cover?: string; // /work/<slug>/cover.png
  // carousel
  gallery?: string[]; // ["/work/<slug>/01.png", ...] for the lightbox
  // guide (gated download)
  pdf?: string; // /work/<slug>/<file>.pdf
  // case-study — references existing data in lib/case-studies.ts (not duplicated)
  caseStudyId?: string;
};

// Single source of truth for the /work showcase. Assets live in public/work/<slug>/.
// New items are appended by the /addwork skill — no component changes needed.
export const workItems: WorkItem[] = [
  // ---------- Landing pages ----------
  {
    slug: "vita-plus",
    type: "landing-page",
    title: "Vita+",
    category: "Health-tech LP · Next.js",
    blurb:
      "A premium GLP-1 metabolic programme landing page for India's top 1%. Dark video hero, full Meta Pixel + CAPI funnel, Razorpay booking.",
    brandColor: "#9333EA",
    liveUrl: "https://vita-lp-hni.vercel.app",
    cover: "/work/vita-plus/cover.png",
    featured: true,
    order: 1,
  },
  {
    slug: "gutguru",
    type: "landing-page",
    title: "The Gut Guru",
    category: "Health · D2C LP",
    blurb:
      "Founder-led gut-health brand site. Earthy, editorial design with a multi-tab experience, social proof and a three-tier consult funnel.",
    brandColor: "#6B8A47",
    liveUrl: "https://thegutguru.co.in",
    cover: "/work/gutguru/cover.png",
    caseStudyId: "gutguru",
    featured: true,
    order: 2,
  },
  {
    slug: "bihari-swad",
    type: "landing-page",
    title: "Bihari Swad",
    category: "F&B · Demand-validation LP",
    blurb:
      "Premium Bihari-food gifting brand. Design-first demand-validation page with rounded 3D cards and Madhubani art direction.",
    brandColor: "#C1440E",
    liveUrl: "https://bihari-swad.vercel.app",
    cover: "/work/bihari-swad/cover.png",
    featured: true,
    order: 3,
  },
  {
    slug: "kvarski",
    type: "landing-page",
    title: "Kvarski",
    category: "Luxury D2C · Investor dashboard",
    blurb:
      "Ultra-premium fashion house. A data-dense investor dashboard visualising ad spend, ROAS and shipping economics for a 90-day exit thesis.",
    brandColor: "#B8860B",
    cover: "/work/kvarski/cover.png",
    caseStudyId: "kvarski",
    order: 4,
  },

  // ---------- Carousels (B2B LinkedIn series) ----------
  {
    slug: "carousel-content-machine",
    type: "carousel",
    title: "The Content Machine",
    category: "B2B LinkedIn carousel",
    blurb: "The time-trap of manual content, and the machine that replaces it. Hook to proof to CTA.",
    brandColor: "#ffffff",
    gallery: [
      "/work/carousel-content-machine/01.png",
      "/work/carousel-content-machine/02.png",
      "/work/carousel-content-machine/03.png",
      "/work/carousel-content-machine/04.png",
      "/work/carousel-content-machine/05.png",
    ],
    featured: true,
    order: 5,
  },
  {
    slug: "carousel-automation-roi",
    type: "carousel",
    title: "Automation ROI",
    category: "B2B LinkedIn carousel",
    blurb: "Which roles AI replaces, what it cannot, and the math on cost per outcome.",
    brandColor: "#ffffff",
    gallery: [
      "/work/carousel-automation-roi/01.png",
      "/work/carousel-automation-roi/02.png",
      "/work/carousel-automation-roi/03.png",
      "/work/carousel-automation-roi/04.png",
      "/work/carousel-automation-roi/05.png",
    ],
    order: 6,
  },
  {
    slug: "carousel-linkedin-authority",
    type: "carousel",
    title: "LinkedIn Authority",
    category: "B2B LinkedIn carousel",
    blurb: "Scoring, reach and the formats that turn a profile into conversion infrastructure.",
    brandColor: "#ffffff",
    gallery: [
      "/work/carousel-linkedin-authority/01.png",
      "/work/carousel-linkedin-authority/02.png",
      "/work/carousel-linkedin-authority/03.png",
      "/work/carousel-linkedin-authority/04.png",
      "/work/carousel-linkedin-authority/05.png",
      "/work/carousel-linkedin-authority/06.png",
    ],
    order: 7,
  },
  {
    slug: "carousel-90-day-plan",
    type: "carousel",
    title: "The 90-Day Plan",
    category: "B2B LinkedIn carousel",
    blurb: "Month one to month three of a growth-system rollout, with the single requirement that makes it work.",
    brandColor: "#ffffff",
    gallery: [
      "/work/carousel-90-day-plan/01.png",
      "/work/carousel-90-day-plan/02.png",
      "/work/carousel-90-day-plan/03.png",
      "/work/carousel-90-day-plan/04.png",
      "/work/carousel-90-day-plan/05.png",
      "/work/carousel-90-day-plan/06.png",
    ],
    order: 8,
  },

  // ---------- Brand guides (gated PDF downloads) ----------
  {
    slug: "guide-diabetes",
    type: "guide",
    title: "Diabetes Protocol",
    category: "GutGuru · Branded guide",
    blurb: "A clinician-grade diabetes nutrition protocol, designed as a branded lead magnet.",
    brandColor: "#6B8A47",
    pdf: "/work/guide-diabetes/diabetes-protocol.pdf",
    order: 9,
  },
  {
    slug: "guide-pcos",
    type: "guide",
    title: "PCOS Protocol",
    category: "GutGuru · Branded guide",
    blurb: "Nutrition and lifestyle protocol for PCOS, packaged as an on-brand downloadable.",
    brandColor: "#6B8A47",
    pdf: "/work/guide-pcos/pcos-protocol.pdf",
    order: 10,
  },
  {
    slug: "guide-thyroid",
    type: "guide",
    title: "Thyroid Protocol",
    category: "GutGuru · Branded guide",
    blurb: "A practical thyroid-support nutrition protocol guide.",
    brandColor: "#6B8A47",
    pdf: "/work/guide-thyroid/thyroid-protocol.pdf",
    order: 11,
  },
  {
    slug: "guide-fatty-liver",
    type: "guide",
    title: "Fatty Liver Protocol",
    category: "GutGuru · Branded guide",
    blurb: "Reversal-focused nutrition protocol for fatty liver.",
    brandColor: "#6B8A47",
    pdf: "/work/guide-fatty-liver/fatty-liver-protocol.pdf",
    order: 12,
  },
  {
    slug: "guide-pms",
    type: "guide",
    title: "PMS Protocol",
    category: "GutGuru · Branded guide",
    blurb: "Cycle-aware nutrition protocol to ease PMS symptoms.",
    brandColor: "#6B8A47",
    pdf: "/work/guide-pms/pms-protocol.pdf",
    order: 13,
  },
  {
    slug: "guide-prenatal",
    type: "guide",
    title: "Prenatal Protocol",
    category: "GutGuru · Branded guide",
    blurb: "Nutrition protocol for the prenatal stage.",
    brandColor: "#6B8A47",
    pdf: "/work/guide-prenatal/prenatal-protocol.pdf",
    order: 14,
  },
  {
    slug: "guide-postnatal",
    type: "guide",
    title: "Postnatal Protocol",
    category: "GutGuru · Branded guide",
    blurb: "Recovery and nourishment protocol for the postnatal stage.",
    brandColor: "#6B8A47",
    pdf: "/work/guide-postnatal/postnatal-protocol.pdf",
    order: 15,
  },
  {
    slug: "guide-pregnancy",
    type: "guide",
    title: "Pregnancy Protocol",
    category: "GutGuru · Branded guide",
    blurb: "Trimester-aware nutrition protocol for pregnancy.",
    brandColor: "#6B8A47",
    pdf: "/work/guide-pregnancy/pregnancy-protocol.pdf",
    order: 16,
  },
  {
    slug: "guide-protein",
    type: "guide",
    title: "Protein Guide",
    category: "GutGuru · Branded guide",
    blurb: "A practical guide to hitting protein targets on an Indian diet.",
    brandColor: "#6B8A47",
    pdf: "/work/guide-protein/protein-guide.pdf",
    order: 17,
  },
  {
    slug: "guide-alcohol",
    type: "guide",
    title: "Alcohol Guide",
    category: "GutGuru · Branded guide",
    blurb: "A clear-headed guide to alcohol, metabolism and gut health.",
    brandColor: "#6B8A47",
    pdf: "/work/guide-alcohol/alcohol-guide.pdf",
    order: 18,
  },

  // ---------- Case studies (reference lib/case-studies.ts) ----------
  {
    slug: "case-ecole",
    type: "case-study",
    title: "Ecole Chantemerle",
    category: "Education · Hyper-growth",
    blurb: "A Swiss institution turnaround: 2 leads a month to 2,000, and ₹3L of spend into ₹1.5Cr.",
    brandColor: "#ffffff",
    caseStudyId: "ecole",
    order: 19,
  },
];

// A work item carries a written case study if it is a case-study card OR links one.
export function hasCaseStudy(item: WorkItem): boolean {
  return item.type === "case-study" || Boolean(item.caseStudyId);
}
