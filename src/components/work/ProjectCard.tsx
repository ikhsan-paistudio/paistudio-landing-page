"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Project } from "@/types/work";

const CYCLE_MS = 1300;

// A small fixed set of aspect ratios, picked deterministically per card (by
// slug) so cards vary in height for the masonry layout — without adding
// extra fields to the given Project data shape.
const ASPECT_RATIOS = ["4 / 5", "1 / 1", "3 / 4", "5 / 4"];

function aspectRatioFor(slug: string) {
  let hash = 0;
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) % 997;
  return ASPECT_RATIOS[hash % ASPECT_RATIOS.length];
}

type ProjectCardProps = {
  project: Project;
  /** Controlled by the grid so every card reveals together, on a delay after the hero. */
  revealed: boolean;
};

export function ProjectCard({ project, revealed }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

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
    hovered && project.showcaseImages.length > 0 ? project.showcaseImages[imageIndex] : project.coverImage;

  return (
    <Link
      href={`/work/${project.slug}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group mb-6 block break-inside-avoid"
    >
      {/* Same reveal used by the hero and the homepage's "Our Work" gallery
          (pai-work-copy/pai-armed/pai-play, see globals.css) — thumbnail and
          text are its two staggered children, so the image fades/slides in
          first (nth-child(1), 0.04s delay) and the text follows right after
          (nth-child(2), 0.13s delay). */}
      <div className={`pai-work-copy pai-armed${revealed ? " pai-play" : ""}`}>
        <div
          className="pai-hover-card w-full rounded-[32px]"
          style={{ aspectRatio: aspectRatioFor(project.slug) }}
        >
          <Image src={displayedImage} alt={project.title} fill className="object-cover" />
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
