# PricingSection

**File:** `src/components/sections/PricingSection.tsx`
**Type:** Server component — no `"use client"`, no state.
**Spec:** `content/sections/sec-09-pricing.md`
**Renders inside:** only `app/dev/sections/page.tsx` (preview harness) —
not yet wired into any of the 12 real target pages.

## Purpose
SEC-09 · Pricing / Engagement Model (optional) — either a 3-tier pricing
grid or a single prose explanation of how pricing/scoping works, depending
on `mode`.

**Named `PricingSection`, not `Pricing`**, specifically to avoid colliding
with the existing unrelated `src/components/Pricing.tsx` (this site's own
homepage pricing section — a bespoke, non-reusable component).

## Props
```ts
{
  mode: "tiers" | "explanation";
  tiers?: Array<{ name: string; price: string; description: string }>;
  explanation?: string;
}
```
`tiers`/`explanation` are both optional per the spec's own props
interface (this is **not** a discriminated union) — `mode` is what
actually decides which one renders; if the field `mode` calls for happens
to be missing, this renders nothing for that half rather than throwing.

## Behavior
**Site-wide toggle, not a per-page decision**: per spec this section must
be either present on every one of the 12 target pages or absent from all
of them — never built for some pages and skipped on others. That's a
page-assembly-time decision, out of this component's own scope; noted
here for whoever assembles the remaining pages. It's spec'd as fully
omittable from a page's render tree without breaking layout — true here
simply by virtue of being one ordinary `<section>` among others; nothing
else on a page depends on its presence.

Purely presentational otherwise — no client state, no effects.

## Visual Specs
- **`mode: "tiers"`**: `grid grid-cols-3 gap-6`. Each tier card:
  `border border-ink/10 rounded-[24px] p-8`; name `text-[20px] font-medium
  tracking-[-0.01em]`; price `text-[28px] font-bold tracking-[-0.02em]`;
  description `text-[15px] leading-[1.6] text-muted`.
- **`mode: "explanation"`**: a single paragraph, `max-w-[720px]
  text-[18px] leading-[1.6] text-muted`.

## Responsive Behavior
- **≤900px:** tier grid collapses to `grid-cols-1`.

## Accessibility
No interactive elements — plain content cards/paragraph, normal
heading/text semantics.
