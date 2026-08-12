// One-off setup script: creates the work_projects / work_project_details /
// work_project_details_v2 tables (idempotent) and seeds them with the same
// 6 projects previously hardcoded in src/lib/data/work-projects.ts /
// work-project-details.ts / work-project-details-v2.ts. Run with:
//   node scripts/setup-work-db.mjs
// Reads POSTGRES_URL from .env.local (gitignored, not committed) — same
// connection this project's blog setup (scripts/setup-blog-db.mjs) uses.
//
// Three tables, not one wide one — the real content already splits into
// three distinct shapes (see src/types/work.ts): a list-level card
// (`Project`), a "v1" detail-page body (`ProjectDetail`), and a completely
// separate "v2" detail-page body (`ProjectDetailV2`) that reuses the same
// `slug` but shares no other fields. `work_projects` is the base table;
// the two detail tables key off its `slug` via a foreign key so a detail
// row can never exist for a project that doesn't. `sort_order` is new —
// the static array's declaration order was the actual display order in
// WorkGallery, and a DB table has no inherent row order, so this makes
// that order explicit instead of relying on insertion order.
//
// "v1"/"v2" now name the two detail *templates*, not routes — the app's
// route layout has since swapped (see git history around
// scripts/alter-work-v2-nullable-testimonial.mjs): the former "v2"
// template is now served at the primary `/work/[slug]`, and the former
// "v1" template moved to `/work/archive/[slug]`. `work_project_details`/
// `work_project_details_v2` (the table names) were kept as-is through
// that swap — renaming a live table is more churn than it's worth for a
// naming preference.
//
// Both /work and /work/archive are DB-backed now (blog was the first;
// this followed once these tables existed) — this script only
// creates/seeds the structure, the app-code wiring itself lives in
// src/lib/data/work-projects.ts and friends. The homepage's own "Our
// Work" gallery (WorkGallery.tsx) is unrelated — it reads a completely
// different, unconnected data source (src/lib/data/projects.ts), not
// these tables.

process.loadEnvFile(new URL("../.env.local", import.meta.url));

const { sql } = await import("@vercel/postgres");

await sql`
  CREATE TABLE IF NOT EXISTS work_projects (
    slug TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    showcase_images TEXT[] NOT NULL,
    tags TEXT[] NOT NULL,
    badge TEXT,
    sort_order INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );
`;
await sql`
  CREATE TABLE IF NOT EXISTS work_project_details (
    slug TEXT PRIMARY KEY REFERENCES work_projects(slug) ON DELETE CASCADE,
    headline TEXT NOT NULL,
    sections JSONB NOT NULL,
    numbered_lists JSONB NOT NULL,
    break_images TEXT[] NOT NULL
  );
`;
await sql`
  CREATE TABLE IF NOT EXISTS work_project_details_v2 (
    slug TEXT PRIMARY KEY REFERENCES work_projects(slug) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    curved_image JSONB NOT NULL,
    testimonial_image JSONB NOT NULL,
    -- Nullable: this template became the primary /work/[slug] page (see
    -- scripts/alter-work-v2-nullable-testimonial.mjs) — most projects
    -- don't have a real client testimonial, and this project doesn't
    -- fabricate one just to fill the field. TestimonialSkillsSection.tsx
    -- renders the quote block only when present.
    testimonial JSONB,
    skills TEXT[] NOT NULL,
    rich_text TEXT[] NOT NULL,
    full_width_image JSONB NOT NULL,
    split_images JSONB NOT NULL
  );
`;
console.log("Tables ready.");

