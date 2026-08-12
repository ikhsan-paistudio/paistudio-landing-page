export type Project = {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  showcaseImages: string[]; // alternate images shown on hover
  tags: string[];
  badge?: string; // e.g. "Coming Soon"
  /** Whether a `work_project_details_v2` row exists for this project —
   * ProjectCard's link target depends on it: `/work/[slug]` (the "v2"
   * template, primary since the route swap — see `ProjectDetailV2`'s own
   * comment below) if true, `/work/archive/[slug]` (the older "v1"
   * template) if false. In practice every current project has a v2 row,
   * but this stays a real check rather than an assumption — the same
   * unconditional-link bug this field was originally added to fix (a
   * project without one silently 404ing) would just resurface the moment
   * a future project's migration forgot the v2 row. */
  hasV2: boolean;
};

// Detail-page content — one repeating two-column block, e.g. label="Context",
// heading="A subscription business flying blind", body="...".
export type ProjectSection = {
  label: string;
  heading: string;
  body: string;
};

// One "( 01 ) / ( 02 ) / ..." numbered list block, e.g. title="Goals".
export type ProjectNumberedList = {
  title: string;
  items: string[];
};

export type ProjectDetail = Project & {
  /** Large descriptive headline shown beside the title in the hero. */
  headline: string;
  /** Repeating two-column label + heading + body sections (Context, Problem, Output, Outcome...). */
  sections: ProjectSection[];
  /** "( 01 )"-style numbered list blocks (Goals, Challenges, Solutions, Results). */
  numberedLists: ProjectNumberedList[];
  /** Full-bleed images shown as visual breaks between text blocks. */
  breakImages: string[];
};

// --- The "v2" detail-page template (originally at /work/v2/[slug], now
// the PRIMARY /work/[slug] — see src/app/work/[slug]/page.tsx and
// src/app/work/archive/[slug]/page.tsx, the former "v1" template's new
// home, on request: "i love the work details page v2. make it as v1. and
// then current work details page switch to archive"). Still a separate,
// additive type from `ProjectDetail` (the archive template) — the
// hero/testimonial/rich-text layout is different enough from the
// archive's that force-fitting it into that type would mean either
// optional fields the archive never uses or a breaking change to it.
// Kept fully separate, so the archive template stayed untouched by this
// swap beyond its route moving.

export type ProjectImageRef = { src: string; alt: string };

export type ProjectTestimonialV2 = {
  quote: string;
  author: string;
  role: string;
  /** 1-5 stars. */
  rating: number;
};

export type ProjectDetailV2 = {
  title: string;
  /** Short "(Introduction)" body copy — 2-3 lines, shown beside the huge title. */
  description: string;
  /** Full-bleed image with a concave "scoop" mask on its top edge, directly under the hero. */
  curvedImage: ProjectImageRef;
  /** Image shown beside the testimonial + skills column. */
  testimonialImage: ProjectImageRef;
  /** Optional — most projects don't have a real client testimonial on
   * file, and this project doesn't fabricate one just to fill the field
   * (see scripts/migrate-hellorecruiters-project.mjs's reasoning, applied
   * consistently here). `TestimonialSkillsSection` renders the quote
   * block only when this is present; the skills list always renders
   * regardless. */
  testimonial?: ProjectTestimonialV2;
  /** Pills — reuses each project's existing `tags` from `Project`. */
  skills: string[];
  /** Static body paragraphs for now — flagged to become a rich-text/CMS
   * field later (see RichTextSection.tsx). */
  richText: string[];
  fullWidthImage: ProjectImageRef;
  /** Exactly two images, rendered 50/50 side by side. */
  splitImages: [ProjectImageRef, ProjectImageRef];
};
