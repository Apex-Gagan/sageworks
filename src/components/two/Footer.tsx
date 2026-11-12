import Link from "next/link";
import { Pic } from "@/components/shared/Pic";
import { Reveal } from "@/components/shared/Motion";
import { TriadMark } from "@/components/shared/Triad";
import { closing, contactEmail, contactHref, hero } from "@/content/home";
import { navItems } from "@/content/nav";
import { ButtonTwo, Wrap } from "./ui";

export function FooterTwo() {
  const items = navItems("/2");
  return (
    <footer className="relative -mt-10 overflow-clip rounded-t-[40px] bg-deep md:-mt-16 md:rounded-t-[64px]">
      <Wrap className="pt-6">
        <div className="relative isolate overflow-hidden rounded-[34px] md:rounded-[52px]">
          <div className="absolute inset-0 -z-10">
            <Pic k="academic/msap-aerial-green" cover sizes="100vw" className="rounded-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/70 to-deep/25" />
          </div>
          <Reveal className="px-6 pb-14 pt-44 md:px-14 md:pb-20 md:pt-72">
            <h2 className="display max-w-4xl text-[clamp(2.4rem,5.6vw,5.4rem)] leading-[1]">
              Better health begins with <strong className="text-accent">better conditions</strong>
            </h2>
            <p className="mt-7 max-w-[56ch] text-[17px] leading-relaxed text-fg/85">{closing.body}</p>
            <div className="mt-9">
              <ButtonTwo href={contactHref}>{closing.cta}</ButtonTwo>
            </div>
          </Reveal>
        </div>
      </Wrap>

      <Wrap className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5">
            <TriadMark className="h-6 w-6 text-accent" />
            <span className="display text-[1.4rem] leading-none">Sagework</span>
          </div>
          <p className="mt-5 max-w-[34ch] text-[14.5px] leading-relaxed text-muted">{hero.tagline}</p>
        </div>
        <nav aria-label="Footer" className="md:col-span-4">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-[14.5px]">
            {items.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-fg/80 transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="text-[14.5px] md:col-span-3">
          <p className="text-muted">Write to us</p>
          <a href={`mailto:${contactEmail}`} className="mt-2 inline-block transition-colors hover:text-accent">
            {contactEmail}
          </a>
        </div>
      </Wrap>

      <Wrap className="flex flex-col gap-2 border-t border-line pt-6 text-[12.5px] text-muted sm:flex-row sm:justify-between">
        <p>© 2026 Sagework. All rights reserved.</p>
        <p>Evidence-led advisory and design practice.</p>
      </Wrap>

      <p
        aria-hidden="true"
        className="display pointer-events-none -mb-[5.5vw] mt-6 select-none whitespace-nowrap text-center text-[25vw] leading-[0.82] text-fg/[0.055]"
      >
        Sagework
      </p>
    </footer>
  );
}
