"use client";

import { useEffect, useState } from "react";
import type { ArticleTocEntry } from "@/types/blog";

type TableOfContentsProps = {
  entries: ArticleTocEntry[];
};

/** "Sections" list — scrollspy over the article body's headings.
 *
 * FLAGGED: no scroll-highlighted table-of-contents/nav exists anywhere in
 * the docs. `ProgressRail` is the closest precedent for an "active state
 * indicator that tracks scroll position" (its growing dot for the active
 * project), but it's driven by the homepage's pinned-gallery index via
 * `useScrollDriver`, not a general heading-observer — not reusable as-is
 * for arbitrary article headings. The active-detection here is a small,
 * new IntersectionObserver; the active/inactive *visual* treatment reuses
 * only established tokens (`text-text` vs `text-muted`, `border-brand` vs
 * `border-ink/10`, matching how BlogFilterTabs marks its active tab and
 * how ProgressRail marks its active dot). */
export function TableOfContents({ entries }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState(entries[0]?.id ?? "");

  useEffect(() => {
    const headings = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (observerEntries) => {
        const visible = observerEntries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
        setActiveId(topMost.target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [entries]);

  return (
    <nav aria-label="Sections" className="flex flex-col gap-1">
      <span className="mb-2 text-[12px] font-medium tracking-[0.1em] text-muted uppercase">Sections</span>
      {entries.map((entry) => {
        const isActive = entry.id === activeId;
        return (
          <a
            key={entry.id}
            href={`#${entry.id}`}
            aria-current={isActive}
            className={`border-l-2 py-1.5 pl-3 text-[14px] no-underline transition-colors ${
              isActive ? "border-brand font-medium text-text" : "border-ink/10 text-muted hover:text-text"
            }`}
          >
            {entry.label}
          </a>
        );
      })}
    </nav>
  );
}
