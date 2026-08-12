import type { Project } from "@/types/work";
import { rowToProject, sql, type WorkProjectRow } from "./work-db";

/** All list-card projects, in display order (was the static `WORK_PROJECTS`
 * array's declaration order — now the real `sort_order` column, see
 * scripts/setup-work-db.mjs). The `LEFT JOIN` computes `has_v2` so
 * `ProjectCard` can link to whichever detail template (`/work/v2/[slug]`
 * or the `/work/[slug]` fallback) actually exists for each project,
 * rather than assuming v2 unconditionally — not every real project has a
 * real client testimonial to populate that template with honestly. */
export async function getWorkProjects(): Promise<Project[]> {
  const { rows } = await sql<WorkProjectRow>`
    SELECT p.*, (d2.slug IS NOT NULL) AS has_v2
    FROM work_projects p
    LEFT JOIN work_project_details_v2 d2 ON d2.slug = p.slug
    ORDER BY p.sort_order
  `;
  return rows.map(rowToProject);
}
