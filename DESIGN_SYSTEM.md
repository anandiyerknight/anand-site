# DESIGN_SYSTEM.md — UI, Design & Animation Rulebook

> Read this entire file before writing, editing, or touching any UI, styling, animation, or layout code.
> Design is not decoration. It is communication. Every visual decision must have a reason.

---

## RULE 0 — Brand Audit First (Non-Negotiable)

Before writing a single line of UI code in any new project or session, ask and confirm:

```
Brand Audit Questions:
1. Primary color? Secondary color? Accent color? Neutral/background color?
2. Font for headings? Font for body? Font for UI labels/buttons?
3. Border radius style? (sharp / slightly rounded / fully rounded / pill)
4. Shadow style? (none / subtle / dramatic / neumorphic)
5. Icon library? (Lucide / Phosphor / Heroicons / custom)
6. Motion personality? (snappy / fluid / minimal / expressive)
7. Density preference? (spacious / balanced / compact)
8. Dark mode / light mode / both?
9. Any existing design file, Figma, or screenshot to reference?
10. What does this product feel like? (clinical / warm / technical / playful / premium / serious)
```

Store these answers as design tokens. Every UI decision in this project must trace back to them.
Never invent brand decisions. Never default to generic values without asking first.

---

## RULE 1 — Design Token System

All visual values must be defined as CSS variables or design tokens. Never hardcode a color, font size, spacing value, shadow, or radius anywhere in component code.

```css
/* Required token categories — define all of these before building UI */

/* Colors */
--color-primary
--color-primary-hover
--color-primary-active
--color-secondary
--color-accent
--color-background
--color-surface        /* cards, modals, sidebars */
--color-surface-raised /* dropdowns, tooltips, popovers */
--color-border
--color-border-subtle
--color-text-primary
--color-text-secondary
--color-text-disabled
--color-error
--color-warning
--color-success
--color-info

/* Typography */
--font-heading
--font-body
--font-mono
--font-size-xs         /* 11–12px */
--font-size-sm         /* 13–14px */
--font-size-base       /* 15–16px */
--font-size-md         /* 17–18px */
--font-size-lg         /* 20–22px */
--font-size-xl         /* 24–28px */
--font-size-2xl        /* 32–40px */
--font-size-3xl        /* 48–64px */
--font-weight-regular
--font-weight-medium
--font-weight-semibold
--font-weight-bold
--line-height-tight    /* headings */
--line-height-base     /* body */
--line-height-loose    /* long-form text */
--letter-spacing-tight
--letter-spacing-base
--letter-spacing-wide  /* labels, caps */

/* Spacing (8pt grid) */
--space-1   /* 4px */
--space-2   /* 8px */
--space-3   /* 12px */
--space-4   /* 16px */
--space-5   /* 20px */
--space-6   /* 24px */
--space-8   /* 32px */
--space-10  /* 40px */
--space-12  /* 48px */
--space-16  /* 64px */
--space-20  /* 80px */
--space-24  /* 96px */

/* Radii */
--radius-sm
--radius-md
--radius-lg
--radius-xl
--radius-full

/* Shadows */
--shadow-sm
--shadow-md
--shadow-lg
--shadow-xl
--shadow-inset

/* Motion */
--duration-instant     /* 80ms */
--duration-fast        /* 150ms */
--duration-base        /* 250ms */
--duration-slow        /* 400ms */
--duration-enter       /* 350ms */
--duration-exit        /* 200ms */
--ease-standard        /* cubic-bezier(0.4, 0, 0.2, 1) */
--ease-decelerate      /* cubic-bezier(0, 0, 0.2, 1) — entering */
--ease-accelerate      /* cubic-bezier(0.4, 0, 1, 1) — exiting */
--ease-spring          /* cubic-bezier(0.34, 1.56, 0.64, 1) */

/* Z-index scale */
--z-base: 0
--z-raised: 10
--z-dropdown: 100
--z-sticky: 200
--z-overlay: 300
--z-modal: 400
--z-toast: 500
--z-tooltip: 600
```

If a value is not in the token system, it does not belong in the UI.

---

## RULE 2 — Layout: Use the Full Screen

- Every page must be designed for the full viewport. No UI should feel like it is floating in the center of a blank page.
- Use a layout system: sidebar + main content, or top nav + full-width canvas, or split panels. Pick one and apply it globally.
- Every page has three zones: navigation, content, and context (details/actions panel). All three must be accounted for even if one is empty.
- Empty space must be intentional negative space — not forgotten space. If a panel is empty because no item is selected, show a purposeful empty state, not a blank void.
- Content areas must expand to fill available space. No fixed-width containers floating in the middle of large screens.
- On wide screens (1440px+), use the extra space for richer layouts — sidebars, split views, additional context panels. Never cap content at 800px on a 1440px screen unless it is a reading view.

