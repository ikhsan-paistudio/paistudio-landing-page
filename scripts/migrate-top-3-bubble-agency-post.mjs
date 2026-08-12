// One-off migration: pulls the real, published post at
// https://paistudio.co/blog/top-3-bubble-agency-in-indonesia-in-2026
// (the actual production Paistudio site — a separate Framer-hosted site,
// not this Next.js app) into the blog_posts table. Content below is the
// real article text, extracted verbatim from that page's own HTML (not
// paraphrased) — the one exception is the comparison table in its "TL;DR"
// section, reformatted into a flat list since blog_posts' `body` schema
// (ArticleBlock union: heading/paragraph/list/image/video) has no table
// block type; every fact in it is preserved, just restructured.
//
// "Guides" is a genuinely new category — not one of the existing
// BLOG_CATEGORIES ("Product Strategy" / "No-Code & AI" / "Case Studies" /
// "Founder Stories"). Forcing it into one of those would misrepresent the
// source's own actual categorization (shown as "Blog > Guides" on the
// real page), so BLOG_CATEGORIES gets extended instead — see
// src/lib/data/blog-posts.ts.
//
// Run with: node scripts/migrate-top-3-bubble-agency-post.mjs
// Reads POSTGRES_URL from .env.local (gitignored, not committed).

process.loadEnvFile(new URL("../.env.local", import.meta.url));

const { sql } = await import("@vercel/postgres");

const toc = [
  { id: "what-is-a-bubble-agency", label: "What Is a Bubble Agency?" },
  { id: "services-offered-by-a-bubble-agency", label: "Services Offered by a Bubble Agency" },
  { id: "top-3-bubble-agency-in-indonesia", label: "Top 3 Bubble Agency in Indonesia" },
  { id: "tldr", label: "TL;DR" },
  { id: "how-to-choose-the-best-bubble-agency-for-you", label: "How to Choose The Best Bubble Agency For You" },
  { id: "conclusion", label: "Conclusion" },
];

