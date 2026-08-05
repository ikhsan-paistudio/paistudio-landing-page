import { WORK_PROJECTS } from "@/lib/data/work-projects";
import type { ProjectDetail } from "@/types/work";

type DetailOnly = Omit<ProjectDetail, keyof (typeof WORK_PROJECTS)[number]>;

const DETAILS_ONLY: Record<string, DetailOnly> = {
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

export const WORK_PROJECT_DETAILS: Record<string, ProjectDetail> = Object.fromEntries(
  WORK_PROJECTS.map((project) => [project.slug, { ...project, ...DETAILS_ONLY[project.slug] }])
);
