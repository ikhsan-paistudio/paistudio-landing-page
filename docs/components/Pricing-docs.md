# Pricing

**File:** `src/components/Pricing.tsx`
**Type:** Client component (`"use client"`) — uses `useScrollDriver`,
`useReduceMotion`
**Renders inside:** `app/page.tsx`, after `Testimonials`

## Purpose
Pricing section with two rows: a featured "Biweekly Sprint" retainer card
+ 2 trust cards, and a two-card row ("Rocket Launch MVP" one-time package
vs. "Custom scope & pricing"). Content is a fixed, bespoke 3-card layout —
**not** a generic data-driven list (see Data Model note below).

## Props
None.

## Data Model
Pricing content is hardcoded directly in the component (not in
`src/lib/data/`) as two local constant arrays, `SPRINT_TAGS` and
`MVP_TAGS`, plus inline JSX for prices/copy. This is a deliberate choice:
the 3 cards have structurally different layouts (featured 2-col grid vs.
two asymmetric cards, one with a tag list and one with just a CTA), so a
generic `PricingTier[]` data model would either lose that bespoke layout
or need per-item type discrimination for no real reuse benefit.

## Dependencies
- `useScrollDriver()` — reads `revealed`
- `useReduceMotion()`
- `revealStyle()` helper
- Local helper component `Tag` (defined in the same file, not exported) —
  a small pill (`bg-ink/5`, `rounded-lg`, 14px `text-text/75` — was
  `bg-white/5`/`text-white/75` before the section went light, see Visual
  Specs) used for both tag lists

## Behavior
- No local state. All interactivity is `data-reveal-id`-driven fade-ins:
  `pricingHeader`, `pricingRow1`, `pricingRow2Card0` (delay 0ms),
  `pricingRow2Card1` (delay 110ms).
- The "Custom scope & pricing" card's "Let's Talk" button is rendered
  `disabled` with `cursor-not-allowed` and reduced opacity — **intentional
  placeholder**, per project decision: the source prototype had this
  button with no `onClick`/`href` at all, and no real destination
  (contact form, Cal.com link, etc.) has been decided yet, so it's kept
  visibly inert rather than wired to a guessed destination.

## Visual Specs
- Section `id="pricing"`: `bg-paper` (was `bg-ink` — see note below),
  `pt-[130px] pb-[140px]`.
- Header: eyebrow "Pricing" (12px uppercase, `text-muted`), `<h2>` 88px
  weight 700 centered "Simple pricing for every stage of your product."
  (`text-text`), subhead 18px `text-muted` centered.
- Row 1 (`pai-pricing-row1`): `grid-cols-[1.2fr_1fr]`, `gap-14`,
  `rounded-[32px]`, `bg-cream` (was a translucent-white gradient over
  `bg-ink`; flattened to the same `bg-cream` card surface every other
  light-mode card in this app uses — e.g. `FeaturedPostCard` — rather than
  inventing a translucent-ink equivalent gradient), `p-12`.
  - Left: "Biweekly Sprint" title (26px, `text-text`), price "$1,950"
    (28px, `text-text`) + "/sprint" (14px `text-muted`), description (14px
    `text-muted`), 6 tags (`SPRINT_TAGS`).
  - Right: 2 trust cards (`border-ink/10`, `rounded-[20px]`,
    `p-[22px_24px]`, heading `text-text`) — "Try it for a week." (75%
    refund) and "Pause or cancel anytime."
- Row 2 (`pai-pricing-row2`): `grid-cols-2`, `gap-5`.
  - Card 0 "Rocket Launch MVP": same `bg-cream` as row 1, `rounded-3xl`,
    `p-12`; price "$3,950" (`text-text`) + "/one-time" (`text-muted`); 5
    tags (`MVP_TAGS`).
  - Card 1 "Custom scope & pricing": `border-ink/10` outline (no fill),
    `rounded-3xl`, `p-12`, heading `text-text`; description + disabled
    "Let's Talk" button pinned to the bottom (`mt-auto`) — button chrome is
    now the same light-glass treatment as `Nav`'s `navOnLight` pill
    (`border-ink/12 bg-ink/5`, softer shadow), was the dark-glass one.

**Note:** this section (along with `Testimonials`, see its own docs) was
originally styled dark (`bg-ink`) regardless of the rest of the light-mode
rollout, since only `/work`/`/blog`/`/faq` were in scope at the time.
Later changed to light (`bg-paper`) on the homepage itself.

## Responsive Behavior
- **≤900px:** `pai-pricing-row1` and `pai-pricing-row2` both collapse to
  a single column.
- **≤560px:** header `<h2>` drops to 36px (matches the global
  `pai-final-h2`-style step used elsewhere at this breakpoint, applied
  inline here via arbitrary Tailwind variants).

## Accessibility
- Decorative eyebrow icon is `aria-hidden="true"`.
- The disabled "Let's Talk" button correctly uses the native `disabled`
  attribute, so it's excluded from the tab order and announced as
  unavailable by assistive tech — not just visually dimmed.
