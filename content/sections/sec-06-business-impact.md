# SEC-06 · Business Impact / Outcomes

**Applies to:** All 12 pages
**Purpose:** Translate features into business results.

## Render order
1. Section intro line
2. 4 outcome bullets, each with an icon

## Props interface
```ts
{
  intro: string,
  outcomes: Array<{ icon: string, text: string }>  // exactly 4
}
```

## Design rules
- Icon + short bullet grid, consistent across pages
- Where possible, each outcome bullet should be traceable to a case in SEC-05 rather than standing alone as an unsupported claim
