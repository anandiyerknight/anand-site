export type NewsletterMetric = { value: string; label: string };
export type NewsletterBeforeAfter = { label: string; before: string; after: string };
export type NewsletterCaseStudy = {
  image?: string;
  eyebrow: string;
  headline: string;
  profileLabel: string;
  profileHtml: string;
  situation: string[];
  steps: string[];
  resultsTitle: string;
  hero: NewsletterMetric;
  metrics: NewsletterMetric[];
  beforeAfter: NewsletterBeforeAfter[];
  cta: { heading: string; body: string; button: string };
};

export const newsletterCaseStudies: Record<string, NewsletterCaseStudy> = {
  "01-master-list": {
    "eyebrow": "Case study",
    "headline": "A ₹2Cr business found ₹1 lakh a month hiding in work nobody needed to do by hand.",
    "profileLabel": "The business",
    "profileHtml": "A <b>₹2Cr services-plus-D2C company</b> with a 4-person team. The founder personally handled follow-ups, listings, posting and outreach.",
    "situation": [
      "Nothing was broken. Everything was manual. Follow-ups, content, product listings, LinkedIn, email and dead-lead chasing all ran on someone's hands, usually the founder's.",
      "Add it up and it was <b>120+ hours a month</b> of repeat work. At even ₹800 an hour of founder time, that is roughly ₹1,00,000 a month spent doing what a ₹15,000 system does without missing a day."
    ],
    "steps": [
      "Mapped all <b>8 automatable systems</b> against the business: content, listings, WhatsApp, LinkedIn, outreach, email, image and carousels.",
      "Ranked them by revenue impact, not by what was easiest, and picked the top 3 to wire first.",
      "Built those 3 over one quarter, each with a human approval step. Nothing ran fully blind.",
      "Handed the founder a dashboard and a 20-minute weekly review instead of 120 hours of doing."
    ],
    "resultsTitle": "The result, one quarter",
    "hero": {
      "value": "₹1,00,000 / month of founder time reclaimed",
      "label": "Repeat work moved to systems running at about ₹15,000 a month."
    },
    "metrics": [
      {
        "value": "120+ hrs",
        "label": "monthly repeat work off the founder's plate"
      },
      {
        "value": "8 systems",
        "label": "mapped, the top 3 live in quarter one"
      },
      {
        "value": "₹15K/mo",
        "label": "system run cost vs ~₹1L of manual time"
      },
      {
        "value": "near-daily",
        "label": "output, up from sporadic bursts"
      }
    ],
    "beforeAfter": [
      {
        "label": "Founder hrs / mo",
        "before": "120+",
        "after": "~20"
      },
      {
        "label": "Monthly cost",
        "before": "~₹1L time",
        "after": "~₹15K tools"
      },
      {
        "label": "Output",
        "before": "sporadic",
        "after": "near-daily"
      }
    ],
    "cta": {
      "heading": "Not sure which system to wire first?",
      "body": "Reply \"MAP\" and I will tell you what I would automate first in your business. Free, no call.",
      "button": "Reply MAP →"
    }
  },
  "02-listing-velocity": {
    "eyebrow": "Case study",
    "headline": "A D2C brand went from 4 product listings a week to 40, with the same one person.",
    "profileLabel": "The brand",
    "profileHtml": "A <b>₹3Cr D2C brand</b> selling on Amazon, Flipkart and Shopify. One person owned listings, and new SKUs sat in a spreadsheet for weeks.",
    "situation": [
      "Every listing was 2 to 3 hours by hand: title, description, bullets, keywords, marketplace variants and alt text. So 4 went live a week while dozens waited.",
      "The catalog, the thing customers actually search, stayed thin. A competitor listed 40 a week and collected the long-tail searches this brand never appeared for."
    ],
    "steps": [
      "Fed the pipeline just SKU data and one product photo.",
      "AI drafted the title, description, bullets, keywords and Amazon/Flipkart variants in brand voice.",
      "The owner reviewed and approved each in about <b>12 minutes</b> instead of 2 to 3 hours.",
      "Listing velocity went from 4 a week to <b>40</b>, clearing the backlog in weeks."
    ],
    "resultsTitle": "The result, 6 months",
    "hero": {
      "value": "₹2,40,000 / month in long-tail orders the catalog used to miss",
      "label": "Search traffic on queries the brand finally listed for. Zero new ad spend."
    },
    "metrics": [
      {
        "value": "40 / wk",
        "label": "listings published, up from 4"
      },
      {
        "value": "12 min",
        "label": "per listing, down from 2 to 3 hours"
      },
      {
        "value": "₹0",
        "label": "extra acquisition cost for long-tail search"
      },
      {
        "value": "10×",
        "label": "faster catalog coverage than before"
      }
    ],
    "beforeAfter": [
      {
        "label": "Listings / week",
        "before": "4",
        "after": "40"
      },
      {
        "label": "Time / listing",
        "before": "2-3 hrs",
        "after": "12 min"
      },
      {
        "label": "Catalog gap",
        "before": "widening",
        "after": "closed"
      }
    ],
    "cta": {
      "heading": "More SKUs than listings?",
      "body": "Reply \"LISTINGS\" and I will outline what your pipeline would look like. Free.",
      "button": "Reply LISTINGS →"
    }
  },
  "03-one-sku-thirty-assets": {
    "eyebrow": "Case study",
    "headline": "One product photo became 30 launch-ready assets, in 20 minutes instead of 3 days.",
    "profileLabel": "The brand",
    "profileHtml": "A D2C brand launching <b>2 to 3 new SKUs a month</b>. Each launch went live with a PDP and one ad, because that was all there was time for.",
    "situation": [
      "A full launch (PDP, 5 ad variants, social posts, carousel, email, WhatsApp, marketplace variants, alt text) was 3 days across a writer, a designer and the marketplace person.",
      "Outsourced, it worked out to roughly ₹6,000 per asset once the retainer was divided by what actually shipped. So launches shipped thin."
    ],
    "steps": [
      "Fed the engine one product photo and the SKU data.",
      "It produced the full asset tree: PDP, 5 Meta variants, 3 social posts, an 8-slide carousel, an email block, a WhatsApp blurb, marketplace variants, lifestyle images, alt text and keywords.",
      "The team reviewed for about <b>20 minutes</b> and approved.",
      "Every launch now ships complete, present everywhere a buyer looks."
    ],
    "resultsTitle": "The result, per launch",
    "hero": {
      "value": "₹1,74,000 saved per launch vs an agency",
      "label": "30 assets at ~₹200 of API cost each instead of ~₹6,000 of agency cost."
    },
    "metrics": [
      {
        "value": "30",
        "label": "assets from one product photo"
      },
      {
        "value": "20 min",
        "label": "of review vs 3 days of production"
      },
      {
        "value": "₹200",
        "label": "API cost per asset vs ₹6,000 agency"
      },
      {
        "value": "complete",
        "label": "every launch, not just a PDP and one ad"
      }
    ],
    "beforeAfter": [
      {
        "label": "Assets / launch",
        "before": "1-2",
        "after": "30"
      },
      {
        "label": "Time",
        "before": "3 days",
        "after": "20 min"
      },
      {
        "label": "Cost / asset",
        "before": "₹6,000",
        "after": "₹200"
      }
    ],
    "cta": {
      "heading": "Launching with one ad and a prayer?",
      "body": "Reply \"PIPELINE\" and I will map your one-input asset tree. Free.",
      "button": "Reply PIPELINE →"
    }
  },
  "04-speed-to-lead": {
    "eyebrow": "Case study",
    "headline": "Same ads, same leads. Replying in 5 minutes instead of next morning doubled the conversations.",
    "profileLabel": "The business",
    "profileHtml": "A business spending <b>₹1L a month on lead ads</b> for 200 leads. The team replied the next working morning.",
    "situation": [
      "Leads filled the form at peak intent, around 2:40 PM. The reply landed 18 hours later. By 3:15 PM the same day, a competitor's WhatsApp had already arrived.",
      "Nothing was wrong with the ads. The most expensive leak was the gap between the click and the first reply."
    ],
    "steps": [
      "Wired a WhatsApp speed-to-lead system: form submit triggered a message <b>within 5 minutes</b>, from the business number, in the brand tone.",
      "Each message asked one qualifying question: budget, location or use case.",
      "Answers routed to a human with full context, flagged hot or nurture.",
      "No answer in 24 hours triggered a polite automated follow-up, including Sundays."
    ],
    "resultsTitle": "The result, 90 days",
    "hero": {
      "value": "2× the conversations from the same ₹1,00,000 ad spend",
      "label": "Replying while the buyer was still on their phone, every time, including Sunday 11 PM."
    },
    "metrics": [
      {
        "value": "5 min",
        "label": "first reply, down from next morning"
      },
      {
        "value": "200",
        "label": "leads a month, now answered every time"
      },
      {
        "value": "24/7",
        "label": "coverage, including weekends"
      },
      {
        "value": "₹0",
        "label": "extra ad spend for the lift"
      }
    ],
    "beforeAfter": [
      {
        "label": "First reply",
        "before": "18 hrs",
        "after": "5 min"
      },
      {
        "label": "Coverage",
        "before": "weekday AM",
        "after": "24/7"
      },
      {
        "label": "Leads answered",
        "before": "some",
        "after": "all"
      }
    ],
    "cta": {
      "heading": "Running lead ads right now?",
      "body": "Reply \"SPEED\" and I will sketch your 5-minute response flow. Free.",
      "button": "Reply SPEED →"
    }
  },
  "05-crm-graveyard": {
    "eyebrow": "Case study",
    "headline": "2,000 dead leads, already paid for. A 3-week sequence turned them into ₹5,00,000, at zero acquisition cost.",
    "profileLabel": "The business",
    "profileHtml": "A business that had run ads for two years. Its CRM held <b>2,000 leads</b> marked no-response, follow-up-later and not-interested-right-now.",
    "situation": [
      "Every one of those leads was paid for once and then forgotten. No human team systematically re-asks 2,000 people.",
      "The acquisition cost to revive them was exactly zero. They were just sitting there, cold."
    ],
    "steps": [
      "Built a <b>5-message WhatsApp and email sequence</b> over 3 weeks, genuinely useful, not just checking in.",
      "A price update, a new offer, a case study, a real question about whether the problem ever got solved.",
      "Every message stopped the moment someone replied or asked to stop.",
      "Model assumption: just <b>3%</b> restart a conversation."
    ],
    "resultsTitle": "The result, 3 weeks",
    "hero": {
      "value": "₹5,00,000 recovered, ₹0 new ad spend",
      "label": "From leads that were already written off, simply by re-asking them well."
    },
    "metrics": [
      {
        "value": "2,000",
        "label": "dormant leads systematically re-asked"
      },
      {
        "value": "60",
        "label": "live conversations, at a 3% restart rate"
      },
      {
        "value": "₹50,000",
        "label": "average order value on the wins"
      },
      {
        "value": "₹0",
        "label": "acquisition cost, leads already bought"
      }
    ],
    "beforeAfter": [
      {
        "label": "Dead leads worked",
        "before": "never",
        "after": "all"
      },
      {
        "label": "New ad spend",
        "before": "needed",
        "after": "₹0"
      },
      {
        "label": "Conversations",
        "before": "0",
        "after": "60"
      }
    ],
    "cta": {
      "heading": "Have 500+ cold leads in a sheet?",
      "body": "Reply \"REVIVE\" and I will outline your reactivation sequence. Free.",
      "button": "Reply REVIVE →"
    }
  },
  "06-repetition-problem": {
    "eyebrow": "Case study",
    "headline": "The founder with \"no time to post\" shipped 40 assets a month, on 20 minutes a week.",
    "profileLabel": "The founder",
    "profileHtml": "Runs a <b>6-person B2B SaaS company in Pune</b>. Closes business on nearly every sales call. Knows content works. Her last LinkedIn post before this was <b>5 months old</b>.",
    "situation": [
      "She did not have a content problem. She had a repetition problem. She could explain her product brilliantly ten times a week on calls, but turning one idea into a blog, three posts, a carousel and an email felt like a second job.",
      "A content agency quoted her <b>₹75,000 a month for 8 posts</b> that never sounded like her. She passed. Then she tried to do it herself, posted for nine days, and stopped."
    ],
    "steps": [
      "Once a week she recorded one 5-minute voice note. No script, just a client story, an opinion, a mistake she kept seeing.",
      "The engine drafted <b>10 assets in her voice</b>: 1 blog post, 3 LinkedIn posts, 1 carousel, 1 email, 1 WhatsApp broadcast, 3 short posts.",
      "She reviewed for <b>20 minutes</b> and hit approve. Nothing published without her click.",
      "Four notes a month became <b>40 scheduled assets</b>, going out on autopilot across the week."
    ],
    "resultsTitle": "The result, 90 days",
    "hero": {
      "value": "₹70,000 / month saved",
      "label": "The agency she did not have to hire. Tooling ran about ₹5,000 a month instead."
    },
    "metrics": [
      {
        "value": "40",
        "label": "assets published per month, up from near zero"
      },
      {
        "value": "~3 hrs",
        "label": "total founder time across the full 90 days"
      },
      {
        "value": "14",
        "label": "inbound conversations from posts that used to never exist"
      },
      {
        "value": "₹3,00,000",
        "label": "new pipeline traced to that inbound, in one quarter"
      }
    ],
    "beforeAfter": [
      {
        "label": "Posts / month",
        "before": "0 to 2",
        "after": "40"
      },
      {
        "label": "Founder time",
        "before": "a second job",
        "after": "1 hr / mo"
      },
      {
        "label": "Monthly cost",
        "before": "₹75K agency",
        "after": "~₹5K tools"
      }
    ],
    "cta": {
      "heading": "Talk well but post never?",
      "body": "Reply \"ENGINE\" and I will show you what your first voice note would produce. Free, no call needed.",
      "button": "Reply ENGINE →"
    }
  },
  "07-calendar-autopilot": {
    "eyebrow": "Case study",
    "headline": "A brilliant fortnight then two months of silence became publishing every day, for a tenth of a content team's cost.",
    "profileLabel": "The business",
    "profileHtml": "A services business that posted in motivated bursts: five posts, two reels, then <b>two months of nothing</b> while the algorithm and the audience forgot them.",
    "situation": [
      "Daily is a brutal ask for a human team and a trivial ask for a system. Average-but-daily beats brilliant-but-occasional every time.",
      "A junior content hire plus a freelance designer plus tools ran <b>₹1.2L+ a month</b>, and output still dropped every time someone took leave."
    ],
    "steps": [
      "Once a quarter, planned 90 days of themes with the system: what they sell, what buyers ask, what season it is.",
      "Weekly, the engine drafted the week across formats and queued it in a review folder.",
      "The founder spent <b>30 minutes a week</b> approving, not writing or designing.",
      "Something published every day, including travel weeks and deal weeks."
    ],
    "resultsTitle": "The result, one quarter",
    "hero": {
      "value": "₹1,05,000 / month saved",
      "label": "A ₹1.2L content team replaced by a ~₹15,000 system that never has a busy week."
    },
    "metrics": [
      {
        "value": "365 days",
        "label": "of presence, no busy-week gaps"
      },
      {
        "value": "30 min",
        "label": "of founder review a week, nothing else"
      },
      {
        "value": "₹15K",
        "label": "run cost a month vs ₹1.2L+ for a team"
      },
      {
        "value": "0",
        "label": "missed days, even on leave"
      }
    ],
    "beforeAfter": [
      {
        "label": "Cadence",
        "before": "bursts",
        "after": "daily"
      },
      {
        "label": "Monthly cost",
        "before": "₹1.2L",
        "after": "₹15K"
      },
      {
        "label": "Founder time",
        "before": "high",
        "after": "30 min/wk"
      }
    ],
    "cta": {
      "heading": "Posted in January and never since?",
      "body": "Reply \"CALENDAR\" and I will draft your first 90-day theme map. Free.",
      "button": "Reply CALENDAR →"
    }
  },
  "08-buried-content": {
    "eyebrow": "Case study",
    "headline": "A founder's sent folder already held a month of content. A mining system dug out 30 pieces a month from work already done.",
    "profileLabel": "The founder",
    "profileHtml": "A founder who explained their expertise brilliantly in <b>client emails, sales calls and proposals</b>, then sent each to one person and let it die.",
    "situation": [
      "The best content this business could ever publish already existed, buried and used once. Specific, experienced, in the founder's voice, answering questions real buyers asked.",
      "Multiply one great client email by every call, proposal and objection handled this year. Hundreds of pieces of proof, written once, never reused."
    ],
    "steps": [
      "Piped call recordings, sent emails, proposals and WhatsApp threads into one place, client names and numbers stripped automatically.",
      "The engine extracted the reusable gold: objections answered, mistakes explained, frameworks used without realising.",
      "Each nugget became a post, email or carousel, anonymised and in the founder's voice.",
      "Drafts landed in a review folder, approved in minutes."
    ],
    "resultsTitle": "The result, per month",
    "hero": {
      "value": "₹60,000 / month of content, already paid for in work done",
      "label": "Agency-volume output mined from material the founder was producing anyway."
    },
    "metrics": [
      {
        "value": "30 pieces",
        "label": "publishable, mined per month"
      },
      {
        "value": "1 hr / wk",
        "label": "of raw material already being produced"
      },
      {
        "value": "₹0",
        "label": "new content cost on top"
      },
      {
        "value": "uncopyable",
        "label": "content, it comes from real client calls"
      }
    ],
    "beforeAfter": [
      {
        "label": "Content source",
        "before": "none",
        "after": "sent folder"
      },
      {
        "label": "Pieces / mo",
        "before": "~0",
        "after": "30"
      },
      {
        "label": "Extra effort",
        "before": "high",
        "after": "~0"
      }
    ],
    "cta": {
      "heading": "Curious what's in your sent folder?",
      "body": "Reply \"MINE\" and I will show you the extraction list. Free.",
      "button": "Reply MINE →"
    }
  },
  "09-photoshoot-vs-api": {
    "eyebrow": "Case study",
    "headline": "A D2C brand cut creative cost from ₹2,650 an asset to ₹13, without lying about the product.",
    "profileLabel": "The brand",
    "profileHtml": "A D2C brand spending <b>₹1L+ a quarter</b> on photoshoots: studio, photographer, editing, 2-week lead times, one chance to get the brief right.",
    "situation": [
      "A ₹40,000 shoot produced about 15 usable images, roughly ₹2,650 per asset. Every seasonal variant meant another shoot.",
      "The honest catch: AI imagery genuinely replaces about 80% of creative volume (lifestyle, backgrounds, seasonal, banners, social), but the shoot still wins on true product detail."
    ],
    "steps": [
      "Shot the product once, properly, for the hero detail images buyers actually receive.",
      "Pointed image generation, driven by the brand kit, at the other 200 creatives a quarter.",
      "Lifestyle scenes, campaign backgrounds, festival versions and A/B backgrounds, all same-day, unlimited variants.",
      "Kept generated images away from product-detail claims, protecting returns and marketplace listings."
    ],
    "resultsTitle": "The result, per quarter",
    "hero": {
      "value": "₹2,650 → ₹13 per asset on 80% of creative volume",
      "label": "Same-day variants instead of 2-week shoots, with the product still shot honestly."
    },
    "metrics": [
      {
        "value": "₹13",
        "label": "per asset at volume vs ₹2,650"
      },
      {
        "value": "same day",
        "label": "turnaround vs a 2-week shoot"
      },
      {
        "value": "80%",
        "label": "of creative volume automated"
      },
      {
        "value": "20%",
        "label": "still shot, on purpose, for detail"
      }
    ],
    "beforeAfter": [
      {
        "label": "Cost / asset",
        "before": "₹2,650",
        "after": "₹13"
      },
      {
        "label": "Turnaround",
        "before": "2 wks",
        "after": "same day"
      },
      {
        "label": "Variants",
        "before": "1",
        "after": "unlimited"
      }
    ],
    "cta": {
      "heading": "Spending ₹1L+ a quarter on creatives?",
      "body": "Reply \"IMAGES\" and I will show you which 80% automates. Free.",
      "button": "Reply IMAGES →"
    }
  },
  "10-poster-factory": {
    "eyebrow": "Case study",
    "headline": "A small brand got agency-grade daily creative on roughly ₹500 a month, with a designer needed only once a quarter.",
    "profileLabel": "The brand",
    "profileHtml": "A small brand whose feed <b>looked like five different brands</b> by week six, the founder making 11 PM Canva posts that matched nothing.",
    "situation": [
      "Brand recall comes from the same colors, type and layout showing up daily until the audience knows a post is yours before reading the name.",
      "A designer at ₹40,000 a month produced about 20 posters with queue delays, and the look drifted the moment they were busy."
    ],
    "steps": [
      "Locked the brand kit once: colors, fonts, logo rules and 5 to 6 layout templates a real designer approved on day one.",
      "Turned each layout into an HTML/CSS template that renders pixel-perfect every time, so the design cannot drift.",
      "Fed daily content in: the offer, the tip, the testimonial, the festival greeting.",
      "Posters rendered in minutes, the same look in October as in March."
    ],
    "resultsTitle": "The result, 6 months",
    "hero": {
      "value": "₹39,500 / month saved on design, consistency up",
      "label": "A ₹40,000 designer queue replaced by a ~₹500 render cost that never drifts off-brand."
    },
    "metrics": [
      {
        "value": "unlimited",
        "label": "posters a month vs about 20"
      },
      {
        "value": "₹500",
        "label": "render cost a month vs ₹40,000 designer"
      },
      {
        "value": "1×",
        "label": "designer touch a quarter, to refresh templates"
      },
      {
        "value": "0",
        "label": "off-brand drift"
      }
    ],
    "beforeAfter": [
      {
        "label": "Posters / mo",
        "before": "~20",
        "after": "unlimited"
      },
      {
        "label": "Cost",
        "before": "₹40K/mo",
        "after": "~₹500/mo"
      },
      {
        "label": "Designer needed",
        "before": "daily",
        "after": "quarterly"
      }
    ],
    "cta": {
      "heading": "Does your feed look like five brands?",
      "body": "Reply \"FACTORY\" and I will spec your template kit. Free.",
      "button": "Reply FACTORY →"
    }
  },
  "11-carousel-reach": {
    "eyebrow": "Case study",
    "headline": "A founder turned dusty blog posts into weekly carousels, the feed's top format, in 15 minutes instead of 3 hours.",
    "profileLabel": "The founder",
    "profileHtml": "A B2B founder who knew <b>carousels won the LinkedIn feed</b> and posted zero, because each was a 2 to 3 hour Canva design task.",
    "situation": [
      "A carousel makes a reader swipe, and each swipe is dwell time, the strongest signal a feed has that content deserves more reach. A text post earns one stop of the thumb; an 8-slide carousel earns eight.",
      "Nobody sustains 3 hours of design a week, so the highest-leverage format stayed absent."
    ],
    "steps": [
      "Fed the engine content that already existed: a blog post, a long email, a voice-note transcript.",
      "It sliced the argument into a slide arc: hook, 6 idea slides, CTA.",
      "The locked brand template rendered the slides, on-brand every time.",
      "Finished carousel in about <b>15 minutes</b> of review, not 3 hours of design."
    ],
    "resultsTitle": "The result, per month",
    "hero": {
      "value": "12 hours a month back, and the feed's top format weekly",
      "label": "The best-performing format went from absent to four a month, from content already owned."
    },
    "metrics": [
      {
        "value": "15 min",
        "label": "per carousel vs 3 hours of design"
      },
      {
        "value": "4 / mo",
        "label": "carousels from content you already had"
      },
      {
        "value": "12 hrs",
        "label": "of design time bought back a month"
      },
      {
        "value": "8×",
        "label": "the dwell of a text post"
      }
    ],
    "beforeAfter": [
      {
        "label": "Carousels / mo",
        "before": "0",
        "after": "4"
      },
      {
        "label": "Time / carousel",
        "before": "3 hrs",
        "after": "15 min"
      },
      {
        "label": "Format reach",
        "before": "low",
        "after": "top"
      }
    ],
    "cta": {
      "heading": "Have 10 blog posts gathering dust?",
      "body": "Reply \"CAROUSEL\" and I will show you which one converts first. Free.",
      "button": "Reply CAROUSEL →"
    }
  },
  "12-carousel-factory": {
    "eyebrow": "Case study",
    "headline": "12 carousels in one 4-hour afternoon, instead of 12 sessions that never actually happened.",
    "profileLabel": "The founder",
    "profileHtml": "A founder making one carousel a week, which meant re-entering content mode <b>52 times a year</b> and, in practice, never shipping a full quarter.",
    "situation": [
      "Context-switching is the real cost. One-at-a-time means reopening the template, re-finding your voice and re-deciding what good looks like, every single week.",
      "The ad-hoc route, 12 separate sessions at 2 to 3 hours each, costs 24 to 36 hours across a quarter and rarely ships all 12."
    ],
    "steps": [
      "Picked 12 ideas in 30 minutes from the blog, voice notes and mined sales calls. Selecting, not inventing.",
      "Outlined all 12 arcs first, hook to CTA, before designing anything. One hour.",
      "Batch-rendered all 12 through the locked template.",
      "Reviewed in one sitting, about 10 minutes each, then scheduled the whole quarter."
    ],
    "resultsTitle": "The result, per quarter",
    "hero": {
      "value": "A full quarter of carousels in ~4 focused hours",
      "label": "20 to 30 hours saved versus the ad-hoc route, and a quarter that actually ships."
    },
    "metrics": [
      {
        "value": "12",
        "label": "carousels in one sitting"
      },
      {
        "value": "~4 hrs",
        "label": "total vs 24 to 36 hours"
      },
      {
        "value": "6-8×",
        "label": "output per hour of input"
      },
      {
        "value": "1 quarter",
        "label": "scheduled in one go"
      }
    ],
    "beforeAfter": [
      {
        "label": "Shipped / quarter",
        "before": "rarely 12",
        "after": "12"
      },
      {
        "label": "Time",
        "before": "24-36 hrs",
        "after": "~4 hrs"
      },
      {
        "label": "Context switches",
        "before": "12",
        "after": "1"
      }
    ],
    "cta": {
      "heading": "Want your first batch mapped?",
      "body": "Reply \"BATCH\" and I will outline your 12. Free.",
      "button": "Reply BATCH →"
    }
  },
  "13-profile-check": {
    "eyebrow": "Case study",
    "headline": "A founder's cold outreach started converting better, with the same messages, once the profile stopped being a graveyard.",
    "profileLabel": "The founder",
    "profileHtml": "A founder sending cold outreach behind a <b>2019 headshot and three posts from last Diwali</b>. The outreach took the blame; the infrastructure was empty.",
    "situation": [
      "Every cold message ends the same way: the prospect reads it, opens your profile, and decides in about 8 seconds whether you are real.",
      "A parked profile means ignore. The message was fine. The proof behind it was missing."
    ],
    "steps": [
      "Treated posting as conversion infrastructure, not a branding hobby.",
      "Ran <b>3 posts a week</b>, auto-drafted from voice notes and mined content, 30 minutes of review.",
      "Outreach recipients now landed on a living profile instead of a parked one.",
      "Same outreach volume, more replies, because the person checking now found evidence."
    ],
    "resultsTitle": "The result, per year",
    "hero": {
      "value": "120 extra conversations a year, content cost ~2 hrs a month",
      "label": "Same outreach volume, roughly 10% more recipients converting, plus inbound as a side effect."
    },
    "metrics": [
      {
        "value": "3 / wk",
        "label": "posts on about 2 hours a month"
      },
      {
        "value": "+120",
        "label": "conversations a year from the same outreach"
      },
      {
        "value": "8 sec",
        "label": "the profile-check window, now won"
      },
      {
        "value": "inbound",
        "label": "silent watchers who DM when the need arrives"
      }
    ],
    "beforeAfter": [
      {
        "label": "Profile",
        "before": "parked",
        "after": "living"
      },
      {
        "label": "Reply rate",
        "before": "flat",
        "after": "up"
      },
      {
        "label": "Posts / wk",
        "before": "0",
        "after": "3"
      }
    ],
    "cta": {
      "heading": "Sending outreach with a parked profile?",
      "body": "Reply \"PROFILE\" and I will audit yours. Free.",
      "button": "Reply PROFILE →"
    }
  },
  "14-founder-brand-os": {
    "eyebrow": "Case study",
    "headline": "A founder went from invisible to daily-present on 24 hours of input a year, not more willpower.",
    "profileLabel": "The founder",
    "profileHtml": "A founder who assumed daily-posting peers had more time, a ghostwriter, or a light calendar. The real answer was <b>an operating system</b>.",
    "situation": [
      "Daily presence looks like discipline. It is almost always a system that needs almost none of the founder's time.",
      "The cost of staying invisible: outreach that converts worse, inbound that never starts, and never becoming the default name in the niche."
    ],
    "steps": [
      "One 45-minute recorded conversation a month: interviewed about deals, mistakes, opinions and predictions.",
      "The engine turned it into <b>20+ post drafts</b> in the founder's voice.",
      "Drafts queued for a 30-minute fortnightly review, never auto-published.",
      "Approved posts scheduled across the month, daily presence while the founder slept."
    ],
    "resultsTitle": "The result, one year",
    "hero": {
      "value": "Daily presence on 24 founder-hours a year",
      "label": "Two hours a month of input bought the default-name position in the niche."
    },
    "metrics": [
      {
        "value": "2 hrs",
        "label": "total founder input a month"
      },
      {
        "value": "20+",
        "label": "posts a month from one conversation"
      },
      {
        "value": "default name",
        "label": "in the niche over a year"
      },
      {
        "value": "downstream",
        "label": "better outreach, inbound, hiring, valuation"
      }
    ],
    "beforeAfter": [
      {
        "label": "Presence",
        "before": "sporadic",
        "after": "daily"
      },
      {
        "label": "Founder input",
        "before": "high",
        "after": "2 hrs/mo"
      },
      {
        "label": "Niche authority",
        "before": "low",
        "after": "default name"
      }
    ],
    "cta": {
      "heading": "Want the interview-to-feed pipeline?",
      "body": "Reply \"BRAND\" and I will map your OS. Free.",
      "button": "Reply BRAND →"
    }
  },
  "15-connection-engine": {
    "eyebrow": "Case study",
    "headline": "25 careful connection requests a day became 8 qualified meetings a month, from a channel that costs only run-time.",
    "profileLabel": "The business",
    "profileHtml": "A business whose <b>cold emails to the right list mostly got deleted</b>, because nobody knew the name behind them.",
    "situation": [
      "A connection request is one tap with zero commitment, and the moment it is accepted you are no longer a stranger. Your posts enter their feed and your first message reads as someone in my network.",
      "Accounts that blast 200 a day get restricted, so the engine deliberately behaves like a careful human, with verification on every send."
    ],
    "steps": [
      "Sent <b>25 targeted requests a day</b> to the ICP only: role, industry, geography. List quality is 80% of the game.",
      "Added a personalised note where it earned its place, never a template blast.",
      "Held hard daily limits and human pacing, a marathon not a sprint.",
      "Verified every send against the sent-invitations page before counting it."
    ],
    "resultsTitle": "The result, per month",
    "hero": {
      "value": "~8 qualified meetings a month, channel cost ~₹0",
      "label": "A pipeline built only from the system's run-time, on a properly targeted ICP list."
    },
    "metrics": [
      {
        "value": "550 / mo",
        "label": "targeted requests sent"
      },
      {
        "value": "~30%",
        "label": "accept rate = 165 new ICP connections"
      },
      {
        "value": "~30",
        "label": "real conversations a month"
      },
      {
        "value": "~8",
        "label": "qualified meetings a month"
      }
    ],
    "beforeAfter": [
      {
        "label": "Channel cost",
        "before": "high",
        "after": "~₹0"
      },
      {
        "label": "First contact",
        "before": "stranger",
        "after": "in-network"
      },
      {
        "label": "Meetings / mo",
        "before": "few",
        "after": "~8"
      }
    ],
    "cta": {
      "heading": "Want the engine on your ICP?",
      "body": "Reply \"CONNECT\" and I will size your funnel. Free.",
      "button": "Reply CONNECT →"
    }
  },
  "16-warm-outreach": {
    "eyebrow": "Case study",
    "headline": "Two weeks of genuine engagement before the ask lifted accept rates from ~30% to 50%+ and roughly doubled replies.",
    "profileLabel": "The business",
    "profileHtml": "A business running the cold connection engine and wanting <b>every number in the funnel to move</b>, on the same 550-prospect list.",
    "situation": [
      "A request from an unknown name gets a guess. A request from someone who left two smart comments on your posts last week gets a positive opinion, formed before you asked for anything.",
      "And the comments are public, seen by the prospect's audience, which overlaps heavily with your ICP."
    ],
    "steps": [
      "Monitored the ICP list's posts and surfaced each new post to a queue.",
      "Sent one thoughtful comment per prospect, drafted for review, in the founder's voice, never generic noise.",
      "Gave it 1 to 2 weeks of light genuine presence, two or three touches.",
      "Then connected, from a now-familiar name, with an opener that continued the comment thread."
    ],
    "resultsTitle": "The result, same list",
    "hero": {
      "value": "Accept rate ~30% cold → 50%+ warm, replies roughly 2×",
      "label": "The same 550 prospects, roughly double the conversations, plus free public reach."
    },
    "metrics": [
      {
        "value": "50%+",
        "label": "accept rate, up from ~30% cold"
      },
      {
        "value": "~2×",
        "label": "reply rate on the opener"
      },
      {
        "value": "free",
        "label": "marketing, comments seen by the ICP"
      },
      {
        "value": "same list",
        "label": "no extra prospects needed"
      }
    ],
    "beforeAfter": [
      {
        "label": "Accept rate",
        "before": "~30%",
        "after": "50%+"
      },
      {
        "label": "Reply rate",
        "before": "baseline",
        "after": "~2×"
      },
      {
        "label": "Opener",
        "before": "cold",
        "after": "continuation"
      }
    ],
    "cta": {
      "heading": "Want the engagement layer mapped?",
      "body": "Reply \"WARM\" and I will map it for your ICP. Free.",
      "button": "Reply WARM →"
    }
  },
  "17-outbound-machine": {
    "eyebrow": "Case study",
    "headline": "100 personalised emails a day, zero sent by a human, at ₹1,250 a meeting instead of ₹5,500.",
    "profileLabel": "The business",
    "profileHtml": "A business relying on an <b>SDR at ₹60,000 a month</b> plus tools, getting 10 to 12 meetings, with pipeline that vanished whenever the SDR resigned.",
    "situation": [
      "Outbound only works on verified lists, personalised first touches, timed follow-ups, real reply triage and tracking from send to meeting. A blast tool is none of that.",
      "Bad lists kill outbound before the copy ever gets a chance."
    ],
    "steps": [
      "Built and enriched ICP lists, every contact verified before entering the queue.",
      "Sent a personalised first touch per contact, under 120 words, in the founder's voice.",
      "Ran 4 sequenced follow-ups over 3 weeks, each adding value, all stopping instantly on a reply.",
      "Auto-triaged every inbound: interested to the founder's phone, objection queued, unsubscribe honoured, bounce cleaned."
    ],
    "resultsTitle": "The result, cost per meeting",
    "hero": {
      "value": "₹5,500 → ₹1,250 per qualified meeting",
      "label": "4.5× cheaper per meeting, and a pipeline that survives the quarter the SDR resigns."
    },
    "metrics": [
      {
        "value": "100 / day",
        "label": "personalised sends, no human"
      },
      {
        "value": "~₹15K",
        "label": "run cost a month vs ₹60K SDR"
      },
      {
        "value": "~12",
        "label": "meetings a month, no sick days"
      },
      {
        "value": "4.5×",
        "label": "cheaper per meeting"
      }
    ],
    "beforeAfter": [
      {
        "label": "Cost / meeting",
        "before": "₹5,500",
        "after": "₹1,250"
      },
      {
        "label": "Run cost",
        "before": "₹60K/mo",
        "after": "~₹15K/mo"
      },
      {
        "label": "Sends / day",
        "before": "human-capped",
        "after": "100"
      }
    ],
    "cta": {
      "heading": "Want your cost-per-meeting modelled?",
      "body": "Reply \"MACHINE\" and I will run it on your numbers. Free.",
      "button": "Reply MACHINE →"
    }
  },
  "18-sequence-math": {
    "eyebrow": "Case study",
    "headline": "Switching from one-shot emails to a 5-touch sequence turned 10 replies into 28, from the same 1,000 contacts.",
    "profileLabel": "The business",
    "profileHtml": "A business sending one email, hearing silence, and concluding email does not work, <b>quitting where 65% of the return still waited</b>.",
    "situation": [
      "Of all replies a campaign earns, about 35% come from email one and 65% from touches two through five. Most businesses leave the larger share unclaimed.",
      "The first email was not rejected, it was buried. The prospect was in a meeting, on site, mid-crisis."
    ],
    "steps": [
      "Touch 1, the value open: their problem, one insight, no pitch.",
      "Touch 2 (day 4), a short nudge with one new proof point. Touch 3 (day 9), same offer, a different door.",
      "Touch 4 (day 15), the objection killer. Touch 5 (day 21), the polite breakup that triggers the only deadline.",
      "Every touch stopped instantly on any reply, nothing sent late or twice."
    ],
    "resultsTitle": "The result, same list",
    "hero": {
      "value": "10 replies → 28, same list, same spend",
      "label": "2.8× the conversations, just by claiming the 65% of replies that arrive after email one."
    },
    "metrics": [
      {
        "value": "2.8×",
        "label": "the conversations from the same list"
      },
      {
        "value": "65%",
        "label": "of replies come from touches 2 to 5"
      },
      {
        "value": "1,000",
        "label": "contacts, unchanged"
      },
      {
        "value": "₹0",
        "label": "extra spend"
      }
    ],
    "beforeAfter": [
      {
        "label": "Touches",
        "before": "1",
        "after": "5"
      },
      {
        "label": "Replies / 1,000",
        "before": "~10",
        "after": "~28"
      },
      {
        "label": "Return captured",
        "before": "35%",
        "after": "100%"
      }
    ],
    "cta": {
      "heading": "Sending one-shot emails today?",
      "body": "Reply \"SEQUENCE\" and I will draft your five touches. Free.",
      "button": "Reply SEQUENCE →"
    }
  },
  "19-newsletter-sales-asset": {
    "eyebrow": "Case study",
    "headline": "A 20-issue newsletter became a sales asset that touches every lead 20 times and pre-sells while the founder sleeps.",
    "profileLabel": "The business",
    "profileHtml": "A business treating a newsletter as content, a cost, when it is the <b>highest-leverage sales asset</b> on the whole map. You are reading the demo.",
    "situation": [
      "A newsletter is 20 automatic touches over five months, with no one remembering to follow up. It compounds backwards: subscriber 1,000 gets the same 20 issues subscriber 1 did.",
      "Work done once in month one keeps selling in month twelve, the only asset where your back catalogue works the front desk."
    ],
    "steps": [
      "Planned all 20 hooks in one sitting, batched.",
      "Rendered case-study PDFs from locked templates, the factory.",
      "Sent, sequenced and triaged replies with the outbound machine.",
      "Let the series pre-sell silently: non-repliers become the dark funnel who write in when the need arrives."
    ],
    "resultsTitle": "The result, per year",
    "hero": {
      "value": "20 automatic touches per lead, less than one chai per subscriber a year",
      "label": "A few founder-hours of planning that keeps selling to every subscriber for five months."
    },
    "metrics": [
      {
        "value": "1,000",
        "label": "subscribers modelled"
      },
      {
        "value": "~40%",
        "label": "open each issue"
      },
      {
        "value": "2-3",
        "label": "clients a quarter from CTAs"
      },
      {
        "value": "dark funnel",
        "label": "the silent majority who convert later"
      }
    ],
    "beforeAfter": [
      {
        "label": "Touches / lead",
        "before": "1",
        "after": "20"
      },
      {
        "label": "Back-catalogue",
        "before": "dead",
        "after": "selling"
      },
      {
        "label": "Follow-up",
        "before": "manual",
        "after": "automatic"
      }
    ],
    "cta": {
      "heading": "Want this exact machine?",
      "body": "Reply \"NEWSLETTER\" and I will scope your 20 issues. Free.",
      "button": "Reply NEWSLETTER →"
    }
  },
  "20-full-stack": {
    "eyebrow": "Case study · The playbook numbers",
    "headline": "₹8L in. ₹66L out. 8.25× in 90 days, from eight ordinary systems refusing to drop a lead.",
    "profileLabel": "The system",
    "profileHtml": "Eight systems assembled into one growth machine: a <b>content layer</b> that manufactures presence and an <b>outreach layer</b> that manufactures conversations.",
    "situation": [
      "Outreach without content is a stranger pitching. Content without outreach is a genius nobody visits. Wired together, every cold touch lands on a warm surface and the funnel multiplies instead of adds.",
      "That connection is the whole game, and it is exactly the part most businesses never build."
    ],
    "steps": [
      "Content layer (issues 2 to 12): ecommerce pipeline, repurposing engine, poster factory, carousel line. Manufactures presence.",
      "Outreach layer (issues 4 to 5, 15 to 18): WhatsApp speed-to-lead, reactivation, connection engine, email machine. Manufactures conversations.",
      "Wired the two together so every cold touch landed on a warm surface.",
      "Ran it daily for 90 days, dropping no lead, then handed the pipeline to the team."
    ],
    "resultsTitle": "The result, 90 days",
    "hero": {
      "value": "₹8,00,000 in → ₹66,00,000 out",
      "label": "8.25× return in 3 months, and a pipeline ready to hand to the team by day 90."
    },
    "metrics": [
      {
        "value": "₹8L",
        "label": "marketing spend activated"
      },
      {
        "value": "₹66L",
        "label": "revenue generated in 3 months"
      },
      {
        "value": "8.25×",
        "label": "return on the spend"
      },
      {
        "value": "90 days",
        "label": "to a team-ready pipeline"
      }
    ],
    "beforeAfter": [
      {
        "label": "Spend → return",
        "before": "₹8L",
        "after": "₹66L"
      },
      {
        "label": "Layers",
        "before": "siloed",
        "after": "wired"
      },
      {
        "label": "Leads dropped",
        "before": "daily",
        "after": "none"
      }
    ],
    "cta": {
      "heading": "Convinced by the series?",
      "body": "Reply \"SYSTEM\", or book directly below, and we will map your 90 days.",
      "button": "Reply SYSTEM →"
    }
  },
  "21-cold-outbound": {
    "eyebrow": "Case study",
    "headline": "₹1.5 crore closed in 60 days.",
    "profileLabel": "The campaign",
    "profileHtml": "An AI-led outbound system reached <b>8,000 cold buyers</b> across 1,000 companies, without treating the first message as the whole strategy.",
    "situation": [
      "Most businesses stop outreach after four messages. That feels disciplined, but it means stopping before the majority of replies and closes have had a chance to happen.",
      "The campaign treated outbound as an operating system: research, sequencing, follow-up, channel choice and response handling working together. The human team stayed focused on the conversations that mattered."
    ],
    "steps": [
      "Built a buyer list of <b>8,000 cold decision-makers</b> across 1,000 companies, with AI finding the right people and writing relevant first messages.",
      "Ran the sequence long enough to reach the follow-ups where the response curve changed: message six and follow-up eight.",
      "Used WhatsApp where it created the stronger response: <b>8.2% positive replies</b> versus 0.8% from cold email.",
      "Handled replies inside a <b>5-minute response window</b>, while the conversation was still warm."
    ],
    "resultsTitle": "The result, 60 days",
    "hero": {
      "value": "₹1.5 crore closed",
      "label": "From a system that kept moving after the first message."
    },
    "metrics": [
      {
        "value": "64,000",
        "label": "total touchpoints"
      },
      {
        "value": "1,920",
        "label": "conversations created"
      },
      {
        "value": "~240",
        "label": "real leads"
      },
      {
        "value": "8.2%",
        "label": "positive WhatsApp replies vs 0.8% email"
      }
    ],
    "beforeAfter": [
      {
        "label": "Follow-up",
        "before": "stops at 4",
        "after": "reaches 8"
      },
      {
        "label": "Channel",
        "before": "email 0.8%",
        "after": "WhatsApp 8.2%"
      },
      {
        "label": "Response",
        "before": "hours later",
        "after": "within 5 min"
      }
    ],
    "cta": {
      "heading": "Want the outbound model?",
      "body": "Reply \"MODEL\" and I will map the sequence, channel and response system on your numbers. Free.",
      "button": "Reply MODEL →"
    }
  }
  ,"22-brief-to-asset-loop": {
    "eyebrow": "Illustrative model",
    "headline": "One founder brief became 12 approved assets without 12 separate production starts.",
    "profileLabel": "The model",
    "profileHtml": "An <b>illustrative content workflow</b> for a founder-led B2B team with useful ideas, inconsistent publishing, and no appetite for twelve separate production cycles.",
    "situation": [
      "The founder had the raw material: calls, voice notes, customer questions and strong opinions. The bottleneck was turning each idea into a brief, a draft, a review cycle and a finished asset.",
      "That made content feel like twelve unrelated jobs. The model treats it as one source moving through a controlled queue, with human approval kept at the point where judgment matters."
    ],
    "steps": [
      "Capture one founder brief and structure it into the core point, proof, audience and call to action.",
      "Generate a long-form draft, short post, carousel outline, email, and supporting variations from the same approved source.",
      "Route every draft through one review queue instead of starting a new production conversation for every channel.",
      "Approve the source once, then adapt the finished assets to the channels where the audience already pays attention."
    ],
    "resultsTitle": "The model, one source",
    "hero": {
      "value": "12 approved assets",
      "label": "An illustrative output from one structured founder brief, not a named client result."
    },
    "metrics": [
      {
        "value": "1",
        "label": "source brief to keep the idea coherent"
      },
      {
        "value": "1 queue",
        "label": "approval path instead of scattered reviews"
      },
      {
        "value": "4 channels",
        "label": "adapted from the same approved source"
      },
      {
        "value": "0",
        "label": "new blank pages after the source is approved"
      }
    ],
    "beforeAfter": [
      {
        "label": "Production start",
        "before": "one per asset",
        "after": "one source"
      },
      {
        "label": "Review flow",
        "before": "scattered",
        "after": "one queue"
      },
      {
        "label": "Founder input",
        "before": "repeated",
        "after": "captured once"
      }
    ],
    "cta": {
      "heading": "Have ideas trapped in your head?",
      "body": "Reply \"CONTENT\" and I will map the source-to-asset workflow for your business. Free, no call.",
      "button": "Reply CONTENT →"
    }
  },
  "23-lead-handoff-loop": {
    "eyebrow": "Illustrative model",
    "headline": "A captured lead is not a qualified lead until the next action is obvious.",
    "profileLabel": "The model",
    "profileHtml": "An <b>illustrative lead-routing workflow</b> for a founder-led B2B team that captures demand but loses momentum between the form, the inbox, the CRM and the person who should reply.",
    "situation": [
      "The team had a working form and a steady stream of enquiries. The problem came after submission: some leads went to email, some to a spreadsheet, and some waited for a founder to remember the context.",
      "That makes response time a systems problem, not a motivation problem. The model gives every new lead a next action, an owner and a fallback before the conversation goes cold."
    ],
    "steps": [
      "Capture the source, landing page, request and urgency with the lead instead of forwarding a blank notification.",
      "Classify intent into three simple tiers: ready to talk, needs context, and not yet qualified.",
      "Route the lead to the right owner with a visible response target and a fallback when that owner is unavailable.",
      "Review the exception queue daily so no high-intent lead disappears between tools or handoffs."
    ],
    "resultsTitle": "The model, one workflow",
    "hero": {
      "value": "5-minute first action",
      "label": "An illustrative operating target for acknowledging and routing a high-intent enquiry, not a named client result."
    },
    "metrics": [
      {
        "value": "1 queue",
        "label": "single view of new and unassigned enquiries"
      },
      {
        "value": "3 tiers",
        "label": "simple intent bands for routing and follow-up"
      },
      {
        "value": "2 owners",
        "label": "primary owner plus an explicit fallback"
      },
      {
        "value": "0 hidden",
        "label": "high-intent leads left without a next action"
      }
    ],
    "beforeAfter": [
      {
        "label": "Lead record",
        "before": "blank alert",
        "after": "context attached"
      },
      {
        "label": "Ownership",
        "before": "someone should reply",
        "after": "owner + fallback"
      },
      {
        "label": "Exceptions",
        "before": "buried",
        "after": "daily queue"
      }
    ],
    "cta": {
      "heading": "Losing leads between tools?",
      "body": "Reply \"ROUTE\" and I will map the handoff loop for your current form, inbox and CRM. Free, no call.",
      "button": "Reply ROUTE →"
    }
  },
  "24-qualification-queue": {
    "eyebrow": "Illustrative model",
    "headline": "A lead does not need more follow-up. It needs the right next step.",
    "profileLabel": "The model",
    "profileHtml": "An <b>illustrative qualification workflow</b> for a small B2B team that receives enquiries with different levels of intent but treats every new lead as the same task.",
    "situation": [
      "The team had a steady stream of form fills and messages, but the queue mixed urgent buying signals with early research and incomplete requests. The result was predictable: the team either over-worked weak leads or let good ones wait.",
      "Qualification is not a gate that makes people fill out a longer form. It is a decision system that gives each lead a useful next action while keeping the human conversation easy to start."
    ],
    "steps": [
      "Capture the problem, timing, company context and requested outcome before assigning a priority.",
      "Place each enquiry into one of three lanes: ready to talk, needs context, or nurture.",
      "Give every lane a different next action instead of sending the same generic reply to everyone.",
      "Review the queue weekly and move leads when new context changes their intent."
    ],
    "resultsTitle": "The model, one queue",
    "hero": {
      "value": "3 qualification lanes",
      "label": "An illustrative operating model, not a named client result."
    },
    "metrics": [
      {
        "value": "4 signals",
        "label": "problem, timing, context and desired outcome"
      },
      {
        "value": "3 lanes",
        "label": "ready, needs context, and nurture"
      },
      {
        "value": "1 next step",
        "label": "a clear action for every enquiry"
      },
      {
        "value": "0 generic",
        "label": "leads receiving an identical response by default"
      }
    ],
    "beforeAfter": [
      {
        "label": "Priority",
        "before": "first in, first worked",
        "after": "intent-based queue"
      },
      {
        "label": "Reply",
        "before": "same message",
        "after": "lane-specific action"
      },
      {
        "label": "Review",
        "before": "gut feel",
        "after": "weekly movement"
      }
    ],
    "cta": {
      "heading": "Have a mixed-quality lead queue?",
      "body": "Reply \"QUALIFY\" and I will map the three-lane model to your current form, inbox and follow-up process. Free, no call.",
      "button": "Reply QUALIFY →"
    }
  },
  "25-ai-lead-qualification": {
    "eyebrow": "Illustrative model",
    "headline": "AI should sort the queue. People should decide what happens next.",
    "profileLabel": "The model",
    "profileHtml": "An <b>illustrative AI lead qualification workflow</b> for a small B2B team that needs to separate buying intent from incomplete or early-stage enquiries without hiding the reasoning behind a score.",
    "situation": [
      "The team was receiving leads from several pages and channels. Every enquiry landed in the same queue, so the person replying had to reconstruct the context before deciding whether to respond, ask a question, or wait.",
      "The useful role for AI is not to make the final sales decision. It is to read the available context, surface the signals, explain the suggested lane, and leave a human with a clear next action."
    ],
    "steps": [
      "Collect the page, source, request, company context and timing with each enquiry so the model sees the same evidence a human would need.",
      "Ask the model to extract intent signals and return a short reason for its suggested lane instead of an unexplained score.",
      "Route the enquiry into ready to talk, needs context, or nurture, with a different next action for each lane.",
      "Keep a human approval point for high-value, ambiguous or sensitive enquiries, then feed the decision back into the weekly review."
    ],
    "resultsTitle": "The model, one decision loop",
    "hero": {
      "value": "1 human decision",
      "label": "The final qualification decision stays reviewable; the AI handles the sorting and explanation around it."
    },
    "metrics": [
      {
        "value": "5 signals",
        "label": "page, source, request, context and timing"
      },
      {
        "value": "3 lanes",
        "label": "ready, needs context, and nurture"
      },
      {
        "value": "1 reason",
        "label": "a short explanation beside the suggested lane"
      },
      {
        "value": "0 black boxes",
        "label": "important decisions made without a visible rationale"
      }
    ],
    "beforeAfter": [
      {
        "label": "Intake",
        "before": "same queue",
        "after": "context attached"
      },
      {
        "label": "AI output",
        "before": "mystery score",
        "after": "lane + reason"
      },
      {
        "label": "Ownership",
        "before": "fully automated",
        "after": "human approval where needed"
      }
    ],
    "cta": {
      "heading": "Want a qualification workflow you can inspect?",
      "body": "Reply \"QUALIFY\" and I will map the AI-assisted decision loop to your current form, inbox and follow-up process. Free, no call.",
      "button": "Reply QUALIFY →"
    }
  },
  "26-lead-routing-automation": {
    "eyebrow": "Illustrative model",
    "headline": "A qualified lead is not a win until someone owns the next action.",
    "profileLabel": "The model",
    "profileHtml": "An <b>illustrative lead-routing workflow</b> for a small B2B team that can identify buying intent but still loses momentum when ownership, timing or fallback rules are unclear.",
    "situation": [
      "Qualification answers one question: how ready is this enquiry? Routing answers the next one: who does what now? Without that second decision, a good lead becomes another item in a shared inbox.",
      "The useful system makes the route visible. It carries the evidence into the handoff, gives one person a specific next action and creates a fallback before the lead has to chase the team."
    ],
    "steps": [
      "Carry the lead's page, source, request, qualification lane and unanswered question into the handoff so the owner does not restart the investigation.",
      "Map each lane to one next action: contact now, ask for missing context, or schedule the next nurture touch.",
      "Assign one owner with a response window, then name the fallback owner before the route is considered complete.",
      "Log the outcome and review exceptions weekly: late handoffs, unclear ownership, repeated questions and leads that changed lanes."
    ],
    "resultsTitle": "The route, one accountable handoff",
    "hero": {
      "value": "1 next action",
      "label": "Every route ends with an owner, a response window and a fallback."
    },
    "metrics": [
      {
        "value": "3 lanes",
        "label": "ready, needs context, and nurture"
      },
      {
        "value": "1 owner",
        "label": "one person accountable for the next move"
      },
      {
        "value": "1 fallback",
        "label": "a named backup when the owner is unavailable"
      },
      {
        "value": "0 orphan paths",
        "label": "no route ends without a next action"
      }
    ],
    "beforeAfter": [
      {
        "label": "Context",
        "before": "reconstructed later",
        "after": "attached at handoff"
      },
      {
        "label": "Ownership",
        "before": "shared inbox",
        "after": "one accountable owner"
      },
      {
        "label": "Coverage",
        "before": "hope someone replies",
        "after": "owner + fallback"
      }
    ],
    "cta": {
      "heading": "Where do your qualified leads disappear?",
      "body": "Reply \"ROUTE\" and I will map the owner, response window and fallback for one lead path in your current system. Free, no call.",
      "button": "Reply ROUTE →"
    }
  },
  "27-lead-leakage-audit": {
    "image": "/newsletters/27-lead-leakage-audit.svg",
    "eyebrow": "Illustrative model",
    "headline": "Most lead leakage is not a traffic problem. It is a missing checkpoint between interest and ownership.",
    "profileLabel": "The audit",
    "profileHtml": "A <b>four-point lead-leakage audit</b> for a small business that receives enquiries from forms, WhatsApp, email or social but cannot reliably explain where a qualified lead went next.",
    "situation": [
      "A lead can be real, relevant and ready — and still disappear. The usual cause is not one dramatic failure. It is a chain of small gaps: the source is lost, the qualification answer is not carried forward, the owner is unclear, or the follow-up has no deadline.",
      "The audit treats each enquiry as a traceable path. Start with the first signal, follow the handoff, and mark the first point where evidence, ownership or timing becomes ambiguous. That point is the leak to fix first."
    ],
    "steps": [
      "Trace the source: record the page, campaign, channel and original request so the next person sees the same context as the first responder.",
      "Check the qualification handoff: confirm that the evidence and lane — ready, needs context or nurture — travel with the lead instead of being reconstructed later.",
      "Test ownership: name the person responsible for the next action and the response window. A shared inbox is a queue, not an owner.",
      "Test recovery: define the fallback, log the outcome and review the first broken checkpoint each week before adding more volume."
    ],
    "resultsTitle": "The output, one visible leak",
    "hero": {
      "value": "4 checkpoints",
      "label": "source, evidence, ownership and recovery — enough to locate the first broken handoff."
    },
    "metrics": [
      {
        "value": "1 source",
        "label": "where the enquiry started"
      },
      {
        "value": "1 lane",
        "label": "the next step implied by the evidence"
      },
      {
        "value": "1 owner",
        "label": "accountable for the next action"
      },
      {
        "value": "1 fallback",
        "label": "the recovery path when timing slips"
      }
    ],
    "beforeAfter": [
      {
        "label": "Source",
        "before": "lost in the inbox",
        "after": "attached to the record"
      },
      {
        "label": "Ownership",
        "before": "someone should reply",
        "after": "one named owner"
      },
      {
        "label": "Recovery",
        "before": "manual chasing",
        "after": "owner + fallback"
      }
    ],
    "cta": {
      "heading": "Find the first broken checkpoint",
      "body": "Reply \"LEAK\" and I will help you map one lead path from first signal to next action. Free, no call.",
      "button": "Reply LEAK →"
    }
  },
  "28-follow-up-sla": {
    "image": "/newsletters/28-follow-up-sla.svg",
    "eyebrow": "Illustrative model",
    "headline": "“We followed up” is not a process. A process has a clock, an owner and a next decision.",
    "profileLabel": "The model",
    "profileHtml": "A <b>three-clock follow-up SLA</b> for a small revenue team that receives genuine enquiries but treats every unanswered lead as the same kind of problem.",
    "situation": [
      "Most follow-up systems measure activity: messages sent, reminders created, calls attempted. That is the wrong scoreboard. The buyer experiences only one question: did the next useful step happen while the context was still alive?",
      "An unanswered lead can mean three different things. The team replied too slowly. The buyer needs a decision or missing detail. Or the timing is wrong and the lead needs a respectful recovery path. One generic reminder cannot solve all three."
    ],
    "steps": [
      "Set the first-response clock: define the maximum time before a human or approved automation acknowledges the enquiry with context, not a blank receipt.",
      "Set the decision clock: after the first exchange, assign the next decision — qualify, propose, ask one missing question, or close the loop — with one owner and a due time.",
      "Set the recovery clock: if the buyer goes quiet, choose a different useful follow-up rather than repeating the same “just checking in” message.",
      "Review clock failures weekly: separate slow responses, unclear decisions and poor recovery so the fix matches the leak."
    ],
    "resultsTitle": "The operating rule",
    "hero": {
      "value": "3 clocks",
      "label": "first response, next decision, and recovery — each with its own owner and deadline."
    },
    "metrics": [
      {
        "value": "01",
        "label": "first response: acknowledge with context"
      },
      {
        "value": "02",
        "label": "next decision: make the route explicit"
      },
      {
        "value": "03",
        "label": "recovery: change the follow-up job"
      },
      {
        "value": "1 owner",
        "label": "every clock ends with accountability"
      }
    ],
    "beforeAfter": [
      {
        "label": "Scoreboard",
        "before": "messages sent",
        "after": "decisions moved"
      },
      {
        "label": "Reminder",
        "before": "same message again",
        "after": "new useful job"
      },
      {
        "label": "Deadline",
        "before": "when possible",
        "after": "clock + owner"
      }
    ],
    "cta": {
      "heading": "Stop counting reminders",
      "body": "Reply \"CLOCKS\" and I will help you separate first response, next decision and recovery in one lead path. Free, no call.",
      "button": "Reply CLOCKS →"
    }
  },
  "29-organic-traffic-audit": {
    "image": "/newsletters/29-organic-traffic-audit.svg",
    "eyebrow": "Illustrative model",
    "headline": "Search impressions are not visitors. The useful unit is one question, one page, one measured next step.",
    "profileLabel": "The audit",
    "profileHtml": "An <b>illustrative organic-traffic audit</b> for a small service business that publishes regularly but cannot tell whether a page is earning search attention, bringing real visitors, or creating qualified demand.",
    "situation": [
      "A content calendar can look productive while the measurement is empty. A page may receive an impression without a click, a click without a meaningful visit, or a visit without a clear path to the next decision. Treating all three as “traffic” hides the exact problem.",
      "The audit starts by separating the signals. Search Console shows whether Google displayed the page and whether someone clicked. Analytics shows whether a person arrived and engaged. The lead path shows whether the page helped a qualified reader take action. Each tool answers a different question.",
      "This is a model, not a claimed client result. Its value is the order of operations: find the query, inspect the page, repair the mismatch, then measure the next window without turning impressions into a success story."
    ],
    "steps": [
      "Choose one search question and one intended reader. Write the page promise in the same language as the question instead of beginning with a broad topic label.",
      "Pair the query with the page in Search Console. Separate impressions, clicks, click-through rate and average position; do not call an impression a visit.",
      "Check the landing page in analytics. Confirm organic source, user/session, engagement and the next action, then inspect whether the page answers the question before asking for anything.",
      "Make one repair: tighten the title, answer the question earlier, add a relevant internal link, or clarify the CTA. Record the change and compare the next 28-day window with the prior one."
    ],
    "resultsTitle": "The measurement loop",
    "hero": {
      "value": "1 query → 1 page",
      "label": "Follow one search question through visibility, click, visit and qualified next action."
    },
    "metrics": [
      { "value": "01", "label": "Search Console: was the page shown?" },
      { "value": "02", "label": "Search Console: did the searcher click?" },
      { "value": "03", "label": "Analytics: did a real user arrive and engage?" },
      { "value": "04", "label": "Lead path: did the next action become measurable?" }
    ],
    "beforeAfter": [
      { "label": "Topic", "before": "broad idea", "after": "specific question" },
      { "label": "Scoreboard", "before": "impressions = traffic", "after": "users + engagement" },
      { "label": "Improvement", "before": "publish more", "after": "repair one mismatch" }
    ],
    "cta": {
      "heading": "Find the gap in one page",
      "body": "Reply \"AUDIT\" with one page or search question. I will map the visibility, visit and lead signals that should be checked next. Free, no call.",
      "button": "Reply AUDIT →"
    }
  }
};
