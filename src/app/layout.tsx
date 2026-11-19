import type { Metadata, Viewport } from "next";
import { DesignSwitch } from "@/components/shared/DesignSwitch";
import { sans, serif } from "./fonts";
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
  // Draft for client review. Remove this block when the approved site goes live.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

/**
 * The shell both designs share: fonts, colours and the skip link. Each design brings
 * its own header, footer and page width in its own layout: `(one)/layout.tsx` for
 * Design 1 at the site root and `2/layout.tsx` for Design 2 under /2.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-sage focus:px-5 focus:py-2.5 focus:font-semibold focus:text-ink-deep"
        >
          Skip to content
        </a>
        {children}
        <DesignSwitch />
      </body>
    </html>
  );
}
