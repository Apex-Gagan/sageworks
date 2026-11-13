import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { Pic, imageData } from "@/components/shared/Pic";
import { Reveal } from "@/components/shared/Motion";
import { Scroller } from "@/components/shared/Scroller";
import {
  Accordion,
  HeroSlider,
  PrincipleCarousel,
  ServiceList,
  type HeroSlide,
  type Principle,
  type ServiceRow,
} from "@/components/three/Interactive";
import { Heading, Hl, Pill, Small, Wrap3 } from "@/components/three/ui";
import type { ImageKey } from "@/content/captions";
import { discussHref, evidenceNotes, senseEvidence, wisePapers } from "@/content/discover";
import { chapters } from "@/content/founder";
import {
  about,
  contactEmail,
  contactHref,
  founderTeaser,
  gutsy,
  hero,
  proof,
  research,
  senses,
  triad,
  work,
} from "@/content/home";

export const metadata: Metadata = {
  title: "Sample 3 | Home",
};

function slide(k: ImageKey, rest: Omit<HeroSlide, "src" | "blur" | "alt">): HeroSlide {
  const d = imageData(k);
  return { src: d.src, blur: d.blur, alt: d.alt, ...rest };
}

const slides: HeroSlide[] = [
  slide("hospitals/whitefield-lobby-rings", {
    pre: "Designing human systems for",
    mark: "health, resilience and performance",
    sub: hero.sub,
    cta: { label: hero.cta, href: "#about" },
  }),
  slide("hospitals/paediatric-ceiling", {
    pre: "Environments designed for",
    mark: "the people inside them",
    sub: "Hospitals, campuses, kitchens and workplaces, shaped with architects, artists and the teams who run them.",
    cta: { label: "View all projects", href: "/3/projects" },
  }),
  slide("founder/team-table", {
    pre: "How do we build systems that genuinely help people",
    mark: "live and work better?",
    sub: "One driving question behind the work of Dr Shruti Pai, Founder and Director of Sagework.",
    cta: { label: founderTeaser.cta, href: "/3/founder" },
  }),
  slide("hospitals/physio-figures", {
    pre: "Evidence must be",
    mark: "visible.",
    sub: research.body,
    cta: { label: research.cta, href: "#research" },
  }),
];

/** Six doors into the site, in the manner of drchatterjee.com's homepage tiles. */
const tiles: { href: string; k: ImageKey; pre: string; mark: string; pos?: string }[] = [
  { href: "#about", k: "academic/msap-aerial-green", pre: "Discover", mark: "Sagework" },
  { href: "/3/founder", k: "founder/studio-team", pre: "Meet the founder", mark: "Dr Shruti Pai", pos: "70% 40%" },
  { href: "/3/projects", k: "hospitals/mangalore-shell-lobby", pre: "Projects", mark: "Hospitals, campuses, kitchens" },
  { href: "#senses", k: "hospitals/whitefield-angel-corridor", pre: "The Five Senses", mark: "The body's interface with the world" },
  { href: "#gutsy", k: "hospitals/physio-get-set-go", pre: "Meet Dr Gutsy", mark: "Curiosity backed by evidence" },
  { href: "#work", k: "academic/boardroom-skylight", pre: "Work with Sagework", mark: "Consulting, advisory, audit" },
];

const mosaic: ImageKey[] = [
  "founder/team-table",
  "hospitals/reception-colour-frieze",
  "academic/marc-auditorium",
  "hospitality/wgsha-kitchen-steel",
  "academic/msap-courtyard",
  "hospitals/paediatric-ceiling",
  "hospitality/chef-van-team",
  "hospitals/jaipur-peacock",
];

const serviceRows: ServiceRow[] = work.services.map((s) => ({
  name: s.name,
  body: s.body,
  outputs: s.outputs,
  href: discussHref(contactEmail, s.name),
}));

const principles: Principle[] = chapters
  .filter((c) => c.pull)
  .map((c) => ({ role: c.role, maxim: c.maxim, text: c.pull as string }));

const credentials = [
  "PhD in Clinical Nutrition, with maternal and infant gut microbiome research",
  "More than two decades leading businesses and shaping environments",
  "Founded Chef on Wheels and scaled it to approximately 110,000 meals a day",
  "More than a decade as Creative Director across hospitals, universities and workplaces",
];

