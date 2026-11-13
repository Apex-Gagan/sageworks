@AGENTS.md

# Sagework website

Design samples for the Sagework website (client: Dr Shruti Pai). Three complete design
directions, each covering three pages, so the client can compare and choose one.

- Repository: https://github.com/Apex-Gagan/sageworks
- Hosting: Vercel (framework preset "Next.js", no custom build settings)
- Stack: Next.js 16 (App Router, Turbopack, Cache Components), React 19, TypeScript,
  Tailwind CSS 4, `motion` for animation, Phosphor icons

## Commands

```bash
npm run dev      # local development on http://localhost:3000
npm run build    # production build (what Vercel runs)
npm run start    # serve the production build
npm run lint     # eslint
npm run test:ui  # 89 interaction checks in headless Chrome (dev server must be running;
                 # set BASE_URL / CHROME_PATH if not localhost:3000 / default Chrome)
```

After changing any interactive component, run `npm run test:ui` and add a check to
`scripts/ui-tests.mjs` for anything new.

## Routes

| Route          | What it is                                     |
| -------------- | ---------------------------------------------- |
| `/`            | Overview: an old fort, one window per sample   |
| `/1`           | Homepage, Sample 1 "Still"                     |
| `/1/founder`   | Founder page, Sample 1                         |
| `/1/projects`  | Projects page, Sample 1                        |
| `/2`           | Homepage, Sample 2 "Canopy"                    |
| `/2/founder`   | Founder page, Sample 2                         |
| `/2/projects`  | Projects page, Sample 2                        |
| `/3`           | Homepage, Sample 3 "Daylight"                  |
| `/3/founder`   | Founder page, Sample 3                         |
| `/3/projects`  | Projects page, Sample 3                        |

The other pages in the content master (Discover, Five Senses, Dr Gutsy, Research,
Work with Sagework, Contact) are not built yet. Their navigation items point at the
matching homepage section, and every "Start a Conversation" button opens an email to
`NEXT_PUBLIC_CONTACT_EMAIL`.

## The three directions

The client's references were Mindvalley (philosophy), Dr Rangan Chatterjee (authority),
Seed (science-led design) and Aesop (visual atmosphere).

**Sample 1, "Still"** leans on Aesop and Seed.
Light sage paper, deep green ink, one moss accent. Cormorant Garamond headings with
italic emphasis, square hairline buttons, sharp-cornered photographs treated like plates
in a journal, small mono labels for evidence cues. Interactions are quiet: an accordion
of services with a changing photograph, five senses as expanding photo strips, a chapter
index that follows the reader on the founder page.
The client approved its colours and type and asked for a more modern layout and motion
on the same base. That layer lives in `components/one/Modern.tsx`: headline words rise
out of a mask, photographs are uncovered from below, figures count up, the header steps
aside on scroll down and carries a reading-progress line. Homepage sections added on top
of the base: a marquee of sectors, a hairline bento of the four proof figures around a
photograph, the triad as scroll steps (the photograph stays, the text scrolls past), a
gallery that pins and pans sideways as the page scrolls (the ordinary slider below
1024px and under reduced motion), and Dr Gutsy's questions as stacking cards.

**Sample 2, "Canopy"** leans on Mindvalley and Dr Chatterjee.
Deep forest background, bone text, one marigold accent. Bricolage Grotesque headings set
light, with the key words in a heavier weight and the accent colour. Its signature
shapes come from the triad: circles and arches. Sections are "sheets" with a large
rounded top that slide over the one before. Notable pieces: an inline photo capsule in
the hero headline, a rotating seal carrying the Sagework line, the triad as three
overlapping photographs you can select, a wave of arches and frames for projects,
services as a row of arches, Dr Gutsy's question in a speech bubble, a project list
with a photograph that follows the pointer, a filterable wall with a lightbox, and a
giant wordmark closing the footer. Each founder chapter has its own layout.
Its three heroes (`components/two/Hero.tsx`) answer the pointer. Home: a warm torch
follows the pointer through the dusk over the hillside, the photo capsule in the
headline cycles, and the triad floats on the right as three selectable discs. Founder:
the arch portrait leans toward the pointer, and each role under her name is a link to
its chapter that previews that chapter's photograph and principle in the arch.
Projects: a button per kind of place swaps the backdrop and caption, moving on by
itself until someone points at it.

