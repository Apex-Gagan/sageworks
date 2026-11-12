import type { Metadata, Viewport } from "next";
import { bricolage, cormorant, dmMono, hanken } from "./fonts";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sagework | Designing human systems for health, resilience and performance",
    template: "%s | Sagework",
  },
  description:
    "Sagework is an evidence-led advisory and design practice working across biology, environment and behaviour.",
  // Design samples for client review. Remove this block when the approved site goes live.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${bricolage.variable} ${hanken.variable} ${dmMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
