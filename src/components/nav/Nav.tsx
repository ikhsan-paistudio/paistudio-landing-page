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
};

export function Nav({ theme = "dark" }: NavProps) {
  const { navOnLight, gotoId } = useScrollDriver();

  const [mobileOpen, setMobileOpen] = useState(false);

  // Logo, text, AND chrome (pill/hamburger background+border+shadow) all
  // follow what's actually behind the nav right now (navOnLight — see
  // useScrollDriver.tsx), on every page: dark logo/text/light-glass chrome
  // over light sections, light logo/text/dark-glass chrome otherwise. This
  // used to be split — chrome was a static per-page `theme` choice while
  // only text/logo tracked scroll position — which left the pill nearly
  // invisible (dark glass barely visible on a light section, or light
  // glass barely visible on a dark section) whenever a page's dominant
  // theme didn't match what was currently scrolled behind the nav (the
  // homepage's pinned "Our Work" section, and every light page's dark
  // green footer, both hit this). Chrome now flips together with
  // text/logo instead.
  const showDarkLogo = navOnLight;
  const textColorClass = navOnLight ? "text-text/82" : "text-white/82";
  const hamburgerTextClass = navOnLight ? "text-text" : "text-white";

  const chromeClass = navOnLight
    ? "border-ink/12 bg-ink/5 shadow-[0_6px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.6)]"
    : "border-white/16 bg-white/8 shadow-[0_6px_24px_rgba(255,255,255,0.14),inset_0_1px_0_rgba(255,255,255,0.18)]";
  const pillLinkHoverClass = navOnLight ? "hover:bg-ink/10" : "hover:bg-white/14";
  const hamburgerChromeClass = navOnLight ? "border-ink/12 bg-ink/5" : "border-white/16 bg-white/8";

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
          panelWidthClassName="w-[230px]"
          columns={[{ links: RESOURCES_MENU }]}
        />
      </div>

      <div className="flex items-center gap-8 max-[900px]:gap-3">
        <div className="max-[900px]:hidden">
          <LetsTalkMenu variant="nav" align="right" navOnLight={navOnLight} />
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
