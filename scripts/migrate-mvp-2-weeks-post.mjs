// One-off migration: pulls the real, published post at
// https://paistudio.co/blog/how-to-build-an-mvp-in-2-weeks-using-no-code-tools-(2025-guide)
// (the actual production Paistudio site — a separate Framer-hosted site,
// not this Next.js app) into the blog_posts table. `slug` intentionally
// keeps the source's literal parentheses ("...-(2025-guide)") — that's
// the real URL path this post lives at on the source site, and parens are
// valid, unencoded URL path characters (RFC 3986 sub-delims), so the
// Next.js [slug] route matches it as-is. Local image filenames drop the
// parens for filesystem cleanliness only — that has no bearing on the
// `slug` column or the route.
//
// Its "MVP → MLP → MMP" comparison table is reformatted into a flat list,
// same convention as the other migrated posts' tables. One cell in the
// source's own HTML ("Make it ready to sell or scale\tA stable") has a
// stray literal tab character baked into the markup — likely a copy-paste
// artifact by the original author — normalized to a space here (verbatim
// text preserved, not rewritten).
//
// Author is Muhammad Ikhsan Nur — the same real person as the
// why-non-technical-founders migration, reusing author_hue 2.
//
// Run with: node scripts/migrate-how-to-build-an-mvp-in-2-weeks-using-no-code-tools-(2025-guide)-post.mjs
// Reads POSTGRES_URL from .env.local (gitignored, not committed).

process.loadEnvFile(new URL("../.env.local", import.meta.url));

const { sql } = await import("@vercel/postgres");

const toc = [
  {
    "id": "what-is-an-mvp-and-why-no-code-changes-everything",
    "label": "What is an MVP? And why no-code changes everything?"
  },
  {
    "id": "from-mvp-to-mlp-to-mmp",
    "label": "From MVP to MLP to MMP"
  },
  {
    "id": "step-by-step-build-your-mvp-in-2-weeks",
    "label": "Step-by-Step: Build Your MVP in 2 Weeks"
  },
  {
    "id": "conclusion",
    "label": "Conclusion"
  }
];

