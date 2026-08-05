import type { FaqEntry } from "@/lib/content/faq";

type FaqAccordionItemProps = {
  entry: FaqEntry;
  isOpen: boolean;
  onToggle: () => void;
};

/** One accordion row. Collapsed: just the question + a thin "+" icon, no
 * background, separated from neighbors purely by vertical padding.
 * Expanded: the whole row (button + answer) gets a `bg-cream rounded-2xl`
 * background, the icon morphs into "–" (the vertical stroke scales to 0),
 * and the answer fades in below via `.pai-faq-panel`/`.pai-faq-answer`
 * (globals.css) — a CSS grid-rows 0fr→1fr trick so the height itself
 * animates smoothly without measuring `scrollHeight` in JS. */
export function FaqAccordionItem({ entry, isOpen, onToggle }: FaqAccordionItemProps) {
  const buttonId = `faq-question-${entry.slug}`;
  const panelId = `faq-panel-${entry.slug}`;

  return (
    <div className={`rounded-2xl transition-colors duration-300 ${isOpen ? "bg-cream" : "bg-transparent"}`}>
      <button
        type="button"
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-6 px-6 py-6 text-left"
      >
        <span className="text-[18px] font-semibold text-text text-balance">{entry.question}</span>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0 text-text">
          <path
            d="M3 9h12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M9 3v12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="origin-center transition-transform duration-300"
            style={{ transform: isOpen ? "scaleY(0)" : "scaleY(1)" }}
          />
        </svg>
      </button>

      <div id={panelId} role="region" aria-labelledby={buttonId} className={`pai-faq-panel${isOpen ? " pai-faq-open" : ""}`}>
        <div className="pai-faq-panel-inner">
          <div className="pai-faq-answer flex flex-col gap-3 px-6 pb-6">
            {entry.answerParagraphs.map((paragraph, i) => (
              <p key={i} className="m-0 text-[18px] leading-[1.6] text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
