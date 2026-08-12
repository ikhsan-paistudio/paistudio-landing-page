type ToolDeepDiveSectionProps = {
  toolName: string;
  /** 2-3 sentences, factual. */
  whatItIs: string;
  whyWeUseIt: string;
  /** Must be a real, specific trade-off of the named tool — not a
   * disguised sales pitch ("it's so good there's nothing to complain
   * about"). This component can't validate the *content* of the string,
   * only that it's always rendered, unconditionally and undimmed — never
   * hidden behind a toggle, never styled as smaller/lower-emphasis than
   * `whyWeUseIt`, so a weak or missing limitation is visibly obvious
   * rather than quietly de-emphasized. */
  limitations: string;
  whatWeBuildWithIt: string;
};

/** SEC-07 · Tool Deep-Dive.
 *
 * **Applies to tool pages ONLY** (Bubble, n8n, Softr, Airtable, Lovable,
 * Claude AI) — do NOT use on offering pages (SaaS & Web App Development,
 * Marketplace Development, AI Products, MVP Development, Automation
 * Tools, Internal Tools Development). This component has no way to
 * enforce that itself (page assembly/routing is out of this task's
 * scope) — flagging here for whoever wires up the 12 pages later.
 *
 * A genuinely new component, not a reskin of SEC-02/03/04's list
 * patterns — two-column strengths/limitations layout instead of a
 * numbered list or card grid, per spec.
 */
export function ToolDeepDiveSection({
  toolName,
  whatItIs,
  whyWeUseIt,
  limitations,
  whatWeBuildWithIt,
}: ToolDeepDiveSectionProps) {
  return (
    <section data-nav-bg="light" className="pai-container mx-auto w-full max-w-[1240px] px-10 py-20 max-[900px]:px-7 max-[560px]:px-5">
      <h2 className="m-0 mb-4 text-[36px] leading-[1.15] font-bold tracking-[-0.02em] text-text max-[560px]:text-[28px]">
        {toolName}
      </h2>
      <p className="m-0 mb-12 max-w-[760px] text-[18px] leading-[1.6] text-muted">{whatItIs}</p>

      <div className="grid grid-cols-2 gap-8 max-[900px]:grid-cols-1">
        <div className="rounded-[24px] bg-cream p-8">
          <span className="text-[12px] font-medium tracking-[0.1em] text-muted uppercase">Why we use it</span>
          <p className="m-0 mt-3 text-[16px] leading-[1.6] text-text">{whyWeUseIt}</p>
        </div>
        <div className="rounded-[24px] border border-ink/10 p-8">
          <span className="text-[12px] font-medium tracking-[0.1em] text-muted uppercase">Honest limitations</span>
          <p className="m-0 mt-3 text-[16px] leading-[1.6] text-text">{limitations}</p>
        </div>
      </div>

      <div className="mt-8">
        <span className="text-[12px] font-medium tracking-[0.1em] text-muted uppercase">
          What we typically build with it
        </span>
        <p className="m-0 mt-3 max-w-[760px] text-[16px] leading-[1.6] text-text">{whatWeBuildWithIt}</p>
      </div>
    </section>
  );
}
