import { BusinessImpactSection } from "@/components/sections/BusinessImpactSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProofSection } from "@/components/sections/ProofSection";
import { QualificationSection } from "@/components/sections/QualificationSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialStackSection } from "@/components/sections/TestimonialStackSection";
import { ToolDeepDiveSection } from "@/components/sections/ToolDeepDiveSection";
import { ValuePillarsSection } from "@/components/sections/ValuePillarsSection";

// Temporary local-only preview route — NOT one of the 12 real marketing
// pages, just a stacked visual QA harness for the section library built
// under src/components/sections/. All copy below is placeholder sample
// data for layout inspection only, not real content for any actual page.
function Label({ id }: { id: string }) {
  return (
    <div className="border-t border-b border-dashed border-ink/20 bg-[#f5f5f0] px-10 py-2 text-[12px] font-medium tracking-[0.1em] text-muted uppercase">
      {id}
    </div>
  );
}

export default function SectionsPreviewPage() {
  return (
    <div className="bg-paper">
      <Label id="SEC-01 · Hero (dark) — trust line collapsed to one line of text, below the CTA" />
      <HeroSection
        eyebrow="Sample Eyebrow"
        headline="Why [Tool] Is Essential for [Outcome]"
        subhead="One to two sentences of sample subhead copy explaining the value proposition."
        trustBadges={[
          // Same stats as src/components/Hero.tsx's stats row (no logos,
          // no Bubble.io badge — collapsed to plain text on request). No
          // sourceUrl on any of them, so these render as plain text, not
          // links — SEC-01's own rule is "never fabricate a source".
          { label: "Top Rated+ on Upwork" },
          { label: "2 weeks avg. first release" },
          { label: "50+ projects completed" },
        ]}
        cta={{ label: "Get Started", href: "#" }}
      />

      <Label id="SEC-02 · Value Pillars — 3-card hover-expand layout (hover each card)" />
      <ValuePillarsSection
        pillars={[
          {
            title: "Easy setup",
            description: "Create your workspace and invite your team. Get everything ready in minutes.",
            previewLabel: "Create account form",
          },
          {
            title: "Collaborate",
            description: "Assign tasks and keep communication clear. Everyone stays aligned.",
            previewLabel: "Task list UI",
          },
          {
            title: "Track growth",
            description: "Use dashboards to monitor progress, trends, and what matters most.",
            previewLabel: "Dashboard graph",
          },
        ]}
      />

      <Label id="SEC-03 · Services — sticky scroll-spy layout (scroll this section)" />
      <ServicesSection
        headline="Your Partner in Building SaaS Products, Efficiently."
        tools={[
          {
            label: "Full Bubble Development",
            description: "Build stunning, production-ready SaaS apps with our full-service Bubble development.",
          },
          {
            label: "Product Consult & Plan",
            description: "Strategic project planning with smart resource allocation and risk management.",
          },
          {
            label: "Product Design & Research",
            description: "Designing and refining your SaaS around real user needs and business goals.",
          },
          {
            label: "Customisation & Integration",
            description: "Connect your SaaS to the APIs and systems your business already runs on.",
          },
          {
            label: "Maintenance & Support",
            description: "Ongoing maintenance to keep your SaaS stable, fast, and reliable.",
          },
        ]}
      />

      <Label id="SEC-04 · Services — scroll-driven pinned accordion (scroll this section; drag narrow to see the mobile all-expanded fallback)" />
      <ProcessSection
        headline="Our Process"
        subhead="Sample subheader — a short line explaining how these steps fit together, not a restatement of the heading."
        items={[
          {
            title: "Brand Identity",
            description:
              "Sample description — a cohesive visual identity that carries through every touchpoint, from the logo to the smallest UI detail.",
          },
          {
            title: "Web Design",
            description:
              "Sample description — interfaces designed around how people actually use the product, not just how it looks in a mockup.",
          },
          {
            title: "Web Development",
            description:
              "Sample description — production-ready builds with clean, maintainable code and real attention to performance.",
          },
          {
            title: "SEO & Growth",
            description:
              "Sample description — technical foundations and content structure built for search from day one, not bolted on after launch.",
          },
        ]}
      />

      <Label id="SEC-04B · Pinned Testimonial Stack — GSAP + ScrollTrigger, scroll to cycle cards (desktop); plain list below md" />
      <TestimonialStackSection heading="Loved by founders who ship fast" />

      <Label id="SEC-05 · Proof (with cases)" />
      <ProofSection
        cases={[
          {
            clientLabel: "a Series A SaaS company",
            problem: "Sample problem statement.",
            solution: "Sample description of what was built.",
            outcome: "Sample outcome metric, e.g. '40% faster onboarding'",
          },
          {
            clientLabel: "a two-sided marketplace",
            problem: "Sample problem statement.",
            solution: "Sample description of what was built.",
            outcome: "Sample outcome metric",
          },
        ]}
      />

      <Label id="SEC-05 · Proof (empty state — content rule fallback)" />
      <ProofSection cases={[]} />

      <Label id="SEC-06 · Business Impact — headline → paragraph → 3-up benefit grid (icon group + header/desc group)" />
      <BusinessImpactSection
        headline="The Real Business Impact of Sample Product"
        intro="Sample supporting line translating the feature into a broader benefit — operational leverage, reduced risk, and scalable growth, not just the feature itself."
        benefits={[
          { icon: "speed", text: "Sample speed improvement", description: "Sample supporting detail explaining this benefit." },
          { icon: "efficiency", text: "Sample efficiency gain", description: "Sample supporting detail explaining this benefit." },
          { icon: "accuracy", text: "Sample error reduction", description: "Sample supporting detail explaining this benefit." },
        ]}
      />

      <Label id="SEC-07 · Tool Deep-Dive (tool pages only)" />
      <ToolDeepDiveSection
        toolName="Sample Tool"
        whatItIs="Sample factual description of what the tool is, two to three sentences."
        whyWeUseIt="Sample explanation of specific technical reasons this agency uses it."
        limitations="Sample real, specific trade-off — e.g. 'struggles with complex relational queries at scale'."
        whatWeBuildWithIt="Sample description of what is typically built with this tool."
      />

      <Label id="SEC-08 · Qualification — centered headline + subheader, row-based comparison table (1 header row + 4 content rows)" />
      <QualificationSection
        headline="Is this the right fit for you?"
        intro="Sample intro line framing the self-selection filter."
        goodFitHeader="We're a Great Fit If"
        goodFit={[
          "You need a high-converting Framer marketing website",
          "You want a structured Framer agency process",
          "You care about performance and SEO from day one",
          "You plan to scale content and campaigns over time",
        ]}
        notGoodFitHeader="Not the Right Fit If"
        notGoodFit={[
          "You only need a quick template customization",
          "You require heavy backend application engineering",
          "You prefer unclear scope and slow decision cycles",
          "You're looking for the cheapest possible option",
        ]}
      />

      <Label id="SEC-09 · Pricing — mode: tiers" />
      <PricingSection
        mode="tiers"
        tiers={[
          { name: "Starter", price: "$X,XXX", description: "Sample tier description." },
          { name: "Growth", price: "$X,XXX", description: "Sample tier description." },
          { name: "Scale", price: "Custom", description: "Sample tier description." },
        ]}
      />

      <Label id="SEC-09 · Pricing — mode: explanation" />
      <PricingSection
        mode="explanation"
        explanation="Sample 'how we scope and price' explanation block — a short paragraph instead of tier cards."
      />

      <Label id="SEC-10 · FAQ — same header + accordion treatment as /faq" />
      <FaqSection
        headline="Frequently asked questions"
        intro="Sample intro line for the FAQ section."
        faqs={[
          { question: "Sample question one?", answer: "Sample answer one — specific to this page's actual topic." },
          { question: "Sample question two?", answer: "Sample answer two." },
          { question: "Sample question three?", answer: "Sample answer three." },
          { question: "Sample question four?", answer: "Sample answer four." },
          { question: "Sample question five?", answer: "Sample answer five." },
        ]}
      />

      {/* SEC-11 (CTA/Contact) and SEC-12 (Footer) were removed — this
          project's existing FinalCtaFooter.tsx already covers both roles
          (combined final CTA block + full site footer), so the two
          separate section-library components were redundant. */}
    </div>
  );
}
