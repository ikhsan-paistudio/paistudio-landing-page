import type { Project } from "@/types/work";

export const WORK_PROJECTS: Project[] = [
  {
    slug: "saas-dashboard",
    title: "Vela — SaaS Analytics",
    description: "A customer-facing analytics dashboard with role-based access and usage billing.",
    coverImage: "/work/saas-dashboard-cover.png",
    showcaseImages: ["/work/saas-dashboard-1.png", "/work/saas-dashboard-2.png", "/work/saas-dashboard-3.png"],
    tags: ["User Auth & Roles", "Billing & Subscriptions", "Dashboards"],
  },
  {
    slug: "marketplace-hub",
    title: "Fleetly — B2B Marketplace",
    description: "A multi-sided marketplace connecting fleet operators with maintenance providers.",
    coverImage: "/work/marketplace-hub-cover.png",
    showcaseImages: ["/work/marketplace-hub-1.png", "/work/marketplace-hub-2.png", "/work/marketplace-hub-3.png"],
    tags: ["Multi-Role Flows", "Payments & Payouts", "Search & Filters"],
  },
  {
    slug: "ai-copilot",
    title: "Nova — AI Support Copilot",
    description: "An AI agent that triages and drafts responses to customer support tickets.",
    coverImage: "/work/ai-copilot-cover.png",
    showcaseImages: ["/work/ai-copilot-1.png", "/work/ai-copilot-2.png", "/work/ai-copilot-3.png"],
    tags: ["LLM Integration", "RAG / Your Data", "Human-in-the-Loop"],
    badge: "New",
  },
  {
    slug: "automation-suite",
    title: "Flowbase — Ops Automation",
    description: "Connected workflows syncing CRM updates, notifications, and approvals across tools.",
    coverImage: "/work/automation-suite-cover.png",
    showcaseImages: [
      "/work/automation-suite-1.png",
      "/work/automation-suite-2.png",
      "/work/automation-suite-3.png",
    ],
    tags: ["n8n Workflows", "App Integrations", "Scheduled Jobs"],
  },
  {
    slug: "internal-crm",
    title: "Basecamp Ops — Internal CRM",
    description: "A custom ops CRM replacing nine spreadsheets with one reporting source of truth.",
    coverImage: "/work/internal-crm-cover.png",
    showcaseImages: ["/work/internal-crm-1.png", "/work/internal-crm-2.png", "/work/internal-crm-3.png"],
    tags: ["Ops Dashboards", "Approval Flows", "Reporting"],
  },
  {
    slug: "mvp-launch",
    title: "Driftly — MVP Launch",
    description: "Zero-to-launch MVP for a founder validating a new booking product.",
    coverImage: "/work/mvp-launch-cover.png",
    showcaseImages: ["/work/mvp-launch-1.png", "/work/mvp-launch-2.png", "/work/mvp-launch-3.png"],
    tags: ["Rapid Scoping", "Launch-Ready Build", "User Testing"],
    badge: "Coming Soon",
  },
];
