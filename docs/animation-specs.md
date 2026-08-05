# Animation Specs — Index Page

Documents every animation currently implemented on the main/index page's
**content** (`src/app/page.tsx` and its component tree). The `/work` page
reuses two of these systems as-is — the `pai-work-copy` text/thumbnail
reveal (§6) and the footer uncover (§9) — noted where relevant, but this
doc's scope is the index page.

**Out of scope: the navbar and everything inside it** (the logo/text
light-dark swap, pill/dropdown hover and open/close transitions, mobile
drawer). `Nav` is
shared chrome rendered on every page, not page-specific content, and its
motion is fully documented on its own terms in `docs/components/Nav-docs.md`,
`MegaMenu-docs.md`, `LetsTalkMenu-docs.md`, and `MobileNav-docs.md` — this
file does not duplicate it. When judging whether a page's content "meets"
this spec, the navbar is not part of that judgment; it's reused as-is,
never reimplemented per page.

Two animation "engines" are used throughout, and everything below is one
or the other:

1. **CSS-driven** — `@keyframes` + Tailwind `transition-*` utilities,
   defined in `src/app/globals.css` or inline Tailwind classes. Runs on
   the compositor, triggered by a class toggle or a CSS pseudo-class
   (`:hover`).
2. **Scroll-tick-driven** — one shared `requestAnimationFrame` loop in
   `src/lib/scroll/useScrollDriver.tsx` (`ScrollDriverProvider`'s
   `update()`), re-run on every `scroll`/`resize` event. It reads
   `getBoundingClientRect()` on a handful of registered elements each
   tick and writes `style.transform` / `style.opacity` / `style.clipPath`
   directly (imperative DOM writes, not React state) for anything that
   needs a continuous 0–1 value. React state (`activeProject`,
   `overLightWork`, `logoMode`, `revealed`) is only touched for the
   handful of things that are discrete (rail dot swap, reveal booleans).
   The hook also computes a `navOnLight` value consumed only by `Nav` —
   out of scope here, see `docs/components/Nav-docs.md`. This hook has no
   entry under `docs/components/` itself (it's a hook, not a component) —
   this file is its documentation, content animations only.

All CSS-driven animations respect `prefers-reduced-motion: reduce` via
the media-query block at the bottom of `globals.css`. All scroll-tick
ones check `reduceMotionRef.current` (computed once via `matchMedia` on
mount) and skip straight to the settled end-state — see §12.

---

## 1. Hero intro (page-load reveal)

**File:** `src/components/Hero.tsx`
**Mechanism:** CSS-driven, plays once on mount (not scroll-triggered —
Hero is already visible at scroll position 0).

The `data-fade`/`data-para` row wrapping the H1 + subhead does **not**
itself use `pai-work-copy` — the intro reveal for Hero specifically is
the `/work` page's hero, which layers `pai-work-copy` on top (see §6).
On the **index** page, Hero's own animation is purely the scroll-driven
parallax + fade described in §2 — there's no separate mount-triggered
reveal here (the hero is simply rendered visible with the scroll-driven
values applied from the very first tick).

---

## 2. Hero scroll parallax + fade-out

**File:** `src/lib/scroll/useScrollDriver.tsx:117-129`
**Mechanism:** scroll-tick-driven, imperative `style.transform` /
`style.opacity` writes.

| Target | Property | Formula | Notes |
|---|---|---|---|
| Any `[data-para]` element | `transform: translate3d(0, Npx, 0)` | `N = -(distanceFromViewportCenter) × speed` | `speed` read from the element's `data-para="0.08"` attribute. Hero's headline+subhead row uses `data-para="0.08"` — a subtle drift as you scroll past it. |
| Any `[data-fade]` element | `opacity` | `max(0, 1 - scrollY / (vh × 0.62))` | Both the headline row and the stats row have `data-fade="1"` — fully faded out by ~62% of one viewport height scrolled. |

No easing curve — both are direct linear functions of scroll position,
recomputed every tick (not a CSS transition), so they track the scroll
position exactly with zero lag.

---

## 3. Fixed background gradient morph

**File:** `src/lib/scroll/useScrollDriver.tsx:131-172`, math in
`src/lib/scroll/gradients.ts`
**Mechanism:** scroll-tick-driven, imperative `style.background` write
on the `FixedBackground` host div (`setHeroBgEl`).

Three phases, blended by scroll position:

1. **Hero phase** (`heroBgGradient(pBg)`, `pBg = scrollY / (vh × 0.62)`):
   a 7-stop vertical gradient (dark → theme green → white) that settles
   to solid `#ffffff` as the hero scrolls out — see `gradients.ts` for
   the exact stop math (lerp per-stop toward white, each stop's own
   boost multiplier so lower stops whiten first). This settled white is
   also the "Our Work" section's background (was `#faf7ed`/cream,
   changed to match the pure-white `--color-paper` used on every other
   page).
