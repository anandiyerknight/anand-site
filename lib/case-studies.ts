export type CaseStudy = {
  id: string;
  brand: string;
  category: string;
  headline: string;
  metrics: { label: string; value: string }[];
  body: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "gutguru",
    brand: "GutGuru",
    category: "Clinical AI · SaaS",
    headline:
      "India's first clinical AI-native CRM for nutrition practice. From spreadsheet to platform.",
    metrics: [
      { label: "Time-to-plan", value: "5h → 15m" },
      { label: "Lab markers", value: "60+" },
      { label: "Status", value: "Live · Multi-nutritionist" },
    ],
    body: [
      "GutGuru replaces manual diet-plan workflows with a clinical-grade AI pipeline grounded in India-specific data engineering, 60+ lab markers, and 15 condition protocols.",
      "Built for Indian nutritionists managing 30–80 active clients. Multi-nutritionist auth + admin portal, credit-based SaaS model, Claude Sonnet 4.6 powered AI engine.",
      "First of its kind in India. No competing AI-native CRM exists for Indian nutrition workflows.",
    ],
  },
  {
    id: "kvarski",
    brand: "Kvarski",
    category: "Luxury D2C · Exit",
    headline: "Ultra-premium luxury fashion house. Built to 15× exit ROI in 90 days.",
    metrics: [
      { label: "Exit ROI", value: "15×" },
      { label: "ROAS", value: "6.0" },
      { label: "EBITDA (90d)", value: "25%+" },
      { label: "CAC", value: "₹3,000 → ₹300" },
    ],
    body: [
      "Built from brand identity to product design to full-funnel DTC infrastructure for India's top 1% demographic.",
      "Optimized CTR from 1% industry standard to 3.5%; 3% purchase conversion (2× industry). Consistent 6:1 LTV-to-CAC via automated newsletter + WhatsApp workflows.",
      "6-month automated content engine increased revenue 4× while reducing team costs 90% via AI-augmented production.",
    ],
  },
  {
    id: "ecole",
    brand: "Ecole Chantemerle",
    category: "Education · Hyper-Growth",
    headline: "Swiss institution turnaround. 2 leads/month → 2,000 leads/month.",
    metrics: [
      { label: "Lead volume", value: "200×" },
      { label: "Spend → Revenue", value: "₹3L → ₹1.5Cr" },
      { label: "Channels", value: "WhatsApp · API · Web" },
    ],
    body: [
      "Architected the digital turnaround for a Swiss educational institution that had stalled at 2 inbound leads per month.",
      "Deployed an end-to-end automated funnel across WhatsApp, API integrations, and Web — scaled inbound to 2,000/month and converted ₹3L of spend into ₹1.5Cr revenue.",
      "Funnel science: 50+ viability tests across luxury fashion, healthcare, services. High-ROI pathways identified before scaling.",
    ],
  },
];
