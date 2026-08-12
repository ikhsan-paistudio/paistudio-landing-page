# ToolDeepDiveSection

**File:** `src/components/sections/ToolDeepDiveSection.tsx`
**Type:** Server component — no `"use client"`, no state.
**Spec:** `content/sections/sec-07-tool-deep-dive.md`
**Renders inside:** only `app/dev/sections/page.tsx` (preview harness) —
not yet wired into any of the 6 tool pages it's spec'd for.

## Purpose
SEC-07 · Tool Deep-Dive — an honest, factual breakdown of a specific
no-code/AI tool: what it is, why this agency uses it, its real
limitations, and what's typically built with it.

**Applies to tool pages ONLY** (Bubble, n8n, Softr, Airtable, Lovable,
Claude AI) — do **NOT** use on offering pages (SaaS & Web App Development,
Marketplace Development, AI Products, MVP Development, Automation Tools,
Internal Tools Development). This component has no way to enforce that
itself (page assembly/routing is out of its own scope) — noting here for
whoever wires it into the 6 tool pages.

A genuinely new component, not a reskin of SEC-02/03/04's list patterns —
a two-column strengths/limitations layout instead of a numbered list or
card grid, per spec.

## Props
```ts
{
  toolName: string;
  whatItIs: string;         // 2–3 sentences, factual
  whyWeUseIt: string;
  limitations: string;      // must be a real, specific trade-off — not a disguised sales pitch
  whatWeBuildWithIt: string;
}
```

**Content rule** (partially structural, partially a copywriting
requirement): `limitations` must name a real, specific trade-off of the
named tool (e.g. "struggles with complex relational queries at scale"),
not a disguised sales pitch ("it's so good there's nothing to complain
about"). This component can't validate the *content* of the string, only
that it's always rendered — unconditionally, undimmed, and styled
identically to `whyWeUseIt` (same card treatment, same text size), never
hidden behind a toggle or visually de-emphasized — so a weak or missing
limitation would be visibly obvious in the rendered page, not quietly
buried.

## Behavior
Purely presentational — no client state, no effects, no conditional
rendering paths.

## Visual Specs
- Heading: `text-[36px] leading-[1.15] font-bold tracking-[-0.02em]`
  (`max-[560px]:text-[28px]`); intro (`whatItIs`) `max-w-[760px]
  text-[18px] leading-[1.6] text-muted`.
- Two-column grid (`grid-cols-2 gap-8`):
  - "Why we use it": `bg-cream rounded-[24px] p-8`.
  - "Honest limitations": `border border-ink/10 rounded-[24px] p-8` —
    deliberately the *unfilled* card style (vs. the filled `bg-cream` for
    "why we use it"), so the two don't read as equally "positive."
  - Both: `text-[12px] font-medium tracking-[0.1em] text-muted uppercase`
    label + `text-[16px] leading-[1.6] text-text` body.
- "What we typically build with it": full-width block below the grid,
  same label/body treatment, `max-w-[760px]`.

## Responsive Behavior
- **≤900px:** two-column grid collapses to `grid-cols-1`.
- **≤560px:** heading drops to 28px.

## Accessibility
No interactive elements — plain content blocks with normal heading/text
semantics. No icons requiring `aria-hidden`.