**Sample 3, "Daylight"** is built directly on the two people-facing references,
mindvalley.com and drchatterjee.com, at the client's request (the first version of
Sample 3, "Folio", was rejected and replaced).
White and cream grounds, slate text, one green accent (`#9ACA28`, chosen by the client;
it replaced the teal borrowed from Dr Chatterjee), and Mindvalley's own typeface, Google
Sans Flex, set bold. Its signature is the highlighter: a green block behind the key
words of a headline (`.hl`). Buttons are pills, photographs
have 10px corners, and quote cards have one generous corner (`.cut`).
From Dr Chatterjee: the white header with the current page in a green block and an
outlined pill, the full-width photo slider with a centred message, the grid of tiles
with highlighted titles, the green band, the quote card with a large corner and side
arrows, and the fixed tab on the right edge.
From Mindvalley: bold centred statements, the photo mosaic, giant numbers, the grey
quote panel, three image cards with a bold title, the dark "what is included" panel
and pill calls to action.
Homepage order: slider, six tiles, statement over a mosaic, numbers, three domains,
services on a slate panel (an accordion with a "Discuss ..." link each), founder with
credentials, five senses as cards with a cited finding each, Dr Gutsy on the green band,
principles carousel, research with both white-paper series and an evidence accordion.
Projects are a filterable grid of cards; each opens a photo viewer.
Its heroes: the home slider pushes in slowly on the current photograph, wipes the
highlighter in behind the key words (`.hl-wipe`), shows a thumbnail per slide with a
filling bar, and moves by arrows, thumbnails, left and right keys or a swipe. The
founder hero (`components/three/Hero.tsx`) has role chips that link to their chapter
and show its principle on the floating card, over a tint block that drifts against
the portrait. The projects hero mosaic focuses the photograph being pointed at and
moves a caption from tile to tile when nobody is pointing.

Samples 1 and 2 share Hanken Grotesk for body copy. All three use DM Mono for citations.

**The overview page (`/`)** is drawn as an old sandstone fort at dusk, in CSS and inline
SVG: battlements, corner towers with domed pavilions and pennants (1280px and wider),
a carved frieze, and three shuttered windows, one per sample, each over a stone tablet
with the sample's description, palette and three page links. The shutters stand ajar,
open further when pointed at, and swing wide when a window or one of its page links is
chosen; the view through the window then grows to fill the screen, the sample's own
ground colour and name appear, and the sample loads. Under reduced motion, and for
modified clicks (new tab), the links navigate plainly.

## Where things live

```
src/
  app/
    layout.tsx        root layout, metadata, fonts (robots: noindex while in review)
    fonts.ts          next/font/local definitions
    globals.css       Tailwind import, design tokens, .theme-one / -two / -three scopes,
                      shape classes (.arch for Sample 2; .hl and .cut for Sample 3)
    page.tsx          overview of the three samples (data only; renders the fort)
    1/                Sample 1 routes and layout
    2/                Sample 2 routes and layout
    3/                Sample 3 routes and layout
  components/
    overview/         Fort (the overview scene and its window transition) and
                      fort.css (plain stylesheet, `fort-` prefixed classes)
    shared/           Pic (image frame), Motion (Reveal, Parallax, ScrollText),
                      Scroller (every horizontal strip), Triad (mark and diagram),
                      SampleSwitcher (review-only)
    one/              Sample 1 nav, footer, controls, interactive pieces,
                      Modern (WordsUp, Curtain, Drift, CountUp, ProgressLine,
                      ScrollSteps, PinnedGallery)
    two/              Sample 2 nav, footer, ui (Sheet, Arch, Disc, Seal, Glow),
                      Hero (the three heroes), Interactive (senses, questions,
                      chapter pills, gallery), Signature (TriadCircles, ProjectList)
    three/            Sample 3 Header (and SideTab), footer, ui (Wrap3, Pill, Hl,
                      Heading), Hero (founder and projects heroes), Interactive
                      (HeroSlider, ServiceList, PrincipleCarousel, Accordion,
                      ProjectBrowser, ThenNow)
  content/            ALL copy and data. Edit text here, not in components.
    home.ts           homepage copy (content master, Page 1)
    founder.ts        founder copy (content master, Page 2)
    discover.ts       supporting copy from Pages 3, 4, 6 and 7: one cited finding
                      per sense, the WISE series, evidence notes, per-service
                      enquiry links (present need, SAGE OS and sectors are there
                      too but currently unused)
    projects.ts       projects, categories, project index, collaborators
    captions.ts       alt text and captions for every photograph
    nav.ts            navigation items shared by all samples
  data/images.json    generated: path, size and blur placeholder per photograph
  fonts/              self-hosted woff2 files (SIL Open Font License)
public/images/        optimised client photographs, grouped by category
scripts/
  import-images.py    resizes source photos and regenerates src/data/images.json
  image-selection.json  which source photo feeds which image key
```