const body = [
  { type: "heading", id: "what-is-a-bubble-agency", text: "What Is a Bubble Agency?" },
  {
    type: "paragraph",
    text: "A Bubble agency is a specialized digital product studio that builds web and SaaS applications using Bubble, a no-code development platform. Instead of traditional coding, Bubble agencies use visual workflows, database logic, and integrations to deliver functional and scalable applications more quickly and cost efficiently. They commonly work on MVPs, internal tools, marketplaces, and early-stage SaaS products.",
  },
  {
    type: "paragraph",
    text: "Unlike freelance Bubble developers or general software houses, a Bubble agency typically operates with a structured team covering product strategy, UI UX design, and Bubble development. This approach enables a smoother transition from idea to production, supported by clear processes, better quality control, and ongoing maintenance, which makes Bubble agencies an attractive option for startups and businesses in Indonesia.",
  },
  { type: "heading", id: "services-offered-by-a-bubble-agency", text: "Services Offered by a Bubble Agency" },
  {
    type: "paragraph",
    text: "A Bubble agency provides focused services that cover the full lifecycle of building a Bubble-powered application, from early validation to production-ready delivery. These services are structured to help teams move quickly while ensuring the product is technically sound, user-centered, and ready to scale.",
  },
  {
    type: "list",
    items: [
      "Product Discovery and MVP Planning: Defining product goals, core features, user flows, and technical scope",
      "Product Research and Design: Conducting user research, creating wireframes, and designing intuitive, Bubble-ready interfaces",
      "Full Bubble Development: Building databases, workflows, business logic, and responsive pages entirely in Bubble",
      "API and Third-Party Integration: Integrating external services such as payment gateways, authentication systems, and analytics tools",
    ],
  },
  { type: "heading", id: "top-3-bubble-agency-in-indonesia", text: "Top 3 Bubble Agency in Indonesia" },
  {
    type: "paragraph",
    text: "Choosing the right Bubble agency can significantly impact how fast and how well a digital product reaches the market. In Indonesia, several agencies stand out for their ability to deliver production-ready applications using Bubble with strong product thinking and execution speed. This list highlights three Bubble agencies that consistently demonstrate expertise, reliability, and real-world delivery experience.",
  },
  { type: "heading", id: "paistudio", text: "Paistudio" },
  {
    type: "paragraph",
    text: "Paistudio is a no-code Bubble agency in Indonesia that specializes in building and launching digital products swiftly by combining Bubble's visual development with strategic planning and UI/UX design. Their portfolio showcases a wide range of real, production-ready applications across industries, from CRM platforms and dashboards to AI-enhanced tools and SaaS templates, demonstrating versatility and depth in Bubble development. With a structured delivery model and bi-weekly engagement plans, Paistudio supports founders and teams looking for fast iteration, predictable timelines, and long-term collaboration.",
  },
  {
    type: "paragraph",
    text: "What sets Paistudio apart is its emphasis on speed and scalability without compromising product quality. By streamlining the build process and offering ongoing support, they help businesses move from idea to live application efficiently, making them a strong choice for startups and enterprises seeking Bubble expertise with clear process and reliable outcomes.",
  },
  { type: "heading", id: "velcod", text: "Velcod" },
  {
    type: "paragraph",
    text: "Velcod is a rapid-launch product development agency that helps founders turn ideas into live web and mobile applications in as little as three weeks. Rather than focusing exclusively on Bubble, Velcod applies a multi-platform low-code approach, using tools such as Bubble, FlutterFlow, and Glide to ensure each product is built with the most suitable technology. This positioning makes Velcod particularly attractive to early-stage startups that prioritize speed, validation, and cost efficiency.",
  },
  {
    type: "paragraph",
    text: "Their delivery process covers discovery, UI UX design, development sprints, quality assurance, and post-launch support, enabling teams to launch production-ready applications without long development cycles. Supported by a large volume of completed projects and extensive client testimonials, Velcod presents itself as a founder-friendly agency with a strong focus on execution, communication, and scalable outcomes.",
  },
  { type: "heading", id: "etalas", text: "Etalas" },
  {
    type: "paragraph",
    text: "Etalas is a product development studio that combines Bubble with AI-assisted development, agents, and automation to help teams build and validate applications quickly. Rather than positioning itself as a Bubble-only agency, Etalas uses Bubble strategically for MVPs, internal tools, and client-facing applications where speed and flexibility are critical. Their focus on rapid scoping, lean roadmaps, and test-driven delivery reflects a strong startup-oriented mindset.",
  },
  {
    type: "paragraph",
    text: "With years of startup management experience and a fully remote team based across Indonesia, Etalas emphasizes execution quality alongside development speed. Their workflow prioritizes early prototyping, fast iteration, and long-term partnerships, making them well-suited for founders and companies looking to experiment, validate ideas, and evolve products without heavy upfront engineering investment.",
  },
  { type: "heading", id: "tldr", text: "TL;DR" },
  {
    // Reformatted from the source's comparison table (a table block type
    // doesn't exist in this schema) — every criterion/value preserved.
    type: "list",
    items: [
      "Positioning — Paistudio: Bubble-first no-code agency · Velcod: Rapid-launch low-code studio · Etalas: AI-driven product studio",
      "Bubble Focus — Paistudio: High · Velcod: Medium · Etalas: Medium",
      "Core Strength — Paistudio: Deep Bubble expertise and large production portfolio · Velcod: Speed and fast MVP validation · Etalas: Hybrid AI and Bubble execution",
      "Delivery Speed — Paistudio: Weeks with bi-weekly sprints · Velcod: Around 3–4 weeks · Etalas: MVPs launched in weeks",
      "Best Fit For — Paistudio: SaaS products, dashboards, internal tools · Velcod: Early-stage founders and quick validation · Etalas: MVPs, internal tools, product experiments",
      "Development Approach — Paistudio: Full Bubble development with ongoing support · Velcod: Multi-platform low-code including Bubble · Etalas: Bubble combined with AI, agents, and automation",
    ],
  },
  {
    type: "heading",
    id: "how-to-choose-the-best-bubble-agency-for-you",
    text: "How to Choose The Best Bubble Agency For You",
  },
  {
    type: "paragraph",
    text: "Choosing the right Bubble agency is essential to ensure your product is built efficiently, scales well, and aligns with your business goals. With different agencies offering varying levels of specialization and delivery models, a clear evaluation framework helps reduce risk and improve outcomes.",
  },
  {
    type: "list",
    items: [
      "Match the agency to your product stage: Choose an agency experienced with MVPs, SaaS, or internal tools based on your current needs.",
      "Verify real Bubble expertise: Review live projects, workflow complexity, and integration experience, not just design quality.",
      "Assess process and ownership: Ensure the agency has a clear delivery process and provides full ownership of your Bubble application.",
    ],
  },
  { type: "heading", id: "conclusion", text: "Conclusion" },
  {
    type: "paragraph",
    text: "There is no single “best” Bubble agency for every project, as each agency brings different strengths, delivery models, and technical approaches. Paistudio stands out for deep Bubble specialization and long-term product development, Velcod excels in rapid MVP launches and fast validation, while Etalas offers a hybrid approach that combines Bubble with AI-driven experimentation and automation.",
  },
  {
    type: "paragraph",
    text: "The right choice ultimately depends on your product stage, speed requirements, and long-term goals. By understanding what each agency does best and aligning it with your specific needs, you can select a Bubble agency that not only builds your application efficiently but also supports sustainable growth beyond launch.",
  },
];

const post = {
  slug: "top-3-bubble-agency-in-indonesia-in-2026",
  tag: "Guides",
  tags: ["Guides"],
  publishedAt: "2026-02-24",
  title: "Top 3 Bubble Agency in Indonesia in 2026",
  description:
    "A detailed comparison of the top Bubble agencies in Indonesia in 2026. Explore their positioning, strengths, delivery models, and ideal use cases to help you choose the right Bubble partner for your product stage.",
  coverImage: "/blog/blog-cover-top-3-bubble-agency-in-indonesia-in-2026.jpg",
  heroImage: "/blog/blog-hero-top-3-bubble-agency-in-indonesia-in-2026.jpg",
  authorName: "Muhammad Ikhsan N.",
  authorRole: "Product Developer",
  authorHue: 2,
  readTime: "4 min read",
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
