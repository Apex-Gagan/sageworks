import type { ImageKey } from "./captions";

/**
 * The photo gallery, built from Dr Shruti's image catalogues (the three
 * "..._Commented.docx" files) and "Visual Direction for Website Projects".
 *
 * Rules taken from those documents:
 *  1. Projects span five categories: Healthcare, Hospitality, Academic institutions,
 *     Kitchens and Offices.
 *  2. Fewer, stronger images. Only photographs she ticked are here; anything marked
 *     remove, replace or "not useful" is left out, and near-duplicates are dropped.
 *  3. Show the design story: site, work in progress and the completed space (`journeys`).
 *  4. Dr Shruti is shown with people, not alone.
 *  5. Large-scale projects lead each group: buildings, campuses, hospitals.
 *  7. Artwork is shown in the space it was made for, not as a close-up.
 *
 * Titles and notes use her own descriptions from the catalogue comments.
 */

export type GalleryGroup = "Healthcare" | "Hospitality" | "Academic institutions" | "Kitchens" | "Offices" | "With teams on site";

export type GalleryEntry = {
  image: ImageKey;
  title: string;
  /** One line from her catalogue comment: what the space is, or who it was made with. */
  note?: string;
};

export const groups: { name: GalleryGroup; items: GalleryEntry[] }[] = [
  {
    name: "Healthcare",
    items: [
      { image: "hospitals/dwarka-building", title: "Manipal Hospital, Dwarka", note: "Exterior facade mural developed with Earthen Symphony around the theme of hope, using kites." },
      { image: "hospitals/dwarka-butterfly-lobby", title: "Manipal Hospital, Dwarka", note: "Colourful large-format mural in the lobby." },
      { image: "hospitals/mangalore-shell-lobby", title: "Manipal Hospital, Mangalore", note: "Large sculptural reception installation." },
      { image: "hospitals/mangalore-spiral-reception", title: "Manipal Hospital, Mangalore", note: "Circular 3D wall installation at the reception." },
      { image: "hospitals/lobby-artwork-4512", title: "Manipal Hospital Bengaluru, OPD lobby", note: "Large colourful marine and coral artwork, seen in the lobby it was made for." },
      { image: "hospitals/kanakapura-waiting", title: "Manipal Hospital, Kanakapura", note: "Water and koi artwork in a waiting area. With Spread." },
      { image: "hospitals/kanakapura-lily-corridor", title: "Manipal Hospital, Kanakapura", note: "Water lily artwork along a corridor. With Spread." },
      { image: "hospitals/old-airport-road-entrance", title: "Manipal Hospital, Old Airport Road", note: "Inpatient entrance." },
      { image: "hospitals/whitefield-lobby-rings", title: "Manipal Hospital, Whitefield", note: "Lobby with ring lighting." },
      { image: "hospitals/whitefield-angel-corridor", title: "Manipal Hospital, Whitefield", note: "Angel artwork in the consultation-room area." },
      { image: "hospitals/opd-reception-floral", title: "Colourful floral installation at a reception" },
      { image: "hospitals/paediatric-ceiling", title: "Paediatric floor", note: "Large ceiling artwork: the ceiling pond installation." },
      { image: "hospitals/paediatric-penguins", title: "Paediatric floor", note: "Penguin wall installation, part of the child-friendly animal graphics." },
      { image: "hospitals/jaipur-panels-corridor", title: "Framed nature-inspired artwork series", note: "Designed as a quiet, non-denominational space for anyone to sit in silence or pray, using elements of nature rather than religious imagery." },
      { image: "hospitals/organic-artwork-corridor", title: "Large organic 3D artwork", note: "One of a related series, shown in its corridor." },
      { image: "hospitals/flamingo-corridor", title: "Flamingo mural", note: "From a hospital project." },
    ],
  },
  {
    name: "Hospitality",
    items: [
      { image: "hospitality/valley-rangoli-restaurant", title: "Rangoli, Valley View Hotel, Manipal", note: "Indian restaurant. Revamped flooring and wall finishes, timber and roofing details and bell-jar pendant lights; mural created with Earthen Symphony. Interior collaboration: Purple Ink." },
      { image: "hospitality/valley-cosmo", title: "Cosmo cafe, Valley View, Manipal", note: "Identity and interiors developed with a cosmopolitan, carnival feel using imagery and lighting." },
      { image: "hospitality/valley-red-lounge", title: "Valley View, Manipal", note: "Purple Ink collaborated on the interiors." },
      { image: "hospitality/valley-chevron-dining", title: "Valley View dining space", note: "Purple Ink collaborated on the interiors." },
      { image: "hospitality/wgsha-hexagon", title: "WGSHA", note: "Overall project by Sundaram Architects; the hexagonal wall mural is by Earthen Symphony." },
      { image: "hospitality/wgsha-cafe", title: "WGSHA cafe", note: "At the entrance: the pickup and display area for cakes and baked items." },
      { image: "hospitality/chef-van-serving", title: "Chef on Wheels", note: "Serving at the food truck launch." },
    ],
  },
  {
    name: "Academic institutions",
    items: [
      { image: "academic/msap-exterior", title: "Manipal School of Architecture and Planning" },
      { image: "academic/msap-aerial", title: "Manipal School of Architecture and Planning", note: "With Purple Ink." },
      { image: "academic/marc-exterior", title: "MARC auditorium, Bengaluru campus" },
      { image: "academic/marc-auditorium", title: "MARC auditorium, Bengaluru campus", note: "The completed auditorium." },
      { image: "academic/msap-steps-dusk", title: "Manipal School of Architecture and Planning", note: "Terraces at dusk." },
      { image: "academic/msap-curved-terrace", title: "Manipal School of Architecture and Planning" },
      { image: "academic/campus-white-building", title: "Campus building" },
      { image: "academic/hostel-green", title: "Student housing, Bengaluru campus" },
      { image: "academic/marena-field", title: "Sports complex, Bengaluru campus" },
      { image: "academic/library-stocked", title: "Library" },
      { image: "academic/classroom-gable", title: "Classroom" },
      { image: "academic/classroom-window", title: "Classroom" },
    ],
  },
  {
    name: "Kitchens",
    items: [
      { image: "hospitality/wgsha-kitchen-red", title: "WGSHA kitchen" },
      { image: "hospitality/wgsha-pastry-kitchen", title: "WGSHA kitchen", note: "Induction kitchen." },
      { image: "founder/chef-on-wheels-kitchen", title: "Chef on Wheels", note: "Inside the kitchen." },
    ],
  },
  {
    name: "Offices",
    items: [
      { image: "hospitality/office-suite", title: "Executive lounge", note: "Dr Shruti's own design." },
      { image: "hospitality/office-lounge", title: "Executive lounge" },
      { image: "hospitality/office-bedroom", title: "MEMG corporate office", note: "Executive suite and guest bedroom: hospitality-style accommodation within an office." },
      { image: "academic/boardroom-skylight", title: "Boardroom" },
    ],
  },
  {
    name: "With teams on site",
    items: [
      { image: "founder/material-review", title: "Reviewing materials with the project team" },
      { image: "people/park-walk", title: "Walking beneath old trees" },
      { image: "founder/team-table", title: "A working session with the project team" },
      { image: "founder/site-courtyard-team", title: "On site with the project team" },
      { image: "people/leaf-talk", title: "Learning from a leaf" },
      { image: "founder/site-hardhats", title: "A site visit" },
      { image: "people/craft-table", title: "Handwoven cloth at a craft table" },
      { image: "founder/mosaic-wall-wide", title: "A mosaic portrait wall on site" },
      { image: "founder/classroom-session", title: "In a classroom session" },
      { image: "people/conversation", title: "In conversation" },
    ],
  },
];

/**
 * The project journey: the same project at different stages. Pairs marked `confirmed`
 * are ones Dr Shruti named in the catalogue (image 9 is the work in progress of image
 * 12; the MARC exterior before completion).
 */
export type Stage = { image: ImageKey; label: "The site" | "Work in progress" | "Completed"; pos?: string };

export const journeys: { title: string; place: string; stages: Stage[] }[] = [
  {
    title: "MARC auditorium",
    place: "Bengaluru campus",
    stages: [
      { image: "founder/site-auditorium", label: "Work in progress", pos: "50% 40%" },
      { image: "academic/marc-auditorium", label: "Completed" },
    ],
  },
  {
    title: "MARC auditorium, exterior",
    place: "Bengaluru campus",
    stages: [
      { image: "academic/marc-construction", label: "Work in progress", pos: "40% 60%" },
      { image: "academic/marc-exterior", label: "Completed" },
    ],
  },
  {
    title: "The campus",
    place: "Bengaluru",
    stages: [
      { image: "founder/site-empty", label: "The site" },
      { image: "founder/site-foundation", label: "Work in progress" },
      { image: "academic/hostel-green", label: "Completed" },
    ],
  },
];
