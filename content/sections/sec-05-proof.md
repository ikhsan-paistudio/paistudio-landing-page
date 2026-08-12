# SEC-05 · Proof / Case Studies

**Applies to:** All 12 pages
**Purpose:** Evidence for the claims made elsewhere on the page. This section did not exist on the original site content and is a required addition.

## Render order
1. 2–3 case cards, each: client/industry label, problem, what was built, one outcome metric

## Props interface
```ts
{
  cases: Array<{
    clientLabel: string,     // real name or honest anonymization, e.g. "a Series A SaaS company"
    problem: string,
    solution: string,
    outcome: string          // one concrete metric or result
  }>  // 2–3 items
}
```

## Design rules
- Card row layout, consistent styling across all pages

## Content rule — read before generating
Do not populate `cases` with placeholder or fabricated metrics. If real case data isn't available yet for a given page, render the section with an explicit "case studies coming soon" state rather than invented numbers — fabricated metrics are worse for credibility than an honest gap.
