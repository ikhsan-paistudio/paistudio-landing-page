import type { CSSProperties, ReactNode } from "react";

type MarqueeProps = {
  direction: "vertical" | "horizontal";
  children: ReactNode;
  pauseOnHover?: boolean;
  className?: string;
  style?: CSSProperties;
};

/** Doubles its children and loops the track by -50% so the seam is invisible. */
export function Marquee({ direction, children, pauseOnHover, className, style }: MarqueeProps) {
  const trackClass = direction === "vertical" ? "pai-vmarquee" : "pai-hmarquee";
  return (
    <div
      className={`${trackClass} ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""} ${className ?? ""}`}
      style={{
        display: "flex",
        flexDirection: direction === "vertical" ? "column" : "row",
        width: direction === "vertical" ? undefined : "max-content",
        ...style,
      }}
    >
      {children}
      {children}
    </div>
  );
}
