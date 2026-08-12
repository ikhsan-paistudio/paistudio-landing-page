# BusinessImpactSection

**File:** `src/components/sections/BusinessImpactSection.tsx`
**Type:** Server component — no `"use client"`, no state.
**Spec:** `content/sections/sec-06-business-impact.md` (original brief —
see Behavior for how far the shipped component has diverged from it)
**Renders inside:** `app/saas-web-app-development/page.tsx` (positioned
right before SEC-10/`FaqSection`), plus the `app/dev/sections/page.tsx`
preview harness.

## Purpose
SEC-06 · Business Impact — translates product features into business
results: a headline + supporting paragraph, then a 4-up grid of short,
punchy benefit statements.

## Props
```ts
{
  headline: string;  // e.g. "The Real Business Impact of [Product/Service]"
  intro: string;      // 1–2 sentences: the broader benefit, not a feature restatement
  benefits: Array<{
    icon: "efficiency" | "speed" | "accuracy" | "insight";
    text: string;        // short and punchy, 3–6 words
    description: string; // short supporting sentence under the header
  }>; // exactly 4
}
```
`icon` is a **closed set** (not a raw icon-name passthrough) mapped
internally to `GaugeIcon` / `LightningIcon` / `ShieldCheckIcon` /
`BrainIcon` from `@phosphor-icons/react/dist/ssr` — keeps the prop plain,
serializable data instead of exposing arbitrary Phosphor internals across
the props boundary. The 4 keys cover the 4 example categories from the
original spec (efficiency gain, speed improvement, error reduction,
smarter decision-making) 1:1; extend the internal `BENEFIT_ICONS` map, not
the prop shape, if a page ever needs a 5th theme. Logs `console.error` in
development if `benefits.length !== 4`.

## Dependencies
- `@phosphor-icons/react/dist/ssr` — the `/dist/ssr` entry specifically,
  which renders as plain SVG with no React Context, so it works in this
  Server Component with no `"use client"` needed. Newly installed for
  this component; not used anywhere else in the project yet.

## Behavior — how this diverged from the original spec / prior requests
- **Content model redesigned twice** from the original spec's `outcomes:
  Array<{icon: string, text: string}>` (a free-string emoji/glyph, no
  description): first to `benefits: string[]` (icon dropped entirely, per
  an explicit redesign request with new layout rules), then to the
  current `{icon, text, description}` shape once real Phosphor icons and
  a card description were requested on follow-ups.
- **Icon**: originally rendered a flat `bg-brand` accent bar
  (`h-1.5 w-8`) as a purely decorative divider; replaced with a real
  Phosphor icon in a `bg-brand/12` tinted circle on request ("add
  phosphor icon to replace green line in the cards").
- **Eyebrow label**: this section originally shipped with an eyebrow
  (arrow icon + "Business Impact" label) above the headline, matching the
  rest of this section library's convention; removed entirely on request
  ("remoev the eyebrow"). The section now opens straight into the
  headline.
- **Card internal structure**: originally a single flat `flex-col
  items-center gap-4` stack (icon, then text). Restructured into **two
  explicit groups** on request ("tambahkan short description di bawah
  header di dalam card. buat jadi 2 grup. icon dan header+desc. v-stack
  ini jadikan space in between"): group 1 is the icon alone; group 2 is
  the header+description pair, its own `flex-col justify-between` v-stack
  with `flexGrow: 1` so it fills the card's remaining height — the same
  `justify-between`-column technique `ValuePillarsSection`'s text column
  uses. The card needed its own `min-h-[236px]` added at the same time,
  since without extra height there's nothing for `justify-between` to
  distribute.

## Visual Specs
- Header block: centered, `gap-5`; headline `max-w-[760px] text-[56px]
  leading-[1.04] font-bold tracking-[-0.56px]`
  (`max-[900px]:text-[40px] max-[560px]:text-[32px]`); intro
  `max-w-[620px] text-[18px] leading-[1.6] text-muted`.
- Grid: `mt-14 grid grid-cols-4 gap-6`.
- Card: `min-h-[236px] flex-col items-center gap-5 rounded-[24px] bg-cream
  px-6 py-8 text-center`.
  - Icon (group 1): `h-11 w-11 rounded-full bg-brand/12 text-brand`,
    Phosphor icon at `size={22} weight="bold"`.
  - Header+desc (group 2): `flex-col items-center justify-between gap-2`,
    `flexGrow: 1`; header `text-[18px] leading-[1.3] font-semibold
    text-text`; description `text-[14px] leading-[1.5] text-muted`.

## Responsive Behavior
- **≤900px:** grid → `grid-cols-2`; headline → 40px.
- **≤560px:** grid → `grid-cols-1`; headline → 32px.

## Accessibility
- Icon circles are `aria-hidden="true"` — decorative accents, not the
  sole conveyor of the benefit (the header text is always present
  alongside them).
