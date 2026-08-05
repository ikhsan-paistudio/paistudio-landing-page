"use client";

import Image from "next/image";
import Link from "next/link";
import { FOOTER_COLUMNS, SOCIAL_LINKS } from "@/lib/data/nav";
import { fadeStyle, revealStyle, useReduceMotion, useScrollDriver } from "@/lib/scroll/useScrollDriver";
import { LetsTalkMenu } from "./nav/LetsTalkMenu";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  Instagram: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" />
    </svg>
  ),
  LinkedIn: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8 10.5V17M8 7.5V7.51M12 17V13.2C12 11.5 13 10.5 14.3 10.5C15.6 10.5 16.5 11.4 16.5 13.2V17"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Bubble: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
};

type FinalCtaFooterProps = {
  /** Backdrop color behind the section's rounded top corners — must match
   * whatever the page background is, since the `rounded-t-[56px]` section
   * doesn't fill the full rectangle and this wrapper shows through the
   * cutouts. 'dark' (default) is the homepage's `bg-ink`; 'light' is
   * `bg-paper` for permanently light pages (e.g. /work). Purely a backdrop
   * fill — has no effect on the section's own gradient/content. */
  theme?: "light" | "dark";
};

export function FinalCtaFooter({ theme = "dark" }: FinalCtaFooterProps) {
  const { revealed } = useScrollDriver();
  const reduceMotion = useReduceMotion();

  return (
    <div className={`relative overflow-hidden ${theme === "light" ? "bg-paper" : "bg-ink"}`}>
      <div
        className="pointer-events-none absolute top-[-6%] left-1/2 z-0 h-[62%] w-[95%] -translate-x-1/2 blur-[26px]"
        style={{ background: "radial-gradient(50% 50% at 50% 28%, rgba(74,215,140,0.18), transparent 70%)" }}
      />
      <section
        id="contact"
        data-reveal="1"
        data-reveal-id="finalSection"
        className="relative z-1 overflow-hidden rounded-t-[56px] pt-[120px]"
        style={{
          background: "linear-gradient(180deg, #0d2a1c, #0f3322, #135232, #23A05D)",
          ...fadeStyle(revealed, "finalSection", reduceMotion),
        }}
      >
        <div className="pai-container mx-auto w-full max-w-[1200px] px-10">
          <div className="relative z-2 flex flex-col items-center gap-5 pb-[88px] text-center">
            <div className="flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 10 10" fill="none" aria-hidden="true" className="shrink-0">
                <path
                  d="M2 8L8 2M8 2H3M8 2V7"
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-[12px] font-medium tracking-[0.1em] text-white/85 uppercase">
                Let&apos;s Get In Touch
              </span>
            </div>
            <h2 className="pai-final-h2 m-0 text-[88px] leading-[1.08] font-bold tracking-[-0.4px] text-white text-balance max-[900px]:text-[50px] max-[560px]:text-[36px]">
              Not sure where to start?
            </h2>
            <p className="m-0 max-w-[800px] text-[18px] font-normal text-white/88">
              Whether you already have detailed requirements or just an idea, let&apos;s talk. We&apos;ll help
              define the scope, estimate the timeline, and recommend the best way to build your product.
            </p>
            <div className="mt-4 flex justify-center">
              <LetsTalkMenu variant="footer" align="center" />
            </div>
          </div>

          <div className="h-px w-full bg-white/16" />

          <footer className="pai-footer-grid grid grid-cols-[1.3fr_1fr_1fr_1fr] gap-14 py-20 max-[900px]:grid-cols-2 max-[900px]:gap-8 max-[560px]:grid-cols-1 max-[560px]:gap-9">
            <div
              data-reveal="1"
              data-reveal-id="footerBrand"
              className="flex max-w-[320px] flex-col gap-[18px]"
              style={revealStyle(revealed, "footerBrand", reduceMotion)}
            >
              <span className="relative block h-6 w-[137px]">
                <Image src="/logos/paistudio-logo-light.svg" alt="paistudio" fill className="object-contain" />
              </span>
              <p className="m-0 text-[14px] leading-[1.6] text-white/85">
                Helping founders design, build, and launch AI-powered SaaS, marketplaces, and internal tools faster
                using Bubble, AI, and modern no-code technologies.
              </p>
              <div className="mt-1 flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white/90 transition-colors hover:bg-white/14 hover:text-white"
                  >
                    {SOCIAL_ICONS[social.label]}
                  </a>
                ))}
              </div>
            </div>

            {FOOTER_COLUMNS.map((col, i) => {
              const revealId = `footerCol${i}`;
              return (
                <nav
                  key={col.title}
                  data-reveal="1"
                  data-reveal-id={revealId}
                  className="flex flex-col gap-3.5"
                  style={revealStyle(revealed, revealId, reduceMotion)}
                >
                  <h3 className="m-0 text-[14px] font-medium text-white">{col.title}</h3>
                  {col.links.map((link) => {
                    const isExternal = link.href.startsWith("http");
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener" : undefined}
                        className="text-[14px] text-white/85 no-underline transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
              );
            })}
          </footer>

          <div className="h-px w-full bg-white/14" />

          <div className="flex flex-wrap items-center justify-between gap-3 py-7">
            <span className="text-[12px] text-white/78">© 2026 Paistudio. All rights reserved.</span>
            <span className="text-[12px] text-white/78">Designed and built in Indonesia.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
