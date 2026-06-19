# anandiyer.co.in — "Live Build for Founders" Service GTM Spec

> Status: spec only. Not executed. Scraping, campaign creation, and outreach are deferred to a separate go-ahead.

## Context

Anand built a premium brand landing page (Bihari Swad) **live, in front of a client**, and won attention instantly. The goal is to **productize that "live build" as a service wedge**: open with a free live build to win trust, then hand the prospect a broader phased spec that initiates a high-LTV, multi-phase engagement. Sold under Anand's existing personal brand (**anandiyer.co.in**) and run through his **existing Gmail + LinkedIn outreach pipeline** — plug a new campaign in, do not rebuild.

**v1 scope:** define the ICP, scrape + enrich leads, run **Gmail + LinkedIn** outreach with the live-build hook, converting through the existing `#audit` brief form. **Out of scope for v1 (Phase 2):** Instagram, WhatsApp, a dedicated site page, a Cal.com booking link.

### Decisions locked
| Decision | Choice |
|---|---|
| Offer model | Free live demo → paid phases (live build = the free wedge) |
| Primary ICP | Premium D2C / consumer-brand founders, India metros |
| Brand | anandiyer.co.in (Anand personal) |
| Geo / currency | India metros / INR |
| Booking / conversion | Reuse existing `#audit` brief form (Google Sheet), reply within 48h |
| Site | No changes in v1 |
| Instagram / WhatsApp | Skip in v1 (Phase 2) |

### Proof asset
Bihari Swad live build: **https://bihari-swad.vercel.app** (built live; the case study for the whole ladder).

---

## 1. The Offer

**Positioning (one line):** "I'll build your brand's landing page live, on a call, for free. No deck, no agency lag, no three-week wait. You watch it happen."

**Why it works for premium D2C founders:** they are brand-obsessed, allergic to generic templates, and frustrated by slow agencies. A live build proves craft + speed in 60-90 minutes and de-risks the bigger spend.

**The wedge → LTV ladder (INR placeholders, confirm):**
| Phase | What | Price |
|---|---|---|
| P0 — Free Live Build | 60-90 min live session: build a real premium LP / brand section in front of them. Free. Goal: trust + scope the broader build. | ₹0 |
| P1 — Brand Launch Sprint | Full premium LP + brand system + basic funnel (the Bihari Swad build). | ₹75k-1.5L |
| P2 — Funnel & Automation | Meta Pixel/CAPI, payments, WhatsApp/ManyChat, lead capture, CRM. | ₹1-2L |
| P3 — Growth Retainer | Ads + content engine + iteration. | ₹50k-1L/mo |

Each phase maps 1:1 to what Anand already built for Bihari Swad (LP → tracking → automation → ads), so one case study proves the entire ladder. The "broader spec" handed to the prospect after the live build = P1-P3 scoped to their brand.

---

## 2. ICP Definition

- **Who:** Founder / Co-founder / Creative-Director-Founder / CEO of a **premium D2C consumer brand**.
- **Verticals:** premium food & F&B, beauty/skincare, wellness/supplements, fashion/apparel, jewelry & accessories, home & decor, craft beverages, gifting.
- **Stage:** pre-launch to growth (bootstrapped-premium or seed/pre-Series-A). Brand-led, premium positioning.
- **Metros:** Mumbai, Delhi NCR, Bengaluru, Pune, Hyderabad, Chennai, Ahmedabad, Jaipur, Kolkata.
- **Signals (high-fit):** "premium / handcrafted / artisanal / luxury" in brand language; recent launch or funding; strong Instagram aesthetic; founder active on LinkedIn; weak or template current website (clear opportunity).
- **HNI angle:** founders who are themselves affluent or run well-funded premium brands — can pay and value craft.
- **Disqualifiers:** agencies, freelancers, dropshippers, mass-market low-margin, large corporates, pre-idea tinkerers.

---

## 3. Lead Sourcing (scrape + enrich)

Reuse existing scrapers; retarget queries to the ICP. Two tracks:

- **LinkedIn discovery** — linkedin-system's built-in scraper with ICP search queries per metro: `"{metro} founder D2C"`, `"{metro} founder premium brand"`, `"{metro} co-founder skincare|beauty|jewelry|F&B"`. Outputs to its `leads` table.
- **Email discovery** — Apify (`~/CODE/gmail/outreach/apify_scraper.py`, top up credits) + `~/CODE/Lead AQUISTION/tools/global_luxury_contact_collector.py` retargeted to premium D2C brand sites (`"premium D2C brand {metro}"`, vertical + city), then `company_first_enrichment.py` to pull founder email from about/contact pages.
- **Normalize → load:** map to `email_contacts` in `~/CODE/gmail` (`cli.py import-contacts`, tag `segment="d2c_founder"`, `persona`, `industry`, `content_angle`), and import LinkedIn leads via `linkedin-system cli.py import_csv --campaign_id`. Verify emails before sending.

---

## 4. Gmail Campaign (new — `~/CODE/gmail`)

