import Link from "next/link";
import { TriadMark } from "@/components/shared/Triad";
import { Reveal } from "@/components/shared/Motion";
import { closing, contactEmail, contactHref, hero } from "@/content/home";
import { navItems } from "@/content/nav";
import { ButtonOne, Container } from "./ui";

/** Closing invitation and footer. The one deliberate colour block on the page. */
export function FooterOne() {
  const items = navItems("/1");
  return (
    <footer className="bg-deep text-on-deep">
      <Container className="py-24 md:py-36">
        <Reveal className="max-w-4xl">
          <h2 className="display text-[clamp(2.5rem,5.2vw,5rem)] leading-[1.05]">
            Better health begins with <em className="italic">better conditions</em>
          </h2>
          <p className="mt-8 max-w-[58ch] text-[17px] leading-relaxed text-on-deep-muted">
            {closing.body}
          </p>
          <div className="mt-10">
            <ButtonOne href={contactHref} tone="onDeep">
              {closing.cta}
            </ButtonOne>
          </div>
        </Reveal>
      </Container>

      <div className="border-t border-on-deep/15">
        <Container className="grid gap-12 py-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <TriadMark className="h-6 w-6" />
              <span className="display text-[1.6rem] leading-none">Sagework</span>
            </div>
            <p className="mt-5 max-w-[34ch] text-[14px] leading-relaxed text-on-deep-muted">
              {hero.tagline}
            </p>
          </div>
          <nav aria-label="Footer" className="md:col-span-4">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-[14px]">
              {items.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="link-draw pb-0.5 text-on-deep/85 hover:text-on-deep">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="text-[14px] md:col-span-3">
            <p className="text-on-deep-muted">Write to us</p>
            <a href={`mailto:${contactEmail}`} className="link-draw mt-2 inline-block pb-0.5">
              {contactEmail}
            </a>
          </div>
        </Container>
        <Container className="flex flex-col gap-2 pb-24 text-[12px] text-on-deep-muted sm:flex-row sm:justify-between">
          <p>© 2026 Sagework. All rights reserved.</p>
          <p>Evidence-led advisory and design practice.</p>
        </Container>
      </div>
    </footer>
  );
}
