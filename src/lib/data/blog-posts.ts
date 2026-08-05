import type { BlogPost } from "@/types/blog";

/** Up to `count` posts other than `slug`, for the article page's "Related
 * posts" grid — pulled from the same featured + grid pool the index page
 * uses, no separate related-posts data. */
export function getRelatedPosts(slug: string, count = 3): BlogPost[] {
  return [FEATURED_POST, ...BLOG_POSTS].filter((post) => post.slug !== slug).slice(0, count);
}

export const BLOG_CATEGORIES = ["All", "Product Strategy", "No-Code & AI", "Case Studies", "Founder Stories"];

export const FEATURED_POST: BlogPost = {
  slug: "shipping-mvps-in-two-weeks",
  tag: "Product Strategy",
  date: "Jul 28, 2026",
  title: "How we scope an MVP tight enough to ship in two weeks",
  description:
    "Most MVPs don't fail because of bad execution — they fail because the scope was never actually an MVP. Here's the scoping framework we run with every founder before a single screen gets designed.",
  coverImage: "/blog/blog-cover-shipping-mvps-in-two-weeks.jpg",
  author: { name: "Marcus Okafor", role: "Founder & Product Lead", hue: 0 },
  readTime: "6 min read",
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "no-code-vs-custom-code",
    tag: "No-Code & AI",
    date: "Jul 21, 2026",
    title: "No-code vs. custom code: the real tradeoffs founders don't hear about",
    description:
      "Bubble, Airtable, and n8n can take you further than most agencies admit. Here's how we decide what stays no-code and what needs a custom build.",
    coverImage: "/blog/blog-cover-no-code-vs-custom-code.jpg",
    author: { name: "Priya Raman", role: "Product Designer", hue: 1 },
    readTime: "5 min read",
  },
  {
    slug: "vela-analytics-case-study",
    tag: "Case Studies",
    date: "Jul 12, 2026",
    title: "Inside Vela: building a billing-aware dashboard in one sprint cycle",
    description:
      "A look at how we untangled usage data, Stripe billing, and account roles into a single customer-facing view for a subscription SaaS.",
    coverImage: "/blog/blog-cover-vela-analytics-case-study.jpg",
    author: { name: "Sittiporn Charoensrichai", role: "Engineering Lead", hue: 2 },
    readTime: "8 min read",
  },
  {
    slug: "hiring-a-fractional-product-team",
    tag: "Founder Stories",
    date: "Jul 3, 2026",
    title: "Why founders are choosing fractional product teams over agencies",
    description:
      "No middlemen, no 20-page proposals. What actually changes when the person you brief is the person building.",
    coverImage: "/blog/blog-cover-hiring-a-fractional-product-team.jpg",
    author: { name: "Marcus Okafor", role: "Founder & Product Lead", hue: 0 },
    readTime: "4 min read",
  },
  {
    slug: "ai-copilots-support-teams",
    tag: "No-Code & AI",
    date: "Jun 24, 2026",
    title: "Where AI copilots actually save support teams time (and where they don't)",
    description:
      "We shipped an AI triage agent for a support team drowning in tickets. Here's what worked, what didn't, and what we'd do differently.",
    coverImage: "/blog/blog-cover-ai-copilots-support-teams.jpg",
    author: { name: "Priya Raman", role: "Product Designer", hue: 1 },
    readTime: "7 min read",
  },
];
