import { sql } from "@vercel/postgres";
import type {
  Project,
  ProjectDetail,
  ProjectDetailV2,
  ProjectImageRef,
  ProjectNumberedList,
  ProjectSection,
  ProjectTestimonialV2,
} from "@/types/work";

export { sql };

/** Shape of a row from the `work_projects` table (see
 * scripts/setup-work-db.mjs for the schema). `has_v2` isn't a real column
 * — it's computed by `getWorkProjects()`'s own query (a `LEFT JOIN` against
 * `work_project_details_v2`) so `ProjectCard` knows which detail template
 * to link to without a second round-trip per card. */
export type WorkProjectRow = {
  slug: string;
  title: string;
  description: string;
  cover_image: string;
  showcase_images: string[];
  tags: string[];
  badge: string | null;
  sort_order: number;
  has_v2?: boolean;
};

/** Shape of a row from the `work_project_details` table (v1 detail page).
 * `sections`/`numbered_lists` are JSONB — Postgres returns them already
 * parsed via @vercel/postgres, no manual JSON.parse needed. */
export type WorkProjectDetailRow = {
  slug: string;
  headline: string;
  sections: ProjectSection[];
  numbered_lists: ProjectNumberedList[];
  break_images: string[];
};

/** Shape of a row from the `work_project_details_v2` table. `testimonial`
 * is nullable (see scripts/alter-work-v2-nullable-testimonial.mjs) — most
 * projects don't have a real client testimonial on file. */
export type WorkProjectDetailV2Row = {
  slug: string;
  title: string;
  description: string;
  curved_image: ProjectImageRef;
  testimonial_image: ProjectImageRef;
  testimonial: ProjectTestimonialV2 | null;
  skills: string[];
  rich_text: string[];
  full_width_image: ProjectImageRef;
  split_images: [ProjectImageRef, ProjectImageRef];
};

export function rowToProject(row: WorkProjectRow): Project {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    coverImage: row.cover_image,
    showcaseImages: row.showcase_images,
    tags: row.tags,
    badge: row.badge ?? undefined,
    // Only `getWorkProjects()`'s own query actually selects `has_v2` (via
    // its LEFT JOIN) — callers that query `work_projects` alone (the
    // archive detail page) don't need it, so it defaults to `false` there;
    // harmless since `ProjectDetail`/`ProjectDetailV2` never read this
    // field.
    hasV2: row.has_v2 ?? false,
  };
}

export function rowToProjectDetail(projectRow: WorkProjectRow, detailRow: WorkProjectDetailRow): ProjectDetail {
  return {
    ...rowToProject(projectRow),
    headline: detailRow.headline,
    sections: detailRow.sections,
    numberedLists: detailRow.numbered_lists,
    breakImages: detailRow.break_images,
  };
}

export function rowToProjectDetailV2(row: WorkProjectDetailV2Row): ProjectDetailV2 {
  return {
    title: row.title,
    description: row.description,
    curvedImage: row.curved_image,
    testimonialImage: row.testimonial_image,
    testimonial: row.testimonial ?? undefined,
    skills: row.skills,
    richText: row.rich_text,
    fullWidthImage: row.full_width_image,
    splitImages: row.split_images,
  };
}
