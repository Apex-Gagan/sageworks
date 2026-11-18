import type { ImageKey } from "./captions";

/**
 * The Projects page.
 *
 * Project names, places, themes and credits come from the client's material: the
 * "Images for website" brief, her project list and her comments in the image
 * catalogues. The descriptive sentences (`body`) and the page's headings were written
 * by us, with her permission to use generated copy on this page; they stay close to
 * what her notes say about each project and are listed for her approval in CLAUDE.md.
 *
 * Each kind of place carries one colour (questionnaire, Q10: "one colour per project
 * type"). Sage, amber and aqua are the primary colours; peach and periwinkle are from
 * the manual's secondary palette.
 */

export type Kind = "Healthcare" | "Hospitality" | "Academic institutions" | "Kitchens" | "Offices";

export const kinds: { name: Kind; dot: string; soft: string; line: string }[] = [
  { name: "Healthcare", dot: "bg-sage", soft: "bg-mint", line: "Hospitals, wards, lobbies and the artwork made for them" },
  { name: "Academic institutions", dot: "bg-aqua", soft: "bg-aqua-soft", line: "Campuses, auditoriums, libraries and classrooms" },
  { name: "Hospitality", dot: "bg-amber", soft: "bg-cream", line: "Restaurants, cafes and lounges" },
  { name: "Kitchens", dot: "bg-peach", soft: "bg-peach-soft", line: "Training kitchens and a kitchen that travels" },
  { name: "Offices", dot: "bg-periwinkle", soft: "bg-periwinkle-soft", line: "Executive suites, lounges and boardrooms" },
];

export type Project = {
  slug: string;
  title: string;
  place: string;
  kind: Kind;
  /** The design idea in a few words, in the client's words where she gave them. */
  theme: string;
  body: string;
  credit?: string;
  /** The first photograph leads; the rest follow in the mosaic and the viewer. */
  images: ImageKey[];
  /** Where to read or watch more, on the collaborator's own page. Opens in a new tab. */
  links?: ProjectLink[];
};

export type ProjectLink = { kind: "story" | "film"; label: string; by: string; href: string };

