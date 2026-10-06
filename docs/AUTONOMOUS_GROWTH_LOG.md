# Autonomous website growth log

## 2026-10-05 — issue 27

- Inspected: live `robots.txt`, `sitemap.xml`, homepage, issue 26, the production GA4 tag, the clean production build, and the generated issue route.
- Changed: published `/newsletters/27-lead-leakage-audit`, a complete public page focused on the search intent of finding lead leakage. Added an illustrative four-checkpoint model, internal links, Article and BreadcrumbList structured data through the existing route, canonical metadata, and sitemap inclusion.
- Verification: `npm run typecheck` passed; `npm run build` passed; local route returned 200; production route returned 200 after deploy; canonical, page copy, CTA, sitemap entry, and `G-XRVBT62JHN` were verified in live HTML. Production commit: `0d106a8`.
- Lead-generation rationale: the page gives prospects a concrete diagnostic (source, evidence, owner, recovery) and links directly to the audit CTA instead of gating the explanation behind a download.
- Analytics: organic views/page views, organic sessions/users, bounce rate, average engagement time, leads, conversion rate, Search Console queries, impressions, clicks, CTR, positions, and indexing report are **not available — analytics source not configured** for this run. GA4 tag presence is verified, but a readable reporting connection was not available to the automation.
- Next experiment: use first-party query/page data when the reporting connection becomes available to sharpen titles and internal-link anchors around the highest-impression lead-operations queries.

## 2026-10-06 — issue 28

- Inspected: yesterday's production issue, live `robots.txt`, `sitemap.xml`, issue 27, the clean production build, and the new issue's metadata and route.
- Changed: published `/newsletters/28-follow-up-sla`, a complete public page explaining a three-clock follow-up SLA: first response, next decision, and recovery. Added a practical diagnostic, failure modes, internal navigation, canonical metadata, Article and BreadcrumbList structured data through the existing route, and sitemap inclusion.
- Repair: local verification caught that Open Graph metadata still assumed `.png` for the new SVG card. Updated metadata to use the case study's actual image source before deployment.
- Verification: `npm run typecheck` passed; `npm run build` passed; local route returned 200 with the correct SVG preview URL; production route returned 200 after deploy; title, canonical, page copy, CTA, sitemap entry, and `G-XRVBT62JHN` were verified in live HTML. Production commit: `71d3e5e`.
- Lead-generation rationale: the page gives prospects a usable way to separate slow response, unclear next decisions, and weak recovery instead of selling “more follow-up” as a vague fix.
- Analytics: organic views/page views, organic sessions/users, bounce rate, average engagement time, leads, conversion rate, Search Console queries, impressions, clicks, CTR, positions, and indexing report are **not available — analytics source not configured** for this run. GA4 tag presence is verified, but a readable reporting connection was not available to the automation.
- Next experiment: use first-party query/page data when the reporting connection becomes available to identify which lead-operations questions deserve the next standalone page.
