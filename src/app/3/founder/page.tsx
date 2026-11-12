import type { Metadata } from "next";
import { Pic } from "@/components/shared/Pic";
import { Reveal } from "@/components/shared/Motion";
import { Heading, Hl, Pill, Small, Wrap3 } from "@/components/three/ui";
import { captions, type ImageKey } from "@/content/captions";
import { chapters, founderHero, lenses, type Chapter } from "@/content/founder";
import { proof, research } from "@/content/home";
import { resolve } from "@/content/nav";

export const metadata: Metadata = {
  title: "Sample 3 | Founder, Dr Shruti Pai",
  description:
    "Dr Shruti Pai is a business leader, clinical nutrition scientist, gut microbiome researcher and human systems designer.",
};

/** Two photographs per chapter keeps the story moving without crowding it. */
const chapterImages: Record<string, ImageKey[]> = {
  "business-leader": ["hospitality/chef-van-team", "founder/chef-on-wheels-kitchen"],
  scientist: ["hospitals/tree-of-life-front", "hospitals/physio-get-set-go"],
  designer: ["hospitals/mangalore-shell-lobby", "academic/marc-auditorium"],
  writer: ["founder/team-table"],
  "dr-gutsy": [],
  global: ["hospitals/malaysia-mural", "academic/msap-aerial-mist"],
  lived: ["founder/site-foundation", "founder/mosaic-wall"],
};

const lensImages: ImageKey[] = [
  "hospitals/physio-figures",
  "academic/msap-terrace-steps",
  "academic/msap-courtyard",
];

