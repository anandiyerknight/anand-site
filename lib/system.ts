// The "Compounding Loop" experience — single source of truth for /system.
// Four stages, each opening into categories, each category into real example galleries.
// Assets live in public/system/<stage>/... . Channel/system names are deliberately
// generic (no vendor/tool names) per the brand rule.

export type AssetKind = "carousel" | "image" | "pdf" | "site" | "diagram";

export type SystemAsset = {
  kind: AssetKind;
  src: string; // thumbnail shown in the grid
  caption: string;
  gallery?: string[]; // carousel/diagram slides for the lightbox (defaults to [src])
  href?: string; // pdf file or live site url (opens in a new tab)
};

export type SystemCategory = {
  id: string;
  name: string;
  blurb: string;
  assets: SystemAsset[];
};

export type SystemStage = {
  id: string;
  num: string;
  name: string;
  hint: string; // short line on the loop card
  howWeDoIt: string[]; // the method, in plain words
  howItWorks: string[]; // generic systems/channels — NO tool names
  feeds: string; // next stage (last loops back to the first)
  categories: SystemCategory[];
};

const seq = (dir: string, n: number, ext = "png") =>
  Array.from({ length: n }, (_, i) => `${dir}/${String(i + 1).padStart(2, "0")}.${ext}`);

