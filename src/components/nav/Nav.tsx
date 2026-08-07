"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BUILD_MENU, RESOURCES_MENU } from "@/lib/data/nav";
import { useScrollDriver } from "@/lib/scroll/useScrollDriver";
import { LetsTalkMenu } from "./LetsTalkMenu";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";

type NavProps = {
  /** Controls only `MobileNav`'s drawer chrome (background, border, shadow)
   * — a per-page fallback for that one full-screen-ish overlay. 'dark'
   * (default) is the homepage's dark look; 'light' is for permanently
   * light pages (e.g. /work). Everything else — the pill/hamburger/
   * MegaMenu/LetsTalkMenu chrome, and text/logo color — is driven
   * dynamically by `navOnLight` (below) instead, regardless of this prop;
   * see Behavior in Nav-docs.md for why. */
  theme?: "light" | "dark";
  /** Selects which chrome treatment `navOnLight` maps to for the pill/
   * hamburger/`LetsTalkMenu`-trigger/`MegaMenu`-panel surfaces — the logo
   * is unaffected either way (see Nav-v2-docs.md). 'v1' (default) is the
   * shipped light-glass pill (`bg-ink/5`, dark text) over light sections.
   * 'v2' swaps that specific case for a solid dark pill (`bg-ink/90`,
   * white text) instead; the dark-section case is identical in both. */
  chromeVariant?: "v1" | "v2";
};

export function Nav({ theme = "dark", chromeVariant = "v1" }: NavProps) {
  const { navOnLight, gotoId } = useScrollDriver();

  const [mobileOpen, setMobileOpen] = useState(false);

  // Logo always follows what's actually behind the nav (navOnLight — see
  // useScrollDriver.tsx) regardless of chromeVariant — it sits directly on
  // the page background, not on the pill, so v2's chrome swap doesn't
  // touch it (see Nav-v2-docs.md).
  const showDarkLogo = navOnLight;

  // `isLightChrome` drives Nav's own pill/hamburger light-vs-dark branch
  // below — in v1 it's just `navOnLight` (unchanged, original behavior);
  // in v2 it's always `false`. `MegaMenu` and `LetsTalkMenu` both need
  // their *raw* `navOnLight` plus `chromeVariant` passed through instead
  // of this collapsed value — they each compute their own `isDarkOnLight`
  // internally, because their existing "dark" branches (`bg-white/8` for
  // LetsTalkMenu's trigger, `hover:bg-white/14` for both trigger hovers)
  // are translucent-white values tuned for a *dark* page behind them, and
  // silently go invisible if collapsed straight into via a passed-in
  // `false` over v2's actually-white page — bit this project once already
  // (see Nav-v2-docs.md's Implementation section for the full story).
  const isLightChrome = chromeVariant === "v1" && navOnLight;
  // The v2 "solid dark pill on a white section" case — kept as its own
  // named condition (not just inlined at each call site) because its
  // *hover* value needed a real fix too: `hover:bg-white/14` (correct for
  // the `!isLightChrome` dark-on-dark case) replaces the base
  // `background-color` outright on hover rather than layering on top of
  // it, so reusing it here silently recreated the exact "invisible over
  // a white section" bug, just on :hover instead of at rest. `isDarkOnLight`
  // gets its own `hover:bg-ink/75` — a lighter shade of the same dark
  // family, not a swap to a translucent-white value tuned for dark pages.
  const isDarkOnLight = chromeVariant === "v2" && navOnLight;
  const textColorClass = isLightChrome ? "text-text/82" : "text-white/82";
  const hamburgerTextClass = isLightChrome ? "text-text" : "text-white";

  const chromeClass = isDarkOnLight
    ? "border-white/12 bg-ink/90 shadow-[0_6px_24px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.14)]"
    : isLightChrome
      ? "border-ink/12 bg-ink/5 shadow-[0_6px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.6)]"
      : "border-white/16 bg-white/8 shadow-[0_6px_24px_rgba(255,255,255,0.14),inset_0_1px_0_rgba(255,255,255,0.18)]";
  const pillLinkHoverClass = isDarkOnLight ? "hover:bg-ink/75" : isLightChrome ? "hover:bg-ink/10" : "hover:bg-white/14";
  const hamburgerChromeClass = isDarkOnLight
    ? "border-white/12 bg-ink/90"
    : isLightChrome
      ? "border-ink/12 bg-ink/5"
      : "border-white/16 bg-white/8";

  return (
    <nav className="fixed top-0 right-0 left-0 z-40 flex h-20 items-center justify-between px-10 max-[900px]:px-6 max-[560px]:h-[68px] max-[560px]:px-4">
      <Link href="/" className="relative block h-6 w-[137px] shrink-0" aria-label="Paistudio home">
        <Image
          src="/logos/paistudio-logo-dark.svg"
          alt="paistudio"
          fill
          className="object-contain"
          style={{ opacity: showDarkLogo ? 1 : 0 }}
        />
        <Image
          src="/logos/paistudio-logo-light.svg"
          alt=""
          aria-hidden="true"
          fill
          className="object-contain"
          style={{ opacity: showDarkLogo ? 0 : 1 }}
        />
      </Link>

      <div
        className={`absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border p-[5px] text-[14px] tracking-[0.02em] backdrop-blur-lg backdrop-saturate-150 max-[900px]:hidden ${chromeClass} ${textColorClass}`}
      >
        <a
          href="#work"
          onClick={(e) => {
            e.preventDefault();
            gotoId("work");
          }}
          className={`cursor-pointer rounded-full px-[18px] py-2 transition-colors ${pillLinkHoverClass}`}
        >
          Our Work
        </a>
        <MegaMenu
          label="Build"
          navOnLight={navOnLight}
          chromeVariant={chromeVariant}
          panelWidthClassName="w-[420px]"
          columns={[
            { title: "What We Build", links: BUILD_MENU.whatWeBuild },
            { title: "How We Build It", links: BUILD_MENU.howWeBuildIt },
          ]}
        />
        <a
          href="#pricing"
          onClick={(e) => {
            e.preventDefault();
            gotoId("pricing");
          }}
          className={`cursor-pointer rounded-full px-[18px] py-2 transition-colors ${pillLinkHoverClass}`}
        >
          Pricing
        </a>
        <MegaMenu
          label="Resources"
          navOnLight={navOnLight}
          chromeVariant={chromeVariant}
          panelWidthClassName="w-[230px]"
          columns={[{ links: RESOURCES_MENU }]}
        />
      </div>

      <div className="flex items-center gap-8 max-[900px]:gap-3">
        <div className="max-[900px]:hidden">
          <LetsTalkMenu variant="nav" align="right" navOnLight={navOnLight} chromeVariant={chromeVariant} />
        </div>
        <button
          type="button"
          className={`hidden items-center justify-center rounded-full border p-2.5 backdrop-blur-lg backdrop-saturate-150 max-[900px]:flex ${hamburgerChromeClass} ${hamburgerTextClass}`}
          aria-label="Open menu"
          aria-haspopup="true"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} theme={theme} />
    </nav>
  );
}