const projects = [
  {
    slug: "saas-dashboard",
    title: "Vela — SaaS Analytics",
    description: "A customer-facing analytics dashboard with role-based access and usage billing.",
    coverImage: "/work/saas-dashboard-cover.png",
    showcaseImages: ["/work/saas-dashboard-1.png", "/work/saas-dashboard-2.png", "/work/saas-dashboard-3.png"],
    tags: ["User Auth & Roles", "Billing & Subscriptions", "Dashboards"],
    badge: null,
  },
  {
    slug: "marketplace-hub",
    title: "Fleetly — B2B Marketplace",
    description: "A multi-sided marketplace connecting fleet operators with maintenance providers.",
    coverImage: "/work/marketplace-hub-cover.png",
    showcaseImages: ["/work/marketplace-hub-1.png", "/work/marketplace-hub-2.png", "/work/marketplace-hub-3.png"],
    tags: ["Multi-Role Flows", "Payments & Payouts", "Search & Filters"],
    badge: null,
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
    badge: null,
  },
  {
    slug: "internal-crm",
    title: "Basecamp Ops — Internal CRM",
    description: "A custom ops CRM replacing nine spreadsheets with one reporting source of truth.",
    coverImage: "/work/internal-crm-cover.png",
    showcaseImages: ["/work/internal-crm-1.png", "/work/internal-crm-2.png", "/work/internal-crm-3.png"],
    tags: ["Ops Dashboards", "Approval Flows", "Reporting"],
    badge: null,
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

for (let i = 0; i < projects.length; i++) {
  const p = projects[i];
  await sql`
    INSERT INTO work_projects (
      slug, title, description, cover_image, showcase_images, tags, badge, sort_order
    ) VALUES (
      ${p.slug}, ${p.title}, ${p.description}, ${p.coverImage}, ${p.showcaseImages}, ${p.tags}, ${p.badge}, ${i}
    )
    ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title,
      description = EXCLUDED.description,
      cover_image = EXCLUDED.cover_image,
      showcase_images = EXCLUDED.showcase_images,
      tags = EXCLUDED.tags,
      badge = EXCLUDED.badge,
      sort_order = EXCLUDED.sort_order;
  `;
  console.log("Seeded project:", p.slug);
}

const detailsV1 = {
  "saas-dashboard": {
    headline: "A billing-aware analytics dashboard built for teams who outgrew spreadsheets.",
    sections: [
      {
        label: "Context",
        heading: "A subscription business flying blind",
        body: "Vela's founders were running a multi-tier SaaS business off exported CSVs and gut feel. Every pricing decision took a week of manual reconciliation before anyone could act on it.",
      },
      {
        label: "Problem",
        heading: "No single source of truth",
        body: "Usage data lived in the app, billing data lived in Stripe, and support data lived in a spreadsheet nobody trusted. None of it agreed with the others by the time someone needed an answer.",
      },
      {
        label: "Output",
        heading: "One dashboard, three data sources",
        body: "We built a unified analytics layer that syncs usage events, Stripe billing, and account roles into a single customer-facing dashboard, with role-based views for admins, billing owners, and end users.",
      },
      {
        label: "Outcome",
        heading: "Decisions made in minutes, not weeks",
        body: "Vela's team now ships pricing changes the same day they're proposed. Customer-facing usage data cut support tickets about billing discrepancies by more than half.",
      },
    ],
    numberedLists: [
      {
        title: "Goals",
        items: [
          "Give every customer a live view of their own usage",
          "Replace manual CSV exports with real-time sync",
          "Support role-based access for admins and billing owners",
          "Ship a version customers could self-serve from day one",
        ],
      },
      {
        title: "Challenges",
        items: [
          "Reconciling usage events against Stripe's billing cycles",
          "Designing permissions that scaled past three roles",
          "Migrating five years of historical usage data",
          "Keeping dashboard load times fast at scale",
        ],
      },
      {
        title: "Solutions",
        items: [
          "Built an event-sourced usage ledger as the source of truth",
          "Modeled roles and permissions before writing a line of UI",
          "Backfilled historical data in a background job, not a blocking migration",
          "Cached aggregates and streamed only what changed",
        ],
      },
      {
        title: "Results",
        items: [
          "Support tickets about billing dropped by 54%",
          "Pricing changes ship same-day instead of same-week",
          "Dashboard now handles 40k+ daily active accounts",
          "Zero downtime during the historical data migration",
        ],
      },
    ],
    breakImages: ["/work/saas-dashboard-break-1.png", "/work/saas-dashboard-break-2.png"],
  },
  "marketplace-hub": {
    headline: "A two-sided marketplace that matches fleet operators with vetted maintenance shops.",
    sections: [
      {
        label: "Context",
        heading: "Fleet maintenance, still run by phone",
        body: "Fleet operators were coordinating repairs over phone calls and group texts with a rotating cast of independent shops, with no record of pricing, quality, or turnaround time.",
      },
      {
        label: "Problem",
        heading: "Trust had no paper trail",
        body: "Operators had no way to compare shops or verify quality before committing a truck to a multi-day repair, and shops had no way to build a reputation beyond word of mouth.",
      },
      {
        label: "Output",
        heading: "A marketplace with built-in trust signals",
        body: "We built role-based flows for operators and shops, a matching engine based on location and specialty, in-app messaging, and a review system tied to verified completed jobs.",
      },
      {
        label: "Outcome",
        heading: "Bookings that used to take days now take minutes",
        body: "Fleetly now processes hundreds of maintenance requests a month, with average time-to-quote dropping from two days to under four hours.",
      },
    ],
    numberedLists: [
      {
        title: "Goals",
        items: [
          "Let operators post a job and get quotes within hours",
          "Give shops a way to build a verifiable reputation",
          "Support payments and payouts without leaving the app",
          "Make it usable for shops with zero technical background",
        ],
      },
      {
        title: "Challenges",
        items: [
          "Matching jobs to shops by specialty, not just distance",
          "Handling multi-party payments and payout timing",
          "Verifying reviews were tied to real completed jobs",
          "Onboarding non-technical shop owners without a support team",
        ],
      },
      {
        title: "Solutions",
        items: [
          "Built a weighted matching engine using specialty, radius, and rating",
          "Used escrow-style payments released on job completion",
          "Locked reviews to completed, verified job records only",
          "Designed a guided onboarding flow shops could finish in one sitting",
        ],
      },
      {
        title: "Results",
        items: [
          "Average time-to-quote fell from 2 days to under 4 hours",
          "300+ shops onboarded in the first two quarters",
          "Payout disputes dropped to near zero after escrow launch",
          "90% of shops complete onboarding without contacting support",
        ],
      },
    ],
    breakImages: ["/work/marketplace-hub-break-1.png", "/work/marketplace-hub-break-2.png"],
  },
  "ai-copilot": {
    headline: "An AI agent that triages tickets and drafts replies your team actually sends.",
    sections: [
      {
        label: "Context",
        heading: "A support team buried in repetitive tickets",
        body: "The support team was spending most of their day on the same handful of question types, leaving little time for the complex cases that actually needed a human.",
      },
      {
        label: "Problem",
        heading: "Off-the-shelf chatbots gave generic answers",
        body: "Existing tools could answer FAQs but had no access to the account's real order and usage history, so answers were often technically correct and practically useless.",
      },
      {
        label: "Output",
        heading: "A copilot trained on real account context",
        body: "We built a RAG pipeline that pulls order history, usage data, and past tickets into every draft, with a human-in-the-loop review step before anything reaches a customer.",
      },
      {
        label: "Outcome",
        heading: "80% of routine tickets triaged before a human sees them",
        body: "Response time on simple tickets dropped from hours to minutes, and the support team now spends most of their time on the tickets that actually need judgment.",
      },
    ],
    numberedLists: [
      {
        title: "Goals",
        items: [
          "Auto-triage incoming tickets by type and urgency",
          "Draft replies using real account and order context",
          "Keep a human in the loop before anything sends",
          "Reduce average first-response time",
        ],
      },
      {
        title: "Challenges",
        items: [
          "Grounding responses in account-specific data, not generic FAQs",
          "Avoiding confidently wrong answers on edge cases",
          "Fitting review into agents' existing workflow, not a new tool",
          "Keeping the pipeline fast enough for real-time use",
        ],
      },
      {
        title: "Solutions",
        items: [
          "Built a RAG pipeline over order, usage, and ticket history",
          "Added confidence scoring that routes uncertain cases to a human",
          "Shipped the review step inside the existing helpdesk",
          "Cached and pre-fetched context so drafts appear in under two seconds",
        ],
      },
      {
        title: "Results",
        items: [
          "80% of routine tickets triaged without human intervention",
          "First-response time dropped from hours to minutes",
          "Agent-reported draft quality rated useful 9 times out of 10",
          "Support headcount growth paused for two straight quarters",
        ],
      },
    ],
    breakImages: ["/work/ai-copilot-break-1.png", "/work/ai-copilot-break-2.png"],
  },
  "automation-suite": {
    headline: "Connected workflows that keep the CRM, inbox, and spreadsheets in sync.",
    sections: [
      {
        label: "Context",
        heading: "Ops running on copy-paste",
        body: "The operations team was manually re-entering the same lead and deal data across the CRM, a shared inbox, and half a dozen spreadsheets every single day.",
      },
      {
        label: "Problem",
        heading: "Every manual step was a chance to lose data",
        body: "Leads fell through the cracks whenever someone forgot a step, and nobody could say with confidence which spreadsheet held the current truth.",
      },
      {
        label: "Output",
        heading: "Automated workflows connecting every tool in the stack",
        body: "We built n8n workflows syncing CRM updates, email notifications, and approval steps across tools, with alerts firing automatically when a lead goes untouched too long.",
      },
      {
        label: "Outcome",
        heading: "120+ hours of manual work removed every month",
        body: "The ops team reclaimed three full workdays a month and stopped losing leads to manual data-entry gaps entirely.",
      },
    ],
    numberedLists: [
      {
        title: "Goals",
        items: [
          "Eliminate manual data re-entry across tools",
          "Auto-notify the right person when a lead needs attention",
          "Keep a single source of truth for deal status",
          "Make workflows editable by ops, not just engineering",
        ],
      },
      {
        title: "Challenges",
        items: [
          "Handling inconsistent data formats across five legacy tools",
          "Avoiding duplicate or conflicting updates from parallel workflows",
          "Building alerting that didn't turn into alert fatigue",
          "Making automations debuggable without reading workflow JSON",
        ],
      },
      {
        title: "Solutions",
        items: [
          "Normalized every integration through a single data-mapping layer",
          "Added idempotency keys so re-runs never double-write",
          "Tuned alert thresholds with the ops team over two sprints",
          "Built a visual run history so ops could self-diagnose failures",
        ],
      },
      {
        title: "Results",
        items: [
          "120+ hours of manual busywork removed per month",
          "Lead response time improved by more than 60%",
          "Zero duplicate-entry incidents since launch",
          "Ops team now owns and edits workflows without engineering",
        ],
      },
    ],
    breakImages: ["/work/automation-suite-break-1.png", "/work/automation-suite-break-2.png"],
  },
  "internal-crm": {
    headline: "One reporting source of truth, replacing nine disconnected spreadsheets.",
    sections: [
      {
        label: "Context",
        heading: "Nine spreadsheets, nine versions of the truth",
        body: "Every department had its own spreadsheet for tracking the same client relationships, and none of them agreed with each other by the end of the month.",
      },
      {
        label: "Problem",
        heading: "Reporting took a week and was outdated on arrival",
        body: "Building a single company-wide report meant manually reconciling nine files, and by the time it was done, the numbers were already a week stale.",
      },
      {
        label: "Output",
        heading: "A single ops CRM with role-based dashboards",
        body: "We built a custom CRM consolidating every client relationship into one system, with dashboards, approval flows, and reporting tailored to each team's role.",
      },
      {
        label: "Outcome",
        heading: "Real-time reporting, zero reconciliation",
        body: "Leadership now pulls live reports in seconds instead of waiting a week, and every team works from the same numbers.",
      },
    ],
    numberedLists: [
      {
        title: "Goals",
        items: [
          "Consolidate nine spreadsheets into one system of record",
          "Give every department a dashboard suited to their role",
          "Build approval flows for account changes",
          "Make company-wide reporting instant, not weekly",
        ],
      },
      {
        title: "Challenges",
        items: [
          "Migrating years of inconsistent spreadsheet data cleanly",
          "Designing permissions across departments with different needs",
          "Getting spreadsheet-native teams to trust a new system",
          "Building reports flexible enough to replace nine formats",
        ],
      },
      {
        title: "Solutions",
        items: [
          "Ran a phased migration with a full audit trail",
          "Modeled department-specific views on top of one shared schema",
          "Ran the CRM alongside spreadsheets for one cycle to build trust",
          "Built a flexible report builder instead of nine fixed templates",
        ],
      },
      {
        title: "Results",
        items: [
          "Nine spreadsheets consolidated into one system of record",
          "Company-wide reporting time dropped from a week to seconds",
          "Zero data discrepancies since full migration",
          "100% team adoption within the first quarter",
        ],
      },
    ],
    breakImages: ["/work/internal-crm-break-1.png", "/work/internal-crm-break-2.png"],
  },
  "mvp-launch": {
    headline: "Zero to a live booking product in two weeks, ready for its first users.",
    sections: [
      {
        label: "Context",
        heading: "An idea, a deadline, and nothing built yet",
        body: "Driftly's founder had validated the idea in conversations with early customers but had no product, no team, and a hard deadline to demo something real.",
      },
      {
        label: "Problem",
        heading: "No time for a slow, traditional build",
        body: "A conventional agency engagement would have meant months of discovery before a single screen shipped — time the founder didn't have before their funding conversation.",
      },
      {
        label: "Output",
        heading: "A launch-ready MVP in two weeks",
        body: "We scoped the core booking flow tightly, designed and built it in parallel, and shipped a production-ready MVP the founder could put in front of real users and investors.",
      },
      {
        label: "Outcome",
        heading: "Live, in front of users, on schedule",
        body: "Driftly launched on schedule with a working product instead of a pitch deck, and used real user feedback from week one to shape the next roadmap.",
      },
    ],
    numberedLists: [
      {
        title: "Goals",
        items: [
          "Ship a working booking flow in two weeks",
          "Keep scope tight enough to hit the deadline",
          "Make the MVP credible enough to demo to investors",
          "Leave room to iterate from real user feedback",
        ],
      },
      {
        title: "Challenges",
        items: [
          "Compressing strategy, design, and build into two weeks",
          "Deciding what to cut without cutting the core value",
          "Standing up infrastructure fast without technical debt traps",
          "Getting a demo-ready product, not just a functional one",
        ],
      },
      {
        title: "Solutions",
        items: [
          "Ran strategy and design in parallel with early development",
          "Scoped ruthlessly to the single core booking flow",
          "Used proven, boring infrastructure choices to move fast safely",
          "Polished the exact path a demo would walk through first",
        ],
      },
      {
        title: "Results",
        items: [
          "MVP shipped in 13 days, ahead of the two-week target",
          "Demoed live to investors instead of a static prototype",
          "First cohort of real users onboarded in week one",
          "Roadmap for v2 shaped entirely by real usage data",
        ],
      },
    ],
    breakImages: ["/work/mvp-launch-break-1.png", "/work/mvp-launch-break-2.png"],
  },
};

for (const [slug, d] of Object.entries(detailsV1)) {
  await sql`
    INSERT INTO work_project_details (slug, headline, sections, numbered_lists, break_images)
    VALUES (
      ${slug}, ${d.headline}, ${JSON.stringify(d.sections)}::jsonb,
      ${JSON.stringify(d.numberedLists)}::jsonb, ${d.breakImages}
    )
    ON CONFLICT (slug) DO UPDATE SET
      headline = EXCLUDED.headline,
      sections = EXCLUDED.sections,
      numbered_lists = EXCLUDED.numbered_lists,
      break_images = EXCLUDED.break_images;
  `;
  console.log("Seeded v1 detail:", slug);
}

const detailsV2 = {
  "saas-dashboard": {
    title: "Vela",
    description:
      "A customer-facing analytics dashboard that replaced five years of exported spreadsheets with one real-time source of truth.",
    curvedImage: { src: "/work/saas-dashboard-cover.png", alt: "Vela's analytics dashboard overview" },
    testimonialImage: { src: "/work/saas-dashboard-1.png", alt: "Vela's usage dashboard, role-based view" },
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
    fullWidthImage: { src: "/work/saas-dashboard-break-1.png", alt: "Vela dashboard, full-width detail view" },
    splitImages: [
      { src: "/work/saas-dashboard-3.png", alt: "Vela billing overview panel" },
      { src: "/work/saas-dashboard-break-2.png", alt: "Vela account role settings" },
    ],
  },
  "marketplace-hub": {
    title: "Fleetly",
    description:
      "A two-sided marketplace matching fleet operators with vetted maintenance shops — quotes that used to take days now take hours.",
    curvedImage: { src: "/work/marketplace-hub-cover.png", alt: "Fleetly's marketplace overview" },
    testimonialImage: { src: "/work/marketplace-hub-1.png", alt: "Fleetly's shop matching flow" },
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
    fullWidthImage: { src: "/work/marketplace-hub-break-1.png", alt: "Fleetly marketplace, full-width detail view" },
    splitImages: [
      { src: "/work/marketplace-hub-3.png", alt: "Fleetly shop reputation panel" },
      { src: "/work/marketplace-hub-break-2.png", alt: "Fleetly payout settings" },
    ],
  },
  "ai-copilot": {
    title: "Nova",
    description:
      "An AI support copilot that drafts replies from real account context, with a human always in the loop before anything sends.",
    curvedImage: { src: "/work/ai-copilot-cover.png", alt: "Nova's support copilot overview" },
    testimonialImage: { src: "/work/ai-copilot-1.png", alt: "Nova's ticket triage view" },
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
    fullWidthImage: { src: "/work/ai-copilot-break-1.png", alt: "Nova copilot, full-width detail view" },
    splitImages: [
      { src: "/work/ai-copilot-3.png", alt: "Nova draft review panel" },
      { src: "/work/ai-copilot-break-2.png", alt: "Nova confidence scoring view" },
    ],
  },
  "automation-suite": {
    title: "Flowbase",
    description:
      "Connected workflows that keep the CRM, inbox, and spreadsheets in sync — no more manual re-entry, no more lost leads.",
    curvedImage: { src: "/work/automation-suite-cover.png", alt: "Flowbase's workflow overview" },
    testimonialImage: { src: "/work/automation-suite-1.png", alt: "Flowbase's automated workflow builder" },
    testimonial: {
      quote: "We got three workdays back every month and stopped losing leads to copy-paste mistakes. It just runs now.",
      author: "Elena Kowalski",
      role: "Ops Lead, Flowbase",
      rating: 5,
    },
    skills: ["n8n Workflows", "App Integrations", "Scheduled Jobs"],
    richText: [
      "Ops was manually re-entering the same lead and deal data across the CRM, a shared inbox, and half a dozen spreadsheets every day — and every manual step was one more chance to lose a lead.",
      "The workflows we built sync CRM updates, notifications, and approvals automatically, with alerts firing the moment a lead goes untouched too long. The team reclaimed three full workdays a month.",
    ],
    fullWidthImage: { src: "/work/automation-suite-break-1.png", alt: "Flowbase automations, full-width detail view" },
    splitImages: [
      { src: "/work/automation-suite-3.png", alt: "Flowbase alert configuration panel" },
      { src: "/work/automation-suite-break-2.png", alt: "Flowbase run history view" },
    ],
  },
  "internal-crm": {
    title: "Basecamp Ops",
    description: "A custom ops CRM that replaced nine disconnected spreadsheets with one real-time source of truth.",
    curvedImage: { src: "/work/internal-crm-cover.png", alt: "Basecamp Ops's CRM overview" },
    testimonialImage: { src: "/work/internal-crm-1.png", alt: "Basecamp Ops's reporting dashboard" },
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
    fullWidthImage: { src: "/work/internal-crm-break-1.png", alt: "Basecamp Ops CRM, full-width detail view" },
    splitImages: [
      { src: "/work/internal-crm-3.png", alt: "Basecamp Ops approval flow panel" },
      { src: "/work/internal-crm-break-2.png", alt: "Basecamp Ops department dashboard" },
    ],
  },
  "mvp-launch": {
    title: "Driftly",
    description: "A zero-to-launch MVP for a booking product, scoped, designed, and shipped live in two weeks flat.",
    curvedImage: { src: "/work/mvp-launch-cover.png", alt: "Driftly's booking product overview" },
    testimonialImage: { src: "/work/mvp-launch-1.png", alt: "Driftly's booking flow" },
    testimonial: {
      quote: "We had a real product in front of investors in thirteen days, not a deck. That changed the whole conversation.",
      author: "Talia Brooks",
      role: "Founder, Driftly",
      rating: 5,
    },
    skills: ["Rapid Scoping", "Launch-Ready Build", "User Testing"],
    richText: [
      "Driftly's founder had validated the idea in conversations with real customers, but no product, no team, and a hard deadline before a funding conversation. A conventional build would have meant months of discovery before a single screen shipped.",
      "We scoped the core booking flow tightly and built it in two weeks flat — live, in front of real users and investors, instead of a pitch deck.",
    ],
    fullWidthImage: { src: "/work/mvp-launch-break-1.png", alt: "Driftly booking product, full-width detail view" },
    splitImages: [
      { src: "/work/mvp-launch-3.png", alt: "Driftly booking confirmation screen" },
      { src: "/work/mvp-launch-break-2.png", alt: "Driftly onboarding flow" },
    ],
  },
};

for (const [slug, d] of Object.entries(detailsV2)) {
  await sql`
    INSERT INTO work_project_details_v2 (
      slug, title, description, curved_image, testimonial_image, testimonial,
      skills, rich_text, full_width_image, split_images
    ) VALUES (
      ${slug}, ${d.title}, ${d.description}, ${JSON.stringify(d.curvedImage)}::jsonb,
      ${JSON.stringify(d.testimonialImage)}::jsonb, ${JSON.stringify(d.testimonial)}::jsonb,
      ${d.skills}, ${d.richText}, ${JSON.stringify(d.fullWidthImage)}::jsonb, ${JSON.stringify(d.splitImages)}::jsonb
    )
    ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title,
      description = EXCLUDED.description,
      curved_image = EXCLUDED.curved_image,
      testimonial_image = EXCLUDED.testimonial_image,
      testimonial = EXCLUDED.testimonial,
      skills = EXCLUDED.skills,
      rich_text = EXCLUDED.rich_text,
      full_width_image = EXCLUDED.full_width_image,
      split_images = EXCLUDED.split_images;
  `;
  console.log("Seeded v2 detail:", slug);
}

console.log(`Done — ${projects.length} projects, ${Object.keys(detailsV1).length} v1 details, ${Object.keys(detailsV2).length} v2 details seeded.`);
process.exit(0);