---

## RULE 3 — Layout: Space for Future Components

- Every layout must be built with extension in mind.
- Use grid systems and named layout regions, not absolute positions.
- If a panel, sidebar, or section is planned but not built yet — reserve the space with a placeholder region. Do not let current components expand into space that will be taken later.
- Use CSS Grid with named template areas for primary layouts so components can be slotted in without restructuring.
- Never use `position: absolute` for layout. Reserve it for overlays, tooltips, and decorative elements only.

---

## RULE 4 — Feedback on Every Interaction

Every interactive element must give immediate feedback. No silent clicks. No ambiguous states. No dead UI.

**Buttons and actions:**
- Default state
- Hover state (color shift, subtle lift, cursor change)
- Active/pressed state (slight scale down: `scale(0.97)`)
- Focus-visible state (keyboard navigation ring)
- Loading state (spinner or skeleton, disable pointer events)
- Disabled state (opacity, no pointer events, no hover effects)
- Success state (brief green confirmation before returning to default)
- Error state (red, error message, shake animation if critical)

**Form inputs:**
- Default border
- Focused border (accent color, subtle glow)
- Filled state (slightly different background)
- Error state (red border, error message below, icon)
- Success/validated state
- Disabled state

**Data loading:**
- Always show a skeleton loader that matches the layout of the loaded content. Never show a spinner in the middle of a content area with no context.
- Skeleton loaders must have animated shimmer.

**Async actions (save, submit, delete, send):**
- Immediately disable the trigger element.
- Show an inline loading indicator on the element, not a full-page spinner.
- On success: brief success state, then resolve.
- On error: surface the error inline, re-enable the element, do not reset the form.

If an action takes longer than 1 second, show progress. If longer than 3 seconds, show a progress indicator with messaging.

---

## RULE 5 — Animation Principles

Animations must have purpose. Never animate for decoration alone.

**What to animate:**
- Entering elements: fade in + translate up 8–12px, ease-decelerate, 300–400ms
- Exiting elements: fade out + translate down 4–6px, ease-accelerate, 150–200ms (exits always faster than enters)
- State changes: color, opacity, scale — ease-standard, 150–250ms
- Layout shifts: use layout animations to prevent jarring reflows
- Attention: subtle pulse or bounce only for critical alerts — use sparingly
- Drag and drop: scale up slightly on pickup, shadow increases, scale back on drop

**What never to animate:**
- Page-level transitions that block content for more than 300ms
- Decorative elements that distract from the task
- Animations that loop indefinitely in the background
- Anything that causes layout reflow (animating `width`, `height`, `top`, `left` — use `transform` and `opacity` only for performance)

**Spring physics for interactive elements:**
- Modals entering: spring ease, slight overshoot
- Drawers sliding in: spring ease
- Drag elements: spring snap on release
- Tooltips: fast fade, no spring needed

**Respect system preferences:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## RULE 6 — Modal and Overlay System

All modals, sheets, drawers, dialogs, and popovers must follow one unified system. Never invent a new modal pattern for a new feature.

**Modal hierarchy:**
- Tooltip: 2–4 lines max, no actions, appears on hover, disappears on mouse leave
- Popover: small contextual panel, 1–2 actions, dismisses on outside click
- Dialog: focused task, 1 primary + 1 secondary action, backdrop, keyboard dismissible
- Sheet/Drawer: complex task or detail view, slides from bottom (mobile) or right (desktop)
- Full-screen overlay: immersive task that cannot be interrupted (onboarding, critical flow)

**Rules for all overlays:**
- Backdrop: semi-transparent, blurred (`backdrop-filter: blur(4–8px)`)
- Entry animation: enter from direction that makes spatial sense (bottom on mobile, center fade on desktop dialog, right edge for drawer)
- Exit animation: reverse entry direction, faster than entry
- Always trap keyboard focus inside the overlay
- Always dismiss on Escape key
- Always dismiss on backdrop click unless data loss would result — in that case show a confirmation
- Never stack more than 2 modal layers. If a third is needed, the UX flow is wrong — fix the flow.
- New modals must use the existing modal component. Never create a new modal implementation for a new feature.

---

## RULE 7 — Typography Rules

