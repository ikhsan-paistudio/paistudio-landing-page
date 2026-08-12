// One-off migration: pulls the real, published post at
// https://paistudio.co/blog/the-best-practice-for-structuring-groups-and-data-sources-in-bubble-io
// (the actual production Paistudio site — a separate Framer-hosted site,
// not this Next.js app) into the blog_posts table. Content is extracted
// verbatim from that page's own HTML, including its 5 inline Bubble-editor
// screenshots (downloaded to public/blog/) as real `image` blocks. One
// genuinely nested list in the source ("Page → Data Type: User" / "Inside
// the page:" containing a sub-list of 2 child groups) got hand-flattened
// into 2 list items since this schema's list block has no nesting — every
// fact preserved, the automated Framer-structure parser just can't
// represent nested <ul> on its own.
//
// Author "Lukman Indro" (Bubble Developer) is a fourth distinct real
// person from this site's other migrated posts; reuses author_hue 0
// (only 3 hue values exist in AVATAR_HUES — Orleans Bowie also has 0).
//
// Run with: node scripts/migrate-the-best-practice-for-structuring-groups-and-data-sources-in-bubble-io-post.mjs
// Reads POSTGRES_URL from .env.local (gitignored, not committed).

process.loadEnvFile(new URL("../.env.local", import.meta.url));

const { sql } = await import("@vercel/postgres");

const toc = [
  {
    "id": "understanding-how-data-flows-in-bubble",
    "label": "Understanding How Data Flows in Bubble"
  },
  {
    "id": "the-common-problem-too-many-data-bindings",
    "label": "The Common Problem: Too Many Data Bindings"
  },
  {
    "id": "the-better-practice-centralize-data-context-at-the-parent-level",
    "label": "The Better Practice: Centralize Data Context at the Parent Level"
  },
  {
    "id": "step-by-step-example-product-list-page",
    "label": "Step-by-Step Example: Product List Page"
  },
  {
    "id": "conclusion",
    "label": "Conclusion"
  }
];

