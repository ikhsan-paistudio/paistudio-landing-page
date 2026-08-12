// Migrates 12 real case studies from paistudio.co/project/{slug} into the
// work_projects / work_project_details tables (see scripts/setup-work-db.mjs
// for the schema, scripts/migrate-hellorecruiters-project.mjs for the first
// real-project migration this one follows the same rules as). Run with:
//   node scripts/migrate-2026-work-projects-batch.mjs
//
// Content honesty notes (same bar the blog migrations and
// migrate-hellorecruiters-project.mjs already use):
//   - Every `sections`/numbered-list item below is either verbatim from the
//     live page or a direct, non-speculative paraphrase of it. Where a
//     source page states almost nothing beyond its title + Deliverable/
//     Product type/Tools/Location facts (ez-research-solutions, vodio,
//     poteq, replyrabbit — genuinely thin on the real site, not a scraping
//     miss, double-checked), the sections here stay deliberately modest
//     and category-level rather than inventing specific problems, features,
//     or outcomes the source never claims. Their `numberedLists` has only
//     one real "Goals" block instead of the fuller "Features" + "Goals"
//     pair the richer projects get, for the same reason.
//   - Only ONE of these 12 gets a work_project_details_v2 (LinkGenius) — the
//     template requires a real client testimonial, and LinkGenius is the
//     one case where this codebase already has one on file:
//     src/lib/data/testimonials.ts explicitly attributes a quote to
//     "Marcus Okafor, CEO, LinkGenius" (already live on the real homepage,
//     not something authored for this migration) — an exact company-name
//     match to this real project, so reusing it here is sourcing an
//     existing real quote, not fabricating one. No such match exists for
//     any of the other 11 (checked each source page's own HTML for the
//     other two names on file, "Sittiporn Charoensrichai"/"AI Lawfirm" and
//     "Priya Raman"/"SalesHub" — no match, including on lawyerdrive despite
//     both being Thailand-adjacent legal-ish products; a plausible-sounding
//     guess isn't a real match), so the other 11 stay v1-only. Every
//     project below gets a real `work_projects` row regardless — the
//     ProjectCard.hasV2 fallback (see src/components/work/ProjectCard.tsx)
//     means a v1-only project's card correctly links to `/work/[slug]`
//     instead of a v2 page that doesn't exist.
//   - `tags` reflect each project's actual stated Deliverable/Product
//     type/Tools facts, not invented capability labels — including the two
//     (aedigo, ozanimart) actually built with Framer, not Bubble.io.

process.loadEnvFile(new URL("../.env.local", import.meta.url));

const { sql } = await import("@vercel/postgres");

