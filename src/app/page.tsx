"use client";

import { CtaSection } from "@/components/CtaSection";
import { FinalCtaFooter } from "@/components/FinalCtaFooter";
import { FixedBackground } from "@/components/FixedBackground";
import { FooterUncover } from "@/components/FooterUncover";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/nav/Nav";
import { Pricing } from "@/components/Pricing";
import { ProgressRail } from "@/components/ProgressRail";
import { Testimonials } from "@/components/Testimonials";
import { WorkGallery } from "@/components/WorkGallery";
import { ScrollDriverProvider } from "@/lib/scroll/useScrollDriver";

export default function Home() {
  return (
    <ScrollDriverProvider>
      <div className="relative w-full bg-ink text-text">
        <FixedBackground />
        <Nav />
        <ProgressRail />
        <Hero />
        <WorkGallery />
        <CtaSection />
        <Testimonials />
        <Pricing />
        <FooterUncover>
          <FinalCtaFooter />
        </FooterUncover>
      </div>
    </ScrollDriverProvider>
  );
}
