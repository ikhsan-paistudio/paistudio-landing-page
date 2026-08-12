// One-off migration: pulls the real, published post at
// https://paistudio.co/blog/how-much-does-it-really-cost-to-build-an-app-with-bubble-in-2025
// (the actual production Paistudio site — a separate Framer-hosted site,
// not this Next.js app) into the blog_posts table. Content is extracted
// verbatim from that page's own HTML. The source's 3 real pricing/cost
// tables (Subscription Plans, WU Bundles, Storage/Third-Party costs, etc.)
// are reformatted into flat list items ("Row — Col: val · Col: val"),
// since this schema's body (ArticleBlock union) has no table block type —
// every figure preserved, just restructured, same convention as the
// top-3-bubble-agency migration's TL;DR table.
//
// Author "Devva Maulana" (Bubble Developer) is a third distinct real
// person from this site's other migrated posts, so gets author_hue 1
// (Orleans Bowie has 0, Muhammad Ikhsan Nur/N. has 2).
//
// Run with: node scripts/migrate-how-much-does-it-really-cost-to-build-an-app-with-bubble-in-2025-post.mjs
// Reads POSTGRES_URL from .env.local (gitignored, not committed).

process.loadEnvFile(new URL("../.env.local", import.meta.url));

const { sql } = await import("@vercel/postgres");

const toc = [
  {
    "id": "1-what-bubble-actually-charges-you-for",
    "label": "1. What Bubble Actually Charges You For"
  },
  {
    "id": "2-why-founders-are-choosing-bubble",
    "label": "2. Why Founders Are Choosing Bubble"
  },
  {
    "id": "3-key-cost-challenges",
    "label": "3. Key Cost Challenges"
  },
  {
    "id": "4-indonesia-market-advantage-why-bubble-is-perfect-for-local-founders",
    "label": "4. Indonesia Market Advantage: Why Bubble Is Perfect for Local Founders"
  },
  {
    "id": "6-final-thoughts",
    "label": "6. Final Thoughts"
  }
];

