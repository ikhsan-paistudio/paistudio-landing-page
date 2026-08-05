type BlogFilterTabsProps = {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
};

/** Pill-style tab/filter group — one active tab (filled `bg-pill`, the same
 * chip used for project tags on /work), the rest inactive (plain text,
 * `hover:bg-ink/8` matching LetsTalkMenu's light-theme link hover).
 * Controlled — `active`/`onChange` are owned by `BlogPageBody`, which also
 * filters the featured/grid cards by the same category so the tabs and the
 * posts they control can share one source of truth. */
export function BlogFilterTabs({ categories, active, onChange }: BlogFilterTabsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Filter posts by category">
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(category)}
            className={`cursor-pointer rounded-full px-3.5 py-1.5 text-[14px] transition-colors ${
              isActive ? "bg-pill text-text" : "text-muted hover:bg-ink/8 hover:text-text"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