const body = [
  {
    "type": "paragraph",
    "text": "This article explains that pattern step-by-step."
  },
  {
    "type": "heading",
    "id": "understanding-how-data-flows-in-bubble",
    "text": "Understanding How Data Flows in Bubble"
  },
  {
    "type": "paragraph",
    "text": "Every Bubble element—whether it’s a Group, Repeating Group, Popup, or Reusable Element—has two important properties:"
  },
  {
    "type": "list",
    "items": [
      "Data Type → the type of thing the element expects (User, Product, Order, etc.)",
      "Data Source → where that data comes from (e.g., Search for Orders, Current User, or Parent group's Product)"
    ]
  },
  {
    "type": "paragraph",
    "text": "This system gives Bubble a lot of power, but it can also create clutter when used without a strategy."
  },
  {
    "type": "heading",
    "id": "the-common-problem-too-many-data-bindings",
    "text": "The Common Problem: Too Many Data Bindings"
  },
  {
    "type": "paragraph",
    "text": "Imagine you're building a User Profile page:"
  },
  {
    "type": "list",
    "items": [
      "Page → Data Type: User",
      "Inside the page: Group User Detail → Data Type: User, Group User Bank Account → Data Type: Bank Account"
    ]
  },
  {
    "type": "paragraph",
    "text": "Each child group often has its own data type and data source, typically set to something like:"
  },
  {
    "type": "list",
    "items": [
      "Parent group’s User",
      "Parent group’s Bank Account"
    ]
  },
  {
    "type": "paragraph",
    "text": "This works… until something changes."
  },
  {
    "type": "paragraph",
    "text": "For example, if the parent group's data type changes from User to Customer, or if your data now comes from an external API, you suddenly need to:"
  },
  {
    "type": "list",
    "items": [
      "Update every child group manually",
      "Reconfigure multiple data sources",
      "Hunt down broken expressions",
      "Debug empty data showing up for no obvious reason"
    ]
  },
  {
    "type": "paragraph",
    "text": "This creates:"
  },
  {
    "type": "list",
    "items": [
      "More clicks",
      "More risk",
      "More confusion"
    ]
  },
  {
    "type": "paragraph",
    "text": "There’s a better way."
  },
  {
    "type": "heading",
    "id": "the-better-practice-centralize-data-context-at-the-parent-level",
    "text": "The Better Practice: Centralize Data Context at the Parent Level"
  },
  {
    "type": "paragraph",
    "text": "The rule is simple:"
  },
  {
    "type": "paragraph",
    "text": "Define the data type and data source only once, at the highest relevant parent group. Let all child groups inherit the data context."
  },
  {
    "type": "paragraph",
    "text": "This means:"
  },
  {
    "type": "list",
    "items": [
      "Only the parent group has a Data Type.",
      "Only the parent group has a Data Source.",
      "Child groups do not define their own Data Type or Data Source.",
      "Children simply reference their parent’s data when needed."
    ]
  },
  {
    "type": "paragraph",
    "text": "Benefits:"
  },
  {
    "type": "list",
    "items": [
      "Cleaner structure",
      "Fewer places to update when things change",
      "Faster workflows",
      "Less risk of breaking data bindings"
    ]
  },
  {
    "type": "paragraph",
    "text": "This pattern keeps your UI and workflows aligned around one central source of truth."
  },
  {
    "type": "heading",
    "id": "step-by-step-example-product-list-page",
    "text": "Step-by-Step Example: Product List Page"
  },
  {
    "type": "paragraph",
    "text": "Let’s walk through a real example."
  },
  {
    "type": "heading",
    "id": "step-1-create-the-repeating-group",
    "text": "Step 1: Create the Repeating Group"
  },
  {
    "type": "paragraph",
    "text": "Add a Repeating Group (RG) to your page."
  },
  {
    "type": "list",
    "items": [
      "Type of Content → Product",
      "Data Source → Search for Products"
    ]
  },
  {
    "type": "paragraph",
    "text": "Each RG cell now automatically holds a single current cell's Product."
  },
  {
    "type": "image",
    "src": "/blog/blog-body-the-best-practice-for-structuring-groups-and-data-sources-in-bubble-io-1.png",
    "alt": "Repeating Group configured with Type of Content Product and Data Source Search for Products"
  },
  {
    "type": "heading",
    "id": "step-2-add-a-wrapper-group-inside-the-repeating-group",
    "text": "Step 2: Add a Wrapper Group Inside the Repeating Group"
  },
  {
    "type": "paragraph",
    "text": "Inside the cell, add a Group named:"
  },
  {
    "type": "paragraph",
    "text": "[var]_product"
  },
  {
    "type": "paragraph",
    "text": "(Set “[var]” to your naming style, e.g., g_product.)"
  },
  {
    "type": "list",
    "items": [
      "Data Type → Product",
      "Data Source → Current cell’s Product",
      "This is now your data anchor for the entire cell."
    ]
  },
  {
    "type": "image",
    "src": "/blog/blog-body-the-best-practice-for-structuring-groups-and-data-sources-in-bubble-io-2.png",
    "alt": "Wrapper group inside the Repeating Group cell set to Data Type Product, Data Source Current cell's Product"
  },
  {
    "type": "heading",
    "id": "step-3-add-elements-inside-the-group",
    "text": "Step 3: Add Elements Inside the Group"
  },
  {
    "type": "paragraph",
    "text": "Inside [var]_product, add:"
  },
  {
    "type": "list",
    "items": [
      "Image (Product Image)",
      "Text fields (Product Name, Price)",
      "Icons or buttons (Edit, Delete)"
    ]
  },
  {
    "type": "paragraph",
    "text": "Do NOT set any data type or data source on these child groups or elements.They inherit data from [var]_product."
  },
  {
    "type": "image",
    "src": "/blog/blog-body-the-best-practice-for-structuring-groups-and-data-sources-in-bubble-io-3.png",
    "alt": "Elements added inside the wrapper group inheriting data from the parent"
  },
  {
    "type": "heading",
    "id": "step-4-bind-content-using-the-parent-group",
    "text": "Step 4: Bind Content Using the Parent Group"
  },
  {
    "type": "paragraph",
    "text": "For example:"
  },
  {
    "type": "list",
    "items": [
      "Image → [var]_product's Product Image",
      "Text → [var]_product's Product Name",
      "Text → [var]_product's Product Price:formatted"
    ]
  },
  {
    "type": "paragraph",
    "text": "Because all data comes from the parent wrapper group, nothing else needs configuration."
  },
  {
    "type": "image",
    "src": "/blog/blog-body-the-best-practice-for-structuring-groups-and-data-sources-in-bubble-io-4.png",
    "alt": "Binding image and text fields to the parent wrapper group's data"
  },
  {
    "type": "heading",
    "id": "step-5-workflow-example",
    "text": "Step 5: Workflow Example"
  },
  {
    "type": "paragraph",
    "text": "In a workflow—for example, clicking an Edit icon—use:"
  },
  {
    "type": "paragraph",
    "text": "[var]_product's Product as the reference."
  },
  {
    "type": "paragraph",
    "text": "You never need:"
  },
  {
    "type": "list",
    "items": [
      "Current cell’s Product",
      "Parent group's Product",
      "Additional data sources"
    ]
  },
  {
    "type": "paragraph",
    "text": "It’s all connected through your wrapper group."
  },
  {
    "type": "image",
    "src": "/blog/blog-body-the-best-practice-for-structuring-groups-and-data-sources-in-bubble-io-5.png",
    "alt": "Workflow referencing the wrapper group's Product instead of Current cell's Product"
  },
  {
    "type": "heading",
    "id": "conclusion",
    "text": "Conclusion"
  },
  {
    "type": "paragraph",
    "text": "By centralizing your data type and data source at the parent level—especially with a wrapper like [var]_product—you avoid unnecessary duplication and future-proof your app structure."
  },
  {
    "type": "paragraph",
    "text": "With this method:"
  },
  {
    "type": "list",
    "items": [
      "You rarely need Data Types on child groups",
      "You avoid micromanaging Data Sources",
      "Updating your data structure becomes faster and safer",
      "Debugging becomes dramatically easier"
    ]
  },
  {
    "type": "paragraph",
    "text": "And best of all:If you ever need to change the data type, you only change it in one place: the parent wrapper group.This simple discipline will save you hours of headaches and keep your Bubble app clean, predictable, and scalable."
  }
];

const post = {
  slug: "the-best-practice-for-structuring-groups-and-data-sources-in-bubble-io",
  tag: "Bubble Development",
  tags: ["Bubble Development"],
  publishedAt: "2025-11-14",
  title: "The Best Practice for Structuring Groups and Data Sources in Bubble.io",
  description: "A simple, scalable pattern for structuring Groups and Data Sources in Bubble.io \u2014 centralize the data type and data source at the parent group so child elements inherit it, with a step-by-step Product List page example.",
  coverImage: "/blog/blog-cover-the-best-practice-for-structuring-groups-and-data-sources-in-bubble-io.jpg",
  heroImage: "/blog/blog-hero-the-best-practice-for-structuring-groups-and-data-sources-in-bubble-io.jpg",
  authorName: "Lukman Indro",
  authorRole: "Bubble Developer",
  authorHue: 0,
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
