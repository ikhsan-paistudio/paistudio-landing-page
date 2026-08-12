import type { Metadata } from "next";
import { BlogPageBody } from "@/components/blog/BlogPageBody";
import { FinalCtaFooter } from "@/components/FinalCtaFooter";
import { FooterUncover } from "@/components/FooterUncover";
import { Nav } from "@/components/nav/Nav";
import { BLOG_CATEGORIES, getBlogPosts, getFeaturedPost } from "@/lib/data/blog-posts";
import { ScrollDriverProvider } from "@/lib/scroll/useScrollDriver";

export const metadata: Metadata = {
  title: "Blog — Paistudio",
  description: "Notes on product strategy, no-code and AI builds, and case studies from the Paistudio team.",
};

// Posts now come from Postgres (blog_posts table) instead of a static file
// — revalidate periodically so edits made directly in the database show up
// without a redeploy, which was the actual point of the migration.
export const revalidate = 300;

export default async function BlogPage() {
  const [featuredPost, posts] = await Promise.all([getFeaturedPost(), getBlogPosts()]);

  return (
    <ScrollDriverProvider>
      <div className="relative w-full bg-paper text-text">
        <Nav theme="light" chromeVariant="v2" />
        <main data-nav-bg="light" className="min-h-screen bg-paper">
          <BlogPageBody categories={BLOG_CATEGORIES} featuredPost={featuredPost} posts={posts} />
        </main>
        <FooterUncover>
          <FinalCtaFooter />
        </FooterUncover>
      </div>
    </ScrollDriverProvider>
  );
}