const body = [
  {
    "type": "paragraph",
    "text": "In this guide, we’ll show you exactly how to plan, design, and launch your MVP in 14 days using the same tools our no-code agency uses to help startups validate fast."
  },
  {
    "type": "heading",
    "id": "what-is-an-mvp-and-why-no-code-changes-everything",
    "text": "What is an MVP? And why no-code changes everything?"
  },
  {
    "type": "paragraph",
    "text": "An MVP (Minimum Viable Product) is a lightweight version of your product that helps you test your core idea with real users. The goal is not to build something perfect but something usable enough to validate if people actually want it."
  },
  {
    "type": "paragraph",
    "text": "Traditionally, building an MVP required developers, backend setup, and complex deployment. That meant months of work and high costs before even testing the idea."
  },
  {
    "type": "paragraph",
    "text": "But no-code tools changed the game. Platforms like Bubble, Webflow, Glide, and Softr let you build real, functional products visually. Combine that with tools like Zapier or Make for automation, and you can go from idea to live app in days."
  },
  {
    "type": "paragraph",
    "text": "According to Zapier, “90% of no-code users think their company has been able to grow faster due to its no-code usage. (src: link)"
  },
  {
    "type": "heading",
    "id": "from-mvp-to-mlp-to-mmp",
    "text": "From MVP to MLP to MMP"
  },
  {
    "type": "paragraph",
    "text": "Building fast is important. But building something people love and that’s ready for market is the real goal. That’s why top startups evolve through three stages:"
  },
  {
    "type": "list",
    "items": [
      "MVP (Minimum Viable Product) — Focus: Test if the idea works · Example: basic app that validates your hypothesis",
      "MLP (Minimum Lovable Product) — Focus: Make users care and enjoy using it · Example: A refined version with better UX and design",
      "MMP (Minimum Marketable Product) — Focus: Make it ready to sell or scale A stable · Example: Market-ready version users will pay for"
    ]
  },
  {
    "type": "list",
    "items": [
      "MVP validates your assumptions.",
      "MLP builds emotional connection and retention.",
      "MMP turns it into a product you can monetize or present to investors."
    ]
  },
  {
    "type": "paragraph",
    "text": "With no-code tools, you can transition through all three stages faster than ever. Start with a visual prototype in Framer, gather feedback in Tally, iterate in Bubble, and automate growth using N8N."
  },
  {
    "type": "heading",
    "id": "step-by-step-build-your-mvp-in-2-weeks",
    "text": "Step-by-Step: Build Your MVP in 2 Weeks"
  },
  {
    "type": "heading",
    "id": "week-1-foundation-design",
    "text": "Week 1: Foundation & Design"
  },
  {
    "type": "heading",
    "id": "1-validate-the-idea",
    "text": "1. Validate the Idea"
  },
  {
    "type": "paragraph",
    "text": "Before building, test if your idea solves a real problem. Use simple tools like Typeform, Notion, or a one-page Framer landing page to collect interest. Add a signup form and run a few small social posts or ads to measure traction."
  },
  {
    "type": "heading",
    "id": "2-define-core-features",
    "text": "2. Define Core Features"
  },
  {
    "type": "paragraph",
    "text": "List everything your app could have, then cut it down to 2 or 3 core features. Use a Notion table or FigJam board to prioritize based on impact versus effort."
  },
  {
    "type": "heading",
    "id": "3-design-your-flow",
    "text": "3. Design Your Flow"
  },
  {
    "type": "paragraph",
    "text": "Sketch your user journey from landing page to signup to action to success. You can design directly in Figma, or skip straight to Framer for visual prototyping."
  },
  {
    "type": "heading",
    "id": "week-2-build-launch",
    "text": "Week 2: Build & Launch"
  },
  {
    "type": "heading",
    "id": "4-build-the-core-functionality",
    "text": "4. Build the Core Functionality"
  },
  {
    "type": "paragraph",
    "text": "Pick your tool stack:"
  },
  {
    "type": "list",
    "items": [
      "Web App: Bubble, Glide, Softr",
      "Mobile App: FlutterFlow, Adalo, Glide",
      "Website: Framer, Webflow"
    ]
  },
  {
    "type": "paragraph",
    "text": "Start building your MVP’s core logic such as login, dashboard, and main action flow."
  },
  {
    "type": "heading",
    "id": "5-automate-your-backend",
    "text": "5. Automate Your Backend"
  },
  {
    "type": "paragraph",
    "text": "Use N8N or Zapier or Make to handle background tasks like:"
  },
  {
    "type": "list",
    "items": [
      "Auto-sending welcome emails",
      "Logging user signups in Airtable",
      "Generating PDFs or reports automatically"
    ]
  },
  {
    "type": "paragraph",
    "text": "This saves you from setting up a backend or hiring developers early on."
  },
  {
    "type": "heading",
    "id": "6-launch-publicly",
    "text": "6. Launch Publicly"
  },
  {
    "type": "paragraph",
    "text": "Once it works, ship it. Don’t wait for perfection. Post your MVP on:"
  },
  {
    "type": "list",
    "items": [
      "Product Hunt",
      "Indie Hackers",
      "LinkedIn or Reddit Startup groups"
    ]
  },
  {
    "type": "heading",
    "id": "7-collect-real-feedback",
    "text": "7. Collect Real Feedback"
  },
  {
    "type": "paragraph",
    "text": "Use Tally, Typeform, or Google Forms embedded inside your app to capture user feedback directly. Ask:"
  },
  {
    "type": "list",
    "items": [
      "“What do you like most?”",
      "“What’s confusing?”",
      "“What would you pay for next?”"
    ]
  },
  {
    "type": "heading",
    "id": "conclusion",
    "text": "Conclusion"
  },
  {
    "type": "paragraph",
    "text": "Building your MVP doesn’t have to be expensive or slow. With the right no-code stack, you can go from idea to working product in just two weeks. You’ll be ready to test, attract users, and validate your startup before investing heavily."
  },
  {
    "type": "paragraph",
    "text": "If you’re ready to turn your idea into a live MVP, our team can help you design, build, and launch it fast."
  },
  {
    "type": "paragraph",
    "text": "Book a Free MVP Strategy Call"
  }
];

const post = {
  slug: "how-to-build-an-mvp-in-2-weeks-using-no-code-tools-(2025-guide)",
  tag: "Business",
  tags: ["Business"],
  publishedAt: "2025-11-01",
  title: "How to Build an MVP in 2 Weeks Using No-Code Tools (2025 Guide)",
  description: "A 14-day, step-by-step plan for building a startup MVP with no-code tools like Bubble, Framer, and N8N \u2014 from validating the idea through Week 1 design to Week 2 build, automation, and public launch.",
  coverImage: "/blog/blog-cover-how-to-build-an-mvp-in-2-weeks-using-no-code-tools-2025-guide.jpg",
  heroImage: "/blog/blog-hero-how-to-build-an-mvp-in-2-weeks-using-no-code-tools-2025-guide.jpg",
  authorName: "Muhammad Ikhsan Nur",
  authorRole: "Product Developer",
  authorHue: 2,
  readTime: "3 min read",
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
