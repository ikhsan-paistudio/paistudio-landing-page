# TestimonialStackSection

**File:** `src/components/sections/TestimonialStackSection.tsx`
**Type:** Client component (`"use client"`) — GSAP + `ScrollTrigger`
side effects in a `useEffect`; no spec file (built directly from a
detailed one-off request, not one of the original `content/sections/*.md`
briefs).
**Renders inside:** currently only `app/dev/sections/page.tsx` (preview
harness) — not yet wired into any of the 12 real target pages.

## Purpose
SEC-04B · Pinned Testimonial Stack — a scroll-jacked, full-viewport
testimonial section: the section pins in place while the user scrolls,
and each testimonial card cross-fades into the next one in the exact same
position, rather than the page scrolling past a normal list.

## Props
```ts
{
  heading: string;
  /** Defaults to TESTIMONIALS from src/lib/data/testimonials.ts */
  testimonials?: Array<{ name: string; role: string; quote: string; avatarSrc?: string }>;
}
```
`testimonials` defaults to the **same real content**
`src/components/Testimonials.tsx` already uses (`TESTIMONIALS` from
`src/lib/data/testimonials.ts` — Marcus Okafor/LinkGenius, Sittiporn
Charoensrichai/AI Lawfirm, Priya Raman/SalesHub) — reused directly rather
than fabricated placeholder quotes, per request ("dengan content yg
sama"). Still overridable per page like every other section in this
library. Logs `console.error` in development if fewer than 2 testimonials
are passed (the cross-fade needs at least 2 to do anything).

## Dependencies
- `gsap` + `gsap/ScrollTrigger` — newly installed for this component; not
  used anywhere else in the project. Plugin registered once at module
  scope, guarded by `typeof window !== "undefined"` for SSR safety.
- `useReduceMotion()` (`src/lib/scroll/useScrollDriver.tsx`) — this
  project's existing hook, already used by `FinalCtaFooter`/`Testimonials`.
- `TESTIMONIALS`/`AVATAR_HUES` (`src/lib/data/testimonials.ts`),
  `Testimonial` type (`src/types/content.ts`).

## Behavior
- **Pin + scrub**: `ScrollTrigger.create({ trigger: pinRef.current, start:
  "top top", end: () => "+=" + cards.length * window.innerHeight, pin:
  true, scrub: true, animation: tl })` — pins for exactly
  `testimonials.length * 100vh` of scroll.
- **Timeline**: a `gsap.timeline()` with one cross-fade segment per card
  transition — card `i` animates `{opacity: 0, y: -40, scale: 0.94}`
  (fades out, translates up, shrinks slightly) at the same timeline
  position as card `i+1` animating in from `{opacity: 0, y: 40}` to
  `{opacity: 1, y: 0, scale: 1}`. All cards are `position: absolute
  inset-0` (stacked in the exact same spot); at rest only card 0 starts
  visible (`gsap.set` on mount), the rest start at `opacity: 0`.
- **Heading entrance**: a separate, non-scrubbed `ScrollTrigger`
  (`start: "top 85%"`, `toggleActions: "play none none reverse"`)
  animating the heading `scale: 0.7 → 1` + fade as the section enters
  view — independent of the pin trigger.
- **Responsive gate**: the pinned cross-fade only initializes inside
  `gsap.matchMedia().add("(min-width: 768px)", ...)` — matches Tailwind's
  own `md` breakpoint, the same one the `hidden md:block`/`md:hidden` CSS
  toggle between the two DOM branches uses, so the JS gate and the visual
  toggle always agree. Below that breakpoint a **structurally different**,
  simpler DOM branch renders instead (plain vertically-stacked card list,
  no `position: absolute`, no GSAP at all) rather than the same markup
  with the animation switched off.
- **Reduced motion**: `useReduceMotion()` true → skips the pin, the
  timeline, and the heading entrance animation entirely; `gsap.set()`
  snaps every card and the heading straight to their resting/visible
  state (opacity 1, no transform) with `clearProps` so no animation ever
  runs.
- **Cleanup**: everything above runs inside `gsap.context(() => {...},
  pinRef)`; the effect's cleanup calls `ctx.revert()`, which tears down
  the ScrollTrigger instances, the timeline, and the `gsap.matchMedia()`
  query together (matchMedia created inside a context is
  context-scoped) — no stale triggers survive a remount or a route
  change.

**Known trade-off** (documented in the component's own doc comment): the
desktop cards' invisibility (cards 2+ at `opacity: 0`) is only ever
applied via `gsap.set` at runtime — a JS-free desktop viewport would see
them all overlapping at full opacity. This is treated as acceptable
because the two real accessible fallback paths (`<768px` and
`prefers-reduced-motion`) are both handled structurally; a true no-JS
desktop visitor is the one case left uncovered, and real assistive tech /
search crawlers read DOM text regardless of visual stacking.

## Visual Specs
- **Desktop (`≥768px`)**: `h-screen` pinned area; decorative dot-grid SVG
  (`<pattern>` of 2px circles on a 28px grid, radial-gradient `<mask>`
  fading the edges) centered behind the stack at `900×900px`,
  `text-ink/[0.08]`. Heading: `max-w-[720px]` centered, `text-[48px]
  leading-[1.1] font-bold tracking-[-0.02em]`. Card stack:
  `h-[380px] max-w-[880px]`; each card `rounded-[32px] bg-white
  shadow-[0_24px_64px_rgba(0,0,0,0.14)]`, an h-stack — a `38%`-width
  avatar/photo panel (`bg-cream`) on one side, quote (`text-[22px]
  leading-[1.5]`) + name (`text-[15px] font-semibold`) + role
  (`text-[13px] text-muted`) on the other (`p-12`).
- **Mobile (`<768px`)**: plain heading (`text-[32px]`) above a `gap-5`
  column of cards, each `rounded-[24px] bg-white p-6
  shadow-[0_12px_32px_rgba(0,0,0,0.08)]`, avatar+name/role row above the
  quote.
- Avatar fallback (no `avatarSrc`): initials in a colored circle, cycling
  through `AVATAR_HUES`.

## Responsive Behavior
See Behavior — the `<768px` breakpoint swaps the entire layout strategy,
not just spacing/type-scale adjustments within one shared DOM tree.

## Accessibility
- `useReduceMotion()` fully disables the pin/scroll-jack for
  motion-sensitive users (see Behavior).
- Dot-grid SVG is `aria-hidden="true"`.
- Avatar-fallback initials span is `aria-hidden="true"` (name is already
  visible as text alongside it).
- Quote text and attribution are always present in the DOM for every
  card, on both breakpoints — never conditionally rendered based on which
  card is "active."
