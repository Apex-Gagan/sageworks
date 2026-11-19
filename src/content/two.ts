import type { ImageKey } from "./captions";
import { groups, journeys, type GalleryEntry } from "./gallery";
import { kinds } from "./projects";
import { footerNav, nav, routes } from "./site";

/**
 * Design 2 (under /2). The wording is shared with Design 1 and stays in the other
 * files in this folder. This file holds only what differs: where Design 2 lives, and
 * which photograph it shows where.
 *
 * Photographs. Design 2 has a set of its own, the keys that start with "two/". From
 * Design 1 it may use only the photographs Dr Shruti ticked in her image catalogues
 * (user's instruction, 19 November 2026); those are the ones listed in `gallery.ts`.
 * Her ticked photographs lead each project and each gallery strip, and the Design 2
 * set follows. The check at the foot of this file stops the build if any other
 * Design 1 photograph is used here.
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

/** Single photographs placed on pages. These stay Design 2's own. */
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
 * The photographs of each project in Design 2: the ones Dr Shruti ticked first, then
 * photographs from the Design 2 set.
 */
export const projectPhotos: Record<string, ImageKey[]> = {
  dwarka: ["hospitals/dwarka-building", "hospitals/dwarka-butterfly-lobby"],
  mangalore: [
    "hospitals/mangalore-shell-lobby",
    "hospitals/mangalore-spiral-reception",
    "two/mangalore-reception",
    "two/mangalore-sea-glass",
    "two/mangalore-turtle-wall",
  ],
  whitefield: [
    "hospitals/whitefield-lobby-rings",
    "hospitals/whitefield-angel-corridor",
    "two/whitefield-angel-desk",
    "two/whitefield-angel-swirl",
    "two/whitefield-rings",
  ],
  kanakapura: [
    "hospitals/kanakapura-waiting",
    "hospitals/kanakapura-lily-corridor",
    "two/kanakapura-glass-corridor",
    "two/kanakapura-lotus-corridor",
    "two/kanakapura-procedure",
  ],
  "old-airport-road": [
    "hospitals/lobby-artwork-4512",
    "hospitals/old-airport-road-entrance",
    "hospitals/opd-reception-floral",
    "two/reef-reception",
    "two/opd-floral-circle",
  ],
  paediatric: ["hospitals/paediatric-ceiling", "hospitals/paediatric-penguins", "two/paediatric-doors-ceiling"],
  "quiet-art": [
    "hospitals/jaipur-panels-corridor",
    "hospitals/organic-artwork-corridor",
    "hospitals/flamingo-corridor",
    "two/zen-waiting",
    "two/lotus-reception",
    "two/leaves-wall",
    "two/wave-waiting",
    "two/zen-orchid",
  ],
  msap: ["academic/msap-exterior", "academic/msap-aerial", "academic/msap-steps-dusk", "academic/msap-curved-terrace", "two/msap-framed"],
  marc: ["academic/marc-exterior", "academic/marc-auditorium", "two/marc-seats", "two/marc-aisle", "two/marc-hall"],
  "bengaluru-campus": [
    "academic/hostel-green",
    "academic/marena-field",
    "academic/library-stocked",
    "academic/classroom-gable",
    "two/campus-housing",
    "two/campus-garden",
    "two/library-wood",
    "two/mini-theatre",
  ],
  "valley-view": [
    "hospitality/valley-rangoli-restaurant",
    "hospitality/valley-cosmo",
    "hospitality/valley-red-lounge",
    "hospitality/valley-chevron-dining",
    "two/valley-lotus-dining",
    "two/valley-rangoli-door",
  ],
  wgsha: ["hospitality/wgsha-kitchen-red", "hospitality/wgsha-pastry-kitchen", "hospitality/wgsha-cafe", "hospitality/wgsha-hexagon"],
  "chef-on-wheels": ["hospitality/chef-van-serving", "founder/chef-on-wheels-kitchen"],
  offices: ["hospitality/office-suite", "hospitality/office-lounge", "hospitality/office-bedroom", "academic/boardroom-skylight", "two/office-artwork"],
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

/**
 * The photo gallery, one strip for each kind of place. Each strip opens with the
 * photographs Dr Shruti ticked (taken from `gallery.ts`, with her own titles and
 * notes) and continues with these from the Design 2 set.
 */
const more: Record<string, GalleryEntry[]> = {
  Healthcare: [
    { image: "two/reef-reception", title: "Manipal Hospital Bengaluru, OPD lobby", note: "The reception desk beneath the marine and coral artwork." },
    { image: "two/kanakapura-glass-corridor", title: "Manipal Hospital, Kanakapura", note: "Water lily artwork along a corridor. With Spread." },
    { image: "two/whitefield-angel-desk", title: "Manipal Hospital, Whitefield", note: "Angel artwork in the consultation-room area." },
    { image: "two/zen-waiting", title: "Waiting room with a sand garden artwork" },
    { image: "two/wave-waiting", title: "Waiting area with wave and fish artwork" },
    { image: "two/physio-figures", title: "Physiotherapy corridor", note: "Stretching figures that prompt people to move." },
  ],
  "Academic institutions": [
    { image: "two/campus-housing", title: "Student housing, MAHE Bengaluru campus" },
    { image: "two/marc-seats", title: "MARC auditorium, Bengaluru campus" },
    { image: "two/library-wood", title: "Library reading corner" },
    { image: "two/mini-theatre", title: "Mini theatre" },
    { image: "two/campus-court", title: "Sports courts, MAHE Bengaluru campus" },
  ],
  Hospitality: [
    { image: "two/valley-lobby-wide", title: "Valley View, Manipal", note: "The lobby." },
    { image: "two/valley-lotus-dining", title: "Valley View dining room", note: "Purple Ink collaborated on the interiors." },
    { image: "two/valley-rangoli-door", title: "Rangoli, Valley View", note: "The doorway to the Indian restaurant." },
  ],
  Kitchens: [],
  Offices: [
    { image: "two/office-artwork", title: "MEMG corporate office", note: "Artwork in an executive suite." },
    { image: "two/office-art-install", title: "MEMG corporate office", note: "An artwork being set in place." },
  ],
};

export type Strip = { name: string; line: string; items: GalleryEntry[] };

export const strips: Strip[] = [
  ...Object.keys(more).map((name) => ({
    name,
    line: kinds.find((k) => k.name === name)!.line,
    items: [...groups.find((g) => g.name === name)!.items, ...more[name]],
  })),
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

/**
 * The project journey: the same project at two stages. The two MARC pairs are the
 * ones Dr Shruti named in the catalogue; the campus pair is from the Design 2 set.
 */
export const stages: { title: string; place: string; steps: { image: ImageKey; label: string; pos?: string }[] }[] = [
  {
    title: "MARC auditorium",
    place: "Bengaluru campus",
    steps: [
      { image: "founder/site-auditorium", label: "Work in progress", pos: "50% 40%" },
      { image: "academic/marc-auditorium", label: "Completed" },
    ],
  },
  {
    title: "MARC auditorium, exterior",
    place: "Bengaluru campus",
    steps: [
      { image: "academic/marc-construction", label: "Work in progress", pos: "40% 60%" },
      { image: "academic/marc-exterior", label: "Completed" },
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

/* ------------------------------------------------------------------------------- */
/* Guard: from Design 1, only the photographs Dr Shruti ticked may be used here.    */

/** The photographs she ticked: everything in the Design 1 gallery and its journeys. */
export const ticked = new Set<ImageKey>([
  ...groups.flatMap((g) => g.items.map((i) => i.image)),
  ...journeys.flatMap((j) => j.stages.map((s) => s.image)),
]);

const used: ImageKey[] = [
  ...lensPhoto.map((l) => l.image),
  ...Object.values(photo),
  ...Object.values(projectPhotos).flat(),
  ...Object.values(chapterPhoto).filter((k): k is ImageKey => k !== null),
  ...strips.flatMap((s) => s.items.map((i) => i.image)),
  ...stages.flatMap((s) => s.steps.map((x) => x.image)),
];
const stray = used.filter((k) => !k.startsWith("two/") && !ticked.has(k));
if (stray.length) {
  throw new Error(`Design 2 uses Design 1 photographs that Dr Shruti did not tick: ${[...new Set(stray)].join(", ")}`);
}
