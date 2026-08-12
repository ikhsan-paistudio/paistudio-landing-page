# ProcessSection

**File:** `src/components/sections/ProcessSection.tsx`
**Type:** Client component (`"use client"`) — local `activeId`/per-tile
`frame` state, `IntersectionObserver` + `setInterval` in `useEffect`s.
**Spec:** `content/sections/sec-04-process.md` — **stale**, describes an
earlier incarnation of this section entirely (see History below); treat
this doc, not that file, as current.
**Renders inside:** `app/saas-web-app-development/page.tsx`, plus the
`app/dev/sections/page.tsx` preview harness.

## Purpose
SEC-04 · Services (scroll-driven pinned accordion) — a two-column
services showcase: a sticky left column (eyebrow, heading, link) beside a
right column of accordion items whose active/expanded state is driven by
scroll position, agency-portfolio-site style. Each active item reveals a
description, a 4-tile autoplay bento image grid, and capability tag pills.

## History — this is a full redesign, not an iteration
This section previously shipped as **SEC-04 · Process / How We Work**: a
dark two-column timeline (fixed headline+subhead left, a glowing vertical
step timeline right, a full-width partnership banner below both). On
direct request ("sec-04 buat jadi gini" + a full spec), it was rebuilt
from scratch into a completely different concept, component name/file
path unchanged. The props interface, visual language (black-on-white, not
dark gradient), and interaction model share nothing with the previous
version — `content/sections/sec-04-process.md` (the original brief) no
longer describes what ships here at all.

## Props
```ts
{
  eyebrow: string;          // small uppercase label, e.g. "Service"
  headline: string;         // large heading, wraps naturally in the ~35% left column
  link: { label: string; href: string }; // e.g. { label: "See our work", href: "/work" }
  items: Array<{
    title: string;
    description: string;    // shown only while this item is active/expanded
    tags: string[];         // pill badges under the bento grid
  }>; // 3–4 items
}
```
Logs `console.error` in development if `items.length` isn't 3 or 4.
`link` should point somewhere real — never fabricate a destination (the
real page's usage points at `/work`; the spec's own literal example,
"Open Dribbble", only ships in the `/dev/sections` preview, where it's
placeholder like the rest of that harness's copy, `href="#"`).

## Behavior
- **Two-column layout**: left column (`~35%`, `grid-cols-[35%_1fr]`) is
  `sticky top-[104px]` — the exact same sticky offset/breakpoint
  `ServicesSection` (SEC-03) already established for its own sticky
  sidebar, reused rather than re-derived.
- **Scroll-driven activation**: each right-column item is a
  `min-h-[80vh]` "slot" (`id={slugify(item.title)}`) — the slot height
  isn't from real content (collapsed items are short); it exists purely
  to give each item a comfortable scroll dwell distance before the next
  one activates, a standard scrollytelling technique. For 3 items that's
  ~240vh of scroll runway, ~320vh for 4 — both within the spec's "roughly
  2–3× viewport height" target. The *same* `IntersectionObserver` +
  `rootMargin: "-140px 0px -60% 0px"` technique `ServicesSection` already
  uses (picks whichever intersecting slot's top edge is closest to the
  viewport top) drives `activeId` — chosen over GSAP/ScrollTrigger (this
  project has it installed, for `TestimonialStackSection`) because
  `position: sticky` + `IntersectionObserver` was one of the two
  approaches the spec explicitly named, and an equivalent mechanism was
  already proven in this exact codebase. "Pin release" past the last item
  isn't special-cased — same as `ServicesSection`, it falls out of plain
  `position: sticky` once the (taller) right column's grid row runs out.
- **Expand/collapse animation**: reuses this project's existing
  `.pai-faq-panel`/`.pai-faq-panel-inner`/`.pai-faq-open`/`.pai-faq-answer`
  classes (`globals.css`, built for `FaqSection`) — CSS grid-rows `0fr` →
  `1fr` (400ms) + opacity fade (300ms), both within the spec's 200–400ms
  ease-out range, already `prefers-reduced-motion`-aware. A collapsed
  item's description/bento/tags stay in the DOM at all times (never
  `display: none`) — same "answer always present" rule `FaqSection`
  follows.
- **Bento grid** (`BentoGrid`): 4 tiles via plain CSS Grid auto-flow, no
  `grid-template-areas` needed — a `col-span-2` tile fills row 1 (wide
  banner), a `row-span-2` tile at the start of row 2 spans rows 2–3 in
  column 1 (tall), and the two remaining default-sized tiles auto-place
  into column 2's rows 2 and 3 (squares, `aspect-square`). The wide/tall
  tiles have no fixed aspect ratio — they stretch (CSS Grid's default
  `align-items: stretch`) to fill whatever row height the squares
  establish.
- **Per-tile autoplay** (`AutoplayTile`): each tile cross-fades through
  its own placeholder "frames" (`Preview {n}/{count}`) on an independent
  `setInterval`, staggered via an `offsetMs` per tile so all 4 don't flip
  in lockstep — the "always alive" feel the spec asks for. Skips the
  interval entirely under `prefers-reduced-motion` (continuous background
  motion is exactly what that preference suppresses). Placeholder-only,
  per this project's established convention — a labeled box, not a
  fabricated image src; real screenshots can drop in per-frame later
  without changing the mechanism.
- **Mobile (`≤900px`, matching SEC-03's breakpoint)**: a genuinely
  separate, simpler DOM branch — no sticky, no `IntersectionObserver`, no
  per-item scroll slots, every item rendered already-expanded. This is
  the "simply list them all expanded" alternative the spec explicitly
  offered, chosen over "tap to expand" to avoid running a second,
  redundant active-state mechanism alongside the scroll-driven one.

## Visual Specs
- Left column: eyebrow 12px uppercase `text-muted`; headline `text-[56px]
  leading-[1.05] font-bold tracking-[-0.02em]` (`max-[900px]:text-[36px]`);
  link 15px, `hover:underline`, prefixed with a `↳` glyph.
- Right column item (desktop): number `text-[13px] text-ink/30`
  (zero-padded, e.g. "01"), title `text-[24px] font-bold
  tracking-[-0.01em]`, `border-t border-ink/10` above every item + a
  closing `border-b` after the last (thin hairline dividers throughout,
  per spec). Mobile item title drops to `text-[20px]`.
- Expanded content: description `max-w-[520px] text-[16px] leading-[1.6]
  text-muted`; bento grid `gap-3`, tiles `rounded-[16px] bg-[#E0E0E0]`;
  tags `rounded-full border border-ink/10 px-3 py-1.5 text-[12px]
  text-muted`, `flex-wrap`.
- Section: `data-nav-bg="light"` (black-on-white palette — this section
  has no background of its own).

## Responsive Behavior
- **≤900px:** two-column layout collapses to one; left column becomes
  `static` (sticky disabled); right column switches entirely to the
  simpler always-expanded mobile branch described in Behavior.
- **≤560px:** section side padding drops to `px-5`.

## Accessibility
- Autoplay bento frames are `aria-hidden` on every frame except the
  currently-visible one.
- Collapsed items' full content (description, bento captions, tags) is
  always present in the DOM, not just the currently-active item's —
  search engines/non-JS crawlers see everything regardless of scroll
  state.
- Autoplay entirely stops under `prefers-reduced-motion: reduce`.
