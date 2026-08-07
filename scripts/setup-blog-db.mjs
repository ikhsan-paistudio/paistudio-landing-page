// One-off setup script: creates the blog_posts table (idempotent) and
// seeds it with the same 5 posts previously hardcoded in
// src/lib/data/blog-posts.ts / blog-post-details.ts. Run with:
//   node scripts/setup-blog-db.mjs
// Reads POSTGRES_URL from .env.local (gitignored, not committed).

process.loadEnvFile(new URL("../.env.local", import.meta.url));

const { sql } = await import("@vercel/postgres");

await sql`
  CREATE TABLE IF NOT EXISTS blog_posts (
    slug TEXT PRIMARY KEY,
    tag TEXT NOT NULL,
    tags TEXT[] NOT NULL,
    published_at DATE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    hero_image TEXT NOT NULL,
    author_name TEXT NOT NULL,
    author_role TEXT NOT NULL,
    author_hue INTEGER NOT NULL,
    read_time TEXT NOT NULL,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    toc JSONB NOT NULL,
    body JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );
`;
console.log("Table ready.");

const posts = [
  {
    slug: "shipping-mvps-in-two-weeks",
    tag: "Product Strategy",
    tags: ["Product Strategy", "Founder Playbook"],
    publishedAt: "2026-07-28",
    title: "How we scope an MVP tight enough to ship in two weeks",
    description:
      "Most MVPs don't fail because of bad execution — they fail because the scope was never actually an MVP. Here's the scoping framework we run with every founder before a single screen gets designed.",
    coverImage: "/blog/blog-cover-shipping-mvps-in-two-weeks.jpg",
    heroImage: "/blog/blog-hero-shipping-mvps-in-two-weeks.jpg",
    authorName: "Marcus Okafor",
    authorRole: "Founder & Product Lead",
    authorHue: 0,
    readTime: "6 min read",
    isFeatured: true,
    toc: [
      { id: "the-real-failure-mode", label: "The real failure mode" },
      { id: "the-scoping-pass", label: "The scoping pass" },
      { id: "what-we-cut-first", label: "What we cut first" },
      { id: "shipping-the-first-version", label: "Shipping the first version" },
    ],
    body: [
      { type: "heading", id: "the-real-failure-mode", text: "The real failure mode" },
      {
        type: "paragraph",
        text: "Most MVPs don't fail because of bad execution — they fail because the scope was never actually an MVP. By the time development starts, \"minimum\" has quietly grown to include a dashboard, three user roles, and a settings page nobody asked for.",
      },
      {
        type: "paragraph",
        text: "We run every founder through the same scoping pass before a single screen gets designed. It's blunt on purpose: the goal is to find the smallest version of the product that still proves the core hypothesis, not the smallest version of the product you can imagine shipping.",
      },
      { type: "image", src: "/blog/blog-body-shipping-mvps-in-two-weeks.jpg", alt: "Team mapping out a product roadmap on sticky notes" },
      { type: "heading", id: "the-scoping-pass", text: "The scoping pass" },
      {
        type: "paragraph",
        text: "We start by writing down the one user action that has to work end to end for the product to mean anything. Everything else gets sorted into three buckets: launch-blocking, nice-to-have, and \"this is actually a v2 feature wearing a v1 costume.\"",
      },
      {
        type: "list",
        items: [
          "Name the single core flow the MVP has to prove",
          "Cut every role, permission, and setting that flow doesn't require",
          "Default to one hardcoded path instead of a configurable one",
          "Ship the ugly version of anything that isn't the core flow",
        ],
      },
      { type: "heading", id: "what-we-cut-first", text: "What we cut first" },
      {
        type: "paragraph",
        text: "Admin dashboards, multi-role permissions, and \"just in case\" settings pages are almost always the first cuts. They feel necessary because they're familiar from mature products — but a two-week MVP isn't a mature product, it's a bet.",
      },
      { type: "video" },
      { type: "heading", id: "shipping-the-first-version", text: "Shipping the first version" },
      {
        type: "paragraph",
        text: "Once the scope is this tight, design and development can run in parallel instead of in sequence — which is the actual mechanism that gets a founder from kickoff to a live product in two weeks, not just tighter deadlines on the same amount of work.",
      },
    ],
  },
  {
    slug: "no-code-vs-custom-code",
    tag: "No-Code & AI",
    tags: ["No-Code & AI", "Engineering"],
    publishedAt: "2026-07-21",
    title: "No-code vs. custom code: the real tradeoffs founders don't hear about",
    description:
      "Bubble, Airtable, and n8n can take you further than most agencies admit. Here's how we decide what stays no-code and what needs a custom build.",
    coverImage: "/blog/blog-cover-no-code-vs-custom-code.jpg",
    heroImage: "/blog/blog-hero-no-code-vs-custom-code.jpg",
    authorName: "Priya Raman",
    authorRole: "Product Designer",
    authorHue: 1,
    readTime: "5 min read",
    isFeatured: false,
    toc: [
      { id: "where-no-code-wins", label: "Where no-code wins" },
      { id: "where-it-breaks-down", label: "Where it breaks down" },
      { id: "how-we-decide", label: "How we decide" },
    ],
    body: [
      { type: "heading", id: "where-no-code-wins", text: "Where no-code wins" },
      {
        type: "paragraph",
        text: "Bubble, Airtable, and n8n can take a product further than most agencies admit. For CRUD-heavy internal tools, admin panels, and workflow automation, hand-writing that scaffolding is often just slower — not more capable.",
      },
      {
        type: "list",
        items: [
          "Internal tools and admin panels with standard data models",
          "Workflow automation gluing together existing SaaS tools",
          "Early-stage products validating demand before scale matters",
        ],
      },
      { type: "image", src: "/blog/blog-body-no-code-vs-custom-code.jpg", alt: "Working on a laptop in a coffee shop" },
      { type: "heading", id: "where-it-breaks-down", text: "Where it breaks down" },
      {
        type: "paragraph",
        text: "The tradeoffs show up around custom real-time interactions, non-standard billing logic, and anything that needs to scale past a few hundred thousand records with tight latency requirements. That's when a no-code platform starts fighting you instead of helping you.",
      },
      { type: "heading", id: "how-we-decide", text: "How we decide" },
      {
        type: "paragraph",
        text: "We default to no-code for anything that isn't the product's core differentiator, and hand-code the one or two flows that actually need to be fast, custom, or hard to replicate. Most products only have one or two of those — the rest is plumbing.",
      },
    ],
  },
  {
    slug: "vela-analytics-case-study",
    tag: "Case Studies",
    tags: ["Case Studies", "SaaS"],
    publishedAt: "2026-07-12",
    title: "Inside Vela: building a billing-aware dashboard in one sprint cycle",
    description:
      "A look at how we untangled usage data, Stripe billing, and account roles into a single customer-facing view for a subscription SaaS.",
    coverImage: "/blog/blog-cover-vela-analytics-case-study.jpg",
    heroImage: "/blog/blog-hero-vela-analytics-case-study.jpg",
    authorName: "Sittiporn Charoensrichai",
    authorRole: "Engineering Lead",
    authorHue: 2,
    readTime: "8 min read",
    isFeatured: false,
    toc: [
      { id: "the-starting-point", label: "The starting point" },
      { id: "untangling-three-sources", label: "Untangling three sources" },
      { id: "what-shipped", label: "What shipped" },
    ],
    body: [
      { type: "heading", id: "the-starting-point", text: "The starting point" },
      {
        type: "paragraph",
        text: "Vela's founders were running a multi-tier SaaS business off exported CSVs and gut feel. Every pricing decision took a week of manual reconciliation before anyone could act on it — usage data lived in the app, billing lived in Stripe, and support data lived in a spreadsheet nobody fully trusted.",
      },
      { type: "image", src: "/blog/blog-body-vela-analytics-case-study.jpg", alt: "Analytics dashboard open on a laptop" },
      { type: "heading", id: "untangling-three-sources", text: "Untangling three sources" },
      {
        type: "paragraph",
        text: "We built a unified analytics layer that syncs usage events, Stripe billing, and account roles into a single customer-facing dashboard, with role-based views for admins, billing owners, and end users.",
      },
      {
        type: "list",
        items: [
          "One sync pipeline instead of three disconnected data sources",
          "Role-based views so each user sees only what's relevant to them",
          "Billing state and usage data reconciled automatically, not manually",
        ],
      },
      { type: "video" },
      { type: "heading", id: "what-shipped", text: "What shipped" },
      {
        type: "paragraph",
        text: "Vela's team now ships pricing changes the same day they're proposed. Customer-facing usage data cut support tickets about billing discrepancies by more than half.",
      },
    ],
  },
  {
    slug: "hiring-a-fractional-product-team",
    tag: "Founder Stories",
    tags: ["Founder Stories", "Team"],
    publishedAt: "2026-07-03",
    title: "Why founders are choosing fractional product teams over agencies",
    description:
      "No middlemen, no 20-page proposals. What actually changes when the person you brief is the person building.",
    coverImage: "/blog/blog-cover-hiring-a-fractional-product-team.jpg",
    heroImage: "/blog/blog-hero-hiring-a-fractional-product-team.jpg",
    authorName: "Marcus Okafor",
    authorRole: "Founder & Product Lead",
    authorHue: 0,
    readTime: "4 min read",
    isFeatured: false,
    toc: [
      { id: "the-agency-tax", label: "The agency tax" },
      { id: "no-middlemen", label: "No middlemen" },
      { id: "what-actually-changes", label: "What actually changes" },
    ],
    body: [
      { type: "heading", id: "the-agency-tax", text: "The agency tax" },
      {
        type: "paragraph",
        text: "Traditional agencies price in account managers, discovery workshops, and a 20-page proposal before anything gets built. Founders end up paying for process, not product — and waiting weeks to find out what they're actually getting.",
      },
      { type: "heading", id: "no-middlemen", text: "No middlemen" },
      {
        type: "paragraph",
        text: "A fractional product team collapses that chain. The person you brief in the kickoff call is the person writing the code and making the design calls — no handoffs, no telephone game between you and the builders.",
      },
      { type: "image", src: "/blog/blog-body-hiring-a-fractional-product-team.jpg", alt: "Founders talking overlooking the city skyline" },
      {
        type: "list",
        items: [
          "Faster decisions — no account manager relaying feedback",
          "Fewer surprises — you see the work as it's built, not at a big reveal",
          "Lower overhead — no agency markup on top of the actual build cost",
        ],
      },
      { type: "heading", id: "what-actually-changes", text: "What actually changes" },
      {
        type: "paragraph",
        text: "Founders who've worked both ways describe the difference less as \"faster\" and more as \"less exhausting\" — fewer status calls, fewer re-explanations, more actual building.",
      },
    ],
  },
  {
    slug: "ai-copilots-support-teams",
    tag: "No-Code & AI",
    tags: ["No-Code & AI", "Case Studies"],
    publishedAt: "2026-06-24",
    title: "Where AI copilots actually save support teams time (and where they don't)",
    description:
      "We shipped an AI triage agent for a support team drowning in tickets. Here's what worked, what didn't, and what we'd do differently.",
    coverImage: "/blog/blog-cover-ai-copilots-support-teams.jpg",
    heroImage: "/blog/blog-hero-ai-copilots-support-teams.jpg",
    authorName: "Priya Raman",
    authorRole: "Product Designer",
    authorHue: 1,
    readTime: "7 min read",
    isFeatured: false,
    toc: [
      { id: "the-ticket-backlog", label: "The ticket backlog" },
      { id: "what-worked", label: "What worked" },
      { id: "what-didnt", label: "What didn't" },
    ],
    body: [
      { type: "heading", id: "the-ticket-backlog", text: "The ticket backlog" },
      {
        type: "paragraph",
        text: "We shipped an AI triage agent for a support team drowning in tickets — routing, drafting first-pass responses, and flagging anything that needed a human before it ever reached one.",
      },
      { type: "heading", id: "what-worked", text: "What worked" },
      {
        type: "paragraph",
        text: "Triage and drafting were the clear wins. The agent read incoming tickets, tagged urgency and category correctly most of the time, and drafted responses good enough that agents were editing, not writing from scratch.",
      },
      { type: "image", src: "/blog/blog-body-ai-copilots-support-teams.jpg", alt: "Working through support tickets at a desk" },
      {
        type: "list",
        items: [
          "Ticket routing and urgency tagging, largely hands-off",
          "First-draft responses for common, well-documented issues",
          "Flagging edge cases for a human before they went out",
        ],
      },
      { type: "heading", id: "what-didnt", text: "What didn't" },
      {
        type: "paragraph",
        text: "Fully autonomous replies were a mistake early on — the agent was confident even when wrong, and confident-wrong answers erode trust faster than a slow human response. Human-in-the-loop for anything account- or billing-related turned out to be non-negotiable.",
      },
      { type: "video" },
    ],
  },
];

