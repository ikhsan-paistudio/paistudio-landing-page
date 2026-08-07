"use client";

import { revealStyle, useReduceMotion, useScrollDriver } from "@/lib/scroll/useScrollDriver";

type RichTextSectionProps = {
  /** Static paragraphs for now. Per the brief, this block is meant to
   * become a rich-text/CMS-driven field later — kept as a plain
   * `string[]` (one paragraph per entry, same as ArticleBody's
   * "paragraph" block type) rather than pre-building a rich-text schema
   * nothing yet consumes. Swap the data source here once that field
   * exists; the markup below (plain `<p>`s) already matches ArticleBody's
   * own paragraph treatment, so a straightforward block-renderer can
   * replace this without a visual change. */
  paragraphs: string[];
  revealId: string;
};

export function RichTextSection({ paragraphs, revealId }: RichTextSectionProps) {
  const { revealed } = useScrollDriver();
  const reduceMotion = useReduceMotion();

  return (
    <div
      data-reveal="1"
      data-reveal-id={revealId}
      className="pai-container mx-auto flex w-full max-w-[840px] flex-col gap-5 px-10 py-16 max-[900px]:px-7 max-[560px]:px-5"
      style={revealStyle(revealed, revealId, reduceMotion)}
    >
      {paragraphs.map((paragraph, i) => (
        <p key={i} className="m-0 text-[18px] leading-[1.6] text-muted">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
