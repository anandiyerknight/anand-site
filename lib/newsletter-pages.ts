export type NewsletterPageSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type NewsletterPageContent = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: NewsletterPageSection[];
  takeaway: string;
};

export const newsletterPageContent: Record<string, NewsletterPageContent> = {
  "21-cold-outbound": {
    eyebrow: "Issue 21 · Cold outbound",
    title: "₹1.5 crore closed in 60 days. The outbound system behind 64,000 touchpoints.",
    intro:
      "Most outbound does not fail because the first message is bad. It fails because the system stops too early.",
    sections: [
      {
        heading: "The campaign",
        paragraphs: [
          "An AI-led outbound system reached 8,000 cold buyers across 1,000 companies. It found the right people, wrote relevant messages, sequenced the follow-ups, and kept the response loop moving.",
          "The result was not one clever message. It was 64,000 touchpoints that turned into 1,920 conversations, approximately 240 real leads, and ₹1.5 crore closed in 60 days.",
        ],
      },
      {
        heading: "Why persistence changed the result",
        paragraphs: [
          "Most businesses stop after four outbound messages. That feels disciplined, but it means stopping before the response curve has had a chance to change.",
          "The stronger lesson was simple: persistence beat volume. The sequence kept going until the buyers had enough context to respond, not until the sender got bored.",
        ],
        bullets: [
          "92% of businesses never send more than four outbound messages.",
          "The campaign kept learning at message six and follow-up eight.",
          "Every reply stopped the sequence and moved the conversation into response handling.",
        ],
      },
      {
        heading: "The channel and speed advantage",
        paragraphs: [
          "Channel choice changed the economics. WhatsApp produced 8.2% positive replies, compared with 0.8% from cold email.",
          "Speed mattered after the reply arrived. A five-minute response window kept the buyer in the conversation while the problem was still active and the context was still fresh.",
        ],
        bullets: [
          "WhatsApp: 8.2% positive replies.",
          "Cold email: 0.8% positive replies.",
          "Response target: within five minutes.",
        ],
      },
      {
        heading: "The funnel, in plain numbers",
        paragraphs: ["The whole case study can be read as one operating system rather than four disconnected tactics."],
        bullets: [
          "64,000 touchpoints.",
          "1,920 conversations.",
          "Approximately 240 real leads.",
          "₹1.5 crore closed in 60 days.",
        ],
      },
      {
        heading: "The operating system",
        paragraphs: [
          "Outbound becomes repeatable when the work is connected: research the right buyers, sequence the outreach long enough to learn something, use the channel that creates a real conversation, and respond while the conversation is warm.",
          "If you had started 45 days earlier, you would not be guaranteed the same result. You would have 45 more days of conversations, data and follow-up behind you. That is the opportunity cost of waiting.",
        ],
      },
    ],
    takeaway: "Outbound is not a message. It is a system that keeps moving after the first message.",
  },
};

export function getNewsletterPageContent(slug: string, title: string, blurb: string): NewsletterPageContent {
  return (
    newsletterPageContent[slug] ?? {
      eyebrow: "The Automation Series",
      title,
      intro: blurb,
      sections: [
        {
          heading: "Read the case study",
          paragraphs: [blurb, "This issue is part of the Automation Series: one practical system, one page, and the math behind it."],
        },
      ],
      takeaway: "The math is the point: make the system visible, then decide what to automate next.",
    }
  );
}
