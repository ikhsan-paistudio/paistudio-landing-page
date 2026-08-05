# FinalCtaFooter

**File:** `src/components/FinalCtaFooter.tsx`
**Type:** Client component (`"use client"`) — uses `useScrollDriver`,
`useReduceMotion`
**Renders inside:** `app/page.tsx` (last section, no `theme` passed —
defaults to `'dark'`), `app/work/page.tsx`, `app/work/[slug]/page.tsx`,
`app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, and `app/faq/page.tsx`
(last section, `theme="light"`)

## Purpose
Combined final CTA block + full site footer: closing headline, a
"Let's Talk" contact dropdown with real destinations, brand column with
social links, 3 footer nav columns, and a copyright bar.

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `theme` | `'light' \| 'dark'` | no | `'dark'` | Backdrop color behind the section's rounded top corners only — `bg-ink` (dark) or `bg-paper` (light). The `rounded-t-[56px]` section (see Visual Specs) doesn't fill the full rectangle, so this wrapper's background shows through the corner cutouts; it must match whatever the page's own background is, or the corners render as visible wedges of the wrong color. Has no effect on the section's own dark green gradient, text, or any other content — those stay identical regardless of `theme`. |

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
  `bg-ink` (`theme="dark"`, default) or `bg-paper` (`theme="light"`) — see
  Props.
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
- Footer nav links for "What we build" and "Technologies" columns are
  intentional inert `href="#"` placeholders (no destinations decided
  yet). "Company" column is now fully wired: "Our Work" (`#work`) is a
  real in-page anchor, "Blog" (`/blog`) and "FAQ" (`/faq`) are real
  routes, and "Bubble Marketplace" links out to the contributor's
  Bubble.io profile.
- Any `col.links` href starting with `http` is treated as external and
  rendered with `target="_blank" rel="noopener"` automatically (same
  inference `MegaMenu`/`MobileNav` use for `RESOURCES_MENU` — see their
  docs) — internal hrefs (`#`, `#work`, `/blog`, `/faq`) stay same-tab.