export const projects: Project[] = [
  {
    slug: "dwarka",
    title: "Manipal Hospital, Dwarka",
    place: "New Delhi",
    kind: "Healthcare",
    theme: "Kites, flowers and taking flight",
    body: "A facade mural of kites, birds and flowers gives a large hospital a message of hope before anyone steps inside. In the lobby, many small butterflies gather into one.",
    credit: "Facade mural developed with Earthen Symphony. With Planners Group and Studio Basic Design.",
    images: ["hospitals/dwarka-facade-kites", "hospitals/dwarka-building", "hospitals/dwarka-butterfly-lobby"],
    links: [
      {
        kind: "film",
        label: "Watch the paediatric waiting area ceiling",
        by: "Madhu Chandrika on Instagram",
        href: "https://www.instagram.com/reel/DMhDizyimaV/",
      },
    ],
  },
  {
    slug: "mangalore",
    title: "Manipal Hospital, Mangalore",
    place: "Mangalore",
    kind: "Healthcare",
    theme: "Swirls and coral reefs",
    body: "A coastal hospital that borrows from the sea. A nautilus reception desk sits before a wave mosaic, the marble reads as water, and a spiral of reef colours carries a sculpted turtle.",
    credit: "With RSP Design Consultants.",
    images: [
      "hospitals/mangalore-shell-lobby",
      "hospitals/mangalore-spiral-reception",
      "hospitals/mangalore-rainbow-panel",
      "hospitals/mangalore-shell-close",
      "hospitals/mangalore-spiral-turtle",
    ],
  },
  {
    slug: "whitefield",
    title: "Manipal Hospital, Whitefield",
    place: "Bengaluru",
    kind: "Healthcare",
    theme: "Angels and the circle of life",
    body: "Flying angels follow gold ribbons through waiting rooms and corridors. The colours stay muted, gold, beige and earth, so the art can be looked at for a long time.",
    credit: "With RSP Design Consultants.",
    images: [
      "hospitals/whitefield-lobby-rings",
      "hospitals/whitefield-lobby-lights",
      "hospitals/whitefield-angel-corridor",
      "hospitals/whitefield-angel-wave",
    ],
  },
  {
    slug: "kanakapura",
    title: "Manipal Hospital, Kanakapura",
    place: "Bengaluru",
    kind: "Healthcare",
    theme: "Water, koi and lilies",
    body: "A series of paintings runs through the corridors, lift lobbies and waiting areas: koi circling in rippled water, lily pads and lotus in bloom. Wherever people pause, there is water to look at.",
    credit: "Artwork with Spread. With RSP Design Consultants.",
    images: [
      "hospitals/kanakapura-waiting",
      "hospitals/kanakapura-lily-corridor",
      "hospitals/kanakapura-corridor",
      "hospitals/kanakapura-lift-lobby",
    ],
  },
  {
    slug: "old-airport-road",
    title: "Manipal Hospital, Old Airport Road",
    place: "Bengaluru",
    kind: "Healthcare",
    theme: "Circle of life",
    body: "Series of artworks and single pieces were made for the hospital over almost a year, each a new reading of one idea: the circle of life. Birds, butterflies, fish and trees appear in many materials, led by one long artwork in marine and coral colours above the outpatient reception.",
    credit: "Artworks with Earthen Symphony. With RSP Design Consultants.",
    images: ["hospitals/lobby-artwork-4512", "hospitals/old-airport-road-entrance", "hospitals/opd-reception-floral"],
    links: [{ kind: "story", label: "Read the story: Circle of Life", by: "Earthen Symphony", href: "https://earthensymphony.com/blogs/articles/manipal-hospital-bangalore-circle-of-life" }],
  },
  {
    slug: "paediatric",
    title: "The Garden Above",
    place: "Paediatrics Department, Manipal Hospital Bengaluru",
    kind: "Healthcare",
    theme: "A sky garden for children",
    body: "The ceiling of the paediatric section is a canopy of flowers, butterflies and leaves, and each room number carries an animal. Penguins, macaws and butterflies keep children company along the corridors, so a hospital stay has something gentle to follow.",
    credit: "Ceiling and room numbers with Earthen Symphony.",
    images: [
      "hospitals/paediatric-ceiling",
      "hospitals/paediatric-doors-numbers",
      "hospitals/paediatric-penguins",
      "hospitals/paediatric-doors",
      "hospitals/butterfly-water",
      "hospitals/macaws",
    ],
    links: [{ kind: "story", label: "Read the story: The Garden Above", by: "Earthen Symphony", href: "https://earthensymphony.com/blogs/articles/manipal-hospitals-bangalore-the-garden-above" }],
  },
  {
    slug: "quiet-art",
    title: "Artwork for waiting and quiet",
    place: "Lobbies, corridors and waiting areas",
    kind: "Healthcare",
    theme: "Nature in place of religious imagery",
    body: "These pieces sit where people wait. Framed nature panels make a quiet room where anyone can sit in silence or pray, organic forms run along a corridor, and lotus, sand gardens and flamingos keep the seating company. In the dental department, painted teeth and dentist silhouettes make a wall about dentistry and craft.",
    credit: "Murals with Earthen Symphony. Dental department wall by Madhu Chandrika with Earthen Symphony.",
    images: [
      "hospitals/jaipur-panels-corridor",
      "hospitals/organic-artwork-corridor",
      "hospitals/lotus-relief-waiting",
      "hospitals/zen-corridor",
      "hospitals/flamingo-corridor",
      "hospitals/jaipur-tree-lobby",
      "hospitals/dental-smile",
    ],
    links: [
      {
        kind: "film",
        label: "Watch the dental department wall",
        by: "Madhu Chandrika and Earthen Symphony on Instagram",
        href: "https://www.instagram.com/reel/DRWFEL9gnkl/",
      },
    ],
  },
  {
    slug: "msap",
    title: "Manipal School of Architecture and Planning",
    place: "Manipal",
    kind: "Academic institutions",
    theme: "A campus on a hillside",
    body: "A studio building that steps down a green hillside, with a brick sweep at its entrance, open terraces and a courtyard where students gather.",
    credit: "With The Purple Ink Studio.",
    images: [
      "academic/msap-exterior",
      "academic/msap-aerial",
      "academic/msap-steps-dusk",
      "academic/msap-curved-terrace",
      "academic/msap-courtyard",
    ],
  },
  {
    slug: "marc",
    title: "MARC auditorium",
    place: "MAHE Bengaluru campus",
    kind: "Academic institutions",
    theme: "Rings of colour",
    body: "A ringed drum of orange and ochre outside, and a ribbed, warmly lit hall inside. The photographs follow it from scaffolding to the finished room.",
    credit: "With The Purple Ink Studio and Sundaram Architects.",
    images: ["academic/marc-exterior", "academic/marc-auditorium", "academic/marc-auditorium-stage", "academic/marc-construction"],
  },
  {
    slug: "bengaluru-campus",
    title: "MAHE Bengaluru campus",
    place: "Bengaluru",
    kind: "Academic institutions",
    theme: "Places to live, learn and play",
    body: "Student housing set around planted courtyards, a sports complex, libraries with reading corners and classrooms that keep the view. A campus followed from bare ground to daily use.",
    credit: "With The Purple Ink Studio and Sundaram Architects.",
    images: [
      "academic/hostel-green",
      "academic/marena-field",
      "academic/library-stocked",
      "academic/classroom-gable",
      "academic/library-reading",
      "academic/classroom-window",
      "academic/campus-white-building",
    ],
    links: [
      {
        kind: "film",
        label: "Watch Marena, the indoor sports complex",
        by: "MAHE Bengaluru on Instagram",
        href: "https://www.instagram.com/reel/C9wspE4y5mX/",
      },
    ],
  },
  {
    slug: "valley-view",
    title: "Valley View",
    place: "Manipal",
    kind: "Hospitality",
    theme: "Rangoli and Cosmo",
    body: "Rangoli, the Indian restaurant, has revamped floors and wall finishes, timber roof details and bell-jar pendant lights around a mural. Cosmo, the cafe, takes a cosmopolitan, carnival feel from imagery and lighting.",
    credit: "Interiors with The Purple Ink Studio. Mural with Earthen Symphony.",
    images: [
      "hospitality/valley-rangoli-restaurant",
      "hospitality/valley-cosmo",
      "hospitality/valley-red-lounge",
      "hospitality/valley-chevron-dining",
    ],
  },
  {
    slug: "wgsha",
    title: "WGSHA",
    place: "Manipal",
    kind: "Kitchens",
    theme: "A school that cooks",
    body: "Training kitchens on a red floor, an induction kitchen for baking, a cafe at the entrance where cakes are displayed and collected, and an atrium wall of hexagons.",
    credit: "Overall project by Sundaram Architects. Hexagonal wall mural by Earthen Symphony.",
    images: [
      "hospitality/wgsha-kitchen-red",
      "hospitality/wgsha-pastry-kitchen",
      "hospitality/wgsha-kitchen-steel",
      "hospitality/wgsha-cafe",
      "hospitality/wgsha-hexagon",
    ],
  },
  {
    slug: "chef-on-wheels",
    title: "Chef on Wheels",
    place: "Manipal",
    kind: "Kitchens",
    theme: "A kitchen that travels",
    body: "Founded and scaled at Manipal Resorts into a catering operation delivering approximately 110,000 meals a day. Shown here at the first food truck launch in Manipal.",
    images: ["hospitality/chef-van-serving", "founder/chef-on-wheels-kitchen", "hospitality/chef-van-team"],
  },
  {
    slug: "offices",
    title: "MEMG corporate office",
    place: "Bengaluru",
    kind: "Offices",
    theme: "Hospitality within an office",
    body: "An executive lounge of Dr Shruti's own design, a guest suite that brings hospitality-style accommodation into a corporate office, and a boardroom beneath a lit ceiling. In the reception lobby, an artwork of poppies in deep copper takes its colour from the Manipal logo.",
    credit: "With Blink. Poppies artwork with Earthen Symphony.",
    images: ["hospitality/office-suite", "hospitality/office-lounge", "hospitality/office-bedroom", "academic/boardroom-skylight"],
    links: [{ kind: "story", label: "Read the story: Poppies", by: "Earthen Symphony", href: "https://earthensymphony.com/blogs/articles/memg-corporate-office-bangalore-poppies" }],
  },
];

