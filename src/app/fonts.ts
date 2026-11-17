import localFont from "next/font/local";

/**
 * The brand manual names Nantes (titles) and Lota Grotesque (body). Both are paid
 * typefaces and Sagework does not hold web licences yet, so these two open-licence
 * stand-ins carry the design until it does:
 *   Newsreader      in place of Nantes          (--font-serif)
 *   Hanken Grotesk  in place of Lota Grotesque  (--font-sans)
 * To switch, add the licensed woff2 files to src/fonts and change the two `src`
 * entries below. Nothing else in the project names a typeface.
 */

export const serif = localFont({
  src: [
    { path: "../fonts/newsreader-latin-wght-normal.woff2", weight: "200 800", style: "normal" },
    { path: "../fonts/newsreader-latin-wght-italic.woff2", weight: "200 800", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
});

export const sans = localFont({
  src: [
    { path: "../fonts/hanken-grotesk-latin-wght-normal.woff2", weight: "100 900", style: "normal" },
    { path: "../fonts/hanken-grotesk-latin-wght-italic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-sans",
  display: "swap",
});
