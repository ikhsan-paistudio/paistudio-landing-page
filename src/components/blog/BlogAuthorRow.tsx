import { AVATAR_HUES } from "@/lib/data/testimonials";
import type { BlogPostAuthor } from "@/types/blog";

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2);
}

type BlogAuthorRowProps = {
  author: BlogPostAuthor;
  /** Secondary line under the name — read time on index/related cards,
   * role on the article page's sidebar author card (see AuthorCard.tsx). */
  meta: string;
};

/** Author + meta row — same initials-avatar fallback as Testimonials
 * (32px, matching LetsTalkMenu's nav avatar size) + a middot-separated
 * meta line, no new avatar/typography treatment. */
export function BlogAuthorRow({ author, meta }: BlogAuthorRowProps) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-cream"
        style={{ background: AVATAR_HUES[author.hue % AVATAR_HUES.length] }}
      >
        {initialsOf(author.name)}
      </span>
      <div className="flex flex-col">
        <span className="text-[14px] font-semibold text-text">{author.name}</span>
        <span className="text-[12px] tracking-[0.04em] text-muted">{meta}</span>
      </div>
    </div>
  );
}
