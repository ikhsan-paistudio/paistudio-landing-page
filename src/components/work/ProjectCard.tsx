"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Project } from "@/types/work";

const CYCLE_MS = 1300;

const noopSubscribe = () => () => {};

/** Not-hovered default image, randomized among `[coverImage, ...showcaseImages]`
 * instead of always `coverImage` — via `useSyncExternalStore` (same pattern
 * `useReduceMotion` uses in useScrollDriver.tsx) rather than `useState` +
 * `useEffect`, since a `Math.random()` pick needs to differ safely between
 * server and client without a hydration mismatch: `getServerSnapshot`
 * always returns `coverImage` (what the server rendered), `getSnapshot`
 * picks once per mount and caches it in a ref so it stays stable across
 * re-renders. */
function useRandomDefaultImage(coverImage: string, showcaseImages: string[]) {
  const pickedRef = useRef<string | null>(null);
  return useSyncExternalStore(
    noopSubscribe,
    () => {
      if (pickedRef.current === null) {
        const pool = [coverImage, ...showcaseImages];
        pickedRef.current = pool[Math.floor(Math.random() * pool.length)];
      }
      return pickedRef.current;
    },
    () => coverImage
  );
}

// One fixed aspect ratio for every card (previously varied per-slug for a
// masonry layout — see ProjectGrid.tsx's switch from `columns` to a real
// `grid`) so every card in a row is the same height and rows line up.
const THUMB_ASPECT_RATIO = "4 / 5";

type ProjectCardProps = {
  project: Project;
  /** Controlled by the grid so every card reveals together, on a delay after the hero. */
  revealed: boolean;
};

export function ProjectCard({ project, revealed }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const defaultImage = useRandomDefaultImage(project.coverImage, project.showcaseImages);

  useEffect(() => {
    if (!hovered || project.showcaseImages.length === 0) return;
    const interval = setInterval(() => {
      setImageIndex((i) => (i + 1) % project.showcaseImages.length);
    }, CYCLE_MS);
    return () => clearInterval(interval);
  }, [hovered, project.showcaseImages.length]);

  const handleMouseEnter = () => {
    setHovered(true);
    setImageIndex(0);
  };
  const handleMouseLeave = () => {
    setHovered(false);
    setImageIndex(0);
  };

  const displayedImage =
    hovered && project.showcaseImages.length > 0 ? project.showcaseImages[imageIndex] : defaultImage;

  return (
    <Link
      // /work/[slug] (the "v2" template, primary since the route swap —
      // see src/types/work.ts's ProjectDetailV2 comment) is the default;
      // /work/archive/[slug] (the older template) is a defensive fallback
      // for the rare project without a work_project_details_v2 row, so a
      // card never links to a route that 404s.
      href={project.hasV2 ? `/work/${project.slug}` : `/work/archive/${project.slug}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group block"
    >
      {/* Same reveal used by the hero and the homepage's "Our Work" gallery
          (pai-work-copy/pai-armed/pai-play, see globals.css) — thumbnail and
          text are its two staggered children, so the image fades/slides in
          first (nth-child(1), 0.04s delay) and the text follows right after
          (nth-child(2), 0.13s delay). */}
      <div className={`pai-work-copy pai-armed${revealed ? " pai-play" : ""}`}>
        {/* Container + max-width treatment, same idiom as the v2 detail
            page's images (ContainedImage/SplitImageRow/CurvedRevealImage):
            #E0E0E0 container, image capped at max-width and centered
            inside it via object-contain, instead of filling the frame. */}
        <div className="pai-hover-card w-full rounded-[32px] bg-[#E0E0E0]" style={{ aspectRatio: THUMB_ASPECT_RATIO }}>
          <div className="relative mx-auto h-full w-full max-w-[100%]">
            <Image src={displayedImage} alt={project.title} fill className="object-contain" />
          </div>
          {project.badge && (
            <span className="absolute top-4 left-4 rounded-full bg-brand px-3 py-1 text-[12px] font-medium tracking-[0.1em] text-white uppercase">
              {project.badge}
            </span>
          )}
          <div className="pai-hover-bubble text-center text-[13px] leading-[1.2] tracking-[0.01em] text-ink">
            <span>View</span>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-[18px] leading-[1.3] font-medium text-text text-balance">{project.title}</h3>
          <p className="mt-2 text-[14px] leading-[1.6] text-muted">{project.description}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-pill px-3.5 py-1.5 text-[14px] text-text">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