function ChapterBlock({ c, tone }: { c: Chapter; tone: "bg" | "surface" }) {
  const images = chapterImages[c.id] ?? [];
  const chips = c.facts?.every((f) => !f.label);
  return (
    <section id={c.id} className={`scroll-mt-24 ${tone === "surface" ? "bg-surface" : ""}`}>
      <Wrap3 className="grid gap-10 py-16 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-28">
            <h2 className="display text-[clamp(2rem,3.4vw,2.9rem)] leading-[1.1]">{c.role}</h2>
            <p className="mt-2 text-[16px] text-muted">{c.title}</p>
            <p className="mt-6 text-[clamp(1.2rem,1.9vw,1.55rem)] font-semibold leading-[1.5]">
              <Hl>{c.maxim}</Hl>
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal className="space-y-5 text-[17px] leading-relaxed text-fg/80">
            {c.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          {c.facts && chips ? (
            <Reveal>
              <ul className="mt-8 flex flex-wrap gap-2">
                {c.facts.map((f) => (
                  <li key={f.value} className="rounded-full bg-tint px-4 py-2 text-[15px] font-semibold text-accent-ink">
                    {f.value}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}

          {c.facts && !chips ? (
            <Reveal>
              <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {c.facts.map((f, i) => (
                  <div
                    key={f.value + f.label}
                    className={`rounded-[12px] px-5 py-5 ${i === 0 ? "bg-accent text-on-accent" : tone === "surface" ? "bg-bg" : "bg-surface-2"}`}
                  >
                    <dt className="display text-[clamp(1.7rem,2.6vw,2.3rem)] leading-none">{f.value}</dt>
                    <dd className={`mt-2 text-[14px] leading-snug ${i === 0 ? "text-on-accent/80" : "text-muted"}`}>{f.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ) : null}

          {c.id === "scientist" ? (
            <Reveal className="mt-8">
              <p className="text-[14px] font-semibold uppercase tracking-[0.08em] text-accent-ink">
                Peer-reviewed publications
              </p>
              <ol className="mt-3">
                {research.publications.map((p) => (
                  <li key={p.title} className="grid grid-cols-[3.6rem_1fr] gap-4 border-t border-line py-4">
                    <span className="text-[14px] font-semibold text-accent-ink">{p.year}</span>
                    <div>
                      <p className="text-[15.5px] font-semibold leading-snug">{p.title}</p>
                      <p className="mt-1 text-[13.5px] text-muted">{p.journal}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          ) : null}

          {images.length ? (
            <Reveal className={`mt-10 grid gap-4 ${images.length > 1 ? "sm:grid-cols-2" : ""}`}>
              {images.map((k) => (
                <figure key={k}>
                  <Pic
                    k={k}
                    ratio={images.length > 1 ? "4 / 3" : "16 / 9"}
                    sizes="(min-width: 1024px) 340px, 100vw"
                    pos="50% 30%"
                  />
                  <Small>{captions[k]}.</Small>
                </figure>
              ))}
            </Reveal>
          ) : null}

          {c.pull ? (
            <Reveal className={`cut mt-10 px-7 py-9 md:px-10 ${tone === "surface" ? "bg-bg" : "bg-surface-2"}`}>
              {c.pullLead ? <p className="text-[15px] text-muted">{c.pullLead}</p> : null}
              <p className="display mt-3 text-[clamp(1.4rem,2.3vw,1.95rem)] leading-[1.25]">{c.pull}</p>
            </Reveal>
          ) : null}

          {c.link ? (
            <div className="mt-8">
              <Pill href={resolve("/3", c.link.href)} tone="outline">
                {c.link.label}
              </Pill>
            </div>
          ) : null}
        </div>
      </Wrap3>
    </section>
  );
}

export default function FounderThree() {
  return (
    <>
      {/* Hero */}
      <section className="bg-surface">
        <Wrap3 className="grid items-center gap-12 py-14 md:py-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-accent-ink">{founderHero.title}</p>
            <h1 className="display mt-4 text-[clamp(3.2rem,7.6vw,6.75rem)] leading-[1] tracking-[-0.04em]">
              Dr Shruti Pai
            </h1>
            <ul className="mt-7 flex flex-wrap gap-2">
              {founderHero.roles.map((r) => (
                <li key={r} className="rounded-full border border-line bg-bg px-4 py-2 text-[14.5px] font-semibold">
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-9 text-[17px] text-muted">{founderHero.lead}</p>
            <p className="display mt-2 max-w-[20ch] text-[clamp(1.8rem,3.4vw,2.9rem)] leading-[1.25]">
              How do we build systems that <Hl>truly help people?</Hl>
            </p>
          </div>
          <div className="relative lg:col-span-5">
            <div className="cut overflow-hidden">
              <Pic
                k={founderHero.portrait}
                ratio="4 / 5"
                sizes="(min-width: 1024px) 480px, 100vw"
                preload
                pos="50% 16%"
                className="max-h-[72dvh] rounded-none"
              />
            </div>
            <div className="absolute -left-2 bottom-12 rounded-[10px] bg-accent px-5 py-4 text-on-accent shadow-[0_18px_40px_-22px_rgba(21,27,37,0.5)] md:-left-8">
              <p className="display text-[1.7rem] leading-none">PhD</p>
              <p className="mt-1 text-[13px] font-semibold">Clinical Nutrition</p>
            </div>
            <Small>Reviewing artwork studies in the design studio.</Small>
          </div>
        </Wrap3>
      </section>

      {/* Giant numbers */}
      <section className="border-b border-line">
        <Wrap3 className="py-14 md:py-20">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-12 text-center lg:grid-cols-4">
            {proof.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.06}>
                <dt className="display text-[clamp(2.8rem,6vw,5.25rem)] leading-none tracking-[-0.04em]">{f.value}</dt>
                <dd className="mx-auto mt-4 max-w-[24ch]">
                  <span className="block text-[17px] font-semibold">{f.unit}</span>
                  <span className="mt-1 block text-[15px] leading-snug text-muted">{f.label}</span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </Wrap3>
      </section>

      {/* Introduction */}
      <section>
        <Wrap3 className="py-16 md:py-24">
          <Reveal>
            <Heading title={founderHero.intro[0]} />
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-[1000px] gap-8 md:grid-cols-2">
            {founderHero.intro.slice(1).map((p, i) => (
              <Reveal key={p} delay={i * 0.08}>
                <p className="text-[17px] leading-relaxed text-fg/80">{p}</p>
              </Reveal>
            ))}
          </div>
        </Wrap3>
      </section>

      {/* Chapters */}
      {chapters.map((c, i) => (
        <ChapterBlock key={c.id} c={c} tone={i % 2 === 0 ? "surface" : "bg"} />
      ))}

      {/* Three lenses */}
      <section>
        <Wrap3 className="py-20 md:py-28">
          <Reveal>
            <Heading
              title={
                <>
                  Three <Hl>connected lenses</Hl>
                </>
              }
              sub={lenses.lead}
            />
          </Reveal>
          <div className="mt-14 grid gap-x-7 gap-y-12 md:grid-cols-3">
            {lenses.items.map((l, i) => (
              <Reveal key={l.name} delay={i * 0.08}>
                <Pic k={lensImages[i]} ratio="3 / 2" sizes="(min-width: 768px) 390px, 100vw" />
                <h3 className="display mt-6 text-[1.8rem] leading-tight">{l.name}</h3>
                <p className="mt-1.5 text-[16px] font-semibold text-accent-ink">{l.line}</p>
                <p className="mt-3 text-[16.5px] leading-relaxed text-fg/80">{l.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-16 rounded-[12px] bg-surface-2 px-7 py-10 md:px-14 md:py-14">
            {lenses.close.map((line) => (
              <p key={line} className="display text-[clamp(1.4rem,2.6vw,2.2rem)] leading-[1.3] text-fg/55">
                {line}
              </p>
            ))}
            <p className="display mt-4 text-[clamp(1.8rem,3.4vw,2.9rem)] leading-[1.3]">
              Sagework operates <Hl>where all three meet.</Hl>
            </p>
            <p className="mt-7 text-[13px] font-semibold uppercase tracking-[0.1em] text-muted">{lenses.tagline}</p>
            <div className="mt-8">
              <Pill href="/3#work">{lenses.cta}</Pill>
            </div>
          </Reveal>
        </Wrap3>
      </section>
    </>
  );
}
