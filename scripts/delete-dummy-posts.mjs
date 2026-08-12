// Deletes the 5 placeholder blog posts seeded by scripts/setup-blog-db.mjs
// (fictional authors: Marcus Okafor, Priya Raman, Sittiporn Charoensrichai)
// now that real migrated content (scripts/migrate-*.mjs) fully replaces
// them. Run with: node scripts/delete-dummy-posts.mjs
// Reads POSTGRES_URL from .env.local (gitignored, not committed).

process.loadEnvFile(new URL("../.env.local", import.meta.url));

const { sql } = await import("@vercel/postgres");

const DUMMY_SLUGS = [
  "shipping-mvps-in-two-weeks",
  "no-code-vs-custom-code",
  "vela-analytics-case-study",
  "hiring-a-fractional-product-team",
  "ai-copilots-support-teams",
];

for (const slug of DUMMY_SLUGS) {
  const { rowCount } = await sql`DELETE FROM blog_posts WHERE slug = ${slug}`;
  console.log(rowCount ? `Deleted: ${slug}` : `Not found (already gone): ${slug}`);
}

process.exit(0);
