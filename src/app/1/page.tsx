import type { Metadata } from "next";
import { Pic, imageData } from "@/components/shared/Pic";
import { Parallax, Reveal } from "@/components/shared/Motion";
import { TriadDiagram, TriadMark } from "@/components/shared/Triad";
import { Scroller } from "@/components/shared/Scroller";
import { ButtonOne, Caption, Container, TextLink } from "@/components/one/ui";
import { SensesOne, ServicesOne, type MediaItem } from "@/components/one/Interactive";
import {
  CountUp,
  Curtain,
  Drift,
  PinnedGallery,
  ScrollSteps,
  WordsUp,
  type PinItem,
  type Step,
} from "@/components/one/Modern";
import {
  about,
  contactHref,
  founderTeaser,
  gutsy,
  hero,
  homeGallery,
  proof,
  research,
  sectors,
  senses,
  triad,
  work,
} from "@/content/home";

export const metadata: Metadata = {
  title: "Sample 1 | Home",
};

const serviceItems: MediaItem[] = work.services.map((s) => {
  const d = imageData(s.image);
  return { name: s.name, body: s.body, extra: s.outputs, src: d.src, blur: d.blur, alt: d.alt };
});

const senseItems: MediaItem[] = senses.items.map((s) => {
  const d = imageData(s.image);
  return { name: s.name, line: s.line, body: s.body, src: d.src, blur: d.blur, alt: d.alt };
});

const steps: Step[] = triad.domains.map((d) => {
  const i = imageData(d.image);
  return { name: d.name, question: d.question, body: d.body, detail: d.detail, src: i.src, blur: i.blur, alt: i.alt };
});

const pinItems: PinItem[] = homeGallery.map((g) => {
  const i = imageData(g.image);
  return { src: i.src, blur: i.blur, alt: i.alt, title: g.title, place: g.place };
});

