import type { Metadata } from "next";
import Link from "next/link";
import { Pic, imageData } from "@/components/shared/Pic";
import { Reveal } from "@/components/shared/Motion";
import {
  HeroSlides,
  SensesSheet,
  ServiceSelector,
  TriadTabs,
  type SenseItem,
  type ServiceItem,
  type Slide,
  type TabItem,
} from "@/components/three/Interactive";
import { Box, ButtonThree, Fig, Leaf, LinkThree } from "@/components/three/ui";
import type { ImageKey } from "@/content/captions";
import { applies, discussHref, presentNeed, sageOs, senseEvidence, wisePapers } from "@/content/discover";
import {
  about,
  contactEmail,
  contactHref,
  founderTeaser,
  gutsy,
  hero,
  homeGallery,
  proof,
  research,
  senses,
  triad,
  work,
} from "@/content/home";

export const metadata: Metadata = {
  title: "Sample 3 | Home",
};

const slides: Slide[] = homeGallery.slice(0, 6).map((g) => {
  const d = imageData(g.image);
  return { src: d.src, blur: d.blur, alt: d.alt, title: g.title, place: g.place };
});

const triadItems: TabItem[] = triad.domains.map((d) => {
  const i = imageData(d.image);
  return { name: d.name, line: d.question, body: d.body, detail: d.detail, src: i.src, blur: i.blur, alt: i.alt };
});

const serviceItems: ServiceItem[] = work.services.map((s) => {
  const d = imageData(s.image);
  return {
    name: s.name,
    body: s.body,
    outputs: s.outputs,
    src: d.src,
    blur: d.blur,
    alt: d.alt,
    href: discussHref(contactEmail, s.name),
  };
});

const senseItems: SenseItem[] = senses.items.map((s) => {
  const d = imageData(s.image);
  const e = senseEvidence[s.name];
  return {
    name: s.name,
    line: s.line,
    body: s.body,
    finding: e.finding,
    source: e.source,
    src: d.src,
    blur: d.blur,
    alt: d.alt,
  };
});

/** Five photographs for the work mosaic: one tall leaf and four frames. */
const mosaic: { k: ImageKey; title: string; place: string }[] = [
  { k: "hospitals/dwarka-butterfly-lobby", title: "Many butterflies make one", place: "Manipal Hospital, Dwarka" },
  { k: "hospitals/reception-colour-frieze", title: "A reception under colour", place: "Hospital lobby" },
  { k: "hospitality/wgsha-kitchen-red", title: "Kitchens on a red floor", place: "WGSHA, Manipal" },
  { k: "academic/library-shelves", title: "A library sorted by colour", place: "Campus library" },
  { k: "hospitals/jaipur-peacock", title: "A peacock along the corridor", place: "Hospital corridor" },
];

const gutsyTilt = ["md:-rotate-2 md:translate-y-3", "md:rotate-1", "md:-rotate-1 md:translate-y-5"];