2. **CTA hand-off** (`q = (0.5 - ctaSection.top/vh) / 0.42`, clamped
   0–1): once the "Why Paistudio" section's top crosses ~50% of a
   viewport height from the bottom, the background swaps to
   `ctaBgGradient(q)` — white → dark green, eased via
   `smoothstep: q² × (3 − 2q)`.
3. **Testimonials fade-out**: the 3D logo's opacity (not the
   background) additionally multiplies by `(1 - fadeOut)` where
   `fadeOut = (1.1 - testimonialsSection.top/vh) / 0.6`, so the logo
   disappears before testimonials content would overlap it.

No CSS transition — the background color is recomputed and written
every tick, so it's as smooth as scroll input itself (rAF-throttled).

---

## 4. 3D logo (Three.js)

**File:** `src/components/ThreeLogoBackground.tsx`
**Mechanism:** its own internal `requestAnimationFrame` loop
(`_glFrame`-equivalent), fully separate from the scroll-tick loop. Two
external inputs drive it: `logoMode` (`'hero' | 'cta'`, from scroll
state) and live mouse/touch position.

| Behavior | Formula / value |
|---|---|
| Position easing (mode switch) | `pos += (target - pos) × 0.07` per frame — target is `x=1.5` in `hero` mode, `x=8.6` in `cta` mode |
| Idle rotation | `rotation.y = t × 0.3`; `rotation.z = sin(t × 0.22) × 0.12`; `rotation.x = -0.04 + sin(t × 0.16) × 0.1` (t = elapsed seconds) |
| Idle bob | `position.y = basePos.y + sin(t × 0.3) × 0.5` |
| Cursor proximity glow | `prox = max(0, 1 - min(1.3, hypot(mouseX, mouseY)) / 1.2)`, eased in at `× 0.1`–`0.12` per frame toward target |
| Cursor tilt | tilt target `= -mouseY × 0.4 × prox` (x-axis), `mouseX × 0.4 × prox` (y-axis), eased at `× 0.09` |
| Press/spring (mousedown/touchstart) | spring physics: `accel = (target - x) × 0.5 - v × 0.22; v += accel; x += v` — target flips to `-1` on press, `0` on release, giving a squash-then-overshoot bounce |
| Beam glow pulse | `beamPulse1 = max(0, 1 - |((t%13)/13) - 0.5| × 9)`, `beamPulse2` same with a 17s cycle — modulates Fresnel rim-glow intensity even though no visible beam elements exist in the markup (kept for the glow effect itself) |
| Resize-based scale | `baseScale (0.44) × clamp(0.6, 1.15, viewportWidth / 1280)` |

Pauses entirely (stops the rAF loop) via `IntersectionObserver`
(host off-screen) and `document.visibilitychange` (tab backgrounded) —
not just hidden, actually stopped, to avoid wasted GPU cycles.
Under `prefers-reduced-motion`, idle rotation/bob/beam-pulse are skipped
(`reduce` flag checked per-frame) but cursor tracking still runs.

---

## 5. Pinned horizontal "Our Work" gallery

**File:** `src/lib/scroll/useScrollDriver.tsx:174-185`,
`src/components/WorkGallery.tsx`
**Mechanism:** scroll-tick-driven, imperative `style.transform` on the
flex track (`setTrackEl`).

```
travel = (projectCount - 1) × viewportHeight
progress = clamp(-pinSection.top / travel, 0, 1)
track.transform = translate3d(-progress × (n-1) × viewportWidth, 0, 0)
```

The 6-project track slides horizontally in lockstep with vertical
scroll through the section's `height: ${n × 100}vh`. No easing — 1:1
scroll coupling. `activeProject` (which drives §6's reveal and the
progress rail, §10) is `round(progress × (n-1))`, but only while
`overLightWork` is true (`pinTop <= vh×0.55 && pinTop > -(travel+2)`).
`overLightWork` also feeds `Nav`'s `navOnLight` — out of scope here, see
`docs/components/Nav-docs.md`.

---

## 6. Work-gallery text + thumbnail reveal (`pai-work-copy`)

