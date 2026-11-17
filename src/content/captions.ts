/**
 * Alt text and optional visible captions for every curated photograph.
 * Keys match src/data/images.json. Locations are named only where the client's
 * source folders make them explicit; everything else is described neutrally.
 */
export const captions = {
  "founder/team-table": "A working session with the project team",
  "founder/site-auditorium": "On site during the auditorium build",
  "founder/chef-on-wheels-kitchen": "Inside the Chef on Wheels kitchen",
  "founder/site-foundation": "At the campus site before the buildings rose",

  "hospitals/mangalore-shell-lobby": "Lobby with a nautilus reception desk and wave mosaic, Manipal Hospital Mangalore",
  "hospitals/mangalore-spiral-reception": "Reception with spiral sea-life artwork, Manipal Hospital Mangalore",
  "hospitals/whitefield-lobby-rings": "Lobby with ring lights and warm stone, Manipal Hospital Whitefield",
  "hospitals/whitefield-angel-corridor": "Corridor with a gold angel relief, Manipal Hospital Whitefield",
  "hospitals/dwarka-butterfly-lobby": "Butterfly artwork rising through the lobby, Manipal Hospital Dwarka",
  "hospitals/dwarka-building": "Manipal Hospital Dwarka from the street",
  "hospitals/jaipur-panels-corridor": "Relief panels along a waiting corridor",
  "hospitals/opd-reception-floral": "Reception counter with circular floral artwork",
  "hospitals/paediatric-ceiling": "Jungle canopy ceiling in the paediatric ward",
  "hospitals/paediatric-penguins": "Penguin family mural in a children's corridor",
  "hospitals/flamingo-corridor": "Flamingo mural along a ward corridor",
  "hospitals/lobby-artwork-4512": "Reception and colour frieze seen from the lobby",

  "academic/msap-aerial": "Manipal School of Architecture and Planning from the air",
  "academic/msap-exterior": "Brick sweep at the entrance, Manipal School of Architecture and Planning",
  "academic/msap-steps-dusk": "Stepped terraces at dusk",
  "academic/msap-curved-terrace": "Curved terrace in orange and white",
  "academic/marc-exterior": "The auditorium's ringed facade",
  "academic/marc-auditorium": "Auditorium interior with ribbed timber ceiling",
  "academic/marc-construction": "The auditorium under construction",
  "academic/classroom-window": "Classroom with a view",
  "academic/boardroom-skylight": "Boardroom beneath a skylight",
  "academic/campus-white-building": "Faceted academic building behind planting",
  "academic/marena-field": "Marena seen across the playing field",

  "hospitality/valley-rangoli-restaurant": "Rangoli restaurant under a timber roof, Valley View",
  "hospitality/valley-cosmo": "Cosmo cafe, Valley View",
  "hospitality/valley-red-lounge": "Lounge with chevron floor",
  "hospitality/valley-chevron-dining": "Dining room with chevron floor",
  "hospitality/wgsha-hexagon": "Hexagon metal installation in the atrium, WGSHA",
  "hospitality/wgsha-cafe": "Training cafe, WGSHA",
  "hospitality/wgsha-kitchen-red": "Training kitchen with red floor, WGSHA",
  "hospitality/wgsha-pastry-kitchen": "Pastry kitchen, WGSHA",
  "hospitality/office-lounge": "Executive lounge",
  "hospitality/office-suite": "Lounge with a city view",
  "hospitality/office-bedroom": "Guest suite",
  "hospitality/chef-van-serving": "Serving from the Chef on Wheels van",

  "academic/classroom-students": "Students at work in a classroom",
  "academic/hostel-green": "Student housing around a planted courtyard",
  "founder/material-review": "Dr Shruti Pai reviewing material samples with the project team",

  "people/leaf-talk": "A guide holds up a leaf while Dr Shruti Pai and a group look on",
  "people/park-walk": "Dr Shruti Pai walking with a group beneath old trees",
  "people/group-walk": "A group walking together through a park",
  "people/conversation": "Dr Shruti Pai in conversation during a walk",
  "people/tree-touch": "Dr Shruti Pai with her arms around the trunk of a large tree",
  "people/group-listening": "Dr Shruti Pai among a group listening on a walk",
  "people/craft-table": "Dr Shruti Pai and visitors looking at handwoven cloth at a craft table",
  "founder/classroom-session": "Dr Shruti Pai seated with two students in a classroom",
  "founder/seminar-listening": "Dr Shruti Pai listening closely in a classroom session",
  "founder/garden-flowers": "Dr Shruti Pai reaching towards flowers in a garden",
  "founder/portrait-garden": "Portrait of Dr Shruti Pai in a garden",

  "hospitals/kanakapura-waiting": "Waiting area with water and koi artwork, Manipal Hospital Kanakapura",
  "hospitals/kanakapura-lily-corridor": "Long water lily artwork along a corridor, Manipal Hospital Kanakapura",
  "hospitals/old-airport-road-entrance": "Inpatient entrance with seascape panels, Manipal Hospital Old Airport Road",
  "hospitals/mmmc-mural": "Mural combining Indian and Malaysian references, made for the former Malacca-Manipal Medical College",
  "hospitals/organic-artwork-corridor": "Large organic 3D artwork on a corridor wall",
  "academic/library-stocked": "Library with stocked shelves and reading tables",
  "academic/classroom-gable": "Classroom with tall windows beneath a pitched roof",
  "founder/site-empty": "The project team on the empty campus site",
  "founder/site-courtyard-team": "Dr Shruti Pai with the project team in a courtyard on site",
  "founder/site-hardhats": "Dr Shruti Pai with the project team on a site visit",
  "founder/mosaic-wall-wide": "A mosaic portrait wall on site",
} as const;

export type ImageKey = keyof typeof captions;
