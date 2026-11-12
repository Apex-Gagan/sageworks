import type { Metadata } from "next";
import { Pic, imageData } from "@/components/shared/Pic";
import { Reveal } from "@/components/shared/Motion";
import { TriadTabs, type TabItem } from "@/components/three/Interactive";
import { Box, ButtonThree, Fig, Leaf, LinkThree } from "@/components/three/ui";
import { captions, type ImageKey } from "@/content/captions";
import { chapters, founderHero, lenses, type Chapter } from "@/content/founder";
import { research } from "@/content/home";
import { resolve } from "@/content/nav";

export const metadata: Metadata = {
  title: "Sample 3 | Founder, Dr Shruti Pai",
  description:
    "Dr Shruti Pai is a business leader, clinical nutrition scientist, gut microbiome researcher and human systems designer.",
};

const by = Object.fromEntries(chapters.map((c) => [c.id, c])) as Record<string, Chapter>;

const lensImages: ImageKey[] = [
  "hospitals/physio-figures",
  "academic/msap-terrace-steps",
  "academic/msap-courtyard",
];
const lensItems: TabItem[] = lenses.items.map((l, i) => {
  const d = imageData(lensImages[i]);
  return { name: l.name, line: l.line, body: l.body, src: d.src, blur: d.blur, alt: d.alt };
});

/** Chapter heading: the role on the left, its maxim on the right. */
function Head({ c }: { c: Chapter }) {
  return (
    <Reveal className="grid gap-4 border-t border-fg pt-6 lg:grid-cols-12 lg:items-baseline">
      <div className="lg:col-span-7">
        <h2 className="display text-[clamp(2.3rem,4.4vw,4.2rem)] leading-[1.02]">{c.role}</h2>
        <p className="mt-2 text-[15.5px] text-muted">{c.title}</p>
      </div>
      <p className="display text-[clamp(1.4rem,2.2vw,2rem)] leading-[1.15] text-accent lg:col-span-5 lg:text-right">
        <em>{c.maxim}</em>
      </p>
    </Reveal>
  );
}

function Paras({ c, className = "" }: { c: Chapter; className?: string }) {
  return (
    <Reveal className={`space-y-5 text-[16.5px] leading-relaxed text-fg/85 ${className}`} delay={0.06}>
      {c.body.map((p) => (
        <p key={p}>{p}</p>
      ))}
      {c.link ? (
        <div className="pt-2">
          <LinkThree href={resolve("/3", c.link.href)}>{c.link.label}</LinkThree>
        </div>
      ) : null}
    </Reveal>
  );
}

function Pull({ c }: { c: Chapter }) {
  if (!c.pull) return null;
  return (
    <Reveal className="leaf-sm mt-12 bg-tint p-7 md:p-10">
      {c.pullLead ? <p className="max-w-[56ch] text-[14.5px] text-fg/70">{c.pullLead}</p> : null}
      <p className="display mt-3 max-w-[30ch] text-[clamp(1.6rem,2.8vw,2.6rem)] leading-[1.14]">{c.pull}</p>
    </Reveal>
  );
}

