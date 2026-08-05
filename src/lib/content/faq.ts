import fs from "node:fs";
import path from "node:path";

export type FaqEntry = {
  slug: string;
  question: string;
  answerParagraphs: string[];
};

const FAQ_DIR = path.join(process.cwd(), "content", "faq");

/**
 * Reads every `.md` file in `content/faq/`, filename-sorted (e.g.
 * `01-...md` before `02-...md`), and parses each into a question + answer:
 * the file's only `# ` heading is the question, everything after it is the
 * answer, split into paragraphs on blank lines.
 *
 * No frontmatter/YAML — this is intentionally the simplest format that
 * still keeps content out of the code (one real file per question,
 * editable without touching a component). Node-only (uses `fs`), so only
 * call this from a Server Component.
 */
export function getFaqEntries(): FaqEntry[] {
  const filenames = fs
    .readdirSync(FAQ_DIR)
    .filter((name) => name.endsWith(".md"))
    .sort();

  return filenames.map((filename) => {
    const raw = fs.readFileSync(path.join(FAQ_DIR, filename), "utf-8");
    const [firstLine, ...rest] = raw.trim().split("\n");
    const question = firstLine.replace(/^#\s*/, "").trim();
    const answerParagraphs = rest
      .join("\n")
      .trim()
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    return {
      slug: filename.replace(/^\d+-/, "").replace(/\.md$/, ""),
      question,
      answerParagraphs,
    };
  });
}
