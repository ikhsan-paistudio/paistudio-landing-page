# SEC-04 · Process / How We Work

**Applies to:** All 12 pages
**Purpose:** Methodology — reduces perceived risk for the buyer.

## Render order
1. Section intro line
2. 4 numbered stages, each: title + description

## Props interface
```ts
{
  intro: string,
  stages: Array<{ number: number, title: string, description: string }>  // exactly 4
}
```

## Design rules
- Same numbered-stage layout pattern as SEC-03 (Services), but visually distinguished (different background tone or icon treatment) so the two sections don't blur together when they appear back-to-back on a page
