> STATUS 2026-08-07: Dormant as a tracker row — merged into Anand Outreach for tracking (user order 2026-08-07); site work + NEEDS-YOU live on that status line. Repo and deploy unchanged: git push vercel main.

---

<!-- Migrated from global Claude memory (project_anand_site.md) on 2026-06-10 -->


# anand-site

**Code:** `~/CODE/anand-site`
**Stack:** Next.js 15.5.18 · React 19 · TypeScript · Tailwind v4 · Framer Motion · GSAP
**Status:** LIVE on Vercel at https://anandiyer.co.in (custom domain via GoDaddy A record 76.76.21.21)
**Domain note (2026-07-11):** `anand.co.in` is a SEPARATE domain — registered (expiry 2027-05-03, Endurance/BigRock) but has ZERO DNS records (no NS/A anywhere); it does not serve this site. If wanted as an alias: point its DNS at Vercel + add to the project. The live domain is anandiyer.co.in only.

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

## ⏳ PENDING — /experience immersive page (ACTIVE, branch `experience-3d`, prod untouched)

Flagship immersive `/experience` page (ref: drop.peachworlds.com, an 8/10 bar). After many iterations this session the DECISION is locked: **go the cinematic route. Hand-coded real-time WebGL is ABANDONED** — it cannot reach the reference bar by hand (user rated the best WebGL attempt 1/10). That ceiling needs PeachWeb (the no-code tool that built the reference) or a specialist 3D studio; in-house, the cinematic-render route is the realistic 7-8/10. See [[feedback_design_fidelity_no_overclaim]].

### THE METHOD (do not lose — this is the agreed workflow)
1. **Prompt the stills first** (Gemini / Imagen): 5 frame-prompts already written in `docs/IMMERSIVE_3D_PROMPTS.md` section C, in the user's photoreal deep-blue + golden-streak aesthetic, one per story beat, streaks lined up across cuts.
2. **Generate the videos** from those stills (Veo 3 / Gemini Flow): Veo prompts in `docs/IMMERSIVE_3D_PROMPTS.md` section A. **Render every clip WITHOUT any text baked in** (text breaks when the video is scrubbed).
3. **Scroll-scrub the clips** as the page backdrop and **add ALL text / CTAs / numbers / logos as code overlays on top** — editable forever, no re-render. This is what makes it maintainable and is why we do NOT bake text into the render.

### Proven scrub engine (the keeper)
`prototypes/scroll-video.html` — **frame-sequence canvas scrub** + editable DOM text overlays. Why frame-sequence not `<video>`: MP4 `currentTime` seeking HANGS in-browser (verified, readyState drops, never completes). Extract frames: `ffmpeg -i clip.mp4 -vf "select=not(mod(n\,2)),scale=1152:-2" -vsync 0 -q:v 5 frames/f_%03d.jpg` (~96 frames, ~5MB); preload images; per scroll draw `imgs[round(progress*(N-1))]` cover-fit to a fixed canvas; text overlays fade in by scroll band. Example built from `public/experience/video/cards-burst.mp4` → `public/experience/video/frames/` (96 frames).

### 7-section narrative (FAQ REMOVED per user)
Hero → Content multiplication (1→100s: carousels/videos/posters/blogs/newsletters) → Distribution (LinkedIn/Instagram/WhatsApp/YouTube/Meta) → Validated leads (ICP, rerankers + AI scoring, NOT cheap lists) → Product gallery (Pulse/GutGuru/Compass/Vita+/AutoEdit) → Clients (Netflix/Adidas/Cadbury/ICICI/Zee…) → Profile + CTA (request an audit). Pull the rest of anandiyer.co.in content in too.

### Assets already prepped (all under `public/experience/`, reuse)
`hdri/studio.hdr`; `textures/*.jpg` (36 work shots @640); `logos/*.png` (8 full-colour tool logos: linkedin/whatsapp/instagram/slack/hubspot/salesforce/zapier/googleanalytics, rasterised via Brave); `world/apps/*.jpg` (25 product gallery); `world/clients/*.png` (15 white client logos); `world/profile.jpg`; `world/posters/*.jpg` (17 reels/cinema); `frames/frame-a|b.png` (Gemini stills); `video/cards-burst.mp4` + `video/frames/` (cinematic clip + scrub sequence).

### Prototypes built (in `prototypes/`)
- `scroll-video.html` — **THE KEEPER** (frame-sequence scrub + editable overlays = the decided engine).
- `vortex-streaks.html` — golden vortex streaks over the Gemini frames (user liked; may inform overlay transitions/blasts).
- `light-world.html` — real-time WebGL orb/world (ABANDONED look, reference only).
- `experience-3d.html` — first cyan-wireframe fly-through (superseded).

### In-app scaffolding (branch `experience-3d`, all UNCOMMITTED-then-committed this session)
`app/experience/page.tsx` + `components/experience/*` currently hold the R3F bubble scene (IntegrationHub/Bubble/Card/Grade) — **to be REPLACED** by the cinematic frame-scrub engine. `next.config.ts` has `transpilePackages` for three/r3f; deps installed (three 0.184, @react-three/fiber 9, drei 10, postprocessing 3) — likely removable if going pure-canvas cinematic.

### Recipes (derive-once)
- WebGL textures DO NOT load over `file://` (Chromium taints them → blank). Serve prototypes over http: `python3 -m http.server 8765` at repo root, open `http://localhost:8765/prototypes/<file>.html` (relative `../public/...` resolves). Next dev server also works.
- Prototypes that init Lenis need `?nolenis=1` so `window.scrollTo` sticks for screenshot capture (Lenis fights programmatic scroll).
- Screenshots via Brave 9666 CDP `Page.captureScreenshot` (browser-harness, `BU_CDP_URL=http://127.0.0.1:9666`).

