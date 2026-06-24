

---

<!-- Migrated from global Claude memory (project_anand_site.md) on 2026-06-10 -->


# anand-site

**Code:** `~/CODE/anand-site`
**Stack:** Next.js 15.5.18 · React 19 · TypeScript · Tailwind v4 · Framer Motion · GSAP
**Status:** LIVE on Vercel at https://anandiyer.co.in (custom domain via GoDaddy A record 76.76.21.21)

## Git Remotes — IMPORTANT

Two remotes exist:
- `origin` → `gutguruswetha-ai/Anand-Website` (secondary, NOT connected to Vercel)
- `vercel` → `anandiyerknight/anand-site` (**Vercel-connected — push here to deploy**)

**To deploy:** `gh auth switch --user anandiyerknight` then `git push vercel main`

## Page structure

`app/page.tsx` section order: Nav → Hero → AppsShowcase → BrandWall → Methodology → AuditForm → Collapsible (Film/Performance/Skills/Reviews/FAQ) → Footer

All component files: `~/CODE/anand-site/components/`
Public assets: `~/CODE/anand-site/public/` (images/apps/, before-after/, content/, reels/, posters/, logos/)

## Positioning (as of 2026-05-30)

**Title:** AI Systems Builder · Context & Automation Architect · Brand Technologist

## Form — Google Sheets Integration

Audit form (`components/audit-form.tsx`) → `/api/audit` → `lib/sheets.ts` → Apps Script webhook.
Fields: name, email, phone, social, company, brief.

### NEW setup (2026-06-04) — zingaboink@gmail.com account

- **Sheet:** https://docs.google.com/spreadsheets/d/1jfiqOffP6q5nsgV19JvvDk7cect-vyfWSZg67KCLB8I
- **Headers:** Timestamp | Name | Email | Company | Social | Phone | Brief (A–G)
- **Apps Script URL:** `https://script.google.com/macros/s/AKfycby60p-Juk7P1cxbTskXJn1woXxV0YgYj5ZaE9VRRxsCwAVDfHQ3_Fa6rU5tIJpeZ-Z9/exec`
- **Email notification:** fires to zingaboink@gmail.com on every submission
- **`GOOGLE_SCRIPT_URL`:** Set in Vercel production ✓ (updated 2026-06-04)
- **Status:** BLOCKED until `setup` function is run manually in Apps Script to grant permissions
- **Next step to unblock:** Apps Script editor → select `setup` from dropdown → Run → Allow

### lib/sheets.ts phone fix (commit 1b7454d)
Phone `+91 XXXXXXXXXX` was causing `#ERROR!` in Google Sheets (USER_ENTERED interprets `+` as formula).
Fixed: `data.phone.replace(/^\+(\d+)\s/, "($1) ")` → sends `(91) XXXXXXXXXX` instead.

## Uncommitted local changes (not committed or pushed)

- `app/page.tsx` — `autoOpen` on "Film & Cinema Work" and "Performance Marketing" collapsible sections
- `components/nav.tsx` — CTA: "Apply" → "Request an Audit"

## App screenshots

`/public/images/apps/` — 16 files: pulse × 4, gutguru × 4, compass × 4, autoedit × 4

## Stack loop videos

`/public/content/stack-content.mp4`, `stack-saas.mp4`, `stack-funnels.mp4` (only 3 exist — Layer 04 reuses saas)

## CV files (Desktop)

- `/Users/anandiyer/Desktop/Anand_Iyer_CV_2026_Updated.md`
- `/Users/anandiyer/Desktop/Anand_Iyer_CV_2026.pdf`
- `/Users/anandiyer/Desktop/cv_anand.html`


---

<!-- Migrated from global Claude memory (project_anand_site_pending.md) on 2026-06-10 -->


# anand-site — Status (2026-06-04) ✅ ALL DONE

## ✅ COMPLETE — Apps Script authorized + redeployed
- Old URL (stale, never authorized): `AKfycby60p-Juk7P1cxbTskXJn1woXxV0YgYj5ZaE9VRRxsCwAVDfHQ3_Fa6rU5tIJpeZ-Z9/exec`
- **New URL (live, authorized):** `https://script.google.com/macros/s/AKfycbwBDemDP2TE5qI5wvKZOA4iJPMb608gxQ-2D_P6N-ZD65oDQArBgq6RiBLfIrznwY8iEA/exec`
- Vercel env `GOOGLE_SCRIPT_URL` updated and redeployed to production

