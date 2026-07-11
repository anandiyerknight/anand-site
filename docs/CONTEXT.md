

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

### ▶ NEXT SESSION STARTS HERE (/experience)
User is going to: generate the 5 stills (prompts in `docs/IMMERSIVE_3D_PROMPTS.md` C) → generate videos (Veo prompts, section A) → render all clips WITHOUT text → drop clips into `public/experience/video/`. THEN: build the cinematic `/experience` route = scroll-scrub each clip per section using the `scroll-video.html` frame-sequence engine + editable DOM text/CTA overlays, 7 sections (no FAQ), mobile fallback, wire CTA to the audit form. Replace the R3F bubble scaffolding. Deploy (anand-site is report-only / protected): `gh auth switch --user anandiyerknight && git push vercel main` after approval.

## Next Session Starts Here (/system)

On branch `system-loop`. Built `/system` (the compounding-loop client-explainer) — Anand loved the direction; opened it locally. **Iterate, then decide on promotion.** Concrete next steps:
1. Get Anand's edits: copy/wording, which assets per stage (Data + Outreach lean on diagrams — he may want real CRM/DM/dashboard screenshots, PII-redacted), category ordering, and whether to auto-cycle the loop (slow 01→02→03→04 walk that pauses on hover/click).
2. If he wants to show clients: make the preview shareable — Vercel dashboard → Settings → Deployment Protection (disable Vercel Authentication for previews, or use a protection-bypass token). Currently the preview URL hits a Vercel login wall.
3. When approved: promote `/system` to the homepage hero (reorganise `app/page.tsx` sections) and ship to prod (`gh auth switch --user anandiyerknight && git push vercel main`). Add a nav link.
Standalone HTML prototypes (superseded by the React build) live at `~/CODE/growth-machine-capabilities-mindmap.html` + `~/CODE/automation-loop-visualiser.html`.

## ⏳ PENDING — video-glass-hero concept (cinematic scrub landing page) — ACTIVE, NEEDS IMPROVEMENT (2026-06-24)

Standalone HTML concept built this session from 3 Gemini/Veo clips the user supplied (golden funnel-spheres + crystal-cards-burst). Lives at `~/CODE/anand-site/concepts/video-glass-hero/` (untracked; anand-site is report-only). **Status: the user likes the direction but says it still needs work — he will specify WHAT'S LEFT next session. Do not assume; wait for his list before changing things.**

