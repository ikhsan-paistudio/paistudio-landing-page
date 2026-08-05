# FaqAccordion

**Files:** `src/components/faq/FaqAccordion.tsx` (client, open/close
state), `src/components/faq/FaqAccordionItem.tsx` (client, one row),
`src/lib/content/faq.ts` (Node-only content loader, not a component)
**Type:** Client components (`"use client"`); the content loader is a
plain function that reads the filesystem — only callable from a Server
Component
**Used by:** `app/faq/page.tsx` only

## Purpose
Single-open FAQ accordion. Content is not hardcoded in the component —
`getFaqEntries()` reads every `.md` file in `content/faq/` at request
time and parses each into a question + answer.

## Content source: `content/faq/*.md`
One real markdown file per question, no frontmatter/YAML — kept
intentionally simple:

```md
# What does Paistudio actually build?

Answer paragraph one.

Answer paragraph two, if needed.
```

- The file's only `# ` heading is the question.
- Everything after it is the answer, split into separate `<p>`s on blank
  lines.
- Filenames are prefixed `01-`, `02-`, ... to control display order
  (`getFaqEntries()` sorts filenames, then strips the numeric prefix and
  `.md` for the entry's `slug`, used to build stable `id`s for
  `aria-controls`).
- Adding/editing a question is a content change only — drop a new
  `NN-something.md` file in `content/faq/`, no component edit needed.

## `getFaqEntries(): FaqEntry[]`
`FaqEntry = { slug: string; question: string; answerParagraphs: string[] }`.
Node-only (`fs`/`path`), so it can only run in a Server Component —
`app/faq/page.tsx` calls it directly and passes the array down to
`<FaqAccordion entries={...} />` as a prop.

## `FaqAccordion`
| Prop | Type | Description |
|---|---|---|
| `entries` | `FaqEntry[]` | Rendered in array order (already sorted by `getFaqEntries()`). |

- Local state: `openSlug: string | null`, starts `null` (all collapsed).
- Toggling an entry sets `openSlug` to that entry's slug, or back to
  `null` if it was already open — since only one `openSlug` exists, opening
  a new entry automatically closes whichever was previously open.
- Keyboard support (Enter/Space to toggle, natural focus order) comes for
  free from `FaqAccordionItem` using a real `<button>` — no key handling
  code needed.

## `FaqAccordionItem`
| Prop | Type | Description |
|---|---|---|
| `entry` | `FaqEntry` | The question/answer to render. |
| `isOpen` | `boolean` | Controlled by the parent's `openSlug`. |
| `onToggle` | `() => void` | Calls the parent's toggle for this entry's slug. |

### Behavior
- Row wrapper: `bg-cream` + `rounded-2xl` only while `isOpen` (`bg-transparent`
  otherwise) — collapsed rows have no background, separated purely by the
  button's own `py-6` vertical padding, no border lines (per the design
  spec this was built from).
- Question button: real `<button aria-expanded aria-controls>`, question
  text left, a thin "+"/"–" icon right. The icon is one horizontal +
  one vertical SVG line; the vertical line's `scaleY` animates to `0` when
  open (morphing "+" into "–"), a plain `transition-transform` — not
  reduced-motion-gated, matching this app's existing precedent for short
  (~300ms) button-icon state transitions (see `docs/animation-specs.md`'s
  reduced-motion section re: ProgressRail/Testimonials-track transitions).
- Answer panel: `<div id={panelId} role="region" aria-labelledby={buttonId}>`
  wrapping a `.pai-faq-panel`/`.pai-faq-panel-inner`/`.pai-faq-answer`
  structure (`globals.css`) — a CSS Grid `grid-template-rows: 0fr → 1fr`
  transition (`0.4s cubic-bezier(0.22,1,0.36,1)`, the app's standard
  easing) drives the *height* animation without ever measuring
  `scrollHeight` in JS, and a separate `opacity` transition on the inner
  content fades the answer in/out. Both are disabled under
  `prefers-reduced-motion: reduce` in the same shared media-query block
  `globals.css` already uses for every other reveal/marquee animation.

## Visual Specs
- Question: `text-[18px] font-semibold text-text`.
- Answer paragraphs: `text-[18px] leading-[1.6] text-muted` (same
  body-paragraph treatment as `DetailSection`'s body copy).
- Row background when open: `bg-cream` (the same light-gray card surface
  used by `FeaturedPostCard`/`AuthorCard`), `rounded-2xl` (16px — within
  the page's own eyebrow/heading container, not the app's usual
  `rounded-[32px]` big-card radius).
- Icon: `18×18px`, `stroke="currentColor"` at `1.5px`, round linecaps —
  matching the stroke-width/color conventions of every other inline icon
  in this app (Nav hamburger, LetsTalkMenu icons, the eyebrow arrow).

## Page header (`app/faq/page.tsx`, not a separate component)
Left-aligned eyebrow ("FAQ", the same small diagonal-arrow-icon +
uppercase-tracked-text pattern as `CtaSection`/`Pricing`/`FinalCtaFooter`'s
eyebrows, adapted to light mode via `text-muted`/`currentColor` instead of
`text-white/60`) + a large bold heading, reusing `DetailHero`'s exact
title cascade (`70/50/36px`, `font-bold`) rather than `/work`'s 100px h1 —
better suited to a page heading than a full hero. Both mount-reveal via
the existing `pai-work-copy pai-armed pai-play` pattern (see
`docs/animation-specs.md` §6), same as `/work`'s and `/blog`'s headers.

## Accessibility
- Each row's question is a real `<button type="button" aria-expanded
  aria-controls>`.
- Each answer panel is `role="region" aria-labelledby={buttonId}` and
  `id`-matched to the button's `aria-controls`.
- Keyboard: focus order follows DOM order (one button per row); Enter/Space
  toggle via native `<button>` behavior; no custom `onKeyDown` needed.
- Height/opacity motion is disabled under `prefers-reduced-motion: reduce`
  (panel snaps open/closed instantly instead).
