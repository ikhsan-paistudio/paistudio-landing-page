"use client";

import Image from "next/image";
import { fadeStyle, useReduceMotion, useScrollDriver } from "@/lib/scroll/useScrollDriver";

type FullBleedImageProps = {
  src: string;
  alt: string;
  revealId: string;
};

/** Edge-to-edge visual break between text blocks — no container, no rounded corners. */
export function FullBleedImage({ src, alt, revealId }: FullBleedImageProps) {
  const { revealed } = useScrollDriver();
  const reduceMotion = useReduceMotion();

  return (
    <div
      data-reveal="1"
      data-reveal-id={revealId}
      className="relative w-full"
      style={{ aspectRatio: "16 / 9", ...fadeStyle(revealed, revealId, reduceMotion) }}
    >
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}
