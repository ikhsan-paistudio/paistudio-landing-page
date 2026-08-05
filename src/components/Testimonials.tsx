"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { AVATAR_HUES, TESTIMONIALS } from "@/lib/data/testimonials";
import { revealStyle, useReduceMotion, useScrollDriver } from "@/lib/scroll/useScrollDriver";

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2);
}

export function Testimonials() {
  const { revealed } = useScrollDriver();
  const reduceMotion = useReduceMotion();
  const [active, setActive] = useState(1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [offset, setOffset] = useState<number | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current;
      const slide = slideRefs.current[active];
      if (!wrap || !slide) return;
      const wrapW = wrap.clientWidth;
      const slideCenterInTrack = slide.offsetLeft + slide.offsetWidth / 2;
      setOffset(Math.round(wrapW / 2 - slideCenterInTrack));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  const tOffset = offset ?? 580 - active * 680;

  return (
    <section
      id="testimonials"
      data-nav-bg="light"
      className="relative z-1 flex flex-col justify-center bg-paper pt-[130px] pb-[110px]"
    >
      <div className="pai-container mx-auto w-full max-w-[1240px] px-10">
        <div className="mb-11 flex items-center justify-center gap-1.5 text-muted">
          <svg width="11" height="11" viewBox="0 0 10 10" fill="none" aria-hidden="true" className="shrink-0">
            <path
              d="M2 8L8 2M8 2H3M8 2V7"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[12px] font-medium tracking-[0.1em] uppercase">WHAT CLIENTS SAY</span>
        </div>

        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Now showing testimonial from {TESTIMONIALS[active].name}, {TESTIMONIALS[active].role}
        </div>

        <div
          ref={wrapRef}
          data-reveal="1"
          data-reveal-id="testimonialsWrap"
          className="w-full overflow-hidden"
          style={{
            maskImage: "linear-gradient(90deg, transparent 0, #000 14%, #000 86%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(90deg, transparent 0, #000 14%, #000 86%, transparent 100%)",
            ...revealStyle(revealed, "testimonialsWrap", reduceMotion),
          }}
        >
          <div
            className="flex items-stretch gap-10 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(${tOffset}px)` }}
          >
            {TESTIMONIALS.map((t, i) => {
              const isActive = i === active;
              return (
                <button
                  key={t.name}
                  type="button"
                  ref={(el) => {
                    slideRefs.current[i] = el;
                  }}
                  aria-current={isActive}
                  aria-label={`Show testimonial from ${t.name}`}
                  onClick={() => setActive(i)}
                  className="pai-testimonial-slide box-border flex flex-col items-center text-center transition-[opacity,transform] duration-[600ms] max-[560px]:px-3"
                  style={{
                    flex: "0 0 min(640px,88vw)",
                    padding: "0 24px",
                    cursor: isActive ? "default" : "pointer",
                    opacity: isActive ? 1 : 0.28,
                    transform: `scale(${isActive ? 1 : 0.9})`,
                    filter: isActive ? "none" : "blur(0.5px)",
                  }}
                >
                  <span className="mb-[26px] text-[50px] leading-[0.5] font-semibold text-brand" aria-hidden="true">
                    &ldquo;
                  </span>
                  <p className="pai-testimonial-quote m-0 mb-[34px] text-[30px] leading-[1.5] font-normal tracking-[-0.01em] text-text text-pretty max-[560px]:text-[21px]">
                    {t.quote}
                  </p>
                  {t.avatarSrc ? (
                    <Image
                      src={t.avatarSrc}
                      alt=""
                      width={60}
                      height={60}
                      className="mb-3.5 block h-[60px] w-[60px] rounded-full border border-ink/10 object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="mb-3.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-cream"
                      style={{ background: AVATAR_HUES[i % AVATAR_HUES.length] }}
                    >
                      {initialsOf(t.name)}
                    </span>
                  )}
                  <div className="mt-1.5 text-[14px] font-semibold text-text">{t.name}</div>
                  <div className="mt-[5px] text-[12px] tracking-[0.04em] text-muted">{t.role}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
