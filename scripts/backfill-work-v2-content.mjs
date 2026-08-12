// Backfills work_project_details_v2 for the 12 real projects that didn't
// have one — needed once the "v2" template became the primary
// /work/[slug] route (see src/app/work/[slug]/page.tsx's doc comment).
// Every field below is reused directly from each project's own real v1
// content (scripts/migrate-hellorecruiters-project.mjs /
// migrate-2026-work-projects-batch.mjs) — richText paragraphs are the
// same section bodies already written there, just merged from 4 sections
// down to 2 paragraphs; images are the same real screenshots already
// downloaded, just reassigned across this template's fields (curvedImage/
// testimonialImage/fullWidthImage/splitImages). No `testimonial` for any
// of these — none of these 12 have a real client quote on file, and
// ProjectDetailV2.testimonial is optional specifically so this isn't
// necessary (TestimonialSkillsSection renders without the quote block).
// Run with:
//   node scripts/backfill-work-v2-content.mjs

process.loadEnvFile(new URL("../.env.local", import.meta.url));

const { sql } = await import("@vercel/postgres");

const entries = [
  {
    slug: "hellorecruiters",
    title: "HelloRecruiters",
    description:
      "A web-based platform connecting job seekers directly with specialized recruiters in their field — skipping job boards and middlemen.",
    curvedImage: { src: "/work/hellorecruiters-cover.png", alt: "HelloRecruiters platform overview" },
    testimonialImage: { src: "/work/hellorecruiters-2.png", alt: "HelloRecruiters plan selection view" },
    skills: ["Website", "Dashboard", "Bubble.io"],
    richText: [
      "Job seekers looking for tech roles had no direct way to reach the recruiters actually hiring for their specific job function and industry — every application went through job boards and middlemen instead of a real inbox.",
      "Built on Bubble.io, HelloRecruiters lets users filter their job preferences and instantly generate a tailored list of matching recruiters. With one payment, users send their profile to every relevant recruiter via email, then get an automatic 7-day follow-up and a discount code to retry if there's no response.",
    ],
    fullWidthImage: { src: "/work/hellorecruiters-1.png", alt: "HelloRecruiters recruiter matches view" },
    splitImages: [
      { src: "/work/hellorecruiters-3.png", alt: "HelloRecruiters plan selection detail" },
      { src: "/work/hellorecruiters-cover.png", alt: "HelloRecruiters platform overview" },
    ],
  },
  {
    slug: "teliti",
    title: "Teliti",
    description: "An AI-driven platform helping Indonesian SMEs develop structured, actionable business strategies.",
    curvedImage: { src: "/work/teliti-cover.png", alt: "Teliti platform overview" },
    testimonialImage: { src: "/work/teliti-2.png", alt: "Teliti dashboard view" },
    skills: ["Website", "Utility", "Bubble.io"],
    richText: [
      "Most Indonesian SMEs had no access to affordable, structured business strategy guidance — planning was ad hoc, and professional consulting was often out of reach.",
      "Developed using Bubble.io, Teliti transforms user input into personalized strategic recommendations through two core services — Teliti Binastrategi, a quarterly subscription for ongoing strategy planning, and Teliti Bisnisku, a one-time service for a full business plan and feasibility study, all reviewed through a responsive dashboard.",
    ],
    fullWidthImage: { src: "/work/teliti-1.png", alt: "Teliti strategy dashboard detail" },
    splitImages: [
      { src: "/work/teliti-3.png", alt: "Teliti progress tracking view" },
      { src: "/work/teliti-cover.png", alt: "Teliti platform overview" },
    ],
  },
  {
    slug: "quantumtemple",
    title: "QuantumTemple",
    description: "A platform connecting travelers with living cultural heritage through curated, bookable experiences.",
    curvedImage: { src: "/work/quantumtemple-cover.png", alt: "QuantumTemple platform overview" },
    testimonialImage: { src: "/work/quantumtemple-2.png", alt: "QuantumTemple booking dashboard" },
    skills: ["Website", "CRM", "Bubble.io"],
    richText: [
      "Travelers interested in authentic cultural heritage experiences had no single place to discover and book them directly with concierge partners, and partners had no unified way to manage bookings and payments.",
      "We created a seamless, user-friendly application for both desktop and mobile, designed for users and concierge services, including an easy-to-manage dashboard and CRM — concierge partners can book experiences and take payments directly through the platform, with all booking history automatically stored.",
    ],
    fullWidthImage: { src: "/work/quantumtemple-1.png", alt: "QuantumTemple experience booking detail" },
    splitImages: [
      { src: "/work/quantumtemple-3.png", alt: "QuantumTemple CRM detail view" },
      { src: "/work/quantumtemple-cover.png", alt: "QuantumTemple platform overview" },
    ],
  },
  {
    slug: "ez-research-solutions",
    title: "EZ Research Solutions",
    description: "An AI-powered platform for healthcare study design and compliance, built on Bubble.io.",
    curvedImage: { src: "/work/ez-research-solutions-cover.webp", alt: "EZ Research Solutions platform overview" },
    testimonialImage: { src: "/work/ez-research-solutions-cover.webp", alt: "EZ Research Solutions platform overview" },
    skills: ["Website", "AI", "Bubble.io"],
    richText: [
      "Healthcare study design involves strict compliance requirements and structured processes that are easy to get wrong without the right tooling — without a dedicated platform, teams are left managing it through disconnected documents and manual processes.",
      "We built EZ Research Solutions as an AI product on Bubble.io, focused on streamlining healthcare study design and compliance for a US-based team — a purpose-built, production-ready tool that gives research teams a structured way to design studies and stay compliant.",
    ],
    fullWidthImage: { src: "/work/ez-research-solutions-cover.webp", alt: "EZ Research Solutions platform overview" },
    splitImages: [
      { src: "/work/ez-research-solutions-cover.webp", alt: "EZ Research Solutions platform overview" },
      { src: "/work/ez-research-solutions-cover.webp", alt: "EZ Research Solutions platform overview" },
    ],
  },
  {
    slug: "discovery-property",
    title: "Discovery Property",
    description: "An operational dashboard helping real estate agents manage listings, transactions, and reports.",
    curvedImage: { src: "/work/discovery-property-cover.png", alt: "Discovery Property dashboard overview" },
    testimonialImage: { src: "/work/discovery-property-2.png", alt: "Discovery Property transaction tracking view" },
    skills: ["Website", "Dashboard", "Bubble.io"],
    richText: [
      "DiscoveryProperty.id's agent team was managing property listings, client transactions, and performance reporting without a single, centralized system — with no easy way to track deals or see how operations were performing at a glance.",
      "We developed an internal operational dashboard using Bubble for the agent team, letting agents efficiently manage property listings, track transactions, and generate reports — all in one place, with better visibility and control to scale the business.",
    ],
    fullWidthImage: { src: "/work/discovery-property-1.png", alt: "Discovery Property listing management detail" },
    splitImages: [
      { src: "/work/discovery-property-3.png", alt: "Discovery Property reporting detail" },
      { src: "/work/discovery-property-cover.png", alt: "Discovery Property dashboard overview" },
    ],
  },
  {
    slug: "vodio",
    title: "Vodio",
    description: "A mobile app for on-demand consulting with custom call duration, pricing, and video support.",
    curvedImage: { src: "/work/vodio-cover.jpg", alt: "Vodio app overview" },
    testimonialImage: { src: "/work/vodio-cover.jpg", alt: "Vodio app overview" },
    skills: ["Mobile App", "Utility", "Bubble.io"],
    richText: [
      "Consultants offering on-demand advice needed a way to set their own call duration and pricing, not a one-size-fits-all booking flow — most booking tools assume a fixed session length and price.",
      "We built Vodio as a mobile app on Bubble.io, giving consultants control over call duration, pricing, and video support for on-demand sessions — a production-ready app tailored to how on-demand consultants actually want to work.",
    ],
    fullWidthImage: { src: "/work/vodio-cover.jpg", alt: "Vodio app overview" },
    splitImages: [
      { src: "/work/vodio-cover.jpg", alt: "Vodio app overview" },
      { src: "/work/vodio-cover.jpg", alt: "Vodio app overview" },
    ],
  },
  {
    slug: "poteq",
    title: "Poteq",
    description: "An online plant community with Q&A and e-commerce for plant sales.",
    curvedImage: { src: "/work/poteq-cover.jpg", alt: "Poteq app overview" },
    testimonialImage: { src: "/work/poteq-cover.jpg", alt: "Poteq app overview" },
    skills: ["Mobile App", "Utility", "Bubble.io"],
    richText: [
      "People looking for plant advice and plant sellers were split across separate forums and marketplaces, with no single place combining both — plant enthusiasts wanting advice before buying had to leave a community space entirely to find somewhere to purchase.",
      "We built Poteq as a mobile app on Bubble.io combining a plant Q&A community with e-commerce for plant sales in a single experience — plant lovers can ask questions and buy plants without switching between separate platforms.",
    ],
    fullWidthImage: { src: "/work/poteq-cover.jpg", alt: "Poteq app overview" },
    splitImages: [
      { src: "/work/poteq-cover.jpg", alt: "Poteq app overview" },
      { src: "/work/poteq-cover.jpg", alt: "Poteq app overview" },
    ],
  },
  {
    slug: "aedigo",
    title: "AEdigo",
    description:
      "A strategic website redesign helping AEdigo strengthen credibility and streamline hiring for construction professionals.",
    curvedImage: { src: "/work/aedigo-cover.png", alt: "AEdigo website overview" },
    testimonialImage: { src: "/work/aedigo-2.png", alt: "AEdigo hiring journey detail" },
    skills: ["Website", "Dashboard", "Framer"],
    richText: [
      "AEdigo needed clearer positioning and a stronger online presence to communicate its value as a curated marketplace for construction professionals — the existing website lacked structure and didn't effectively guide visitors toward taking action.",
      "We repositioned AEdigo through a strategic website redesign focused on clarity, trust, and conversion — refining the messaging, restructuring the content hierarchy, and simplifying the hiring journey into a clear, credible gateway for companies seeking vetted construction talent.",
    ],
    fullWidthImage: { src: "/work/aedigo-1.png", alt: "AEdigo messaging detail" },
    splitImages: [
      { src: "/work/aedigo-3.png", alt: "AEdigo content structure detail" },
      { src: "/work/aedigo-cover.png", alt: "AEdigo website overview" },
    ],
  },
  {
    slug: "replyrabbit",
    title: "ReplyRabbit",
    description: "An AI-powered CRM for order tracking, shipping updates, and return inquiries.",
    curvedImage: { src: "/work/replyrabbit-cover.jpg", alt: "ReplyRabbit app overview" },
    testimonialImage: { src: "/work/replyrabbit-cover.jpg", alt: "ReplyRabbit app overview" },
    skills: ["Mobile App", "CRM", "Bubble.io"],
    richText: [
      "Ecommerce teams handling order tracking, shipping updates, and return inquiries needed a way to manage all of it without switching between tools — most CRMs aren't built around that specific pattern of daily support work.",
      "We built ReplyRabbit as a mobile app on Bubble.io, using AI to help teams handle order tracking, shipping updates, and return inquiries in one CRM — a dedicated, production-ready workflow instead of a patchwork of tools.",
    ],
    fullWidthImage: { src: "/work/replyrabbit-cover.jpg", alt: "ReplyRabbit app overview" },
    splitImages: [
      { src: "/work/replyrabbit-cover.jpg", alt: "ReplyRabbit app overview" },
      { src: "/work/replyrabbit-cover.jpg", alt: "ReplyRabbit app overview" },
    ],
  },
  {
    slug: "ozanimart",
    title: "Ozanimart",
    description:
      "A website redesign for Ozanimart, a wholesale distributor of games and collectables across Australia and New Zealand.",
    curvedImage: { src: "/work/ozanimart-cover.png", alt: "Ozanimart website overview" },
    testimonialImage: { src: "/work/ozanimart-2.png", alt: "Ozanimart product category detail" },
    skills: ["Website", "Utility", "Framer"],
    richText: [
      "Ozanimart, a wholesale distributor of games, blind boxes, trading card games, and collectables across Australia and New Zealand, needed a website that matched its position as a leading distributor — the site needed clearer B2B messaging and a better path for retailers to apply for partnership.",
      "The redesign clarified B2B messaging, highlighted global brand partnerships, showcased fast-selling product categories, and improved the conversion flow toward retail partnership applications — strengthening brand credibility and streamlining the path for retailers to become partners.",
    ],
    fullWidthImage: { src: "/work/ozanimart-1.png", alt: "Ozanimart brand partnerships detail" },
    splitImages: [
      { src: "/work/ozanimart-3.png", alt: "Ozanimart partnership application detail" },
      { src: "/work/ozanimart-cover.png", alt: "Ozanimart website overview" },
    ],
  },
  {
    slug: "lawyerdrive",
    title: "Lawyerdrive",
    description: "A secure platform helping legal teams organize documents, manage cases, schedule meetings, and collaborate.",
    curvedImage: { src: "/work/lawyerdrive-cover.png", alt: "Lawyerdrive dashboard overview" },
    testimonialImage: { src: "/work/lawyerdrive-2.png", alt: "Lawyerdrive case management detail" },
    skills: ["Mobile App", "Utility", "Bubble.io"],
    richText: [
      "Lawyerdrive was created to support law firms in managing their daily workload with better structure and clarity, centralizing case files, client documents, communication logs, deadlines, and meeting schedules — with role-based access so each team member sees only what they need.",
      "We developed Lawyerdrive as a secure, organized, and scalable SaaS platform tailored to the workflow of modern law practices, letting lawyers and staff file documents, update case details, and plan meetings without friction, while admins get full control over roles, permissions, and data visibility.",
    ],
    fullWidthImage: { src: "/work/lawyerdrive-1.png", alt: "Lawyerdrive document management detail" },
    splitImages: [
      { src: "/work/lawyerdrive-3.png", alt: "Lawyerdrive meeting scheduling detail" },
      { src: "/work/lawyerdrive-cover.png", alt: "Lawyerdrive dashboard overview" },
    ],
  },
  {
    slug: "qrafter",
    title: "Qrafter",
    description: "An all-in-one platform helping restaurants manage orders, tables, menus, and daily operations.",
    curvedImage: { src: "/work/qrafter-cover.png", alt: "Qrafter platform overview" },
    testimonialImage: { src: "/work/qrafter-2.png", alt: "Qrafter branch management detail" },
    skills: ["Website", "Dashboard", "Bubble.io"],
    richText: [
      "Restaurants needed a fast, error-reducing ordering experience for staff, alongside a powerful backend for admins to manage menus, transactions, and branch performance — front-of-house speed and admin visibility rarely come together in one platform.",
      "We designed Qrafter as a scalable SaaS platform with a clean, fast, and intuitive experience for both front-of-house teams and admins — staff get a smooth ordering system that reduces errors, while admins get a powerful backend for menus, tables, transactions, users, and branch performance.",
    ],
    fullWidthImage: { src: "/work/qrafter-1.png", alt: "Qrafter ordering system detail" },
    splitImages: [
      { src: "/work/qrafter-3.png", alt: "Qrafter branch performance detail" },
      { src: "/work/qrafter-cover.png", alt: "Qrafter platform overview" },
    ],
  },
];

for (const e of entries) {
  await sql`
    INSERT INTO work_project_details_v2 (
      slug, title, description, curved_image, testimonial_image,
      skills, rich_text, full_width_image, split_images
    ) VALUES (
      ${e.slug}, ${e.title}, ${e.description}, ${JSON.stringify(e.curvedImage)}::jsonb,
      ${JSON.stringify(e.testimonialImage)}::jsonb,
      ${e.skills}, ${e.richText}, ${JSON.stringify(e.fullWidthImage)}::jsonb, ${JSON.stringify(e.splitImages)}::jsonb
    )
    ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title,
      description = EXCLUDED.description,
      curved_image = EXCLUDED.curved_image,
      testimonial_image = EXCLUDED.testimonial_image,
      skills = EXCLUDED.skills,
      rich_text = EXCLUDED.rich_text,
      full_width_image = EXCLUDED.full_width_image,
      split_images = EXCLUDED.split_images;
  `;
  console.log("Backfilled v2 detail:", e.slug);
}

console.log(`Done — ${entries.length} v2 rows backfilled (no testimonial column touched — stays NULL for these).`);
process.exit(0);
