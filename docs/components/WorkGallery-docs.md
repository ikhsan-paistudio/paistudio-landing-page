# WorkGallery

**File:** `src/components/WorkGallery.tsx`
**Type:** Client component (`"use client"`) — uses `useScrollDriver`
**Renders inside:** `app/page.tsx`, after `Hero`

## Purpose
The pinned, scroll-jacked horizontal "Our Work" gallery. Six project
panels, each a 2-column layout (copy left, auto-scrolling image marquee
right), that translate horizontally as the user scrolls vertically through
one tall section.

## Props
None. Reads project data from `PROJECTS` (`src/lib/data/projects.ts`).

## Dependencies
- `PROJECTS` — `src/lib/data/projects.ts` (6 entries: id, name, desc,
  skills[], gallery[])
- `useScrollDriver()` — consumes `activeProject`; calls `setPinEl`,
  `setPinInnerEl`, `setTrackEl`, `setProjectCount`
- `Marquee` (`./Marquee.tsx`) — vertical, pause-on-hover, for the per-project
  image tiles
- Global CSS classes `pai-work-copy` / `pai-armed` / `pai-play` (defined in
  `app/globals.css`) drive the staggered text-reveal animation

## Behavior
- On mount, calls `setProjectCount(PROJECTS.length)` so the scroll driver
  knows the travel distance (`(n-1) * 100vh`) for its pin math.
- Section height is `${PROJECTS.length * 100}vh` (dynamic — not hardcoded),
  i.e. 600vh for 6 projects.
- Renders one invisible 1px-wide, 100vh-tall marker per project
  (`top: i*100vh`) purely as scroll-snap stops; not visually rendered.
- `setPinEl` is attached to the outer `<section>` (used by the driver to
  read `getBoundingClientRect()` and compute scroll progress).
- `setPinInnerEl` is attached to the `position: sticky; top: 0; h-screen`
  inner wrapper (the driver writes `opacity`/`translateY` to this during
  the hero→CTA exit transition).
- `setTrackEl` is attached to the flex track (`width: max-content`); the
  driver writes `translate3d(-progress * (n-1) * vw, 0, 0)` to it every
  scroll tick.
- Each project slide's copy column gets class
  `pai-work-copy pai-armed` + `pai-play` only when
  `i === activeProject` — `pai-armed` hides children (`opacity:0`),
  `pai-play` plays a staggered `paiTextIn` animation per child. Whole slide
  also plays `paiCardIn` once on mount (inline `animation` style).
- The right-hand marquee is not per-project-real-imagery yet: it renders
  `project.gallery` (6 placeholder slots, currently `"1"`–`"6"`) as
  generic gray tiles labeled `IMAGE {slot}`. Swapping in real screenshots
  later only requires changing the `gallery` array's contents in the data
  file — no markup change needed.

## Visual Specs
- Slide: `100vw` × `100vh`, `flex items-center`.
- Inner grid (`pai-work-grid`): 2 columns, `gap-14`, `px-[92px]`.
- Left column: eyebrow (arrow icon + "Our Work", 12px uppercase,
  `text-deep`), `<h2 class="pai-work-h2">` project name (70px, weight 700,
  `text-deep`), description (18px, weight 500, `max-w-[500px]`), skill
  pills (`bg-pill` `#d5e798`, `rounded-full`, 14px).
- Right column (`pai-work-gallery`): `h-[88vh]`, `overflow-hidden`,
  vertical mask-image fade at top/bottom 6%/94%. Tiles: `#d9d7d0`
  background, `16:10` aspect ratio, `rounded-[32px]`, `border-black/8`,
  12px muted-colored label centered.
- Marquee loop: 40s linear infinite, translateY(-50%), **pauses on
  hover** (`pauseOnHover` prop passed to `Marquee`).

## Responsive Behavior
- **≤900px:** `pai-work-grid` collapses to 1 column, `gap-7`;
  `pai-work-gallery` height drops to `44vh`. The horizontal-pin scroll
  mechanism itself is **not** disabled at this width (inherited from the
  source prototype) — see the project's implementation plan for the
  flagged iOS Safari jank risk.
- **≤560px:** `pai-work-h2` drops to 32px.

## Accessibility
- Scroll-snap markers are `pointer-events-none` and purely structural.
- Skill pills and copy are plain text, no interactive elements inside a
  slide.
- Known gap: the horizontal scroll-jacking has no keyboard-operable
  equivalent (matches source prototype; not yet remediated).