### ▶ Parked thread (/experience)
User is going to: generate the 5 stills (prompts in `docs/IMMERSIVE_3D_PROMPTS.md` C) → generate videos (Veo prompts, section A) → render all clips WITHOUT text → drop clips into `public/experience/video/`. THEN: build the cinematic `/experience` route = scroll-scrub each clip per section using the `scroll-video.html` frame-sequence engine + editable DOM text/CTA overlays, 7 sections (no FAQ), mobile fallback, wire CTA to the audit form. Replace the R3F bubble scaffolding. Deploy (anand-site is report-only / protected): `gh auth switch --user anandiyerknight && git push vercel main` after approval.

## Next Session Starts Here (/system)

On branch `system-loop`. Built `/system` (the compounding-loop client-explainer) — Anand loved the direction; opened it locally. **Iterate, then decide on promotion.** Concrete next steps:
1. Get Anand's edits: copy/wording, which assets per stage (Data + Outreach lean on diagrams — he may want real CRM/DM/dashboard screenshots, PII-redacted), category ordering, and whether to auto-cycle the loop (slow 01→02→03→04 walk that pauses on hover/click).
2. If he wants to show clients: make the preview shareable — Vercel dashboard → Settings → Deployment Protection (disable Vercel Authentication for previews, or use a protection-bypass token). Currently the preview URL hits a Vercel login wall.
3. When approved: promote `/system` to the homepage hero (reorganise `app/page.tsx` sections) and ship to prod (`gh auth switch --user anandiyerknight && git push vercel main`). Add a nav link.
Standalone HTML prototypes (superseded by the React build) live at `~/CODE/growth-machine-capabilities-mindmap.html` + `~/CODE/automation-loop-visualiser.html`.


---

# REBRAND + ARCHITECTURE CONSOLIDATION (2026-07-11, branch `rebrand-tokens`, NOT yet merged/deployed)

Full token-deepened visual rebrand + component consolidation. **Awaiting Anand's screenshot review before merge to main + `git push vercel main`.**

## What changed (visual)
- **Display font: Clash Display** (Fontshare, ITF Free Font License) — `app/fonts/ClashDisplay-Variable.woff2` via `next/font/local` as `--font-clash`; `.font-display` weight 600. Body stays Geist. Unused Inter load removed.
- **Brand accent: emerald** — `--color-accent: #34d399` / `--color-accent-deep: #22c55e` in `@theme`. Applied at: hero "not" + grad-text (white→emerald), numbered section eyebrows, KPI numbers, active /work filter tab, form focus, btn hovers, ::selection.
- **De-pill sweep**: no `rounded-full` anywhere except genuine circles marked `@allow-circle` (status dots, play button, slider knob, success badges). Buttons = `var(--radius-md)` 6px; chips = 4px; cards = 12–16px (rounded-xl/2xl/3xl REDEFINED in @theme to 12/16/16px).
- **Aurora background deleted**, glass cards replaced with solid `bg-2 + ring` (glass kept for modals/nav only), numbered editorial rhythm (01 Services / 02 Systems / 03 Work / 04 About).
- **Hero typo fixed**: "Strategy.It's" → space now joins every headline word (the joining "space" char in hero.tsx is a non-ASCII space — grep-by-eye won't match ASCII space). Hero video untouched.

## New modules (the seams)
- `components/ui/section.tsx` — `<Section spacing bordered width containerClassName>`: THE wrapper for every page band (owns px/py/rule/container). All main sections migrated.
- `components/ui/section-head.tsx` — `<SectionHead tag index title description layout="default|split|indexed" size right>`: every heading block; layout variants live here.
- `components/ui/page-header.tsx` — secondary-route hero (used by /work, /newsletters).
- `components/ui/lead-form.tsx` — ALL lead capture: `<LeadForm type="audit">` (audit panel) + `useGatedDownload(endpoint)`/`<GateModal>` (gated PDFs, shared `nl_lead` localStorage gate). The 3 previous duplicate implementations are gone; API routes unchanged.
- `lib/motion.ts` — `EASE`/`DUR` constants for Framer Motion; inline easing arrays are gate-banned.
- Deleted orphans: `accordion.tsx`, `portrait-placeholder.tsx`, `music-section.tsx`.

## Mechanical design gate
`scripts/design-gate.mjs` runs before every build (`npm run build` = gate && next build; also `npm run design-gate`). FAILS on: `rounded-full` without same-line-or-2-above `@allow-circle`; raw hex in app/components (allowlist #000/#fff/#0e0e0e); `ease: [` outside lib/motion.ts. `/system` + `/experience` trees excluded until migrated. Legacy grayscale tokens (`--color-cyan/magenta/violet/acid`) survive ONLY as `:root` aliases in globals.css for those WIP trees — delete when migrated.

## Tests
`npm test` (vitest + testing-library + jsdom, `__tests__/`): work.ts data integrity (unique slugs, assets exist, caseStudyIds resolve), LeadForm audit flow (phone validation blocks API, payload carries country code, success state), Section/SectionHead/PageHeader render. 13 assertions. IntersectionObserver stubbed in `__tests__/setup.ts`.

## Verified 2026-07-11
typecheck ✓ · design-gate ✓ · `npm run build` ✓ (all 11 routes incl. /system + /experience) · vitest 13/13 ✓ · Brave screenshots desktop 1440 + mobile 390 ✓ · gate modal opens with correct fields ✓ · /work filters function ✓.

## ▶ Next step
Anand reviews the after_*.png screenshots (session scratchpad) or runs `npm run dev` → approve/veto accent + font → merge `rebrand-tokens` → main → `gh auth switch --user anandiyerknight && git push vercel main` → verify live at anandiyer.co.in.
