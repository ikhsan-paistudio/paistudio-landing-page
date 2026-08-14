import type { Project } from "@/types/content";

export const PROJECTS: Project[] = [
  {
    id: "saas-web-apps",
    name: "SaaS & Web Apps",
    desc: "Design and build scalable SaaS platforms, customer portals, dashboards, and business applications that are fast, intuitive, and ready to grow with your business.",
    skills: ["User Auth & Roles", "Billing & Subscriptions", "Dashboards", "Admin Panel", "Scalable Data Model"],
    // All 6 slots real, on request ("buat yg saas ganti ini kecuali mwr" +
    // 5 new file references) — same 4 real client projects (Ledgr,
    // MyWishRegistry, AEdiGo, LawService) as before, with 5 fresh
    // screenshots swapped in; slot 2 (mwr) intentionally left untouched.
    gallery: [
      { label: "1", src: "/work-gallery/ledgr-n.png", alt: "Ledgr — cash and bank balance dashboard" },
      { label: "2", src: "/work-gallery/mwr.png", alt: "MyWishRegistry — registry dashboard with contribution tracking" },
      { label: "3", src: "/work-gallery/aedigo-x.png", alt: "AEdiGo — freelancer home dashboard with profile progress" },
      { label: "4", src: "/work-gallery/law-service-e.png", alt: "LawService — contract analysis overview dashboard" },
      { label: "5", src: "/work-gallery/ledgr-c.png", alt: "Ledgr — sales and customer invoicing view" },
      { label: "6", src: "/work-gallery/law-service-f.png", alt: "LawService — AI contract risk clause analysis" },
    ],
  },
  {
    id: "marketplace",
    name: "Marketplace",
    desc: "Build complex multi-sided marketplaces with role-based experiences, payments, messaging, bookings, approvals, and workflow automation for buyers, sellers, and service providers.",
    skills: ["Multi-Role Flows", "Matching Logic", "Payments & Payouts", "Reviews & Trust", "Search & Filters"],
    // 6 real screenshots from 4 real marketplace products (Rooma —
    // furniture, Lancer — freelance jobs, Helperly — service providers,
    // wwaave — gig venues), on request.
    gallery: [
      { label: "1", src: "/work-gallery/rooma-b.png", alt: "Rooma — furniture product detail page" },
      { label: "2", src: "/work-gallery/lancer-a.png", alt: "Lancer — freelance job listings" },
      { label: "3", src: "/work-gallery/helperly.png", alt: "Helperly — service provider directory" },
      { label: "4", src: "/work-gallery/lancer-b.png", alt: "Lancer — freelancer profile page" },
      { label: "5", src: "/work-gallery/wwaavee.png", alt: "wwaave — gig venue marketplace homepage" },
      { label: "6", src: "/work-gallery/rooma.png", alt: "Rooma — furniture marketplace homepage" },
    ],
  },
  {
    id: "ai-products",
    name: "AI Products",
    desc: "Turn AI into a practical product by integrating LLMs, AI agents, document analysis, image generation, semantic search, and intelligent workflows into your application.",
    skills: ["LLM Integration", "RAG / Your Data", "Prompt Pipelines", "AI Agents", "Human-in-the-Loop"],
    // 6 real screenshots from 4 real AI-product projects (LawService —
    // AI contract analysis, HelloRecruiters — AI recruiter matching,
    // LinkGenius — AI outreach automation, Capit — AI investment
    // dashboard), on request.
    gallery: [
      { label: "1", src: "/work-gallery/law-service-c.png", alt: "LawService — contract analysis dashboard" },
      { label: "2", src: "/work-gallery/hellorecruiter-a.png", alt: "HelloRecruiters — AI-matched recruiter results" },
      { label: "3", src: "/work-gallery/link-genius-a.png", alt: "LinkGenius — outreach audit detail" },
      { label: "4", src: "/work-gallery/capit-a.png", alt: "Capit — AI investment performance dashboard" },
      { label: "5", src: "/work-gallery/law-service-d.png", alt: "LawService — AI contract risk analysis detail" },
      { label: "6", src: "/work-gallery/link-genius-b.png", alt: "LinkGenius — outreach campaign overview" },
    ],
  },
  {
    id: "automations",
    name: "Automations",
    desc: "Connect your business tools and automate repetitive operations—from lead management and CRM updates to notifications, approvals, and AI-powered workflows.",
    skills: ["n8n Workflows", "App Integrations", "Data Sync", "Scheduled Jobs", "Alerts & Triggers"],
    // 6 real screenshots from 4 real automation-driven products (Teliti —
    // business strategy analysis & to-do automation, Discovery Property —
    // real estate marketplace, LinkGenius — AI outreach automation,
    // Persyon — AI personal assistant with calendar/task sync), on
    // request.
    gallery: [
      { label: "1", src: "/work-gallery/teliti-a.png", alt: "Teliti — business strategy analysis dashboard" },
      { label: "2", src: "/work-gallery/dispro-a.png", alt: "Discovery Property — real estate marketplace homepage" },
      { label: "3", src: "/work-gallery/link-genius-b.png", alt: "LinkGenius — outreach campaign overview" },
      { label: "4", src: "/work-gallery/persyon-a.png", alt: "Persyon — AI personal assistant onboarding flow" },
      { label: "5", src: "/work-gallery/teliti-b.png", alt: "Teliti — client business analysis and to-do dashboard" },
      { label: "6", src: "/work-gallery/persyon-b.png", alt: "Persyon — task reminder and calendar sync screen" },
    ],
  },
  {
    id: "internal-tools",
    name: "Internal Tools",
    desc: "Create custom software that streamlines operations, including admin panels, CRM systems, construction management platforms, procurement workflows, reporting dashboards, and back-office tools.",
    skills: ["Ops Dashboards", "CRMs & Portals", "Approval Flows", "Role Permissions", "Reporting"],
    // Mostly real screenshots from 4 real internal-tools products (Discovery
    // Property — real estate listing detail, Qrafter — restaurant table &
    // order management, Konnekto — team workspace/chat, SalesHub — deal
    // pipeline CRM), on request. Slot 2 intentionally kept as a placeholder
    // per explicit instruction.
    gallery: [
      { label: "1", src: "/work-gallery/qrafter.png", alt: "Qrafter — restaurant table and order management dashboard" },
      { label: "2" },
      { label: "3", src: "/work-gallery/dispro-b.png", alt: "Discovery Property — property listing detail page" },
      { label: "4", src: "/work-gallery/konnekto.png", alt: "Konnekto — team workspace and chat dashboard" },
      { label: "5", src: "/work-gallery/saleshub.png", alt: "SalesHub — deal pipeline CRM board" },
      { label: "6", src: "/work-gallery/dispro-a.png", alt: "Discovery Property — real estate marketplace homepage" },
    ],
  },
  {
    id: "mvp",
    name: "MVP",
    desc: "Launch a production-ready MVP in weeks, not months. We help founders validate ideas quickly while building on a foundation that's ready to scale into a full product.",
    skills: ["Rapid Scoping", "Core Flow Design", "Launch-Ready Build", "User Testing", "Iteration Sprints"],
    // 6 real screenshots from 5 real MVP-stage products (Persyon — AI
    // personal assistant, wwaave — gig venue marketplace, STG — service
    // agreement management, HelloRecruiters — AI recruiter matching,
    // Helperly — service provider directory), on request.
    gallery: [
      { label: "1", src: "/work-gallery/persyon-a.png", alt: "Persyon — AI personal assistant onboarding flow" },
      { label: "2", src: "/work-gallery/wwaavee.png", alt: "wwaave — gig venue marketplace homepage" },
      { label: "3", src: "/work-gallery/stg-a.png", alt: "STG — service agreement detail view" },
      { label: "4", src: "/work-gallery/hellorecruiter-a.png", alt: "HelloRecruiters — AI-matched recruiter results" },
      { label: "5", src: "/work-gallery/helperly.png", alt: "Helperly — service provider directory" },
      { label: "6", src: "/work-gallery/stg-b.png", alt: "STG — service agreements dashboard" },
    ],
  },
];

/** Real (non-placeholder) `{ src, alt }` pairs from one `PROJECTS` entry's
 * `gallery`, by project id — for reuse outside `WorkGallery` itself, e.g.
 * `HeroSection`'s optional `images` marquee on a matching offering page
 * ("gunakan gambar yg dipake sesuai di work gallery": the SaaS & Web App
 * page's hero reuses the same images as the homepage's "SaaS & Web Apps"
 * gallery card, and so on). Drops any still-placeholder slot (no `src`,
 * e.g. Internal Tools' slot 2) rather than passing it through as a
 * broken image. Returns `[]` for an unknown id instead of throwing, since
 * a typo here should silently fall back to `HeroSection`'s placeholder
 * boxes, not break the page. */
export function getGalleryImages(id: string): { src: string; alt: string }[] {
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) return [];
  return project.gallery.filter((slot): slot is { label: string; src: string; alt: string } => Boolean(slot.src)).map((slot) => ({ src: slot.src, alt: slot.alt ?? "" }));
}