export default function HomeThree() {
  return (
    <>
      {/* 1. Hero: headline above a slideshow of the work */}
      <section>
        <Box className="pb-16 pt-10 md:pb-24 xl:pt-14">
          <p className="label text-muted">Evidence-led advisory and design practice</p>
          <h1 className="display mt-5 max-w-[20ch] text-[clamp(2.5rem,4.9vw,5rem)] leading-[1.04]">
            Designing human systems for <em className="text-accent">health, resilience and performance</em>
          </h1>
          <div className="mt-10">
            <HeroSlides slides={slides}>
              <p className="text-[17px] leading-relaxed text-fg/80">{hero.sub}</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                <ButtonThree href="#about">{hero.cta}</ButtonThree>
                <LinkThree href={contactHref}>Start a Conversation</LinkThree>
              </div>
            </HeroSlides>
          </div>
        </Box>
      </section>

      {/* 2. The present need */}
      <section className="border-t border-line">
        <Box className="grid gap-10 py-20 md:py-28 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <h2 className="display text-[clamp(2.1rem,3.9vw,3.6rem)] leading-[1.06]">
              Modern systems are changing <em className="text-accent">faster than human biology</em>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.08}>
            <p className="text-[16.5px] leading-relaxed text-fg/80">{presentNeed.body}</p>
            <p className="leaf-sm mt-7 bg-tint p-7 text-[16.5px] leading-relaxed text-fg">{presentNeed.gap}</p>
            <p className="mt-7 text-[16.5px] leading-relaxed text-fg/80">{presentNeed.close}</p>
          </Reveal>
        </Box>
      </section>

      {/* 3. About: the statement and the proof */}
      <section id="about" className="scroll-mt-20 bg-surface">
        <Box className="grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="display text-[clamp(2.8rem,6.4vw,6.5rem)] leading-[0.98]">
                Health is shaped by <em className="text-accent">systems.</em>
              </h2>
              <p className="display mt-8 max-w-[30ch] text-[clamp(1.4rem,2.1vw,1.9rem)] leading-[1.28]">{about.lead}</p>
            </Reveal>
            <Reveal className="mt-8 max-w-[58ch] space-y-5 text-[16.5px] leading-relaxed text-fg/80" delay={0.08}>
              {about.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
          </div>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <dl className="leaf grid grid-cols-2 gap-x-6 gap-y-9 bg-deep p-8 text-on-deep md:p-11">
              {proof.map((f) => (
                <div key={f.label}>
                  <dt className="display text-[clamp(2rem,3.4vw,3.1rem)] leading-none text-accent-soft">{f.value}</dt>
                  <dd className="mt-3 text-[13.5px] leading-snug text-on-deep-muted">
                    <span className="block text-on-deep">{f.unit}</span>
                    {f.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Box>
      </section>

      {/* 4. The triad as tabs */}
      <section className="border-t border-line">
        <Box className="py-20 md:py-28">
          <Reveal className="grid gap-6 pb-12 lg:grid-cols-12 lg:items-end">
            <h2 className="display text-[clamp(2.1rem,3.9vw,3.6rem)] leading-[1.06] lg:col-span-6">
              Three domains. <em className="text-accent">One human system.</em>
            </h2>
            <p className="text-[16.5px] leading-relaxed text-fg/80 lg:col-span-5 lg:col-start-8">
              {triad.intro} {triad.body}
            </p>
          </Reveal>
          <TriadTabs items={triadItems} />
          <Reveal className="mt-14 grid gap-6 border-t border-line pt-8 md:grid-cols-12 md:items-center">
            <p className="display text-[clamp(1.25rem,1.9vw,1.7rem)] leading-[1.3] md:col-span-8">{triad.close}</p>
            <div className="md:col-span-4 md:text-right">
              <LinkThree href="#research">{triad.cta}</LinkThree>
            </div>
          </Reveal>
        </Box>
      </section>

      {/* 5. SAGE OS: the four letters are the four steps */}
      <section className="bg-surface">
        <Box className="py-20 md:py-28">
          <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <p className="label text-muted">SAGE OS</p>
              <h2 className="display mt-5 text-[clamp(2.1rem,3.9vw,3.6rem)] leading-[1.06]">
                A disciplined framework <em className="text-accent">from diagnosis to action</em>
              </h2>
            </div>
            <p className="text-[16.5px] leading-relaxed text-fg/80 lg:col-span-5 lg:col-start-8">{sageOs.body}</p>
          </Reveal>
          <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {sageOs.steps.map((s, i) => (
              <li key={s.name}>
                <Reveal delay={i * 0.07} className="border-t border-fg pt-5">
                  <p className="display text-[clamp(4.5rem,8vw,7.5rem)] leading-[0.8] text-accent" aria-hidden="true">
                    {s.name[0]}
                  </p>
                  <h3 className="display mt-5 text-[1.9rem] leading-none">{s.name}</h3>
                  <p className="mt-2 text-[14.5px] text-fg">{s.line}</p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{s.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal className="mt-12">
            <p className="max-w-[70ch] text-[15.5px] leading-relaxed text-fg/75">{sageOs.close}</p>
          </Reveal>
        </Box>
      </section>

      {/* 6. Selected work as a mosaic */}
      <section className="border-t border-line">
        <Box className="py-20 md:py-28">
          <div className="flex flex-col items-start gap-6 pb-10 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="display max-w-[18ch] text-[clamp(2.1rem,3.9vw,3.6rem)] leading-[1.06]">
              Environments designed for <em className="text-accent">the people inside them</em>
            </h2>
            <ButtonThree href="/3/projects" tone="line">
              View all projects
            </ButtonThree>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2">
            {mosaic.map((m, i) => (
              <Reveal
                key={m.k}
                delay={(i % 3) * 0.06}
                className={
                  i === 0
                    ? "sm:col-span-2 lg:col-span-5 lg:row-span-2"
                    : i === 1 || i === 4
                      ? "lg:col-span-4"
                      : "lg:col-span-3"
                }
              >
                <Link href="/3/projects" className="group flex h-full flex-col">
                  <div
                    className={`relative min-h-[240px] flex-1 overflow-hidden bg-surface ${i === 0 ? "leaf min-h-[420px] lg:min-h-0" : "rounded-[8px]"}`}
                  >
                    <Pic
                      k={m.k}
                      cover
                      sizes="(min-width: 1024px) 34vw, 100vw"
                      className="absolute inset-0 rounded-none"
                      imgClassName="transition-transform duration-[1400ms] ease-soft group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-3 text-[15px] leading-snug transition-colors group-hover:text-accent">{m.title}</p>
                  <p className="text-[13px] text-muted">{m.place}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Box>
      </section>

      {/* 7. Work with Sagework */}
      <section id="work" className="scroll-mt-20 bg-surface">
        <Box className="py-20 md:py-28">
          <Reveal className="grid gap-6 pb-12 lg:grid-cols-12 lg:items-end">
            <h2 className="display text-[clamp(2.1rem,3.9vw,3.6rem)] leading-[1.06] lg:col-span-6">
              Build health and performance <em className="text-accent">into the system.</em>
            </h2>
            <p className="text-[16.5px] leading-relaxed text-fg/80 lg:col-span-5 lg:col-start-8">{work.lead}</p>
          </Reveal>
          <div className="rounded-[8px] bg-bg p-5 md:p-8">
            <ServiceSelector items={serviceItems} />
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <h3 className="display text-[clamp(1.6rem,2.4vw,2.1rem)] leading-[1.12]">{applies.title}</h3>
              <p className="mt-4 text-[15.5px] leading-relaxed text-fg/80">{applies.lead}</p>
            </Reveal>
            <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
              {applies.items.map((a) => (
                <li key={a.name} className="border-t border-line py-5">
                  <p className="text-[15.5px] font-medium">{a.name}</p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{a.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <Reveal className="mt-14 grid gap-6 border-t border-line pt-8 md:grid-cols-12 md:items-center">
            <p className="display text-[clamp(1.25rem,1.9vw,1.7rem)] leading-[1.3] md:col-span-8">{work.note}</p>
            <div className="md:col-span-4 md:text-right">
              <ButtonThree href={contactHref}>Start a Conversation</ButtonThree>
            </div>
          </Reveal>
        </Box>
      </section>

      {/* 8. Founder */}
      <section className="border-t border-line">
        <Box className="grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
          <Reveal className="relative lg:col-span-5">
            <Leaf
              k="founder/reviewing-designs"
              ratio="4 / 5"
              sizes="(min-width: 1024px) 32vw, 100vw"
              pos="50% 18%"
            />
            <div className="leaf-sm absolute -bottom-6 -right-2 w-[46%] overflow-hidden border-[6px] border-bg md:-right-8">
              <Pic k="founder/team-table" ratio="4 / 3" sizes="18vw" className="rounded-none" />
            </div>
            <Fig>Reviewing artwork studies in the design studio.</Fig>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <p className="label text-muted">{founderTeaser.kicker}</p>
            <p className="display mt-5 text-[clamp(1.9rem,3.4vw,3.2rem)] leading-[1.12]">
              <em>{founderTeaser.question}</em>
            </p>
            <p className="mt-5 text-[14px] text-muted">{founderTeaser.role}</p>
            <div className="mt-7 space-y-5 text-[16.5px] leading-relaxed text-fg/80">
              {founderTeaser.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8">
              <ButtonThree href="/3/founder" tone="ink">
                {founderTeaser.cta}
              </ButtonThree>
            </div>
          </Reveal>
        </Box>
      </section>

      {/* 9. Five senses */}
      <section id="senses" className="scroll-mt-20 bg-surface">
        <Box className="py-20 md:py-28">
          <Reveal className="grid gap-6 pb-12 lg:grid-cols-12 lg:items-end">
            <h2 className="display text-[clamp(2.1rem,3.9vw,3.6rem)] leading-[1.06] lg:col-span-6">
              The body&rsquo;s interface <em className="text-accent">with the world</em>
            </h2>
            <p className="text-[16.5px] leading-relaxed text-fg/80 lg:col-span-5 lg:col-start-8">
              {senses.intro} {senses.body}
            </p>
          </Reveal>
          <SensesSheet items={senseItems} />
          <Reveal className="mt-10 border-t border-line pt-8">
            <p className="display max-w-[40ch] text-[clamp(1.25rem,1.9vw,1.7rem)] leading-[1.3]">{senses.close}</p>
          </Reveal>
        </Box>
      </section>

      {/* 10. Dr Gutsy: three questions on three notes */}
      <section id="gutsy" className="scroll-mt-20 border-t border-line">
        <Box className="py-20 md:py-28">
          <div className="leaf bg-tint px-6 py-12 md:px-12 md:py-16">
            <Reveal className="mx-auto max-w-3xl text-center">
              <h2 className="display text-[clamp(2.1rem,3.9vw,3.6rem)] leading-[1.06]">
                Dr Gutsy. <em className="text-accent">{gutsy.title}.</em>
              </h2>
              <p className="mt-5 text-[17px] leading-relaxed text-fg/85">{gutsy.lead}</p>
            </Reveal>
            <ul className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
              {gutsy.questions.map((q, i) => (
                <li key={q}>
                  <Reveal delay={i * 0.08}>
                    <div
                      className={`flex min-h-[15rem] flex-col justify-between rounded-[8px] bg-bg p-7 shadow-[0_24px_50px_-28px_rgba(26,32,64,0.45)] transition-transform duration-700 ease-soft hover:!translate-y-0 hover:!rotate-0 ${gutsyTilt[i]}`}
                    >
                      <span className="display text-[3.2rem] leading-none text-accent" aria-hidden="true">
                        ?
                      </span>
                      <p className="display mt-6 text-[clamp(1.25rem,1.8vw,1.6rem)] leading-[1.22]">{q}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Reveal className="mx-auto mt-14 max-w-2xl text-center">
              <p className="text-[16px] leading-relaxed text-fg/80">{gutsy.body}</p>
              <p className="label mt-7 text-accent">{gutsy.sign}</p>
            </Reveal>
          </div>
        </Box>
      </section>

      {/* 11. Research */}
      <section id="research" className="scroll-mt-20 border-t border-line">
        <Box className="py-20 md:py-28">
          <Reveal className="grid gap-6 pb-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <p className="label text-muted">{research.kicker}</p>
              <h2 className="display mt-5 text-[clamp(2.6rem,5.2vw,4.9rem)] leading-[1]">
                Evidence must be <em className="text-accent">visible.</em>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="text-[16.5px] leading-relaxed text-fg/80">{research.lead}</p>
              <p className="mt-4 text-[16.5px] leading-relaxed text-fg/80">{research.body}</p>
            </div>
          </Reveal>

          <ol>
            {research.publications.map((p) => (
              <li
                key={p.title}
                className="grid gap-x-8 gap-y-2 border-t border-line py-6 md:grid-cols-[5rem_1fr_15rem] md:items-baseline"
              >
                <span className="font-mono text-[13px] text-accent">{p.year}</span>
                <h3 className="text-[17px] leading-snug">{p.title}</h3>
                <span className="text-[13.5px] text-muted md:text-right">{p.journal}</span>
              </li>
            ))}
          </ol>

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <Reveal className="rounded-[8px] bg-surface p-7 md:p-9">
              <h3 className="display text-[1.7rem] leading-tight">Human Adaptation Series</h3>
              <p className="mt-2 text-[14px] text-muted">
                Understanding the relationship between human biology and contemporary life
              </p>
              <ol className="mt-6">
                {research.papers.map((p) => (
                  <li key={p.code} className="flex items-baseline gap-4 border-t border-line py-3 text-[15px]">
                    <span className="font-mono text-[12px] text-accent">{p.code}</span>
                    {p.title}
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal className="rounded-[8px] bg-tint p-7 md:p-9" delay={0.08}>
              <h3 className="display text-[1.7rem] leading-tight">{wisePapers.title}</h3>
              <p className="mt-2 text-[14px] text-muted">{wisePapers.line}</p>
              <ol className="mt-6">
                {wisePapers.papers.map((p) => (
                  <li key={p.code} className="flex items-baseline gap-4 border-t border-fg/15 py-3 text-[15px]">
                    <span className="font-mono text-[12px] text-accent">{p.code}</span>
                    {p.title}
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <Reveal className="mt-12">
            <p className="display text-[clamp(1.4rem,2.2vw,2rem)] leading-[1.25]">
              <em className="text-accent">{research.principles.join(". ")}.</em>
            </p>
          </Reveal>
        </Box>
      </section>
    </>
  );
}
