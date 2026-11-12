import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Pic, imageData } from "@/components/shared/Pic";
import { Parallax, Reveal, ScrollText } from "@/components/shared/Motion";
import { Scroller } from "@/components/shared/Scroller";
import { Arch, ButtonTwo, Disc, Glow, Note, Seal, Sheet, Wrap } from "@/components/two/ui";
import { QuestionRotator, SensesTwo, type MediaItem } from "@/components/two/Interactive";
import { TriadCircles, type CircleItem } from "@/components/two/Signature";
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

const triadItems: CircleItem[] = triad.domains.map((d) => {
  const i = imageData(d.image);
  return { name: d.name, line: d.question, body: d.body, detail: d.detail, src: i.src, blur: i.blur, alt: i.alt };
});

export default function HomeTwo() {
  const heroImg = imageData("academic/msap-aerial-mist");
  const capsule = imageData("hospitals/jaipur-peacock");
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
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-bg/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/75 via-bg/10 to-transparent" />
        </div>
        <Wrap className="pb-28 pt-28 md:pb-36">
          <p className="label text-fg/75">Evidence-led advisory and design practice</p>
          <h1 className="display mt-6 max-w-[19ch] text-[clamp(2.7rem,6vw,6.25rem)] leading-[0.99]">
            Designing human{" "}
            <span className="relative mx-[0.04em] inline-block h-[0.72em] w-[1.75em] translate-y-[0.07em] overflow-hidden rounded-full align-baseline ring-1 ring-fg/25">
              <Image
                src={capsule.src}
                alt=""
                fill
                sizes="180px"
                placeholder="blur"
                blurDataURL={capsule.blur}
                className="object-cover"
              />
            </span>{" "}
            systems for <strong className="text-accent">health, resilience and performance</strong>
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

      {/* 2. Proof and the statement */}
      <Sheet id="about">
        <Glow className="-right-40 top-40" />
        <Wrap className="relative">
          <Seal id="seal-home" className="absolute right-6 top-8 hidden h-[148px] w-[148px] text-fg/70 lg:block" />
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 pb-4 pt-16 md:pt-24 lg:mr-48 lg:grid-cols-4">
            {proof.map((f) => (
              <div key={f.label} className="border-t border-line pt-5">
                <dt className="display text-[clamp(2.2rem,4vw,3.6rem)] leading-none text-accent">{f.value}</dt>
                <dd className="mt-3 text-[14px] leading-snug text-muted">
                  <span className="block text-fg">{f.unit}</span>
                  {f.label}
                </dd>
              </div>
            ))}
          </dl>
        </Wrap>

        <Wrap className="relative grid gap-12 py-24 md:py-36 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <h2 className="display text-[clamp(3rem,8.4vw,8.75rem)] leading-[0.94]">
                Health is shaped by <strong className="text-accent">systems.</strong>
              </h2>
            </Reveal>
            <ScrollText
              text={`${about.lead} ${about.body[0]}`}
              className="display mt-12 text-[clamp(1.5rem,2.7vw,2.5rem)] leading-[1.2] md:mt-16"
            />
            <Reveal className="mt-10 max-w-[60ch]">
              <p className="text-[17px] leading-relaxed text-fg/80">{about.body[1]}</p>
            </Reveal>
          </div>
          <div className="relative lg:col-span-4">
            <div className="relative mx-auto w-[78%] max-w-[380px] lg:sticky lg:top-32 lg:mt-24 lg:w-full">
              <Parallax className="aspect-square !rounded-full" amount={8}>
                <Pic k="academic/msap-courtyard" cover sizes="(min-width: 1024px) 28vw, 78vw" className="rounded-none" />
              </Parallax>
              <Disc
                k="hospitals/zen-pebbles"
                sizes="160px"
                className="absolute -bottom-6 -left-8 w-[38%] border-[6px] border-bg"
              />
              <Note>Students gathered in a terraced courtyard.</Note>
            </div>
          </div>
        </Wrap>

        <Wrap className="pb-28 md:pb-44">
          <Reveal>
            <p className="display mx-auto max-w-5xl text-center text-[clamp(1.9rem,4vw,3.75rem)] leading-[1.08]">
              The conditions around us become part of <strong className="text-accent">the conditions within us.</strong>
            </p>
          </Reveal>
        </Wrap>
      </Sheet>

      {/* 3. The triad as three photographs */}
      <Sheet tone="surface">
        <Glow className="-left-52 top-10" />
        <Wrap className="relative py-24 md:py-36">
          <TriadCircles
            items={triadItems}
            heading={
              <>
                <h2 className="display text-[clamp(2.2rem,4.4vw,4.2rem)] leading-[1.02]">
                  Three domains. <strong className="text-accent">One human system.</strong>
                </h2>
                <p className="mt-5 max-w-[46ch] text-[16.5px] leading-relaxed text-fg/80">{triad.intro}</p>
              </>
            }
          />
          <Reveal className="mt-20 grid gap-8 border-t border-line pt-10 md:grid-cols-12 md:items-end">
            <p className="display text-[clamp(1.4rem,2.4vw,2.2rem)] leading-[1.22] md:col-span-8">{triad.close}</p>
            <div className="md:col-span-4 md:text-right">
              <ButtonTwo href="#research" tone="ghost">
                {triad.cta}
              </ButtonTwo>
            </div>
          </Reveal>
        </Wrap>
      </Sheet>

      {/* 4. Projects ribbon: arches and frames in a slow wave */}
      <Sheet>
        <Wrap className="flex flex-col items-start gap-6 pb-12 pt-24 sm:flex-row sm:items-end sm:justify-between md:pt-36">
          <h2 className="display max-w-3xl text-[clamp(2.2rem,4.8vw,4.6rem)] leading-[1.02]">
            Environments designed for <strong className="text-accent">the people inside them</strong>
          </h2>
          <ButtonTwo href="/2/projects">View all projects</ButtonTwo>
        </Wrap>
        <Scroller
          label="selected environments"
          tone="two"
          auto={30}
          className="pb-28 md:pb-44"
          trackClassName="flex items-start gap-5 pr-5"
          controlsClassName="mx-auto mt-10 max-w-[1480px] justify-end px-5 md:px-10"
        >
          {ribbon.map((g, i) => {
            const tall = i % 2 === 0;
            return (
              <Link
                key={`${g.image}-${i}`}
                href="/2/projects"
                aria-hidden={i >= homeGallery.length}
                tabIndex={i >= homeGallery.length ? -1 : undefined}
                className={`group block shrink-0 ${tall ? "w-[56vw] sm:w-[32vw] lg:w-[22vw]" : "mt-16 w-[70vw] sm:w-[42vw] lg:w-[30vw]"}`}
              >
                <div className={`overflow-hidden ${tall ? "arch" : "rounded-[24px]"}`}>
                  <Pic
                    k={g.image}
                    ratio={tall ? "3 / 4" : "4 / 3"}
                    sizes="(min-width: 1024px) 30vw, 70vw"
                    className="rounded-none"
                    imgClassName="transition-transform duration-[1400ms] ease-soft group-hover:scale-[1.05]"
                  />
                </div>
                <p className="mt-4 text-[15px] leading-snug">{g.title}</p>
                <p className="text-[13px] text-muted">{g.place}</p>
              </Link>
            );
          })}
        </Scroller>
      </Sheet>

      {/* 5. Services as a row of arches */}
      <Sheet tone="surface" id="work">
        <Glow className="-right-40 -top-20" />
        <Wrap className="relative grid gap-8 pb-12 pt-24 md:pt-36 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <h2 className="display text-[clamp(2.2rem,4.8vw,4.6rem)] leading-[1.02]">
              Build health and performance <strong className="text-accent">into the system.</strong>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.08}>
            <p className="text-[16.5px] leading-relaxed text-fg/80">{work.lead}</p>
          </Reveal>
        </Wrap>
        <Scroller
          label="ways to work with Sagework"
          tone="two"
          trackClassName="flex snap-x snap-proximity scroll-px-5 gap-5 px-5 md:scroll-px-10 md:gap-7 md:px-10"
          controlsClassName="mx-auto mt-10 max-w-[1480px] justify-end px-5 md:px-10"
        >
          {work.services.map((s) => (
            <article key={s.name} className="w-[76vw] shrink-0 snap-start sm:w-[44vw] lg:w-[25.5vw]">
              <Arch k={s.image} ratio="4 / 4.6" sizes="(min-width: 1024px) 26vw, 76vw" pos="50% 35%" />
              <h3 className="display mt-6 text-[clamp(1.6rem,2.3vw,2.1rem)] leading-[1.05]">{s.name}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-fg/80">{s.body}</p>
              <p className="mt-4 border-t border-line pt-4 text-[13.5px] leading-relaxed text-muted">
                <span className="text-accent">Possible outputs.</span> {s.outputs}
              </p>
            </article>
          ))}
        </Scroller>
        <Wrap className="relative grid gap-8 pb-28 pt-16 md:grid-cols-12 md:items-end md:pb-44">
          <Reveal className="md:col-span-8">
            <p className="display text-[clamp(1.4rem,2.4vw,2.2rem)] leading-[1.22]">{work.note}</p>
          </Reveal>
          <div className="md:col-span-4 md:text-right">
            <ButtonTwo href={contactHref}>Start a Conversation</ButtonTwo>
          </div>
        </Wrap>
      </Sheet>

      {/* 6. Founder */}
      <Sheet>
        <Wrap className="grid items-center gap-14 py-24 md:py-36 lg:grid-cols-12">
          <Reveal className="relative mx-auto w-full max-w-[430px] lg:col-span-5">
            <div
              aria-hidden="true"
              className="absolute -left-10 -top-10 h-[70%] w-[70%] rounded-full border border-accent/40"
            />
            <Arch
              k="founder/reviewing-designs"
              ratio="3 / 4.2"
              sizes="(min-width: 1024px) 32vw, 90vw"
              pos="50% 12%"
              className="relative"
            />
            <Disc
              k="founder/team-table"
              sizes="180px"
              className="absolute -bottom-8 -right-6 w-[40%] border-[6px] border-bg"
            />
            <Note>Reviewing artwork studies in the design studio.</Note>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <p className="label text-muted">{founderTeaser.kicker}</p>
            <p className="display mt-6 text-[clamp(2.1rem,4.4vw,4.2rem)] leading-[1.02]">
              How do we build systems that genuinely help people{" "}
              <strong className="text-accent">live and work better?</strong>
            </p>
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

        {/* 7. Five senses */}
        <div id="senses" className="scroll-mt-28 border-t border-line">
          <Wrap className="py-24 md:py-36">
            <Reveal className="max-w-4xl pb-14">
              <h2 className="display text-[clamp(2.2rem,4.8vw,4.6rem)] leading-[1.02]">
                The body&rsquo;s interface <strong className="text-accent">with the world</strong>
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
        </div>

        {/* 8. Dr Gutsy: the question sits in a speech bubble */}
        <div id="gutsy" className="scroll-mt-28">
          <Wrap className="grid gap-10 pb-28 md:pb-44 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-4">
              <h2 className="display text-[clamp(2.2rem,4.4vw,4.2rem)] leading-[1.02]">
                Dr Gutsy. <strong className="text-accent">{gutsy.title}.</strong>
              </h2>
              <p className="mt-6 text-[17px] leading-relaxed text-fg/85">{gutsy.lead}</p>
              <p className="mt-4 text-[15.5px] leading-relaxed text-muted">{gutsy.body}</p>
            </Reveal>
            <Reveal className="lg:col-span-7 lg:col-start-6" delay={0.1}>
              <div className="rounded-[40px] rounded-bl-none border border-accent/30 bg-tint p-8 md:rounded-[64px] md:rounded-bl-none md:p-14">
                <QuestionRotator questions={gutsy.questions} />
              </div>
              <p className="label mt-6 text-accent">{gutsy.sign}</p>
            </Reveal>
          </Wrap>
        </div>
      </Sheet>

      {/* 9. Research */}
      <Sheet tone="surface" id="research">
        <Wrap className="grid gap-14 py-24 md:py-36 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-32">
              <p className="label text-muted">{research.kicker}</p>
              <h2 className="display mt-5 text-[clamp(2.6rem,5.6vw,5.4rem)] leading-[0.98]">
                Evidence must be <strong className="text-accent">visible.</strong>
              </h2>
              <p className="mt-7 max-w-[46ch] text-[16.5px] leading-relaxed text-fg/80">{research.lead}</p>
              <p className="mt-4 max-w-[46ch] text-[16.5px] leading-relaxed text-fg/80">{research.body}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {research.principles.map((p) => (
                  <li key={p} className="rounded-full bg-tint px-4 py-2 text-[14px] text-accent">
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-[14px] text-muted">Peer-reviewed publications</p>
            <ol className="mt-4 space-y-2">
              {research.publications.map((p) => (
                <li
                  key={p.title}
                  className="grid grid-cols-[auto_1fr] items-start gap-5 rounded-[24px] px-4 py-5 transition-colors duration-300 hover:bg-surface-2 md:px-5"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-full border border-accent/40 font-mono text-[12.5px] text-accent">
                    {p.year}
                  </span>
                  <div>
                    <h3 className="display text-[1.3rem] leading-[1.22]">{p.title}</h3>
                    <p className="mt-2 text-[13.5px] text-muted">{p.journal}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10 border-t border-line pt-8">
              <p className="text-[14px] text-muted">White papers: the Human Adaptation Series</p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {research.papers.map((p) => (
                  <li key={p.code} className="rounded-full border border-fg/20 px-4 py-2 text-[14px]">
                    <span className="mr-2 font-mono text-[12px] text-accent">{p.code}</span>
                    {p.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Wrap>
        <div className="h-10 md:h-16" />
      </Sheet>
    </>
  );
}
