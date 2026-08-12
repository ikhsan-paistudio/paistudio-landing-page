# SEC-07 · Tool Deep-Dive

**Applies to:** Tool pages ONLY — Bubble, n8n, Softr, Airtable, Lovable, Claude AI
**Do NOT use on:** Offering pages (SaaS & Web App Development, Marketplace Development, AI Products, MVP Development, Automation Tools, Internal Tools Development)
**Purpose:** The section that differentiates one tool page from another. Without it, tool pages are functionally duplicate content with a different noun swapped in.

## Render order
1. What the tool is (2–3 sentences, factual)
2. Why this agency uses/recommends it (specific technical reasons)
3. Honest limitations of the tool
4. What is typically built with it

## Props interface
```ts
{
  toolName: string,
  whatItIs: string,
  whyWeUseIt: string,
  limitations: string,       // must be real, specific trade-offs — not a disguised sales pitch
  whatWeBuildWithIt: string
}
```

## Design rules
- Two-column layout: strengths / limitations side by side
- New component — does not reuse the SEC-02/SEC-03/SEC-04 list patterns

## Content rule — read before generating
`limitations` must contain a real, specific trade-off of the named tool, not a soft non-limitation ("it's so good there's nothing to complain about"). A tool page with no genuine limitation listed will read as unverified marketing rather than expert assessment.
