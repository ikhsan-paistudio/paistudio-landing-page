# FinalCtaFooter

**File:** `src/components/FinalCtaFooter.tsx`
**Type:** Client component (`"use client"`) — uses `useScrollDriver`,
`useReduceMotion`
**Renders inside:** `app/page.tsx`, `app/work/page.tsx`,
`app/work/[slug]/page.tsx`, `app/work/v2/[slug]/page.tsx`,
`app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/faq/page.tsx`, and
all 12 target pages (`app/saas-web-app-development/page.tsx`,
`app/marketplace-development/page.tsx`, `app/ai-products/page.tsx`,
`app/mvp-development/page.tsx`, `app/automation-tools/page.tsx`,
`app/internal-tools-development/page.tsx`, `app/bubble/page.tsx`,
`app/n8n/page.tsx`, `app/softr/page.tsx`, `app/airtable/page.tsx`,
`app/lovable/page.tsx`, `app/claude-ai/page.tsx`) — last section on every
one, no props on any of them (see Props).

## Purpose
Combined final CTA block + full site footer: closing headline, a
"Let's Talk" contact dropdown with real destinations, brand column with
social links, 3 footer nav columns, and a copyright bar.

## Props
None. `FinalCtaFooter` takes no props.

**History**: this used to take a `theme?: 'light' | 'dark'` prop for the
backdrop color behind the section's rounded top corners — the
`rounded-t-[56px]` section doesn't fill the wrapper's full rectangle, so
the backdrop shows through the corner cutouts, and had to match whatever
page section sat *immediately above the footer* or the corners rendered a
visibly wrong-colored band. That "get it right per page or it visibly
breaks" design got the actual color wrong (or just forgotten on a new
page) enough times in practice — fixed reactively more than once in this
project's history — that the prop was removed in favor of a single
hardcoded `bg-ink`, on the theory that every page this footer rendered on
was dark anyway.

That held until the blog article page (`app/blog/[slug]/page.tsx`), which
is `bg-paper` (light) — `bg-ink` there showed as a jarring black band in
the rounded corners. That page briefly got a `backdropClassName` prop
override (`bg-white`) while every other page kept the `bg-ink` default —
then, on explicit direction, the backdrop was made `bg-white`
*everywhere* instead, so every footer's corners look consistent
site-wide rather than tracking each page's own background. Back to a
single hardcoded value, no prop.

A first pass at the original hardcoding used `#0d2a1c` — the gradient's
own topmost color — reasoning that matching it exactly would make the
corners blend seamlessly on any page. In practice that made the rounded
corners themselves vanish entirely: with zero contrast between the
backdrop and the gradient, there was nothing left to reveal the curve —
the corners were still `rounded-t-[56px]` in the markup, just visually
imperceptible. `bg-white` reveals the curve clearly against the section's
own dark gradient on every page.

## Dependencies
- `FOOTER_COLUMNS`, `SOCIAL_LINKS` — `src/lib/data/nav.ts`
- `useScrollDriver()` — reads `revealed`
- `useReduceMotion()`
- `fadeStyle()` (for `finalSection`, a slide-up-only fade) and
  `revealStyle()` (for `footerBrand`/`footerCol0-2`, fade+scale) helpers
- `LetsTalkMenu` (`./nav/LetsTalkMenu.tsx`), `variant="footer"`,
  `align="center"`
- `next/image` (footer brand logo), `next/link` (footer nav links)
- Local `SOCIAL_ICONS` map (Instagram/LinkedIn/Bubble inline SVGs, not
  exported)

## Behavior
- No local state.
- `data-reveal-id="finalSection"` on the outer `<section>` uses
  `fadeStyle()` (900ms, translateY-only, no scale) rather than
  `revealStyle()` — matches the source prototype's distinct treatment for
  this element vs. the card-style reveals elsewhere.
- Footer brand column and each of the 3 nav columns
  (`footerCol0`/`footerCol1`/`footerCol2`) have their own
  `data-reveal-id` with staggered delays (80ms/160ms/240ms respectively,
  defined in the shared `REVEAL_DELAYS` table).

## Visual Specs
- Outer wrapper: `overflow-hidden`, decorative radial blur glow
  (`blur-[26px]`) positioned top-center behind the section; background is
  a fixed `bg-white` on every page — see Props' History note for why it's
  deliberately *not* the same color as the gradient below.
- Section `id="contact"`: `rounded-t-[56px]`, `pt-[120px]`, background
  `linear-gradient(180deg, #0d2a1c, #0f3322, #135232, #23A05D)` (static,
  not scroll-driven — the *fixed* background gradient morph happens
  separately, behind this section, via `FixedBackground`/`useScrollDriver`).
- CTA block: centered, eyebrow "Let's Get In Touch", `<h2 class="pai-final-h2">`
  88px weight 700 "Not sure where to start?", paragraph 18px
  `text-white/88` (`max-w-[800px]`), then `LetsTalkMenu` (footer variant,
  centered).
- Divider: 1px `bg-white/16`.
- Footer grid (`pai-footer-grid`): `grid-cols-[1.3fr_1fr_1fr_1fr]`,
  `gap-14`, `py-20`.
  - Brand column: logo (137×24), description paragraph (14px
    `text-white/85`), 3 circular social icon links (`border-white/40`,
    36×36px).
  - 3 nav columns from `FOOTER_COLUMNS`: title (14px weight 500 white) +
    links (14px `text-white/85`, hover → white).
- Divider: 1px `bg-white/14`.
- Copyright bar: "© 2026 Paistudio. All rights reserved." /
  "Designed and built in Indonesia." — 12px `text-white/78`, space-between.

## Responsive Behavior
- **≤900px:** `pai-final-h2` drops to 50px; `pai-footer-grid` collapses
  to 2 columns.
- **≤560px:** `pai-final-h2` drops to 36px; `pai-footer-grid` collapses to
  1 column.

## Accessibility
- Social icon links have `aria-label` (Instagram/LinkedIn/Bubble) since
  they're icon-only.
- Decorative eyebrow icon is `aria-hidden="true"`.
- Footer nav links: all 3 columns are now fully wired. "What we build" →
  the 6 offering pages (`/saas-web-app-development`,
  `/marketplace-development`, `/ai-products`, `/mvp-development`,
  `/automation-tools`, `/internal-tools-development`). "Technologies" →
  the 6 tool pages (`/bubble`, `/n8n`, `/softr`, `/airtable`, `/lovable`,
  `/claude-ai`) — together with "What we build" these are the 12 target
  pages referenced throughout `src/components/sections/`'s docs.
  "Company": "Our Work" (`#work`) is a real in-page anchor, "Blog"
  (`/blog`) and "FAQ" (`/faq`) are real routes, and "Bubble Marketplace"
  links out to the contributor's Bubble.io profile.
- Any `col.links` href starting with `http` is treated as external and
  rendered with `target="_blank" rel="noopener"` automatically (same
  inference `MegaMenu`/`MobileNav` use for `RESOURCES_MENU` — see their
  docs) — internal hrefs (`#`, `#work`, `/blog`, `/faq`) stay same-tab.
