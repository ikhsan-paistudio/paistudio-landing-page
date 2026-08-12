// One-off migration: pulls the real, published post at
// https://paistudio.co/blog/how-no-code-is-changing-digital-transformation-making-technology-easier-for-businesses
// (the actual production Paistudio site — a separate Framer-hosted site,
// not this Next.js app) into the blog_posts table. Like the
// future-of-no-code migration, this is one of the site's oldest posts
// (Oct 2024) and uses bold standalone <p><strong> paragraphs instead of
// real heading tags for its section titles ("Introduction:", "What is
// No-Code?", "1. Why Speed Matters", etc.) — promoted to `heading` blocks
// here for the same reason (real structural function, not a real <h2>).
//
// Author is Akbar Putra PAI. His authorRole here is "Studio Head at
// Paistudio" — read verbatim from this specific post's own byline, which
// differs from the "Founder of Paistudio — helping businesses..." bio line
// on his other (newer) migrated posts. Kept as each page shows it rather
// than normalized to one value, same policy as author name spelling
// differences in earlier migrations. Reuses author_hue 1.
//
// Run with: node scripts/migrate-how-no-code-is-changing-digital-transformation-making-technology-easier-for-businesses-post.mjs
// Reads POSTGRES_URL from .env.local (gitignored, not committed).

process.loadEnvFile(new URL("../.env.local", import.meta.url));

const { sql } = await import("@vercel/postgres");

const toc = [
  {
    "id": "introduction",
    "label": "Introduction:"
  },
  {
    "id": "the-story-why-do-we-need-to-adapt-now",
    "label": "The Story: Why Do We Need to Adapt Now?"
  },
  {
    "id": "what-is-no-code",
    "label": "What is No-Code?"
  },
  {
    "id": "1-why-speed-matters",
    "label": "1. Why Speed Matters"
  },
  {
    "id": "2-keeping-costs-low",
    "label": "2. Keeping Costs Low"
  },
  {
    "id": "3-empowering-your-team",
    "label": "3. Empowering Your Team"
  },
  {
    "id": "4-flexible-and-scalable",
    "label": "4. Flexible and Scalable"
  },
  {
    "id": "5-real-life-success-stories",
    "label": "5. Real-Life Success Stories"
  },
  {
    "id": "conclusion",
    "label": "Conclusion:"
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
    "text": "Business is moving faster than ever, and companies need to keep up with changing technology to stay competitive. During the pandemic, many businesses were forced to switch to digital tools just to survive. But for smaller companies or startups, this can be expensive and hard to do, especially if they don’t have a lot of technical skills or resources."
  },
  {
    "type": "paragraph",
    "text": "This is where no-code comes in. No-code platforms let anyone build digital tools—like apps or websites—without having to write code. This makes it easier and cheaper for businesses to create the digital solutions they need to grow and succeed."
  },
  {
    "type": "heading",
    "id": "the-story-why-do-we-need-to-adapt-now",
    "text": "The Story: Why Do We Need to Adapt Now?"
  },
  {
    "type": "paragraph",
    "text": "Imagine a small restaurant that relied on customers walking in the door. Suddenly, everything changed, and they needed to offer online ordering and reservations to keep their business going. But building an app or website can take months and cost a lot of money, something many small businesses simply don’t have."
  },
  {
    "type": "paragraph",
    "text": "This is why no-code is so important right now. It allows businesses to adapt quickly and create solutions without needing a lot of money or time. No-code lets any business, no matter its size, keep up with fast changes in technology and customer demands."
  },
  {
    "type": "heading",
    "id": "what-is-no-code",
    "text": "What is No-Code?"
  },
  {
    "type": "paragraph",
    "text": "No-code is a type of software that helps you create apps, websites, or other digital tools without needing to write any code. Instead of hiring a developer, you can use a simple, drag-and-drop interface to build the solution you need. Platforms like Bubble, Webflow, and Adalo are examples of no-code tools that businesses around the world are using."
  },
  {
    "type": "heading",
    "id": "1-why-speed-matters",
    "text": "1. Why Speed Matters"
  },
  {
    "type": "paragraph",
    "text": "No-code platforms are fast. What used to take months to develop can now be done in weeks or even days. In today’s world, where customers expect quick service, this is a huge advantage. With no-code, you can build and launch your app or system quickly, making it easier to keep up with your competition and meet customer needs."
  },
  {
    "type": "heading",
    "id": "2-keeping-costs-low",
    "text": "2. Keeping Costs Low"
  },
  {
    "type": "paragraph",
    "text": "One of the biggest challenges for small businesses is the cost of going digital. Hiring a developer or an IT team can be expensive. But with no-code, you don’t need to spend a lot of money. You can create your own tools without having to pay for technical expertise. This makes digital transformation much more affordable for small businesses."
  },
  {
    "type": "heading",
    "id": "3-empowering-your-team",
    "text": "3. Empowering Your Team"
  },
  {
    "type": "paragraph",
    "text": "No-code tools make it possible for anyone in your business to contribute to creating digital solutions. You no longer need to rely on a tech team to build something for your marketing or operations departments. With no-code, even people without a technical background can design and launch apps or websites, making the whole process faster and more efficient."
  },
  {
    "type": "heading",
    "id": "4-flexible-and-scalable",
    "text": "4. Flexible and Scalable"
  },
  {
    "type": "paragraph",
    "text": "As your business grows, your needs will change. One of the best things about no-code is how flexible it is. You can easily update or expand your app as your business evolves, without needing to start from scratch. Whether you want to add new features or adjust to new customer needs, no-code lets you do that quickly."
  },
  {
    "type": "heading",
    "id": "5-real-life-success-stories",
    "text": "5. Real-Life Success Stories"
  },
  {
    "type": "paragraph",
    "text": "Take the example of a startup that used a no-code platform to build their Minimum Viable Product (MVP) in just a few weeks. By using no-code, they could launch faster, get feedback from their customers, and make improvements—all without spending a fortune on development. Their ability to move quickly gave them a competitive edge."
  },
  {
    "type": "heading",
    "id": "conclusion",
    "text": "Conclusion:"
  },
  {
    "type": "paragraph",
    "text": "No-code isn’t just a new tech trend—it’s a game-changer for businesses of all sizes. It’s making digital transformation faster, cheaper, and easier for everyone. With no-code, businesses can create the tools they need to grow, all without the headaches of traditional software development. If you want your business to thrive in today’s digital world, no-code is the perfect place to start."
  }
];

const post = {
  slug: "how-no-code-is-changing-digital-transformation-making-technology-easier-for-businesses",
  tag: "Business",
  tags: ["Business"],
  publishedAt: "2024-10-24",
  title: "How No-Code is Changing Digital Transformation: Making Technology Easier for Businesses",
  description: "Why no-code platforms let businesses of any size go digital without a big budget or a technical team \u2014 faster launches, lower costs, and teams that can build their own tools.",
  coverImage: "/blog/blog-cover-how-no-code-is-changing-digital-transformation-making-technology-easier-for-businesses.jpg",
  heroImage: "/blog/blog-hero-how-no-code-is-changing-digital-transformation-making-technology-easier-for-businesses.jpg",
  authorName: "Akbar Putra PAI",
  authorRole: "Studio Head at Paistudio",
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
