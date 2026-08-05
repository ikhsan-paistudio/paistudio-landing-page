# MobileNav

**File:** `src/components/nav/MobileNav.tsx`
**Type:** Client component (`"use client"`) — uses `useScrollDriver`,
local state
**Renders inside:** `Nav`, as its last child (always mounted; visibility
controlled by `open` prop + inline styles, not conditional rendering) —
so it appears wherever `Nav` does: the homepage (`theme="dark"`), and
`/work`, `/work/[slug]`, `/blog`, `/blog/[slug]`, `/faq` (`theme="light"`)
**Note:** No equivalent exists in the source prototype (which had zero
mobile navigation below 900px) — this is a new component built for the
rebuild.

## Purpose
Slide-in drawer menu for viewports ≤900px, opened by `Nav`'s hamburger
button. Contains the same links as desktop nav (Our Work, Build
accordion, Pricing, Resources) plus a "Let's Talk" CTA.

## Props
| Prop | Type | Required | Description |
|---|---|---|---|
| `open` | `boolean` | yes | Whether the drawer is visible. |
| `onClose` | `() => void` | yes | Called when the drawer should close (backdrop click, close button, Escape key, or after navigating). |
| `theme` | `'light' \| 'dark'` | no | Default `'dark'`. Passed straight through from `Nav`'s own `theme` prop — see Visual Specs for what changes (drawer surface, text, logo variant shown). |

## Local State
- `buildOpen: boolean` — whether the inline "Build" accordion section is
  expanded.

## Dependencies
- `BUILD_MENU`, `RESOURCES_MENU` — `src/lib/data/nav.ts`
- `useScrollDriver()` — calls `gotoId('work' | 'pricing')`
- `next/image` (logo), `next/link` (build/resources links)

## Behavior
- While `open`, a `useEffect`:
  - sets `document.body.style.overflow = 'hidden'` (scroll lock),
    restored on close/unmount
  - moves focus to the first focusable element inside the panel
  - adds a `keydown` listener that calls `onClose()` on `Escape`
- Backdrop is a full-screen `<button aria-label="Close menu">` (not a
  plain `<div>`) with `opacity` transitioning 0→1; clicking it calls
  `onClose()`.
- Panel slides in from the right via `transform: translateX(0 |
  100%)`, 300ms transition; `role="dialog"`, `aria-modal="true"`,
  `aria-label="Menu"`.
- "Our Work" and "Pricing" are buttons that call a local `go(id)` helper
  — closes the drawer *then* calls `gotoId(id)` (closing first so the
  smooth-scroll isn't fighting the drawer's own scroll-lock/unlock).
- "Build" is a disclosure button (`aria-expanded={buildOpen}`) that
  toggles an inline list combining `BUILD_MENU.whatWeBuild` and
  `BUILD_MENU.howWeBuildIt` into one flat list of links (unlike the
  desktop `MegaMenu`'s two-column layout).
- "Resources" is rendered as a static labeled list (not a
  disclosure/accordion — always expanded) since it only has 4 items. Same
  as desktop `MegaMenu`, any `RESOURCES_MENU` link whose `href` starts
  with `http` gets `target="_blank" rel="noopener"` automatically (e.g.
  "Bubble Plugins"); internal hrefs stay same-tab and still close the
  drawer via `onClick={onClose}`.
- Bottom CTA is a real `<a>` hardcoded to the same Google Calendar
  Appointment Scheduling URL as `LETS_TALK_LINKS.scheduleCall` (not
  imported from it, since this button's label is "Let's Talk" not
  "Schedule a call" — see `nav.ts`) — not a dropdown like the desktop
  `LetsTalkMenu`, single direct link to keep the mobile flow to one tap.

## Visual Specs
- Backdrop: `fixed inset-0`, `bg-black/60` — unaffected by `theme`.
- Panel: `absolute top-0 right-0`, `h-full`, `w-[86vw] max-w-[360px]`,
  `backdrop-blur-2xl backdrop-saturate-150`, `p-6 pt-8`, `overflow-y-auto`.
  - `theme="dark"`: `bg-[#0c0c0ae6]`, `border-l border-white/14`,
    `text-white`, shadow `shadow-[-18px_0_48px_rgba(0,0,0,0.4)]`.
  - `theme="light"`: `bg-white/90`, `border-l border-ink/10`, `text-text`,
    softer shadow `shadow-[-18px_0_48px_rgba(0,0,0,0.12)]`.
- Header row: logo (137×24 — shows `paistudio-logo-dark.svg` under
  `theme="light"`, `paistudio-logo-light.svg` under `theme="dark"`; no
  crossfade here, just a static swap), wrapped in a `next/link` to `/`
  (`aria-label="Paistudio home"`, closes the drawer on click via
  `onClick={onClose}` — same as the "Our Work"/"Pricing"/Build/Resources
  links, so navigating away doesn't leave the drawer open underneath) +
  circular close button (`36×36`, `border-white/16 bg-white/8` dark /
  `border-ink/12 bg-ink/5` light).
- Nav items: `rounded-2xl px-3 py-3`, 16px, hover → `bg-white/8` (dark) /
  `bg-ink/8` (light).
- Build accordion sub-items: `pl-4`, 14px, `text-white/78` (dark) /
  `text-text/78` (light), same hover treatment.
- "Resources" label: `text-white/50` (dark) / `text-text/50` (light).
- Bottom CTA: full-width pill, `rounded-full`, centered "Let's Talk".
  `border-white/16 bg-white/8` (dark) / `border-ink/12 bg-ink/5` (light),
  matching shadow treatment to `Nav`'s pill for the same theme.

## Responsive Behavior
This component only ever renders meaningfully ≤900px in practice (its
trigger — `Nav`'s hamburger button — is itself hidden above 900px via
`max-[900px]:flex`), though the component itself has no internal media
query; it relies entirely on `open` never becoming `true` at wider
viewports.

## Accessibility
- `role="dialog"` + `aria-modal="true"` + `aria-label="Menu"` on the
  panel.
- Focus is moved into the panel on open; `Escape` closes; backdrop is a
  real focusable/labeled button rather than a bare clickable `<div>`.
- Scroll-lock on `<body>` prevents background content from scrolling
  while the drawer is open.
- Known gap: no full focus trap (Tab can still cycle focus out to
  content behind the backdrop) — acceptable for a first pass but worth
  hardening later with a proper focus-trap utility if this becomes a
  compliance requirement.
