# ThreeLogoBackground

**File:** `src/components/ThreeLogoBackground.tsx`
**Type:** Client component (`"use client"`), always loaded via
`next/dynamic` with `{ ssr: false }` — never rendered server-side
**Renders inside:** `FixedBackground`'s glHost div

## Purpose
Animated 3D "paistudio" glyph logo rendered with raw Three.js (not
`@react-three/fiber`). A small extruded, beveled version of the brand
mark, with a green-glass physical material, a Fresnel rim-glow shader,
cursor-tracking rotation/tilt, and a press/spring touch interaction.
Reproduces the source prototype's WebGL scene at full fidelity, ported
from Three.js r128 (CDN global) to the current npm `three` package.

## Props
| Prop | Type | Required | Description |
|---|---|---|---|
| `logoMode` | `'hero' \| 'cta'` | yes | Which layout mode the logo eases toward. `'hero'`: centered-ish (`x=1.5`, `y≈5.0`, drifting). `'cta'`: shifted right (`x=8.6`, `y≈0.4`) to sit beside the "Why Paistudio" copy. |

## Dependencies
- `three` (npm, current version — **not** the prototype's CDN r128)
- No app-level context/hooks — fully self-contained; `logoMode` is the
  only external input, passed down from `FixedBackground` /
  `useScrollDriver`.

## Behavior (all inside one `useEffect(() => {...}, [])`, cleanup on unmount)
- Builds the logo geometry once by sampling an inline SVG path
  (`LOGO_PATH_D`) into 320 points via `getPointAtLength`, converting to a
  `THREE.Shape`, then `ExtrudeGeometry` (depth 8, beveled).
- Builds a procedural dark-green equirectangular environment texture on a
  `<canvas>` (not an image asset) for reflections via `PMREMGenerator`.
- Two materials share the same geometry: a `MeshPhysicalMaterial` (green
  glass look, `opacity: 0.05`, `clearcoat: 0.35`) and a custom
  `ShaderMaterial` Fresnel rim-glow (hand-written GLSL, additive
  blending).
- Lights: ambient, key directional, green rim directional (color
  `0x33a86a` — theme is hardcoded to the prototype's "Forest" preset, no
  live switcher), fill directional, and a cursor-following `PointLight`.
- `logoModeRef` (a ref, synced from the `logoMode` prop via a small
  separate effect — not written during render, to satisfy
  `react-hooks/refs`) is read every animation frame so the render loop
  doesn't need to restart when the mode prop changes; position eases
  toward the target with `+= (target - current) * 0.07` each frame.
- Mouse/touch move drives cursor-proximity easing (tilt, scale pulse,
  point-light intensity); mousedown/touchstart drives a "press and spring
  back" squash-and-bounce effect.
- A synced glow pulse (`beamPulse1`/`beamPulse2`, 13s/17s cycles)
  modulates the Fresnel intensity and rim-light intensity — this
  originally matched two CSS light-beam elements in the source prototype
  that are **not present** in this rebuild's markup, but the pulse math
  is kept because it's a real, visible effect on the logo's own glow, not
  dead code.
- Render loop is paused (not just hidden) via `IntersectionObserver`
  (host off-screen) and `document.visibilitychange` (tab backgrounded) —
  avoids wasting GPU cycles when the logo isn't visible.
- Full cleanup on unmount: disposes geometry, both materials, env map,
  and the renderer; removes all `window`/`document` event listeners;
  disconnects the `IntersectionObserver`.

## Visual Specs
- Camera: `PerspectiveCamera(40, aspect, 0.1, 200)` at `(0, 0, 34)`.
- Renderer: `antialias`, `alpha: true`, `outputColorSpace:
  THREE.SRGBColorSpace` (modern equivalent of the prototype's deprecated
  `sRGBEncoding`), `ACESFilmicToneMapping`, exposure `1.05`.
- Base scale `0.44`, responsively adjusted between `0.6×`–`1.15×` based
  on host width relative to a 1280px reference.
- Fills 100% width/height of its host div (`<div class="h-full w-full">`).

## Responsive Behavior
- No CSS breakpoints — resizes continuously via a `window resize`
  listener that reads `host.clientWidth/clientHeight` and updates the
  renderer size, camera aspect, and base scale.

## Accessibility
- Purely decorative canvas with no text alternative — acceptable since
  it sits inside `FixedBackground`'s `pointer-events-none`,
  non-interactive wrapper and conveys no unique information not already
  present in the surrounding text content.
- Respects `prefers-reduced-motion: reduce`: skips the continuous
  rotation/drift animation (logo still renders statically) when set.
