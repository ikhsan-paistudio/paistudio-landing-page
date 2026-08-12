// One-off migration: pulls the real, published post at
// https://paistudio.co/blog/the-future-of-no-code-exploring-bubble-io-s-full-stack-capabilities
// (the actual production Paistudio site — a separate Framer-hosted site,
// not this Next.js app) into the blog_posts table. This is the oldest of
// the migrated posts (Oct 2024) and its source HTML doesn't use real
// <h2>/<h3> heading tags at all — every section title ("1. What is
// Bubble.io?", "Introduction:", "Conclusion + Call to Action:", etc.) is
// just a bold, standalone <p><strong> paragraph. Promoted those to
// `heading` blocks here since that's their real structural function on
// the page (the source's own bold styling marks them as section breaks),
// rather than leaving them as inert paragraphs with no TOC entries.
//
// Tag "Development" is a genuinely new category value — this page's own
// header pill, distinct from "Bubble Development" used by the newer
// tutorial-style posts. See BLOG_CATEGORIES in src/lib/data/blog-posts.ts.
//
// Author is Akbar Putra PAI, Paistudio's founder — reusing author_hue 1.
//
// Run with: node scripts/migrate-the-future-of-no-code-exploring-bubble-io-s-full-stack-capabilities-post.mjs
// Reads POSTGRES_URL from .env.local (gitignored, not committed).

process.loadEnvFile(new URL("../.env.local", import.meta.url));

const { sql } = await import("@vercel/postgres");

const toc = [
  {
    "id": "introduction",
    "label": "Introduction:"
  },
  {
    "id": "1-what-is-bubbleio",
    "label": "1. What is Bubble.io?"
  },
  {
    "id": "2-speed-and-flexibility",
    "label": "2. Speed and Flexibility"
  },
  {
    "id": "3-build-full-stack-applications-with-no-code",
    "label": "3. Build Full-Stack Applications with No-Code"
  },
  {
    "id": "4-perfect-for-non-tech-entrepreneurs",
    "label": "4. Perfect for Non-Tech Entrepreneurs"
  },
  {
    "id": "5-real-success-stories",
    "label": "5. Real Success Stories"
  },
  {
    "id": "6-why-bubbleio-is-leading-the-no-code-revolution",
    "label": "6. Why Bubble.io is Leading the No-Code Revolution"
  },
  {
    "id": "conclusion-call-to-action",
    "label": "Conclusion + Call to Action:"
  }
];

