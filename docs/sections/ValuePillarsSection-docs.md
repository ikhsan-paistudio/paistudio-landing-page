# ValuePillarsSection

**File:** `src/components/sections/ValuePillarsSection.tsx`
**Type:** Client component (`"use client"`) — local `hoveredIndex` state.
**Spec:** `content/sections/sec-02-value-pillars.md` (original brief — see
Behavior for how far the shipped component has diverged from it)
**Renders inside:** `app/saas-web-app-development/page.tsx`, plus the
`app/dev/sections/page.tsx` preview harness.

## Purpose
SEC-02 · Value Pillars — a 3-card hover-expand strip communicating the
product's core value pillars, each backed by a (currently placeholder)
product-preview image.

## Props
```ts
{
  pillars: Array<{
    title: string;
    description: string;
    previewLabel?: string; // caption for the placeholder image, e.g. "Task list UI"
  }>; // exactly 3
}
```
Logs `console.error` in development if `pillars.length !== 3`.

## Behavior — redesigned from the original spec
The original spec called for a static 4-card 2×2 grid. On direct request
this shipped instead as a 3-card horizontal strip in one light-gray
rounded container, with a hover interaction:
- All 3 cards sit in a single `bg-cream rounded-[32px] p-2` container,
  each card `basis-0` with `flexGrow: 1` at rest.
- On hover, the hovered card's `flexGrow` animates to `1.7` (others stay
  at `1`, so they shrink proportionally to make room) — a CSS
  `flex-grow` transition (not `width`/`flex-basis`), 350ms ease-out.
- Each card's own content is an **h-stack** (text column + image column),
  not a v-stack with an absolutely-positioned image overlay (an earlier
  pass did that). Both columns are ordinary flex children sharing the
  card's own padding.
- At rest the image column's `flexGrow`/`opacity` are both `0` (zero
  width, invisible) so text alone fills the card; on hover both columns
  animate to equal `flexGrow` (1:1, genuinely 50/50) while the image fades
  in. This split was requested explicitly: "di masing2 card itu pake
  h-stack. 50% masing2... placeholder juga kena effect dari padding di
  containernya."
- The text column itself uses `flex flex-col justify-between` (not a
  plain stacked v-stack, also on request) — the index number + heading
  group sits at the card's top, the description is pinned to its bottom,
  rather than just flowing top-down with a fixed gap. Needs the card's own
  `min-h-[280px]` (`max-[700px]:min-h-[240px]`) since there'd otherwise be
  no extra height for `justify-between` to distribute — the same
  technique `BusinessImpactSection`'s header/description group reuses.

## Visual Specs
- Container: `flex gap-2 rounded-[32px] bg-cream p-2`
  (`max-[700px]:flex-col`).
- Card: `min-h-[280px] basis-0 rounded-[24px] p-8`; hovered →
  `bg-paper shadow-[0_16px_40px_rgba(0,0,0,0.1)]`, at rest →
  `bg-transparent`.
- Text column: index number `text-[13px] tracking-[0.04em] text-ink/30`
  (zero-padded, e.g. "01"); title `text-[22px] leading-[1.2] font-bold
  tracking-[-0.01em]`; description `text-[14px] leading-[1.6] text-muted`.
- Image placeholder: `bg-[#E0E0E0]` (the lightest grey established for
  image placeholders in this project — lighter than the `#d9d7d0` tone
  `WorkGallery`/the original `HeroSection` pass used), `rounded-[18px]`,
  centered 11px uppercase caption "Image placeholder — {previewLabel}".

## Responsive Behavior
- **≤700px:** container switches to a column stack (`flex-col`); each
  card after the first gets a top border (`border-t border-ink/8`) instead
  of relying on the row gap to separate them; card `min-h` drops to
  `240px`.

## Accessibility
- Image placeholder column is `aria-hidden="true"` (decorative/caption-only,
  no real image content yet).
- Hover is a pure enhancement — card content (title, description) is
  always in the DOM and readable regardless of hover state; nothing is
  conditionally rendered.
