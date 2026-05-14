# whQ.tr Shopify Theme Migration Handoff

## Goal

Move the whQ.tr / responsible whatr website off Lovable as the final hosting layer and into a clean Shopify theme.

The desired final state:

- Shopify owns the website, product pages, cart, checkout, and domain.
- Lovable is no longer required in production.
- The current Lovable visual design should be ported into Shopify Liquid sections/templates.
- Shopify CLI should be used from the actual whQ.tr project/theme workspace.

## Important Security Note

Credentials were pasted into the previous chat. Do not repeat them in future files or commits. Rotate the Lovable and Shopify passwords after the migration/auth work is complete.

## Relevant Local Paths

Current old/wrong workspace:

```text
/Users/anandiyer/CODE/anand-site
```

This is not the whQ.tr project. It is a separate Anand portfolio/Next.js site. Do not edit it for whQ.tr work.

Correct Lovable/GitHub project clone:

```text
/Users/anandiyer/Documents/GitHub/glacial-whisper-landing
```

Git remote:

```text
https://github.com/anandiyerknight/glacial-whisper-landing.git
```

Current branch:

```text
main
```

Latest observed commit:

```text
f5163ff Removed Contact border
```

## Lovable Project

Lovable project URL:

```text
https://lovable.dev/projects/0b69bb47-d3c1-4091-a6f2-29e2b4b6f4e6
```

Observed Lovable preview:

- Project name: `Responsible WhQ.tr Landing`
- Visual: mountain/glacier/stream hero with whQ.tr cans.
- Lovable UI shows a `Manage Shopify` button.
- Lovable preview is not the same as the current Shopify live storefront theme.

Preview iframe URL observed inside Lovable:

```text
https://id-preview--0b69bb47-d3c1-4091-a6f2-29e2b4b6f4e6.lovable.app/
```

## Project Type

The correct repo is a Lovable-generated Vite/React app:

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn-ui
- React Router
- Zustand cart store
- Storefront API calls in `src/lib/shopify.ts`

It is not a Shopify theme and not Hydrogen.

Important files:

```text
src/pages/Index.tsx
src/pages/Shop.tsx
src/pages/ProductPage.tsx
src/pages/AboutUs.tsx
src/pages/OurWater.tsx
src/pages/Sustainability.tsx
src/pages/FAQs.tsx
src/pages/Contact.tsx
src/components/Navbar.tsx
src/components/HeroSection.tsx
src/components/OriginSection2.tsx
src/components/SpringVsTreatedSection.tsx
src/components/WhyRareSection.tsx
src/components/ProcessSection.tsx
src/components/CTASection.tsx
src/components/FooterSection.tsx
src/components/CartDrawer.tsx
src/stores/cartStore.ts
src/lib/shopify.ts
src/index.css
tailwind.config.ts
```

Important assets:

```text
public/hero-video.webm
public/hero-video.mp4
public/fonts/Klamp105-*.ttf
src/assets/hero-bg-mobile.jpg
src/assets/hero-loading.jpg
src/assets/whatr-logo-transparent.png
src/assets/whatr-logo-white.png
src/assets/whatr-logo-dark.png
src/assets/origin-bg.png
src/assets/aluminium-bg.png
src/assets/spring-vs-treated-bg.png
src/assets/packed-at-source-bg.png
src/assets/recycle-cans.png
public/images/*.jpg
```

## Shopify Store Details Observed

Shopify admin URL provided:

```text
https://admin.shopify.com/store/responsible-whatr-8902/settings/domains
```

Store domain from admin link:

```text
responsible-whatr-8902.myshopify.com
```

The React app currently hardcodes a different Shopify permanent domain in `src/lib/shopify.ts`:

```ts
const SHOPIFY_STORE_PERMANENT_DOMAIN = '3jhg0b-eh.myshopify.com';
```

Observed with `curl`:

- `https://3jhg0b-eh.myshopify.com` redirects to `https://responsible-whatr-8902.myshopify.com/`
- `https://responsible-whatr-8902.myshopify.com/` is served by Shopify.
- Shopify theme id observed in response headers: `129665958021`
- The Shopify live storefront is a normal Shopify theme, not the Lovable React app.
- `https://responsiblewhatr.com` and `https://www.responsiblewhatr.com` returned SSL/SNI errors from the local environment, suggesting custom domain setup/certificate is not cleanly serving Lovable/Shopify yet.

## Shopify API Diagnosis

The current React app's Storefront API connection works.

Command used conceptually:

```sh
node -e "query Storefront API products"
```

Result:

- HTTP status: `200`
- Product count: `6`
- Products returned:
  - `Responsible Spring Whatr (24 x 500ml)`
  - `Responsible Spring Whatr (36 x 250ml)`
  - `Responsible Sparkling Whatr (36 x 250ml)`
  - `Responsible Spring Whatr (12 x 250ml)`
  - `Responsible Spring Whatr (6 x 500ml)`
  - `Responsible Sparkling Whatr (12 x 250ml)`

Conclusion:

- The mismatch is not primarily a failed Shopify product connection.
- The live website does not match Lovable because the Shopify domain is serving an existing Shopify theme, while Lovable preview is a separate React app.

