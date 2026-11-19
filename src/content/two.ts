import type { ImageKey } from "./captions";
import { footerNav, nav, routes } from "./site";

/**
 * Design 2 (under /2). The wording is shared with Design 1 and stays in the other
 * files in this folder. This file holds only what differs: where Design 2 lives, and
 * which photograph it shows where. Design 2 uses its own set of photographs, the keys
 * that start with "two/", so that no picture appears in both designs.
 */

export const BASE = "/2";

/** A Design 1 address, as its Design 2 address. External and mail links pass through. */
export function two(href: string) {
  if (!href.startsWith("/")) return href;
  return href === "/" ? BASE : `${BASE}${href}`;
}

export const r2 = Object.fromEntries(Object.entries(routes).map(([k, v]) => [k, two(v)])) as {
  [K in keyof typeof routes]: string;
};

export const nav2 = nav.map((n) => ({ ...n, href: two(n.href) }));
export const footerNav2 = footerNav.map((n) => ({ ...n, href: two(n.href) }));

/** A link to the Design 2 contact form with the enquiry type already chosen. */
export function enquiry2(type: string) {
  return `${r2.contact}?type=${encodeURIComponent(type)}#enquiry`;
}

/** The homepage opening: one photograph for each lens of the SAGE Triad. */
export const lensPhoto: { lens: "Biology" | "Environment" | "Behaviour"; image: ImageKey; pos?: string }[] = [
  { lens: "Biology", image: "two/physio-figures", pos: "70% 50%" },
  { lens: "Environment", image: "two/mangalore-shell-lobby", pos: "62% 50%" },
  { lens: "Behaviour", image: "two/campus-court", pos: "40% 50%" },
];

/** Single photographs placed on pages. */
export const photo = {
  homeWho: "two/reef-frieze",
  homeFounder: "two/founder-park-group",
  discover: "two/zen-waiting",
  discoverWhy: "two/team-site-briefing",
  senses: "two/wave-waiting",
  work: "two/team-studio",
  founder: "two/founder-portrait",
  projectsLead: "two/campus-housing",
} as const satisfies Record<string, ImageKey>;

/** Projects shown in the homepage strip, by slug. */
export const homeProjects = ["mangalore", "kanakapura", "bengaluru-campus", "old-airport-road", "marc", "valley-view"];

/**
 * The photographs of each project in Design 2. An empty list means every photograph
 * we hold of that project is already in Design 1; the project is then shown in words.
 */
export const projectPhotos: Record<string, ImageKey[]> = {
  dwarka: [],
  mangalore: [
    "two/mangalore-shell-lobby",
    "two/mangalore-spiral",
    "two/mangalore-reception",
    "two/mangalore-sea-glass",
    "two/mangalore-turtle-wall",
  ],
  whitefield: ["two/whitefield-angel-desk", "two/whitefield-angel-swirl", "two/whitefield-rings"],
  kanakapura: [
    "two/kanakapura-waiting",
    "two/kanakapura-glass-corridor",
    "two/kanakapura-lotus-corridor",
    "two/kanakapura-procedure",
  ],
  "old-airport-road": ["two/reef-reception", "two/reef-frieze", "two/opd-floral-circle"],
  paediatric: ["two/paediatric-doors-ceiling"],
  "quiet-art": [
    "two/zen-waiting",
    "two/lotus-reception",
    "two/leaves-wall",
    "two/zen-orchid",
    "two/wave-waiting",
    "two/peacock-railing",
    "two/maple-wall",
    "two/flamingo-close",
  ],
  msap: ["two/msap-framed", "two/msap-aerial-green"],
  marc: ["two/marc-hall", "two/marc-seats", "two/marc-aisle", "two/marc-building-site"],
  "bengaluru-campus": [
    "two/campus-housing",
    "two/campus-garden",
    "two/library-wood",
    "two/campus-court",
    "two/classroom-red",
    "two/mini-theatre",
    "two/campus-law-school",
  ],
  "valley-view": ["two/valley-lotus-dining", "two/valley-rangoli-door", "two/valley-lobby", "two/valley-bedroom"],
  wgsha: ["two/wgsha-dining"],
  "chef-on-wheels": [],
  offices: ["two/office-artwork", "two/office-art-install", "two/office-texture-wall"],
};

/** One photograph for each chapter of the founder page. Null where artwork is used. */
export const chapterPhoto: Record<string, ImageKey | null> = {
  "business-leader": "two/valley-lobby-wide",
  scientist: "two/founder-seminar",
  designer: "two/founder-reviewing",
  writer: "two/founder-filmed",
  "dr-gutsy": null,
  global: "two/founder-craft-visit",
  lived: "two/founder-rain",
};

/** The photo gallery, one row for each kind of place. Titles follow the project names. */
export type Strip = { name: string; line: string; items: { image: ImageKey; title: string; note?: string }[] };

