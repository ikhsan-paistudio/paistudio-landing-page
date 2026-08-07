"use client";

import Image from "next/image";
import { fadeStyle, useReduceMotion, useScrollDriver } from "@/lib/scroll/useScrollDriver";
import type { ProjectImageRef } from "@/types/work";

type SplitImageRowProps = {
  images: [ProjectImageRef, ProjectImageRef];
  revealId: string;
};

/** Two images side by side, 50/50, with a small gap between them. Each
 * half gets the same treatment as ContainedImage — a `#E0E0E0` container
 * with the image itself capped at a max-width, so the container color
 * frames it rather than the image filling the whole half. */
export function SplitImageRow({ images, revealId }: SplitImageRowProps) {
  const { revealed } = useScrollDriver();
  const reduceMotion = useReduceMotion();

  return (
    <div
      data-reveal="1"
      data-reveal-id={revealId}
      className="grid w-full grid-cols-2 gap-2 max-[560px]:grid-cols-1"
      style={fadeStyle(revealed, revealId, reduceMotion)}
    >
      {images.map((img) => (
        <div key={img.src} className="relative w-full bg-[#E0E0E0]" style={{ aspectRatio: "1 / 1" }}>
          <div className="relative mx-auto h-full w-full max-w-[80%]">
            <Image src={img.src} alt={img.alt} fill className="object-contain" />
          </div>
        </div>
      ))}
    </div>
  );
}
