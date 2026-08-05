# FixedBackground

**File:** `src/components/FixedBackground.tsx`
**Type:** Client component (`"use client"`) — uses `useScrollDriver`
**Renders inside:** `app/page.tsx`, first child (behind everything else,
`z-index: 0`)

## Purpose
Hosts the fixed, viewport-pinned background layer: the scroll-driven
gradient (white hero → dark green CTA) and, inside it, the `ThreeLogoBackground`
3D scene host. This is what makes the 3D logo and background color
morph appear to scroll independently of page content.

## Props
None.

## Dependencies
- `useScrollDriver()` — calls `setHeroBgEl`, `setGlHostEl`; reads
  `logoMode` (passed through as a prop to `ThreeLogoBackground`)
- `next/dynamic` — lazy-loads `ThreeLogoBackground` with `{ ssr: false }`
  (Three.js/WebGL must never run on the server)

## Behavior
- Outer div (`ref={setHeroBgEl}`): `fixed`, `top-0 right-0 left-0`,
  `h-[150vh]`, `z-0`, `pointer-events-none`, `overflow-hidden`. The scroll
  driver writes its computed CSS `background` gradient string to this
  element's `style.background` every scroll tick — see
  `useScrollDriver-docs` (n/a — documented in the hook itself, not a
  component) for the exact gradient math.
- Inner div (`ref={setGlHostEl}`): `absolute`, `top-0 right-0 left-0`,
  `h-screen`, `z-0`, `pointer-events-none`. The driver writes `opacity`
  and `transform` (translate3d) to this element every tick, to fade/move
  the whole 3D-logo layer as the hero scrolls away and the CTA section
  approaches.
- Renders `<ThreeLogoBackground logoMode={logoMode} />` inside the glHost
  div. `logoMode` is `'hero' | 'cta'`, a discrete value from the scroll
  driver's React state (changes rarely, unlike the continuous
  opacity/transform writes above which bypass React entirely for
  performance).

## Visual Specs
No visual output of its own beyond the two wrapper divs — this is a
positioning/mounting shell. All visible output comes from `background`
(driven imperatively) and the child `ThreeLogoBackground` canvas.

## Responsive Behavior
None component-specific — the 3D canvas resizes itself via its own
internal `resize` handler (see `ThreeLogoBackground-docs.md`).

## Accessibility
- Fully `pointer-events-none` and decorative — correctly excluded from
  the interaction and accessibility tree by virtue of having no
  interactive or text content.
