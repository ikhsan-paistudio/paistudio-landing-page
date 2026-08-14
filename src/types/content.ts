/** One tile in a `Project.gallery` — `src` optional so a project can mix
 * real screenshots and still-placeholder slots (e.g. 5 real + 1
 * placeholder while the 6th shot isn't ready yet). `label` is the slot
 * number shown on placeholder tiles only (`GalleryTile` drops it once a
 * real `src` is set — see that component's own comment). `alt` and
 * `brandColor` only matter alongside `src`; ignored on placeholder slots.
 * `brandColor` is the full-saturation brand/accent color extracted from
 * that specific screenshot (a `#rrggbb` hex) — `GalleryTile` tints it
 * down to a light background wash at render time (see
 * `BRAND_TINT_RATIO` in WorkGallery.tsx), it's not pre-mixed here so the
 * tint ratio stays a single adjustable constant instead of baked into
 * every value in this file. */
export type ProjectGalleryTile = { label: string; src?: string; alt?: string; brandColor?: string };

export type Project = {
  id: string;
  name: string;
  desc: string;
  skills: string[];
  /** 6 gallery slots; placeholder tiles by default, real screenshots can
   * drop in per-slot via `src` (see `ProjectGalleryTile`). */
  gallery: ProjectGalleryTile[];
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatarSrc?: string;
};

export type NavLink = {
  label: string;
  href: string;
};
