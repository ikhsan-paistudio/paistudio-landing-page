"use client";

import Image from "next/image";
import { fadeStyle, useReduceMotion, useScrollDriver } from "@/lib/scroll/useScrollDriver";

type CurvedRevealImageProps = {
  src: string;
  alt: string;
  revealId: string;
};

/** Cover-image layer for the /work/[slug] template. Used to mask its top
 * edge into a shallow concave "scoop" via an SVG `clip-path` (hence the
 * name) — removed entirely on request ("remove semacam rounded things
 * yang menimpa cover"), since it visually overlapped/cut into the cover
 * image rather than just framing it. Now a plain rectangular frame; the
 * component keeps its original name since it's still referenced from
 * /work/[slug]/page.tsx as the "reveal" image layer and renaming it isn't
 * what was asked. Same container+max-width treatment as
 * ContainedImage/SplitImageRow: the `#E0E0E0` container fills the frame,
 * the image itself is capped at `max-w-[90%]` and centered inside it, so
 * the container color still shows on the sides wherever the image doesn't
 * reach full width.
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
 * fill the frame — it has a visible container behind it, so letterbox
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
      <div data-para="0.05" className="absolute inset-0 mx-auto h-full w-full max-w-[90%]">
        <Image src={src} alt={alt} fill className="object-contain" />
      </div>
    </div>
  );
}
