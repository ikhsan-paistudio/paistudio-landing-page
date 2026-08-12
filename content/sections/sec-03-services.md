# SEC-03 · Services

**Applies to:** All 12 pages
**Purpose:** What is actually delivered on this offering/tool.

## Render order
1. Section intro line
2. 3–4 numbered service items, each: title + description

## Props interface
```ts
{
  intro: string,
  services: Array<{ number: number, title: string, description: string }>  // 3–4 items
}
```

## Design rules
- Numbered vertical list layout
- Same component/styling across all pages

## Content rule — read before generating
This is the section most likely to get accidentally duplicated across pages (a prior page on this site shipped with "Framer development services" copy pasted into an n8n automation page). When this section is populated for multiple pages, each page's `services` content must be written specific to that page's actual offering — do not reuse phrasing verbatim across pages.
