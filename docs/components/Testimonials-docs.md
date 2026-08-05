# Testimonials

**File:** `src/components/Testimonials.tsx`
**Type:** Client component (`"use client"`) — uses `useScrollDriver`,
`useReduceMotion`, local state
**Renders inside:** `app/page.tsx`, after `CtaSection`

## Purpose
Click-to-select horizontal testimonial carousel. Three testimonial cards;
the active one is centered, full-opacity, and full-scale, the other two
are dimmed, scaled down, and slightly blurred.

## Props
None. Reads `TESTIMONIALS` / `AVATAR_HUES` from
`src/lib/data/testimonials.ts`.

## Dependencies
- `TESTIMONIALS`, `AVATAR_HUES` — `src/lib/data/testimonials.ts`
- `useScrollDriver()` — reads `revealed` (for the `testimonialsWrap`
  reveal-on-scroll fade-in only)
- `useReduceMotion()`
- `revealStyle()` helper
- `next/image` for the one testimonial with a real avatar (Sittiporn)

## Local State
- `active: number` (default `1`) — index of the currently centered
  testimonial.
- `offset: number | null` — measured pixel offset to center the active
  slide within the wrap; `null` until first layout measurement completes,
  falls back to a rough estimate (`580 - active*680`) in the meantime.

## Behavior
- `useLayoutEffect` (re-runs whenever `active` changes) measures the
  active slide's `offsetLeft + offsetWidth/2` against the wrap's
  `clientWidth` and computes `offset` — deliberately uses layout-space
  `offsetLeft`/`offsetWidth`, **not** `getBoundingClientRect()`, so the
  measurement isn't corrupted by a still-animating CSS transform.
  Re-measures on `window resize`.
- Each slide is a real `<button type="button">` (not a bare `<div>`) with
  `aria-current` and `aria-label="Show testimonial from {name}"`; clicking
  a non-active slide calls `setActive(i)`.
- A visually-hidden (`sr-only`) `aria-live="polite"` region announces
  "Now showing testimonial from {name}, {role}" whenever `active` changes,
  for screen-reader users.
- Track transform: `translateX(${offset}px)`, `transition-transform
  duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]`.

## Visual Specs
- Section: `bg-paper` (was `bg-ink` — see note below), `pt-[130px] pb-[110px]`.
- Eyebrow: arrow icon + "WHAT CLIENTS SAY" (12px uppercase, `text-muted`;
  prototype's original copy had a typo, "WHAT CLIENT SAY" — fixed here).
- Wrap (`data-reveal-id="testimonialsWrap"`): horizontal mask-image fade
  at 14%/86%, `overflow-hidden`.
- Slide: `flex: 0 0 min(640px,88vw)`, `padding: 0 24px`, centered text.
  - Quote mark: 50px, weight 600, `text-brand` (`#00b450` — was `text-mint`
    `#74d39e`; swapped for a light background, where `mint` reads too pale
    to pop the way it did against `bg-ink`, matching the more saturated
    accent green `/work`/`/blog` already use for badges on light pages).
  - Quote text (`pai-testimonial-quote`): 30px, line-height 1.5,
    `tracking-[-0.01em]`, `text-text`, `text-pretty`.
  - Avatar: real 60px circular image (`border-ink/10`) if `avatarSrc` is
    set, else a 40px circle with the person's initials on a rotating hue
    from `AVATAR_HUES` (unchanged — these are saturated fill colors with
    `text-cream` initials, not white/black-dependent, so they read fine on
    either page background).
  - Name: 14px semibold `text-text`. Role: 12px `text-muted`.
  - Active slide: `opacity:1`, `scale(1)`, `filter:none`, `cursor:default`.
  - Inactive slides: `opacity:0.28`, `scale(0.9)`, `filter: blur(0.5px)`,
    `cursor:pointer`.

**Note:** this section (along with `Pricing`, see its own docs) was
originally styled dark (`bg-ink`) regardless of the rest of the light-mode
rollout, since only `/work`/`/blog`/`/faq` were in scope at the time. Later
changed to light (`bg-paper`) on the homepage itself, at the same
brightness/token mapping every other light page already uses — every
`text-white*`/`border-white*` value above became its `text-text`/
`text-muted`/`border-ink*` equivalent, one-for-one.

## Responsive Behavior
- **≤560px:** slide gets `px-3` container padding;
  `pai-testimonial-quote` drops to 21px.

## Accessibility
- Slides are real `<button>` elements (keyboard-focusable, Enter/Space
  activate) — improves on the source prototype's non-semantic
  `<div onClick>`.
- `aria-current` marks the active slide; `aria-live="polite"` region
  announces changes for assistive tech.
- Decorative icon is `aria-hidden="true"`; avatar images use empty
  `alt=""` (name is already conveyed as adjacent text) except the
  initials-circle which is `aria-hidden="true"` (redundant with the name
  text below it).
