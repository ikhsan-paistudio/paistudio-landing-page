import type { NavLink } from "@/types/content";

export const BUILD_MENU: { whatWeBuild: NavLink[]; howWeBuildIt: NavLink[] } = {
  whatWeBuild: [
    { label: "SaaS & Web Apps", href: "#work" },
    { label: "Marketplace", href: "#work" },
    { label: "AI Products", href: "#work" },
    { label: "Automations", href: "#work" },
    { label: "Internal Tools", href: "#work" },
    { label: "MVP", href: "#work" },
  ],
  howWeBuildIt: [
    { label: "Bubble", href: "#" },
    { label: "n8n", href: "#" },
    { label: "Softr", href: "#" },
    { label: "Airtable", href: "#" },
    { label: "Lovable", href: "#" },
    { label: "Claude AI", href: "#" },
  ],
};

export const RESOURCES_MENU: NavLink[] = [
  { label: "Bubble Templates", href: "https://bubble.io/contributor/1622870269100x621246174266034400" },
  { label: "Bubble Plugins", href: "https://bubble.io/contributor/1622870269100x621246174266034400" },
  { label: "Blog", href: "/blog" },
  { label: "FAQs", href: "/faq" },
];

export const LETS_TALK_LINKS = {
  whatsapp: "https://wa.me/6288233443399",
  email: "mailto:hi@paistudio.co",
  scheduleCall:
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ05uOSQ6yl1esZXIC4E1tTxaHjO4J_gYaSvvfilV3L0884qFAars-E8LLeaXy5bkSBkVvXmpnAu?gv=true",
};

export const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: "What we build",
    links: [
      { label: "SaaS & Web App Development", href: "#" },
      { label: "Marketplace Development", href: "#" },
      { label: "AI Products", href: "#" },
      { label: "MVP Development", href: "#" },
      { label: "Automation Tools", href: "#" },
      { label: "Internal Tools Development", href: "#" },
    ],
  },
  {
    title: "Technologies",
    links: [
      { label: "Bubble", href: "#" },
      { label: "n8n", href: "#" },
      { label: "Softr", href: "#" },
      { label: "Airtable", href: "#" },
      { label: "Lovable", href: "#" },
      { label: "Claude AI", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Work", href: "#work" },
      { label: "Blog", href: "/blog" },
      { label: "Bubble Marketplace", href: "https://bubble.io/contributor/1622870269100x621246174266034400" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/appai" },
  { label: "LinkedIn", href: "https://linkedin.com/company/paistudio" },
  { label: "Bubble", href: "https://bubble.io" },
];
