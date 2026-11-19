import Link from "next/link";
import { Mark } from "@/components/brand/Mark";
import { Note } from "@/components/site/ui";
import { contactEmail, lensColour } from "@/content/site";
import { footerNav2, nav2, r2 } from "@/content/two";
import { HeaderTwoShell } from "./HeaderTwoShell";
import { W } from "./kit";

/**
 * Design 2 header: white, with the green logo in the centre and the pages on a ruled
 * line beneath it. The logo is the version without "DESIGN LLP", as in Design 1.
 */
export function HeaderTwo() {
  return (
    <HeaderTwoShell
      logo={<Mark name="sagework" label="Sagework" className="h-[30px] w-auto md:h-[34px]" />}
      items={nav2}
      cta={{ label: "Contact us", href: r2.contact }}
      extra={[{ label: "Photo gallery", href: r2.gallery }]}
      home={r2.home}
      email={contactEmail}
    />
  );
}

const lines: { text: string; dot: string }[] = [
  { text: "Built on Biology.", dot: lensColour.Biology.dot },
  { text: "Integrated Through Systems.", dot: lensColour.Environment.dot },
  { text: "Scaled for Human Potential.", dot: lensColour.Behaviour.dot },
];

/**
 * Design 2 footer: white (questionnaire, Q8 allows Sage Green or white). The tagline
 * is set as three lines, each with the colour of one lens.
 */
export function FooterTwo() {
  const cols = [footerNav2.slice(0, 5), footerNav2.slice(5)];
  return (
    <footer data-site-footer className="bg-white">
      <W>
        <ul className="grid border-t border-ink/25 md:grid-cols-3">
          {lines.map((l, n) => (
            <li key={l.text} className={`flex items-start gap-4 py-8 md:py-12 ${n ? "border-t border-line md:border-l md:border-t-0 md:pl-8" : ""}`}>
              <span className={`mt-3 h-3 w-3 shrink-0 rounded-full ${l.dot}`} />
              <span className="display text-[clamp(1.6rem,2.4vw,2.2rem)] text-ink">{l.text}</span>
            </li>
          ))}
        </ul>

        <div className="grid gap-12 border-t border-line py-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Mark name="sagework" label="Sagework" className="h-[40px] w-auto" />
            <a href={`mailto:${contactEmail}`} className="mt-8 block text-[1.15rem] font-semibold text-sage-ink underline-offset-4 hover:underline">
              {contactEmail}
            </a>
            <Link href={r2.contact} className="mt-2 inline-block text-[15.5px] underline underline-offset-4 hover:text-sage-ink">
              Start a conversation
            </Link>
          </div>

          <nav aria-label="Footer" className="lg:col-span-4">
            <p className="eyebrow">Explore</p>
            <div className="mt-4 grid grid-cols-2 gap-x-8">
              {cols.map((c, n) => (
                <ul key={n} className="space-y-2.5 text-[15.5px]">
                  {c.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="underline-offset-4 hover:text-sage-ink hover:underline">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </nav>

          <div className="lg:col-span-4">
            <p className="eyebrow">Before launch</p>
            <Note className="mt-4" why="the content master asks for these before launch (Page 8).">
              Approved LinkedIn link, Privacy Notice text and the company details to show in the footer.
            </Note>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line py-6 pb-20 text-[13.5px] text-ink-soft sm:flex-row sm:justify-between">
          <p>&copy; 2026 Sagework. All rights reserved.</p>
          <p>Draft for review. Not indexed by search engines.</p>
        </div>
      </W>
    </footer>
  );
}