const projects = [
  {
    slug: "teliti",
    title: "Teliti — AI Business Strategy Platform",
    description:
      "An AI-driven platform helping Indonesian SMEs develop structured, actionable business strategies.",
    coverImage: "/work/teliti-cover.png",
    showcaseImages: ["/work/teliti-1.png", "/work/teliti-2.png", "/work/teliti-3.png"],
    tags: ["Website", "Utility", "Bubble.io"],
    badge: null,
    detail: {
      headline: "An AI-powered SaaS platform turning business strategy into a system, not a guessing game.",
      sections: [
        {
          label: "Context",
          heading: "Indonesian SMEs lacked structured business guidance",
          body: "Most Indonesian SMEs had no access to affordable, structured business strategy guidance — planning was ad hoc, and professional consulting was often out of reach.",
        },
        {
          label: "Problem",
          heading: "Generic advice doesn't scale to individual businesses",
          body: "Turning a business owner's specific situation into an actionable, personalized strategy usually meant expensive one-on-one consulting, not something that could scale to many SMEs at once.",
        },
        {
          label: "Output",
          heading: "A platform that turns input into strategy",
          body: "Developed using Bubble.io, Teliti transforms user input into personalized strategic recommendations through two core services — Teliti Binastrategi, a quarterly subscription for ongoing strategy planning and follow-up consultations, and Teliti Bisnisku, a one-time service for a full business plan, feasibility study, and go-to-market strategy.",
        },
        {
          label: "Outcome",
          heading: "One dashboard for strategy, documents, and progress",
          body: "The entire experience is streamlined through a responsive dashboard, letting users review strategic documents, track monthly progress, and receive updates — combining AI insights with professional business analysis in one place.",
        },
      ],
      numberedLists: [
        {
          title: "Features",
          items: [
            "Teliti Binastrategi — quarterly strategy planning and consultations",
            "Teliti Bisnisku — one-time business plan and feasibility study",
            "Responsive dashboard for reviewing strategic documents",
            "Monthly progress tracking and updates",
          ],
        },
        {
          title: "Goals",
          items: [
            "Help SMEs develop structured, actionable strategies",
            "Combine AI insights with professional business analysis",
            "Make strategic guidance affordable and scalable",
            "Give business owners a mobile-friendly way to track progress",
          ],
        },
      ],
      breakImages: ["/work/teliti-1.png", "/work/teliti-2.png"],
    },
  },
  {
    slug: "linkgenius",
    title: "LinkGenius — AI SEO Outreach Platform",
    description:
      "An AI-driven SaaS platform consolidating backlink outreach, campaign management, and SEO reporting for agencies.",
    coverImage: "/work/linkgenius-cover.png",
    showcaseImages: ["/work/linkgenius-1.png", "/work/linkgenius-2.png", "/work/linkgenius-3.png"],
    tags: ["Website", "CRM", "Bubble.io"],
    badge: null,
    detail: {
      headline: "An all-in-one SEO outreach platform that replaces a stack of disconnected tools.",
      sections: [
        {
          label: "Context",
          heading: "SEO agencies were stitching together too many tools",
          body: "SEO agencies and growth marketers were prospecting, emailing, managing campaigns, and reporting across a patchwork of separate tools — slow to set up and hard to keep in sync.",
        },
        {
          label: "Problem",
          heading: "No single tool covered the whole outreach workflow",
          body: "Running an effective link-building campaign meant juggling tools like Ahrefs, Mailgun, and Trello separately, with no shared source of truth across prospecting, outreach, and reporting.",
        },
        {
          label: "Output",
          heading: "One platform for the entire outreach workflow",
          body: "Built with Bubble.io, LinkGenius combines domain and email setup, AI-powered messaging, contact discovery, and automated workflows into a single tool — with built-in email warm-up, spam analysis, and backlink scoring.",
        },
        {
          label: "Outcome",
          heading: "Campaigns live in under 15 minutes",
          body: "The platform consolidates prospecting, email outreach, campaign management, and SEO reporting into one intuitive tool, enabling agencies to launch effective link-building campaigns in under 15 minutes.",
        },
      ],
      numberedLists: [
        {
          title: "Features",
          items: [
            "AI-powered messaging and contact discovery",
            "Built-in email warm-up and spam analysis",
            "Backlink scoring and SEO reporting",
            "Automated outreach workflows",
          ],
        },
        {
          title: "Goals",
          items: [
            "Consolidate prospecting, outreach, and reporting into one tool",
            "Let agencies launch campaigns in under 15 minutes",
            "Remove the need for Ahrefs, Mailgun, and Trello separately",
            "Make backlink outreach scalable for growth marketers",
          ],
        },
      ],
      breakImages: ["/work/linkgenius-1.png", "/work/linkgenius-3.png"],
    },
    v2: {
      title: "LinkGenius",
      description:
        "An AI-driven SaaS platform consolidating backlink outreach, campaign management, and SEO reporting for agencies.",
      curvedImage: { src: "/work/linkgenius-cover.png", alt: "LinkGenius platform overview" },
      testimonialImage: { src: "/work/linkgenius-2.png", alt: "LinkGenius inbox and outreach view" },
      testimonial: {
        quote:
          "They ship fast without the chaos. Predictable scope, clean builds, and zero lock-in when we scaled to a dev team.",
        author: "Marcus Okafor",
        role: "CEO, LinkGenius",
        rating: 5,
      },
      skills: ["Website", "CRM", "Bubble.io"],
      richText: [
        "SEO agencies and growth marketers were prospecting, emailing, managing campaigns, and reporting across a patchwork of separate tools — slow to set up and hard to keep in sync, with no shared source of truth across the workflow.",
        "LinkGenius combines domain and email setup, AI-powered messaging, contact discovery, and automated workflows into a single tool, with built-in email warm-up, spam analysis, and backlink scoring — consolidating the entire outreach workflow so agencies can launch effective campaigns in under 15 minutes.",
      ],
      fullWidthImage: { src: "/work/linkgenius-1.png", alt: "LinkGenius pipeline detail view" },
      splitImages: [
        { src: "/work/linkgenius-2.png", alt: "LinkGenius inbox view" },
        { src: "/work/linkgenius-3.png", alt: "LinkGenius settings and billing view" },
      ],
    },
  },
  {
    slug: "quantumtemple",
    title: "QuantumTemple — Cultural Heritage Travel Platform",
    description:
      "A platform connecting travelers with living cultural heritage through curated, bookable experiences.",
    coverImage: "/work/quantumtemple-cover.png",
    showcaseImages: ["/work/quantumtemple-1.png", "/work/quantumtemple-2.png", "/work/quantumtemple-3.png"],
    tags: ["Website", "CRM", "Bubble.io"],
    badge: null,
    detail: {
      headline: "A booking platform connecting travelers with cultural heritage experiences, handled end to end.",
      sections: [
        {
          label: "Context",
          heading: "Cultural heritage experiences were hard to book directly",
          body: "Travelers interested in authentic cultural heritage experiences had no single place to discover and book them directly with concierge partners.",
        },
        {
          label: "Problem",
          heading: "No unified way to manage bookings and payments",
          body: "Concierge partners needed a way to manage bookings and take payments directly, with a reliable record of booking history, without stitching together separate tools.",
        },
        {
          label: "Output",
          heading: "A seamless booking platform for desktop and mobile",
          body: "We created a seamless, user-friendly application for both desktop and mobile, designed for users and concierge services, including an easy-to-manage dashboard and CRM.",
        },
        {
          label: "Outcome",
          heading: "Bookings and payments handled directly on the platform",
          body: "Concierge partners can book experiences and take payments directly through the platform, with all booking history automatically stored and displayed on the dashboard.",
        },
      ],
      numberedLists: [
        {
          title: "Features",
          items: [
            "Direct booking and payments for concierge partners",
            "Automatic booking history stored on the dashboard",
            "Easy-to-manage CRM for concierge services",
            "Desktop and mobile-friendly experience",
          ],
        },
        {
          title: "Goals",
          items: [
            "Connect travelers directly with cultural heritage experiences",
            "Let concierge partners manage bookings in one place",
            "Keep a full booking history without manual tracking",
            "Support both desktop and mobile users",
          ],
        },
      ],
      breakImages: ["/work/quantumtemple-1.png", "/work/quantumtemple-3.png"],
    },
  },
  {
    slug: "ez-research-solutions",
    title: "EZ Research Solutions — Healthcare Study Platform",
    description: "An AI-powered platform for healthcare study design and compliance, built on Bubble.io.",
    coverImage: "/work/ez-research-solutions-cover.webp",
    showcaseImages: ["/work/ez-research-solutions-cover.webp"],
    tags: ["Website", "AI", "Bubble.io"],
    badge: null,
    detail: {
      headline: "An AI product built to bring structure to healthcare study design and compliance.",
      sections: [
        {
          label: "Context",
          heading: "Healthcare research needs structure and compliance",
          body: "Healthcare study design involves strict compliance requirements and structured processes that are easy to get wrong without the right tooling.",
        },
        {
          label: "Problem",
          heading: "Study design and compliance are hard to manage without dedicated tooling",
          body: "Without a dedicated platform, healthcare teams are left managing study design and compliance requirements through disconnected documents and manual processes.",
        },
        {
          label: "Output",
          heading: "An AI-powered platform for healthcare study design",
          body: "We built EZ Research Solutions as an AI product on Bubble.io, focused on streamlining healthcare study design and compliance for a US-based team.",
        },
        {
          label: "Outcome",
          heading: "A dedicated platform for research teams",
          body: "The result is a purpose-built, production-ready tool that gives healthcare research teams a structured way to design studies and stay compliant.",
        },
      ],
      numberedLists: [
        {
          title: "Goals",
          items: [
            "Bring structure to healthcare study design",
            "Help teams stay compliant throughout the process",
            "Provide a dedicated platform instead of scattered documents",
            "Support a scalable AI-powered workflow",
          ],
        },
      ],
      breakImages: ["/work/ez-research-solutions-cover.webp", "/work/ez-research-solutions-cover.webp"],
    },
  },
  {
    slug: "discovery-property",
    title: "Discovery Property — Real Estate Operations Dashboard",
    description: "An operational dashboard helping real estate agents manage listings, transactions, and reports.",
    coverImage: "/work/discovery-property-cover.png",
    showcaseImages: ["/work/discovery-property-1.png", "/work/discovery-property-2.png", "/work/discovery-property-3.png"],
    tags: ["Website", "Dashboard", "Bubble.io"],
    badge: null,
    detail: {
      headline: "An internal dashboard that replaced scattered listing and transaction tracking with one system.",
      sections: [
        {
          label: "Context",
          heading: "Agents managed listings and deals across scattered tools",
          body: "DiscoveryProperty.id's agent team was managing property listings, client transactions, and performance reporting without a single, centralized system.",
        },
        {
          label: "Problem",
          heading: "No single view of operations and performance",
          body: "Without a centralized dashboard, agents had no easy way to track deals or see how their team's operations were performing at a glance.",
        },
        {
          label: "Output",
          heading: "A single operational dashboard for the agent team",
          body: "We developed an internal operational dashboard using Bubble for DiscoveryProperty.id's agent team, letting agents efficiently manage property listings, track transactions, and generate reports — all in one place.",
        },
        {
          label: "Outcome",
          heading: "More efficient operations with better visibility",
          body: "The dashboard streamlines daily workflows and centralizes critical data, helping the team handle property operations more effectively and scale their service with better visibility and control.",
        },
      ],
      numberedLists: [
        {
          title: "Features",
          items: [
            "Centralized property listing management",
            "Transaction tracking in one dashboard",
            "Built-in performance reporting",
            "Real-time visibility into agent operations",
          ],
        },
        {
          title: "Goals",
          items: [
            "Centralize listings, transactions, and reporting",
            "Help agents work more efficiently",
            "Give the team better visibility into performance",
            "Support scaling the business with better data",
          ],
        },
      ],
      breakImages: ["/work/discovery-property-1.png", "/work/discovery-property-3.png"],
    },
  },
  {
    slug: "vodio",
    title: "Vodio — On-Demand Consulting App",
    description: "A mobile app for on-demand consulting with custom call duration, pricing, and video support.",
    coverImage: "/work/vodio-cover.jpg",
    showcaseImages: ["/work/vodio-cover.jpg"],
    tags: ["Mobile App", "Utility", "Bubble.io"],
    badge: null,
    detail: {
      headline: "An on-demand consulting app built for flexible calls, pricing, and video support.",
      sections: [
        {
          label: "Context",
          heading: "On-demand consulting needs flexible call and pricing options",
          body: "Consultants offering on-demand advice needed a way to set their own call duration and pricing, not a one-size-fits-all booking flow.",
        },
        {
          label: "Problem",
          heading: "Generic booking tools don't support custom consulting formats",
          body: "Most booking tools assume a fixed session length and price, which doesn't fit consultants who want to offer flexible call durations and video support.",
        },
        {
          label: "Output",
          heading: "A mobile app for flexible, on-demand consulting",
          body: "We built Vodio as a mobile app on Bubble.io, giving consultants control over call duration, pricing, and video support for on-demand sessions.",
        },
        {
          label: "Outcome",
          heading: "A dedicated app for on-demand consulting",
          body: "The result is a production-ready mobile app tailored to how on-demand consultants actually want to work — on their own terms for duration and price.",
        },
      ],
      numberedLists: [
        {
          title: "Goals",
          items: [
            "Let consultants set their own call duration and pricing",
            "Support on-demand video calls in one app",
            "Give users a simple way to book flexible consulting",
            "Build a scalable mobile experience on Bubble.io",
          ],
        },
      ],
      breakImages: ["/work/vodio-cover.jpg", "/work/vodio-cover.jpg"],
    },
  },
  {
    slug: "poteq",
    title: "Poteq — Plant Community & Marketplace",
    description: "An online plant community with Q&A and e-commerce for plant sales.",
    coverImage: "/work/poteq-cover.jpg",
    showcaseImages: ["/work/poteq-cover.jpg"],
    tags: ["Mobile App", "Utility", "Bubble.io"],
    badge: null,
    detail: {
      headline: "A community and marketplace app built for plant lovers to ask questions and buy plants.",
      sections: [
        {
          label: "Context",
          heading: "Plant lovers had nowhere to combine community and shopping",
          body: "People looking for plant advice and plant sellers were split across separate forums and marketplaces, with no single place combining both.",
        },
        {
          label: "Problem",
          heading: "Q&A and e-commerce rarely live in one product",
          body: "Plant enthusiasts wanting advice before buying had to leave a community space entirely to find a place to actually purchase plants.",
        },
        {
          label: "Output",
          heading: "A community and marketplace in one app",
          body: "We built Poteq as a mobile app on Bubble.io combining a plant Q&A community with e-commerce for plant sales in a single experience.",
        },
        {
          label: "Outcome",
          heading: "One app for plant advice and plant shopping",
          body: "The result is a mobile app where plant lovers can ask questions and buy plants without switching between separate platforms.",
        },
      ],
      numberedLists: [
        {
          title: "Goals",
          items: [
            "Combine plant Q&A community with e-commerce",
            "Let users get advice before they buy",
            "Build a mobile-first experience for plant lovers",
            "Support plant sales directly in the app",
          ],
        },
      ],
      breakImages: ["/work/poteq-cover.jpg", "/work/poteq-cover.jpg"],
    },
  },
  {
    slug: "aedigo",
    title: "AEdigo — Construction Talent Marketplace Website",
    description:
      "A strategic website redesign helping AEdigo strengthen credibility and streamline hiring for construction professionals.",
    coverImage: "/work/aedigo-cover.png",
    showcaseImages: ["/work/aedigo-1.png", "/work/aedigo-2.png", "/work/aedigo-3.png"],
    tags: ["Website", "Dashboard", "Framer"],
    badge: null,
    detail: {
      headline: "A website redesign that turned a curated construction talent marketplace into a clear, credible gateway.",
      sections: [
        {
          label: "Context",
          heading: "AEdigo needed to communicate its value more clearly",
          body: "AEdigo needed clearer positioning and a stronger online presence to communicate its value as a curated marketplace for construction professionals.",
        },
        {
          label: "Problem",
          heading: "The existing site didn't guide visitors to act",
          body: "The existing website lacked structure and did not effectively guide visitors toward taking action.",
        },
        {
          label: "Output",
          heading: "A redesign focused on clarity, trust, and conversion",
          body: "We repositioned AEdigo through a strategic website redesign focused on clarity, trust, and conversion — refining the messaging, restructuring the content hierarchy, and simplifying the hiring journey.",
        },
        {
          label: "Outcome",
          heading: "A clear, credible gateway for vetted talent",
          body: "The result is a clear and credible gateway for companies seeking vetted construction talent, with credibility and a streamlined hiring journey built into the site itself.",
        },
      ],
      numberedLists: [
        {
          title: "Features",
          items: [
            "Refined messaging and positioning",
            "Restructured content hierarchy",
            "Simplified hiring journey",
            "Clearer calls to action toward conversion",
          ],
        },
        {
          title: "Goals",
          items: [
            "Strengthen AEdigo's credibility as a curated marketplace",
            "Guide visitors clearly toward taking action",
            "Simplify the hiring journey for construction professionals",
            "Improve conversion through better structure",
          ],
        },
      ],
      breakImages: ["/work/aedigo-1.png", "/work/aedigo-3.png"],
    },
  },
  {
    slug: "replyrabbit",
    title: "ReplyRabbit — AI CRM for Order Support",
    description: "An AI-powered CRM for order tracking, shipping updates, and return inquiries.",
    coverImage: "/work/replyrabbit-cover.jpg",
    showcaseImages: ["/work/replyrabbit-cover.jpg"],
    tags: ["Mobile App", "CRM", "Bubble.io"],
    badge: null,
    detail: {
      headline: "An AI-powered CRM built to handle order tracking, shipping, and returns in one place.",
      sections: [
        {
          label: "Context",
          heading: "Order support requests come from too many directions",
          body: "Ecommerce teams handling order tracking, shipping updates, and return inquiries needed a way to manage all of it without switching between tools.",
        },
        {
          label: "Problem",
          heading: "Generic CRMs aren't built for order support specifically",
          body: "Most CRMs aren't built around the specific pattern of order tracking, shipping updates, and return inquiries that ecommerce support teams deal with every day.",
        },
        {
          label: "Output",
          heading: "An AI-powered CRM built around order support",
          body: "We built ReplyRabbit as a mobile app on Bubble.io, using AI to help teams handle order tracking, shipping updates, and return inquiries in one CRM.",
        },
        {
          label: "Outcome",
          heading: "One CRM for the entire order support workflow",
          body: "The result is a dedicated, production-ready CRM that brings order tracking, shipping updates, and return inquiries into a single AI-powered workflow.",
        },
      ],
      numberedLists: [
        {
          title: "Goals",
          items: [
            "Handle order tracking, shipping, and returns in one CRM",
            "Use AI to support faster order-related responses",
            "Build a mobile-first experience for support teams",
            "Reduce the tools needed to manage order support",
          ],
        },
      ],
      breakImages: ["/work/replyrabbit-cover.jpg", "/work/replyrabbit-cover.jpg"],
    },
  },
  {
    slug: "ozanimart",
    title: "Ozanimart — Wholesale Distributor Website",
    description:
      "A website redesign for Ozanimart, a wholesale distributor of games and collectables across Australia and New Zealand.",
    coverImage: "/work/ozanimart-cover.png",
    showcaseImages: ["/work/ozanimart-1.png", "/work/ozanimart-2.png", "/work/ozanimart-3.png"],
    tags: ["Website", "Utility", "Framer"],
    badge: null,
    detail: {
      headline: "A website redesign that repositioned a wholesale distributor for B2B growth.",
      sections: [
        {
          label: "Context",
          heading: "Ozanimart needed to strengthen its wholesale positioning",
          body: "Ozanimart, a wholesale distributor of games, blind boxes, trading card games, and collectables across Australia and New Zealand, needed a website that matched its position as a leading distributor in the category.",
        },
        {
          label: "Problem",
          heading: "B2B messaging and partnerships weren't clearly communicated",
          body: "The site needed clearer B2B messaging, stronger visibility for global brand partnerships, and a better path for retailers to apply for partnership.",
        },
        {
          label: "Output",
          heading: "A redesign focused on B2B clarity and conversion",
          body: "The project focused on clarifying B2B messaging, highlighting global brand partnerships, showcasing fast-selling product categories, and improving the conversion flow toward retail partnership applications.",
        },
        {
          label: "Outcome",
          heading: "A stronger, more credible wholesale brand",
          body: "We delivered a strategic website redesign that clarified Ozanimart's wholesale positioning, strengthened brand credibility, and streamlined the path for retailers to become partners.",
        },
      ],
      numberedLists: [
        {
          title: "Features",
          items: [
            "Clarified B2B messaging",
            "Highlighted global brand partnerships",
            "Showcased fast-selling product categories",
            "Streamlined retail partnership applications",
          ],
        },
        {
          title: "Goals",
          items: [
            "Strengthen Ozanimart's wholesale positioning",
            "Build credibility with retail partners",
            "Make it easier for retailers to apply for partnership",
            "Highlight the categories that sell fastest",
          ],
        },
      ],
      breakImages: ["/work/ozanimart-1.png", "/work/ozanimart-3.png"],
    },
  },
  {
    slug: "lawyerdrive",
    title: "Lawyerdrive — Legal Case Management Platform",
    description: "A secure platform helping legal teams organize documents, manage cases, schedule meetings, and collaborate.",
    coverImage: "/work/lawyerdrive-cover.png",
    showcaseImages: ["/work/lawyerdrive-1.png", "/work/lawyerdrive-2.png", "/work/lawyerdrive-3.png"],
    tags: ["Mobile App", "Utility", "Bubble.io"],
    badge: null,
    detail: {
      headline: "A secure workspace that gives law firms one place for cases, documents, and collaboration.",
      sections: [
        {
          label: "Context",
          heading: "Law firms managed cases without a shared system",
          body: "Lawyerdrive was created to support law firms in managing their daily workload with better structure and clarity, centralizing case files, client documents, communication logs, deadlines, and meeting schedules.",
        },
        {
          label: "Problem",
          heading: "Confidential case data needs role-based control",
          body: "With multiple team members needing access to sensitive case data, the platform needed role-based access so each person could view and manage only what they need.",
        },
        {
          label: "Output",
          heading: "A secure, organized SaaS platform for legal workflows",
          body: "We developed Lawyerdrive as a secure, organized, and scalable SaaS platform tailored to the workflow of modern law practices, letting lawyers and staff file documents, update case details, and plan meetings without friction.",
        },
        {
          label: "Outcome",
          heading: "Full control over roles, permissions, and visibility",
          body: "Admins get full control over user roles, permissions, and data visibility — combining structured case management with powerful collaboration tools built specifically for law firms.",
        },
      ],
      numberedLists: [
        {
          title: "Features",
          items: [
            "Centralized case files and client documents",
            "Role-based access for each team member",
            "Case overview dashboard",
            "Meeting scheduling and communication logs",
          ],
        },
        {
          title: "Goals",
          items: [
            "Give legal teams a shared, structured workspace",
            "Keep confidential case data properly controlled",
            "Reduce friction in filing and case updates",
            "Support collaboration without sacrificing confidentiality",
          ],
        },
      ],
      breakImages: ["/work/lawyerdrive-1.png", "/work/lawyerdrive-3.png"],
    },
  },
  {
    slug: "qrafter",
    title: "Qrafter — Restaurant Operations Platform",
    description: "An all-in-one platform helping restaurants manage orders, tables, menus, and daily operations.",
    coverImage: "/work/qrafter-cover.png",
    showcaseImages: ["/work/qrafter-1.png", "/work/qrafter-2.png", "/work/qrafter-3.png"],
    tags: ["Website", "Dashboard", "Bubble.io"],
    badge: null,
    detail: {
      headline: "An all-in-one restaurant operations platform for front-of-house teams and admins alike.",
      sections: [
        {
          label: "Context",
          heading: "Restaurants needed one system for daily operations",
          body: "Qrafter helps restaurants manage orders, tables, menus, and daily operations while giving admins full visibility into branch performance and user access.",
        },
        {
          label: "Problem",
          heading: "Front-of-house speed and admin visibility rarely come together",
          body: "Restaurants needed a fast, error-reducing ordering experience for staff, alongside a powerful backend for admins to manage menus, transactions, and branch performance.",
        },
        {
          label: "Output",
          heading: "A platform built for both staff and admins",
          body: "We designed Qrafter as a scalable SaaS platform with a clean, fast, and intuitive experience for both front-of-house teams and admins.",
        },
        {
          label: "Outcome",
          heading: "Structure, accuracy, and efficiency across every branch",
          body: "Staff get a smooth ordering system that reduces errors and speeds up service, while admins receive a powerful backend for managing menus, tables, transactions, users, and branch performance — bringing structure, accuracy, and efficiency to restaurant operations.",
        },
      ],
      numberedLists: [
        {
          title: "Features",
          items: [
            "Smooth ordering system for front-of-house staff",
            "Backend for menus, tables, and transactions",
            "User and branch performance management",
            "Multi-branch visibility for admins",
          ],
        },
        {
          title: "Goals",
          items: [
            "Reduce order errors and speed up service",
            "Give admins full visibility into branch performance",
            "Support multi-branch restaurant operations",
            "Bring structure to daily restaurant workflows",
          ],
        },
      ],
      breakImages: ["/work/qrafter-1.png", "/work/qrafter-3.png"],
    },
  },
];

