"use client";

import { fadeStyle, useReduceMotion, useScrollDriver } from "@/lib/scroll/useScrollDriver";
import type { ArticleTocEntry, BlogPostAuthor } from "@/types/blog";
import { AuthorCard } from "./AuthorCard";
import { ShareButtons } from "./ShareButtons";
import { TableOfContents } from "./TableOfContents";

type ArticleSidebarProps = {
  author: BlogPostAuthor;
  toc: ArticleTocEntry[];
  title: string;
};

/** Narrower sticky sidebar column: author row + "Sections" TOC (the
 * newsletter box was removed per request). `top-[104px]` = the fixed
 * nav's height (80px, `h-20`) plus a small gap — a new but purely
 * structural offset value, not a visual style (see FLAGGED note in
 * ArticleBody.tsx re: the matching `scroll-mt-[104px]` on headings). No
 * prior sticky-sidebar precedent exists in the docs; `position: sticky`
 * itself is only used elsewhere for the homepage's pinned work-gallery
 * mechanic, a functionally different use — flagged per the brief's own
 * example. */
export function ArticleSidebar({ author, toc, title }: ArticleSidebarProps) {
  const { revealed } = useScrollDriver();
  const reduceMotion = useReduceMotion();

  return (
    <div
      data-reveal="1"
      data-reveal-id="articleSidebar"
      className="sticky top-[104px] flex h-fit flex-col gap-8 max-[900px]:static"
      style={fadeStyle(revealed, "articleSidebar", reduceMotion)}
    >
      <AuthorCard author={author} />
      <TableOfContents entries={toc} />
      <ShareButtons title={title} />
    </div>
  );
}
