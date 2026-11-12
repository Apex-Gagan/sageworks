# Sagework website

Two design directions for the Sagework website, each with a homepage, founder page and
projects page, built with Next.js, TypeScript and Tailwind CSS.

| Page          | Sample 1 "Still" | Sample 2 "Canopy" |
| ------------- | ---------------- | ----------------- |
| Homepage      | `/1`             | `/2`              |
| Founder page  | `/1/founder`     | `/2/founder`      |
| Projects page | `/1/projects`    | `/2/projects`     |

`/` is an overview that links all six. A small switch at the bottom of every sample page
flips to the same page in the other sample.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

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

Cormorant Garamond, Bricolage Grotesque, Hanken Grotesk and DM Mono, self-hosted from
`src/fonts/` under the SIL Open Font License 1.1.