- Minimum body font size: 15px desktop, 16px mobile. Never smaller.
- Minimum contrast ratio: 4.5:1 for body text (WCAG AA). 3:1 for large text and UI components.
- Never use pure black (`#000000`) on white. Use near-black (`#0f0f0f`, `#111`, `#1a1a1a`).
- Never use pure white on dark backgrounds. Use near-white (`#f5f5f5`, `#fafafa`).
- Line length: 45–75 characters for reading content. Never let text span more than 80 characters per line.
- Heading scale must follow the token system. Never pick an arbitrary font size.
- Font weights: use the defined scale. Do not use 300 (thin) for body text — it fails contrast on small sizes.
- Letter spacing: only widen spacing on uppercase labels and small caps. Never kern body text wider.
- Do not mix more than 2 font families. Heading font + body font. Mono font for code only.
- All text must be selectable unless there is a specific reason it should not be.

---

## RULE 8 — Mobile-First Rules

Every component must be designed mobile-first. Desktop is an enhancement, not the default.

**Breakpoints (define once, use consistently):**
```
xs:  < 480px   — small phones
sm:  480–767px — large phones
md:  768–1023px — tablets
lg:  1024–1279px — small desktop
xl:  1280–1535px — desktop
2xl: 1536px+   — wide desktop
```

**Mobile-specific rules:**
- Minimum tap target: 44×44px for any interactive element. No exceptions.
- Touch targets must have at least 8px of space between them.
- No hover-dependent information on mobile. Hover states are an enhancement, not the only way to reveal content.
- Bottom navigation on mobile, not top sidebar.
- Drawers slide from bottom on mobile, from right on desktop.
- Font sizes must not require pinch-to-zoom. Never use `user-scalable=no`.
- Inputs must not cause page zoom on focus (font size must be ≥ 16px on mobile inputs).
- Scrollable areas must have `-webkit-overflow-scrolling: touch` and momentum scrolling.
- Modals on mobile: full-screen or bottom sheet. Centered floating dialogs do not work on small screens.
- Tables that do not fit on mobile must become cards or a scrollable container — never a truncated table.
- Images must be responsive. Never fixed pixel widths on images.

**Test every component at:**
- 375px (iPhone SE / small Android)
- 390px (iPhone 14)
- 768px (iPad)
- 1280px (laptop)
- 1440px+ (desktop)

---

## RULE 9 — Component Consistency

Every new component must match the existing component system. No exceptions.

Before building a new component:
- [ ] Does a similar component already exist in `components/ui/`?
- [ ] If yes, extend or compose it. Do not create a new one.
- [ ] If no, build it using only design tokens — no hardcoded values.
- [ ] Does it follow the same border radius as all other components?
- [ ] Does it use the same shadow scale?
- [ ] Does it use the same spacing scale?
- [ ] Does its hover/focus/active states follow the same pattern?
- [ ] Does it match the motion personality of the rest of the app?

New components that look visually inconsistent with the existing UI are a failure. Audit against existing components before shipping.

---

## RULE 10 — Empty States

Every view that can be empty must have a designed empty state. No blank white space.

Empty state must include:
- An icon or illustration that relates to the content type
- A headline: what is missing (not "No data found" — write for a human)
- A subline: why it is empty or what they can do
- A primary action if one is relevant (e.g. "Create your first X")

Empty states must match the visual style of the rest of the app. They are not afterthoughts.

---

## RULE 11 — Color Usage Rules

- Primary color: main actions, selected states, active navigation items
- Secondary color: supporting actions, tags, secondary navigation
- Accent color: highlights, notifications, badges, calls to attention — use sparingly
- Background: page canvas
- Surface: cards, panels, modals — slightly elevated from background
- Surface-raised: dropdowns, tooltips, popovers — elevated above surface
- Borders: structural separation only. Not decoration.
- Error red: validation errors, destructive confirmations — never for anything else
- Success green: confirmations, completed states — never for anything else
- Warning amber: alerts that need attention but are not blocking — never for anything else
- Never use color as the only indicator of meaning. Always pair with an icon, label, or pattern.

---

## RULE 12 — Elevation and Depth

Use elevation to communicate hierarchy, not decoration.

```
Level 0 — Background / canvas
Level 1 — Cards, panels, sections (shadow-sm)
Level 2 — Sticky headers, floating toolbars (shadow-md)
Level 3 — Dropdowns, popovers (shadow-lg)
Level 4 — Modals, dialogs (shadow-xl)
Level 5 — Toasts, notifications (shadow-xl + high z-index)
```

- Never apply a higher elevation shadow to a lower-hierarchy element.
- Never stack two elements at the same elevation level where it creates visual ambiguity.
- In dark mode, elevation is expressed through surface lightness, not shadow intensity.

---

## RULE 13 — Premium 2026 UI Patterns

Apply these where contextually appropriate. Do not apply all of them everywhere — pick what fits the brand.

