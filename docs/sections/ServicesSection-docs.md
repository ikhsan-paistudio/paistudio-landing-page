# ServicesSection

**File:** `src/components/sections/ServicesSection.tsx`
**Type:** Client component (`"use client"`) — local `activeId` state,
`IntersectionObserver` in a `useEffect`.
**Spec:** `content/sections/sec-03-services.md` (original brief — see
Behavior for how far the shipped component has diverged from it)
**Renders inside:** `app/saas-web-app-development/page.tsx`, plus the
`app/dev/sections/page.tsx` preview harness.

## Purpose
SEC-03 · Services — a sticky-sidebar, scroll-spy layout: a fixed left
column (heading + tab list) stays pinned while the right column's stack
of content panels scrolls underneath it, the active tab tracking whichever
panel currently sits nearest the top of the viewport.

## Props
```ts
{
  headline: string; // e.g. "Your Partner in Building SaaS Products, Efficiently."
  tools: Array<{
    label: string;         // tab label; also the right-column panel's subheading
    description: string;   // 1–2 sentences
    previewLabel?: string; // caption for the placeholder screenshot, e.g. "Pipeline kanban board"
  }>;
}
```
Originally spec'd/built for exactly 3 `tools`; the real content this
shipped with ended up being 5 items ("ini contentnya yg bener"), so the
count is no longer fixed — any number renders correctly, and the
dev-only `console.error` length check that used to enforce exactly 3 was
removed.

## Behavior — redesigned from the original spec
The original spec was a static numbered vertical list. On direct request
this shipped instead as:
- **Scroll-spy** — the exact same technique this project already uses for
  the blog article page's table of contents
  (`components/blog/detail/TableOfContents.tsx`): an `IntersectionObserver`
  over each panel (`id={slugify(tool.label)}`), picking whichever
  intersecting panel's top edge is closest to the viewport top.
  `rootMargin: "-140px 0px -60% 0px"` — a negative top margin so a panel
  only "counts" once its heading has cleared the sticky nav, and a large
  negative bottom margin so only the panel or two nearest the top of the
  viewport are ever candidates.
- **Sticky release** isn't special-cased — it falls out of plain
  `position: sticky` (`sticky top-[104px]`) + CSS Grid
  (`grid-cols-[360px_1fr]`): the left column's grid cell stretches to the
  row's height (the right column's, since it's far taller), so the sticky
  element naturally stops sticking once its cell runs out, exactly at the
  end of the right column's content. Same structural pattern
  `ArticleSidebar`/`ArticleBody` already use for the blog article layout.
- **Accent color**: the request's "blue" active state became this
  project's actual accent (`--color-brand`, green) — there's no blue
  anywhere in this project's palette.
- **No eyebrow pill** — this section originally shipped with a "Key
  Tools" pill label above the heading; removed on a follow-up ("remove
  the pill key tools").
- **Tab borders**: inactive tabs have no visible left border at rest —
  `border-l-2 border-transparent` vs. active's `border-l-2 border-brand`
  — so the border is always reserved space (no 2px layout shift on
  activation), just invisible until active. Requested explicitly:
  "dibawah header itu textnya jangan ada left bordernya kecuali yg lagi
  dalam active state."
- **No divider between right-column panels** — an earlier pass had a
  `border-t` between panels; removed on request ("hapus line antar
  section di stack sebelah kanan"). Panels are just `py-14 first:pt-0`.
- **Tab list gap** tightened from the original spacing on a follow-up
  request ("gap antar navigasi di stack kiri buat lebih kecil") — now
  `gap-2`.
- Placeholder screenshots only — `bg-[#E0E0E0]` (the lightest grey
  established for image placeholders elsewhere in this project), no real
  image props yet.

## Visual Specs
- Grid: `grid-cols-[360px_1fr] gap-16`.
- Left column: `sticky top-[104px] h-fit`; heading `text-[40px]
  leading-[1.15] font-bold tracking-[-0.02em]`; tab `nav` `gap-2`, each
  link `text-[16px]`, active → `font-semibold text-brand`, inactive →
  `font-normal text-muted`.
- Right column: each panel `py-14 first:pt-0`; panel heading `text-[26px]
  leading-[1.2] font-medium tracking-[-0.01em]`; description `max-w-[520px]
  text-[16px] leading-[1.6] text-muted`; placeholder image
  `aspectRatio: "16 / 10"`, `rounded-[32px]`, `bg-[#E0E0E0]`, centered 12px
  uppercase caption.

## Responsive Behavior
- **≤900px:** grid collapses to a single column (`grid-cols-1`), gap
  drops to `gap-10`; the left column becomes `static` (sticky disabled) so
  it scrolls normally above the panel stack instead of pinning.

## Accessibility
- Tab list is a real `<nav aria-label="Tabs">` of `<a href="#{id}">`
  anchors, each with `aria-current={isActive}` — keyboard/anchor
  navigable independent of the scroll-spy JS.
- Placeholder screenshot boxes carry a visible text caption, not a bare
  decorative fill.
