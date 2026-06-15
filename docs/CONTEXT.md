

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