**Layout:**
- Bento grid layouts for dashboards and feature showcases
- Asymmetric grids that break the monotony of equal columns
- Full-bleed sections with constrained inner content
- Sticky contextual action bars that appear on scroll or selection
- Collapsible sidebars that expand on hover or toggle

**Visual:**
- Subtle grain texture overlay on backgrounds (2–5% opacity noise)
- Glassmorphism surfaces for overlays only (backdrop blur + semi-transparent surface)
- Gradient meshes for hero sections and empty states — not for UI chrome
- Micro-borders: 1px borders with very subtle opacity, not stark lines
- High-contrast type on image or gradient backgrounds with a scrim overlay for legibility
- Custom scrollbars that match the brand (thin, rounded, colored)

**Motion:**
- Staggered list item entry (each item enters 30–50ms after the previous)
- Number counters that animate up to their value on enter
- Progress bars that animate on mount with spring easing
- Skeleton loaders that reveal content with a fade-swap
- Smooth height transitions when content expands (avoid layout jump)
- Magnetic hover effect on primary CTA buttons (subtle translate toward cursor)

**Feedback:**
- Confetti or particle burst for a major success moment (use once, not everywhere)
- Haptic-style visual pulse on mobile tap confirmation
- Checkmark draw animation on task completion
- Page-level success banner that slides in from top and auto-dismisses

**Typography:**
- Variable font weights that respond to scroll or interaction
- Large display numbers for key metrics with tight tracking
- Inline iconography matched to cap height, not a fixed size
- Tabular numbers for all data tables and metrics (font-variant-numeric: tabular-nums)

---

## RULE 14 — Accessibility Baseline

This is not optional. Every UI must meet these standards.

- All interactive elements must be keyboard navigable in logical order.
- Focus-visible ring must be visible on all interactive elements. Never `outline: none` without a replacement.
- All images must have descriptive `alt` text. Decorative images use `alt=""`.
- All form inputs must have an associated `<label>`. No placeholder-only inputs.
- Color contrast: 4.5:1 minimum for body text, 3:1 for large text and UI components.
- All icons that convey meaning must have an `aria-label` or accompanying text.
- Screen reader order must match visual order.
- Do not use color as the only way to convey information.
- Animations must respect `prefers-reduced-motion`.
- Error messages must be associated with their inputs via `aria-describedby`.

---

## RULE 15 — 20 Signs of Amatuer UI (Never Do These)

1. Inconsistent border radii across components in the same view
2. Multiple different shadow styles used without a system
3. Font sizes that are not on the defined scale
4. Buttons without hover, active, focus, loading, and disabled states
5. Modals without entry/exit animations
6. Click actions with no visual feedback for more than 100ms
7. Skeleton loaders that do not match the shape of the loaded content
8. Empty white space where content has not loaded — no skeleton, no message
9. Text with insufficient contrast against its background
10. Touch targets smaller than 44px on mobile
11. Inputs that cause zoom on focus (font-size < 16px on mobile)
12. Z-index values set to arbitrary numbers (9999, 99999, 999999)
13. Hardcoded hex colors in component files instead of design tokens
14. Two different modal implementations for two different features
15. New component invented for a feature instead of extending the existing system
16. Hover-only information that is inaccessible on mobile and keyboard
17. Unstyled default browser scrollbars in a custom-designed interface
18. Images with no defined aspect ratio causing layout shift on load
19. No error state designed for a form or data fetch
20. Animation that blocks user interaction or cannot be dismissed

---

## RULE 16 — Design Consistency Audit (Run Before Shipping Any UI)

- [ ] Every color value traces to a design token
- [ ] Every spacing value is on the 8pt grid
- [ ] Every font size is on the defined scale
- [ ] Every interactive element has all required states
- [ ] Every async action has loading and error handling
- [ ] Every empty state is designed
- [ ] Tested at 375px mobile width
- [ ] Tested at 1440px desktop width
- [ ] Contrast ratio checked for all text
- [ ] New component matches existing component visual language
- [ ] Animations respect `prefers-reduced-motion`
- [ ] No hardcoded values anywhere in the component

---

## HOW TO GIVE THIS AGENT A DESIGN TASK

Every design or UI prompt must include:

```
Component/page:       [what is being built or changed]
Where it lives:       [which page, which section, what context]
What it must do:      [function, not appearance]
What exists nearby:   [adjacent components it must match]
Device priority:      [mobile-first / desktop-first / both equal]
Brand tokens to use:  [reference the token file or paste relevant values]
What must not change: [existing UI that is working and should not be altered]
Definition of done:   [all states present / mobile tested / consistent with design system]
```

---

*This rulebook applies to every UI, animation, layout, and styling decision in this project, without exception.*
*Design consistency is not aesthetic preference. It is product quality.*
