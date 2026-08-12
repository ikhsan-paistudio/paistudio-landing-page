type CaseStudy = {
  /** Real name, or an honest anonymization, e.g. "a Series A SaaS company". */
  clientLabel: string;
  problem: string;
  solution: string;
  /** One concrete metric or result. */
  outcome: string;
};

type ProofSectionProps = {
  /** 2-3 items. Content rule: never populate with placeholder/fabricated
   * metrics — if real case data isn't ready for a page yet, pass an empty
   * array and this component renders an honest "coming soon" state
   * instead. This component has no fallback case data of its own to fall
   * back on either way — nothing here could fabricate a metric even by
   * accident. */
  cases: CaseStudy[];
};

/** SEC-05 · Proof / Case Studies. New section (didn't exist on the
 * original site content) — evidence for claims made elsewhere on the
 * page. */
export function ProofSection({ cases }: ProofSectionProps) {
  return (
    <section data-nav-bg="light" className="pai-container mx-auto w-full max-w-[1240px] px-10 py-20 max-[900px]:px-7 max-[560px]:px-5">
      {cases.length === 0 ? (
        <div className="rounded-[24px] border border-ink/10 px-8 py-16 text-center">
          <p className="m-0 text-[16px] text-muted">Case studies coming soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-1">
          {cases.map((c) => (
            <div key={c.clientLabel} className="flex flex-col gap-4 rounded-[24px] bg-cream p-8">
              <span className="text-[13px] font-medium tracking-[0.04em] text-muted uppercase">{c.clientLabel}</span>
              <div>
                <span className="text-[12px] font-medium tracking-[0.1em] text-muted uppercase">Problem</span>
                <p className="m-0 mt-1 text-[15px] leading-[1.6] text-text">{c.problem}</p>
              </div>
              <div>
                <span className="text-[12px] font-medium tracking-[0.1em] text-muted uppercase">What we built</span>
                <p className="m-0 mt-1 text-[15px] leading-[1.6] text-text">{c.solution}</p>
              </div>
              <div className="mt-auto rounded-[16px] bg-paper px-4 py-3">
                <span className="text-[15px] font-medium text-brand">{c.outcome}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