## ✅ COMPLETE — E2E verified 2026-06-04
- curl POST to https://anandiyer.co.in/api/audit → `{"ok":true}`
- Row written to sheet: Timestamp, Test, test@example.com, Co, @h, (91) 9999999999, E2E test
- Email delivery to zingaboink@gmail.com: not verified (trust the MailApp.sendEmail in script)

## ✅ COMPLETE — Local changes committed + pushed
- `app/page.tsx` — autoOpen on "Film & Cinema Work" + "Performance Marketing" collapsibles
- `components/nav.tsx` — CTA: "Apply" → "Request an Audit"
- Pushed to `vercel` remote (anandiyerknight/anand-site)

## Assets
- **Sheet:** https://docs.google.com/spreadsheets/d/1jfiqOffP6q5nsgV19JvvDk7cect-vyfWSZg67KCLB8I
- **Script project:** https://script.google.com/u/0/home/projects/1gUFU0H1xgy2bSR1smugCCGNa1yLdVTw5kID7tjs8gPI25ZRi5l-XHSXb/edit
- **Notification email:** zingaboink@gmail.com
- **GOOGLE_SCRIPT_URL in Vercel:** ✅ set and verified working

---

# Newsletters section (added 2026-06-15)

**Live:** https://anandiyer.co.in/newsletters — gated free downloads of the 20-issue automation case-study series.

- **Route:** `app/newsletters/page.tsx` (static) → renders `components/newsletter-library.tsx` (client).
- **Data:** `lib/newsletters.ts` (20 issues: num, slug, title, blurb).
- **Assets:** `public/newsletters/<slug>.pdf` + `<slug>.png` (hero thumbnail). Source PDFs live in `~/CODE/gmail/newsletters/<slug>/case-study.pdf`; re-copy after regenerating.
- **Lead wall:** first download opens a form (name + email + optional company) → `POST /api/newsletter` → captured BOTH via `addBriefToSheet` (same Google Sheet as the audit form, Brief = "Newsletter download: Issue NN — Title") AND `sendBriefNotification` (email to zingaboink@gmail.com). After first submit, localStorage `nl_lead` skips the form but still logs each download. Slug is validated against `newsletterIssues` (path-traversal returns 400).
- **Nav:** "Newsletters" link added to `components/nav.tsx` (hash links changed to `/#...` so they work from non-home routes).

# Work showcase (added 2026-06-20)

**Live:** https://anandiyer.co.in/work — public portfolio grid + a teaser on the home page. Plus the `/addwork` skill that adds new work in one command.

