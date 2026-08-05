# HoverBubble

**File:** `src/lib/hover-bubble/HoverBubble.ts` (framework-agnostic class +
`initHoverBubbles`), `src/lib/hover-bubble/useHoverBubbles.ts` (`"use
client"` React hook wrapper)
**Type:** Not a React component — a vanilla DOM utility class plus a thin
hook that wires it into React's lifecycle. Nothing here is rendered as
JSX; it's applied to existing markup via CSS classes (see Markup
contract).
**Used by:** `ProjectCard` (`/work`, hook called once in `ProjectGrid`),
`BlogPostCard` + `FeaturedPostCard` (`/blog`, hook called once in
`BlogPageBody`; `/blog/[slug]`'s related-posts grid, hook called once in
`RelatedPosts`)

## Purpose
Cursor-follow "hover bubble" effect for card/link elements: a small
circular label (e.g. "View") that trails the mouse with a lerped delay
while hovering a card, and tweens in/out on enter/leave.

## Markup contract
Any card that wants the effect needs a `.pai-hover-card` container
(`position: relative; overflow: hidden` — see `globals.css`) with a
`.pai-hover-bubble` child inside it:

```html
<a class="pai-hover-card">
  <img ... />
  <div class="pai-hover-bubble"><span>View</span></div>
</a>
```

Everything else about the card (radius, sizing, link href, badge overlays,
etc.) is entirely up to the component using it — this contract only cares
about those two class names existing in that parent/child relationship.

## API
### `HoverBubble` class
| Member | Description |
|---|---|
| `new HoverBubble(card, options?)` | Wires up one card element. Throws if it has no `.pai-hover-bubble` child. |
| `options.lerpFactor` | Position lerp factor applied per frame, 0-1 (higher = snappier follow). Default `0.15`. |
| `options.tweenDuration` | Scale/opacity in/out tween duration in ms. Default `350`. |
| `.destroy()` | Removes all listeners and cancels the animation loop. |

### `initHoverBubbles(selector = '.pai-hover-card')`
Bulk-initializes `HoverBubble` on every element matching `selector`, each
with fully independent mouse/lerp/tween state. Returns a dispose function
that tears every instance down.

### `useHoverBubbles(selector = '.pai-hover-card', deps = [])`
`"use client"` React hook. Calls `initHoverBubbles` inside a `useEffect`
and returns its dispose function as the effect's cleanup. **Call this once
per page/section that renders a set of cards — not once per card** (see
Wiring pattern below); it queries the DOM for every matching
`.pai-hover-card` currently mounted, all at once.

`deps` is an extra dependency list appended after `selector` — pass
whatever value changes when the set of rendered cards changes without the
calling component itself remounting (e.g. a filtered array), so the scan
re-runs and newly-shown cards get wired up too. Defaults to `[]` (scan
once on mount), which is all `ProjectGrid`/`RelatedPosts` need since their
card set is fixed; `BlogPageBody` passes `[showFeatured, filteredPosts]`
because its cards change when the category filter changes.

## Behavior
- **Position:** on `mousemove`, tracks the cursor relative to the card,
  offset so the bubble is centered on it. The bubble's `current` position
  lerps toward that target every animation frame
  (`currentX += (targetX - currentX) * lerpFactor`) — this produces the
  trailing/chasing motion instead of a 1:1 follow.
- **Scale/opacity:** share one eased 0→1 progress value, tweened via a
  timestamp (not lerp — lerp never fully settles, and the effect wants a
  bounded ~350ms in/out) with an ease-out-cubic curve. Both values are
  baked into the same `transform: translate() scale()` + `opacity` write
  every frame — no CSS transition is used on `transform`, since a CSS
  transition would fight the per-frame JS writes and produce jittery
  motion.
- The animation loop starts on `mouseenter` and keeps running while
  hovering (so position keeps chasing new `mousemove` targets). After
  `mouseleave` it keeps running only until the out-tween settles, then
  self-cancels — it does not run forever in the background.
- `prefers-reduced-motion: reduce` skips the lerp/tween entirely: the
  bubble snaps instantly to the cursor position and full opacity/scale on
  enter, and back to hidden on leave — no motion, just a state change.

## Wiring pattern
Each card component renders its own `.pai-hover-card`/`.pai-hover-bubble`
markup but does **not** call the hook itself. The hook is called once, by
whichever component renders the *set* of cards, so `initHoverBubbles()`
only queries/instantiates once per mount rather than once per card:

| Page | Card component(s) | Hook called in |
|---|---|---|
| `/work` | `ProjectCard` (grid) | `ProjectGrid.tsx` |
| `/blog` | `FeaturedPostCard` + `BlogPostCard` (grid) | `BlogPageBody.tsx` |
| `/blog/[slug]` | `BlogPostCard` (related posts grid) | `RelatedPosts.tsx` |

## Visual Specs (`globals.css`)
- `.pai-hover-card`: `position: relative; overflow: hidden;` — nothing
  else. Radius/sizing is added per usage (e.g. `rounded-[32px]` is on the
  className string in `ProjectCard`/`BlogPostCard`/`FeaturedPostCard`
  directly, not baked into this shared class).
- `.pai-hover-bubble`: `115×115px` circle (`border-radius: 999px`),
  `background: #fff`, `font-weight: 600`, centered flex content,
  `opacity: 0; transform: scale(0)` at rest (JS drives both to `1` on
  hover), `pointer-events: none` (so it never blocks clicks on the card
  underneath), `will-change: transform, opacity`.
- Label text size/color is set per usage, not by this base class — every
  current usage adds `text-[13px] text-center leading-[1.2]
  tracking-[0.01em] text-ink` on the bubble `<div>` directly.

## Accessibility
- `.pai-hover-bubble` is `pointer-events: none` and purely a decorative,
  duplicate label ("View") over a card that already has a real accessible
  name via its heading/image alt text — it adds no separate interactive
  target.
- Respects `prefers-reduced-motion` (see Behavior) — users who've opted
  out get an instant, non-animated hover state instead of no effect at
  all.
