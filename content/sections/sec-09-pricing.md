# SEC-09 · Pricing / Engagement Model (optional)

**Applies to:** All 12 pages IF used at all — this section must be either present on every page or absent from every page. Do not mix.
**Purpose:** Sets expectations before the call, filters unqualified leads.

## Render order
Either:
- A) Pricing tiers, OR
- B) A short "how we scope and price" explanation block

## Props interface
```ts
{
  mode: "tiers" | "explanation",
  tiers?: Array<{ name: string, price: string, description: string }>,
  explanation?: string
}
```

## Design rules
- If `mode: "tiers"`, use simple tier cards
- If `mode: "explanation"`, use a single text block
- Component must support being entirely omitted from a page without breaking layout — this section is a toggle, not a guaranteed page section

## Content rule — read before generating
Do not generate this section for only some of the 12 pages. Confirm site-wide whether pricing is shown at all before building instances of it per page.
