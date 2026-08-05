type DetailHeroProps = {
  title: string;
  headline: string;
};

/** Large project title and a large descriptive headline, side by side.
 * Uses the same mount-once reveal as the /work index hero (animation-specs.md
 * §1 + §6): `pai-work-copy pai-armed pai-play` statically from initial
 * render, title and headline as its two staggered children (0.04s / 0.13s
 * delays), instead of the scroll-driven `data-fade`/`data-para` treatment
 * §1 reserves for the homepage's Hero specifically — this page's hero is
 * always visible at scroll position 0, same as /work's. */
export function DetailHero({ title, headline }: DetailHeroProps) {
  return (
    <section className="pai-container mx-auto w-full max-w-[1240px] px-10 pt-[130px] pb-20 max-[900px]:px-7 max-[560px]:px-5">
      <div className="pai-work-copy pai-armed pai-play grid grid-cols-2 gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-8">
        <h1 className="m-0 text-[70px] leading-[1.04] font-bold tracking-[-0.56px] text-text text-balance max-[900px]:text-[50px] max-[560px]:text-[36px]">
          {title}
        </h1>
        <p className="m-0 text-[64px] leading-[1.04] font-medium tracking-[-0.56px] text-text text-balance max-[900px]:text-[36px] max-[560px]:text-[28px]">
          {headline}
        </p>
      </div>
    </section>
  );
}
