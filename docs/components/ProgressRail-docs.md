# ProgressRail

**File:** `src/components/ProgressRail.tsx`
**Type:** Client component (`"use client"`) — uses `useScrollDriver`
**Renders inside:** `app/page.tsx`, after `Nav`, before `Hero`

## Purpose
Fixed vertical stack of 6 dots on the right edge of the viewport, one per
project in the `WorkGallery`. Only visible while the pinned work gallery
is on-screen; the active dot elongates and highlights to show scroll
progress through the 6 projects, and each dot is clickable to jump
directly to that project.

## Props
None. Reads `PROJECTS` from `src/lib/data/projects.ts` for the count/labels.

## Dependencies
- `PROJECTS` — `src/lib/data/projects.ts`
- `useScrollDriver()` — reads `activeProject`; calls `goto(index)` on
  click

## Behavior
- `visible = activeProject >= 0 && activeProject < PROJECTS.length` — the
  scroll driver only sets `activeProject` to a valid index while the
  `WorkGallery` pin section is scrolled to `overLightWork` position;
  otherwise it's `-1` and the whole rail fades out (`opacity:0`,
  `pointer-events:none`).
- Clicking a dot calls `goto(i)`, which the scroll driver implements as
  `window.scrollTo({ top: (i+1) * window.innerHeight, behavior: 'smooth' })`.

## Visual Specs
- Fixed, `top-1/2 right-[30px]`, `-translate-y-1/2`, `z-40`, `flex-col`,
  `gap-3.5`, `items-end`.
- Each dot: rendered inside a real `<button>` (padding `p-1` as a larger
  hit target around the small visual dot).
  - Active dot: `width: 22px`, `height: 7px`, `background: #374a3e`.
  - Inactive dot: `width: 7px`, `height: 7px`,
    `background: rgba(26,24,19,0.22)`.
  - Transition: `all 350ms cubic-bezier(0.22,1,0.36,1)`.
- Dot colors are dark (`#374a3e` / near-black-transparent) — this is
  correct/intentional because the rail is only ever visible while the
  white "Our Work" section is behind it (see Behavior above), so dark
  dots read correctly against a light background.

## Responsive Behavior
None — no breakpoint overrides; the rail keeps the same fixed position
and size at all viewport widths (matches source prototype).

## Accessibility
- Each dot is a real `<button type="button">` with `aria-label="Go to
  {project name}"` and `aria-current={on}` — keyboard-focusable and
  screen-reader-labeled, an improvement over the source prototype's
  non-semantic `<div onClick>`.
