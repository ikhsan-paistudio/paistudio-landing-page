# QualificationSection

**File:** `src/components/sections/QualificationSection.tsx`
**Type:** Server component — no `"use client"`, no state.
**Spec:** `content/sections/sec-08-qualification.md`
**Renders inside:** only `app/dev/sections/page.tsx` (preview harness) —
not yet wired into any of the 12 real target pages.

## Purpose
SEC-08 · Qualification ("Right Fit" / "Not Right Fit") — a self-selection
filter: a two-column checklist letting the reader quickly tell whether
they're a good fit for this offering before engaging further.

## Props
```ts
{
  intro: string;
  goodFit: string[];     // exactly 5
  notGoodFit: string[];  // exactly 4
}
```
Logs `console.error` in development if `goodFit.length !== 5` or
`notGoodFit.length !== 4`.

**Content rule** (a copywriting requirement, not something this component
can check structurally): `notGoodFit` items must be concrete and
self-diagnosable by the reader (e.g. "you need this live in under a
week"), not vague soft-outs ("automation isn't a priority yet") that
don't actually filter anyone.

## Behavior
Purely presentational — no client state, no effects.

**Accessibility rule, structurally enforced**: the two columns are
distinguished by color (green/red) **and** an icon (check/cross) — never
color alone. `DANGER` (`#dc2626`) is a one-off arbitrary value, not a
shared design token — this project's `@theme` only defines
ink/paper/cream/text/muted/brand/deep/mint/pill (all green/neutral, no
red/danger token exists), matching how other one-off colors are already
used inline elsewhere in this codebase (e.g. Nav's `#767676`) rather than
expanding the shared global tokens for a need only this component has so
far.

## Visual Specs
- Intro: `max-w-[640px] text-[18px] leading-[1.6] text-muted mb-12`.
- Two-column grid (`grid-cols-2 gap-8`):
  - "Good fit": `bg-cream rounded-[24px] p-8`; each item has a
    `bg-brand` circular check-icon bullet (white icon).
  - "Not a good fit": `border border-ink/10 rounded-[24px] p-8`; each
    item has a `#dc2626` (`DANGER`) circular cross-icon bullet (white
    icon).
  - Both column headings: `text-[16px] font-medium tracking-[0.02em]`.
    List items: `text-[15px] leading-[1.5] text-text`, `gap-3` between
    the icon and text, `gap-3` between items.

## Responsive Behavior
- **≤900px:** two-column grid collapses to `grid-cols-1`.

## Accessibility
- Fit/no-fit is conveyed by icon shape (check vs. cross) in addition to
  color, per the explicit accessibility rule in the spec — never color
  alone.
- Icons (`CheckIcon`/`CrossIcon`) are `aria-hidden="true"`; the
  distinction is still legible from icon shape + text alone with color
  removed (e.g. grayscale/high-contrast modes).