## Conventions

- **Copy is the client's.** Homepage and founder text comes from
  `Sagework_Complete_Website Content_151026`. Do not paraphrase it. The projects page
  has no approved copy yet: the sentences in `content/projects.ts` are placeholders
  built only from facts in the client's image notes, and need Dr Shruti's review.
- **No em dashes or en dashes** anywhere in visible text.
- **One accent colour per sample**, defined as `--accent` in `globals.css`. The approved
  Sagework green has not been supplied; when it is, change `--accent` and `--fg` there.
- **Photographs** are always placed with `<Pic k="category/name" />`. Keys are typed
  from `content/captions.ts`, so a wrong key fails the build. Use `preload` on the one
  above-the-fold image per page (`priority` is deprecated in Next 16).
- **Captions name a location only when the client's folders make it explicit.**
  Everything else is described neutrally.
- **Motion** lives in client leaf components and always respects
  `prefers-reduced-motion`. Animate transform and opacity only.
- **Horizontal strips always use `<Scroller>`**, never a bare `overflow-x-auto` div.
  The scrollbar is hidden by design, so a bare strip cannot be moved with a mouse.
  `Scroller` adds mouse drag, arrow buttons, keyboard arrows and (with `auto`) a
  gentle drift that pauses on hover; arrows hide when the content already fits.
- **No current-time calls in server components** (`new Date()`), because Cache
  Components prerendering rejects them. The footer year is a literal.
- **Each sample is theme-locked** (Samples 1 and 3 light, Sample 2 dark) on purpose, so
  the client compares art-directed looks rather than one design in two modes.
- **Shape rules.** Sample 1: radius 0 everywhere. Sample 2: full pills for controls;
  photographs in arches, circles or 24px frames; sections as rounded sheets.
  Sample 3: pill controls, 10px photographs, 12 to 14px panels, quote cards with
  one large corner (`.cut`).
- **Emphasis stays in the same typeface.** Sample 1 uses italic, Sample 2 a heavier
  weight (`<strong>`) plus the accent colour, Sample 3 the highlighter (`<Hl>`). Never
  mix a second family in. In Sample 3, use the highlighter on roughly one headline per
  screen, not every heading.
- **Sample 3's green is a fill, not a text colour.** `--accent` (`#9ACA28`) goes behind
  dark text (highlighter, pills, tiles). For green text on white or cream use
  `--accent-ink` (`text-accent-ink`), the same green taken dark enough to read. White
  text never sits on the green.
- **Sticky content inside a Sample 2 `Sheet`** works because the sheet uses
  `overflow-clip`, not `overflow-hidden`. Keep it that way.
- **Auto-moving pieces pause on hover and on keyboard focus only.** A mouse click on a
  control must not leave them paused (see `HeroSlider`). Their timer restarts whenever
  the item changes, so something picked by hand gets its full time on screen.