for (const p of posts) {
  await sql`
    INSERT INTO blog_posts (
      slug, tag, tags, published_at, title, description, cover_image, hero_image,
      author_name, author_role, author_hue, read_time, is_featured, toc, body
    ) VALUES (
      ${p.slug}, ${p.tag}, ${p.tags}, ${p.publishedAt}, ${p.title}, ${p.description},
      ${p.coverImage}, ${p.heroImage}, ${p.authorName}, ${p.authorRole}, ${p.authorHue},
      ${p.readTime}, ${p.isFeatured}, ${JSON.stringify(p.toc)}::jsonb, ${JSON.stringify(p.body)}::jsonb
    )
    ON CONFLICT (slug) DO UPDATE SET
      tag = EXCLUDED.tag,
      tags = EXCLUDED.tags,
      published_at = EXCLUDED.published_at,
      title = EXCLUDED.title,
      description = EXCLUDED.description,
      cover_image = EXCLUDED.cover_image,
      hero_image = EXCLUDED.hero_image,
      author_name = EXCLUDED.author_name,
      author_role = EXCLUDED.author_role,
      author_hue = EXCLUDED.author_hue,
      read_time = EXCLUDED.read_time,
      is_featured = EXCLUDED.is_featured,
      toc = EXCLUDED.toc,
      body = EXCLUDED.body;
  `;
  console.log("Seeded:", p.slug);
}

console.log(`Done — ${posts.length} posts seeded.`);
process.exit(0);
