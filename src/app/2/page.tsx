import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Pic, imageData } from "@/components/shared/Pic";
import { Reveal, ScrollText } from "@/components/shared/Motion";
import { Scroller } from "@/components/shared/Scroller";
import { ButtonTwo, Note, Wrap } from "@/components/two/ui";
import { QuestionRotator, SensesTwo, type MediaItem } from "@/components/two/Interactive";
import {
  about,
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
import { founderHero } from "@/content/founder";

export const metadata: Metadata = {
  title: "Sample 2 | Home",
};

const senseItems: MediaItem[] = senses.items.map((s) => {
  const d = imageData(s.image);
  return { name: s.name, line: s.line, body: s.body, src: d.src, blur: d.blur, alt: d.alt };
});

/** Bento spans for the six services. Three carry photography, three are quiet. */
const bento = [
  { span: "lg:col-span-7", media: true },
  { span: "lg:col-span-5", media: false },
  { span: "lg:col-span-4", media: false },
  { span: "lg:col-span-8", media: true },
  { span: "lg:col-span-5", media: true },
  { span: "lg:col-span-7", media: false },
];

export default function HomeTwo() {
  const heroImg = imageData("academic/msap-aerial-mist");
  const ribbon = [...homeGallery, ...homeGallery];

  return (
    <>
      {/* 1. Hero */}
      <section className="relative isolate flex min-h-[100dvh] items-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={heroImg.src}
            alt={heroImg.alt}
            fill
            preload
            sizes="100vw"
            placeholder="blur"
            blurDataURL={heroImg.blur}
            className="animate-breathe object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-bg/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/70 via-transparent to-transparent" />
        </div>
        <Wrap className="pb-14 pt-28 md:pb-20">
          <p className="label text-fg/75">Evidence-led advisory and design practice</p>
          <h1 className="display mt-6 max-w-[20ch] text-[clamp(2.8rem,6vw,6.25rem)] leading-[0.98]">
            Designing human systems for{" "}
            <span className="text-accent">health, resilience and performance</span>
          </h1>
          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[46ch] text-[17px] leading-relaxed text-fg/85">{hero.sub}</p>
            <div className="flex flex-wrap gap-3">
              <ButtonTwo href="#about">{hero.cta}</ButtonTwo>
              <ButtonTwo href={contactHref} tone="ghost">
                Start a Conversation
              </ButtonTwo>
            </div>
          </div>
        </Wrap>
      </section>

      {/* 2. Proof, then the statement */}
      <section id="about" className="scroll-mt-28">
        <Wrap>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 border-b border-line py-12 lg:grid-cols-4">
            {proof.map((f) => (
              <div key={f.label}>
                <dt className="display text-[clamp(2.2rem,4vw,3.6rem)] leading-none text-accent">{f.value}</dt>
                <dd className="mt-3 text-[14px] leading-snug text-muted">
                  <span className="block text-fg">{f.unit}</span>
                  {f.label}
                </dd>
              </div>
            ))}
          </dl>
        </Wrap>
        <Wrap className="py-24 md:py-40">
          <Reveal>
            <h2 className="display text-[clamp(3rem,9vw,9.5rem)] leading-[0.94]">
              Health is shaped by <span className="text-accent">systems.</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12">
            <div className="lg:col-span-9 lg:col-start-4">
              <ScrollText
                text={`${about.lead} ${about.body[0]}`}
                className="display text-[clamp(1.6rem,3.2vw,3rem)] leading-[1.18]"
              />
              <Reveal className="mt-10 max-w-[60ch]">
                <p className="text-[17px] leading-relaxed text-fg/80">{about.body[1]}</p>
              </Reveal>
            </div>
          </div>
        </Wrap>
      </section>

      {/* 3. The triad as three stacking panels */}
      <section>
        <Wrap>
          <Reveal className="max-w-4xl pb-12">
            <h2 className="display text-[clamp(2.4rem,5.2vw,5rem)] leading-[1]">
              Three domains. <span className="text-accent">One human system.</span>
            </h2>
            <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-fg/80">
              {triad.intro} {triad.body}
            </p>
          </Reveal>

          <div>
            {triad.domains.map((d, i) => (
              <article
                key={d.name}
                className="sticky mb-6 overflow-hidden rounded-[28px] border border-line bg-surface"
                style={{ top: `${96 + i * 22}px` }}
              >
                <div className="grid lg:min-h-[66dvh] lg:grid-cols-12">
                  <div className="flex flex-col justify-between gap-10 p-7 md:p-12 lg:col-span-5">
                    <p className="font-mono text-[12px] tracking-[0.14em] text-muted">{d.question}</p>
                    <div>
                      <h3 className="display text-[clamp(3rem,6vw,5.75rem)] leading-[0.95]">{d.name}</h3>
                      <p className="mt-6 max-w-[42ch] text-[16.5px] leading-relaxed text-fg/85">{d.body}</p>
                      <p className="mt-4 max-w-[42ch] text-[14.5px] leading-relaxed text-muted">{d.detail}</p>
                    </div>
                  </div>
                  <div className="relative min-h-[240px] lg:col-span-7">
                    <Pic k={d.image} cover sizes="(min-width: 1024px) 56vw, 100vw" className="absolute inset-0 rounded-none" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <Reveal className="grid gap-8 py-16 md:grid-cols-12 md:items-end md:py-24">
            <p className="display text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.2] md:col-span-8">{triad.close}</p>
            <div className="md:col-span-4 md:text-right">
              <ButtonTwo href="#research" tone="ghost">
                {triad.cta}
              </ButtonTwo>
            </div>
          </Reveal>
        </Wrap>
      </section>

      {/* 4. Projects ribbon (the page's one marquee) */}
      <section className="overflow-hidden border-y border-line bg-surface py-20 md:py-28">
        <Wrap className="flex flex-col gap-6 pb-12 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="display max-w-3xl text-[clamp(2.4rem,5.2vw,5rem)] leading-[1]">
            Environments designed for the people inside them
          </h2>
          <ButtonTwo href="/2/projects">View all projects</ButtonTwo>
        </Wrap>
        <Scroller
          label="selected environments"
          tone="two"
          auto={34}
          trackClassName="flex gap-5 pr-5"
          controlsClassName="mx-auto mt-10 max-w-[1480px] justify-end px-5 md:px-10"
        >
          {ribbon.map((g, i) => (
            <Link
              key={`${g.image}-${i}`}
              href="/2/projects"
              aria-hidden={i >= homeGallery.length}
              tabIndex={i >= homeGallery.length ? -1 : undefined}
              className="block w-[70vw] shrink-0 sm:w-[42vw] lg:w-[30vw]"
            >
              <Pic k={g.image} ratio="4 / 3" sizes="(min-width: 1024px) 30vw, 70vw" imgClassName="transition-transform duration-[1400ms] ease-soft hover:scale-[1.04]" />
              <p className="mt-4 text-[15px] leading-snug">{g.title}</p>
              <p className="text-[13px] text-muted">{g.place}</p>
            </Link>
          ))}
        </Scroller>
      </section>

      {/* 5. Services bento */}
      <section id="work" className="scroll-mt-28">
        <Wrap className="py-24 md:py-36">
          <Reveal className="max-w-4xl">
            <h2 className="display text-[clamp(2.4rem,5.2vw,5rem)] leading-[1]">
              Build health and performance <span className="text-accent">into the system.</span>
            </h2>
            <p className="mt-6 max-w-[60ch] text-[17px] leading-relaxed text-fg/80">{work.lead}</p>
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
            {work.services.map((s, i) => {
              const b = bento[i];
              return (
                <Reveal key={s.name} className={b.span} delay={(i % 2) * 0.06}>
                  <article
                    className={`relative isolate flex h-full min-h-[320px] flex-col justify-end overflow-hidden rounded-[28px] border border-line p-7 md:p-9 ${b.media ? "" : i === 5 ? "bg-surface-2" : "bg-surface"}`}
                  >
                    {b.media ? (
                      <div className="absolute inset-0 -z-10">
                        <Pic k={s.image} cover sizes="(min-width: 1024px) 60vw, 100vw" className="rounded-none" />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/75 to-bg/10" />
                      </div>
                    ) : null}
                    <h3 className="display text-[clamp(1.8rem,2.8vw,2.6rem)] leading-[1.02]">{s.name}</h3>
                    <p className="mt-4 max-w-[52ch] text-[15.5px] leading-relaxed text-fg/85">{s.body}</p>
                    <p className="mt-4 max-w-[52ch] text-[13.5px] leading-relaxed text-muted">
                      <span className="text-accent">Possible outputs.</span> {s.outputs}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-14 grid gap-8 md:grid-cols-12 md:items-end">
            <p className="display text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.2] md:col-span-8">{work.note}</p>
            <div className="md:col-span-4 md:text-right">
              <ButtonTwo href={contactHref}>Start a Conversation</ButtonTwo>
            </div>
          </Reveal>
        </Wrap>
      </section>

      {/* 6. Founder */}
      <section className="border-y border-line bg-surface">
        <Wrap className="grid items-center gap-12 py-24 md:py-36 lg:grid-cols-12">
          <Reveal className="mx-auto w-full max-w-[440px] lg:col-span-4">
            <div className="overflow-hidden rounded-t-full rounded-b-[28px]">
              <Pic
                k="founder/reviewing-designs"
                ratio="3 / 4.2"
                sizes="(min-width: 1024px) 30vw, 90vw"
                pos="50% 12%"
                className="rounded-none"
              />
            </div>
            <Note>Reviewing artwork studies in the design studio.</Note>
          </Reveal>
          <Reveal className="lg:col-span-7 lg:col-start-6" delay={0.1}>
            <p className="label text-muted">{founderTeaser.kicker}</p>
            <p className="display mt-6 text-[clamp(2.2rem,4.6vw,4.4rem)] leading-[1.02]">{founderTeaser.question}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {founderHero.roles.map((r) => (
                <li key={r} className="rounded-full border border-fg/20 px-4 py-2 text-[13.5px] text-fg/85">
                  {r}
                </li>
              ))}
            </ul>
            <div className="mt-8 max-w-[60ch] space-y-5 text-[16.5px] leading-relaxed text-fg/80">
              {founderTeaser.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-9">
              <ButtonTwo href="/2/founder">{founderTeaser.cta}</ButtonTwo>
            </div>
          </Reveal>
        </Wrap>
      </section>

      {/* 7. Five senses */}
      <section id="senses" className="scroll-mt-28">
        <Wrap className="py-24 md:py-36">
          <Reveal className="max-w-4xl pb-14">
            <h2 className="display text-[clamp(2.4rem,5.2vw,5rem)] leading-[1]">
              The body&rsquo;s interface <span className="text-accent">with the world</span>
            </h2>
            <p className="mt-6 max-w-[60ch] text-[17px] leading-relaxed text-fg/80">
              {senses.intro} {senses.body}
            </p>
          </Reveal>
          <SensesTwo items={senseItems} />
          <Reveal className="mt-14 max-w-3xl">
            <p className="display text-[clamp(1.4rem,2.4vw,2.1rem)] leading-[1.22]">{senses.close}</p>
          </Reveal>
        </Wrap>
      </section>

      {/* 8. Dr Gutsy */}
      <section id="gutsy" className="scroll-mt-28">
        <Wrap>
          <div className="grid gap-12 rounded-[28px] border border-line bg-surface p-7 md:p-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <h2 className="display text-[clamp(2.4rem,4.8vw,4.4rem)] leading-[1]">
                Dr Gutsy. <span className="text-accent">{gutsy.title}.</span>
              </h2>
              <p className="mt-6 text-[17px] leading-relaxed text-fg/85">{gutsy.lead}</p>
              <p className="mt-4 text-[15.5px] leading-relaxed text-muted">{gutsy.body}</p>
              <p className="label mt-8 text-accent">{gutsy.sign}</p>
            </Reveal>
            <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
              <QuestionRotator questions={gutsy.questions} />
            </div>
          </div>
        </Wrap>
      </section>

      {/* 9. Research */}
      <section id="research" className="scroll-mt-28">
        <Wrap className="pt-24 md:pt-36">
          <Reveal className="max-w-4xl">
            <p className="label text-muted">{research.kicker}</p>
            <h2 className="display mt-5 text-[clamp(2.8rem,7vw,7rem)] leading-[0.96]">
              Evidence must be <span className="text-accent">visible.</span>
            </h2>
            <p className="mt-7 max-w-[60ch] text-[17px] leading-relaxed text-fg/80">
              {research.lead} {research.body}
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {research.principles.map((p) => (
                <li key={p} className="rounded-full bg-accent/12 px-4 py-2 text-[14px] text-accent">
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </Wrap>
        <Scroller
          label="peer-reviewed publications"
          tone="two"
          className="mt-14"
          trackClassName="flex snap-x snap-proximity scroll-px-5 gap-4 px-5 md:scroll-px-10 md:px-10"
          controlsClassName="mx-auto mt-6 max-w-[1480px] justify-end px-5 md:px-10"
        >
          {research.publications.map((p) => (
            <article
              key={p.title}
              className="flex w-[82vw] shrink-0 snap-start flex-col justify-between rounded-[28px] border border-line bg-surface p-7 sm:w-[46vw] lg:w-[31vw]"
            >
              <p className="font-mono text-[12.5px] text-accent">{p.year}</p>
              <div className="mt-16">
                <h3 className="display text-[1.35rem] leading-[1.2]">{p.title}</h3>
                <p className="mt-4 text-[13.5px] text-muted">{p.journal}</p>
              </div>
            </article>
          ))}
        </Scroller>
        <Wrap className="pb-24 pt-10 md:pb-36">
          <p className="text-[14px] text-muted">White papers: the Human Adaptation Series</p>
          <ul className="mt-5 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {research.papers.map((p) => (
              <li key={p.code} className="flex items-baseline gap-4 border-t border-line py-4">
                <span className="font-mono text-[12.5px] text-accent">{p.code}</span>
                <span className="display text-[1.3rem] leading-tight">{p.title}</span>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>
    </>
  );
}
