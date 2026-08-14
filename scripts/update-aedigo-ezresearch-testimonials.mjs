// Adds real testimonial quotes for AEdigo and Ez Research Solutions,
// provided directly by the user, with placeholder attribution (company-
// level "Team"/"Client", not a fabricated specific person's name) — per
// explicit request ("tampilkan testimonialnya aja. sementara nama dan
// rolenya bisa placeholder"). Ratings assumed 5/5 for both — both quotes
// read as fully positive, matching the same reasoning already confirmed
// for AEdigo's own rating; not independently confirmed for Ez Research
// Solutions, flagged in the completion message.
process.loadEnvFile(new URL("../.env.local", import.meta.url));
import { sql } from "@vercel/postgres";

const updates = [
  {
    slug: "aedigo",
    testimonial: {
      quote: "Akbar was great to work with. He has the knowledge to do anything we asked for. Definitely will work with him again.",
      author: "AEdigo Team",
      role: "Client",
      rating: 5,
    },
  },
  {
    slug: "ez-research-solutions",
    testimonial: {
      quote: "Akbar has an eye for UI/UX design. I really enjoy working with him!",
      author: "Ez Research Solutions Team",
      role: "Client",
      rating: 5,
    },
  },
];

for (const { slug, testimonial } of updates) {
  const { rowCount } = await sql`
    UPDATE work_project_details_v2
    SET testimonial = ${JSON.stringify(testimonial)}::jsonb
    WHERE slug = ${slug}
  `;
  console.log(`${slug}: ${rowCount} row(s) updated`);
}
