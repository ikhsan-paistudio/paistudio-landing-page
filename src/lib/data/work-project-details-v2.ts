import type { ProjectDetailV2 } from "@/types/work";
import { rowToProjectDetailV2, sql, type WorkProjectDetailV2Row } from "./work-db";

export async function getWorkProjectDetailV2(slug: string): Promise<ProjectDetailV2 | null> {
  const { rows } = await sql<WorkProjectDetailV2Row>`SELECT * FROM work_project_details_v2 WHERE slug = ${slug}`;
  return rows[0] ? rowToProjectDetailV2(rows[0]) : null;
}

/** All slugs with a v2 detail row, for `generateStaticParams` — was
 * `Object.keys(WORK_PROJECT_DETAILS_V2)`. The `/work/v2/[slug]` page 404s
 * for any slug not returned here, same as before — currently that's
 * "hellorecruiters" (no real client testimonial to populate this
 * template with yet, see scripts/migrate-hellorecruiters-project.mjs). */
export async function getAllWorkV2Slugs(): Promise<string[]> {
  const { rows } = await sql<{ slug: string }>`SELECT slug FROM work_project_details_v2`;
  return rows.map((row) => row.slug);
}
