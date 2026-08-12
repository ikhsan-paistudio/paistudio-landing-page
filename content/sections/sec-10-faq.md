# SEC-10 · FAQ

**Applies to:** All 12 pages
**Purpose:** Objection handling and SEO value.

## Render order
1. Section intro line
2. 5 Q&A accordion pairs

## Props interface
```ts
{
  intro: string,
  faqs: Array<{ question: string, answer: string }>  // exactly 5
}
```

## Design rules
- Accordion UI, collapsed by default
- **Critical:** answer text MUST be present in the rendered HTML/DOM at all times, even while visually collapsed (e.g. `max-height: 0; overflow: hidden` rather than `display: none` or client-side-only rendering). This is a defect fix — a prior page on this site only rendered FAQ answers on click, making them invisible to search engines and non-JS crawlers.

## Content rule — read before generating
Questions and answers must be specific to the page's actual topic (e.g. "Can Airtable be self-hosted?" has a different, factually distinct answer than the equivalent n8n question) — do not search-and-replace one page's FAQ into another's.
