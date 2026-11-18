# Sagework website

The Sagework website: one design, built to the Sagework brand manual and Dr Shruti Pai's
answers to the build questionnaire. Next.js, TypeScript and Tailwind CSS.

| Page                         | Route                 |
| ---------------------------- | --------------------- |
| Homepage                     | `/`                   |
| Founder, Dr Shruti Pai       | `/founder`            |
| Discover Sagework            | `/discover`           |
| Projects                     | `/projects`           |
| The Five Senses              | `/five-senses`        |
| Simply Sage and Dr Gutsy     | `/simply-sage`        |
| Research and evidence        | `/research`           |
| Work with Sagework           | `/work-with-sagework` |
| Contact us                   | `/contact`            |
| Photo gallery                | `/gallery`            |

White base, Sage Green (#9ACA28) leading, aqua and amber as accents and as the colours of
the Environment and Behaviour lenses, the client's own logo artwork, italic serif
headlines, and the leaf from the logo as watermark, bullet, loading mark and pointer
companion.

Anything the client still has to supply is marked on the page itself, in the section it
belongs to, with a dashed "Content needed" note saying what is missing and why.

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

This drives a headless Chrome through every page (154 checks): brand rules on each page
(white header, logo artwork, green footer, one italic headline), the hero film and the
contrast of its white text over each photograph, the
triad, the five senses, the phone menu, the founder chapters, the white-paper lists and
request form, the contact form's validation, the gallery and its viewer. Set `CHROME_PATH`
if Chrome is not in the default location, and `BASE_URL` to test another address.

## Deploy to Vercel

1. Import the GitHub repository in Vercel. The Next.js preset needs no changes.
2. Add the two environment variables from `.env.example`
   (`NEXT_PUBLIC_SITE_URL` set to the deployment URL, `NEXT_PUBLIC_CONTACT_EMAIL`).
3. Deploy.

The site is marked `noindex` so search engines do not list a draft.

## Editing

All text lives in `src/content/`. Photographs live in `public/images/` and are placed with
the `Pic` component. Logo artwork lives in `src/components/brand/` and `public/brand/`.
See `CLAUDE.md` for the full project notes, the decisions taken from the questionnaire,
conventions and the list of items still needed from the client.

## Fonts

The brand manual names Nantes and Lota Grotesque, which are paid typefaces without a web
licence yet. Until Sagework holds one, Newsreader and Hanken Grotesk stand in, self-hosted
from `src/fonts/` under the SIL Open Font License 1.1. Switching is a two-line change in
`src/app/fonts.ts`.