/**
 * Films of the work, made and posted by the artists and the campus (links supplied by
 * Dr Shruti, 18 November 2026). They play from Instagram, and only when a visitor
 * presses play. `embed` is false where Instagram does not allow the reel to play on
 * other sites; that card opens Instagram instead. Posters are our own photographs.
 */
export const films: {
  id: string;
  title: string;
  place: string;
  by: string;
  embed: boolean;
  poster: ImageKey;
}[] = [
  {
    id: "DMhDizyimaV",
    title: "A lake overhead",
    place: "Paediatric OPD waiting area, Manipal Hospital, Delhi",
    by: "Madhu Chandrika",
    embed: true,
    poster: "hospitals/dwarka-butterfly-lobby",
  },
  {
    id: "DRWFEL9gnkl",
    title: "Dentistry and craft",
    place: "Manipal Dental Department",
    by: "Madhu Chandrika and Earthen Symphony",
    embed: true,
    poster: "hospitals/dental-smile",
  },
  {
    id: "C9wspE4y5mX",
    title: "Marena",
    place: "Indoor sports complex, MAHE Bengaluru",
    by: "MAHE Bengaluru",
    embed: false,
    poster: "academic/marena-field",
  },
];

export const projectsPage = {
  eyebrow: "Projects",
  lead: "Hospitals, campuses, kitchens, restaurants and offices, shaped with architects, artists and the teams who run them.",
  quote: "The environment is not simply the setting in which health happens. It is one of the inputs shaping it.",
  listTitle: "Every project",
  listLead: "The full list, with the architects and studios each was made with.",
};

