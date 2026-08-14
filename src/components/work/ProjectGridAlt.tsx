"use client";

import { useEffect, useState } from "react";
import { useHoverBubbles } from "@/lib/hover-bubble/useHoverBubbles";
import type { Project } from "@/types/work";
import { ProjectCard } from "./ProjectCard";

// Cards wait for the hero's own reveal to mostly settle, then all reveal
// together as one beat — not staggered against each other, not scroll-
// triggered per card. Same timing as the plain ProjectGrid.
const CARDS_DELAY_MS = 600;

// Alternate row widths — [3, 2] means row 1 is 3-wide, row 2 is 2-wide,
// row 3 is 3-wide again, and so on, repeating for however many projects
// there are. This is /work/grid-alt's whole reason for existing (a
// separate version of /work, on request: "buat versi lain dari halaman
// work... buat selang seling. ada row yg 2 col, ada yg 3 cols") — the
// plain ProjectGrid stays a flat, uniform grid-cols-2.
const ROW_PATTERN = [3, 2];

type Row = { cols: (typeof ROW_PATTERN)[number]; items: Project[] };

/** Chunks `projects` into rows following `ROW_PATTERN`, cycling back to
 * the start once it runs out. Each row's intended column count travels
 * with it (`cols`) rather than being inferred from `items.length` —
 * needed because the very last row is often partial (fewer cards than
 * its row's column count), and inferring from length would misclassify
 * a partial 3-wide row as a 2-wide one. A partial row just leaves empty
 * grid tracks, same as ProjectGrid already does when the count doesn't
 * divide evenly. */
function chunkIntoAlternatingRows(projects: Project[]): Row[] {
  const rows: Row[] = [];
  let i = 0;
  let patternIndex = 0;
  while (i < projects.length) {
    const cols = ROW_PATTERN[patternIndex % ROW_PATTERN.length];
    rows.push({ cols, items: projects.slice(i, i + cols) });
    i += cols;
    patternIndex += 1;
  }
  return rows;
}

export function ProjectGridAlt({ projects }: { projects: Project[] }) {
  const [revealed, setRevealed] = useState(false);
  useHoverBubbles();

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), CARDS_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const rows = chunkIntoAlternatingRows(projects);

  return (
    <div className="flex flex-col gap-6">
      {rows.map((row, i) => (
        // Both `md:grid-cols-3`/`md:grid-cols-2` literal strings need to
        // appear somewhere in source for Tailwind's build-time scan to
        // include them — they do, right here, so this conditional class
        // pick is safe even though only one branch is ever chosen per row
        // at runtime.
        <div key={i} className={`grid grid-cols-1 gap-6 ${row.cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {row.items.map((project) => (
            <ProjectCard key={project.slug} project={project} revealed={revealed} />
          ))}
        </div>
      ))}
    </div>
  );
}
