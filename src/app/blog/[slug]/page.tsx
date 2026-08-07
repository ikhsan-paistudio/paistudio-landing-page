import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/blog/detail/ArticleBody";
import { ArticleHeader } from "@/components/blog/detail/ArticleHeader";
import { ArticleHeroImage } from "@/components/blog/detail/ArticleHeroImage";
import { ArticleSidebar } from "@/components/blog/detail/ArticleSidebar";
import { RelatedPosts } from "@/components/blog/detail/RelatedPosts";
import { FinalCtaFooter } from "@/components/FinalCtaFooter";
import { FooterUncover } from "@/components/FooterUncover";
import { Nav } from "@/components/nav/Nav";
import { getAllBlogSlugs, getBlogPostDetail } from "@/lib/data/blog-post-details";
import { getRelatedPosts } from "@/lib/data/blog-posts";
import { ScrollDriverProvider } from "@/lib/scroll/useScrollDriver";

type PageParams = { slug: string };

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Posts now come from Postgres instead of a static file — revalidate
// periodically so edits made directly in the database show up without a
// redeploy.
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostDetail(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Paistudio Blog`,
    description: post.description,
  };
}

// Reuse note: this page's "CTA banner" and "Footer" are the SAME existing
// component. The brief asked to "reuse the existing CTA banner component
// (...) already used on other pages" as a mid-content section, separate
// from "Footer: reuse the existing footer component" at the end — but no
// such split exists. FinalCtaFooter's own docs describe it as "Combined
// final CTA block + full site footer": one non-decomposable unit, used
// exactly this way (once, at the very end) on /, /work, /work/[slug], and
// /blog already. Placing it a second time mid-content would either
// duplicate the footer nav/social/copyright rows, or require inventing a
// new CTA-only component that doesn't exist in the docs — so it's reused
// once here too, doing both jobs, matching every other page in this app.
export default async function BlogPostPage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const post = await getBlogPostDetail(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug);

  return (
    <ScrollDriverProvider>
      <div className="relative w-full bg-paper text-text">
        <Nav theme="light" chromeVariant="v2" />
        <main data-nav-bg="light" className="min-h-screen bg-paper">
          <section className="pai-container mx-auto w-full max-w-[1240px] px-10 pt-[130px] pb-12 max-[900px]:px-7 max-[560px]:px-5">
            <ArticleHeader tags={post.tags} title={post.title} date={post.date} readTime={post.readTime} />
          </section>

          <section className="pai-container mx-auto w-full max-w-[1240px] px-10 pb-20 max-[900px]:px-7 max-[560px]:px-5">
            <ArticleHeroImage src={post.heroImage} alt={post.title} />
          </section>

          <section className="pai-container mx-auto grid w-full max-w-[1240px] grid-cols-[340px_1fr] gap-16 px-10 pb-[100px] max-[900px]:grid-cols-1 max-[900px]:gap-10 max-[900px]:px-7 max-[560px]:px-5">
            <ArticleSidebar author={post.author} toc={post.toc} title={post.title} />
            <ArticleBody blocks={post.body} />
          </section>

          <section className="pai-container mx-auto w-full max-w-[1240px] px-10 pb-[140px] max-[900px]:px-7 max-[560px]:px-5">
            <RelatedPosts posts={related} />
          </section>
        </main>
        <FooterUncover>
          <FinalCtaFooter theme="light" />
        </FooterUncover>
      </div>
    </ScrollDriverProvider>
  );
}
