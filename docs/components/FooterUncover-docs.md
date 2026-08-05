# FooterUncover

**File:** `src/components/FooterUncover.tsx`
**Type:** Client component (`"use client"`) — uses `useScrollDriver`
**Renders inside:** `app/page.tsx`, wrapping `FinalCtaFooter` as its last child

## Purpose
Registers the footer element with the scroll driver so it can apply the
"uncover" reveal effect: a clip-path wipe + a small rise, synced to how
far the footer has scrolled into view, making it read as already sitting
there and being progressively revealed — rather than just scrolling in
like every other section.

## Props
| Prop | Type | Required | Description |
|---|---|---|---|
| `children` | `ReactNode` | yes | The footer content to wrap (currently always `<FinalCtaFooter />`). |

## Dependencies
- `useScrollDriver()` — calls `setFooterEl`; the actual reveal math lives
  in the scroll driver's shared tick (`src/lib/scroll/useScrollDriver.tsx`),
  not in this component — this component is just the registration point.

## Behavior
- Purely a thin wrapper: `<div ref={setFooterEl}>{children}</div>`. All
  continuous-value writes (`clip-path`, `transform`) happen imperatively
  inside the scroll driver's per-tick `update()`, following the same
  pattern as the hero parallax/fade and the background gradient morph —
  no local state, no re-renders driven by scroll.
- Reveal math (for reference, lives in `useScrollDriver.tsx`): each tick,
  reads the wrapped element's `getBoundingClientRect()`, computes a 0→1
  progress over a short `vh * 0.4` scroll distance once the element's top
  crosses into the viewport, applies an ease-out curve, then writes
  `clip-path: inset(clipTop% 0 0 0)` (capped so at least the bottom 45% is
  always visible — avoids a "blank box" dead zone during the wipe) and a
  small `translate3d(0, ..., 0)` rise (max 22px) that resolves to 0 as
  progress reaches 1.
- Respects `prefers-reduced-motion: reduce` — clip-path and transform are
  both cleared (`none`) so the footer just renders normally with no wipe.

## Design note — why not `position: sticky`
The more common version of this trick (`position: sticky; bottom: 0` on
the footer, with the preceding section given a negative `margin-bottom`
equal to the footer's height) was tried first and reverted: in this
environment, that combination renders the footer permanently "stuck" at
the very top of the page from scroll position 0, confirmed via manual
testing in an isolated minimal repro (not specific to this app's other
code). The scroll-tick-driven `clip-path` approach reproduces the same
visual outcome without depending on that sticky/negative-margin
interaction.

## Visual Specs
No styling of its own beyond the wrapping `<div>` — all visual treatment
comes from `FinalCtaFooter`'s own styles (rounded top corners, dark green
gradient) plus the imperative clip/transform writes described above.

## Responsive Behavior
None built in — the underlying reveal distance (`vh * 0.4`) is
viewport-height-relative, so it scales naturally across breakpoints
without separate mobile/desktop logic.

## Accessibility
- No ARIA of its own; purely a positioning/animation registration
  wrapper around `FinalCtaFooter`, which carries its own accessible
  markup.
- The clip-path animation is fully disabled under
  `prefers-reduced-motion: reduce`.
