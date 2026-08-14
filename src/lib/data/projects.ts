import type { Project } from "@/types/content";

export const PROJECTS: Project[] = [
  {
    id: "saas-web-apps",
    name: "SaaS & Web Apps",
    desc: "Design and build scalable SaaS platforms, customer portals, dashboards, and business applications that are fast, intuitive, and ready to grow with your business.",
    skills: ["User Auth & Roles", "Billing & Subscriptions", "Dashboards", "Admin Panel", "Scalable Data Model"],
    // All 6 slots real again, on explicit direct request ("now update it
    // with this" + the 6 file references) — same 4 real client projects
    // (Ledgr, MyWishRegistry, AEdiGo, LawService) as the earlier attempt.
    // Note for whoever reads this later: content/images/ledgr_a.png,
    // aedigo_a.png, law-service_a.png, ledgr_b.png, and law-service_b.png
    // were, at the time this was wired in, byte-identical to the version
    // already used earlier in this same session (confirmed by checksum) —
    // i.e. an intended "replace these images" never actually changed
    // anything on disk. This entry reflects the explicit instruction to
    // use these exact files regardless: if the visuals still look like
    // the old ones after a fresh replacement, the new files likely still
    // aren't reaching this path on disk.
    gallery: [
      { label: "1", src: "/work-gallery/ledgr-a.png", alt: "Ledgr — financial overview dashboard" },
      { label: "2", src: "/work-gallery/mwr.png", alt: "MyWishRegistry — registry dashboard with contribution tracking" },
      { label: "3", src: "/work-gallery/aedigo-a.png", alt: "AEdiGo — freelancer profile completion dashboard" },
      { label: "4", src: "/work-gallery/law-service-a.png", alt: "LawService — contract analysis dashboard" },
      { label: "5", src: "/work-gallery/ledgr-b.png", alt: "Ledgr — customer sales and invoicing view" },
      { label: "6", src: "/work-gallery/law-service-b.png", alt: "LawService — AI contract risk analysis detail" },
    ],
  },
  {
    id: "marketplace",
    name: "Marketplace",
    desc: "Build complex multi-sided marketplaces with role-based experiences, payments, messaging, bookings, approvals, and workflow automation for buyers, sellers, and service providers.",
    skills: ["Multi-Role Flows", "Matching Logic", "Payments & Payouts", "Reviews & Trust", "Search & Filters"],
    gallery: [{ label: "1" }, { label: "2" }, { label: "3" }, { label: "4" }, { label: "5" }, { label: "6" }],
  },
  {
    id: "ai-products",
    name: "AI Products",
    desc: "Turn AI into a practical product by integrating LLMs, AI agents, document analysis, image generation, semantic search, and intelligent workflows into your application.",
    skills: ["LLM Integration", "RAG / Your Data", "Prompt Pipelines", "AI Agents", "Human-in-the-Loop"],
    gallery: [{ label: "1" }, { label: "2" }, { label: "3" }, { label: "4" }, { label: "5" }, { label: "6" }],
  },
  {
    id: "automations",
    name: "Automations",
    desc: "Connect your business tools and automate repetitive operations—from lead management and CRM updates to notifications, approvals, and AI-powered workflows.",
    skills: ["n8n Workflows", "App Integrations", "Data Sync", "Scheduled Jobs", "Alerts & Triggers"],
    gallery: [{ label: "1" }, { label: "2" }, { label: "3" }, { label: "4" }, { label: "5" }, { label: "6" }],
  },
  {
    id: "internal-tools",
    name: "Internal Tools",
    desc: "Create custom software that streamlines operations, including admin panels, CRM systems, construction management platforms, procurement workflows, reporting dashboards, and back-office tools.",
    skills: ["Ops Dashboards", "CRMs & Portals", "Approval Flows", "Role Permissions", "Reporting"],
    gallery: [{ label: "1" }, { label: "2" }, { label: "3" }, { label: "4" }, { label: "5" }, { label: "6" }],
  },
  {
    id: "mvp",
    name: "MVP",
    desc: "Launch a production-ready MVP in weeks, not months. We help founders validate ideas quickly while building on a foundation that's ready to scale into a full product.",
    skills: ["Rapid Scoping", "Core Flow Design", "Launch-Ready Build", "User Testing", "Iteration Sprints"],
    gallery: [{ label: "1" }, { label: "2" }, { label: "3" }, { label: "4" }, { label: "5" }, { label: "6" }],
  },
];
