import Link from "next/link";
import { Reveal } from "@/components/shared/Motion";
import { TriadMark } from "@/components/shared/Triad";
import { closing, contactEmail, contactHref, hero } from "@/content/home";
import { navItems } from "@/content/nav";
import { Hl, Pill, Wrap3 } from "./ui";

/** Centred closing invitation on slate, then a plain footer on cream. */
export function FooterThree() {
  const items = navItems("/3");
  return (
    <footer className="bg-surface">
      <Wrap3 className="py-16 md:py-24">
        <Reveal className="cut bg-deep px-6 py-16 text-center text-on-deep md:px-16 md:py-24">
          <h2 className="display mx-auto max-w-[20ch] text-[clamp(2.2rem,4.6vw,4rem)] leading-[1.1]">
            Better health begins with <Hl>better conditions</Hl>
          </h2>
          <p className="mx-auto mt-7 max-w-[60ch] text-[18px] leading-relaxed text-on-deep-muted">{closing.body}</p>
          <div className="mt-9">
            <Pill href={contactHref} tone="onDeep">
              {closing.cta}
            </Pill>
          </div>
        </Reveal>
      </Wrap3>

      <div className="border-t border-line">
        <Wrap3 className="grid gap-10 py-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <TriadMark className="h-7 w-7 text-accent-ink" />
              <span className="text-[1.3rem] font-bold tracking-[-0.02em]">Sagework</span>
            </div>
            <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-muted">{hero.tagline}</p>
          </div>
          <nav aria-label="Footer" className="md:col-span-4">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-[15px]">
              {items.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-fg/80 transition-colors hover:text-accent-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="text-[15px] md:col-span-3">
            <p className="text-muted">Write to us</p>
            <a href={`mailto:${contactEmail}`} className="mt-2 inline-block font-semibold transition-colors hover:text-accent-ink">
              {contactEmail}
            </a>
          </div>
        </Wrap3>
        <Wrap3 className="flex flex-col gap-2 pb-24 text-[13px] text-muted sm:flex-row sm:justify-between">
          <p>© 2026 Sagework. All rights reserved.</p>
          <p>Evidence-led advisory and design practice.</p>
        </Wrap3>
      </div>
    </footer>
  );
}
