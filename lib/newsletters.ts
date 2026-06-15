export type NewsletterIssue = {
  num: string;
  slug: string;
  title: string;
  blurb: string;
};

// The 20-issue automation series. PDFs + hero images live in /public/newsletters/<slug>.{pdf,png}.
export const newsletterIssues: NewsletterIssue[] = [
  { num: "01", slug: "01-master-list", title: "The Automation Map", blurb: "Eight things your business can automate this quarter, the complete map with the math." },
  { num: "02", slug: "02-listing-velocity", title: "Listing Velocity", blurb: "Your competitor lists 40 products a week. You list 4. The listing bottleneck, solved at 10× speed." },
  { num: "03", slug: "03-one-sku-thirty-assets", title: "One SKU, Thirty Assets", blurb: "One product photo in. Thirty launch-ready assets out, in 20 minutes instead of 3 days." },
  { num: "04", slug: "04-speed-to-lead", title: "Speed to Lead", blurb: "A lead that waits 4 hours already bought from someone else. The 5-minute response system." },
  { num: "05", slug: "05-crm-graveyard", title: "The CRM Graveyard", blurb: "2,000 leads you already paid for are sitting cold. A reactivation sequence at zero acquisition cost." },
  { num: "06", slug: "06-repetition-problem", title: "The Repetition Problem", blurb: "One founder voice note becomes ten assets. The repurposing engine, explained with the math." },
  { num: "07", slug: "07-calendar-autopilot", title: "Calendar on Autopilot", blurb: "A 90-day content calendar that runs whether you are motivated or not, for a tenth of a team's cost." },
  { num: "08", slug: "08-buried-content", title: "The Buried Goldmine", blurb: "Your best content already exists, buried in your sent folder. A mining system digs it out." },
  { num: "09", slug: "09-photoshoot-vs-api", title: "Photoshoot vs API", blurb: "₹40,000 photoshoot vs ₹400 of API credits. Where AI imagery replaces the shoot, and where it does not." },
  { num: "10", slug: "10-poster-factory", title: "The Poster Factory", blurb: "Lock the brand kit once, then produce on-brand creative daily without a designer in the loop." },
  { num: "11", slug: "11-carousel-reach", title: "The Carousel Gap", blurb: "The highest-leverage format on LinkedIn, produced in 15 minutes instead of 3 hours." },
  { num: "12", slug: "12-carousel-factory", title: "The Assembly Line", blurb: "12 carousels in one afternoon. A month of your best-performing format, produced in one sitting." },
  { num: "13", slug: "13-profile-check", title: "The Profile Check", blurb: "Buyers check your profile before they reply. Posting is conversion infrastructure for outbound." },
  { num: "14", slug: "14-founder-brand-os", title: "Founder Brand OS", blurb: "Two hours of founder input a month becomes daily presence. The operating system, not the willpower." },
  { num: "15", slug: "15-connection-engine", title: "The Connection Engine", blurb: "25 targeted requests a day, run safely with verification, become 8 qualified meetings a month." },
  { num: "16", slug: "16-warm-outreach", title: "Warm Outreach", blurb: "Two weeks of genuine engagement before the ask, and what it does to every rate in the funnel." },
  { num: "17", slug: "17-outbound-machine", title: "The Outbound Machine", blurb: "100 personalised emails a day, zero sent by a human, with cost-per-meeting math." },
  { num: "18", slug: "18-sequence-math", title: "Sequence Math", blurb: "Two-thirds of replies arrive after the first email. The 5-touch sequence that claims them." },
  { num: "19", slug: "19-newsletter-sales-asset", title: "The Newsletter", blurb: "A newsletter is not content. It is a sales asset with a 20-issue runway." },
  { num: "20", slug: "20-full-stack", title: "The Full Stack", blurb: "₹8L in, ₹66L pipeline out. All eight systems assembled into one growth machine." },
];
