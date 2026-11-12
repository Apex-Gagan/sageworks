import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Pic } from "@/components/shared/Pic";
import { TriadMark } from "@/components/shared/Triad";
import type { ImageKey } from "@/content/captions";

export const metadata: Metadata = {
  title: "Sagework | Two design directions",
};

type Sample = {
  id: "1" | "2";
  name: string;
  line: string;
  references: string;
  type: string;
  palette: string[];
  image: ImageKey;
  dark: boolean;
};

const samples: Sample[] = [
  {
    id: "1",
    name: "Still",
    line: "Light, editorial and quiet. Photographs sit like plates in a journal, with evidence cues in small mono type.",
    references: "Aesop for atmosphere. Seed for science-led restraint.",
    type: "Cormorant Garamond with Hanken Grotesk",
    palette: ["#f3f4ec", "#e8ebde", "#35543a", "#1b2a20"],
    image: "hospitals/zen-waiting",
    dark: false,
  },
  {
    id: "2",
    name: "Canopy",
    line: "Dark, immersive and photography-led. Large statements, a filterable wall of work and stronger calls to action.",
    references: "Mindvalley for philosophy and scale. Dr Chatterjee for warmth and authority.",
    type: "Bricolage Grotesque with Hanken Grotesk",
    palette: ["#0d1611", "#14211a", "#cfe39a", "#ebe9dc"],
    image: "academic/msap-aerial-mist",
    dark: true,
  },
];

const pages = [
  { label: "Homepage", path: "" },
  { label: "Founder page", path: "/founder" },
  { label: "Projects page", path: "/projects" },
];

export default function Overview() {
  return (
    <main className="grain min-h-[100dvh] bg-bg font-body text-fg">
      <div className="mx-auto max-w-[1440px] px-5 py-10 md:px-10 md:py-14">
        <header className="flex items-center justify-between border-b border-line pb-6">
          <div className="flex items-center gap-2.5">
            <TriadMark className="h-6 w-6 text-accent" />
            <span className="display text-[1.6rem] leading-none">Sagework</span>
          </div>
          <p className="text-[13px] text-muted">Website design samples</p>
        </header>

        <section className="py-14 md:py-20">
          <h1 className="display max-w-4xl text-[clamp(2.75rem,6vw,5.75rem)] leading-[1.02]">
            Two directions for <em className="italic text-accent">one human system</em>
          </h1>
          <p className="mt-7 max-w-[62ch] text-[17px] leading-relaxed text-fg/80">
            Each sample covers the same three pages with the same approved copy and photography, so the
            difference you see is the design itself. Open any page below, then use the switch at the
            bottom of the screen to compare the two.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {samples.map((s) => (
            <article key={s.id} className="flex flex-col border border-line bg-surface">
              <Link href={`/${s.id}`} className="group block overflow-hidden" aria-label={`Open sample ${s.id} homepage`}>
                <Pic
                  k={s.image}
                  ratio="16 / 10"
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  preload={s.id === "1"}
                  imgClassName="transition-transform duration-[1400ms] ease-soft group-hover:scale-[1.03]"
                />
              </Link>
              <div className="flex flex-1 flex-col p-7 md:p-10">
                <p className="text-[13.5px] text-muted">Sample {s.id}</p>
                <h2 className="display mt-2 text-[clamp(2.6rem,4.4vw,4rem)] leading-none">{s.name}</h2>
                <p className="mt-5 max-w-[48ch] text-[16px] leading-relaxed text-fg/85">{s.line}</p>

                <dl className="mt-8 grid gap-5 border-t border-line pt-6 text-[14px] sm:grid-cols-2">
                  <div>
                    <dt className="text-muted">Draws on</dt>
                    <dd className="mt-1.5 leading-snug">{s.references}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Typefaces</dt>
                    <dd className="mt-1.5 leading-snug">{s.type}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-muted">Palette</dt>
                    <dd className="mt-2.5 flex gap-2">
                      {s.palette.map((c) => (
                        <span
                          key={c}
                          title={c}
                          className="h-9 w-14 border border-line"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </dd>
                  </div>
                </dl>

                <ul className="mt-8 border-t border-line">
                  {pages.map((p) => (
                    <li key={p.label} className="border-b border-line">
                      <Link
                        href={`/${s.id}${p.path}`}
                        className="group flex items-center justify-between py-4 text-[16px] transition-colors hover:text-accent"
                      >
                        <span className="display text-[1.5rem] leading-none">
                          {p.label} {s.id}
                        </span>
                        <ArrowRight size={17} className="transition-transform duration-500 group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </section>

        <footer className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-[12.5px] text-muted sm:flex-row sm:justify-between">
          <p>Prepared for Dr Shruti Pai and the Sagework team.</p>
          <p>Draft for review. Not indexed by search engines.</p>
        </footer>
      </div>
    </main>
  );
}
