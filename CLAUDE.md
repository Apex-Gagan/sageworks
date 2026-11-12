@AGENTS.md

# Sagework website

Design samples for the Sagework website (client: Dr Shruti Pai). Two complete design
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
```

## Routes

| Route          | What it is                                     |
| -------------- | ---------------------------------------------- |
| `/`            | Overview page that links all six sample pages  |
| `/1`           | Homepage, Sample 1 "Still"                     |
| `/1/founder`   | Founder page, Sample 1                         |
| `/1/projects`  | Projects page, Sample 1                        |
| `/2`           | Homepage, Sample 2 "Canopy"                    |
| `/2/founder`   | Founder page, Sample 2                         |
| `/2/projects`  | Projects page, Sample 2                        |

The other pages in the content master (Discover, Five Senses, Dr Gutsy, Research,
Work with Sagework, Contact) are not built yet. Their navigation items point at the
matching homepage section, and every "Start a Conversation" button opens an email to
`NEXT_PUBLIC_CONTACT_EMAIL`.

## The two directions

The client's references were Mindvalley (philosophy), Dr Rangan Chatterjee (authority),
Seed (science-led design) and Aesop (visual atmosphere).

**Sample 1, "Still"** leans on Aesop and Seed.
Light sage paper, deep green ink, one moss accent. Cormorant Garamond headings with
italic emphasis, square hairline buttons, sharp-cornered photographs treated like plates
in a journal, small mono labels for evidence cues. Interactions are quiet: an accordion
of services with a changing photograph, five senses as expanding photo strips, a chapter
index that follows the reader on the founder page.

**Sample 2, "Canopy"** leans on Mindvalley and Dr Chatterjee.
Deep forest background, bone text, one soft lime accent. Bricolage Grotesque headings,
pill buttons, 20 to 28px radii, portraits in an arch. Full-bleed photography, a
statement that lights up word by word on scroll, triad panels that stack, a moving
ribbon of projects, a bento of services, a filterable project wall with a keyboard
friendly lightbox.

Both share Hanken Grotesk for body copy and DM Mono for labels and citations.

## Where things live

```
src/
  app/
    layout.tsx        root layout, metadata, fonts (robots: noindex while in review)
    fonts.ts          next/font/local definitions
    globals.css       Tailwind import, design tokens, .theme-one / .theme-two scopes
    page.tsx          overview of both samples
    1/                Sample 1 routes and layout
    2/                Sample 2 routes and layout
  components/
    shared/           Pic (image frame), Motion (Reveal, Parallax, ScrollText),
                      Triad (mark and diagram), SampleSwitcher (review-only)
    one/              Sample 1 nav, footer, controls, interactive pieces
    two/              Sample 2 nav, footer, controls, interactive pieces
  content/            ALL copy and data. Edit text here, not in components.
    home.ts           homepage copy (content master, Page 1)
    founder.ts        founder copy (content master, Page 2)
    projects.ts       projects, categories, project index, collaborators
    captions.ts       alt text and captions for every photograph
    nav.ts            navigation items shared by both samples
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
- **No current-time calls in server components** (`new Date()`), because Cache
  Components prerendering rejects them. The footer year is a literal.
- **Each sample is theme-locked** (Sample 1 light, Sample 2 dark) on purpose, so the
  client compares two art-directed looks rather than one design in two modes.
- Sample 1 uses radius 0 everywhere. Sample 2 uses full pills for controls and
  20 to 28px for media and panels.

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

## Before going live

- Remove `robots: { index: false }` in `src/app/layout.tsx`.
- Remove `SampleSwitcher` and the unused sample, and move the chosen sample to `/`.
- Build the remaining five pages and the contact form (see content master, Pages 3 to 8).
