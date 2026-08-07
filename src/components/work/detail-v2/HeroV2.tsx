type HeroV2Props = {
  title: string;
  description: string;
};

/** Asymmetric editorial hero for the /work/v2/[slug] template: a huge,
 * bottom-aligned project title on the left, and a small top-aligned
 * "(Introduction)" label + 2-3 line description on the right — a
 * deliberately different visual language from v1's DetailHero (which puts
 * title + headline side by side at similarly large sizes).
 *
 * No scroll-reveal here (unlike most other sections on this page): same
 * reasoning as v1's DetailHero — this is always visible at scroll
 * position 0, so there's nothing to "reveal on scroll" into view. Needs no
 * hooks either way, so this stays a plain server component.
 */
export function HeroV2({ title, description }: HeroV2Props) {
  return (
    <section className="pai-container mx-auto w-full max-w-[1240px] px-10 pt-[130px] pb-14 max-[900px]:px-7 max-[560px]:px-5">
      <div className="grid grid-cols-[1.4fr_1fr] items-stretch gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-8">
        <div className="flex h-full flex-col justify-end">
          <h1 className="m-0 text-[clamp(56px,9vw,168px)] leading-[0.94] font-extrabold tracking-[-0.02em] text-text text-balance">
            {title}
          </h1>
        </div>
        <div className="flex flex-col gap-4 max-[900px]:pt-2">
          <span className="text-[13px] tracking-[0.04em] text-muted">(Introduction)</span>
          <p className="m-0 text-[18px] leading-[1.6] text-muted">{description}</p>
        </div>
      </div>
    </section>
  );
}
