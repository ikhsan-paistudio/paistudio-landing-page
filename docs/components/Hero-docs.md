# Hero

**File:** `src/components/Hero.tsx`
**Type:** Server component (no `"use client"` — no hooks/state)
**Renders inside:** `app/page.tsx`, directly after `Nav`/`ProgressRail`

## Purpose
First full-viewport section of the landing page. Headline, subhead, and a
4-column social-proof stats row. Sits on top of the fixed 3D-logo background
(`FixedBackground`) which shows through since Hero has no background of its
own.

## Props
None. Static content component.

## Dependencies
- `next/image` for the Upwork/Bubble stat logos
- Reads `data-para` / `data-fade` attributes consumed by `useScrollDriver`
  (see Behavior) — does **not** call the hook itself, stays a server
  component

## Behavior
- `data-para="0.08"` on the headline+subhead row: the scroll driver applies
  a `translate3d` parallax to this element proportional to distance from
  viewport center × 0.08.
- `data-fade="1"` on both the headline row and the stats row: the scroll
  driver fades their opacity to 0 as the user scrolls past ~62% of one
  viewport height.
- No local interactivity (no clicks, no state).

## Visual Specs
- Section: `min-h-screen`, `flex flex-col justify-end`, `pt-[148px]`,
  `gap-12`, `scroll-snap-align: start`.
- H1 (`pai-hero-h1`): 100px, weight 700, line-height 1, letter-spacing
  -1px, white, `text-balance`. The `"5× faster."` span is `text-brand`
  (`#00B450`) with a 3px underline, 10px offset.
- Subhead paragraph: 18px, line-height 1.4, `text-white/82`, `max-w-[400px]`.
- Stats row: flex row, `border-t border-white/18`, 4 equal-width columns
  separated by `border-l border-white/18` (first column has no left
  border). Each column: a 30px-tall logo/value slot (`mb-[9px]`) + a 12px
  uppercase label at `tracking-[0.1em]` `text-white/78`.
  - Col 1: Upwork logo (`brightness-0 invert`, height 22px) / "TOP RATED+
    ON UPWORK"
  - Col 2: Bubble logo (same treatment) / "VERIFIED BUBBLE.IO AGENCY"
  - Col 3: "2 weeks" (18px semibold white) / "AVG. FIRST RELEASE"
  - Col 4: "50+" (18px semibold white, uppercase) / "PROJECTS COMPLETED"

## Responsive Behavior
- **≤900px:** headline+subhead row becomes `flex-col items-start` (subhead
  drops to full width); H1 clamps to `clamp(40px,9vw,72px)`; stats row
  wraps, each stat becomes `flex: 1 1 45%` with no left border and bottom
  padding instead.
- **≤560px:** H1 clamps to `clamp(32px,10vw,48px)`; each stat becomes
  `flex: 1 1 100%` (full width, stacked).

## Accessibility
- Single semantic `<h1>` for the page's primary heading.
- Logo images have descriptive `alt` text ("Upwork", "Bubble.io").
- No interactive elements — nothing to trap focus or need ARIA.
