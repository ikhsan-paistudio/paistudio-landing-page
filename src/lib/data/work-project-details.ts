import type { ProjectDetail } from "@/types/work";
import { rowToProjectDetail, sql, type WorkProjectDetailRow, type WorkProjectRow } from "./work-db";

export async function getWorkProjectDetail(slug: string): Promise<ProjectDetail | null> {
  const { rows: projectRows } = await sql<WorkProjectRow>`SELECT * FROM work_projects WHERE slug = ${slug}`;
  if (!projectRows[0]) return null;

  const { rows: detailRows } = await sql<WorkProjectDetailRow>`
    SELECT * FROM work_project_details WHERE slug = ${slug}
  `;
  if (!detailRows[0]) return null;

  return rowToProjectDetail(projectRows[0], detailRows[0]);
}

/** All slugs with a v1 detail row, for `generateStaticParams` — was
 * `Object.keys(WORK_PROJECT_DETAILS)` over the static object; same idea,
 * now a query. Keyed off `work_project_details` (not `work_projects`)
 * since that's the table that actually gates whether this page can
 * render — a project could in principle exist without v1 detail content
 * yet. */
export async function getAllWorkSlugs(): Promise<string[]> {
  const { rows } = await sql<{ slug: string }>`SELECT slug FROM work_project_details`;
  return rows.map((row) => row.slug);
}