- **LIVE (2026-06-26):** deployed as its own static Vercel project `anand-experience` (team `iyeranand91-3093`) → **https://anand-experience.vercel.app** (public, no auth wall; root serves the scroll-glass deliverable). User chose to keep the `.vercel.app` subdomain (declined a custom `*.anandiyer.co.in`). Redeploy: stage a copy with `scroll-glass.html`→`index.html` + `assets/` (drop the unreferenced `.mp4`s, ~23M), then `vercel deploy --prod --yes` from that dir. Vercel manages anandiyer.co.in DNS, so a custom subdomain is a 1-command add later if wanted.
- **SECOND VERSION (2026-06-26) = `scroll-site.html`** — same cinematic film + glass engine, but mapped to the REAL anandiyer.co.in content/flow/copy (built after the user said the snap version's CONTENT scene "doesn't read well, cluttered, wasted desktop negative space, missing my content"). Fix: darker near-uniform scrim so the film is ambient backdrop not a competing image; structured full-width glass (editorial 2-col heads, 3-col product cards). REV2 (2026-06-26, user feedback "scrolls should lock on touch, sections must fit, services cards too long — make one card not 6"): re-added `scroll-snap-type:y mandatory` + `scroll-snap-stop:always`, every `section` = a snap scene sized `min-height:100svh` flex-centered (short sections fill the screen, tall ones grow + snap to top, never clip); compacted every section to fit one viewport; SERVICES collapsed from flagship+5-card bento into ONE glass card (flagship outreach-machine box + 5 capabilities as a compact numbered 2-col list); brands is a purposeful centered "15+ years. Names you know." scene; work = films+reels in 2 columns one screen. Section dots on the right; mobile (<680) sections go height:auto so touch still snaps to section starts. Real sections in order: Hero ("Automation is not a Strategy. It's an Infrastructure.") → Services (flagship outreach machine + 5 cards) → What I've Built (6 products w/ KPIs: Pulse/AutoEdit/Compass/GutGuru/LinkedIn Harness/Vita+) → Brands marquee (14 clients) → Film & Performance (4 cinema + 4 reels) → About (cutout + 8 credentials) → Skills (7 categories) → Reviews (6) → FAQ (3) → Apply form. Copy pulled verbatim from `components/{hero,features/ServicesSection,apps-showcase,brand-wall,methodology,audit-form,tech-skills,testimonial,faq,cinema-section}.tsx`. Verified desktop+mobile via Brave 9666 screenshots. Self-contained on the same `assets/`. NOT yet deployed (review locally: `python3 -m http.server` in the dir → `/scroll-site.html`).
- **THE (first) deliverable = `scroll-glass.html`** (the 7-scene snap version). `index.html` = an earlier still-background version, superseded. (Also `assets/`: `frames-cards/` + `frames-funnel/` = 96 de-logo'd JPGs each = the scrub film; `stills/` = de-logo'd section stills; `logos/` 8 platform PNGs; `clients/` 15 brand PNGs; `work/` curated portfolio; `anand-cutout.png` = bg-removed feathered portrait; the 2 source `.mp4`s.)
- **What it is now:** frame-sequence canvas scrub (the proven `prototypes/scroll-video.html` engine) as a FIXED backdrop, scrubbed by scroll; 7 full-height **scroll-snap** scenes (`scroll-snap-type:y mandatory` + `scroll-snap-stop:always`) so one scroll = one complete scene (film scrubs to that beat, glass content flies in, settles). Film order = cards (floating phone → burst) then funnel (spheres → swirl → WhatsApp burst), so hero=floating phone, contact=WhatsApp burst. Scenes: Hero · Apps & Websites · Content · Films · Brands(glass logo tiles) · About(feathered cutout + bio) · Contact(form). Smoked Apple-glass (opaque-tinted; contact card `.strong`). Floating WhatsApp button bottom-right (where the Gemini watermark was) → `wa.me/919833764750`, reveals +91 98337 64750 on hover.
- **Verified this session (Brave 9666 screenshots):** scrub advances frame 0→191 across the 7 snap scenes; every scene's content reveals; logos in glass tiles; mobile stacks.
- **Known nitpicks / likely improvement areas (user to confirm priority):** hero glass card covers the floating phone (offer to offset it left so the phone shows); a few thin client logos (Zee5, Nick) render faint even on glass; bio copy + "trusted by" brand claims are drafts pulled from existing `public/experience` assets — user must confirm he can claim those brands publicly; form has no backend (concept JS confirm only — wire to `/api/audit` if promoting); self-contained = "1 HTML + assets folder" + Google Fonts CDN (NOT a single base64 file — user asked about this, decision deferred); 9:16/portrait optimisation was raised then deferred.

### ▶ NEXT SESSION STARTS HERE (video-glass-hero)
**State as of 2026-06-26 GN:** TWO versions live-deployable from the concept; the CONTENT version `scroll-site.html` is the one currently LIVE at **https://anand-experience.vercel.app** (own Vercel static project `anand-experience`, team `iyeranand91-3093`, linked via the staged dir's `.vercel/`). Redeploy after edits: `cp scroll-site.html <staged>/index.html` then `vercel deploy --prod --yes` from the staged dir (drop `.mp4`s, ~23M). User chose `.vercel.app` (declined a custom subdomain; Vercel owns anandiyer.co.in DNS so a subdomain is a 1-command add later). This session's deltas on `scroll-site.html`: built from the REAL site copy/flow → then user feedback → snap-lock (`scroll-snap mandatory` + `scroll-snap-stop:always`, each section a 100svh snap scene) + every section compacted to fit one screen + SERVICES collapsed to ONE card. Verified desktop+mobile via Brave 9666. **WAIT for the user's next list of tweaks.** The 7-scene `scroll-glass.html` (floating-phone hero) is the archived first version. Earlier candidate tweaks still open if he wants: faint thin client logos (Zee5/Nick), confirm brand claims, wire the form to `/api/audit` if promoting, true single-file build. Eventual home: play-on-scroll cousin of the locked `/experience` cinematic route — fold in or keep standalone (undecided). Candidate items already on the table (above): offset hero card to reveal the phone, fix faint brand logos, confirm/adjust bio + brand claims, true single-file build + offline fonts, 9:16 optimisation, wire the form. Eventual home: this is the play-on-scroll cousin of the locked `/experience` cinematic route — decide whether to fold it in or keep standalone.

### METHOD-derived recipes (this session — reusable, do not re-derive)
- [2026-06-24] [anand-site/concept] **Background-remove a portrait (rembg) on this box** → `~/.local/bin/uv run --python 3.9 --with rembg --with onnxruntime --with pillow --with numpy python script.py`; in script `from rembg import remove, new_session; remove(img, session=new_session("u2net_human_seg"))` then feather: `alpha.filter(ImageFilter.GaussianBlur(2.6))` + multiply a bottom vertical-gradient mask to melt the torso to transparent; crop to `getbbox()`. AVOID: `uv tool install rembg` (resolves ancient 2.0.76 → numba 0.53/llvmlite, caps Python <3.10, fails on 3.12/3.14); AVOID forgetting `--with onnxruntime` (rembg doesn't pull it → `ModuleNotFoundError`). System Python here = 3.14 (no PIL/rembg). Model u2net_human_seg ≈176MB downloads on first run.
- [2026-06-24] [anand-site/concept] **Remove a baked watermark from video frames** → `ffmpeg -vf "select=not(mod(n\,2)),scale=1280:-2,delogo=x=1108:y=556:w=142:h=152"` — delogo MUST come AFTER scale (coords are in the SCALED frame; running delogo before scale uses 1920px-frame geometry and wipes the wrong region). The Gemini sparkle on these 1280×720 clips sits at ~x1108–1250 / y556–708. AVOID: delogo before scale.
- [2026-06-24] [anand-site/concept] **Scroll-snap + frame-scrub together** → `html{scroll-snap-type:y mandatory}` + each scene `height:100svh;scroll-snap-align:start;scroll-snap-stop:always`; fixed `<canvas>` film scrubbed by `scrollY/(scrollHeight-innerHeight)` (rAF lerp 0.16); IntersectionObserver(threshold .55) toggles `.active` per scene to fly content in. Gives "scroll → scene animates → settle → scroll → next" without mid-fade limbo. Keep portfolio grids `max-width`-capped so 2 rows + heading fit one 100svh scene (else mandatory-snap clips the overflow).

# /agent — Executive Agent + Second Brain landing page (added 2026-07-11)

Pitch page for the hoopr decision-maker list (200cr+ owners/CMOs): a personal AI **Agent** + **Context Harness** (second brain), pillars = Content Brain / Marketing Systems / Analysis Systems. Distribution via WhatsApp; replies come to +91 98337 64750 (floating button on page).

- **Master file:** `concepts/video-glass-hero/scroll-glass-enterprise.html` (relative asset paths, previewable via file://). Clean-glass variant of `scroll-glass.html`: same gold/glass design system but NO video/canvas film — CSS radial gold-glow ambience instead (user directive: clean, no video backgrounds). 7 snap scenes: Hero / Systems pillars / Context Harness / Proof ("I run my own life on this") / Brands / About / Contact.
- **Deployed copy:** `public/agent/index.html` (asset paths rewritten to `/agent/assets/...`) + `public/agent/assets/` (10 client logos + anand-cutout, 332KB total, no frames). Served at **/agent** via a rewrite added to `next.config.ts` (`/agent` → `/agent/index.html`) because public files otherwise only serve at exact paths.
- **Form wiring:** posts JSON to the existing **`/api/audit`** (same-origin) → `lib/sheets.ts` → zingaboink Apps Script → the standard leads sheet (`1jfiqOffP6q5nsgV19JvvDk7cect-vyfWSZg67KCLB8I`) + email to zingaboink@gmail.com. Payload: `{name, email, company:'Agent page lead', social:'', phone:'', brief:'AGENT PAGE: <msg>'}` — filter sheet rows by the AGENT PAGE prefix. NO new sheet/script was created (clasp here is authed as gsharp.media, not zingaboink — reuse this webhook for anything Anand-Iyer-brand).
- **Verified 2026-07-11:** copy-gate PASS (no dashes/AI-tells); desktop 7-scene screenshots + mobile 390px (page is WhatsApp-distributed = mobile-first); form E2E on `next dev`: real page submit → /api/audit 200 → success note + reset (sheet row itself not eyeballed locally — no zingaboink session in Brave; confirm first prod submission via the notification email). One TEST row may exist: "TEST Claude E2E / AGENT PAGE TEST ROW".
- **Capture recipe reminder:** scene screenshots of snap+fly pages need the force-reveal style injection (`.js .fly{opacity:1!important;...}`) — programmatic scrolling races the IntersectionObserver; a plain fresh load DOES reveal correctly for real users (verified).
