import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FooterUncover } from "@/components/FooterUncover";
import { FinalCtaFooter } from "@/components/FinalCtaFooter";
import { Nav } from "@/components/nav/Nav";
import { DetailHero } from "@/components/work/detail/DetailHero";
import { DetailSection } from "@/components/work/detail/DetailSection";
import { FullBleedImage } from "@/components/work/detail/FullBleedImage";
import { NumberedListGrid } from "@/components/work/detail/NumberedListGrid";
import { WORK_PROJECT_DETAILS } from "@/lib/data/work-project-details";
import { ScrollDriverProvider } from "@/lib/scroll/useScrollDriver";

type PageParams = { slug: string };

export function generateStaticParams() {
  return Object.keys(WORK_PROJECT_DETAILS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = WORK_PROJECT_DETAILS[slug];
  if (!project) return {};
  return {
    title: `${project.title} — Paistudio`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const project = WORK_PROJECT_DETAILS[slug];
  if (!project) notFound();

  return (
    <ScrollDriverProvider>
      <div className="relative w-full bg-paper text-text">
        <Nav theme="light" />
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
          <FinalCtaFooter theme="light" />
        </FooterUncover>
      </div>
    </ScrollDriverProvider>
  );
}