- **Data (single source of truth):** `lib/work.ts` — `WorkItem[]` with a discriminated `type`: `landing-page` (cover screenshot + `liveUrl`), `carousel` (`gallery[]` → lightbox), `guide` (`pdf`, gated download), `case-study` (`caseStudyId` → reuses `lib/case-studies.ts`). Helper `hasCaseStudy()`. Each item owns `public/work/<slug>/` (cover.png / 01.png… / *.pdf).
- **Pages/components:** `app/work/page.tsx` (static) → `components/work-showcase.tsx` (client: filter tabs, per-type cards, gated-download form reusing the `nl_lead` localStorage + lead modal, case-study modal). Carousel lightbox = `components/work-lightbox.tsx`. Home teaser = `components/work-grid.tsx` (renders `featured` items into `<section id="work-grid">`, fills the nav's pre-existing dead `/#work-grid` anchor; wired into `app/page.tsx` after `AppsShowcase`).
- **Gated guide downloads:** `POST /api/work-download` mirrors `/api/newsletter` — validates slug against `workItems` (type `guide`), `addBriefToSheet` (Brief = "Work download: <title>") + `sendBriefNotification`. No new backend/env needed.
- **Reused orphan:** `lib/case-studies.ts` + `components/case-studies.tsx` existed but rendered nowhere — `/work` now surfaces them (GutGuru/Kvarski via `caseStudyId` on their cards, Ecole as a standalone case-study card).
- **Seeded (current):** 4 landing pages (Vita+, GutGuru, Bihari Swad, Kvarski-dashboard) + 1 Ecole case study. The carousel + guide types are still fully supported by the system but none are seeded (user removed the B2B carousels and GutGuru guide PDFs 2026-06-20 — too monochrome / not wanted on the page). Re-add curated ones anytime via `/addwork`.
- **Card styling (2026-06-20):** cards are solid `bg-[var(--color-bg-2)]` with a subtle `ring-1 ring-[var(--color-rule)]` (NO `.glass` — its unlayered `rgba(255,255,255,.1)` border beat the Tailwind border util and showed as visible white edges; NO brandColor top-border hairline either). Filter tabs are derived from the types present in `workItems`.
- **Adding work:** run **`/addwork`** (`~/.claude/skills/addwork/SKILL.md`) — screenshots the live page via Brave 9666, copies assets, appends to `lib/work.ts`, builds, stops before deploy. No component edits needed; the grid `.map()`s the data.

## METHOD-derived recipes index (migrated from global METHOD.md, 2026-06-19)

Moved out of the always-on `~/.claude/METHOD.md` so it only loads with this project (retrievable via context-harness `hybrid_search`).

- [2026-06-15] [anand-site] **Gated PDF download** → /newsletters page + `POST /api/newsletter` reuses `addBriefToSheet` (same sheet, Brief="Newsletter download: ...") + `sendBriefNotification`. Deploy: `gh auth switch --user anandiyerknight && git push vercel main`. Verify live by byte-matching the PDF size.
- [2026-06-20] [anand-site] **Work/portfolio showcase + /addwork skill** → `/work` page is data-driven from `lib/work.ts` (4 types: landing-page/carousel/guide/case-study), assets in `public/work/<slug>/`, home teaser `components/work-grid.tsx` fills the nav's dead `/#work-grid` anchor. Gated guides reuse `POST /api/work-download` (mirrors /api/newsletter). LP covers = Brave 9666 CDP `Page.captureScreenshot` viewport shot (1440×810 @2x, 7s settle) — top-of-page hero, NO captureBeyondViewport (avoids scroll-reveal-blank). New work added via the `/addwork` skill. Deploy: `gh auth switch --user anandiyerknight && git push vercel main`.
- [2026-06-20] [anand-site] **/system "compounding loop" experience** → new route `app/system/page.tsx` (Nav + `components/system/SystemExperience` + Footer). Data-driven from `lib/system.ts` (`STAGES: SystemStage[]` — 4 stages: data/content/outreach/conversion; each has `howWeDoIt[]`, `howItWorks[]` (GENERIC names only, NO tool names — "WhatsApp" not the tool), `categories[]` → `assets[]` with `kind: carousel|image|pdf|site|diagram`). Three levels: `StageLoop.tsx` (loop hero — 4 cards + measured-SVG forward connectors + feedback arc + animated flow; recomputes via ResizeObserver; mobile <780 stacks with ↓ chevrons + a loop-back pill, svg hidden) → `StagePanel.tsx` (How we do it / How it works / category accordion) → `AssetLightbox.tsx` (plain `<img>` so it handles png/jpg/svg; carousel/image/diagram open lightbox, pdf/site are `<a target=_blank>`). Loop CSS (`@keyframes sysflow`, `.sys-wire-base/.sys-wire-flow`) appended to `app/globals.css`. Assets in `public/system/<stage>/<category>/` — real WORK carousels/posters/case-study-PDFs (thumbs via `pdftoppm -png -singlefile -scale-to 1000`), 3 live LP screenshots (Brave 9666 crisp-thumbnail recipe), + 4 hand-written monochrome SVG diagrams for the data/outreach/tracking gaps. Verified: `npm run typecheck` + `npm run build` clean (/system static, 7KB). NOT linked from the homepage nav yet; prod untouched. Branch `system-loop` (pushed to origin). Preview deployed via `vercel deploy --yes` (non-prod, `target:null`) but gated by Vercel Deployment Protection (401 to anyone not logged into Vercel) — review LOCALLY at `localhost:3000/system`.

## Next Session Starts Here (/system)

On branch `system-loop`. Built `/system` (the compounding-loop client-explainer) — Anand loved the direction; opened it locally. **Iterate, then decide on promotion.** Concrete next steps:
1. Get Anand's edits: copy/wording, which assets per stage (Data + Outreach lean on diagrams — he may want real CRM/DM/dashboard screenshots, PII-redacted), category ordering, and whether to auto-cycle the loop (slow 01→02→03→04 walk that pauses on hover/click).
2. If he wants to show clients: make the preview shareable — Vercel dashboard → Settings → Deployment Protection (disable Vercel Authentication for previews, or use a protection-bypass token). Currently the preview URL hits a Vercel login wall.
3. When approved: promote `/system` to the homepage hero (reorganise `app/page.tsx` sections) and ship to prod (`gh auth switch --user anandiyerknight && git push vercel main`). Add a nav link.
Standalone HTML prototypes (superseded by the React build) live at `~/CODE/growth-machine-capabilities-mindmap.html` + `~/CODE/automation-loop-visualiser.html`.
