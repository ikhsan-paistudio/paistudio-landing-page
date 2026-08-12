// One-off migration: work_project_details_v2.testimonial was NOT NULL —
// now that this template is becoming the primary /work/[slug] page (was
// only reachable at /work/v2/[slug], gated to projects with a real client
// testimonial), most projects won't have one. Rather than fabricate a
// quote for every project without one, the testimonial block itself
// becomes optional (see TestimonialSkillsSection.tsx's conditional
// render) — this drops the NOT NULL constraint to match. Run with:
//   node scripts/alter-work-v2-nullable-testimonial.mjs

process.loadEnvFile(new URL("../.env.local", import.meta.url));

const { sql } = await import("@vercel/postgres");

await sql`ALTER TABLE work_project_details_v2 ALTER COLUMN testimonial DROP NOT NULL;`;
console.log("testimonial column is now nullable.");
process.exit(0);
