"use client";

import Image from "next/image";
import { fadeStyle, useReduceMotion, useScrollDriver } from "@/lib/scroll/useScrollDriver";

type ContainedImageProps = {
  src: string;
  alt: string;
  revealId: string;
};

/** Full-width "layer" for the v2 image stack — unlike v1's shared
 * FullBleedImage (true edge-to-edge, no background ever showing), this
 * wraps the image in a `#E0E0E0` container and caps the image itself at a
 * max-width, so the container color shows as a visible frame around it
 * instead of the image filling the whole box. Kept as its own v2-only
 * component (not an edit to FullBleedImage) so v1's breakImages stay true
 * full-bleed, unaffected. */
export function ContainedImage({ src, alt, revealId }: ContainedImageProps) {
  const { revealed } = useScrollDriver();
  const reduceMotion = useReduceMotion();

  return (
    <div
      data-reveal="1"
      data-reveal-id={revealId}
      className="relative w-full bg-[#E0E0E0]"
      style={{ aspectRatio: "16 / 9", ...fadeStyle(revealed, revealId, reduceMotion) }}
    >
      <div className="relative mx-auto h-full w-full max-w-[900px]">
        <Image src={src} alt={alt} fill className="object-contain" />
      </div>
    </div>
  );
}