Add a campaign mirroring `create_default_founder_campaign` in `outreach/sequences.py`, using `core/db.py` `Campaign` + `SequenceStep`:
- **Name:** "Live Build for Founders"; **audience:** premium D2C founders, India metros; **offer_url:** `https://anandiyer.co.in`.
- **From:** `anand@anandiyer.co.in` (Resend), cap ~50/day split with existing sequences.
- **5-touch sequence** (copy in §7). Flow: `import-contacts` → `mark-ready-from-scraping` → `enroll-ready --campaign <id>` → `send-due-sequence --send` (daily via launchd).
- Keep the existing "AI Revenue Audit" campaign separate; this runs alongside on the `d2c_founder` segment.

---

## 5. LinkedIn Campaign (new — `~/CODE/linkedin-system`)

Create via `POST /campaigns` (`api/routes/campaigns.py`) with ICP JSON:
```json
{ "name": "Live Build — Premium D2C Founders (India)",
  "icp": { "titles": ["Founder","Co-founder","Creative Director","CEO"],
    "company_types": ["D2C","Consumer Brand","Beauty","Skincare","F&B","Jewelry","Fashion","Home & Decor"],
    "geographies": ["Mumbai","Delhi NCR","Bengaluru","Pune","Hyderabad","Chennai","Ahmedabad","Jaipur","Kolkata"],
    "disqualifiers": ["agency","freelancer","recruiter","dropshipper"],
    "definition": "Founders of premium D2C consumer brands in Indian metros who want a high-craft brand + funnel built fast." } }
```
Then: scrape/import → `cli.py qualify <id>` (Gemini scoring + personalized notes via `outreach/personalizer.py`) → CR via `outreach/browser_cr_script.py` (account "Anand Iyer", **15 CR/day**). DM after accept via the Phase-2 path (`outreach/dm_browser_sender.py`), copy in §7.

---

## 6. Conversion & Tracking

- **CTA in all outreach:** "Want me to build yours live, free? Reply and I'll send a slot" → prospect replies or fills the existing **`#audit` brief form** on anandiyer.co.in (`components/audit-form.tsx` → `/api/audit` → `lib/sheets.ts` → the existing Google Sheet, notify `zingaboink@gmail.com`).
- **Funnel:** outreach → reply / brief → book the free live build → live build (P0) → hand broader spec (P1-P3) → close phase.
- **Dedup/CRM:** inbound lands in the existing anand-site Google Sheet; outreach state lives in the gmail + linkedin DBs. Tag source so live-build leads are distinguishable from existing audit leads.

---

## 7. Messaging (no em dashes)

**Email (5 touches), subjects + angle:**
1. *"I built a premium brand page live in 90 minutes"* — open with the live-build offer, link the Bihari Swad demo, ask if they want theirs.
2. *"No agency lag"* — why live beats a 3-week agency cycle; you see exactly what you get.
3. *"What I'd build for {company}"* — one specific idea for their brand + the proof (LP + preorder + tracking, all built live).
4. Objection handler ("you already have a site"): the live build is a teardown + rebuild, free.
5. Close the loop, keep the door open.

**LinkedIn connection note (<280 chars):** reference one specific signal from their brand, no "I" opener, hint at the free live build.

**LinkedIn DM (after accept):** acknowledge their brand → name the gap (slow/template site, no funnel) → offer the free live build with the Bihari Swad proof link → ask for a slot.

---

## 8. Targets / Cadence / Gates (proposed)

- **Volume:** email ramp to ~50/day on the `d2c_founder` segment; LinkedIn 15 CR/day + DMs on accepts.
- **Weekly:** ~250 emails + ~75 CRs; track reply rate, CR-accept rate, **live-build calls booked**.
- **Gate (30 days):** e.g. ≥8 live-build calls booked and ≥2 P1 proposals out = the wedge works; then scale + add Phase 2 channels.

---

## 9. Phase 2 (after the wedge is validated)

Instagram (proof content + DM outreach), WhatsApp/ManyChat (inbound qualify + book), a dedicated "Live Build for Founders" page + Bihari Swad case study on anandiyer.co.in, a Cal.com booking link, and a paid Live-Build Sprint tier.

---

## 10. Execution Sequence (separate go-ahead)

1. Write `services/LIVE_BUILD_ICP.md` + `services/LIVE_BUILD_OFFER.md` (offer + ladder + messaging).
2. Scrape + enrich both tracks; verify; load into gmail + linkedin DBs tagged `d2c_founder`.
3. Create the Gmail campaign + 5-touch sequence; enroll; start daily send.
4. Create the LinkedIn campaign + ICP; qualify; start CR/DM.
5. Confirm the `#audit` brief form still writes to the sheet; tag live-build source.
6. Weekly readout against the gate.

## 11. Verification

- **Scrape:** spot-check 10 rows per track for valid founder + email + correct metro/vertical tag.
- **Email:** seed a test send to your own inbox; confirm SPF/DKIM pass, unsubscribe works, sequence advances.
- **LinkedIn:** dry-run one CR + verify on the sent-invitations page before bulk; confirm note quality on 5 leads.
- **Conversion:** submit a test brief on anandiyer.co.in, confirm the row lands in the Google Sheet.
- **Proof:** confirm https://bihari-swad.vercel.app is live (the demo link in every message).
