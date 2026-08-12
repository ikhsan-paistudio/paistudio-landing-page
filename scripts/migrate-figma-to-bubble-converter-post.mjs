// One-off migration: pulls the real, published post at
// https://paistudio.co/blog/figma-to-bubble-converter-2025-official-free-plugin-import-full-designs-in-seconds
// (the actual production Paistudio site — a separate Framer-hosted site,
// not this Next.js app) into the blog_posts table. Content below is
// extracted verbatim from that page's own HTML, including its 6 inline
// product screenshots (downloaded to public/blog/) as real `image` blocks —
// the first migrated post with inline body images, since the two earlier
// migrated posts (top-3-bubble-agency, why-non-technical-founders) had none
// in their source HTML. Inline link targets (figma.com/community,
// bubble.io/figma-to-bubble, the Chrome Web Store plugin listing) are kept
// as plain text since this schema's paragraph/list blocks don't support
// rich links — same convention as the "(source.com)" citations in the
// why-non-technical-founders migration.
//
// Author is a genuinely different real person from the other two migrated
// posts ("Orleans Bowie", Intern UI/UX Designer — not Muhammad Ikhsan
// Nur/N.), so it gets its own author_hue (0) rather than reusing hue 2.
//
// Tag is read directly from this post's own article header (the pill next
// to "Published at" — Framer's CMS field is internally named "NEWS" but
// its actual value here is "Bubble Development"), not from the truncated
// related-posts preview cards elsewhere on the page, which render behind
// duplicated ssr-variant markup that shifts card/tag pairs out of order
// under a naive sequential read. "Bubble Development" is a genuinely new
// category value — see BLOG_CATEGORIES in src/lib/data/blog-posts.ts.
//
// Run with: node scripts/migrate-figma-to-bubble-converter-post.mjs
// Reads POSTGRES_URL from .env.local (gitignored, not committed).

process.loadEnvFile(new URL("../.env.local", import.meta.url));

const { sql } = await import("@vercel/postgres");

const toc = [
  {
    id: "the-biggest-time-saver-in-no-code-just-went-official-and-free",
    label: "The Biggest Time-Saver in No-Code Just Went Official (and Free)",
  },
  { id: "1-setup-in-under-2-minutes-100-free", label: "1. Setup in Under 2 Minutes (100% Free)" },
  {
    id: "2-step-by-step-from-figma-frame-to-live-bubble-page",
    label: "2. Step-by-Step: From Figma Frame to Live Bubble Page",
  },
  {
    id: "3-current-limitations-instant-workarounds-be-honest",
    label: "3. Current Limitations & Instant Workarounds (Be Honest)",
  },
  { id: "final-verdict", label: "Final Verdict" },
];

const IMG = (n) => `/blog/blog-body-figma-to-bubble-converter-2025-official-free-plugin-import-full-designs-in-seconds-${n}.png`;

