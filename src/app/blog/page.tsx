import type { Metadata } from "next";
import { BlogPageBody } from "@/components/blog/BlogPageBody";
import { FinalCtaFooter } from "@/components/FinalCtaFooter";
import { FooterUncover } from "@/components/FooterUncover";
import { Nav } from "@/components/nav/Nav";
import { BLOG_CATEGORIES, BLOG_POSTS, FEATURED_POST } from "@/lib/data/blog-posts";
import { ScrollDriverProvider } from "@/lib/scroll/useScrollDriver";

export const metadata: Metadata = {
  title: "Blog — Paistudio",
  description: "Notes on product strategy, no-code and AI builds, and case studies from the Paistudio team.",
};

export default function BlogPage() {
  return (
    <ScrollDriverProvider>
      <div className="relative w-full bg-paper text-text">
        <Nav theme="light" />
        <main data-nav-bg="light" className="min-h-screen bg-paper">
          <BlogPageBody categories={BLOG_CATEGORIES} featuredPost={FEATURED_POST} posts={BLOG_POSTS} />
        </main>
        <FooterUncover>
          <FinalCtaFooter theme="light" />
        </FooterUncover>
      </div>
    </ScrollDriverProvider>
  );
}
