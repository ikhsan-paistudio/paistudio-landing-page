# Marquee

**File:** `src/components/Marquee.tsx`
**Type:** Presentational component (no `"use client"` directive needed —
pure props-in, JSX-out, no hooks)
**Used by:** `WorkGallery` (vertical, pause-on-hover, project image
tiles), `CtaSection` (horizontal, no pause, tools logo row)

## Purpose
Generic infinite-loop marquee primitive. Renders its children twice
back-to-back and animates the track by exactly `-50%` on a seamless loop,
so the seam between the two copies is invisible.

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `direction` | `'vertical' \| 'horizontal'` | yes | — | Loop axis. Vertical uses the `pai-vmarquee` CSS class/keyframe (`translateY(-50%)`, 40s linear infinite); horizontal uses `pai-hmarquee` (`translateX(-50%)`, 26s linear infinite). Durations are fixed in `app/globals.css`, not configurable via props. |
| `children` | `ReactNode` | yes | — | The set of items to loop. Rendered **twice** internally — pass one copy in, the component handles duplication. |
| `pauseOnHover` | `boolean` | no | `false` | When true, adds a Tailwind `hover:[animation-play-state:paused]` modifier to the track. |
| `className` | `string` | no | `''` | Extra classes merged onto the track element (e.g. layout/positioning overrides from the consumer). |
| `style` | `CSSProperties` | no | — | Extra inline styles merged onto the track (spread after the direction-based defaults, so callers can override `width`/`flexDirection` if needed). |

## Dependencies
None — no data files, no context, no other components.

## Behavior
- `direction === 'vertical'` → track is `flex-direction: column`.
- `direction === 'horizontal'` → track is `flex-direction: row`,
  `width: max-content` (required so the flex row doesn't wrap/shrink).
- Children are rendered as `{children}{children}` — i.e. the exact same
  React nodes twice. Callers are responsible for giving list items stable
  `key`s within their own map (the duplication itself doesn't add keys,
  so duplicate key warnings will occur if the caller's `key`s aren't
  unique per render pass — in practice this hasn't been an issue because
  React scopes key uniqueness per parent, and each `{children}` block is
  a distinct child of the track).

## Visual Specs
No inherent visual styling of its own (no background, no padding) — it's
purely a looping-flex-container primitive. All visual styling (tile
appearance, gaps, sizes) is the responsibility of the children passed in
by the consumer.

## Responsive Behavior
None built in — direction and animation duration are fixed regardless of
viewport. Consumers apply their own responsive sizing to the children.

## Accessibility
- No ARIA of its own. Consumers should mark the second (duplicate) copy
  as `aria-hidden` if the repeated content would otherwise be confusing
  to screen readers — not currently done automatically by this component
  (a known gap, since the component has no way to distinguish "first"
  vs. "duplicate" child render at the DOM level without extra markup).
