"use client";

import { revealStyle, useReduceMotion, useScrollDriver } from "@/lib/scroll/useScrollDriver";
import type { ProjectNumberedList } from "@/types/work";

function NumberedListBlock({ title, items, playStagger }: ProjectNumberedList & { playStagger: boolean }) {
  return (
    <div>
      <h3 className="m-0 mb-8 text-[26px] leading-[1.2] font-medium tracking-[-0.01em] text-text">{title}</h3>
      <div className={`pai-work-copy pai-armed flex flex-col gap-6${playStagger ? " pai-play" : ""}`}>
        {items.map((item, i) => (
          <div key={i} className="flex items-baseline gap-4">
            <span className="shrink-0 text-[12px] tracking-[0.1em] text-muted">
              {`( ${String(i + 1).padStart(2, "0")} )`}
            </span>
            <p className="m-0 text-[18px] leading-[1.4] font-medium text-text">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

type NumberedListGridProps = {
  lists: ProjectNumberedList[];
  revealId: string;
};

/** The four "( 01 ) ( 02 )..." numbered list blocks (Goals/Challenges/Solutions/Results),
 * arranged two-up. The whole grid fades/slides in on scroll (revealStyle), and that same
 * scroll-computed boolean also plays each block's own staggered item reveal
 * (pai-work-copy/pai-play, see globals.css / animation-specs.md §6) — same layered
 * pattern the homepage's "Our Work" gallery uses (panel entrance + staggered children). */
export function NumberedListGrid({ lists, revealId }: NumberedListGridProps) {
  const { revealed } = useScrollDriver();
  const reduceMotion = useReduceMotion();
  const shown = !!revealed[revealId];

  return (
    <div
      data-reveal="1"
      data-reveal-id={revealId}
      className="pai-container mx-auto grid w-full max-w-[1240px] grid-cols-2 gap-x-16 gap-y-14 px-10 py-14 max-[900px]:grid-cols-1 max-[900px]:px-7 max-[560px]:px-5"
      style={revealStyle(revealed, revealId, reduceMotion)}
    >
      {lists.map((list) => (
        <NumberedListBlock key={list.title} {...list} playStagger={shown} />
      ))}
    </div>
  );
}
