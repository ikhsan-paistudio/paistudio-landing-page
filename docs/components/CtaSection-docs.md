# CtaSection

**File:** `src/components/CtaSection.tsx`
**Type:** Client component (`"use client"`) — uses `useScrollDriver`,
`useReduceMotion`
**Renders inside:** `app/page.tsx`, after `WorkGallery`

## Purpose
The "Why Paistudio" section: headline + 3 value-prop glass cards + a
horizontal auto-scrolling logo marquee of the tools Paistudio specializes
in. This is also the section whose `getBoundingClientRect()` the scroll
driver uses as the trigger boundary for the hero→CTA dark-background
transition and the 3D logo's `hero`→`cta` mode switch.

## Props
None. Static content, driven entirely by scroll-driver state.

## Dependencies
- `useScrollDriver()` — calls `setCtaSectionEl` (registers this section as
  the boundary the driver measures); reads `revealed` map
- `useReduceMotion()` — disables reveal transitions when the user prefers
  reduced motion
- `revealStyle()` helper (`src/lib/scroll/useScrollDriver.tsx`) — computes
  the opacity/transform/transition inline style per `data-reveal-id`
- `Marquee` (`./Marquee.tsx`) — horizontal, no pause-on-hover, for the
  tools logo row
- `next/image` for the 6 tool logos

## Behavior
- `ref={setCtaSectionEl}` on the root `<section>` — this is a **read-only**
  registration; the driver never writes styles to this element directly,
  only measures its position every scroll tick.
- Local content (headline, 3 cards, tools marquee) each carry
  `data-reveal-id` and get their inline style computed from
  `revealStyle(revealed, id, reduceMotion)`, which fades+slides them in
  the first time they're ≥8% from the bottom of the viewport. Delays:
  `ctaCard1` 90ms, `ctaCard2` 180ms (others 0ms) — set in the shared
  `REVEAL_DELAYS` table in `useScrollDriver.tsx`.
- No local state; purely reactive to context.

## Visual Specs
- Section: own gradient background
  `linear-gradient(180deg, #28211A00, #28211A00, #09261ACC, #135232, #23A05D)`,
  layered on top of the fixed background behind it; `pt-[60vh] pb-[140px]`.
- Decorative radial blur accent, absolutely positioned bottom-left,
  `blur-[24px]`, `pointer-events-none`.
- Eyebrow: arrow icon + "Why Paistudio", 12px uppercase `text-white/60`.
- Headline (`data-reveal-id="ctaHeadline"`): 64px, weight 500,
  `tracking-[-0.56px]`, `max-w-[760px]`, white, `text-balance`.
- Card grid (`pai-cta-grid`): 3 columns, `gap-6`, `mt-[72px]`. Each card:
  `rounded-[32px]`, `border-white/10`, `p-[30px_28px]`; alternating
  background `rgba(255,255,255,0.04)` (cards 0 & 2) / `#FFFFFF0A` (card 1).
  Title 18px weight 500 white; body 14px `text-white/75`.
- Tools marquee: label "TOOLS WE SPECIALIZE AT" (12px, `text-white/66`),
  horizontal mask-image fade at 9%/91%, 6 logos (Bubble, Airtable, Softr,
  n8n, Lovable, Claude AI) at varying heights (29–38px), `opacity-82`,
  26s linear loop, gap `76px`.

## Responsive Behavior
- **≤900px:** `pai-cta-grid` → 2 columns.
- **≤560px:** `pai-cta-grid` → 1 column.
- No explicit breakpoint override on headline size (uses the base 64px
  at all widths — a known fidelity gap vs. fluid scaling, noted in the
  implementation plan).

## Accessibility
- Decorative arrow icon marked `aria-hidden="true"`.
- Cards are plain non-interactive `<div>`s (no click targets).
- Reveal animations are fully disabled (`opacity:1; transform:none`) under
  `prefers-reduced-motion: reduce` via `useReduceMotion()`.
