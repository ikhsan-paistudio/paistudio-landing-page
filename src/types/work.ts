export type Project = {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  showcaseImages: string[]; // alternate images shown on hover
  tags: string[];
  badge?: string; // e.g. "Coming Soon"
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

// --- /work/v2/[slug] — a separate, additive detail-page template (see
// src/app/work/v2/[slug]/page.tsx). Does not replace or reuse
// ProjectDetail — the v2 hero/testimonial/rich-text layout is different
// enough from v1's that force-fitting it into the existing type would mean
// either optional fields v1 never uses or a breaking change to v1's live
// pages. Kept fully separate instead, so v1 is untouched.

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
  testimonial: ProjectTestimonialV2;
  /** Pills — reuses each project's existing `tags` from `Project`. */
  skills: string[];
  /** Static body paragraphs for now — flagged to become a rich-text/CMS
   * field later (see RichTextSection.tsx). */
  richText: string[];
  fullWidthImage: ProjectImageRef;
  /** Exactly two images, rendered 50/50 side by side. */
  splitImages: [ProjectImageRef, ProjectImageRef];
};