export default function HomeOne() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative">
        <Container className="grid items-end gap-10 pb-16 pt-10 lg:min-h-[calc(100dvh-68px)] lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-14">
          <div className="lg:col-span-6 lg:pb-6">
            <p className="label text-muted">Evidence-led advisory and design practice</p>
            <h1 className="display mt-6 text-[clamp(2.6rem,4.7vw,4.75rem)] leading-[1.05]">
              <WordsUp
                segments={[
                  { text: "Designing human systems for" },
                  { text: "health, resilience and performance", className: "italic text-accent" },
                ]}
              />
            </h1>
            <p className="mt-7 max-w-[46ch] text-[17px] leading-relaxed text-fg/80">{hero.sub}</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <ButtonOne href="#about">{hero.cta}</ButtonOne>
              <TextLink href={contactHref}>Start a Conversation</TextLink>
            </div>
          </div>

          <div className="relative lg:col-span-6 lg:col-start-7">
            <Curtain className="ml-auto w-full lg:w-[86%]" delay={0.15}>
              <Pic
                k="hospitals/zen-waiting"
                ratio="4 / 5"
                sizes="(min-width: 1024px) 42vw, 100vw"
                preload
                pos="38% 50%"
                className="max-h-[78dvh]"
              />
            </Curtain>
            <Drift className="absolute -bottom-8 left-0 hidden w-[38%] sm:block" distance={46}>
              <Curtain className="border-[10px] border-bg" delay={0.5}>
                <Pic k="hospitals/jaipur-leaves" ratio="1 / 1" sizes="20vw" />
              </Curtain>
            </Drift>
            <p className="mt-3 text-right text-[12.5px] text-muted">
              A waiting lounge with a sand garden mural. Environment as an input to recovery.
            </p>
          </div>
        </Container>
      </section>

      {/* Where Sagework applies, as a slow band (the page's one marquee) */}
      <section aria-label="Where Sagework applies" className="overflow-hidden border-t border-line py-6 md:py-7">
        <div className="flex w-max hover:[animation-play-state:paused] motion-safe:animate-marquee">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
              {sectors.map((sector) => (
                <li
                  key={sector}
                  className="display flex items-center gap-8 whitespace-nowrap pr-8 text-[clamp(1.5rem,2.5vw,2.3rem)] italic md:gap-12 md:pr-12"
                >
                  {sector}
                  <TriadMark className="h-5 w-5 shrink-0 text-accent" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* 2. About: the statement */}
      <section id="about" className="scroll-mt-24 border-t border-line">
        <Container className="py-24 md:py-36">
          <h2 className="display max-w-5xl text-[clamp(3rem,8vw,8rem)] leading-[0.98]">
            <WordsUp inView segments={[{ text: "Health is shaped by" }, { text: "systems.", className: "italic" }]} />
          </h2>
          <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12">
            <Reveal className="md:col-span-5 md:col-start-2">
              <p className="display text-[clamp(1.5rem,2.3vw,2.1rem)] leading-[1.25]">{about.lead}</p>
            </Reveal>
            <Reveal className="space-y-5 text-[16.5px] leading-relaxed text-fg/80 md:col-span-5 md:col-start-8" delay={0.1}>
              {about.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
          </div>

          {/* Proof as a hairline bento: four figures around one photograph */}
          <Reveal className="mt-20 md:mt-28">
            <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2">
              {proof.map((f, i) => (
                <div
                  key={f.label}
                  className={`flex min-h-[200px] flex-col justify-between bg-bg p-7 transition-colors duration-500 hover:bg-surface md:p-9 ${
                    i === 0
                      ? "lg:col-span-3 lg:col-start-1 lg:row-start-1"
                      : i === 1
                        ? "lg:col-span-4 lg:col-start-9 lg:row-start-1"
                        : i === 2
                          ? "lg:col-span-3 lg:col-start-1 lg:row-start-2"
                          : "lg:col-span-4 lg:col-start-9 lg:row-start-2"
                  }`}
                >
                  <p className="text-[14px] text-muted">{f.unit}</p>
                  <div>
                    <p className="display text-[clamp(3rem,5vw,4.6rem)] leading-none">
                      <CountUp value={f.value} />
                    </p>
                    <p className="mt-3 max-w-[26ch] text-[14px] leading-snug text-muted">{f.label}</p>
                  </div>
                </div>
              ))}
              <div className="relative min-h-[260px] bg-bg sm:col-span-2 lg:col-span-5 lg:col-start-4 lg:row-span-2 lg:row-start-1">
                <Pic
                  k="hospitals/mangalore-shell-lobby"
                  cover
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="absolute inset-0 rounded-none"
                  imgClassName="transition-transform duration-[1600ms] ease-soft hover:scale-[1.04]"
                />
              </div>
            </div>
          </Reveal>
        </Container>

        <Parallax className="aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-[21/9]" amount={6}>
          <Pic k="academic/msap-aerial-mist" cover sizes="100vw" className="rounded-none" />
        </Parallax>
        <Container className="py-16 md:py-24">
          <Reveal>
            <p className="display mx-auto max-w-4xl text-center text-[clamp(1.8rem,3.4vw,3.1rem)] italic leading-[1.2]">
              {about.pull}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 3. The SAGE Triad: the photograph stays while the three domains scroll past */}
      <section className="border-t border-line">
        <Container className="pt-24 md:pt-32">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="label text-muted">{triad.kicker}</p>
              <h2 className="display mt-5 text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[1.05]">
                <WordsUp
                  inView
                  segments={[{ text: "Three domains." }, { text: "One human system.", className: "italic" }]}
                />
              </h2>
              <p className="mt-6 max-w-[58ch] text-[16.5px] leading-relaxed text-fg/80">
                {triad.intro} {triad.body}
              </p>
            </div>
            <div className="hidden lg:col-span-3 lg:col-start-10 lg:block">
              <TriadDiagram className="ml-auto w-full max-w-[250px] text-fg/70" />
            </div>
          </div>
        </Container>
        <Container className="pb-10 pt-10 lg:pt-0">
          <ScrollSteps items={steps} />
        </Container>
        <Container className="pb-24 md:pb-32">
          <Reveal className="grid gap-8 border-t border-line pt-8 md:grid-cols-12 md:items-end">
            <p className="display text-[clamp(1.4rem,2.2vw,1.9rem)] leading-[1.3] md:col-span-8">{triad.close}</p>
            <div className="md:col-span-4 md:text-right">
              <TextLink href="#research">{triad.cta}</TextLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 4. Selected environments: pans as the page scrolls on wide screens */}
      <section className="border-t border-line bg-surface">
        <PinnedGallery
          items={pinItems}
          header={
            <Container className="flex flex-col gap-6 pb-10 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="display max-w-2xl text-[clamp(2.4rem,4.2vw,4rem)] leading-[1.05]">
                Environments designed for the people inside them
              </h2>
              <TextLink href="/1/projects">View all projects</TextLink>
            </Container>
          }
          fallback={
            <>
              <div className="pt-20 md:pt-28">
                <Container className="flex flex-col gap-6 pb-10 sm:flex-row sm:items-end sm:justify-between">
                  <h2 className="display max-w-2xl text-[clamp(2.4rem,4.2vw,4rem)] leading-[1.05]">
                    Environments designed for the people inside them
                  </h2>
                  <TextLink href="/1/projects">View all projects</TextLink>
                </Container>
              </div>
              <Scroller
                label="selected environments"
                tone="one"
                className="pb-20 md:pb-28"
                trackClassName="flex snap-x snap-proximity scroll-px-5 gap-5 px-5 md:scroll-px-10 md:gap-7 md:px-10"
                controlsClassName="mx-auto mt-8 max-w-[1440px] justify-end px-5 md:px-10"
              >
                {homeGallery.map((g, i) => (
                  <figure
                    key={g.image}
                    className={`shrink-0 snap-start ${i % 3 === 1 ? "w-[46vw] sm:w-[29.25vw] lg:w-[21.4vw]" : "w-[82vw] sm:w-[52vw] lg:w-[38vw]"}`}
                  >
                    <Pic
                      k={g.image}
                      ratio={i % 3 === 1 ? "3 / 4" : "4 / 3"}
                      sizes="(min-width: 1024px) 38vw, 82vw"
                    />
                    <figcaption className="mt-4">
                      <p className="display text-[1.45rem] leading-tight">{g.title}</p>
                      <p className="mt-1 text-[13px] text-muted">{g.place}</p>
                    </figcaption>
                  </figure>
                ))}
              </Scroller>
            </>
          }
        />
      </section>

      {/* 5. Work with Sagework */}
      <section id="work" className="scroll-mt-24 border-t border-line">
        <Container className="py-24 md:py-32">
          <Reveal className="max-w-4xl">
            <h2 className="display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[1.05]">
              Build health and performance <em className="italic">into the system.</em>
            </h2>
            <p className="mt-7 max-w-[60ch] text-[17px] leading-relaxed text-fg/80">{work.lead}</p>
          </Reveal>
          <div className="mt-16">
            <ServicesOne items={serviceItems} />
          </div>
          <Reveal className="mt-16 grid gap-8 md:grid-cols-12 md:items-end">
            <p className="display text-[clamp(1.4rem,2.2vw,1.9rem)] leading-[1.3] md:col-span-7">{work.note}</p>
            <div className="md:col-span-4 md:col-start-9 md:text-right">
              <ButtonOne href={contactHref}>Start a Conversation</ButtonOne>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 6. Founder */}
      <section className="border-t border-line bg-surface">
        <Container className="grid gap-12 py-24 md:py-32 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Curtain>
              <Pic
                k="founder/reviewing-designs"
                ratio="4 / 5"
                sizes="(min-width: 1024px) 38vw, 100vw"
                pos="50% 20%"
              />
            </Curtain>
            <Caption>Reviewing artwork studies in the design studio.</Caption>
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-7 lg:self-center" delay={0.1}>
            <p className="label text-muted">{founderTeaser.kicker}</p>
            <p className="display mt-6 text-[clamp(2rem,3.6vw,3.4rem)] italic leading-[1.14]">
              <WordsUp inView segments={[{ text: founderTeaser.question }]} />
            </p>
            <p className="mt-6 text-[14px] text-muted">{founderTeaser.role}</p>
            <div className="mt-8 max-w-[58ch] space-y-5 text-[16.5px] leading-relaxed text-fg/80">
              {founderTeaser.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-9">
              <ButtonOne href="/1/founder">{founderTeaser.cta}</ButtonOne>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 7. The Five Senses */}
      <section id="senses" className="scroll-mt-24 border-t border-line">
        <Container className="py-24 md:py-32">
          <Reveal className="max-w-3xl">
            <h2 className="display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[1.05]">
              The body&rsquo;s interface <em className="italic">with the world</em>
            </h2>
            <p className="mt-7 text-[17px] leading-relaxed text-fg/80">
              {senses.intro} {senses.body}
            </p>
          </Reveal>
          <div className="mt-14">
            <SensesOne items={senseItems} />
          </div>
          <Reveal className="mt-14 max-w-3xl">
            <p className="display text-[1.5rem] leading-[1.3]">{senses.close}</p>
          </Reveal>
        </Container>
      </section>

      {/* 8. Dr Gutsy */}
      <section id="gutsy" className="scroll-mt-24 border-t border-line bg-surface">
        <Container className="py-24 text-center md:py-32">
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[1.05]">
              Dr Gutsy. <em className="italic">{gutsy.title}.</em>
            </h2>
            <p className="mt-7 text-[17px] leading-relaxed text-fg/80">{gutsy.lead}</p>
          </Reveal>
          {/* The questions stack on top of one another as you scroll */}
          <ul className="mx-auto mt-14 max-w-3xl pb-10 text-left">
            {gutsy.questions.map((q, i) => (
              <li
                key={q}
                className="sticky mb-8 border border-line bg-bg px-7 py-10 shadow-[0_-22px_44px_-34px_rgba(27,42,32,0.5)] md:px-12 md:py-14"
                style={{ top: `${104 + i * 26}px` }}
              >
                <TriadMark className="h-6 w-6 text-accent" />
                <p className="display mt-6 text-[clamp(1.6rem,3vw,2.6rem)] italic leading-[1.2]">{q}</p>
              </li>
            ))}
          </ul>
          <Reveal className="mx-auto mt-14 max-w-2xl">
            <p className="text-[16px] leading-relaxed text-fg/80">{gutsy.body}</p>
            <p className="label mt-8 text-muted">{gutsy.sign}</p>
          </Reveal>
        </Container>
      </section>

      {/* 9. Research and evidence */}
      <section id="research" className="scroll-mt-24 border-t border-line">
        <Container className="grid gap-14 py-24 md:py-32 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="label text-muted">{research.kicker}</p>
            <h2 className="display mt-5 text-[clamp(2.6rem,5vw,4.8rem)] leading-[1.02]">
              Evidence must be <em className="italic">visible.</em>
            </h2>
            <p className="mt-7 max-w-[46ch] text-[16.5px] leading-relaxed text-fg/80">{research.lead}</p>
            <p className="mt-4 max-w-[46ch] text-[16.5px] leading-relaxed text-fg/80">{research.body}</p>
            <p className="display mt-10 text-[1.6rem] italic leading-[1.3] text-accent">
              {research.principles.join(". ")}.
            </p>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-[14px] text-muted">Selected peer-reviewed publications</p>
            <ol className="mt-5">
              {research.publications.slice(0, 4).map((p) => (
                <li
                  key={p.title}
                  className="group grid grid-cols-[4.5rem_1fr] gap-4 border-t border-line py-6 transition-[background-color,padding] duration-500 ease-soft hover:bg-surface hover:px-4"
                >
                  <span className="font-mono text-[13px] text-muted transition-colors duration-500 group-hover:text-accent">
                    {p.year}
                  </span>
                  <div>
                    <p className="display text-[1.4rem] leading-[1.22]">{p.title}</p>
                    <p className="mt-2 text-[13.5px] text-muted">{p.journal}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10 border-t border-line pt-8">
              <p className="text-[14px] text-muted">White papers: the Human Adaptation Series</p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {research.papers.map((p) => (
                  <li key={p.code} className="border border-line px-3.5 py-2 text-[13.5px]">
                    <span className="mr-2 font-mono text-[12px] text-muted">{p.code}</span>
                    {p.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
