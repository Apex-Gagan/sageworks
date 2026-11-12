import type { ImageKey } from "./captions";

/**
 * Projects page content.
 *
 * There is no approved copy for this page yet. Project names, themes and
 * collaborator credits come from the client's "Images for website" notes;
 * the connecting sentences are placeholder copy for Dr Shruti to review.
 */

export type Category = "hospitals" | "academic" | "hospitality" | "workplaces";

export const categories: { id: Category; label: string; title: string; intro: string }[] = [
  {
    id: "hospitals",
    label: "Hospitals",
    title: "Hospital spaces, colour and art therapy",
    intro:
      "Facades, lobbies, corridors and wards where colour, artwork and wayfinding are treated as part of care.",
  },
  {
    id: "academic",
    label: "Academic",
    title: "Academic spaces",
    intro:
      "Campuses, studios, libraries and auditoriums designed around attention, movement and everyday learning.",
  },
  {
    id: "hospitality",
    label: "Food and hospitality",
    title: "Food and hospitality",
    intro:
      "Restaurants, training kitchens, hotel interiors and a mobile kitchen built to serve at scale.",
  },
  {
    id: "workplaces",
    label: "Workplaces",
    title: "Workplaces",
    intro: "Offices and executive suites where material, art and light do quiet work.",
  },
];

export type Project = {
  slug: string;
  title: string;
  place: string;
  category: Category;
  /** One or two words on the design idea, from the client's notes. */
  theme: string;
  body: string;
  credit?: string;
  images: ImageKey[];
};

