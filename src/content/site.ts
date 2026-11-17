/**
 * Site-wide data: routes, navigation, contact details and the five questions the
 * client set for phase 1. Page copy lives in the other files in this folder and comes
 * from "Sagework | Website Content Master" unless a line says otherwise.
 */

export const routes = {
  home: "/",
  discover: "/discover",
  founder: "/founder",
  senses: "/five-senses",
  education: "/simply-sage",
  research: "/research",
  work: "/work-with-sagework",
  contact: "/contact",
  gallery: "/gallery",
} as const;

/** Header navigation, in the order Dr Shruti listed the pages (questionnaire, Q24). */
export const nav = [
  { label: "Discover", href: routes.discover },
  { label: "Founder", href: routes.founder },
  { label: "Five Senses", href: routes.senses },
  { label: "Simply Sage & Dr Gutsy", href: routes.education },
  { label: "Research", href: routes.research },
  { label: "Work with Sagework", href: routes.work },
];

export const footerNav = [
  { label: "Discover Sagework", href: routes.discover },
  { label: "Founder", href: routes.founder },
  { label: "The Five Senses", href: routes.senses },
  { label: "Simply Sage and Dr Gutsy", href: routes.education },
  { label: "Research and evidence", href: routes.research },
  { label: "Work with Sagework", href: routes.work },
  { label: "Photo gallery", href: routes.gallery },
  { label: "Contact us", href: routes.contact },
];

export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "connect@sagework.in";

export const tagline = "Built on Biology. Integrated Through Systems. Scaled for Human Potential.";

/**
 * The five questions phase 1 of the website must answer, in the client's words
 * ("Non negotiables", point 4). They label the homepage sections.
 */
export const phaseOne = {
  who: "Who are we?",
  why: "Why are we here?",
  what: "What do we bring to you?",
  how: "How will we help you?",
  get: "What will you get by working with us?",
};

/** The three lenses and the colour each one carries (questionnaire, Q2 comment). */
export const lensColour = {
  Biology: { bg: "bg-sage", soft: "bg-mint", dot: "bg-sage", name: "Sage Green" },
  Environment: { bg: "bg-aqua", soft: "bg-aqua-soft", dot: "bg-aqua", name: "Aqua Balance" },
  Behaviour: { bg: "bg-amber", soft: "bg-cream", dot: "bg-amber", name: "Golden Amber" },
} as const;

export type LensName = keyof typeof lensColour;

/** A link to the contact form with the enquiry type already chosen. */
export function enquiryHref(type: string) {
  return `${routes.contact}?type=${encodeURIComponent(type)}#enquiry`;
}
