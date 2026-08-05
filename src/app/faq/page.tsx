import type { Metadata } from "next";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { FinalCtaFooter } from "@/components/FinalCtaFooter";
import { FooterUncover } from "@/components/FooterUncover";
import { Nav } from "@/components/nav/Nav";
import { getFaqEntries } from "@/lib/content/faq";
import { ScrollDriverProvider } from "@/lib/scroll/useScrollDriver";

export const metadata: Metadata = {
  title: "FAQ — Paistudio",
  description: "Answers to common questions about how Paistudio builds, prices, and ships products.",
};

export default function FaqPage() {
  const entries = getFaqEntries();

  return (
    <ScrollDriverProvider>
      <div className="relative w-full bg-paper text-text">
        <Nav theme="light" />
        <main data-nav-bg="light" className="min-h-screen bg-paper">
          <section className="pai-container mx-auto w-full max-w-[1240px] px-10 pt-[130px] pb-20 max-[900px]:px-7 max-[560px]:px-5">
            <div className="pai-work-copy pai-armed pai-play flex flex-col gap-14">
              <div className="flex flex-col items-start gap-[18px]">
                <div className="flex items-center gap-1.5 text-muted">
                  <svg width="11" height="11" viewBox="0 0 10 10" fill="none" aria-hidden="true" className="shrink-0">
                    <path
                      d="M2 8L8 2M8 2H3M8 2V7"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[12px] font-medium tracking-[0.1em] uppercase">FAQ</span>
                </div>
                <h1 className="m-0 text-[70px] leading-[1.04] font-bold tracking-[-0.56px] text-text text-balance max-[900px]:text-[50px] max-[560px]:text-[36px]">
                  Frequently asked questions
                </h1>
              </div>

              <FaqAccordion entries={entries} />
            </div>
          </section>
        </main>
        <FooterUncover>
          <FinalCtaFooter theme="light" />
        </FooterUncover>
      </div>
    </ScrollDriverProvider>
  );
}
