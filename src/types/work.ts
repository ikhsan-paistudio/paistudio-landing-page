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
