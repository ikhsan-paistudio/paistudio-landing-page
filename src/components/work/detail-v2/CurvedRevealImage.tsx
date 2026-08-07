"use client";

import Image from "next/image";
import { fadeStyle, useReduceMotion, useScrollDriver } from "@/lib/scroll/useScrollDriver";

type CurvedRevealImageProps = {
  src: string;
  alt: string;
  revealId: string;
};

const CLIP_ID = "pai-curve-clip";

/** Image "layer" whose top edge is masked into a shallow concave "scoop"
 * (SVG clip-path, `objectBoundingBox` units so the curve stays
 * proportional at any width) — the frame's `#E0E0E0` container color reads
 * as peeling down into the image instead of a hard rectangular cut. Same
 * container+max-width treatment as ContainedImage/SplitImageRow: the
 * container fills the curved frame, the image itself is capped at
 * `max-w-[90%]` and centered inside it, so the container color also shows
 * on the sides wherever the image doesn't reach full width.
 *
 * Two-tier animation, deliberately split across two elements to avoid a
 * transform collision: the OUTER div owns the one-time enter fade+slide
 * (`data-reveal-id`/`fadeStyle`, React-driven — sets `transform` once per
 * `revealed` change). The INNER image layer owns the continuous scroll
 * parallax (`data-para`, imperatively driven every scroll tick by
 * `useScrollDriver`). Both would otherwise fight over the same element's
 * `style.transform` — Hero.tsx avoids this by using `data-fade` (opacity
 * only) instead of this reveal system's `fadeStyle` (opacity *and*
 * transform), which isn't an option here since this section needs the
 * proper "reveal when scrolled into view" behavior, not Hero's "fade out
 * as the page scrolls past the top" one.
 *
 * `object-contain` (not `object-cover`) so the image is never cropped to
 * fill the frame — it now has a visible container behind it, so letterbox
 * gaps read as intentional framing rather than a bug to hide (unlike the
 * component's earlier full-bleed version, which had to overscan the image
 * to avoid revealing gaps during parallax).
 */
export function CurvedRevealImage({ src, alt, revealId }: CurvedRevealImageProps) {
  const { revealed } = useScrollDriver();
  const reduceMotion = useReduceMotion();

  return (
    <div
      data-reveal="1"
      data-reveal-id={revealId}
      className="relative w-full overflow-hidden bg-[#E0E0E0]"
      style={{ aspectRatio: "16 / 7.5", ...fadeStyle(revealed, revealId, reduceMotion) }}
    >
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <defs>
          <clipPath id={CLIP_ID} clipPathUnits="objectBoundingBox">
            <path d="M0,0 C0.3,0.16 0.7,0.16 1,0 L1,1 L0,1 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="absolute inset-0" style={{ clipPath: `url(#${CLIP_ID})` }}>
        <div data-para="0.05" className="absolute inset-0 mx-auto h-full w-full max-w-[90%]">
          <Image src={src} alt={alt} fill className="object-contain" />
        </div>
      </div>
    </div>
  );
}