export default function FounderThree() {
  const business = by["business-leader"];
  const scientist = by["scientist"];
  const designer = by["designer"];
  const writer = by["writer"];
  const gutsy = by["dr-gutsy"];
  const global = by["global"];
  const lived = by["lived"];

  return (
    <>
      {/* Hero: portrait first, then the name */}
      <section>
        <Box className="grid gap-10 pb-16 pt-10 md:pb-24 lg:grid-cols-12 lg:items-end xl:pt-14">
          <div className="lg:col-span-5">
            <Leaf
              k={founderHero.portrait}
              ratio="4 / 5"
              sizes="(min-width: 1024px) 32vw, 100vw"
              preload
              pos="50% 16%"
              className="max-h-[76dvh]"
            />
            <Fig>Reviewing artwork studies in the design studio.</Fig>
          </div>
          <div className="lg:col-span-7">
            <p className="label text-muted">{founderHero.title}</p>
            <h1 className="display mt-5 text-[clamp(3.4rem,7.6vw,7.75rem)] leading-[0.94]">
              Dr Shruti <em className="text-accent">Pai</em>
            </h1>
            <ul className="mt-8 grid grid-cols-2 gap-x-8 text-[14.5px]">
              {founderHero.roles.map((r) => (
                <li key={r} className="border-t border-line py-3 text-fg/85">
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-[44ch] text-[16px] leading-relaxed text-muted">{founderHero.lead}</p>
            <p className="display mt-2 text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.12]">
              <em>{founderHero.question}</em>
            </p>
          </div>
        </Box>
      </section>

      {/* Introduction as three columns */}
      <section className="bg-surface">
        <Box className="grid gap-8 py-16 md:grid-cols-3 md:py-24">
          {founderHero.intro.map((p, i) => (
            <Reveal key={p} delay={i * 0.07} className="border-t border-fg pt-5">
              <p className={i === 0 ? "display text-[1.6rem] leading-[1.25]" : "text-[16.5px] leading-relaxed text-fg/80"}>{p}</p>
            </Reveal>
          ))}
        </Box>
      </section>

      {/* Business Leader: text beside a ledger, then three photographs */}
      <section id={business.id} className="scroll-mt-20">
        <Box className="py-20 md:py-28">
          <Head c={business} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <Paras c={business} className="lg:col-span-7" />
            <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
              <dl className="leaf-sm bg-deep p-8 text-on-deep">
                {(business.facts ?? []).map((f, i) => (
                  <div key={f.value} className={i > 0 ? "mt-7 border-t border-on-deep/20 pt-7" : ""}>
                    <dt className="display text-[clamp(2.4rem,3.8vw,3.4rem)] leading-none text-accent-soft">{f.value}</dt>
                    <dd className="mt-2 text-[14px] text-on-deep-muted">{f.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
          <Reveal className="mt-12 grid gap-4 sm:grid-cols-12">
            <figure className="sm:col-span-7">
              <Leaf k="hospitality/chef-van-team" ratio="16 / 10" sizes="(min-width: 640px) 40vw, 100vw" />
              <Fig>{captions["hospitality/chef-van-team"]}.</Fig>
            </figure>
            <figure className="sm:col-span-5">
              <div className="grid grid-cols-2 gap-4">
                <Pic k="founder/chef-on-wheels-kitchen" ratio="3 / 4" sizes="18vw" pos="38% 30%" />
                <Pic k="hospitality/chef-van-serving" ratio="3 / 4" sizes="18vw" pos="70% 40%" />
              </div>
              <Fig>Inside the kitchen, and serving from the van.</Fig>
            </figure>
          </Reveal>
          <Pull c={business} />
        </Box>
      </section>

      {/* Scientist: credentials and publications set as a record */}
      <section id={scientist.id} className="scroll-mt-20 bg-surface">
        <Box className="py-20 md:py-28">
          <Head c={scientist} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Paras c={scientist} />
            </div>
            <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
              <dl className="rounded-[8px] bg-bg p-7 md:p-9">
                {(scientist.facts ?? []).map((f, i) => (
                  <div
                    key={f.value}
                    className={`grid grid-cols-[7.5rem_1fr] items-baseline gap-4 py-4 ${i > 0 ? "border-t border-line" : ""}`}
                  >
                    <dt className="display text-[1.9rem] leading-none text-accent">{f.value}</dt>
                    <dd className="text-[15.5px]">{f.label}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-8 text-[14px] text-muted">Peer-reviewed publications</p>
              <ol className="mt-3">
                {research.publications.map((p) => (
                  <li key={p.title} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-line py-4">
                    <span className="font-mono text-[12.5px] text-accent">{p.year}</span>
                    <div>
                      <p className="text-[15px] leading-snug">{p.title}</p>
                      <p className="mt-1 text-[13px] text-muted">{p.journal}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
          <Pull c={scientist} />
        </Box>
      </section>

      {/* Designer: a wall of spaces */}
      <section id={designer.id} className="scroll-mt-20">
        <Box className="py-20 md:py-28">
          <Head c={designer} />
          <Reveal className="mt-10 grid gap-4 sm:grid-cols-12 sm:grid-rows-2">
            <div className="sm:col-span-7 sm:row-span-2">
              <Leaf k="hospitals/mangalore-shell-lobby" ratio="13 / 10" sizes="(min-width: 640px) 42vw, 100vw" />
            </div>
            <div className="sm:col-span-5">
              <Pic k="hospitals/whitefield-angel-corridor" ratio="16 / 9" sizes="30vw" />
            </div>
            <div className="grid grid-cols-2 gap-4 sm:col-span-5">
              <Pic k="academic/marc-auditorium" ratio="1 / 1" sizes="15vw" />
              <Pic k="founder/site-auditorium" ratio="1 / 1" sizes="15vw" pos="50% 60%" />
            </div>
          </Reveal>
          <Fig>
            A lobby in Mangalore, a corridor in Whitefield, and an auditorium in Bengaluru after and during its build.
          </Fig>
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <Paras c={designer} className="lg:col-span-7" />
          </div>
          <Pull c={designer} />
        </Box>
      </section>

      {/* Writer and Dr Gutsy, two short chapters side by side */}
      <section className="bg-surface">
        <Box className="grid gap-6 py-20 md:py-28 lg:grid-cols-2">
          <article id={writer.id} className="scroll-mt-20 rounded-[8px] bg-bg p-7 md:p-10">
            <h2 className="display text-[clamp(2rem,3.2vw,3rem)] leading-[1.04]">{writer.role}</h2>
            <p className="mt-2 text-[15px] text-muted">{writer.title}</p>
            <p className="display mt-6 text-[1.6rem] leading-[1.15] text-accent">
              <em>{writer.maxim}</em>
            </p>
            <Paras c={writer} className="mt-6" />
          </article>
          <article id={gutsy.id} className="leaf scroll-mt-20 bg-tint p-7 md:p-10">
            <h2 className="display text-[clamp(2rem,3.2vw,3rem)] leading-[1.04]">{gutsy.role}</h2>
            <p className="mt-2 text-[15px] text-fg/70">{gutsy.title}</p>
            <p className="display mt-6 text-[1.6rem] leading-[1.15] text-accent">
              <em>{gutsy.maxim}</em>
            </p>
            <Paras c={gutsy} className="mt-6" />
          </article>
        </Box>
      </section>

      {/* Global perspective: five places in a row */}
      <section id={global.id} className="scroll-mt-20">
        <Box className="py-20 md:py-28">
          <Head c={global} />
          <Reveal>
            <ul className="mt-10 grid grid-cols-2 border-l border-line sm:grid-cols-3 lg:grid-cols-5">
              {(global.facts ?? []).map((f) => (
                <li key={f.value} className="border-b border-r border-t border-line px-5 py-7">
                  <span className="display text-[clamp(1.4rem,2.2vw,2rem)] leading-tight">{f.value}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-center">
            <Paras c={global} className="lg:col-span-6" />
            <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
              <Leaf k="hospitals/malaysia-mural" ratio="16 / 10" variant="leaf-flip" sizes="(min-width: 1024px) 32vw, 100vw" />
              <Fig>{captions["hospitals/malaysia-mural"]}.</Fig>
            </Reveal>
          </div>
          <Pull c={global} />
        </Box>
      </section>

      {/* Lived experience */}
      <section id={lived.id} className="scroll-mt-20 bg-surface">
        <Box className="py-20 md:py-28">
          <Head c={lived} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-center">
            <Reveal className="grid grid-cols-2 gap-4 lg:col-span-6">
              <Leaf k="founder/mosaic-wall" ratio="3 / 4" sizes="24vw" pos="50% 40%" variant="leaf-sm" />
              <div className="pt-12">
                <Pic k="founder/site-foundation" ratio="3 / 4" sizes="24vw" />
              </div>
            </Reveal>
            <Paras c={lived} className="lg:col-span-5 lg:col-start-8" />
          </div>
        </Box>
      </section>

      {/* Three lenses */}
      <section>
        <Box className="py-20 md:py-28">
          <Reveal>
            <p className="display max-w-[26ch] pb-10 text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.18]">{lenses.lead}</p>
          </Reveal>
          <TriadTabs items={lensItems} id="lens" />
          <Reveal className="mt-16 border-t border-fg pt-10">
            {lenses.close.map((line) => (
              <p key={line} className="display text-[clamp(1.6rem,3vw,2.8rem)] leading-[1.18] text-fg/50">
                {line}
              </p>
            ))}
            <p className="display mt-5 text-[clamp(2.1rem,4.2vw,4rem)] leading-[1.06]">
              Sagework operates <em className="text-accent">where all three meet.</em>
            </p>
            <p className="label mt-9 text-muted">{lenses.tagline}</p>
            <div className="mt-9">
              <ButtonThree href="/3#work">{lenses.cta}</ButtonThree>
            </div>
          </Reveal>
        </Box>
      </section>
    </>
  );
}