## Decision Made

User chose:

```text
Option 1: Build a clean Shopify theme so everything lives in Shopify.
```

Clarification:

- Hydrogen was discussed, but Hydrogen is not a classic Shopify theme. It is Shopify-native React/headless and generally runs on Oxygen or another host.
- Since the user wants everything in Shopify, use a Shopify Liquid theme.

## Estimated Build Time

Rough estimates given:

- Fast MVP theme: 1-2 days
- Good production version: 3-5 days
- Pixel-close premium version: 1-2 weeks

For this site, estimate 3-5 days for a solid Shopify theme if keeping the design faithful but practical.

## Recommended Theme Build Shape

Create a new Shopify theme folder inside the whQ.tr repo, for example:

```text
/Users/anandiyer/Documents/GitHub/glacial-whisper-landing/shopify-theme
```

Suggested Shopify theme structure:

```text
shopify-theme/
  assets/
    theme.css
    theme.js
    hero-video.webm
    hero-video.mp4
    fonts/Klamp105-*.ttf
    copied image/logo assets
  config/
    settings_schema.json
  layout/
    theme.liquid
  sections/
    header.liquid
    footer.liquid
    hero-video.liquid
    origin.liquid
    spring-vs-treated.liquid
    why-rare.liquid
    process.liquid
    cta.liquid
    main-collection-product-grid.liquid
    main-product.liquid
    main-page.liquid
    contact-form.liquid
  snippets/
    product-card.liquid
    price.liquid
    icons.liquid
  templates/
    index.json
    collection.json
    product.json
    page.json
    page.contact.json
    cart.json
  locales/
    en.default.json
```

Use native Shopify Liquid data instead of Storefront API:

- `collections`
- `product`
- `cart`
- `routes.cart_url`
- `routes.root_url`
- Shopify forms for cart/contact/newsletter if needed

Do not keep the React Storefront API cart as production code once ported into Liquid.

## Visual Direction To Preserve

Current Lovable design language:

- Refined Himalayan water brand.
- Organic/luxury/minimal aesthetic.
- Glacier/mountain/stream/can hero.
- Klamp105 brand font.
- White/light stone background with aqua highlights.
- Large immersive media, not generic cards.
- Navigation links: Origin, Sustainability, Shop, Contact.
- Menu links: About Us, Our Water, Sustainability, FAQs, Contact, Shop.
- Hero uses full-bleed video with loading poster/progress.
- Homepage section order:
  1. Hero
  2. Origin
  3. Spring vs Treated
  4. Why Rare
  5. Process
  6. CTA
  7. Footer

## Shopify CLI Notes

Shopify CLI is available through npm:

```sh
npm exec shopify -- --version
```

Observed version:

```text
shopify/3.94.3 darwin-arm64 node-v24.14.0
```

Shopify CLI auth was attempted but got stuck on Shopify login/passkey upsell. If needed, retry from the correct project/theme folder:

```sh
npm exec shopify -- theme dev --store responsible-whatr-8902.myshopify.com
```

or inspect themes:

```sh
npm exec shopify -- theme list --store responsible-whatr-8902.myshopify.com
```

If Shopify auth blocks again, user may need to complete login manually in browser.

## GitHub Notes

GitHub connector in previous session initially authenticated as:

```text
gutguruswetha-ai
```

That connector had zero repository access.

Local `gh auth status` later showed both accounts available:

```text
gutguruswetha-ai
anandiyerknight
```

The correct GitHub repo owner/account is:

```text
anandiyerknight
```

Since the repo is already cloned locally, prefer working from the local clone instead of relying on GitHub connector auth.

## Immediate Next Steps For New Session

1. Start/reopen Codex in:

```text
/Users/anandiyer/Documents/GitHub/glacial-whisper-landing
```

2. Confirm repo status:

```sh
git status --short
git branch --show-current
```

3. Create a new branch:

```sh
git checkout -b codex/shopify-theme-port
```

4. Create `shopify-theme/` scaffold.

5. Copy required assets from `public/` and `src/assets/` into `shopify-theme/assets/`.

6. Port CSS tokens from `src/index.css` and `tailwind.config.ts` into `shopify-theme/assets/theme.css`.

7. Build core Liquid files:

```text
layout/theme.liquid
sections/header.liquid
sections/footer.liquid
sections/hero-video.liquid
templates/index.json
```

8. Then port commerce pages:

```text
sections/main-collection-product-grid.liquid
sections/main-product.liquid
templates/collection.json
templates/product.json
templates/cart.json
```

9. Run theme check/preview if possible:

```sh
npm exec shopify -- theme check shopify-theme
npm exec shopify -- theme dev --store responsible-whatr-8902.myshopify.com --path shopify-theme
```

10. After preview looks good, push/publish as a Shopify theme.

## Do Not Do

- Do not edit `/Users/anandiyer/CODE/anand-site` for this migration.
- Do not commit credentials.
- Do not rely on Lovable hosting for the final production site.
- Do not keep the React Storefront API cart as the production commerce layer after moving into Shopify Liquid.
- Do not overwrite any existing user changes without checking `git status`.

