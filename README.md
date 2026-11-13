# Sagework website

Three design directions for the Sagework website, each with a homepage, founder page and
projects page, built with Next.js, TypeScript and Tailwind CSS.

| Page          | Sample 1 "Still" | Sample 2 "Canopy" | Sample 3 "Daylight" |
| ------------- | ---------------- | ----------------- | ---------------- |
| Homepage      | `/1`             | `/2`              | `/3`             |
| Founder page  | `/1/founder`     | `/2/founder`      | `/3/founder`     |
| Projects page | `/1/projects`    | `/2/projects`     | `/3/projects`    |

`/` is an overview that links all nine. A small switch at the bottom of every sample page
flips to the same page in another sample.

- **Still**: light sage paper, serif headings, editorial, with scroll-led motion
  (headlines that rise, photographs that are uncovered, a gallery that pans as you scroll).
- **Canopy**: dark forest with a marigold accent, circles and arches, immersive.
- **Daylight**: white and cream with a green highlighter (#9ACA28), modelled on mindvalley.com
  and drchatterjee.com: photo slider, tiles, mosaics, giant numbers, bold statements.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Test

With the dev server running on port 3000:

```bash
npm run test:ui
```

This drives a headless Chrome through every slider, selector, tab set, filter, lightbox,
hero interaction, scroll-led section and mobile menu on all three samples (85 checks),
and checks each route at phone width for sideways overflow. Set `CHROME_PATH` if Chrome is not in the default location, and `BASE_URL` to
test another address.

## Deploy to Vercel

1. Import the GitHub repository in Vercel. The Next.js preset needs no changes.
2. Add the two environment variables from `.env.example`
   (`NEXT_PUBLIC_SITE_URL` set to the deployment URL, `NEXT_PUBLIC_CONTACT_EMAIL`).
3. Deploy.

The samples are marked `noindex` so search engines do not list a draft.

## Editing

All text lives in `src/content/`. All photographs live in `public/images/` and are
placed with the `Pic` component. See `CLAUDE.md` for the full project notes, design
decisions, conventions and the list of items still needed from the client.

## Fonts

Cormorant Garamond, Bricolage Grotesque, Google Sans Flex, Hanken Grotesk and DM Mono, self-hosted
from `src/fonts/` under the SIL Open Font License 1.1.
