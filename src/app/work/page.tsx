import type { Metadata } from "next";
import { FooterUncover } from "@/components/FooterUncover";
import { FinalCtaFooter } from "@/components/FinalCtaFooter";
import { Nav } from "@/components/nav/Nav";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { getWorkProjects } from "@/lib/data/work-projects";
import { ScrollDriverProvider } from "@/lib/scroll/useScrollDriver";

export const metadata: Metadata = {
  title: "Our Work — Paistudio",
  description: "Selected SaaS platforms, marketplaces, and AI products designed and shipped by Paistudio.",
};

// Projects now come from Postgres instead of a static file — revalidate
// periodically so edits made directly in the database show up without a
// redeploy. Same pattern the blog pages already use.
export const revalidate = 300;

export default async function WorkPage() {
  const projects = await getWorkProjects();
  return (
    <ScrollDriverProvider>
      <div className="relative w-full bg-paper text-text">
        <Nav theme="light" chromeVariant="v2" />
        <main data-nav-bg="light" className="min-h-screen bg-paper">
          <section className="pai-container mx-auto w-full max-w-[1240px] px-10 pt-[130px] pb-20 max-[900px]:px-7 max-[560px]:px-5">
            {/* Same staggered text-reveal used by the homepage's "Our Work" gallery
                (pai-work-copy/pai-armed/pai-play, defined in globals.css) — here it
                just plays once on mount instead of being retriggered by scroll. */}
            <div className="pai-work-copy pai-armed pai-play">
              <h1 className="m-0 text-[100px] leading-none font-bold tracking-[-1px] text-text text-balance max-[900px]:text-[clamp(40px,9vw,72px)] max-[560px]:text-[clamp(32px,10vw,48px)]">
                Selected work,
                <br />
                shipped and live.
              </h1>
              <p className="m-0 mt-6 max-w-[600px] text-[18px] leading-[1.6] font-normal text-muted">
                A selection of SaaS platforms, marketplaces, and AI products we&apos;ve designed, built, and
                launched with founders — from first sprint to production.
              </p>
            </div>
          </section>

          <section className="pai-container mx-auto w-full max-w-[1240px] px-10 pb-[140px] max-[900px]:px-7 max-[560px]:px-5">
            <ProjectGrid projects={projects} />
          </section>
        </main>
        <FooterUncover>
          <FinalCtaFooter />
        </FooterUncover>
      </div>
    </ScrollDriverProvider>
  );
}
