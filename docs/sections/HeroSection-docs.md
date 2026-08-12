# HeroSection

**File:** `src/components/sections/HeroSection.tsx`
**Type:** Server component — no `"use client"`, no state, no effects.
**Spec:** `content/sections/sec-01-hero.md` (original brief — see Behavior
for how the shipped component has since diverged from it)
**Renders inside:** first section on all 12 target pages —
`app/saas-web-app-development/page.tsx`, `app/marketplace-development/page.tsx`,
`app/ai-products/page.tsx`, `app/mvp-development/page.tsx`,
`app/automation-tools/page.tsx`, `app/internal-tools-development/page.tsx`,
`app/bubble/page.tsx`, `app/n8n/page.tsx`, `app/softr/page.tsx`,
`app/airtable/page.tsx`, `app/lovable/page.tsx`, `app/claude-ai/page.tsx` —
plus the `app/dev/sections/page.tsx` preview harness.

## Purpose
SEC-01 · Hero / Value Proposition — first-screen framing for each of the
12 pages: what the page is about and why it matters, ending in a single
CTA.

**Not a reuse of `src/components/Hero.tsx`** (the real homepage hero) —
that component is zero-props/hardcoded copy, has no eyebrow or CTA button,
and its stats row is a logos+numbers layout, so it doesn't match this
spec's props/render-order/content model. `HeroSection` is a distinct new
component; `Hero.tsx` is untouched and still in active use on the
homepage.

## Props
```ts
{
  eyebrow: string;
  headline: string;   // template: "Why [X] Is Essential for [Outcome]"
  subhead: string;     // 1–2 sentences
  trustBadges: Array<{ label: string; sourceUrl?: string }>;
  cta: { label: string; href: string };
  cards?: HeroCard[];   // optional — see "Optional cards prop" below
  images?: {             // optional — see "Optional images prop" below
    primary: { src: string; alt: string };
    secondary: { src: string; alt: string };
  };
}
```
- `trustBadges` renders as a link only if `sourceUrl` is present — never
  fabricate a destination for a badge that doesn't have one.
- `cards` and `images` are both optional and both alternatives to the
  plain placeholder image row — every page that omits both (which is
  every page except `/saas-web-app-development`) is completely
  unaffected. If both are somehow passed, `cards` wins.

## Behavior — how this diverged from the original spec
Several points were changed on direct request over the original
`sec-01-hero.md` brief (that file was never updated to match — treat this
doc, not the spec file, as current):
- **Render order**: eyebrow → H1 → subhead → **CTA** → trust badges →
  image h-stack. The original spec had trust badges *before* the CTA and
  no image row at all.
- **Trust badges**: iterated from logo images (matching the real Hero) →
  a centered no-divider layout → finally collapsed to one plain-text line
  joined with `·` separators, sitting below the CTA. No logos ship.
- **Image h-stack**: added at the very end, not in the original spec — a
  2-image row, `flex-[50]`/`flex-[50] basis-0` (not raw `w-[50%]`/`w-[50%]`,
  so the ratio holds against the *remaining* width after the `gap-4` is
  subtracted — was `flex-[65]`/`flex-[35]`, evened out to 50/50 on
  request). `rounded-[32px]` (this project's standard large-image
  radius). Placeholder by default: `bg-[#d9d7d0]` boxes with a muted
  uppercase caption, matching `WorkGallery.tsx`'s `GalleryTile` convention.
  A page can opt into either real images (`images` prop) or floating
  status cards (`cards` prop) in this same row instead — see below.
