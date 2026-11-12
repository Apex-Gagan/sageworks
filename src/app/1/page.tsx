import type { Metadata } from "next";
import { Pic, imageData } from "@/components/shared/Pic";
import { Parallax, Reveal } from "@/components/shared/Motion";
import { TriadDiagram } from "@/components/shared/Triad";
import { Scroller } from "@/components/shared/Scroller";
import { ButtonOne, Caption, Container, TextLink } from "@/components/one/ui";
import { SensesOne, ServicesOne, type MediaItem } from "@/components/one/Interactive";
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

export default function HomeOne() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative">
        <Container className="grid items-end gap-10 pb-16 pt-10 lg:min-h-[calc(100dvh-68px)] lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-14">
          <div className="lg:col-span-6 lg:pb-6">
            <p className="label text-muted">Evidence-led advisory and design practice</p>
            <h1 className="display mt-6 text-[clamp(2.6rem,4.7vw,4.75rem)] leading-[1.05]">
              Designing human systems for{" "}
              <em className="italic text-accent">health, resilience and performance</em>
            </h1>
            <p className="mt-7 max-w-[46ch] text-[17px] leading-relaxed text-fg/80">{hero.sub}</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <ButtonOne href="#about">{hero.cta}</ButtonOne>
              <TextLink href={contactHref}>Start a Conversation</TextLink>
            </div>
          </div>

          <div className="relative lg:col-span-6 lg:col-start-7">
            <div className="ml-auto w-full lg:w-[86%]">
              <Pic
                k="hospitals/zen-waiting"
                ratio="4 / 5"
                sizes="(min-width: 1024px) 42vw, 100vw"
                preload
                pos="38% 50%"
                className="max-h-[78dvh]"
              />
            </div>
            <div className="absolute -bottom-8 left-0 hidden w-[38%] border-[10px] border-bg sm:block">
              <Pic k="hospitals/jaipur-leaves" ratio="1 / 1" sizes="20vw" />
            </div>
            <p className="mt-3 text-right text-[12.5px] text-muted">
              A waiting lounge with a sand garden mural. Environment as an input to recovery.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. About: the statement */}
      <section id="about" className="scroll-mt-24 border-t border-line">
        <Container className="py-24 md:py-36">
          <Reveal>
            <h2 className="display max-w-5xl text-[clamp(3rem,8vw,8rem)] leading-[0.98]">
              Health is shaped by <em className="italic">systems.</em>
            </h2>
          </Reveal>
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

          <Reveal className="mt-20 border-t border-line pt-10 md:mt-28">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
              {proof.map((f) => (
                <div key={f.label}>
                  <dt className="display text-[clamp(2.4rem,4vw,3.6rem)] leading-none">{f.value}</dt>
                  <dd className="mt-3 text-[14px] leading-snug text-muted">
                    <span className="block text-fg">{f.unit}</span>
                    {f.label}
                  </dd>
                </div>
              ))}
            </dl>
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

      {/* 3. The SAGE Triad */}
      <section className="border-t border-line">
        <Container className="grid gap-14 py-24 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="label text-muted">{triad.kicker}</p>
              <h2 className="display mt-5 text-[clamp(2.4rem,4.2vw,4rem)] leading-[1.05]">
                Three domains. <em className="italic">One human system.</em>
              </h2>
              <p className="mt-6 max-w-[44ch] text-[16.5px] leading-relaxed text-fg/80">{triad.intro}</p>
              <p className="mt-4 max-w-[44ch] text-[16.5px] leading-relaxed text-fg/80">{triad.body}</p>
              <TriadDiagram className="mt-10 w-full max-w-[340px] text-fg/70" />
              <div className="mt-8">
                <TextLink href="#research">{triad.cta}</TextLink>
              </div>
            </div>
          </div>

          <div className="space-y-16 lg:col-span-6 lg:col-start-7">
            {triad.domains.map((d) => (
              <Reveal key={d.name}>
                <Pic k={d.image} ratio="16 / 10" sizes="(min-width: 1024px) 46vw, 100vw" />
                <div className="mt-6 grid gap-4 sm:grid-cols-12">
                  <div className="sm:col-span-5">
                    <h3 className="display text-[2.4rem] leading-none">{d.name}</h3>
                    <p className="display mt-2 text-[1.2rem] italic leading-snug text-accent">{d.question}</p>
                  </div>
                  <p className="text-[15.5px] leading-relaxed text-fg/80 sm:col-span-7">{d.body}</p>
                </div>
              </Reveal>
            ))}
            <Reveal>
              <p className="display border-t border-line pt-8 text-[1.5rem] leading-[1.3]">{triad.close}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 4. Selected environments */}
      <section className="border-t border-line bg-surface">
        <Container className="flex flex-col gap-6 pb-10 pt-20 sm:flex-row sm:items-end sm:justify-between md:pt-28">
          <h2 className="display max-w-2xl text-[clamp(2.4rem,4.2vw,4rem)] leading-[1.05]">
            Environments designed for the people inside them
          </h2>
          <TextLink href="/1/projects">View all projects</TextLink>
        </Container>
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
          <Reveal className="lg:col-span-5">
            <Pic
              k="founder/reviewing-designs"
              ratio="4 / 5"
              sizes="(min-width: 1024px) 38vw, 100vw"
              pos="50% 20%"
            />
            <Caption>Reviewing artwork studies in the design studio.</Caption>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7 lg:self-center" delay={0.1}>
            <p className="label text-muted">{founderTeaser.kicker}</p>
            <p className="display mt-6 text-[clamp(2rem,3.6vw,3.4rem)] italic leading-[1.14]">
              {founderTeaser.question}
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
          <ul className="mx-auto mt-14 max-w-4xl">
            {gutsy.questions.map((q, i) => (
              <li key={q} className={i === 0 ? "" : "mt-9 border-t border-line pt-9"}>
                <Reveal delay={i * 0.06}>
                  <p className="display text-[clamp(1.6rem,3vw,2.6rem)] italic leading-[1.2]">{q}</p>
                </Reveal>
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
                <li key={p.title} className="grid grid-cols-[4.5rem_1fr] gap-4 border-t border-line py-6">
                  <span className="font-mono text-[13px] text-muted">{p.year}</span>
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
