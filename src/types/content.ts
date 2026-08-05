export type Project = {
  id: string;
  name: string;
  desc: string;
  skills: string[];
  /** 6 gallery slots; placeholder tiles for now, real screenshots can drop in later. */
  gallery: string[];
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
