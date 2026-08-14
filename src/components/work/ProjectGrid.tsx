"use client";

import { useEffect, useState } from "react";
import { useHoverBubbles } from "@/lib/hover-bubble/useHoverBubbles";
import type { Project } from "@/types/work";
import { ProjectCard } from "./ProjectCard";

// Cards wait for the hero's own reveal to mostly settle, then all reveal
// together as one beat — not staggered against each other, not scroll-
// triggered per card.
const CARDS_DELAY_MS = 600;

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [revealed, setRevealed] = useState(false);
  useHoverBubbles();

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), CARDS_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    // Real grid (was CSS multi-column masonry) — masonry's per-column
    // vertical flow, combined with each card having a different aspect
    // ratio, meant row 1's cards never actually lined up with each other.
    // A grid + one fixed thumbnail aspect ratio (ProjectCard.tsx) makes
    // every row level. 2 columns on desktop (was 3), on request.
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} revealed={revealed} />
      ))}
    </div>
  );
}