export const projects: Project[] = [
  {
    slug: "mangalore",
    title: "Manipal Hospital, Mangalore",
    place: "Mangalore",
    category: "hospitals",
    theme: "Swirls and coral reefs",
    body: "A coastal hospital that borrows from the sea. A nautilus reception desk sits before a wave mosaic, marble reads as water, and a spiral of reef colours carries a sculpted turtle.",
    credit: "With RSP Design Consultants and Ashtadik",
    images: [
      "hospitals/mangalore-shell-lobby",
      "hospitals/mangalore-spiral-reception",
      "hospitals/mangalore-spiral-turtle",
      "hospitals/mangalore-shell-close",
      "hospitals/mangalore-sea-glass",
      "hospitals/mangalore-rainbow-panel",
    ],
  },
  {
    slug: "whitefield",
    title: "Manipal Hospital, Whitefield",
    place: "Bengaluru",
    category: "hospitals",
    theme: "Angels and the circle of life",
    body: "Flying angels follow gold ribbons through waiting rooms and corridors. The palette stays muted: gold, beige and earth, so the art can be looked at for a long time.",
    credit: "With RSP Design Consultants",
    images: [
      "hospitals/whitefield-lobby-rings",
      "hospitals/whitefield-angel-corridor",
      "hospitals/whitefield-angel-wave",
      "hospitals/whitefield-lobby-lights",
      "hospitals/whitefield-birds-sun",
      "hospitals/whitefield-angel-swirl",
    ],
  },
  {
    slug: "dwarka",
    title: "Manipal Hospital, Dwarka",
    place: "New Delhi",
    category: "hospitals",
    theme: "Kites, flowers and taking flight",
    body: "The facade carries kites, birds and flowers. Inside, many butterflies gather into one, and a Tree of Life honours organ, cornea and body donors.",
    credit: "With Planners Group and Studio Basic Design",
    images: [
      "hospitals/dwarka-facade-kites",
      "hospitals/dwarka-butterfly-lobby",
      "hospitals/tree-of-life",
      "hospitals/dwarka-building",
    ],
  },
  {
    slug: "installations",
    title: "Art installations in care settings",
    place: "Lobbies, OPDs and waiting areas",
    category: "hospitals",
    theme: "Large-scale artwork",
    body: "Peacocks, trees of birds, leaves in autumn colour and waves with fish. Each piece is placed where people wait, so the wall gives them somewhere to rest their attention.",
    credit: "Art installation with Earthen Symphony",
    images: [
      "hospitals/jaipur-peacock",
      "hospitals/reception-colour-frieze",
      "hospitals/jaipur-leaves",
      "hospitals/wave-waiting",
      "hospitals/opd-reception-floral",
      "hospitals/jaipur-frieze-pharmacy",
      "hospitals/jaipur-tree-birds",
      "hospitals/dental-smile",
      "hospitals/lotus-relief-reception",
      "hospitals/malaysia-mural",
    ],
  },
  {
    slug: "wards",
    title: "Wards, corridors and children's spaces",
    place: "Paediatrics, physiotherapy and inpatient floors",
    category: "hospitals",
    theme: "Movement, calm and play",
    body: "A corridor becomes a stretch guide. A ceiling becomes a jungle canopy. Sand gardens, flamingos and maple leaves give long walks a rhythm and waiting rooms a quieter pulse.",
    images: [
      "hospitals/paediatric-ceiling",
      "hospitals/physio-get-set-go",
      "hospitals/zen-waiting",
      "hospitals/flamingo-corridor",
      "hospitals/paediatric-doors-numbers",
      "hospitals/physio-figures",
      "hospitals/zen-orchid",
      "hospitals/paediatric-penguins",
      "hospitals/maple-wall",
      "hospitals/patient-room",
    ],
  },
  {
    slug: "msap",
    title: "Manipal School of Architecture and Planning",
    place: "Manipal",
    category: "academic",
    theme: "A campus on a hillside",
    body: "A studio building that steps down a green hillside, with a brick sweep at its entrance, open terraces and an amphitheatre at its centre.",
    credit: "With The Purple Ink Studio",
    images: [
      "academic/msap-aerial-mist",
      "academic/msap-exterior",
      "academic/msap-aerial",
      "academic/msap-interior-steps",
      "academic/msap-terrace-steps",
    ],
  },
  {
    slug: "marc",
    title: "MARC Auditorium",
    place: "MAHE Bengaluru campus",
    category: "academic",
    theme: "Rings of colour",
    body: "A ringed drum of orange and ochre outside, a ribbed timber room inside. Shown here from scaffolding to finished hall.",
    credit: "With The Purple Ink Studio and Sundaram Architects",
    images: [
      "academic/marc-auditorium",
      "academic/marc-exterior",
      "academic/marc-auditorium-stage",
      "academic/msap-curved-terrace",
      "academic/marc-construction",
    ],
  },
  {
    slug: "campus",
    title: "Learning environments",
    place: "Libraries, classrooms and campus buildings",
    category: "academic",
    theme: "Attention and movement",
    body: "Libraries with colour-coded shelving, classrooms that keep the view, terraced courtyards where students gather, and a law school atrium under a painted sky.",
    images: [
      "academic/msap-courtyard",
      "academic/library-shelves",
      "academic/law-atrium-sky",
      "academic/library-wood",
      "academic/msap-steps-dusk",
      "academic/classroom-window",
      "academic/library-reading",
      "academic/regenerative-facade",
      "academic/law-mural-court",
      "academic/marena-render",
    ],
  },
  {
    slug: "wgsha",
    title: "WGSHA",
    place: "Manipal",
    category: "hospitality",
    theme: "A school that cooks",
    body: "Training kitchens on a red floor, a cafe and bar, and an atrium wall of hexagons assembled from different pieces of metal.",
    credit: "With Sundaram Architects",
    images: [
      "hospitality/wgsha-hexagon",
      "hospitality/wgsha-kitchen-red",
      "hospitality/wgsha-cafe",
      "hospitality/wgsha-bar",
      "hospitality/wgsha-pastry-kitchen",
      "hospitality/wgsha-atrium",
    ],
  },
  {
    slug: "valley-view",
    title: "Valley View",
    place: "Manipal",
    category: "hospitality",
    theme: "Rangoli and Cosmo",
    body: "Rangoli opens through lotus doors beneath a timber roof, Cosmo is bright with yellow, and the lobby is set in chequered marble.",
    credit: "With The Purple Ink Studio. Artwork by Madhu.",
    images: [
      "hospitality/valley-rangoli-restaurant",
      "hospitality/valley-rangoli-door",
      "hospitality/valley-cosmo",
      "hospitality/valley-lobby-chandelier",
      "hospitality/valley-red-lounge",
      "hospitality/valley-chevron-dining",
      "hospitality/valley-lotus-dining",
      "hospitality/valley-convocation",
    ],
  },
  {
    slug: "chef-on-wheels",
    title: "Chef on Wheels",
    place: "Manipal",
    category: "hospitality",
    theme: "A kitchen that travels",
    body: "Founded and scaled at Manipal Resorts into a catering operation delivering approximately 110,000 meals a day.",
    images: [
      "hospitality/chef-van-team",
      "founder/chef-on-wheels-kitchen",
      "hospitality/chef-van-serving",
    ],
  },
  {
    slug: "offices",
    title: "Offices and executive suites",
    place: "MEMG and executive suites",
    category: "workplaces",
    theme: "Material and quiet",
    body: "Textured walls, framed craft and rooms that open to the city. Workplaces where the finish is part of how the day feels.",
    credit: "With Blink",
    images: [
      "hospitality/office-lounge",
      "hospitality/office-artwork",
      "academic/boardroom-skylight",
      "hospitality/office-texture-wall",
      "hospitality/office-suite",
      "hospitality/office-art-install",
    ],
  },
];

/** Site to space: construction beside the finished room. */
export const transformations: {
  title: string;
  before: ImageKey;
  after: ImageKey;
  beforeLabel: string;
  afterLabel: string;
}[] = [
  {
    title: "MARC Auditorium",
    before: "founder/site-auditorium",
    after: "academic/marc-auditorium",
    beforeLabel: "On site, under scaffolding",
    afterLabel: "The finished auditorium",
  },
  {
    title: "The auditorium drum",
    before: "academic/marc-construction",
    after: "academic/marc-exterior",
    beforeLabel: "Cladding going up",
    afterLabel: "The ringed facade",
  },
  {
    title: "The campus",
    before: "founder/site-foundation",
    after: "academic/msap-steps-dusk",
    beforeLabel: "Before the buildings rose",
    afterLabel: "Terraces at dusk",
  },
];

export const processShots: ImageKey[] = [
  "founder/reviewing-designs",
  "founder/team-table",
  "founder/site-walk",
  "founder/studio-team",
  "founder/site-briefing",
  "founder/mosaic-wall",
];

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
  "Blink",
  "RKA",
  "Planners Group",
  "Studio Basic Design",
  "The Design Room",
  "Art et Domain",
];

export const projectsHero = {
  title: "Environments designed for the people inside them",
  sub: "Hospitals, campuses, kitchens and workplaces, shaped with architects, artists and the teams who run them.",
  note: "The environment is not simply the setting in which health happens. It is one of the inputs shaping it.",
};
