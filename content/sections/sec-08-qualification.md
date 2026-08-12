# SEC-08 · Qualification ("Right Fit" / "Not Right Fit")

**Applies to:** All 12 pages
**Purpose:** Self-selection filter — saves both parties time before a sales call.

## Render order
1. Section intro line
2. Two-column checklist: ✅ good fit (5 bullets) / ❌ not a good fit (4 bullets)

## Props interface
```ts
{
  intro: string,
  goodFit: string[],     // exactly 5
  notGoodFit: string[]   // exactly 4
}
```

## Design rules
- Two-column layout, green/red visual distinction (color + icon, not color alone, for accessibility)

## Content rule — read before generating
`notGoodFit` items must be concrete and self-diagnosable by the reader (e.g. "you need this live in under a week"), not vague soft-outs (e.g. "automation isn't a priority yet") that don't actually filter anyone.
