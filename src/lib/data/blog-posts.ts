import type { BlogPost } from "@/types/blog";
import { rowToBlogPost, sql, type BlogPostRow } from "./blog-db";

// Static — the category taxonomy itself isn't "content" in the sense the
// Postgres migration was for (blog posts), it's fixed UI structure the
// filter tabs render. Posts themselves now live in the blog_posts table
// (see blog-db.ts / scripts/setup-blog-db.mjs).
export const BLOG_CATEGORIES = ["All", "Product Strategy", "No-Code & AI", "Case Studies", "Founder Stories"];

export async function getFeaturedPost(): Promise<BlogPost | null> {
  const { rows } = await sql<BlogPostRow>`SELECT * FROM blog_posts WHERE is_featured = true LIMIT 1`;
  return rows[0] ? rowToBlogPost(rows[0]) : null;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const { rows } = await sql<BlogPostRow>`
    SELECT * FROM blog_posts WHERE is_featured = false ORDER BY published_at DESC
  `;
  return rows.map(rowToBlogPost);
}

/** Up to `count` posts other than `slug`, for the article page's "Related
 * posts" grid — featured post first (if not the current article), then
 * newest first. Matches the old static `[FEATURED_POST, ...BLOG_POSTS]`
 * array's ordering, which had the same effect by construction. */
export async function getRelatedPosts(slug: string, count = 3): Promise<BlogPost[]> {
  const { rows } = await sql<BlogPostRow>`
    SELECT * FROM blog_posts
    WHERE slug != ${slug}
    ORDER BY is_featured DESC, published_at DESC
    LIMIT ${count}
  `;
  return rows.map(rowToBlogPost);
}
