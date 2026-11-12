import Link from "next/link";
import { Reveal } from "@/components/shared/Motion";
import { TriadMark } from "@/components/shared/Triad";
import { closing, contactEmail, contactHref, hero } from "@/content/home";
import { navItems } from "@/content/nav";
import { Box, ButtonThree, Leaf } from "./ui";

/** Closing invitation in indigo with a leaf photograph, then a quiet footer. */
export function FooterThree() {
  const items = navItems("/3");
  return (
    <footer>
      <Box className="pb-10">
        <div className="leaf overflow-hidden bg-deep text-on-deep">
          <div className="grid gap-10 p-8 md:p-14 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-7">
              <h2 className="display text-[clamp(2.2rem,4.4vw,4.2rem)] leading-[1.04]">
                Better health begins with <em className="text-accent-soft">better conditions</em>
              </h2>
              <p className="mt-6 max-w-[54ch] text-[16.5px] leading-relaxed text-on-deep-muted">{closing.body}</p>
              <div className="mt-9">
                <ButtonThree href={contactHref} tone="onDeep">
                  {closing.cta}
                </ButtonThree>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
              <Leaf k="hospitals/zen-waiting" ratio="4 / 4.6" variant="leaf-flip" sizes="(min-width: 1024px) 26vw, 90vw" />
            </Reveal>
          </div>
        </div>
      </Box>

      <Box className="grid gap-10 border-t border-line py-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <TriadMark className="h-7 w-7 text-accent" />
            <span className="font-display text-[15px] font-medium uppercase tracking-[0.3em]">Sagework</span>
          </div>
          <p className="mt-5 max-w-[34ch] text-[14px] leading-relaxed text-muted">{hero.tagline}</p>
        </div>
        <nav aria-label="Footer" className="md:col-span-4">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-[14px]">
            {items.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-fg/80 transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="text-[14px] md:col-span-3">
          <p className="text-muted">Write to us</p>
          <a href={`mailto:${contactEmail}`} className="mt-2 inline-block transition-colors hover:text-accent">
            {contactEmail}
          </a>
        </div>
      </Box>
      <Box className="flex flex-col gap-2 pb-24 text-[12.5px] text-muted sm:flex-row sm:justify-between">
        <p>© 2026 Sagework. All rights reserved.</p>
        <p>Evidence-led advisory and design practice.</p>
      </Box>
    </footer>
  );
}
