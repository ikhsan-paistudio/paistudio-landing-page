"use client";

import { useEffect, type DependencyList } from "react";
import { initHoverBubbles } from "./HoverBubble";

/**
 * Wires up `initHoverBubbles` for every `.pai-hover-card` (or a custom
 * `selector`) currently rendered under this component, and tears the
 * instances down on unmount.
 *
 * `deps` re-runs the scan when the set of rendered cards can change after
 * mount without the component itself remounting — e.g. a filtered list.
 * Defaults to `[]` (scan once on mount), matching every existing caller
 * (`ProjectGrid`, `RelatedPosts`) that renders a fixed card set.
 */
export function useHoverBubbles(selector = ".pai-hover-card", deps: DependencyList = []): void {
  useEffect(() => {
    const dispose = initHoverBubbles(selector);
    return dispose;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `selector` plus caller-supplied deps
  }, [selector, ...deps]);
}
