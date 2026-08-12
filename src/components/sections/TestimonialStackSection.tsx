"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import { AVATAR_HUES, TESTIMONIALS } from "@/lib/data/testimonials";
import { useReduceMotion } from "@/lib/scroll/useScrollDriver";
import type { Testimonial } from "@/types/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2);
}

type TestimonialStackSectionProps = {
  heading: string;
  /** Defaults to the same real testimonial content `Testimonials.tsx`
   * already uses (`src/lib/data/testimonials.ts`) — reused directly
   * rather than fabricated placeholder quotes, per request ("dengan
   * content yg sama"). Still overridable per page like every other
   * section in this library. */
  testimonials?: Testimonial[];
};

/** SEC-04B · Pinned Testimonial Stack. GSAP + ScrollTrigger: the section
 * pins for `testimonials.length * 100vh` of scroll while a timeline,
 * scrubbed to scroll progress, cross-fades each card out (up + slight
 * shrink) as the next one fades in (from below) in the exact same spot —
 * cards replace each other in place rather than the page scrolling past
 * them.
 *
 * Desktop/tablet only (`≥768px`, matching Tailwind's own `md` breakpoint
 * so the JS gate and the CSS `hidden md:block` toggle agree) — gated via
 * `gsap.matchMedia()` so resizing across that breakpoint cleanly
 * creates/tears down the pin instead of leaving a stale one. Below that,
 * a separate plain vertically-stacked card list renders instead (no
 * pin/scrub/GSAP at all) — genuinely simpler markup, not the same layout
 * with the animation switched off.
 *
 * `useReduceMotion()` (this project's existing hook, already used by
 * `FinalCtaFooter`/`Testimonials`) skips the pin + timeline entirely and
 * just snaps every card to its resting position — motion-sensitive users
 * still get the content, no scroll-jacking.
 *
 * Known trade-off: the desktop cards are `position: absolute`, stacked in
 * the same spot, and only the first one gets a default-visible CSS state;
 * cards 2+ are only made invisible via `gsap.set` at runtime. A JS-free
 * desktop viewport (rare — real assistive tech and search crawlers read
 * DOM text regardless of visual overlap; `prefers-reduced-motion` and the
 * `<768px` case are both handled above) would see them overlapping. The
 * mobile breakpoint is the actual accessible fallback path here, not a
 * no-JS shim. */
