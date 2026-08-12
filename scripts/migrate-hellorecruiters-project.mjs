// Migrates the real case study at https://paistudio.co/project/hellorecruiters
// into the work_projects / work_project_details tables (see
// scripts/setup-work-db.mjs for the schema). Run with:
//   node scripts/migrate-hellorecruiters-project.mjs
//
// Content note: unlike the 6 existing seeded rows (Vela, Fleetly, Nova,
// Flowbase, Basecamp Ops, Driftly — clearly placeholder example case
// studies with invented client names and made-up metrics), this is a
// REAL client project scraped from the live site, so it's held to the
// stricter honesty bar the blog migrations already used: every fact below
// is either verbatim or a direct paraphrase of what paistudio.co actually
// says about this project. Two things are deliberately NOT fabricated to
// fit the schema:
//   - `numberedLists` only has 2 entries here (Features, Goals), not the
//     4 (Goals/Challenges/Solutions/Results) the placeholder rows have —
//     the source page never states real "Challenges" or quantified
//     "Results" for this project, and NumberedListGrid just .map()s
//     over whatever it's given (no hardcoded index), so 2 real lists
//     beats 4 with 2 invented ones.
//   - No work_project_details_v2 row. That template requires a
//     `testimonial` (quote/author/role/rating) — the source page has no
//     real client testimonial, and putting fabricated words in a real
//     client's mouth isn't something to do quietly. /work/v2/hellorecruiters
//     will 404 until a real quote exists (matches
//     work-project-details-v2.ts's own documented behavior for any slug
//     not listed there).
//
// `sections`/`breakImages` ARE exactly 4 and exactly 2 respectively,
// matching schema fields — app/work/[slug]/page.tsx hard-indexes
// project.sections[0..3] and project.breakImages[0..1], so those two
// counts aren't optional the way numberedLists's is.

process.loadEnvFile(new URL("../.env.local", import.meta.url));

const { sql } = await import("@vercel/postgres");

const slug = "hellorecruiters";

const project = {
  title: "HelloRecruiters — Recruiter Outreach Platform",
  description:
    "A web-based platform connecting job seekers directly with specialized recruiters in their field — skipping job boards and middlemen.",
  coverImage: "/work/hellorecruiters-cover.png",
  showcaseImages: ["/work/hellorecruiters-1.png", "/work/hellorecruiters-2.png", "/work/hellorecruiters-3.png"],
  tags: ["Website", "Dashboard", "Bubble.io"],
  badge: null,
};

// New row goes last in display order — after the 6 existing seeded rows
// (sort_order 0–5).
const { rows: existing } = await sql`SELECT COALESCE(MAX(sort_order), -1) AS max_order FROM work_projects`;
const sortOrder = existing[0].max_order + 1;

await sql`
  INSERT INTO work_projects (slug, title, description, cover_image, showcase_images, tags, badge, sort_order)
  VALUES (
    ${slug}, ${project.title}, ${project.description}, ${project.coverImage},
    ${project.showcaseImages}, ${project.tags}, ${project.badge}, ${sortOrder}
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    cover_image = EXCLUDED.cover_image,
    showcase_images = EXCLUDED.showcase_images,
    tags = EXCLUDED.tags,
    badge = EXCLUDED.badge;
`;
console.log("Seeded project:", slug);

const detail = {
  headline: "A platform where job seekers reach the recruiters who actually matter, directly.",
  sections: [
    {
      label: "Context",
      heading: "Job seekers stuck going through job boards and middlemen",
      body: "Job seekers looking for tech roles had no direct way to reach the recruiters actually hiring for their specific job function and industry — every application went through job boards and middlemen instead of a real inbox.",
    },
    {
      label: "Problem",
      heading: "No way to filter down to the recruiters who matter",
      body: "There was no way to identify which recruiters were actually relevant to a candidate's field, or to reach them directly — job seekers were sending applications into the void instead of to a specific person.",
    },
    {
      label: "Output",
      heading: "A platform connecting candidates directly to matching recruiters",
      body: "Built on Bubble.io, HelloRecruiters lets users filter their job preferences and instantly generate a tailored list of matching recruiters. With one payment, users send their profile to every relevant recruiter via email — skipping job boards and middlemen entirely.",
    },
    {
      label: "Outcome",
      heading: "Less manual outreach, more visibility into what happens next",
      body: "The platform automates hours of manual outreach into a single payment, follows up automatically after 7 days to check on progress, and offers a discount code to retry if there's no response — giving job seekers more control and visibility over a process that used to be a black box.",
    },
  ],
  numberedLists: [
    {
      title: "Features",
      items: [
        "Filter job preferences to generate a tailored recruiter list",
        "Send your profile to every matching recruiter with one payment",
        "Automatic 7-day follow-up email on your application status",
        "Discount code to retry the process if you don't hear back",
      ],
    },
    {
      title: "Goals",
      items: [
        "Let job seekers reach specialized recruiters directly",
        "Remove job boards and middlemen from the process",
        "Automate outreach that used to take hours manually",
        "Give candidates visibility into what happens after they apply",
      ],
    },
  ],
  breakImages: ["/work/hellorecruiters-1.png", "/work/hellorecruiters-2.png"],
};

await sql`
  INSERT INTO work_project_details (slug, headline, sections, numbered_lists, break_images)
  VALUES (
    ${slug}, ${detail.headline}, ${JSON.stringify(detail.sections)}::jsonb,
    ${JSON.stringify(detail.numberedLists)}::jsonb, ${detail.breakImages}
  )
  ON CONFLICT (slug) DO UPDATE SET
    headline = EXCLUDED.headline,
    sections = EXCLUDED.sections,
    numbered_lists = EXCLUDED.numbered_lists,
    break_images = EXCLUDED.break_images;
`;
console.log("Seeded v1 detail:", slug);

console.log("Done.");
process.exit(0);