- **Never put a scroll trigger on a masked element.** An element that is fully clipped
  (its own `clip-path`, or an ancestor's `overflow: hidden`) never counts as in view, so
  `whileInView` on it never fires and the content stays hidden. Put the trigger on an
  unmasked wrapper and drive the masked children through variants (see `WordsUp` and
  `Curtain`).
- **Keyframes used from inline styles go outside `@theme`** in `globals.css`. Tailwind
  drops theme keyframes that no `--animate-*` variable names, which works in dev and
  silently breaks in the production build (`progress`, `kenburns`, `hl-wipe`).
- **Pointer effects are mouse only and optional.** Parallax, tilt and the torch read
  `pointerType === "mouse"`, are skipped under reduced motion, and every hero works
  without them on touch.
- **CSS Modules do not work in this project.** The Turbopack rule in `next.config.ts`
  sends every `.css` file through the Tailwind loader as ordinary CSS, so a
  `*.module.css` import yields no class names and nothing is styled. For a component
  that needs its own stylesheet, import a plain `.css` file and prefix its classes
  (see `components/overview/fort.css`).
- **Pages stay alive after you leave them.** With Cache Components, Next hides the
  previous route instead of unmounting it, so its React state survives a Back. Reset
  anything transient (an open overlay, a running transition) in a `useLayoutEffect`
  cleanup, as `Fort` does; otherwise Back returns to the overlay.
- **Do not import `components/two/ui.tsx` into a client component.** It imports `Pic`,
  which would ship the whole image manifest to the browser. Pass server-rendered pieces
  (buttons, the seal) into client heroes as props instead.

## Adding or replacing photographs

1. Put the source file somewhere outside the repo (originals are large and git-ignored).
2. Add a line to `scripts/image-selection.json` mapping a new key to the source.
3. Run `python -I scripts/import-images.py scripts/image-selection.json <source root> scripts/source-index .`
   (`S12` and `D45` style references are row ids in `scripts/source-index`, made by `scripts/contact-sheets.py`.)
   The script resizes to 2000px on the long edge, writes `public/images/<key>.jpg` and
   regenerates `src/data/images.json` with a blur placeholder.
4. Add the key and its caption to `src/content/captions.ts`.

For a one-off photo it is fine to export a 2000px JPEG by hand, add it under
`public/images/`, and add its entry to `images.json` and `captions.ts`.

## Environment variables

Defined in `.env.example`. Copy to `.env.local` locally; add the same keys in Vercel.

| Key                         | Purpose                                         |
| --------------------------- | ----------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      | Public origin, used for metadata                |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Address behind every "Start a Conversation" CTA |

## Change log

### 2026-11-12, initial build

- Scaffolded Next.js 16 + TypeScript + Tailwind 4 with `create-next-app`.
- Reviewed the client material: content master (8 pages), meeting notes of 10 Nov,
  image guidance notes, project links, and the 11 Nov image selection brief.
- Reviewed about 480 unique client photographs and curated 125 against the client's
  shortlist (Mangalore, dental, angel corridor, 2405, 2410, 2435, 2458/2462, 4505,
  7373, 9173, 9175, the physiotherapy series). Two Canon RAW files (4505, 4512) were
  recovered from their embedded previews.
- Optimised all 125 to 2000px JPEG (25 MB in total) with blur placeholders.
- Studied the four reference sites for type, palette, structure and conversion patterns.
- Chose and self-hosted four typefaces: Cormorant Garamond, Bricolage Grotesque,
  Hanken Grotesk, DM Mono.
- Built the token system, two theme scopes, shared image and motion components.
- Built Sample 1 and Sample 2: homepage, founder page and projects page for each.
- Built the overview page and the review-only sample switcher.
- Added `.gitignore`, `.env.example`, `.env.local`, this file and the README.
- Set `robots: noindex` while the site is a review draft.

### 2026-11-12, sliders fixed

- Reported: some sliders could not be scrolled. Cause: the strips relied on native
  horizontal scrolling with the scrollbar hidden, which only works by touch or
  trackpad. With a mouse there was nothing to grab.
- Added `components/shared/Scroller.tsx` and moved all six strips onto it: Sample 1
  homepage environments and projects team strip; Sample 2 homepage project ribbon and
  publications, founder chapter photographs, projects team strip.
- The Sample 2 project ribbon was a CSS marquee that could not be controlled and
  stood still under reduced motion. It now drifts through `Scroller` and can be
  dragged or stepped with the arrows.
- Tested arrows, mouse drag, auto drift, accordions, sense selectors, question
  rotator, chapter indexes, gallery filters, lightbox and both mobile menus.

### 2026-11-12, Sample 3 added and Sample 2 redesigned

- **Sample 3 "Folio" built** (`/3`, `/3/founder`, `/3/projects`): new palette, new
  typeface (Jost, self-hosted), a side-rail layout and its own set of interactive
  components. It adds the present need, SAGE OS, where Sagework applies, cited findings
  for each sense and the WISE series, all taken from the content master.
- **Sample 2 "Canopy" redesigned** so it no longer reads as a generic dark template:
  lime accent replaced by marigold, headings set light with weighted emphasis, and the
  generic pieces replaced (stacking triad cards, bento of services, card grid of
  projects, uniform founder panels) with the signature pieces listed above.
- Overview page and sample switcher now cover three samples.
- `Scroller` gained a third button style for Sample 3.
- **Testing.** Every page was captured top to bottom in a headless browser at 1440px,
  and the two new homepages at 390px. A scripted suite of 64 checks passes: every
  slider, selector, tab set, accordion, filter, lightbox, hover preview, slideshow,
  toggle and mobile menu; no sideways overflow on any of the ten routes at phone
  width; no runtime errors. The suite found one real flaw, now fixed: clicking the
  hero slideshow's Next button left auto-advance paused.

### 2026-11-12, Sample 3 rebuilt on the Mindvalley and Dr Chatterjee model

- The client did not like the first Sample 3 ("Folio": indigo and vermilion, side
  rail, leaf frames) and asked for it to follow mindvalley.com and drchatterjee.com.
- Both sites were studied again in a real browser (homepage, Mindvalley's About page)
  and Sample 3 was rebuilt from scratch as "Daylight": new palette, Google Sans Flex,
  top header, slider, tiles, mosaic, numbers, image cards, slate panel, teal band,
  quote-card carousel, project browser with a photo viewer.
- Removed: Jost font files, the side rail, the leaf frames and the old Sample 3
  components. `content/discover.ts` gained the evidence notes.
- If the dev server keeps serving old styles after files are deleted and recreated,
  restart it. That happened here and looked like the new palette had not applied.
- Tests: the Sample 3 checks were rewritten for the new components; 65 checks pass.

### 2026-11-12, Sample 1 modernised, Sample 2 and 3 heroes enhanced

- Client feedback: Sample 1's colours and fonts are right, but she wants a more modern
  layout, modern sections and animation on the same base; in Samples 2 and 3 only the
  hero sections should change, in design and interactivity.
- **Sample 1.** Added the motion layer (`components/one/Modern.tsx`) and applied it to
  all three pages. New homepage sections on the same palette and type: sectors marquee,
  proof bento with counting figures, triad as scroll steps, pinned gallery that pans
  with the scroll, stacking Dr Gutsy question cards. Founder and projects pages got the
  rising headlines, uncovered photographs, counting facts, hover states and a
  collaborators marquee. The header now hides on scroll down and shows reading progress.
  No copy, colour or typeface changed.
- **Sample 2.** Only the three heroes changed (`components/two/Hero.tsx`), as described
  under "The three directions".
- **Sample 3.** Only the three heroes changed: the slider in
  `components/three/Interactive.tsx` and the founder and projects heroes in
  `components/three/Hero.tsx`.
- **Two flaws found by the tests and fixed.** Sample 2's Dr Gutsy question rotator ran
  on a fixed interval, so a question picked by hand could be replaced a moment later; it
  now restarts its timer on every change. The `progress` keyframes were being dropped
  from the production CSS, so the filling bars never animated on the deployed site.
- Tests: 85 checks pass, including each hero interaction, the Sample 1 scroll sections
  on desktop, and that every Sample 1 headline and photograph is revealed on desktop
  and at phone width. Production build passes.

### 2026-11-13, Sample 3 in green, overview redrawn as a fort

- **Sample 3 accent changed to `#9ACA28`** at the client's request, replacing the light
  teal. Only the tokens in `.theme-three` changed (`--accent`, `--on-accent`,
  `--accent-ink`, `--tint`, `--accent-soft`), so every highlighter, pill, tile, band,
  header block and focus ring follows. Nothing else in Sample 3 was touched.
- **Overview page redrawn as an old fort** with a window-opening transition into each
  sample (`components/overview/Fort.tsx`, `fort.css`), as described under "The three
  directions". The page copy is the same except for the instruction sentence and the
  Sample 1 and 3 descriptions, which now match what those samples are.
- Found on the way: CSS Modules are not generated in this project (see Conventions),
  and Next keeps the overview alive after navigation, so the transition is reset when
  the page is hidden.
- Tests: 89 checks pass, including the shutters, the full window transition, the reset
  on Back, and a tablet link opening its own window. Production build passes.

## Open items for the client

- **Professional portraits of Dr Shruti** (2023 to 2025 shoots) were not in the
  downloaded folders. The founder pages currently use a working photograph from the
  design studio. Swap in a portrait by replacing `founder/reviewing-designs`.
- **Confirm which photographs show Dr Shruti**, so captions can name her correctly.
- **Approved Sagework green, logo and SAGE Triad graphic** are not in hand. The triad
  is drawn as three plain circles and the wordmark is set in type until they arrive.
- **Dr Gutsy character artwork** is not in hand, so that section is typographic.
- **Projects page copy and the project index** need review. Two entries in the
  client's list carried question marks (Jaipur, Raipur); Raipur is left out.
- **Online images and videos** suggested in the client's notes (Dwarka drone video,
  WGSHA reel, MARC and MSAP films, Google image links) are not used: only supplied
  photographs are on the site. Third-party images need permission before publishing.
- **Hero video** is specified in the content master; the homepage heroes use
  photography until a video is supplied.
- **Laboratory and research photographs** requested for the Biology lens were not in
  the folders; Biology currently uses the physiotherapy corridor.
- LinkedIn URL, Privacy Notice and company footer details are still to be supplied.
- **Sample 3 shows more than the approved homepage copy.** The cited findings for
  each sense, the WISE series, the evidence notes and the principles carousel (the
  closing lines of the founder chapters) are the client's own words from other pages
  of the content master, placed on the homepage. Confirm she is happy with that.
- **A few short labels in Sample 3 are ours**, not the client's: the hero slide
  subtitles for projects and the founder, "Principles that guide the work", "Twelve
  bodies of work, four kinds of place" and the credential bullets (each restates a
  fact from her founder page). They need her approval.
