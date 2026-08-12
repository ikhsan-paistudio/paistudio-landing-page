type Tier = { name: string; price: string; description: string };

type PricingSectionProps = {
  mode: "tiers" | "explanation";
  tiers?: Tier[];
  explanation?: string;
};

/** SEC-09 · Pricing / Engagement Model (optional).
 *
 * **Site-wide toggle, not a per-page decision**: per spec this section
 * must be either present on every one of the 12 pages or absent from all
 * of them — never built for some pages and skipped on others. That's a
 * page-assembly-time decision (out of this task's scope, which is
 * components only); flagging here for whoever assembles the 12 pages.
 * Also spec'd as fully omittable from a page's render tree without
 * breaking layout — true here simply by virtue of being one ordinary
 * `<section>` among others; nothing else on a page depends on its
 * presence.
 *
 * Named `PricingSection` (not `Pricing`) to avoid colliding with the
 * existing unrelated `src/components/Pricing.tsx` (this site's own
 * homepage pricing section, a bespoke non-reusable component).
 *
 * `tiers`/`explanation` are both optional per the spec's own props
 * interface (not a discriminated union) — `mode` is what actually decides
 * which one renders; if the field that `mode` calls for happens to be
 * missing, this renders nothing for that half rather than throwing.
 */
export function PricingSection({ mode, tiers, explanation }: PricingSectionProps) {
  return (
    <section data-nav-bg="light" className="pai-container mx-auto w-full max-w-[1240px] px-10 py-20 max-[900px]:px-7 max-[560px]:px-5">
      {mode === "tiers" && tiers && tiers.length > 0 && (
        <div className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-1">
          {tiers.map((tier) => (
            <div key={tier.name} className="flex flex-col gap-3 rounded-[24px] border border-ink/10 p-8">
              <h3 className="m-0 text-[20px] font-medium tracking-[-0.01em] text-text">{tier.name}</h3>
              <span className="text-[28px] font-bold tracking-[-0.02em] text-text">{tier.price}</span>
              <p className="m-0 text-[15px] leading-[1.6] text-muted">{tier.description}</p>
            </div>
          ))}
        </div>
      )}
      {mode === "explanation" && explanation && (
        <p className="m-0 max-w-[720px] text-[18px] leading-[1.6] text-muted">{explanation}</p>
      )}
    </section>
  );
}
