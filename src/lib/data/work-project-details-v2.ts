import type { ProjectDetailV2 } from "@/types/work";

// v2 content for every project — mirrors WORK_PROJECT_DETAILS' case-study
// facts (work-project-details.ts) so the two templates never contradict
// each other, just present it differently (huge title, curved reveal,
// testimonial, rich text, split images instead of numbered lists). Each
// project's `skills` reuses its exact `tags` from work-projects.ts rather
// than inventing new ones. The /work/v2/[slug] page 404s for any slug not
// listed here — currently that's none, all six have an entry.
export const WORK_PROJECT_DETAILS_V2: Record<string, ProjectDetailV2> = {
  "saas-dashboard": {
    title: "Vela",
    description:
      "A customer-facing analytics dashboard that replaced five years of exported spreadsheets with one real-time source of truth.",
    curvedImage: {
      src: "/work/saas-dashboard-cover.png",
      alt: "Vela's analytics dashboard overview",
    },
    testimonialImage: {
      src: "/work/saas-dashboard-1.png",
      alt: "Vela's usage dashboard, role-based view",
    },
    testimonial: {
      quote:
        "Paistudio gave us a single source of truth we could actually trust. Pricing changes that used to take a week now ship the same day.",
      author: "Jordan Ellis",
      role: "Co-founder, Vela",
      rating: 5,
    },
    skills: ["User Auth & Roles", "Billing & Subscriptions", "Dashboards"],
    richText: [
      "Before the rebuild, Vela's team spent the first two days of every sprint reconciling exports instead of shipping product. The dashboard changed that math entirely — usage, billing, and account roles now live in one place, updated in real time.",
      "What shipped wasn't just a report. Role-based views mean billing owners, admins, and end users each see exactly what matters to them, with nothing to configure and nothing to export.",
    ],
    fullWidthImage: {
      src: "/work/saas-dashboard-break-1.png",
      alt: "Vela dashboard, full-width detail view",
    },
    splitImages: [
      { src: "/work/saas-dashboard-3.png", alt: "Vela billing overview panel" },
      { src: "/work/saas-dashboard-break-2.png", alt: "Vela account role settings" },
    ],
  },

  "marketplace-hub": {
    title: "Fleetly",
    description:
      "A two-sided marketplace matching fleet operators with vetted maintenance shops — quotes that used to take days now take hours.",
    curvedImage: {
      src: "/work/marketplace-hub-cover.png",
      alt: "Fleetly's marketplace overview",
    },
    testimonialImage: {
      src: "/work/marketplace-hub-1.png",
      alt: "Fleetly's shop matching flow",
    },
    testimonial: {
      quote:
        "We went from group texts and guesswork to a marketplace shops actually trust. Time-to-quote dropped from two days to under four hours.",
      author: "Dana Whitfield",
      role: "Co-founder, Fleetly",
      rating: 5,
    },
    skills: ["Multi-Role Flows", "Payments & Payouts", "Search & Filters"],
    richText: [
      "Before Fleetly, operators were coordinating repairs over phone calls and group texts, with no record of pricing, quality, or turnaround time. Shops had no way to build a reputation beyond word of mouth.",
      "The marketplace we built matches jobs to shops by specialty and radius, settles payments in escrow until a job is verified complete, and locks reviews to real, finished work — trust that's earned inside the product, not claimed outside it.",
    ],
    fullWidthImage: {
      src: "/work/marketplace-hub-break-1.png",
      alt: "Fleetly marketplace, full-width detail view",
    },
    splitImages: [
      { src: "/work/marketplace-hub-3.png", alt: "Fleetly shop reputation panel" },
      { src: "/work/marketplace-hub-break-2.png", alt: "Fleetly payout settings" },
    ],
  },

  "ai-copilot": {
    title: "Nova",
    description:
      "An AI support copilot that drafts replies from real account context, with a human always in the loop before anything sends.",
    curvedImage: {
      src: "/work/ai-copilot-cover.png",
      alt: "Nova's support copilot overview",
    },
    testimonialImage: {
      src: "/work/ai-copilot-1.png",
      alt: "Nova's ticket triage view",
    },
    testimonial: {
      quote:
        "It doesn't just answer tickets — it answers them with the right context. Our first-response time went from hours to minutes.",
      author: "Sam Okoye",
      role: "Head of Support, Nova",
      rating: 5,
    },
    skills: ["LLM Integration", "RAG / Your Data", "Human-in-the-Loop"],
    richText: [
      "The support team was spending most of their day on the same handful of question types, leaving little room for the complex cases that actually needed a person. Off-the-shelf chatbots could answer FAQs, but had no access to a customer's real order history.",
      "Nova's RAG pipeline pulls order history, usage data, and past tickets into every draft, with a human-in-the-loop review step before anything reaches a customer — 80% of routine tickets now get triaged before a human ever sees them.",
    ],
    fullWidthImage: {
      src: "/work/ai-copilot-break-1.png",
      alt: "Nova copilot, full-width detail view",
    },
    splitImages: [
      { src: "/work/ai-copilot-3.png", alt: "Nova draft review panel" },
      { src: "/work/ai-copilot-break-2.png", alt: "Nova confidence scoring view" },
    ],
  },

  "automation-suite": {
    title: "Flowbase",
    description:
      "Connected workflows that keep the CRM, inbox, and spreadsheets in sync — no more manual re-entry, no more lost leads.",
    curvedImage: {
      src: "/work/automation-suite-cover.png",
      alt: "Flowbase's workflow overview",
    },
    testimonialImage: {
      src: "/work/automation-suite-1.png",
      alt: "Flowbase's automated workflow builder",
    },
    testimonial: {
      quote:
        "We got three workdays back every month and stopped losing leads to copy-paste mistakes. It just runs now.",
      author: "Elena Kowalski",
      role: "Ops Lead, Flowbase",
      rating: 5,
    },
    skills: ["n8n Workflows", "App Integrations", "Scheduled Jobs"],
    richText: [
      "Ops was manually re-entering the same lead and deal data across the CRM, a shared inbox, and half a dozen spreadsheets every day — and every manual step was one more chance to lose a lead.",
      "The workflows we built sync CRM updates, notifications, and approvals automatically, with alerts firing the moment a lead goes untouched too long. The team reclaimed three full workdays a month.",
    ],
    fullWidthImage: {
      src: "/work/automation-suite-break-1.png",
      alt: "Flowbase automations, full-width detail view",
    },
    splitImages: [
      { src: "/work/automation-suite-3.png", alt: "Flowbase alert configuration panel" },
      { src: "/work/automation-suite-break-2.png", alt: "Flowbase run history view" },
    ],
  },

  "internal-crm": {
    title: "Basecamp Ops",
    description: "A custom ops CRM that replaced nine disconnected spreadsheets with one real-time source of truth.",
    curvedImage: {
      src: "/work/internal-crm-cover.png",
      alt: "Basecamp Ops's CRM overview",
    },
    testimonialImage: {
      src: "/work/internal-crm-1.png",
      alt: "Basecamp Ops's reporting dashboard",
    },
    testimonial: {
      quote: "Nine spreadsheets became one system everyone trusts. Reporting that took a week now takes seconds.",
      author: "Owen Marsh",
      role: "COO, Basecamp Ops",
      rating: 5,
    },
    skills: ["Ops Dashboards", "Approval Flows", "Reporting"],
    richText: [
      "Every department kept its own spreadsheet for the same client relationships, and none of them agreed with each other by the end of the month. Building one company-wide report meant reconciling nine files by hand.",
      "The CRM we built consolidates every relationship into one system, with dashboards and approval flows tailored to each team's role — reporting that used to take a week now happens in seconds.",
    ],
    fullWidthImage: {
      src: "/work/internal-crm-break-1.png",
      alt: "Basecamp Ops CRM, full-width detail view",
    },
    splitImages: [
      { src: "/work/internal-crm-3.png", alt: "Basecamp Ops approval flow panel" },
      { src: "/work/internal-crm-break-2.png", alt: "Basecamp Ops department dashboard" },
    ],
  },

  "mvp-launch": {
    title: "Driftly",
    description: "A zero-to-launch MVP for a booking product, scoped, designed, and shipped live in two weeks flat.",
    curvedImage: {
      src: "/work/mvp-launch-cover.png",
      alt: "Driftly's booking product overview",
    },
    testimonialImage: {
      src: "/work/mvp-launch-1.png",
      alt: "Driftly's booking flow",
    },
    testimonial: {
      quote:
        "We had a real product in front of investors in thirteen days, not a deck. That changed the whole conversation.",
      author: "Talia Brooks",
      role: "Founder, Driftly",
      rating: 5,
    },
    skills: ["Rapid Scoping", "Launch-Ready Build", "User Testing"],
    richText: [
      "Driftly's founder had validated the idea in conversations with real customers, but no product, no team, and a hard deadline before a funding conversation. A conventional build would have meant months of discovery before a single screen shipped.",
      "We scoped the core booking flow tightly and built it in two weeks flat — live, in front of real users and investors, instead of a pitch deck.",
    ],
    fullWidthImage: {
      src: "/work/mvp-launch-break-1.png",
      alt: "Driftly booking product, full-width detail view",
    },
    splitImages: [
      { src: "/work/mvp-launch-3.png", alt: "Driftly booking confirmation screen" },
      { src: "/work/mvp-launch-break-2.png", alt: "Driftly onboarding flow" },
    ],
  },
};
