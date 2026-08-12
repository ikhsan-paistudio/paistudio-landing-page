import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FinalCtaFooter } from "@/components/FinalCtaFooter";
import { FooterUncover } from "@/components/FooterUncover";
import { Nav } from "@/components/nav/Nav";
import { ContainedImage } from "@/components/work/detail-v2/ContainedImage";
import { CurvedRevealImage } from "@/components/work/detail-v2/CurvedRevealImage";
import { HeroV2 } from "@/components/work/detail-v2/HeroV2";
import { RichTextSection } from "@/components/work/detail-v2/RichTextSection";
import { SplitImageRow } from "@/components/work/detail-v2/SplitImageRow";
import { TestimonialSkillsSection } from "@/components/work/detail-v2/TestimonialSkillsSection";
import { getAllWorkV2Slugs, getWorkProjectDetailV2 } from "@/lib/data/work-project-details-v2";
import { ScrollDriverProvider } from "@/lib/scroll/useScrollDriver";

type PageParams = { slug: string };

export async function generateStaticParams() {
  const slugs = await getAllWorkV2Slugs();
  return slugs.map((slug) => ({ slug }));
}

// Projects now come from Postgres instead of a static file — revalidate
// periodically so edits made directly in the database show up without a
// redeploy. Same pattern the blog pages already use.
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getWorkProjectDetailV2(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Paistudio`,
    description: project.description,
  };
}

// This is the "v2" template — HeroV2/CurvedRevealImage/
// TestimonialSkillsSection/RichTextSection/ContainedImage/SplitImageRow —
// now the PRIMARY /work/[slug] route, swapped in on request: "i love the
// work details page v2. make it as v1. and then current work details
// page switch to archive." The original template that used to live here
// moved to /work/archive/[slug] (same components, same data, untouched
// beyond the route). `ProjectCard` links here by default
// (`project.hasV2`) and falls back to the archive route only if a
// project somehow has no v2 content — in practice every current project
// does, after scripts/backfill-work-v2-content.mjs backfilled the ones
// that didn't have a real client testimonial (ProjectDetailV2.testimonial is
// optional now — see that type's own comment — so lacking one doesn't
// block a project from living here, it just means
// TestimonialSkillsSection renders the project's own description as a
// "Project Overview" block instead of the quote (on request — see that
// component's `overview` prop) rather than leaving the upper half empty.
export default async function ProjectDetailPage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const project = await getWorkProjectDetailV2(slug);
  if (!project) notFound();

  return (
    <ScrollDriverProvider>
      <div className="relative w-full bg-paper text-text">
        <Nav theme="light" chromeVariant="v2" />
        <main data-nav-bg="light" className="min-h-screen bg-paper">
          <HeroV2 title={project.title} description={project.description} />

          <CurvedRevealImage src={project.curvedImage.src} alt={project.curvedImage.alt} revealId="v2-curve" />

          <TestimonialSkillsSection
            image={project.testimonialImage}
            testimonial={project.testimonial}
            overview={project.description}
            skills={project.skills}
            revealId="v2-testimonial"
          />

          <RichTextSection paragraphs={project.richText} revealId="v2-richtext" />

          {/* Image stack: full-width layer, then the 50/50 split layer
              below it — a small gap keeps the two layers visibly separate
              without the large section-level spacing used elsewhere. */}
          <div className="flex flex-col gap-2">
            <ContainedImage src={project.fullWidthImage.src} alt={project.fullWidthImage.alt} revealId="v2-full" />
            <SplitImageRow images={project.splitImages} revealId="v2-split" />
          </div>

          <div className="h-20 max-[560px]:h-12" />
        </main>
        <FooterUncover>
          <FinalCtaFooter />
        </FooterUncover>
      </div>
    </ScrollDriverProvider>
  );
}