export const STAGES: SystemStage[] = [
  // ───────────────────────────── 01 ─────────────────────────────
  {
    id: "data",
    num: "01",
    name: "Data Enrichment",
    hint: "Find & qualify the right people",
    feeds: "Content Automation",
    howWeDoIt: [
      "Pin down exactly who your buyer is — role, industry, company size.",
      "Scrape and enrich those contacts with verified details and buying signals.",
      "Score every lead so outreach starts with the best-fit names first.",
    ],
    howItWorks: [
      "Lead scraping",
      "Contact & company enrichment",
      "List building & segmentation",
      "Intent signals",
      "ICP targeting",
    ],
    categories: [
      {
        id: "method",
        name: "How it works",
        blurb: "From a raw scrape to a ranked, ready-to-message list.",
        assets: [
          {
            kind: "diagram",
            src: "/system/data/diagrams/enrichment.svg",
            caption: "Raw list → enriched → ranked ICP",
          },
        ],
      },
      {
        id: "list",
        name: "List building, explained",
        blurb: "A real carousel we built on the master-list method.",
        assets: [
          {
            kind: "carousel",
            src: "/system/data/master-list/01.png",
            caption: "The Master List — carousel",
            gallery: seq("/system/data/master-list", 5),
          },
        ],
      },
      {
        id: "case",
        name: "Case study",
        blurb: "Why a clean, ranked list changes the whole funnel.",
        assets: [
          {
            kind: "pdf",
            src: "/system/data/pdf/master-list.png",
            caption: "The Master List — case study",
            href: "/system/data/pdf/master-list.pdf",
          },
        ],
      },
    ],
  },

  // ───────────────────────────── 02 ─────────────────────────────
  {
    id: "content",
    num: "02",
    name: "Content Automation",
    hint: "Produce assets at scale",
    feeds: "Outreach Automation",
    howWeDoIt: [
      "Turn your offer into a content system, not one-off posts.",
      "Generate on-brand carousels, posters and creatives at channel volume.",
      "Every asset is checked for brand fit and platform rules before it ships.",
    ],
    howItWorks: [
      "Carousels",
      "Posters & creatives",
      "Short-form video",
      "Newsletters & case studies",
      "Ad copy & captions",
    ],
    categories: [
      {
        id: "instagram",
        name: "Instagram carousels",
        blurb: "Scroll-stopping 5-slide sets, on brand.",
        assets: [
          {
            kind: "carousel",
            src: "/system/content/ig-full-stack/01.png",
            caption: "Full-Stack System",
            gallery: seq("/system/content/ig-full-stack", 5),
          },
          {
            kind: "carousel",
            src: "/system/content/ig-carousel-reach/01.png",
            caption: "Carousel Reach",
            gallery: seq("/system/content/ig-carousel-reach", 5),
          },
        ],
      },
      {
        id: "linkedin",
        name: "LinkedIn B2B carousels",
        blurb: "Lead-gen carousels, hook to CTA.",
        assets: [
          {
            kind: "carousel",
            src: "/system/content/li-90day/01.png",
            caption: "90-Day Growth Plan",
            gallery: seq("/system/content/li-90day", 6),
          },
        ],
      },
      {
        id: "posters",
        name: "Posters & branded creatives",
        blurb: "Single-frame creatives and a branded explainer set.",
        assets: [
          ...seq("/system/content/posters", 10).map((src, i) => ({
            kind: "image" as const,
            src,
            caption: `Health-tip poster ${String(i + 1).padStart(2, "0")}`,
          })),
          {
            kind: "carousel" as const,
            src: "/system/content/gut-adhd/01.png",
            caption: "Branded explainer carousel",
            gallery: seq("/system/content/gut-adhd", 7),
          },
        ],
      },
      {
        id: "case",
        name: "Case study",
        blurb: "Creative produced at scale, without a content team.",
        assets: [
          {
            kind: "pdf",
            src: "/system/content/pdf/carousel-factory.png",
            caption: "The Carousel Factory — case study",
            href: "/system/content/pdf/carousel-factory.pdf",
          },
        ],
      },
    ],
  },

  // ───────────────────────────── 03 ─────────────────────────────
  {
    id: "outreach",
    num: "03",
    name: "Outreach Automation",
    hint: "Deliver the offer everywhere",
    feeds: "Conversion Optimisation",
    howWeDoIt: [
      "Load the qualified list and the offer into one engine.",
      "Reach every prospect across their channels on a timed, multi-touch sequence.",
      "It stops on a reply, follows up on silence, and never double-messages.",
    ],
    howItWorks: ["WhatsApp", "LinkedIn", "Email", "Instagram", "Messenger"],
    categories: [
      {
        id: "channels",
        name: "Channels",
        blurb: "One list, the same offer, every channel — in sync.",
        assets: [
          {
            kind: "diagram",
            src: "/system/outreach/diagrams/channels.svg",
            caption: "One list → every channel",
          },
        ],
      },
      {
        id: "sequences",
        name: "Sequences",
        blurb: "Multi-touch follow-up that never drops the ball.",
        assets: [
          {
            kind: "diagram",
            src: "/system/outreach/diagrams/sequence.svg",
            caption: "A multi-touch outreach sequence",
          },
        ],
      },
      {
        id: "machine",
        name: "The outreach machine",
        blurb: "A real carousel explaining the outbound engine.",
        assets: [
          {
            kind: "carousel",
            src: "/system/outreach/outreach-machine/01.png",
            caption: "The Outreach Machine — carousel",
            gallery: seq("/system/outreach/outreach-machine", 5),
          },
        ],
      },
      {
        id: "case",
        name: "Case study",
        blurb: "What speed-to-lead does to reply rates.",
        assets: [
          {
            kind: "pdf",
            src: "/system/outreach/pdf/speed-to-lead.png",
            caption: "Speed to Lead — case study",
            href: "/system/outreach/pdf/speed-to-lead.pdf",
          },
        ],
      },
    ],
  },

  // ───────────────────────────── 04 ─────────────────────────────
  {
    id: "conversion",
    num: "04",
    name: "Conversion Optimisation",
    hint: "Convert, measure, feed back",
    feeds: "Data Enrichment — the loop closes",
    howWeDoIt: [
      "Send traffic to fast, brand-native pages built to convert.",
      "Capture and qualify every lead, then measure what actually worked.",
      "Feed the results back to targeting so the next cycle is sharper.",
    ],
    howItWorks: [
      "Landing pages",
      "Chat funnels",
      "Retargeting & ads",
      "Tracking & analytics",
      "A/B testing & reporting",
    ],
    categories: [
      {
        id: "landing",
        name: "Landing pages",
        blurb: "Live pages we built and shipped.",
        assets: [
          {
            kind: "site",
            src: "/system/conversion/landing-pages/vita.png",
            caption: "Vita+ — health-tech LP",
            href: "https://vita-lp-hni.vercel.app",
          },
          {
            kind: "site",
            src: "/system/conversion/landing-pages/gutguru.png",
            caption: "The Gut Guru — D2C LP",
            href: "https://thegutguru.co.in",
          },
          {
            kind: "site",
            src: "/system/conversion/landing-pages/bihari.png",
            caption: "Bihari Swad — F&B LP",
            href: "https://bihari-swad.vercel.app",
          },
        ],
      },
      {
        id: "magnets",
        name: "Lead magnets",
        blurb: "Gated guides that turn attention into contacts.",
        assets: [
          {
            kind: "pdf",
            src: "/system/conversion/magnets/pcos.png",
            caption: "PCOS Protocol — lead magnet",
            href: "/system/conversion/magnets/pcos.pdf",
          },
          {
            kind: "pdf",
            src: "/system/conversion/magnets/thyroid.png",
            caption: "Thyroid Protocol — lead magnet",
            href: "/system/conversion/magnets/thyroid.pdf",
          },
        ],
      },
      {
        id: "offers",
        name: "Offers & proposals",
        blurb: "Brand-native decks that close.",
        assets: [
          {
            kind: "pdf",
            src: "/system/conversion/proposals/services-offer.png",
            caption: "Services offer",
            href: "/system/conversion/proposals/services-offer.pdf",
          },
          {
            kind: "pdf",
            src: "/system/conversion/proposals/playbook.png",
            caption: "Automation playbook",
            href: "/system/conversion/proposals/playbook.pdf",
          },
          {
            kind: "pdf",
            src: "/system/conversion/proposals/successive.png",
            caption: "Brand-native proposal",
            href: "/system/conversion/proposals/successive.pdf",
          },
        ],
      },
      {
        id: "tracking",
        name: "Tracking & reporting",
        blurb: "Measure everything, then feed it back to the top.",
        assets: [
          {
            kind: "diagram",
            src: "/system/conversion/diagrams/tracking.svg",
            caption: "Track → measure → feed back",
          },
          {
            kind: "pdf",
            src: "/system/conversion/pdf/crm-graveyard.png",
            caption: "The CRM Graveyard — case study",
            href: "/system/conversion/pdf/crm-graveyard.pdf",
          },
        ],
      },
    ],
  },
];