const body = [
  {
    "type": "paragraph",
    "text": "In this guide, we show you what Bubble actually costs in 2025, what founders often underestimate, and how to optimize your budget so you can ship smarter not spend harder."
  },
  {
    "type": "heading",
    "id": "1-what-bubble-actually-charges-you-for",
    "text": "1. What Bubble Actually Charges You For"
  },
  {
    "type": "paragraph",
    "text": "Bubble’s pricing today is built around three main components:"
  },
  {
    "type": "heading",
    "id": "1-subscription-plan",
    "text": "1. Subscription Plan"
  },
  {
    "type": "paragraph",
    "text": "Bubble’s core plans range from Starter to Enterprise. For most founders, you’ll start here:"
  },
  {
    "type": "list",
    "items": [
      "Starter — Annual Price: US$29/mo · Monthly Price: US$32/mo · Ideal For: Early MVPs, prototypes",
      "Growth — Annual Price: US$119/mo · Monthly Price: US$134/mo · Ideal For: Real users, traction stage",
      "Team — Annual Price: US$349/mo · Monthly Price: US$399/mo · Ideal For: Multi-editor team, scaling",
      "Enterprise — Annual Price: Custom · Monthly Price: Custom · Ideal For: Compliance + dedicated infra"
    ]
  },
  {
    "type": "heading",
    "id": "2-workload-units-wu",
    "text": "2. Workload Units (WU)"
  },
  {
    "type": "paragraph",
    "text": "Bubble includes a WU quota in every plan, but once you exceed it, you start paying for additional bundles. As of 2025, community reports and Bubble documentation show these common add-on bundles:"
  },
  {
    "type": "list",
    "items": [
      "Small Bundle — Price (USD / month): $89/mo · Included WU: 750,000 WU · Cost per 100k WU: ~$11.8 per 100k",
      "Large Bundle — Price (USD / month): $269/mo · Included WU: 2,500,000 WU · Cost per 100k WU: ~$10.7 per 100k",
      "Enterprise Packs — Price (USD / month): Custom · Included WU: High-volume · Cost per 100k WU:"
    ]
  },
  {
    "type": "heading",
    "id": "example-calculation-for-founders",
    "text": "Example Calculation for Founders"
  },
  {
    "type": "paragraph",
    "text": "Let’s say your MVP is using:"
  },
  {
    "type": "list",
    "items": [
      "2,000 WU / user / month",
      "You have 300 monthly active users"
    ]
  },
  {
    "type": "paragraph",
    "text": "Your total monthly consumption:"
  },
  {
    "type": "paragraph",
    "text": "2,000 × 300 = 600,000 WU"
  },
  {
    "type": "paragraph",
    "text": "You’re still inside Growth/Team base quota."
  },
  {
    "type": "paragraph",
    "text": "But once you grow to 1,000 users, this becomes:"
  },
  {
    "type": "paragraph",
    "text": "2,000 × 1,000 = 2,000,000 WU"
  },
  {
    "type": "paragraph",
    "text": "Your base plan won’t cover this. You’ll need:"
  },
  {
    "type": "list",
    "items": [
      "1 × $89 WU Bundle → +750,000 WU",
      "Total WU = 1.75M → still short",
      "You must upgrade to the $269 bundle → +2.5M WU"
    ]
  },
  {
    "type": "paragraph",
    "text": "Now your WU cost becomes:"
  },
  {
    "type": "paragraph",
    "text": "➡️ $269/month just for compute"
  },
  {
    "type": "paragraph",
    "text": "This is why workload efficiency matters."
  },
  {
    "type": "paragraph",
    "text": "A single poorly optimized workflow can cost you more than the entire Bubble subscription."
  },
  {
    "type": "heading",
    "id": "3-add-on-costs",
    "text": "3. Add-On Costs"
  },
  {
    "type": "heading",
    "id": "a-extra-file-storage",
    "text": "a. Extra File Storage"
  },
  {
    "type": "paragraph",
    "text": "Bubble includes a base amount of file storage, but large apps (marketplaces, social apps, media uploads) will need more."
  },
  {
    "type": "paragraph",
    "text": "While Bubble doesn’t publicly publish per-GB pricing, the typical range based on usage reports is:"
  },
  {
    "type": "list",
    "items": [
      "+5 GB — Estimated Cost: ~$5–$10/month",
      "+20 GB — Estimated Cost: ~$20–$40/month",
      "+100 GB — Estimated Cost: ~$50–$100/month"
    ]
  },
  {
    "type": "paragraph",
    "text": "These are benchmarked against Bubble-managed S3 storage + community reports."
  },
  {
    "type": "paragraph",
    "text": "If your app handles:"
  },
  {
    "type": "list",
    "items": [
      "user-generated images",
      "invoices / PDFs",
      "video uploads (short clips)"
    ]
  },
  {
    "type": "paragraph",
    "text": "then you MUST budget for storage."
  },
  {
    "type": "heading",
    "id": "b-third-party-tools-apis-saas-integrations",
    "text": "b. Third-Party Tools (APIs & SaaS Integrations)"
  },
  {
    "type": "paragraph",
    "text": "Most real apps rely on external tools, and each adds cost. Typical founder stack:"
  },
  {
    "type": "list",
    "items": [
      "SendGrid / Mailers — Typical Price Range: $20–$80/mo",
      "Uploadcare / Filestack — Typical Price Range: $19–$99/mo",
      "Stripe — Typical Price Range: 2.9% + $0.30 / transaction",
      "Make.com / Zapier — Typical Price Range: $9–$29/mo",
      "Algolia search — Typical Price Range: $1–$50/mo for small scale"
    ]
  },
  {
    "type": "paragraph",
    "text": "An app with moderate automation often spends: ➡ $30–$120/month on third-party APIs."
  },
  {
    "type": "heading",
    "id": "c-mobile-app-build-ios-android",
    "text": "c. Mobile App Build (iOS & Android)"
  },
  {
    "type": "paragraph",
    "text": "Bubble now provides native iOS & Android app building inside the platform."
  },
  {
    "type": "list",
    "items": [
      "Mobile app add-on (Beta) — Price: Free if you already have a paid plan",
      "Official pricing (after beta) — Price: Estimated $29–$49/month add-on",
      "Extra mobile builds — Price: Included per plan (exact limits vary)"
    ]
  },
  {
    "type": "paragraph",
    "text": "Other things still required:"
  },
  {
    "type": "list",
    "items": [
      "Apple Developer Account — Price: $99/year",
      "Google Play Developer — Price: $25 one time",
      "Extra builds beyond monthly allotment — Price: $5–$10 per build (estimated)"
    ]
  },
  {
    "type": "heading",
    "id": "2-why-founders-are-choosing-bubble",
    "text": "2. Why Founders Are Choosing Bubble"
  },
  {
    "type": "paragraph",
    "text": "Bubble isn’t winning because it’s the cheapest tool."
  },
  {
    "type": "paragraph",
    "text": "Bubble is winning because it dramatically reduces financial risk."
  },
  {
    "type": "heading",
    "id": "because-the-old-model-doesnt-work-for-early-stage-teams",
    "text": "Because the old model doesn’t work for early-stage teams."
  },
  {
    "type": "paragraph",
    "text": "Traditional development forces founders to commit:"
  },
  {
    "type": "list",
    "items": [
      "US$50k–US$300k upfront build cost",
      "months of development",
      "high risk if the idea doesn’t hit market fit",
      "long iteration cycles"
    ]
  },
  {
    "type": "paragraph",
    "text": "According to multiple industry analyses, no-code platforms cut development cost by up to 65% and time-to-market by up to 80%."
  },
  {
    "type": "heading",
    "id": "bubble-lets-you-buy-learning-speed",
    "text": "Bubble lets you “buy learning speed.”"
  },
  {
    "type": "paragraph",
    "text": "You’re not just paying for an app — you’re paying for:"
  },
  {
    "type": "list",
    "items": [
      "faster experiments",
      "faster feedback cycles",
      "faster pivots",
      "faster investor conversations"
    ]
  },
  {
    "type": "paragraph",
    "text": "In early stage, speed = savings."
  },
  {
    "type": "paragraph",
    "text": "Speed = survival."
  },
  {
    "type": "paragraph",
    "text": "Speed = opportunity cost reclaimed."
  },
  {
    "type": "heading",
    "id": "founders-choose-bubble-because",
    "text": "Founders choose Bubble because:"
  },
  {
    "type": "list",
    "items": [
      "You pay hundreds, not hundreds of thousands.",
      "You launch in weeks, not quarters.",
      "You iterate without burning months of budget.",
      "You control your product — not an outsourced dev team.",
      "You can validate before raising capital or hiring engineering."
    ]
  },
  {
    "type": "paragraph",
    "text": "Bubble isn’t “cheap development.”"
  },
  {
    "type": "paragraph",
    "text": "Bubble is de-risked execution for early-stage founders."
  },
  {
    "type": "heading",
    "id": "3-key-cost-challenges",
    "text": "3. Key Cost Challenges"
  },
  {
    "type": "paragraph",
    "text": "Bubble is cost-efficient — but only if you treat it correctly."
  },
  {
    "type": "paragraph",
    "text": "Here are the three biggest cost traps founders fall into, and how to avoid them:"
  },
  {
    "type": "heading",
    "id": "challenge-1-wu-overages-because-of-inefficient-workflows",
    "text": "Challenge #1 — WU Overages Because of Inefficient Workflows"
  },
  {
    "type": "paragraph",
    "text": "Many founders unknowingly burn WU by:"
  },
  {
    "type": "list",
    "items": [
      "running unnecessary searches",
      "repeating the same workflow logic across pages",
      "creating heavy backend processes",
      "loading too much data at once"
    ]
  },
  {
    "type": "paragraph",
    "text": "How to mitigate:"
  },
  {
    "type": "list",
    "items": [
      "Structure your database early",
      "Use search constraints intentionally",
      "Cache results where possible",
      "Offload heavy operations",
      "Audit workflows every sprint"
    ]
  },
  {
    "type": "paragraph",
    "text": "Done right, you can reduce WU usage by 30–70%, saving significant monthly cost."
  },
  {
    "type": "heading",
    "id": "challenge-2-plugin-bloat",
    "text": "Challenge #2 — Plugin Bloat"
  },
  {
    "type": "paragraph",
    "text": "It’s tempting to install plugins for everything."
  },
  {
    "type": "paragraph",
    "text": "But each plugin adds:"
  },
  {
    "type": "list",
    "items": [
      "cost",
      "load time",
      "unpredictability"
    ]
  },
  {
    "type": "paragraph",
    "text": "Mitigation: Use plugins only for mission-critical features (e.g., Stripe, advanced charts) and build the rest natively."
  },
  {
    "type": "heading",
    "id": "challenge-3-overpaying-on-plans-too-early",
    "text": "Challenge #3 — Overpaying on Plans Too Early"
  },
  {
    "type": "paragraph",
    "text": "Many founders jump to Growth or Team too fast."
  },
  {
    "type": "paragraph",
    "text": "Mitigation:"
  },
  {
    "type": "list",
    "items": [
      "Start with Starter",
      "Upgrade only when WU logs show real usage",
      "Don’t scale your infrastructure before your product"
    ]
  },
  {
    "type": "paragraph",
    "text": "Starting lean gives you more runway."
  },
  {
    "type": "heading",
    "id": "4-indonesia-market-advantage-why-bubble-is-perfect-for-local-founders",
    "text": "4. Indonesia Market Advantage: Why Bubble Is Perfect for Local Founders"
  },
  {
    "type": "paragraph",
    "text": "Indonesia’s tech landscape is unique — and Bubble fits this environment strategically well."
  },
  {
    "type": "heading",
    "id": "1-lower-cash-burn-is-a-competitive-advantage",
    "text": "1. Lower Cash Burn Is a Competitive Advantage"
  },
  {
    "type": "paragraph",
    "text": "Indonesian founders typically don’t have access to the same capital runway as Silicon Valley startups. Bubble lets you:"
  },
  {
    "type": "list",
    "items": [
      "Ship faster",
      "Validate earlier",
      "Burn less cash per iteration"
    ]
  },
  {
    "type": "paragraph",
    "text": "This means you get more shots on goal with the same budget."
  },
  {
    "type": "heading",
    "id": "2-faster-go-to-market-faster-revenue",
    "text": "2. Faster Go-To-Market = Faster Revenue"
  },
  {
    "type": "paragraph",
    "text": "Many Indonesian founders build:"
  },
  {
    "type": "list",
    "items": [
      "Marketplaces",
      "Booking systems",
      "Internal dashboards",
      "Service automations",
      "SME solutions"
    ]
  },
  {
    "type": "paragraph",
    "text": "These apps don’t need huge infra — they need speed. Bubble delivers that speed."
  },
  {
    "type": "heading",
    "id": "3-lower-hiring-pressure",
    "text": "3. Lower Hiring Pressure"
  },
  {
    "type": "paragraph",
    "text": "Local tech talent is expensive and competitive."
  },
  {
    "type": "paragraph",
    "text": "But Bubble drastically reduces the need for:"
  },
  {
    "type": "list",
    "items": [
      "Backend engineers",
      "Frontend engineers",
      "DevOps",
      "QA engineers"
    ]
  },
  {
    "type": "paragraph",
    "text": "You can operate with a lean team — sometimes even just one founder + a Bubble developer."
  },
  {
    "type": "heading",
    "id": "4-perfect-for-bootstrapping",
    "text": "4. Perfect for Bootstrapping"
  },
  {
    "type": "paragraph",
    "text": "Indonesia has a strong bootstrapping culture. Bubble strengthens that culture by making product development financially viable even without outside capital."
  },
  {
    "type": "heading",
    "id": "5-what-should-founders-budget-for-a-bubble-app-in-2025",
    "text": "5. What Should Founders Budget for a Bubble App in 2025?"
  },
  {
    "type": "paragraph",
    "text": "Here’s a realistic, founder-friendly benchmark:"
  },
  {
    "type": "heading",
    "id": "for-mvp-stage-0-3-months-after-launch",
    "text": "For MVP Stage (0–3 months after launch)"
  },
  {
    "type": "list",
    "items": [
      "Bubble plan: US$29–US$119",
      "Plugins: US$10–US$40",
      "WU overage: US$0–US$30",
      "Optional developer support: US$1,500–US$5,000 → Total: US$100–US$500/month"
    ]
  },
  {
    "type": "heading",
    "id": "for-traction-stage-real-users",
    "text": "For Traction Stage (real users)"
  },
  {
    "type": "list",
    "items": [
      "Bubble plan: US$119–US$349",
      "Plugins: US$20–US$100",
      "WU overage: US$20–US$200",
      "Developer support: US$1,000–US$4,000 → Total: US$300–US$1,200/month"
    ]
  },
  {
    "type": "heading",
    "id": "for-scaling-stage-teams-revenue-transactions",
    "text": "For Scaling Stage (teams, revenue, transactions)"
  },
  {
    "type": "list",
    "items": [
      "Bubble plan: US$349+",
      "WU bundles for heavy workloads",
      "Paid infra add-ons → Total varies based on product & usage"
    ]
  },
  {
    "type": "heading",
    "id": "6-final-thoughts",
    "text": "6. Final Thoughts"
  },
  {
    "type": "paragraph",
    "text": "If you’re a founder building your first version, Bubble provides three things traditional development can’t match:"
  },
  {
    "type": "list",
    "items": [
      "Speed to validate",
      "Lower cost to learn",
      "Control over your product direction"
    ]
  },
  {
    "type": "paragraph",
    "text": "The cost isn’t zero — but compared to months of engineering salaries or a six-figure dev agency quote, Bubble gives you a realistic way to build, test, iterate and launch with far less risk."
  }
];

