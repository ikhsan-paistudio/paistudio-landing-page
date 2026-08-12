import { Fragment } from "react";

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2.5 7.3 5.5 10.3 11.5 3.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 3 11 11M11 3 3 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

type QualificationSectionProps = {
  /** Large heading, e.g. "Is this the right fit for you?" — matches the
   * header+subheader treatment every other section in this library uses
   * (BusinessImpactSection/ProcessSection's headline, FaqSection's
   * headline+intro), rather than this section's original bare `intro`
   * paragraph with no heading above it. */
  headline: string;
  /** Subheader — supporting paragraph under the headline. */
  intro: string;
  /** Column 1 header, e.g. "We're a Great Fit If". */
  goodFitHeader: string;
  /** Exactly 4. */
  goodFit: string[];
  /** Column 2 header, e.g. "Not the Right Fit If". */
  notGoodFitHeader: string;
  /** Exactly 4. Content rule: items must be concrete and self-diagnosable
   * by the reader (e.g. "you need this live in under a week"), not vague
   * soft-outs ("automation isn't a priority yet") that don't actually
   * filter anyone — a copywriting requirement for whoever fills this
   * prop, not something this component can check structurally. */
  notGoodFit: string[];
};

// No red/danger token exists in this project's design system (@theme only
// defines ink/paper/cream/text/muted/brand/deep/mint/pill — all
// green/neutral). Added as a one-off arbitrary value here, matching how
// other one-off colors are already used inline elsewhere in this codebase
// (e.g. Nav's `#767676`), rather than expanding the shared global tokens
// for a need only this component has so far.
const DANGER = "#dc2626";

/** SEC-08 · Qualification ("Right Fit" / "Not Right Fit").
 *
 * **On the "existing pricing comparison table" reference**: this site has
 * no such component — `src/components/Pricing.tsx` (the real homepage
 * pricing section) is tier cards with a single small green-check "Tag"
 * pill, not a row-based table with check/X columns. Rather than fabricate
 * a match to something that doesn't exist, this table is built fresh
 * using this project's own real established tokens: `--color-brand`
 * (green) for the check — there's no blue anywhere in this project's
 * palette, the same substitution `ProcessSection` already made for an
 * identical "blue" request — and the existing `DANGER` red for the X
 * (below; already used here before this table existed).
 *
 * Header block (headline + subheader) added on request, matching every
 * other section in this library ("put header and subheader like other
 * section in sec-08") — same large-heading scale (`text-[56px]`)
 * `BusinessImpactSection`/`ProcessSection` use, rather than this
 * section's original bare `intro` paragraph with no heading. Centered on
 * a follow-up request.
 *
 * **Layout redesigned from a 2-card grid into a real row-based table**:
 * one CSS Grid (`grid-cols-2`), header row first (bold, `bg-cream`
 * shaded) then exactly 4 content rows, each cell a direct grid child so
 * row heights — and therefore the horizontal divider lines
 * (`border-b border-ink/10`, omitted on the last row) — line up exactly
 * across both columns; a `border-l` on every right-column cell is the
 * vertical divider between the two columns. `overflow-hidden` on the
 * outer grid clips all of that into the container's own `rounded-[24px]`
 * corners rather than rounding each individual cell.
 *
 * Column headers are props (`goodFitHeader`/`notGoodFitHeader`), not
 * fixed component text — a page may reasonably want to phrase these
 * differently. `goodFit`/`notGoodFit` are both capped at exactly 4 rows
 * (spec: "maximum of 4 rows of content per column"). */
export function QualificationSection({
  headline,
  intro,
  goodFitHeader,
  goodFit,
  notGoodFitHeader,
  notGoodFit,
}: QualificationSectionProps) {
  if (process.env.NODE_ENV !== "production") {
    if (goodFit.length !== 4) {
      console.error(`QualificationSection (SEC-08): expected exactly 4 goodFit items, got ${goodFit.length}.`);
    }
    if (notGoodFit.length !== 4) {
      console.error(`QualificationSection (SEC-08): expected exactly 4 notGoodFit items, got ${notGoodFit.length}.`);
    }
  }

  const rowCount = Math.max(goodFit.length, notGoodFit.length);

  return (
    <section data-nav-bg="light" className="pai-container mx-auto w-full max-w-[1240px] px-10 py-20 max-[900px]:px-7 max-[560px]:px-5">
      <div className="mx-auto mb-12 flex max-w-[760px] flex-col items-center gap-[18px] text-center">
        <h2 className="m-0 text-[56px] leading-[1.04] font-bold tracking-[-0.56px] text-text text-balance max-[900px]:text-[40px] max-[560px]:text-[32px]">
          {headline}
        </h2>
        <p className="m-0 max-w-[640px] text-[18px] leading-[1.6] text-muted">{intro}</p>
      </div>

      <div className="grid grid-cols-2 overflow-hidden rounded-[24px] border border-ink/10">
        <div className="border-b border-ink/10 bg-cream px-8 py-5">
          <h3 className="m-0 text-[18px] font-bold tracking-[-0.01em] text-text">{goodFitHeader}</h3>
        </div>
        <div className="border-b border-l border-ink/10 bg-cream px-8 py-5">
          <h3 className="m-0 text-[18px] font-bold tracking-[-0.01em] text-text">{notGoodFitHeader}</h3>
        </div>

        {Array.from({ length: rowCount }).map((_, i) => {
          const isLast = i === rowCount - 1;
          return (
            <Fragment key={i}>
              <div className={`flex items-start gap-3 px-8 py-5 ${isLast ? "" : "border-b border-ink/10"}`}>
                {goodFit[i] && (
                  <>
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                      <CheckIcon />
                    </span>
                    <span className="text-[15px] leading-[1.5] text-text">{goodFit[i]}</span>
                  </>
                )}
              </div>
              <div className={`flex items-start gap-3 border-l border-ink/10 px-8 py-5 ${isLast ? "" : "border-b"}`}>
                {notGoodFit[i] && (
                  <>
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: DANGER }}
                    >
                      <CrossIcon />
                    </span>
                    <span className="text-[15px] leading-[1.5] text-text">{notGoodFit[i]}</span>
                  </>
                )}
              </div>
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
