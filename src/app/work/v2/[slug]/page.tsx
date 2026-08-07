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
import { WORK_PROJECT_DETAILS_V2 } from "@/lib/data/work-project-details-v2";
import { ScrollDriverProvider } from "@/lib/scroll/useScrollDriver";

type PageParams = { slug: string };

export function generateStaticParams() {
  return Object.keys(WORK_PROJECT_DETAILS_V2).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = WORK_PROJECT_DETAILS_V2[slug];
  if (!project) return {};
  return {
    title: `${project.title} — Paistudio`,
    description: project.description,
  };
}

// A separate, additive template alongside v1 (/work/[slug]) — new route,
// new components (work/detail-v2/), new data file
// (work-project-details-v2.ts) and a new, purely-additive type
// (ProjectDetailV2 in types/work.ts). v1's route, components, and data are
// untouched. Only "saas-dashboard" has v2 content so far — see
// work-project-details-v2.ts.
export default async function ProjectDetailV2Page({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params;
  const project = WORK_PROJECT_DETAILS_V2[slug];
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
          <FinalCtaFooter theme="light" />
        </FooterUncover>
      </div>
    </ScrollDriverProvider>
  );
}