const { rows: existing } = await sql`SELECT COALESCE(MAX(sort_order), -1) AS max_order FROM work_projects`;
let sortOrder = existing[0].max_order + 1;

for (const p of projects) {
  await sql`
    INSERT INTO work_projects (slug, title, description, cover_image, showcase_images, tags, badge, sort_order)
    VALUES (
      ${p.slug}, ${p.title}, ${p.description}, ${p.coverImage},
      ${p.showcaseImages}, ${p.tags}, ${p.badge}, ${sortOrder}
    )
    ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title,
      description = EXCLUDED.description,
      cover_image = EXCLUDED.cover_image,
      showcase_images = EXCLUDED.showcase_images,
      tags = EXCLUDED.tags,
      badge = EXCLUDED.badge;
  `;
  console.log("Seeded project:", p.slug);
  sortOrder++;

  const d = p.detail;
  await sql`
    INSERT INTO work_project_details (slug, headline, sections, numbered_lists, break_images)
    VALUES (
      ${p.slug}, ${d.headline}, ${JSON.stringify(d.sections)}::jsonb,
      ${JSON.stringify(d.numberedLists)}::jsonb, ${d.breakImages}
    )
    ON CONFLICT (slug) DO UPDATE SET
      headline = EXCLUDED.headline,
      sections = EXCLUDED.sections,
      numbered_lists = EXCLUDED.numbered_lists,
      break_images = EXCLUDED.break_images;
  `;
  console.log("Seeded v1 detail:", p.slug);

  if (p.v2) {
    const v2 = p.v2;
    await sql`
      INSERT INTO work_project_details_v2 (
        slug, title, description, curved_image, testimonial_image, testimonial,
        skills, rich_text, full_width_image, split_images
      ) VALUES (
        ${p.slug}, ${v2.title}, ${v2.description}, ${JSON.stringify(v2.curvedImage)}::jsonb,
        ${JSON.stringify(v2.testimonialImage)}::jsonb, ${JSON.stringify(v2.testimonial)}::jsonb,
        ${v2.skills}, ${v2.richText}, ${JSON.stringify(v2.fullWidthImage)}::jsonb, ${JSON.stringify(v2.splitImages)}::jsonb
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
    console.log("Seeded v2 detail:", p.slug);
  }
}

console.log(`Done — ${projects.length} projects migrated.`);
process.exit(0);