- **The four roles under her name now link to chapters**, in Samples 2 and 3. The
  pairing is ours: Business Leader to that chapter, Clinical Nutrition Scientist and
  Gut Microbiome Researcher both to "Scientist and Researcher", Human Systems Designer
  to that chapter. The principle shown is the chapter's own maxim.
- **Sample 3's founder hero shows a "20+ years" card**, taken from the first proof
  figure on the homepage.
- **Hero headlines in Samples 2 and 3 are typed into the hero components** (so the
  words can rise and the emphasis can fall in the right place). If the homepage,
  founder or projects headline changes, change it in `components/two/Hero.tsx`,
  `app/3/page.tsx`, `app/3/founder/page.tsx` and `app/3/projects/page.tsx` too.
- **Two emphasis splits are hard-coded** rather than read from the content files, so
  the accent can fall on the right words: the founder question on the Sample 2
  homepage and the closing lens line on the Sample 2 and 3 founder pages, plus the
  highlighted halves of Sample 3's headlines. If that copy changes, change it there too.

## Before going live

- Remove `robots: { index: false }` in `src/app/layout.tsx`.
- Remove `SampleSwitcher`, the fort overview (`components/overview/`) and the unused
  samples, and move the chosen sample to `/`.
- Build the remaining five pages and the contact form (see content master, Pages 3 to 8).
