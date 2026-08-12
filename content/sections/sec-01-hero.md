# SEC-01 · Hero / Value Proposition

**Applies to:** All 12 pages (offering pages + tool pages)
**Purpose:** First-screen framing — what this page is about and why it matters.

## Render order
1. Eyebrow label
2. H1 headline
3. Subhead
4. Trust badges row
5. Primary CTA button

## Props interface
```ts
{
  eyebrow: string,
  headline: string,          // template: "Why [X] Is Essential for [Outcome]"
  subhead: string,           // 1–2 sentences
  trustBadges: Array<{ label: string, sourceUrl: string }>,
  cta: { label: string, href: string }
}
```

## Design rules
- Fixed vertical order, identical layout on every page — only text/props change
- Fully responsive (mobile, tablet, desktop)
- Trust badge renders as a link only if `sourceUrl` is present — never fabricate a source
- Single prominent CTA button, no secondary CTA in this section