const body = [
  {
    type: "heading",
    id: "the-biggest-time-saver-in-no-code-just-went-official-and-free",
    text: "The Biggest Time-Saver in No-Code Just Went Official (and Free)",
  },
  {
    type: "paragraph",
    text: "August 2025: Bubble quietly acquired Deezign and turned the legendary third-party plugin into the official Figma to Bubble Converter, now 100% free for every Bubble user.",
  },
  {
    type: "paragraph",
    text: "What used to take designers + developers 15–30 hours of painful manual reconstruction now takes literally 60 seconds of copy-paste.",
  },
  { type: "paragraph", text: "At Paistudio we've been beta-testing this since day one. Result:" },
  {
    type: "list",
    items: [
      "Designers now own 90–95% of front-end building",
      "Average MVP timeline dropped from 4–6 weeks → 10–14 days",
      "Zero “it doesn't look like the Figma” complaints",
      "We raised rates 40% because the polish looks like a $500K custom app",
    ],
  },
  { type: "paragraph", text: "Here's the exact 2025 workflow we use on every $50K–$300K project." },

  { type: "heading", id: "1-setup-in-under-2-minutes-100-free", text: "1. Setup in Under 2 Minutes (100% Free)" },
  { type: "paragraph", text: "No paid plans, no API keys nightmare." },
  {
    type: "list",
    items: [
      "Go to Figma Community (figma.com/community) → Search “Figma to Bubble Converter” (official blue checkmark) → Install",
    ],
  },
  { type: "image", src: IMG(1), alt: "Figma to Bubble Converter plugin listing in the Figma Community" },
  {
    type: "list",
    items: [
      "Go to Chrome Web Store → Install “Figma to Bubble Converter” extension (one-click paste into Bubble editor)",
    ],
  },
  { type: "image", src: IMG(2), alt: "Figma to Bubble Converter extension in the Chrome Web Store" },
  {
    type: "list",
    items: [
      "Generate Token (one-time) → You'll need a Bubble account to generate an access token → Get started (bubble.io/figma-to-bubble) → Figma Plugin",
    ],
  },
  { type: "paragraph", text: "Done. Token only has read-only design permissions." },

  {
    type: "heading",
    id: "2-step-by-step-from-figma-frame-to-live-bubble-page",
    text: "2. Step-by-Step: From Figma Frame to Live Bubble Page",
  },
  { type: "paragraph", text: "Prepare your Figma file (5 golden rules)" },
  {
    type: "list",
    items: [
      "100% Auto Layout (no absolute position ever)",
      "Name layers properly (btn_primary, card_product, input_email)",
      "Use Component Sets for states (Default / Hover / Focus / Error)",
      "Use Figma Variables for colors & text styles",
      "Stick to 8-point grid",
    ],
  },
  { type: "image", src: IMG(3), alt: "Figma file prepared with Auto Layout, named layers, and component sets" },
  {
    type: "list",
    items: [
      "Run the converter — Select the frame/page you want → Right-click → Plugins → Figma to Bubble Converter → “Convert selection” → Wait 5–15 seconds (depends on complexity)",
    ],
  },
  { type: "image", src: IMG(4), alt: "Running the Figma to Bubble Converter plugin on a selected frame" },
  {
    type: "list",
    items: [
      "Paste into Bubble — Open your Bubble editor → Click anywhere on the page → Ctrl+V (or Cmd+V) → Entire structure appears as native, editable Bubble elements",
    ],
  },
  { type: "image", src: IMG(5), alt: "Pasted Figma design appearing as native, editable Bubble elements" },
  { type: "paragraph", text: "10-minute polish (the only manual part)" },
  {
    type: "list",
    items: [
      "Fix tiny spacing differences (usually <10 px)",
      "Connect dynamic data binding (Current User's name, Repeating Group's data source, etc.)",
      "Add page-load stagger animations (we do this in <5 min)",
    ],
  },
  { type: "image", src: IMG(6), alt: "Final polished Bubble page after fixing spacing and adding data bindings" },
  { type: "paragraph", text: "That's it. Your design is now a fully functional, responsive Bubble app." },

  {
    type: "heading",
    id: "3-current-limitations-instant-workarounds-be-honest",
    text: "3. Current Limitations & Instant Workarounds (Be Honest)",
  },
  { type: "paragraph", text: "Nothing is perfect yet." },
  { type: "paragraph", text: "Issue:" },
  { type: "list", items: ["Complex custom animations", "Some shadows/drop effects", "Fixed-width designs"] },
  { type: "paragraph", text: "Workaround we use daily:" },
  {
    type: "list",
    items: ["Split very large pages into logical sections", "Add manually after paste (still 10× faster)"],
  },
  { type: "paragraph", text: "In practice these affect <5% of total work." },

  { type: "heading", id: "final-verdict", text: "Final Verdict" },
  {
    type: "paragraph",
    text: "The official Figma to Bubble Converter is the single biggest productivity leap in no-code since responsive engine v2.",
  },
  {
    type: "paragraph",
    text: "If you're a designer reading this: stop handing off static Figma files. Start pasting live, breathing, pixel-perfect apps in minutes. The era of “designer vs developer” in Bubble is officially over.",
  },
  { type: "paragraph", text: "Welcome to the designer-builder hybrid era." },
  {
    type: "paragraph",
    text: "Ready to 5× your speed? Install the plugin right now: Figma to Bubble (chromewebstore.google.com)",
  },
  { type: "paragraph", text: "Let's build the future" },
];

const post = {
  slug: "figma-to-bubble-converter-2025-official-free-plugin-import-full-designs-in-seconds",
  tag: "Bubble Development",
  tags: ["Bubble Development"],
  publishedAt: "2025-11-28",
  title: "Figma to Bubble Converter 2025: Official Free Plugin – Import Full Designs in Seconds",
  description:
    "The official Figma to Bubble Converter (2025) lets designers paste pixel-perfect, responsive UIs directly into Bubble in under a minute. Complete setup and step-by-step workflow.",
  coverImage:
    "/blog/blog-cover-figma-to-bubble-converter-2025-official-free-plugin-import-full-designs-in-seconds.jpg",
  heroImage:
    "/blog/blog-hero-figma-to-bubble-converter-2025-official-free-plugin-import-full-designs-in-seconds.jpg",
  authorName: "Orleans Bowie",
  authorRole: "Intern UI/UX Designer",
  authorHue: 0,
  readTime: "2 min read",
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