/** Project index, from the client's categorised list. */
export const index: { group: string; items: { name: string; with?: string }[] }[] = [
  {
    group: "Hospitals and clinics",
    items: [
      { name: "KMC Hospital", with: "RSP" },
      { name: "Millers Road Hospital", with: "Innovate, Designovate" },
      { name: "Rajarhat Hospital", with: "Designovate" },
      { name: "Whitefield Clinic", with: "RSP" },
      { name: "Jaipur Hospital", with: "RKA" },
      { name: "Goa Hospital", with: "RSP" },
      { name: "Koramangala Clinic", with: "The Design Room" },
      { name: "Airport Road, Bengaluru", with: "RSP" },
      { name: "Nephrology, Bengaluru", with: "RSP" },
      { name: "Dwarka Hospital", with: "Planners Group, Studio Basic Design" },
      { name: "Manipal Klang, Malaysia", with: "Art et Domain" },
      { name: "Mangalore Hospital", with: "RSP" },
      { name: "Whitefield Hospital", with: "RSP" },
      { name: "Yelahanka Hospital", with: "RSP" },
      { name: "Kanakpura Hospital", with: "RSP" },
      { name: "Udupi Hospital", with: "Innovate" },
      { name: "Mumbai Hospital", with: "Designovate" },
      { name: "Electronic City Hospital", with: "Designovate" },
      { name: "Manipal Hospice", with: "Purple Ink" },
    ],
  },
  {
    group: "Universities",
    items: [
      { name: "MAHE, Manipal campus", with: "Purple Ink" },
      { name: "Manipal School of Architecture and Planning", with: "Purple Ink" },
      { name: "Culinary School", with: "Sundaram" },
      { name: "WGSHA", with: "Sundaram" },
      { name: "MAHE, Bengaluru campus", with: "Purple Ink, Sundaram" },
      { name: "MARC Auditorium, Bengaluru" },
      { name: "Malaysia University" },
    ],
  },
  {
    group: "Hospitality and offices",
    items: [
      { name: "Manipal County" },
      { name: "Valley View", with: "Purple Ink" },
      { name: "Chef on Wheels" },
      { name: "MEMG offices", with: "Blink" },
    ],
  },
];

export const collaborators = [
  "RSP Design Consultants",
  "The Purple Ink Studio",
  "Sundaram Architects",
  "Designovate",
  "Ashtadik",
  "Earthen Symphony",
  "Spread",
  "Blink",
  "RKA",
  "Planners Group",
  "Studio Basic Design",
  "The Design Room",
  "Art et Domain",
];

