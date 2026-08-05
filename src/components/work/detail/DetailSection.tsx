"use client";

import { revealStyle, useReduceMotion, useScrollDriver } from "@/lib/scroll/useScrollDriver";
import type { ProjectSection } from "@/types/work";

type DetailSectionProps = ProjectSection & {
  /** Unique per-instance id for the shared scroll-reveal system (data-reveal-id). */
  revealId: string;
};

/** One repeating two-column block: an uppercase label on the left, heading + body on the right. */
export function DetailSection({ label, heading, body, revealId }: DetailSectionProps) {
  const { revealed } = useScrollDriver();
  const reduceMotion = useReduceMotion();

  return (
    <div
      data-reveal="1"
      data-reveal-id={revealId}
      className="pai-container mx-auto grid w-full max-w-[1240px] grid-cols-[200px_1fr] gap-12 px-10 py-14 max-[900px]:grid-cols-1 max-[900px]:gap-4 max-[900px]:px-7 max-[560px]:px-5"
      style={revealStyle(revealed, revealId, reduceMotion)}
    >
      <span className="text-[12px] font-medium tracking-[0.1em] text-muted uppercase">{label}</span>
      <div>
        <h2 className="m-0 mb-4 max-w-[640px] text-[26px] leading-[1.2] font-medium tracking-[-0.01em] text-text text-balance">
          {heading}
        </h2>
        <p className="m-0 max-w-[640px] text-[18px] leading-[1.6] text-muted">{body}</p>
      </div>
    </div>
  );
}
