"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { NavLink } from "@/types/content";

type MegaMenuProps = {
  label: string;
  columns: { title?: string; links: NavLink[] }[];
  panelWidthClassName: string;
  /** Chrome (trigger hover tint + panel background/border/shadow/links) —
   * driven by `Nav`'s dynamic `navOnLight`, so this panel's chrome flips
   * together with the pill it drops down from instead of staying fixed
   * per-page (see Nav.tsx's Behavior comment). */
  navOnLight?: boolean;
};

export function MegaMenu({ label, columns, panelWidthClassName, navOnLight = false }: MegaMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const close = () => setOpen(false);

  const triggerHoverClass = navOnLight ? "hover:bg-ink/10" : "hover:bg-white/14";
  const panelClass = navOnLight
    ? "border-ink/10 bg-white/95 shadow-[0_18px_48px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.6)]"
    : "border-white/14 bg-[#121210f2] shadow-[0_18px_48px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.12)]";
  const titleClass = navOnLight ? "text-text/66" : "text-white/66";
  const linkClass = navOnLight
    ? "text-text/90 hover:bg-ink/8 hover:text-text"
    : "text-white/90 hover:bg-white/10 hover:text-white";

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) close();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          close();
          wrapRef.current?.querySelector("button")?.focus();
        }
      }}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-[18px] py-2 text-current transition-colors ${triggerHoverClass}`}
      >
        <span>{label}</span>
        <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true" className="opacity-60">
          <path
            d="M2 3.5L5 6.5L8 3.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        className="absolute left-1/2 top-full pt-3.5 transition-[opacity,transform] duration-200"
        style={{
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          pointerEvents: open ? "auto" : "none",
          transform: open ? "translate(-50%,0)" : "translate(-50%,8px)",
        }}
      >
        <div
          className={`flex gap-7 rounded-[32px] border px-4 py-[22px] text-left backdrop-blur-2xl backdrop-saturate-150 ${panelClass} ${panelWidthClassName}`}
        >
          {columns.map((col, i) => (
            <div key={i} className="flex flex-1 flex-col gap-0.5">
              {col.title && (
                <div className={`mb-2 px-2.5 text-[12px] font-medium tracking-[0.1em] uppercase ${titleClass}`}>
                  {col.title}
                </div>
              )}
              {col.links.map((link) => {
                const isExternal = link.href.startsWith("http");
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener" : undefined}
                    className={`rounded-full px-2.5 py-[7px] text-[14px] transition-colors ${linkClass}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
