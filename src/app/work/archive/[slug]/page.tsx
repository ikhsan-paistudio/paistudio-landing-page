import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FooterUncover } from "@/components/FooterUncover";
import { FinalCtaFooter } from "@/components/FinalCtaFooter";
import { Nav } from "@/components/nav/Nav";
import { DetailHero } from "@/components/work/detail/DetailHero";
import { DetailSection } from "@/components/work/detail/DetailSection";
import { FullBleedImage } from "@/components/work/detail/FullBleedImage";
import { NumberedListGrid } from "@/components/work/detail/NumberedListGrid";
import { getAllWorkSlugs, getWorkProjectDetail } from "@/lib/data/work-project-details";
import { ScrollDriverProvider } from "@/lib/scroll/useScrollDriver";

type PageParams = { slug: string };

export async function generateStaticParams() {
  const slugs = await getAllWorkSlugs();
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
  const project = await getWorkProjectDetail(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Paistudio`,
    description: project.description,
  };
}

// The original detail template — this route used to be the primary
// /work/[slug], with the "v2" template (HeroV2/CurvedRevealImage/
// TestimonialSkillsSection/etc.) as a separate, additive alternative at
// /work/v2/[slug]. That's swapped now, on request: "i love the work
// details page v2. make it as v1. and then current work details page
// switch to archive." v2 is the primary /work/[slug] template today; this
// template (unchanged otherwise — same components, same data source)
// moved here rather than being retired, so every project's original
// detail page stays reachable. Nothing currently links to this route from
// the UI (ProjectCard links to the primary page) — same as before the
// swap, when nothing linked to /work/v2/[slug] until a project actually
// had v2 content.
export default async function ArchivedProjectDetailPage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const project = await getWorkProjectDetail(slug);
  if (!project) notFound();

  return (
    <ScrollDriverProvider>
      <div className="relative w-full bg-paper text-text">
        <Nav theme="light" chromeVariant="v2" />
        <main data-nav-bg="light" className="min-h-screen bg-paper">
          <DetailHero title={project.title} headline={project.headline} />

          <DetailSection revealId="detail-section-0" {...project.sections[0]} />
          <DetailSection revealId="detail-section-1" {...project.sections[1]} />

          <FullBleedImage src={project.breakImages[0]} alt={`${project.title} — full view`} revealId="detail-break-0" />

          <NumberedListGrid lists={project.numberedLists} revealId="detail-lists" />

          <DetailSection revealId="detail-section-2" {...project.sections[2]} />
          <DetailSection revealId="detail-section-3" {...project.sections[3]} />

          <FullBleedImage src={project.breakImages[1]} alt={`${project.title} — full view`} revealId="detail-break-1" />

          <div className="h-20 max-[560px]:h-12" />
        </main>
        <FooterUncover>
          <FinalCtaFooter />
        </FooterUncover>
      </div>
    </ScrollDriverProvider>
  );
}
