# Nav v2

**Status:** Implemented, via a `chromeVariant` prop on the existing `Nav`
(not a separate component/file) — `chromeVariant="v2"`. Default remains
`"v1"` (the original, unchanged behavior), so this is opt-in per usage.
**Currently used on:** `app/page.tsx` (the homepage) only — `<Nav
chromeVariant="v2" />`. Every other page still uses the default `"v1"`.

**Relationship to `Nav`:** identical in every respect (structure, props,
links, `MegaMenu`/`LetsTalkMenu`/`MobileNav` composition, responsive
behavior, accessibility) **except** the chrome/text treatment used while
`navOnLight` is `true` — i.e. whenever the section currently scrolled
behind the nav is white/light. Everything below is written as a diff
against `Nav-docs.md`; anything not mentioned here is unchanged.

## The one change

The pill/hamburger/`LetsTalkMenu`-trigger/`MegaMenu`-panel chrome that
shows while `navOnLight` is `true` (white/light section behind the nav)
— previously a pale, low-contrast grey (`bg-ink/5`, i.e. 5%-opacity black,
barely-there on white) — is now a visibly dark, near-opaque pill
(`bg-ink/90`) with white text instead.

**What does *not* change:** the other case — `navOnLight = false`, i.e.
the nav is over a dark section — keeps its exact `v1` treatment
(`border-white/16 bg-white/8`, white text), in both variants. Only the
white-section case's *value* changes; the `navOnLight`-driven branching
mechanism itself is untouched (see `Nav-docs.md`'s Behavior section for
why chrome tracks `navOnLight` at all — the "nearly invisible pill" bug
this project fixed once already; `v2` doesn't touch that mechanism, only
which color one branch of it resolves to).

**Logo is explicitly excluded.** The brand logo sits directly on the page
background, not inside the pill — its dark/light swap (`showDarkLogo =
navOnLight`) is identical in both variants: dark logo over white/light
sections, light logo otherwise, regardless of `chromeVariant`.

## Values

| Surface | `navOnLight`, v1 | `navOnLight`, v2 | `!navOnLight` (same in both) |
|---|---|---|---|
| Center pill chrome (rest) | `border-ink/12 bg-ink/5 shadow-[0_6px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.6)]` | `border-white/12 bg-ink/90 shadow-[0_6px_24px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.14)]` | `border-white/16 bg-white/8 shadow-[0_6px_24px_rgba(255,255,255,0.14),inset_0_1px_0_rgba(255,255,255,0.18)]` |
| Pill link hover | `hover:bg-ink/10` | `hover:bg-ink/75` | `hover:bg-white/14` |
| Pill text | `text-text/82` | `text-white/82` | `text-white/82` |
| Hamburger chrome | `border-ink/12 bg-ink/5` | `border-white/12 bg-ink/90` | `border-white/16 bg-white/8` |
| Hamburger icon | `text-text` | `text-white` | `text-white` |
| `MegaMenu` trigger hover | `hover:bg-ink/10` | `hover:bg-ink/75` | `hover:bg-white/14` |
| `LetsTalkMenu` trigger chrome (nav variant, rest) | light (`isLightNav` branch, `bg-ink/5`) | opaque dark (own `isDarkOnLight` branch, `bg-ink/90` — **not** a reuse of the `!isLightNav` branch, see Implementation) | dark (`!isLightNav` branch, `bg-white/8`, unchanged) |
| `LetsTalkMenu` trigger hover | `hover:bg-ink/10` | `hover:bg-ink/75` | `hover:bg-white/16` |
| `LetsTalkMenu` label (nav variant) | `text-text` | `text-white` | `text-white` |
| `MegaMenu` panel chrome | light panel (`bg-white/95 border-ink/10 ...`) | dark panel (`bg-[#121210f2] border-white/14 ...`) | dark panel (unchanged) |
| `MegaMenu`/`LetsTalkMenu` panel links + hover | light-panel text/hover | dark-panel text/hover | dark-panel text/hover (unchanged) |
| Logo | dark variant shown | dark variant shown (**unchanged**) | light variant shown (unchanged) |