export default function HomeThree() {
  return (
    <>
      {/* 1. Hero slider */}
      <HeroSlider slides={slides} />

      {/* 2. Six tiles with highlighted titles */}
      <section className="bg-surface">
        <Wrap3 className="py-10 md:py-14">
          <div className="grid gap-2.5 rounded-[14px] bg-bg p-2.5 shadow-[0_18px_50px_-34px_rgba(21,27,37,0.4)] sm:grid-cols-2 lg:grid-cols-3">
            {tiles.map((t) => (
              <Link
                key={t.pre}
                href={t.href}
                className="group relative isolate block aspect-[16/11] overflow-hidden rounded-[10px] bg-deep"
              >
                <Pic
                  k={t.k}
                  cover
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  pos={t.pos}
                  className="absolute inset-0 -z-10 rounded-none"
                  imgClassName="transition-transform duration-[1400ms] ease-soft group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 -z-10 bg-gradient-to-t from-[#10181f]/90 via-[#10181f]/25 to-transparent" />
                <span className="absolute inset-x-5 bottom-5 text-[clamp(1.15rem,1.7vw,1.45rem)] font-semibold leading-[1.45] tracking-[-0.01em] text-white">
                  {t.pre} <span className="hl">{t.mark}</span>
                </span>
              </Link>
            ))}
          </div>
        </Wrap3>
      </section>

      {/* 3. About: centred statement over a photo mosaic */}
      <section id="about" className="scroll-mt-24">
        <Wrap3 className="py-20 md:py-28">
          <Reveal>
            <div className="mx-auto max-w-[900px] text-center">
              <h2 className="display text-[clamp(2.6rem,6vw,5rem)] leading-[1.06]">
                Health is shaped by <Hl>systems.</Hl>
              </h2>
              <p className="mt-6 text-[19px] leading-relaxed text-fg/85 md:text-[21px]">{about.lead}</p>
            </div>
          </Reveal>
          <Reveal className="mt-12 grid grid-cols-2 overflow-hidden rounded-[14px] md:grid-cols-4">
            {mosaic.map((k) => (
              <Pic key={k} k={k} ratio="3 / 2" sizes="(min-width: 768px) 310px, 50vw" className="rounded-none" />
            ))}
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-[1000px] gap-8 md:grid-cols-2">
            {about.body.map((p, i) => (
              <Reveal key={p} delay={i * 0.08}>
                <p className="text-[17px] leading-relaxed text-fg/80">{p}</p>
              </Reveal>
            ))}
          </div>
        </Wrap3>
      </section>

      {/* 4. Giant numbers */}
      <section className="border-y border-line">
        <Wrap3 className="py-16 md:py-20">
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

      {/* 5. Three domains as image cards, then the grey quote panel */}
      <section>
        <Wrap3 className="py-20 md:py-28">
          <Reveal>
            <Heading
              title={
                <>
                  Three domains. <Hl>One human system.</Hl>
                </>
              }
              sub={`${triad.intro} ${triad.body}`}
            />
          </Reveal>
          <div className="mt-14 grid gap-x-7 gap-y-12 md:grid-cols-3">
            {triad.domains.map((d, i) => (
              <Reveal key={d.name} delay={i * 0.08}>
                <Pic k={d.image} ratio="3 / 2" sizes="(min-width: 768px) 390px, 100vw" />
                <h3 className="display mt-6 text-[1.8rem] leading-tight">{d.name}</h3>
                <p className="mt-1.5 text-[16px] font-semibold text-accent-ink">{d.question}</p>
                <p className="mt-3 text-[16.5px] leading-relaxed text-fg/80">{d.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-16 rounded-[12px] bg-surface-2 px-7 py-10 md:px-14 md:py-14">
            <p className="display max-w-[30ch] text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.2]">{triad.close}</p>
            <div className="mt-8">
              <Pill href="#research" tone="outline">
                {triad.cta}
              </Pill>
            </div>
          </Reveal>
        </Wrap3>
      </section>

      {/* 6. Work with Sagework on a slate panel */}
      <section id="work" className="scroll-mt-24 bg-surface">
        <Wrap3 className="py-16 md:py-24">
          <div className="grid gap-12 rounded-[14px] bg-deep p-7 text-on-deep md:p-12 lg:grid-cols-12 lg:gap-14 lg:p-16">
            <Reveal className="lg:col-span-5">
              <h2 className="display text-[clamp(2.1rem,3.8vw,3.2rem)] leading-[1.14]">
                Build health and performance <Hl>into the system.</Hl>
              </h2>
              <p className="mt-6 text-[17px] leading-relaxed text-on-deep-muted">{work.lead}</p>
              <p className="mt-5 text-[17px] leading-relaxed text-on-deep-muted">{work.note}</p>
              <div className="mt-9">
                <Pill href={contactHref} tone="onDeep">
                  Start a Conversation
                </Pill>
              </div>
            </Reveal>
            <div className="lg:col-span-7">
              <ServiceList items={serviceRows} />
            </div>
          </div>
        </Wrap3>
      </section>

      {/* 7. Founder */}
      <section>
        <Wrap3 className="grid items-center gap-12 py-20 md:py-28 lg:grid-cols-12">
          <Reveal className="relative lg:col-span-5">
            <div className="cut overflow-hidden">
              <Pic
                k="founder/reviewing-designs"
                ratio="4 / 5"
                sizes="(min-width: 1024px) 480px, 100vw"
                pos="50% 16%"
                className="rounded-none"
              />
            </div>
            <div className="absolute -right-2 bottom-14 max-w-[13rem] rounded-[10px] bg-accent px-5 py-4 text-on-accent shadow-[0_18px_40px_-22px_rgba(21,27,37,0.5)] md:-right-8">
              <p className="display text-[2rem] leading-none">20+</p>
              <p className="mt-1 text-[13px] font-semibold">years across business, science and design</p>
            </div>
            <Small>Reviewing artwork studies in the design studio.</Small>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-accent-ink">{founderTeaser.kicker}</p>
            <h2 className="display mt-4 text-[clamp(2rem,3.6vw,3rem)] leading-[1.2]">
              How do we build systems that genuinely help people <Hl>live and work better?</Hl>
            </h2>
            <div className="mt-7 space-y-5 text-[17px] leading-relaxed text-fg/80">
              {founderTeaser.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ul className="mt-7 space-y-3">
              {credentials.map((c) => (
                <li key={c} className="flex items-start gap-3 text-[16px] leading-snug">
                  <CheckCircle size={22} weight="fill" className="mt-0.5 shrink-0 text-accent-ink" />
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <Pill href="/3/founder">{founderTeaser.cta}</Pill>
            </div>
          </Reveal>
        </Wrap3>
      </section>

      {/* 8. Five senses as a row of cards */}
      <section id="senses" className="scroll-mt-24 bg-surface">
        <Wrap3 className="pb-10 pt-20 md:pt-28">
          <Reveal>
            <Heading
              title={<>The body&rsquo;s interface with the world</>}
              sub={`${senses.intro} ${senses.body}`}
            />
          </Reveal>
        </Wrap3>
        <Scroller
          label="the five senses"
          tone="two"
          trackClassName="mx-auto flex max-w-[1240px] snap-x snap-proximity scroll-px-5 gap-6 px-5 md:scroll-px-8 md:px-8"
          controlsClassName="mx-auto mt-8 max-w-[1240px] justify-end px-5 md:px-8"
        >
          {senses.items.map((s) => {
            const e = senseEvidence[s.name];
            return (
              <article key={s.name} className="flex w-[80vw] shrink-0 snap-start flex-col rounded-[12px] bg-bg p-3 sm:w-[330px]">
                <Pic k={s.image} ratio="4 / 3" sizes="330px" />
                <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
                  <h3 className="display text-[1.7rem] leading-none">{s.name}</h3>
                  <p className="mt-2 text-[15px] font-semibold text-accent-ink">{s.line}</p>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-fg/80">{s.body}</p>
                  <details className="group mt-auto pt-5">
                    <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full bg-tint px-4 py-2 text-[13.5px] font-semibold text-accent-ink transition-colors hover:bg-accent hover:text-on-accent [&::-webkit-details-marker]:hidden">
                      What the evidence shows
                      <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-open:rotate-90" />
                    </summary>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-fg/80">{e.finding}</p>
                    <p className="mt-2 font-mono text-[12px] text-muted">Source: {e.source}</p>
                  </details>
                </div>
              </article>
            );
          })}
        </Scroller>
        <Wrap3 className="pb-20 pt-12 md:pb-28">
          <Reveal>
            <p className="display mx-auto max-w-[34ch] text-center text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.3]">
              {senses.close}
            </p>
          </Reveal>
        </Wrap3>
      </section>

      {/* 9. Dr Gutsy on the green band */}
      <section id="gutsy" className="scroll-mt-24">
        <Wrap3 className="py-16 md:py-24">
          <div className="grid gap-10 rounded-[14px] bg-accent p-7 text-on-accent md:p-12 lg:grid-cols-12 lg:items-center lg:p-16">
            <Reveal className="lg:col-span-5">
              <p className="text-[13px] font-semibold uppercase tracking-[0.1em]">{gutsy.kicker}</p>
              <h2 className="display mt-4 text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.1]">{gutsy.title}</h2>
              <p className="mt-6 text-[18px] font-semibold leading-snug">{gutsy.lead}</p>
              <p className="mt-4 text-[16.5px] leading-relaxed text-on-accent/85">{gutsy.body}</p>
              <p className="mt-7 text-[13px] font-semibold uppercase tracking-[0.1em]">{gutsy.sign}</p>
            </Reveal>
            <ul className="space-y-4 lg:col-span-6 lg:col-start-7">
              {gutsy.questions.map((q, i) => (
                <li key={q} className={i === 1 ? "lg:ml-10" : i === 2 ? "lg:ml-20" : ""}>
                  <Reveal delay={i * 0.08}>
                    <p className="cut bg-bg px-7 py-6 text-[clamp(1.1rem,1.6vw,1.35rem)] font-semibold leading-snug text-fg shadow-[0_18px_40px_-26px_rgba(16,33,42,0.6)]">
                      {q}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Wrap3>
      </section>

      {/* 10. Principles, one card at a time */}
      <section className="bg-surface">
        <Wrap3 className="py-20 md:py-28">
          <Reveal>
            <Heading title="Principles that guide the work" />
          </Reveal>
          <div className="mt-16">
            <PrincipleCarousel items={principles} />
          </div>
        </Wrap3>
      </section>

      {/* 11. Research */}
      <section id="research" className="scroll-mt-24">
        <Wrap3 className="py-20 md:py-28">
          <Reveal>
            <Heading
              title={
                <>
                  Evidence must be <Hl>visible.</Hl>
                </>
              }
              sub={research.lead}
            />
          </Reveal>

          <ol className="mt-14 grid gap-5 md:grid-cols-2">
            {research.publications.map((p, i) => (
              <li key={p.title} className={i === research.publications.length - 1 ? "md:col-span-2" : ""}>
                <Reveal delay={(i % 2) * 0.06} className="h-full">
                  <article className="flex h-full flex-col rounded-[12px] border border-line p-7">
                    <span className="self-start rounded-full bg-tint px-3 py-1.5 text-[12.5px] font-semibold text-accent-ink">
                      {p.year}
                    </span>
                    <h3 className="mt-5 text-[1.2rem] font-semibold leading-snug tracking-[-0.01em]">{p.title}</h3>
                    <p className="mt-auto pt-4 text-[14.5px] text-muted">{p.journal}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <Reveal className="rounded-[12px] bg-surface p-7 md:p-9">
              <h3 className="display text-[1.6rem] leading-tight">Human Adaptation Series</h3>
              <p className="mt-2 text-[15px] text-muted">
                Understanding the relationship between human biology and contemporary life
              </p>
              <ol className="mt-6 space-y-3">
                {research.papers.map((p) => (
                  <li key={p.code} className="flex items-baseline gap-4 text-[16px]">
                    <span className="font-mono text-[12.5px] text-accent-ink">{p.code}</span>
                    {p.title}
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal className="rounded-[12px] bg-tint p-7 md:p-9" delay={0.08}>
              <h3 className="display text-[1.6rem] leading-tight">{wisePapers.title}</h3>
              <p className="mt-2 text-[15px] text-fg/70">{wisePapers.line}</p>
              <ol className="mt-6 space-y-3">
                {wisePapers.papers.map((p) => (
                  <li key={p.code} className="flex items-baseline gap-4 text-[16px]">
                    <span className="font-mono text-[12.5px] text-accent-ink">{p.code}</span>
                    {p.title}
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <div className="mx-auto mt-16 max-w-[900px]">
            <Accordion items={evidenceNotes} />
          </div>
        </Wrap3>
      </section>
    </>
  );
}
