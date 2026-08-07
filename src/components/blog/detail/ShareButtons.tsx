"use client";

import { useState } from "react";

type ShareButtonsProps = {
  title: string;
};

const ICONS = {
  link: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 15 15 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M11 7.5 12.6 5.9a4 4 0 1 1 5.5 5.5L16.5 13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 16.5 11.4 18.1a4 4 0 1 1-5.5-5.5L7.5 11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  check: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12.5 9.5 17 19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  x: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-6.9L4.4 22H1.3l8.1-9.3L1 2h7.1l4.9 6.3L18.9 2Zm-1.2 18h1.9L7.4 4H5.4l12.3 16Z" />
    </svg>
  ),
  linkedin: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
};

const BUTTON_CLASS =
  "flex h-9 w-9 items-center justify-center rounded-full border border-ink/12 text-text transition-colors hover:bg-ink/5";

/** Sidebar "Share" block — copy-link + X + LinkedIn, same circular
 * icon-button idiom FinalCtaFooter uses for its social row (there:
 * `border-white/40` on a dark panel; here: `border-ink/12` on the light
 * sidebar, since this sits in ArticleSidebar next to AuthorCard/
 * TableOfContents, not the footer). Reads the article's own URL from
 * `window.location.href` at click time rather than via a prop — this is
 * the actual page currently open, so there's nothing to pass down and no
 * risk of it drifting from the real address. */
export function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const currentUrl = () => (typeof window !== "undefined" ? window.location.href : "");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl());
    } catch {
      // Clipboard API can fail (denied permission, insecure context) — no
      // recovery path worth building for a marketing blog; button simply
      // won't flip to the "copied" state below.
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const shareTo = (network: "x" | "linkedin") => {
    const url = encodeURIComponent(currentUrl());
    const text = encodeURIComponent(title);
    const href =
      network === "x"
        ? `https://twitter.com/intent/tweet?url=${url}&text=${text}`
        : `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    window.open(href, "_blank", "noopener,noreferrer,width=600,height=600");
  };

  return (
    <div className="flex flex-col gap-3">
      <span className="text-[12px] font-medium tracking-[0.1em] text-muted uppercase">Share</span>
      <div className="flex items-center gap-2">
        <button type="button" onClick={handleCopy} aria-label={copied ? "Link copied" : "Copy link"} className={BUTTON_CLASS}>
          {copied ? ICONS.check : ICONS.link}
        </button>
        <button type="button" onClick={() => shareTo("x")} aria-label="Share on X" className={BUTTON_CLASS}>
          {ICONS.x}
        </button>
        <button type="button" onClick={() => shareTo("linkedin")} aria-label="Share on LinkedIn" className={BUTTON_CLASS}>
          {ICONS.linkedin}
        </button>
      </div>
      <span aria-live="polite" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
