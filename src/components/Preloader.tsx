"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { useReduceMotion } from "@/lib/scroll/useScrollDriver";

const FADE_IN_MS = 450;
const HOLD_MS = 900;
const EXIT_MS = 650;
const CURVE_CLIP_ID = "pai-preloader-curve";

// useLayoutEffect warns when it runs during SSR (it never actually does —
// Next only runs client components' effects in the browser — but the
// warning fires on the module-eval check itself without this guard).
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Full-viewport first-load overlay: dark (`bg-ink`) panel, centered white
 * "Paistudio" wordmark fading/scaling in, a simulated 0→100% counter
 * (`tabular-nums` so the digits don't jitter as they change width), then
 * an exit where the panel's curved bottom edge — the exact same concave
 * clip-path math as CurvedRevealImage in work/detail-v2, "peel" being this
 * site's one established reveal language rather than inventing a second
 * one — sweeps up and off-screen to reveal the page.
 *
 * Plays on every full page load (no sessionStorage gate — an earlier
 * version only showed once per tab-session, but that made it awkward to
 * actually see during real use/testing, so it was removed). This still
 * doesn't replay on every internal click, though: this mounts once in the
 * root layout, and Next.js App Router doesn't remount the layout tree on
 * `<Link>` navigations — only an actual full page load re-triggers it.
 *
 * Default React state is "visible" (not "checking"/"idle") specifically so
 * the very first server-rendered paint already shows the overlay — no
 * blank-then-overlay flash while JS boots.
 */
export function Preloader() {
  const [phase, setPhase] = useState<"visible" | "exiting" | "done">("visible");
  // Starts false so the wordmark's "from" state (opacity 0, scale 0.96)
  // actually paints once before flipping to "entered" on the next frame —
  // flip it in the same tick as mount and the browser just skips straight
  // to the end state instead of transitioning.
  const [entered, setEntered] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReduceMotion();

  useIsomorphicLayoutEffect(() => {
    document.documentElement.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    if (phase !== "visible") return;
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  useEffect(() => {
    if (phase !== "visible") return;
    if (reduceMotion) {
      const exitTimer = window.setTimeout(() => {
        setProgress(100);
        setPhase("exiting");
      }, 200);
      return () => window.clearTimeout(exitTimer);
    }

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      setProgress(Math.min(100, Math.round((elapsed / HOLD_MS) * 100)));
      if (elapsed < HOLD_MS) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const exitTimer = window.setTimeout(() => setPhase("exiting"), HOLD_MS);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(exitTimer);
    };
  }, [phase, reduceMotion]);

  useEffect(() => {
    if (phase !== "exiting") return;
    const doneTimer = window.setTimeout(
      () => {
        document.documentElement.style.overflow = "";
        setPhase("done");
      },
      reduceMotion ? 150 : EXIT_MS
    );
    return () => window.clearTimeout(doneTimer);
  }, [phase, reduceMotion]);

  if (phase === "done") return null;

  const isExiting = phase === "exiting";
  const exitMs = reduceMotion ? 150 : EXIT_MS;
  const fadeInMs = reduceMotion ? 150 : FADE_IN_MS;
  const wordmarkShown = reduceMotion || entered;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[999]">
      {!reduceMotion && (
        <svg width="0" height="0" aria-hidden="true" className="absolute">
          <defs>
            <clipPath id={CURVE_CLIP_ID} clipPathUnits="objectBoundingBox">
              <path d="M0,0 L1,0 L1,0.88 C0.7,1 0.3,1 0,0.88 Z" />
            </clipPath>
          </defs>
        </svg>
      )}
      <div
        className="absolute inset-x-0 top-0 flex flex-col items-center justify-center gap-3 bg-ink"
        style={{
          height: reduceMotion ? "100%" : "112vh",
          clipPath: reduceMotion ? undefined : `url(#${CURVE_CLIP_ID})`,
          opacity: reduceMotion && isExiting ? 0 : 1,
          transform: !reduceMotion && isExiting ? "translate3d(0, -112vh, 0)" : "translate3d(0, 0, 0)",
          transition: isExiting
            ? reduceMotion
              ? `opacity ${exitMs}ms ease-in-out`
              : `transform ${exitMs}ms cubic-bezier(0.65, 0, 0.35, 1)`
            : "none",
        }}
      >
        <span
          className="text-[22px] font-bold tracking-[-0.01em] text-white"
          style={{
            opacity: isExiting ? 0 : wordmarkShown ? 1 : 0,
            transform: reduceMotion || wordmarkShown ? "scale(1)" : "scale(0.96)",
            transition: `opacity ${isExiting ? exitMs * 0.6 : fadeInMs}ms ease-out, transform ${fadeInMs}ms ease-out`,
          }}
        >
          Paistudio
        </span>
        <span
          className="text-[12px] tracking-[0.08em] text-white/60 tabular-nums"
          style={{
            opacity: isExiting ? 0 : wordmarkShown ? 1 : 0,
            transition: `opacity ${isExiting ? exitMs * 0.6 : fadeInMs}ms ease-out`,
          }}
        >
          {String(progress).padStart(2, "0")}%
        </span>
      </div>
    </div>
  );
}
