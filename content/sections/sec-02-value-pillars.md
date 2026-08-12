# SEC-02 · Value Pillars

**Applies to:** All 12 pages
**Purpose:** Four core reasons this approach/tool is worth choosing.

## Render order
1. Section intro line
2. 4 pillar cards, each: title + description

## Props interface
```ts
{
  intro: string,
  pillars: Array<{ title: string, description: string }>  // exactly 4
}
```

## Design rules
- Fixed 4-card grid (2×2 on tablet/desktop, stacked 1-column on mobile)
- Identical card component/styling across all 12 pages
- No more, no fewer than 4 pillars — if fewer are provided, do not stretch cards to fill; flag it instead of silently reflowing to 3
