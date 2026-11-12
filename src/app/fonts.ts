import localFont from "next/font/local";

/**
 * All fonts are self-hosted from src/fonts (SIL Open Font License).
 * Sample 1 display: Cormorant Garamond. Sample 2 display: Bricolage Grotesque.
 * Shared body: Hanken Grotesk. Shared mono (citations, labels): DM Mono.
 */

export const cormorant = localFont({
  src: [
    {
      path: "../fonts/cormorant-garamond-latin-wght-normal.woff2",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "../fonts/cormorant-garamond-latin-wght-italic.woff2",
      weight: "300 700",
      style: "italic",
    },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

export const bricolage = localFont({
  src: "../fonts/bricolage-grotesque-latin-opsz-normal.woff2",
  weight: "200 800",
  variable: "--font-bricolage",
  display: "swap",
});

export const hanken = localFont({
  src: [
    {
      path: "../fonts/hanken-grotesk-latin-wght-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../fonts/hanken-grotesk-latin-wght-italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-hanken",
  display: "swap",
});

export const dmMono = localFont({
  src: [
    {
      path: "../fonts/dm-mono-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/dm-mono-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-dm-mono",
  display: "swap",
});