export const strips: Strip[] = [
  {
    name: "Healthcare",
    line: "Hospitals, wards, lobbies and the artwork made for them",
    items: [
      { image: "two/mangalore-shell-lobby", title: "Manipal Hospital, Mangalore", note: "Large sculptural reception installation." },
      { image: "two/mangalore-spiral", title: "Manipal Hospital, Mangalore", note: "Circular 3D wall installation at the reception." },
      { image: "two/reef-reception", title: "Manipal Hospital Bengaluru, OPD lobby", note: "Marine and coral artwork, seen in the lobby it was made for." },
      { image: "two/kanakapura-waiting", title: "Manipal Hospital, Kanakapura", note: "Water and koi artwork in a waiting area. With Spread." },
      { image: "two/kanakapura-glass-corridor", title: "Manipal Hospital, Kanakapura", note: "Water lily artwork along a corridor. With Spread." },
      { image: "two/whitefield-angel-desk", title: "Manipal Hospital, Whitefield", note: "Angel artwork in the consultation-room area." },
      { image: "two/opd-floral-circle", title: "Colourful floral installation in a lobby" },
      { image: "two/paediatric-doors-ceiling", title: "Paediatric floor", note: "Illustrated room numbers beneath the ceiling artwork." },
      { image: "two/zen-waiting", title: "Waiting room with a sand garden artwork" },
      { image: "two/wave-waiting", title: "Waiting area with wave and fish artwork" },
      { image: "two/lotus-reception", title: "Lotus relief beside a reception desk" },
      { image: "two/physio-figures", title: "Physiotherapy corridor", note: "Stretching figures that prompt people to move." },
    ],
  },
  {
    name: "Academic institutions",
    line: "Campuses, auditoriums, libraries and classrooms",
    items: [
      { image: "two/campus-housing", title: "Student housing, MAHE Bengaluru campus" },
      { image: "two/msap-framed", title: "Manipal School of Architecture and Planning", note: "With Purple Ink." },
      { image: "two/marc-hall", title: "MARC auditorium, Bengaluru campus", note: "The completed auditorium." },
      { image: "two/marc-seats", title: "MARC auditorium, Bengaluru campus" },
      { image: "two/campus-law-school", title: "Law school, MAHE Bengaluru campus" },
      { image: "two/library-wood", title: "Library reading corner" },
      { image: "two/classroom-red", title: "Classroom" },
      { image: "two/mini-theatre", title: "Mini theatre" },
      { image: "two/campus-court", title: "Sports courts, MAHE Bengaluru campus" },
    ],
  },
  {
    name: "Hospitality",
    line: "Restaurants, lobbies and guest rooms",
    items: [
      { image: "two/valley-lobby-wide", title: "Valley View, Manipal", note: "The lobby." },
      { image: "two/valley-lotus-dining", title: "Valley View dining room", note: "Purple Ink collaborated on the interiors." },
      { image: "two/valley-rangoli-door", title: "Rangoli, Valley View", note: "The doorway to the Indian restaurant." },
      { image: "two/valley-bedroom", title: "Valley View guest bedroom" },
      { image: "two/wgsha-dining", title: "WGSHA", note: "Overall project by Sundaram Architects." },
    ],
  },
  {
    name: "Offices",
    line: "Executive suites, lounges and boardrooms",
    items: [
      { image: "two/office-artwork", title: "MEMG corporate office", note: "Artwork in an executive suite." },
      { image: "two/office-art-install", title: "MEMG corporate office", note: "An artwork being set in place." },
      { image: "two/office-texture-wall", title: "MEMG corporate office", note: "Textured wall beside a lit glass panel." },
    ],
  },
  {
    name: "With teams on site",
    line: "The work, while it was being made",
    items: [
      { image: "two/team-studio", title: "Reviewing drawings with the design team" },
      { image: "two/team-site-briefing", title: "A site briefing with the project team" },
      { image: "two/team-site-materials", title: "Material samples laid out for review" },
      { image: "two/team-mosaic", title: "Checking a mosaic portrait wall on site" },
      { image: "two/founder-weaving", title: "Watching a weaver at a loom" },
      { image: "two/founder-craft-visit", title: "With a craftsman at a work table" },
    ],
  },
];

/** The project journey in Design 2: the same project at two stages. */
export const stages: { title: string; place: string; steps: { image: ImageKey; label: string; pos?: string }[] }[] = [
  {
    title: "MARC auditorium",
    place: "Bengaluru campus",
    steps: [
      { image: "two/marc-building-site", label: "Work in progress" },
      { image: "two/marc-hall", label: "Completed" },
    ],
  },
  {
    title: "The campus",
    place: "Bengaluru",
    steps: [
      { image: "two/team-site-campus", label: "Work in progress", pos: "50% 30%" },
      { image: "two/campus-housing-brick", label: "Completed" },
    ],
  },
];