export function TestimonialStackSection({ heading, testimonials = TESTIMONIALS }: TestimonialStackSectionProps) {
  const reduceMotion = useReduceMotion();
  const pinRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotGridId = useId().replace(/:/g, "");

  if (process.env.NODE_ENV !== "production" && testimonials.length < 2) {
    console.error(`TestimonialStackSection (SEC-04B): expected at least 2 testimonials, got ${testimonials.length}.`);
  }

  useEffect(() => {
    if (!pinRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter((el): el is HTMLDivElement => !!el);
      if (cards.length === 0) return;

      if (reduceMotion) {
        // Snap to the resting state, no animation/pin/scrub at all.
        gsap.set(cards, { opacity: 1, y: 0, scale: 1, clearProps: "opacity,transform" });
        if (headingRef.current) gsap.set(headingRef.current, { opacity: 1, scale: 1 });
        return;
      }

      // Heading entrance: subtle scale-up as the section comes into view.
      // Independent of the pin trigger below (`toggleActions` plays once
      // on the way down, reverses on the way back up) — not scrubbed.
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, scale: 0.7 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: pinRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Pinned cross-fade stack — desktop/tablet only. `gsap.matchMedia()`
      // (not the deprecated `ScrollTrigger.matchMedia({...})` static) —
      // created inside this `gsap.context()`, so `ctx.revert()` below
      // tears the query down too, same as everything else scoped here.
      gsap.matchMedia().add("(min-width: 768px)", () => {
        if (cards.length < 2) return;

        gsap.set(cards[0], { opacity: 1, y: 0, scale: 1 });
        gsap.set(cards.slice(1), { opacity: 0, y: 40, scale: 1 });

        const tl = gsap.timeline();
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          const next = cards[i + 1];
          tl.to(card, { opacity: 0, y: -40, scale: 0.94, duration: 1, ease: "power1.inOut" }, i).to(
            next,
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power1.inOut" },
            i
          );
        });

        ScrollTrigger.create({
          trigger: pinRef.current,
          start: "top top",
          end: () => "+=" + cards.length * window.innerHeight,
          pin: true,
          scrub: true,
          animation: tl,
        });
      });
    }, pinRef);

    return () => ctx.revert();
  }, [reduceMotion, testimonials]);

  return (
    <section data-nav-bg="light" className="relative bg-paper">
      {/* Desktop/tablet: pinned cross-fade stack */}
      <div ref={pinRef} className="relative hidden h-screen flex-col items-center justify-center overflow-hidden px-10 md:flex">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 text-ink/[0.08]"
          viewBox="0 0 900 900"
        >
          <defs>
            <pattern id={`dots-${dotGridId}`} width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="currentColor" />
            </pattern>
            <radialGradient id={`fade-${dotGridId}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="70%" stopColor="#fff" stopOpacity="1" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id={`mask-${dotGridId}`}>
              <rect width="900" height="900" fill={`url(#fade-${dotGridId})`} />
            </mask>
          </defs>
          <rect width="900" height="900" fill={`url(#dots-${dotGridId})`} mask={`url(#mask-${dotGridId})`} />
        </svg>

        <h2
          ref={headingRef}
          className="relative z-10 m-0 mb-14 max-w-[720px] text-center text-[48px] leading-[1.1] font-bold tracking-[-0.02em] text-text text-balance"
        >
          {heading}
        </h2>

        <div className="relative z-10 h-[380px] w-full max-w-[880px]">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute inset-0 flex overflow-hidden rounded-[32px] bg-white shadow-[0_24px_64px_rgba(0,0,0,0.14)]"
            >
              <div className="relative flex w-[38%] shrink-0 items-center justify-center bg-cream">
                {t.avatarSrc ? (
                  <Image src={t.avatarSrc} alt="" fill sizes="(min-width: 768px) 334px, 0px" className="object-cover" />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex h-20 w-20 items-center justify-center rounded-full text-[22px] font-semibold text-cream"
                    style={{ background: AVATAR_HUES[i % AVATAR_HUES.length] }}
                  >
                    {initialsOf(t.name)}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col justify-center gap-6 p-12">
                <p className="m-0 text-[22px] leading-[1.5] font-normal text-text text-pretty">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div className="text-[15px] font-semibold text-text">{t.name}</div>
                  <div className="mt-1 text-[13px] tracking-[0.02em] text-muted">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile fallback: plain stacked card list — no pin, no GSAP */}
      <div className="pai-container mx-auto w-full max-w-[1240px] px-6 py-16 md:hidden">
        <h2 className="m-0 mb-8 text-center text-[32px] leading-[1.15] font-bold tracking-[-0.02em] text-text text-balance">
          {heading}
        </h2>
        <div className="flex flex-col gap-5">
          {testimonials.map((t, i) => (
            <div key={t.name} className="flex flex-col gap-5 rounded-[24px] bg-white p-6 shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-3">
                {t.avatarSrc ? (
                  <Image src={t.avatarSrc} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-cream"
                    style={{ background: AVATAR_HUES[i % AVATAR_HUES.length] }}
                  >
                    {initialsOf(t.name)}
                  </span>
                )}
                <div>
                  <div className="text-[14px] font-semibold text-text">{t.name}</div>
                  <div className="mt-0.5 text-[12px] tracking-[0.02em] text-muted">{t.role}</div>
                </div>
              </div>
              <p className="m-0 text-[16px] leading-[1.6] text-text text-pretty">&ldquo;{t.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}