const body = [
  {
    "type": "heading",
    "id": "introduction",
    "text": "Introduction:"
  },
  {
    "type": "paragraph",
    "text": "As the world rapidly goes digital, businesses need to keep up by launching web applications quickly. But traditional development can be slow, expensive, and requires a lot of coding knowledge. That’s where Bubble.io comes in—an easy-to-use, no-code platform that lets you build entire web apps without writing a single line of code."
  },
  {
    "type": "paragraph",
    "text": "Bubble is unique because it combines both the front-end and back-end development into one tool. Whether you’re an entrepreneur with no technical skills or a small business owner, you can now create apps faster than ever. Let’s explore how Bubble.io can help you bring your ideas to life."
  },
  {
    "type": "heading",
    "id": "1-what-is-bubbleio",
    "text": "1. What is Bubble.io?"
  },
  {
    "type": "paragraph",
    "text": "Bubble.io is a no-code platform that allows anyone to create fully functional web applications using a simple visual editor. Instead of writing code, you can just drag and drop elements to design your app’s interface, manage data, and set up workflows that automate tasks."
  },
  {
    "type": "paragraph",
    "text": "What makes Bubble different is that it’s not just for designing the look of your app (front-end); it also manages what happens behind the scenes (back-end), such as storing data and running automated processes. Essentially, it’s a full-stack platform, which means you can do everything in one place."
  },
  {
    "type": "heading",
    "id": "2-speed-and-flexibility",
    "text": "2. Speed and Flexibility"
  },
  {
    "type": "paragraph",
    "text": "One of the biggest advantages of Bubble.io is how quickly you can go from idea to a working app. For non-tech business owners, hiring developers to build custom apps can be expensive and time-consuming. Bubble lets you skip the coding part and build it yourself, fast."
  },
  {
    "type": "paragraph",
    "text": "You can design your app, manage databases, and create workflows all within Bubble’s platform. And the best part? As your business grows, you can easily update or expand your app without needing a development team."
  },
  {
    "type": "heading",
    "id": "3-build-full-stack-applications-with-no-code",
    "text": "3. Build Full-Stack Applications with No-Code"
  },
  {
    "type": "paragraph",
    "text": "Bubble.io is much more than a simple app builder. It’s a full-stack tool that gives you complete control over your app, including the ability to create user accounts, manage complex data, and connect with other apps through APIs (without needing to know what an API is!)."
  },
  {
    "type": "paragraph",
    "text": "For example, if you want to create a marketplace or booking app, Bubble lets you design everything from the user profiles to the payment system—all without writing code."
  },
  {
    "type": "heading",
    "id": "4-perfect-for-non-tech-entrepreneurs",
    "text": "4. Perfect for Non-Tech Entrepreneurs"
  },
  {
    "type": "paragraph",
    "text": "If you’re not a developer, the idea of building your own app can seem impossible. But with Bubble.io, you don’t need coding skills. The platform’s simple drag-and-drop interface allows anyone to design and launch apps without hiring a team of developers."
  },
  {
    "type": "paragraph",
    "text": "For entrepreneurs, this means you can create prototypes or launch Minimum Viable Products (MVPs) to test your ideas quickly, gather feedback, and make changes—all within Bubble. It’s a cost-effective solution that empowers you to turn your ideas into reality without the technical complexity."
  },
  {
    "type": "heading",
    "id": "5-real-success-stories",
    "text": "5. Real Success Stories"
  },
  {
    "type": "paragraph",
    "text": "Businesses of all sizes are already using Bubble.io to build and launch their apps. For example, a startup was able to create and launch a fully functioning platform in just a few weeks—saving both time and money. Without Bubble, they would have needed months of development and a big budget."
  },
  {
    "type": "paragraph",
    "text": "The flexibility and speed of Bubble.io have helped startups, small businesses, and even solo entrepreneurs bring their ideas to life faster than ever before."
  },
  {
    "type": "heading",
    "id": "6-why-bubbleio-is-leading-the-no-code-revolution",
    "text": "6. Why Bubble.io is Leading the No-Code Revolution"
  },
  {
    "type": "paragraph",
    "text": "The future of app development is shifting towards no-code platforms like Bubble.io, where you don’t need technical skills to create powerful applications. As businesses seek faster ways to innovate, Bubble’s full-stack capabilities make it a standout solution in the no-code world."
  },
  {
    "type": "paragraph",
    "text": "From MVPs to fully scalable platforms, Bubble.io is showing that the traditional barriers to building apps are coming down—making it accessible to everyone, no matter their tech background."
  },
  {
    "type": "heading",
    "id": "conclusion-call-to-action",
    "text": "Conclusion + Call to Action:"
  },
  {
    "type": "paragraph",
    "text": "If you’ve ever thought about building your own app but were held back by the complexity of coding, now’s the time to explore Bubble.io. It’s a full-stack no-code platform that gives you all the tools you need to design, build, and launch your own web applications without hiring a development team."
  },
  {
    "type": "paragraph",
    "text": "Ready to start? Head over to Bubble.io today and see how easy it is to bring your app ideas to life!"
  }
];

const post = {
  slug: "the-future-of-no-code-exploring-bubble-io-s-full-stack-capabilities",
  tag: "Development",
  tags: ["Development"],
  publishedAt: "2024-10-25",
  title: "The Future of No-Code: Exploring Bubble.io's Full-Stack Capabilities",
  description: "How Bubble.io simplifies app development by combining design, data, and logic \u2014 front-end and back-end \u2014 into one no-code platform, with real examples of what non-technical entrepreneurs can build.",
  coverImage: "/blog/blog-cover-the-future-of-no-code-exploring-bubble-io-s-full-stack-capabilities.png",
  heroImage: "/blog/blog-hero-the-future-of-no-code-exploring-bubble-io-s-full-stack-capabilities.png",
  authorName: "Akbar Putra PAI",
  authorRole: "Founder of Paistudio \u2014 helping businesses and solopreneurs build apps faster with Bubble.",
  authorHue: 1,
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
