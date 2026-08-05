"use client";

import type { ReactNode } from "react";
import { useScrollDriver } from "@/lib/scroll/useScrollDriver";

type FooterUncoverProps = {
  children: ReactNode;
};

/**
 * Registers its child (the footer) with the scroll driver, which applies a
 * clip-path wipe + a small rise (see useScrollDriver.tsx) synced to how far
 * the footer has scrolled into view — makes it read as already sitting
 * there, progressively uncovered, rather than just scrolling in.
 */
export function FooterUncover({ children }: FooterUncoverProps) {
  const { setFooterEl } = useScrollDriver();
  return <div ref={setFooterEl}>{children}</div>;
}
