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
    <div className="columns-1 gap-6 md:columns-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} revealed={revealed} />
      ))}
    </div>
  );
}