**Net effect:** `navOnLight` no longer selects between two *visually
distinct* chrome directions in `v2` (light-glass vs. dark-glass, the way
`v1` and every other page still does) — it collapses pill/hamburger/
`LetsTalkMenu`/`MegaMenu`-panel chrome+text to the same "dark surface,
white text" read in both scroll states (`bg-ink/90` fill when the page is
white, `bg-white/8` fill when the page is dark — different values, same
resulting contrast direction). Every hover state in v2 stays within that
same dark family too (`hover:bg-ink/75`, a *lighter* shade of the same
base, not a swap to a translucent white value) — see Implementation for
why that matters. Chrome is still conditional on `navOnLight` — `v2` just
makes both branches resolve to a dark surface instead of one branch
using a light one. Only the standalone logo still visibly flips between
its two variants as you scroll.

**Panels included:** the dropdown panels (`MegaMenu`, `LetsTalkMenu`)
follow the same inversion as their triggers, not just the triggers
themselves — a panel opening in the opposite brightness from the trigger
it drops down from would read as a bug, not a variant.

## Implementation

A new `chromeVariant?: 'v1' | 'v2'` prop on `Nav` (default `'v1'`) feeds
two derived booleans: `isLightChrome = chromeVariant === 'v1' &&
navOnLight` (`v1` behaves exactly as before — `isLightChrome ===
navOnLight`; `v2` makes it always `false`), and `isDarkOnLight =
chromeVariant === 'v2' && navOnLight` (the new case specifically).
`isLightChrome` drives `Nav`'s own `textColorClass`/`hamburgerTextClass`
and is passed as `MegaMenu`'s `navOnLight` prop for its panel/title/link
colors. `isDarkOnLight` drives the *rest-state* chrome values that need a
genuinely new color (`Nav`'s `chromeClass`/`hamburgerChromeClass`,
`LetsTalkMenu`'s trigger via its own `chromeVariant` prop).

**Two rounds of fixes were needed, both from the same root cause: a
`hover:bg-*`/`bg-*` pair on one element replaces the whole
`background-color` on hover, it doesn't layer a highlight on top of the
rest-state fill.** Any *translucent* value on either side of that pair —
tuned for one specific kind of background behind it — breaks the moment
the actual page doesn't match what it was tuned for:

1. **Rest state (`LetsTalkMenu` trigger only).** Its existing "dark"
   branch, `bg-white/8`, is translucent white meant to pick up glow from
   a *dark* page. Reusing it for `v2`'s white-page case (by passing a
   collapsed `false` boolean into the existing branch, the same trick
   that worked fine for `MegaMenu`) rendered a fully transparent pill
   with white-on-white text. Fixed by giving `LetsTalkMenu` its own
   `chromeVariant` prop so it computes a real `isDarkOnLight` branch with
   an opaque `bg-ink/90` (copied from `Nav`'s own pill).
2. **Hover state (`Nav`'s pill links, `MegaMenu`'s trigger, and
   `LetsTalkMenu`'s trigger).** All three had a `hover:bg-white/14` or
   `hover:bg-white/16` left over from `v1`/the dark-page case. On
   `LetsTalkMenu`'s trigger this was a second, independent instance of
   exactly the bug above — the *rest* state got fixed to `bg-ink/90` but
   its `hover:` pair was never updated, so hovering it swapped straight
   back to invisible. `Nav`'s pill links and `MegaMenu`'s trigger don't
   have their own rest-state background (they inherit the parent pill's),
   so their white hover only ever composited as a highlight over that
   pill, not directly over the page — not a confirmed invisibility bug
   the way the other two were, but a stray white highlight standing out
   against dark-family surfaces was still the wrong direction, and was
   changed to match for visual consistency. All three now use
   `hover:bg-ink/75` (a lighter shade of the same dark family) instead.

**Lesson for extending this further:** check *every* value on a branch
being reused via a substitute/collapsed boolean — including its
`:hover`/`:focus` pairs, not just its rest state. A value is only safe to
reuse as-is if it's opaque, or if it's layered over a guaranteed-opaque
parent (like a link inside an opaque dropdown panel). Anything
translucent and tuned for one specific background needs its own explicit
`v2` value, checked at every interaction state it has, not just the one
that happens to get exercised first.

No changes to `MobileNav` — its chrome is still the separate,
`theme`-driven static treatment `Nav-docs.md` already describes, unrelated
to `chromeVariant`.