**File:** `src/app/globals.css:29-68`, used in
`src/components/WorkGallery.tsx:49`
**Mechanism:** CSS-driven, class toggle (`pai-play` added/removed by
React state) → `@keyframes paiTextIn`.

```css
.pai-work-copy.pai-armed > *      { opacity: 0; }
.pai-work-copy.pai-play  > *      { animation: paiTextIn 0.72s cubic-bezier(0.22,1,0.36,1) both; }
.pai-work-copy.pai-play > *:nth-child(1) { animation-delay: 0.04s; }
.pai-work-copy.pai-play > *:nth-child(2) { animation-delay: 0.13s; }
.pai-work-copy.pai-play > *:nth-child(3) { animation-delay: 0.22s; }
.pai-work-copy.pai-play > *:nth-child(4) { animation-delay: 0.31s; }

@keyframes paiTextIn {
  0%   { opacity: 0; transform: translateY(28px); }
  100% { opacity: 1; transform: translateY(0); }
}
```

Each direct child of a `.pai-work-copy` element fades + slides up 28px,
staggered ~90ms apart, up to 4 children. On the index page's
`WorkGallery`, `pai-play` is added only when `i === activeProject`
(§5) and **removed** the moment the panel is no longer active — so it
genuinely replays every time you scroll back into a project, not just
once. The whole copy block (and separately, the image gallery column)
also plays a one-shot `paiCardIn` (`opacity 0→1, translateY(34px)+scale(0.97) → translateY(0)+scale(1)`,
0.9s, same easing, inline `style`, not class-toggled — fires once on
mount only) — so a project's entry into view is the sum of both: the
whole panel's `paiCardIn` plus its children's staggered `paiTextIn`.

> **Reused on `/work`**: the hero heading/subhead there gets
> `pai-work-copy pai-armed pai-play` statically from initial render
> (a mount-once play, no replay). Each `ProjectCard` wraps its
> thumbnail + title/description as the two staggered children, but the
> `revealed` flag that adds `pai-play` isn't per-card scroll detection —
> `ProjectGrid.tsx` starts a single 600ms timer on mount and flips it to
> `true` for every card at once, so the whole grid reveals together as
> one beat after the hero settles. See
> `src/components/work/ProjectCard.tsx` and `ProjectGrid.tsx`.

---

## 7. Marquees

**File:** `src/app/globals.css:70-88`, `src/components/Marquee.tsx`
**Mechanism:** pure CSS `@keyframes`, `animation: ... infinite`, always
running (not scroll- or state-triggered).

| Marquee | Keyframe | Duration | Direction | Pause on hover? |
|---|---|---|---|---|
| Work-gallery image column (vertical) | `paiVMarquee` (`translateY(0)` → `translateY(-50%)`) | 40s linear | up | **Yes** — `Marquee` component's `pauseOnHover` prop adds `hover:[animation-play-state:paused]` |
| "Tools we specialize at" row (horizontal) | `paiHMarquee` (`translateX(0)` → `translateX(-50%)`) | 26s linear | left | No |

Both loop seamlessly because `Marquee.tsx` renders its children twice
back-to-back and the keyframe only travels 50% of the track.

---

## 8. Reveal-on-scroll (cards, pricing, testimonials wrap, footer columns)

**File:** `src/lib/scroll/useScrollDriver.tsx:213-229` (visibility
detection) + `48-77` (`revealStyle`/`fadeStyle` helper functions)
**Mechanism:** scroll-tick-driven visibility detection (no
`IntersectionObserver` — same rationale as the rest of this driver:
one shared rAF tick instead of many observers) feeding a **CSS
transition** (not a keyframe animation) via inline `style`.

Detection: every tick, every `[data-reveal-id]` element is checked —
`visible = rect.bottom > 0 && rect.top < viewportHeight × 0.92`. First
time an id flips to visible, `revealed[id] = true` is written to React
state (and stays true — this is a one-way reveal, not a re-hide on
scroll-out).

Two style variants, both `cubic-bezier(0.22,1,0.36,1)`:

- **`revealStyle`** (CTA cards, pricing cards, testimonials wrap):
  `opacity 0→1` + `translateY(26px)→0` + `scale(0.98)→1`, `0.7s`,
  per-id delay from a shared table (`ctaCard1` 90ms, `ctaCard2` 180ms,
  `pricingRow2Card0` 0ms, `pricingRow2Card1` 110ms, `footerCol0/1/2`
  80/160/240ms — everything else defaults to 0ms).
- **`fadeStyle`** (final CTA section only, id `finalSection`):
  `opacity 0→1` + `translateY(36px)→0` (no scale), `0.9s` default.

---

