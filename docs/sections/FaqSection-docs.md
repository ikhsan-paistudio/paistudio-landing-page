# FaqSection

**File:** `src/components/sections/FaqSection.tsx`
**Type:** Client component (`"use client"`) — local `openIndex` state
(single-open accordion).
**Spec:** `content/sections/sec-10-faq.md` (original brief — see Behavior
for how far the shipped component has diverged from it)
**Renders inside:** `app/saas-web-app-development/page.tsx` (last section
before `FinalCtaFooter`), plus the `app/dev/sections/page.tsx` preview
harness.

## Purpose
SEC-10 · FAQ — objection handling and SEO value: an accordion of 5
page-specific Q&A pairs.

## Props
```ts
{
  headline: string;
  intro?: string;                              // optional subhead under the headline
  faqs: Array<{ question: string; answer: string }>; // exactly 5
}
```
Logs `console.error` in development if `faqs.length !== 5`.

**Content rule**: questions/answers (and `intro`, if used) must be
specific to the page's actual topic (e.g. "Can Airtable be self-hosted?"
has a different, factually distinct answer than the equivalent n8n
question) — do not search-and-replace one page's FAQ set into another's.
A copywriting requirement for whoever fills these props in; this
component renders whatever it's given.

## Behavior — how this diverged from the original spec
- **Header treatment redesigned to match the real `/faq` page** (on
  request — "create sec-04 sec-10 like /faq page"... rather, "create
  sec-10 like /faq page"): originally a plain `intro` paragraph above the
  accordion in a `max-w-[900px]` container. Now mirrors `app/faq/page.tsx`
  + `components/faq/FaqAccordion.tsx`/`FaqAccordionItem.tsx` directly —
  same 1240px container width, same big headline treatment, same 18px
  answer copy (bumped from 16px) — so a page assembled from this section
  library reads as the same product as the dedicated FAQ page, not a
  scaled-down variant. `headline` became a required prop as part of this
  change; `intro` became optional (an add-on subhead, not the section's
  only piece of copy).
- **Eyebrow removed**: this section briefly carried the same eyebrow
  treatment the `/faq` page itself uses (arrow icon + "FAQ" label) as part
  of the above redesign; removed on a direct follow-up request ("remove
  eyebrow in faq section"). The section now opens straight into the
  headline.
- **Critical DOM requirement** (unchanged from the original spec, a
  defect fix): answer text must be present in the rendered HTML at all
  times, even while visually collapsed — a prior page on this site only
  rendered FAQ answers on click, making them invisible to search engines
  and non-JS crawlers. Reuses this project's existing
  `.pai-faq-panel`/`.pai-faq-panel-inner`/`.pai-faq-open`/`.pai-faq-answer`
  classes (`globals.css`, already used by `FaqAccordionItem`) rather than
  inventing a new mechanism — a CSS grid-rows `0fr` → `1fr` trick, so the
  answer `<div>` is always in the DOM and its height animates via CSS,
  never `display: none` / conditional rendering, and is already
  `prefers-reduced-motion`-aware via that shared CSS.
- Accordion is single-open (opening one row closes whichever was open) —
  same interaction `FaqAccordion` uses, implemented locally here rather
  than importing that component (this section owns its own copy/props
  shape, distinct from the real `/faq` page's `FaqEntry`-driven content).

## Visual Specs
- Container: `pai-container max-w-[1240px] px-10 py-20`.
- Header block: `flex flex-col items-start gap-[18px]`; headline
  `text-[70px] leading-[1.04] font-bold tracking-[-0.56px]`
  (`max-[900px]:text-[50px] max-[560px]:text-[36px]`); intro (if present)
  `max-w-[640px] text-[18px] leading-[1.6] text-muted`.
- Accordion row: collapsed → `bg-transparent`; expanded →
  `bg-cream rounded-2xl`. Question button: `text-[18px] font-semibold
  text-text`, a "+"/"–" icon that morphs via a `scaleY` transform on the
  vertical stroke (not a swapped icon). Answer: `text-[18px]
  leading-[1.6] text-muted`.
- Whole content wrapper carries `pai-work-copy pai-armed pai-play` — this
  project's existing load-time entrance-animation classes (`globals.css`),
  same as the real `/faq` page.

## Responsive Behavior
- **≤900px:** container padding drops to `px-7`; headline → 50px.
- **≤560px:** container padding drops to `px-5`; headline → 36px.

## Accessibility
- Each row is a real `<button>` with `aria-expanded`/`aria-controls`; the
  answer panel has `role="region"` + `aria-labelledby` pointing back at
  the question button.
- Answer text is always in the DOM (see Behavior's DOM requirement) — no
  reliance on JS execution or click state for search engines/screen
  readers/non-JS crawlers to read every answer.
