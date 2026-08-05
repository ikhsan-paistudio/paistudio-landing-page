"use client";

import dynamic from "next/dynamic";
import { useScrollDriver } from "@/lib/scroll/useScrollDriver";

const ThreeLogoBackground = dynamic(
  () => import("./ThreeLogoBackground").then((m) => m.ThreeLogoBackground),
  { ssr: false }
);

export function FixedBackground() {
  const { setHeroBgEl, setGlHostEl, logoMode } = useScrollDriver();

  return (
    <div ref={setHeroBgEl} className="pointer-events-none fixed top-0 right-0 left-0 z-0 h-[150vh] overflow-hidden">
      <div ref={setGlHostEl} className="pointer-events-none absolute top-0 right-0 left-0 z-0 h-screen">
        <ThreeLogoBackground logoMode={logoMode} />
      </div>
    </div>
  );
}