- **Background**: a static dark-green gradient, not a flat `bg-ink` and
  not in the original spec — added on request to match "the index page's
  hero section." Sourced from `heroBgGradient(0)`'s own resting-state
  colors (`src/lib/scroll/gradients.ts`) — the same near-black→forest-green
  sequence the real homepage hero uses via its scroll-driven
  `FixedBackground`, capped before that gradient's later stops brighten
  toward white (a bounded section needs to stay dark enough for white text
  throughout, unlike the homepage's scroll-through canvas). The gradient
  sits on the outer `<section>` so it spans edge-to-edge; the `pai-container`
  max-width wrapper is a separate inner `<div>`.
- **Vertical rhythm**: a stepped gap scale, not one flat gap for every
  pairing — `mt-4` (eyebrow→h1) / `mt-6` (h1→subhead) / `mt-10`
  (subhead→CTA) / `mt-4` (CTA→trust line) / `mt-16` (trust line→image
  stack). Bumped up a notch from an earlier, cramped 12/20/32/12/48 pass
  on request ("spacing inside hero section is cramp... add a bit of gap in
  h-stack of images").

### Optional `images` prop
Real images in the same 50/50 two-box row, in place of the placeholder
caption text — used by `/saas-web-app-development`
(`public/hero/saas-web-app-development-{a,b}.png`, two real SaaS dashboard
screenshots). `primary` fills the left box, `secondary` fills the right
box. Rendered via `next/image` with `fill` + `object-cover`, so a source image
that isn't exactly 16:10 gets center-cropped rather than stretched or
letterboxed (`SaaS B.png` is a near-square 1552×1540 source with empty
color padding above/below its actual dashboard cards — the crop lands on
that padding, not the content, since the padding is what makes up the
difference between its native ratio and 16:10).

### Optional `cards` prop
Added on request, so far only used transiently on
`/saas-web-app-development` before being reverted back to plain
placeholders. Replaces the two placeholder/image boxes with a floating
status-card canvas instead: up to 3 small white cards (`HeroCard` — a
`timeline`, `working`, or `metrics` variant, matching the "Lassie-style"
card system's Header/Status/Working/Metric blocks, each with an optional
pill-shaped `tag` footer badge) scattered with slight rotation over a
translucent `border-white/10 bg-white/[0.04]` panel at `16 / 9`. Card copy
is illustrative SaaS *output* — what a real dashboard would show — never
marketing language about Paistudio itself. On mobile the canvas becomes a
plain stacked flow (`max-[900px]:flex max-[900px]:flex-col`, each card
reset to `static` position, `rotate-0`, full width) rather than keeping
the scattered/rotated desktop layout.

## Visual Specs
- Section: `py-32` (`max-[900px]:py-20`), gradient background (see above).
- Eyebrow: 12px, `tracking-[0.1em]`, `text-white/60`, uppercase.
- H1: `max-w-[900px]`, 64px/`leading-[1.08]`/bold/`tracking-[-0.02em]`,
  white, `text-balance`; `max-[900px]:text-[44px] max-[560px]:text-[32px]`.
- Subhead: `max-w-[640px]`, 18px/`leading-[1.6]`, `text-white/70`.
- CTA: pill button, `bg-brand` → `hover:bg-deep`, white 15px semibold text.
- Trust line: 13px, `text-white/70`, `·`-joined, wraps via `flex-wrap`.
- Image h-stack: `gap-4`, both boxes `aspectRatio: "16 / 10"`,
  `rounded-[32px]`, `bg-[#d9d7d0]` (placeholder caption, or a real image
  via `object-cover` when `images` is passed).
- Card canvas (when `cards` is passed instead): `aspectRatio: "16 / 9"`,
  `rounded-[32px]`, `border-white/10 bg-white/[0.04]` panel, up to 3
  `rounded-2xl bg-white` cards scattered on top.

## Responsive Behavior
- **≤900px:** section padding drops to `py-20`; H1 → 44px; image/images
  h-stack switches from `flex-[50]/flex-[50]` row to a stacked column
  (`max-[900px]:flex-col`, each box also forced `max-[900px]:w-full` on
  top of `flex-none` — not relying on flex's `stretch` default alone —
  belt-and-suspenders against `aspect-ratio` + `flex-basis: auto` sizing
  being a known cross-browser rough edge). The **16:10 shape itself is
  never overridden at any breakpoint** — only the box's absolute pixel
  size changes between desktop and mobile, so a real `images` picture
  keeps exactly the same width:height ratio (and the same
  `object-cover` crop framing) at every viewport width. The card canvas
  (when `cards` is used) instead collapses to a plain stacked flow, each
  card reset to `static`/`rotate-0`/full width — its scattered desktop
  layout doesn't carry over to mobile.
- **≤560px:** H1 → 32px.

## Accessibility
- Trust badges with a `sourceUrl` render as real `<a>` links
  (`target="_blank" rel="noopener noreferrer"`); the `·` separators are
  `aria-hidden="true"`.
- Default placeholder image boxes carry a visible text caption, not just
  a decorative fill.
- When `images` is passed, each box is a real `next/image` with a real,
  descriptive `alt` (required by the `HeroImage` type — no `alt`-less
  image ships).
