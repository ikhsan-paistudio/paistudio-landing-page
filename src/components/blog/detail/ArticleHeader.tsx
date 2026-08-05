type ArticleHeaderProps = {
  tags: string[];
  title: string;
  date: string;
  readTime: string;
};

/** Centered article header: category pills (same `bg-pill` chip used
 * everywhere else), a large multi-line heading (same size/cascade as
 * DetailHero's title — 70/50/36px — better suited to a long, wrapping
 * article title than /work's punchier 100px h1), and a date/read-time
 * meta row.
 *
 * FLAGGED: the prompt asked for a "read-time indicator with icon" — no
 * clock/duration icon exists anywhere in the docs (the only established
 * icon is the small diagonal-arrow eyebrow used by CtaSection/Pricing/
 * FinalCtaFooter, a different concept). Rendered as text only, matching
 * how read time is already shown everywhere else (BlogAuthorRow), rather
 * than inventing new iconography. */
export function ArticleHeader({ tags, title, date, readTime }: ArticleHeaderProps) {
  return (
    <div className="pai-work-copy pai-armed pai-play mx-auto flex max-w-[900px] flex-col items-center gap-6 text-center">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full bg-pill px-3.5 py-1.5 text-[14px] text-text">
            {tag}
          </span>
        ))}
      </div>
      <h1 className="m-0 text-[70px] leading-[1.04] font-bold tracking-[-0.56px] text-text text-balance max-[900px]:text-[50px] max-[560px]:text-[36px]">
        {title}
      </h1>
      <div className="flex items-center gap-2 text-[12px] tracking-[0.04em] text-muted">
        <span>{date}</span>
        <span aria-hidden="true">&middot;</span>
        <span>{readTime}</span>
      </div>
    </div>
  );
}
