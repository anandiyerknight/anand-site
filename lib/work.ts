export type WorkType = "landing-page" | "carousel" | "guide" | "case-study";

export type WorkItem = {
  slug: string; // unique; also the public/work/<slug>/ folder name
  type: WorkType;
  title: string;
  category: string;
  blurb: string;
  brandColor?: string; // accent used in subtle places (not a card border)
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
// (carousel + guide types are still supported by the system; none are seeded right now.)
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

  // ---------- Case studies (reference lib/case-studies.ts) ----------
  {
    slug: "case-ecole",
    type: "case-study",
    title: "Ecole Chantemerle",
    category: "Education · Hyper-growth",
    blurb: "A Swiss institution turnaround: 2 leads a month to 2,000, and ₹3L of spend into ₹1.5Cr.",
    brandColor: "#737373",
    caseStudyId: "ecole",
    order: 19,
  },
];

// A work item carries a written case study if it is a case-study card OR links one.
export function hasCaseStudy(item: WorkItem): boolean {
  return item.type === "case-study" || Boolean(item.caseStudyId);
}