## 9. Footer "uncover" reveal

**File:** `src/lib/scroll/useScrollDriver.tsx:187-211`,
`src/components/FooterUncover.tsx`
**Mechanism:** scroll-tick-driven, imperative `style.clipPath` +
`style.transform` on the footer wrapper (`setFooterEl`).

```
revealDistance = viewportHeight × 0.4
raw = clamp((viewportHeight - footerTop) / revealDistance, 0, 1)
fp  = 1 - (1 - raw)²                      // ease-out
clipTop = (1 - fp) × 55                   // % — capped so ≥45% always shows
footer.clipPath = inset(clipTop% 0 0 0)
footer.transform = translate3d(0, (1-fp) × 22px, 0)
```

No CSS transition — recomputed every tick like the rest of this driver.
Makes the footer read as "already there, being uncovered" rather than
scrolling in like a normal section: a clip-path wipe from the top
(revealing the bottom portion first) plus a small 22px settle-down.
Explicitly **not** `position: sticky` + negative margin (the more
common version of this trick) — that combination was tried first and
reverted because it rendered the footer permanently stuck at the top of
the page from scroll position 0 in Chromium (confirmed via an isolated
minimal repro, not specific to this app's other code).

> **Reused on `/work`**: same component, same mechanism, wraps
> `FinalCtaFooter` there too.

---

## 10. Progress rail (work-gallery dots)

**File:** `src/components/ProgressRail.tsx`
**Mechanism:** CSS `transition-*`, driven by `activeProject` /
`overLightWork` React state (§5).

| Element | Property | Duration | Easing |
|---|---|---|---|
| Rail container | `opacity` (visible only while `overLightWork`) | 400ms | default |
| Active dot | `width` (7px → 22px) + `background-color` | 350ms | `cubic-bezier(0.22,1,0.36,1)` |

---

## 11. Testimonials carousel

**File:** `src/components/Testimonials.tsx`
**Mechanism:** CSS `transition-*`, driven by local `active` state
(click-to-select) — not scroll-linked.

| Element | Property | Duration | Easing |
|---|---|---|---|
| Track (centers the active slide) | `transform: translateX(...)` | 600ms | `cubic-bezier(0.22,1,0.36,1)` |
| Each slide (active vs. inactive) | `opacity` (1 ↔ 0.28) + `transform: scale(1 ↔ 0.9)` | 600ms | Tailwind default (no explicit `ease-*` set on this rule). `filter: blur(0.5px)` also toggles on inactive slides but is **not** in the transitioned-properties list (`transition-[opacity,transform]`), so it snaps instantly rather than easing in |

The track's `translateX` offset is measured via `offsetLeft`/
`offsetWidth` (not `getBoundingClientRect`, which would read a
mid-transition position) in a `useLayoutEffect`, re-measured on
`window resize`.

---

## 12. Reduced-motion behavior

| System | Behavior under `prefers-reduced-motion: reduce` |
|---|---|
| Marquees (§7) | `animation: none !important` — static, last frame shown |
| Reveal-on-scroll (§8) | `[data-reveal]` forced to `opacity: 1; transform: none; transition: none` |
| `pai-work-copy` (§6) | Children forced to `opacity: 1; animation: none` |
| Footer uncover (§9) | Short-circuits to `clip-path: none; transform: none` — footer renders fully settled immediately |
| Reveal-on-scroll (§8) detection loop | Skipped entirely inside `update()` — harmless because the `[data-reveal]` CSS override above already forces every reveal target to its visible end-state regardless of React state |
| Hero parallax/fade (§2), background gradient morph (§3), pinned gallery translate (§5) | **Not gated** — `reduceMotionRef` is only checked by the footer-uncover and reveal-on-scroll blocks inside `update()`; these keep running exactly as normal under `prefers-reduced-motion: reduce`. Worth flagging as a real gap if full compliance is a goal, not a "handled elsewhere" case |
| 3D logo (§4) | Idle rotation/bob and the beam-pulse glow are skipped every frame; cursor tracking still runs. `matchMedia` is read once when the scene initializes (mount), cached in a closure `const` — same one-time-check pattern as the scroll driver's `reduceMotionRef`, not re-evaluated if the OS setting changes mid-session |

Everything else in scope here (progress rail, testimonials track) has no
explicit reduced-motion override — these are short (350–600ms)
state-triggered transitions, not continuous/ambient motion, so they're
left as-is. (The navbar's own reduced-motion behavior, if any, is
documented alongside the rest of its animation — see the components
listed at the top of this file, out of scope here.)
