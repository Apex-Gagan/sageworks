import Link from "next/link";
import { Mark } from "@/components/brand/Mark";
import { Leaf } from "@/components/brand/Leaf";
import { contactEmail, footerNav, nav, routes, tagline } from "@/content/site";
import { HeaderShell } from "./HeaderShell";
import { Note, Wrap } from "./ui";

/**
 * Header. The logo is the version without "DESIGN LLP" from the client's trademark
 * file, green on white. Its height keeps the wordmark above the manual's legibility
 * floor on phones, and the padding around it respects the clear zone.
 */
export function Header() {
  return (
    <HeaderShell
      logo={<Mark name="sagework" label="Sagework" className="h-[30px] w-auto md:h-[36px]" />}
      items={nav}
      cta={{ label: "Contact us", href: routes.contact }}
      extra={[{ label: "Photo gallery", href: routes.gallery }]}
    />
  );
}

/**
 * Footer in Sage Green (questionnaire, Q8). White is used for the logo and the large
 * line only; small text on the green is dark so it can be read (Q4).
 */
export function Footer() {
  return (
    <footer data-site-footer className="relative mt-0 overflow-hidden bg-sage text-ink-deep">
      <Leaf className="pointer-events-none absolute -right-10 -top-24 h-[150%] w-auto text-sage-deep opacity-70 md:right-[6%]" />
      <Wrap className="relative grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr] md:py-20">
        <div>
          <Mark name="sagework" tone="white" label="Sagework" className="h-[38px] w-auto" />
          <p className="display mt-8 max-w-[22ch] text-[clamp(1.7rem,2.6vw,2.3rem)] text-white">{tagline}</p>
        </div>

        <nav aria-label="Footer">
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em]">Explore</p>
          <ul className="mt-4 space-y-2.5 text-[15.5px]">
            {footerNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="underline-offset-4 hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em]">Connect</p>
          <a href={`mailto:${contactEmail}`} className="mt-4 block text-[1.15rem] font-semibold underline-offset-4 hover:underline">
            {contactEmail}
          </a>
          <Link href={routes.contact} className="mt-2 inline-block text-[15.5px] underline underline-offset-4">
            Start a conversation
          </Link>
          <Note className="mt-7 bg-white/80" why="the content master asks for these before launch (Page 8).">
            Approved LinkedIn link, Privacy Notice text and the company details to show in the footer.
          </Note>
        </div>
      </Wrap>
      <Wrap className="relative flex flex-col gap-2 border-t border-ink-deep/20 py-6 text-[13.5px] sm:flex-row sm:justify-between">
        <p>&copy; 2026 Sagework. All rights reserved.</p>
        <p>Draft for review. Not indexed by search engines.</p>
      </Wrap>
    </footer>
  );
}
