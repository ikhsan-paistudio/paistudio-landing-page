export type BlogPostAuthor = {
  name: string;
  /** Shown on the article page's sidebar author card, under the name — no
   * role field is needed by the index page's cards. */
  role: string;
  /** Index into `AVATAR_HUES` (src/lib/data/testimonials.ts) — same
   * initials-avatar fallback used by Testimonials/LetsTalkMenu, no new
   * avatar treatment. */
  hue: number;
};

export type BlogPost = {
  slug: string;
  tag: string;
  date: string;
  title: string;
  description: string;
  coverImage: string;
  author: BlogPostAuthor;
  readTime: string;
};

/** One heading in the article body that the table-of-contents links to. */
export type ArticleTocEntry = {
  id: string;
  label: string;
};

/** Discriminated union of the article body's content blocks. No prior
 * "content block" system existed in the docs for bullet lists or video
 * embeds — see the components under `components/blog/detail/` for how
 * each is composed from existing tokens only. */
export type ArticleBlock =
  | { type: "heading"; id: string; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; src: string; alt: string }
  | { type: "video" };

export type BlogPostDetail = BlogPost & {
  /** Multiple category pills in the article header (vs. the single `tag`
   * used by the index page's cards). */
  tags: string[];
  heroImage: string;
  toc: ArticleTocEntry[];
  body: ArticleBlock[];
};
