import type { Project } from "@/types/content";

export const PROJECTS: Project[] = [
  {
    id: "saas-web-apps",
    name: "SaaS & Web Apps",
    desc: "Design and build scalable SaaS platforms, customer portals, dashboards, and business applications that are fast, intuitive, and ready to grow with your business.",
    skills: ["User Auth & Roles", "Billing & Subscriptions", "Dashboards", "Admin Panel", "Scalable Data Model"],
    gallery: ["1", "2", "3", "4", "5", "6"],
  },
  {
    id: "marketplace",
    name: "Marketplace",
    desc: "Build complex multi-sided marketplaces with role-based experiences, payments, messaging, bookings, approvals, and workflow automation for buyers, sellers, and service providers.",
    skills: ["Multi-Role Flows", "Matching Logic", "Payments & Payouts", "Reviews & Trust", "Search & Filters"],
    gallery: ["1", "2", "3", "4", "5", "6"],
  },
  {
    id: "ai-products",
    name: "AI Products",
    desc: "Turn AI into a practical product by integrating LLMs, AI agents, document analysis, image generation, semantic search, and intelligent workflows into your application.",
    skills: ["LLM Integration", "RAG / Your Data", "Prompt Pipelines", "AI Agents", "Human-in-the-Loop"],
    gallery: ["1", "2", "3", "4", "5", "6"],
  },
  {
    id: "automations",
    name: "Automations",
    desc: "Connect your business tools and automate repetitive operations—from lead management and CRM updates to notifications, approvals, and AI-powered workflows.",
    skills: ["n8n Workflows", "App Integrations", "Data Sync", "Scheduled Jobs", "Alerts & Triggers"],
    gallery: ["1", "2", "3", "4", "5", "6"],
  },
  {
    id: "internal-tools",
    name: "Internal Tools",
    desc: "Create custom software that streamlines operations, including admin panels, CRM systems, construction management platforms, procurement workflows, reporting dashboards, and back-office tools.",
    skills: ["Ops Dashboards", "CRMs & Portals", "Approval Flows", "Role Permissions", "Reporting"],
    gallery: ["1", "2", "3", "4", "5", "6"],
  },
  {
    id: "mvp",
    name: "MVP",
    desc: "Launch a production-ready MVP in weeks, not months. We help founders validate ideas quickly while building on a foundation that's ready to scale into a full product.",
    skills: ["Rapid Scoping", "Core Flow Design", "Launch-Ready Build", "User Testing", "Iteration Sprints"],
    gallery: ["1", "2", "3", "4", "5", "6"],
  },
];