const post = {
  slug: "how-much-does-it-really-cost-to-build-an-app-with-bubble-in-2025",
  tag: "Bubble Development",
  tags: ["Bubble Development"],
  publishedAt: "2025-11-24",
  title: "How Much Does It Really Cost to Build an App with Bubble in 2025?",
  description: "A realistic breakdown of what Bubble actually costs in 2025 \u2014 subscription plans, Workload Units, storage, third-party tools, and mobile builds \u2014 plus founder-friendly budget benchmarks for the MVP, traction, and scaling stages.",
  coverImage: "/blog/blog-cover-how-much-does-it-really-cost-to-build-an-app-with-bubble-in-2025.jpg",
  heroImage: "/blog/blog-hero-how-much-does-it-really-cost-to-build-an-app-with-bubble-in-2025.jpg",
  authorName: "Devva Maulana",
  authorRole: "Bubble Developer",
  authorHue: 1,
  readTime: "5 min read",
  isFeatured: false,
  toc,
  body,
};

await sql`
  INSERT INTO blog_posts (
    slug, tag, tags, published_at, title, description, cover_image, hero_image,
    author_name, author_role, author_hue, read_time, is_featured, toc, body
  ) VALUES (
    ${post.slug}, ${post.tag}, ${post.tags}, ${post.publishedAt}, ${post.title}, ${post.description},
    ${post.coverImage}, ${post.heroImage}, ${post.authorName}, ${post.authorRole}, ${post.authorHue},
    ${post.readTime}, ${post.isFeatured}, ${JSON.stringify(post.toc)}::jsonb, ${JSON.stringify(post.body)}::jsonb
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

console.log("Migrated:", post.slug);
process.exit(0);
