import { BrainIcon, GaugeIcon, LightningIcon, ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr";

/** Fixed, closed set rather than a raw icon-name passthrough — keeps this
 * component's props plain data (serializable, no component references
 * crossing the props boundary) while still mapping each benefit to a
 * distinct, semantically-fitting Phosphor icon. Covers the 4 example
 * categories from the SEC-06 spec (efficiency gain, speed improvement,
 * error reduction, smarter decision-making) 1:1 — extend this map, not the
 * prop shape, if a page ever needs a benefit outside those 4 themes. */
const BENEFIT_ICONS = {
  efficiency: GaugeIcon,
  speed: LightningIcon,
  accuracy: ShieldCheckIcon,
  insight: BrainIcon,
} as const;

type BenefitIcon = keyof typeof BENEFIT_ICONS;

type Benefit = { icon: BenefitIcon; text: string; description: string };

type BusinessImpactSectionProps = {
  /** Large headline stating the core value prop, e.g. "The Real Business
   * Impact of [Product/Service]". */
  headline: string;
  /** 1–2 sentences beneath the headline — the broader benefit behind the
   * feature (time saved → operational leverage, reduced risk, scalable
   * growth), not just a restatement of what the product does. */
  intro: string;
  /** Exactly 3. `text` is short and punchy (3–6 words) — a benefit
   * statement, not a full sentence (e.g. "40% faster time to market", not
   * "Our product helps you get to market roughly 40% faster than
   * before"). `description` is a short supporting sentence underneath it
   * (what makes that benefit true). `icon` picks from `BENEFIT_ICONS`
   * above. Content rule: where possible each one should be traceable to a
   * real case in SEC-05 rather than standing alone as an unsupported
   * claim. */
  benefits: Benefit[];
};

/** SEC-06 · Business Impact. Centered headline → paragraph (no eyebrow
 * label — removed per request), then a 3-up grid of short benefit
 * statements below (originally 4-up — dropped to 3 on request, "buat
 * hanya jadi 3 cards"). Cards sit close together (`gap-4`, tighter than
 * the original `gap-6`) in a near-white shade (`#F7F7F5` — "shade warna
 * paling mendekati putih but not white", deliberately NOT `bg-cream`
 * anymore: this section has no background of its own, so it inherits the
 * page's plain white `--color-paper`, and a near-white card needs to sit
 * just barely off that white to still read as a card at all).
 *
 * Each card is exactly 2 groups (group A: icon only; group B: text only —
 * header + description) — this was already the structure, but centered
 * alignment made A and B read as one blended block instead of two
 * distinct ones; left-aligning everything (`items-start`, no `text-
 * center`) on request fixed that, since A (a small circle) and B (a full-
 * width text column) now visibly start from the same left edge as two
 * separate stacked pieces rather than each centering independently.
 * Both groups are sized to their own content — A (the icon) always was;
 * B (`flex-col gap-2`, no `flexGrow`) went through a couple of passes:
 * first stretched to fill the card's leftover height with `justify-
 * between` *inside itself* (pinning its own header to the group's top and
 * description to the group's bottom, `ValuePillarsSection`-style), then
 * simplified to just hug its own text with no stretching at all. The
 * `justify-between` that pins A to the very top of the card and B to the
 * very bottom now lives one level up, on the **card** itself — content-
 * fit groups, positioned by the parent, rather than a group stretching to
 * fill space on its own.
 *
 * Card is `aspect-square` (height:width locked to 1:1, on request) rather
 * than a `min-h` — the square's actual pixel size is whatever `grid-
 * cols-3`'s column width works out to, not a fixed value, so it stays
 * square at any container width.
 *
 * Icon circle is 64px (`h-16 w-16`, glyph at `size={32}`, bumped up on
 * request from an earlier smaller pass) and the header is 33px
 * (`font-bold`, up from 22px — 1.5×; an earlier pass tried a literal 2×
 * to 44px, walked back on correction: "naikin 0,5x aja. bukan 2"). The
 * 14px description stays the smallest element in the card by design, so
 * the visual hierarchy (icon → bold header → quiet supporting line) stays
 * intact. */
export function BusinessImpactSection({ headline, intro, benefits }: BusinessImpactSectionProps) {
  if (process.env.NODE_ENV !== "production" && benefits.length !== 3) {
    console.error(`BusinessImpactSection (SEC-06): expected exactly 3 benefits, got ${benefits.length}.`);
  }

  return (
    <section data-nav-bg="light" className="pai-container mx-auto w-full max-w-[1240px] px-10 py-20 max-[900px]:px-7 max-[560px]:px-5">
      <div className="flex flex-col items-center gap-5 text-center">
        <h2 className="m-0 max-w-[760px] text-[56px] leading-[1.04] font-bold tracking-[-0.56px] text-text text-balance max-[900px]:text-[40px] max-[560px]:text-[32px]">
          {headline}
        </h2>
        <p className="m-0 max-w-[620px] text-[18px] leading-[1.6] text-muted">{intro}</p>
      </div>

      <div className="mt-14 grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">
        {benefits.map((benefit, i) => {
          const Icon = BENEFIT_ICONS[benefit.icon];
          return (
            <div key={i} className="flex aspect-square flex-col items-start justify-between gap-5 rounded-[24px] bg-[#F7F7F5] px-6 py-8 text-left">
              {/* Group A: icon only */}
              <span aria-hidden="true" className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand/12 text-brand">
                <Icon size={32} weight="bold" />
              </span>

              {/* Group B: text only — header + description, sized to its own content (no flex-grow/justify-between stretching it to fill the square's leftover height). */}
              <div className="flex flex-col items-start gap-2">
                <p className="m-0 text-[33px] leading-[1.15] font-bold tracking-[-0.01em] text-text text-balance">{benefit.text}</p>
                <p className="m-0 text-[14px] leading-[1.5] text-muted text-balance">{benefit.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}