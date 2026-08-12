# ProofSection

**File:** `src/components/sections/ProofSection.tsx`
**Type:** Server component — no `"use client"`, no state.
**Spec:** `content/sections/sec-05-proof.md`
**Renders inside:** only `app/dev/sections/page.tsx` (preview harness) —
not yet wired into any of the 12 real target pages.

## Purpose
SEC-05 · Proof / Case Studies — evidence for claims made elsewhere on the
page. A genuinely new section with no equivalent on the original site
content.

## Props
```ts
{
  cases: Array<{
    clientLabel: string; // real name, or an honest anonymization, e.g. "a Series A SaaS company"
    problem: string;
    solution: string;
    outcome: string;     // one concrete metric or result
  }>; // 2–3 items
}
```

**Content rule** (structurally enforced, not just documented): never
populate `cases` with placeholder/fabricated metrics. This component has
**no fallback case data of its own** to fall back on — there is nothing
inside it that could fabricate a metric even by accident. If real case
data isn't ready for a page yet, pass `cases={[]}` and the component
renders an honest "coming soon" state instead of inventing content to
fill the space.

## Behavior
Purely presentational — renders one of two states based on `cases.length`:
- **Empty** (`cases.length === 0`): a single bordered panel, "Case studies
  coming soon."
- **Populated**: a 3-column grid of case cards.

No other logic — no client state, no effects.

## Visual Specs
- **Empty state**: `rounded-[24px] border border-ink/10 px-8 py-16
  text-center`, `text-[16px] text-muted`.
- **Populated state**: `grid grid-cols-3 gap-6`. Each card:
  `flex flex-col gap-4 rounded-[24px] bg-cream p-8` —
  - Client label: `text-[13px] font-medium tracking-[0.04em] text-muted
    uppercase`.
  - "Problem" / "What we built" sub-blocks: `text-[12px] font-medium
    tracking-[0.1em] text-muted uppercase` label + `text-[15px]
    leading-[1.6] text-text` body.
  - Outcome: pinned to the card's bottom via `mt-auto`, in its own
    `rounded-[16px] bg-paper px-4 py-3` chip, `text-[15px] font-medium
    text-brand`.

## Responsive Behavior
- **≤900px:** grid collapses to a single column (`grid-cols-1`).

## Accessibility
No interactive elements — plain content cards, no special
accessibility handling needed beyond normal heading/text semantics.
