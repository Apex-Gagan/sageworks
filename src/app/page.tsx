import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Leaf } from "@/components/brand/Leaf";
import { imageData, Pic } from "@/components/shared/Pic";
import { Reveal } from "@/components/shared/Motion";
import { HeroFilm } from "@/components/site/HeroFilm";
import { Senses } from "@/components/site/Senses";
import { Triad } from "@/components/site/Triad";
import { Closing, ExploreCards, SageOs, StatSlots } from "@/components/site/sections";
import { Button, Eyebrow, Lead, Note, Section, TextLink, Title, Wrap } from "@/components/site/ui";
import { presentNeed, sageOs } from "@/content/discover";
import { about, film, founderTeaser, hero, outcomes, triad, work } from "@/content/home";
import { senses, sensesIntro } from "@/content/senses";
import { projects } from "@/content/projects";
import { lensColour, phaseOne, routes } from "@/content/site";

/**
 * Homepage. Its sections follow the five questions the client set for phase 1:
 * who we are, why we are here, what we bring, how we help and what you get.
 * Wording is kept short on purpose; the longer copy lives on the inner pages.
 */
export default function Home() {
  return (
    <>
      {/* Opening: one large picture story of the three lenses */}
      <section className="pb-6 md:pb-10">
        <HeroFilm
          slides={film.map((f) => {
            const d = imageData(f.image);
            return { lens: f.lens, line: f.line, dot: lensColour[f.lens].dot, src: d.src, blur: d.blur, alt: d.alt, pos: f.pos };
          })}
        >
          <h1 className="display text-[clamp(2.6rem,6.4vw,6rem)]">
            Designing human systems for <span className="text-sage">health, resilience and performance</span>
          </h1>
          <p className="mt-6 max-w-[40rem] text-[1.08rem] leading-relaxed text-white/95 md:text-[1.25rem]">{hero.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3 [text-shadow:none]">
            <Button href={routes.discover}>{hero.cta}</Button>
            <Button href={routes.projects} tone="ghost">
              See the projects
            </Button>
          </div>
        </HeroFilm>
        <Wrap>
          <Note className="mt-4 max-w-[52rem]" why="Dr Shruti chose a video opening: images describing designing human systems through the three pillars of the SAGE Triad.">
            The edited hero video. Until it arrives, three stills play in its place, one for each pillar.
          </Note>
        </Wrap>
      </section>

      {/* Who are we? */}
      <Section id="who">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <Reveal>
            <Eyebrow>{phaseOne.who}</Eyebrow>
            <Title className="mt-5">
              Health is shaped by <em>systems.</em>
            </Title>
            <Lead className="mt-7 max-w-[36rem]">{about.lead}</Lead>
            <p className="mt-5 max-w-[36rem]">{about.body[1]}</p>
            <TextLink href={routes.discover} className="mt-8">
              Discover Sagework
            </TextLink>
          </Reveal>
          <Reveal delay={0.1}>
            <Pic k="hospitals/dwarka-building" ratio="5 / 6" className="leafcut" sizes="(min-width: 1024px) 44vw, 100vw" pos="40% 40%" />
          </Reveal>
        </div>
      </Section>

      {/* Why are we here? */}
      <Section id="why" className="wash-sage">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <Reveal>
            <Eyebrow>{phaseOne.why}</Eyebrow>
            <Title className="mt-5">
              Modern systems are changing faster than <em>human biology</em>
            </Title>
          </Reveal>
          <Reveal delay={0.1}>
            <Lead>{presentNeed.gap}</Lead>
            <p className="mt-5">{presentNeed.close}</p>
            <div className="mt-10">
              <StatSlots
                labels={["Human Adaptation Gap", "The SAGE Triad", "The five senses"]}
                about="Three headline percentages: one for the Human Adaptation Gap, one for the SAGE Triad and one for the five senses."
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* What do we bring to you? */}
      <Section id="what">
        <Reveal className="max-w-[50rem]">
          <Eyebrow>{phaseOne.what}</Eyebrow>
          <Title className="mt-5">
            Three domains. One <em>human system.</em>
          </Title>
          <Lead className="mt-7">{triad.intro}</Lead>
        </Reveal>
        <Reveal className="mt-12">
          <Triad
            lenses={triad.domains.map((d) => {
              const img = imageData(lensImage[d.name as keyof typeof lensImage]);
              return {
                name: d.name,
                question: d.question,
                body: d.body,
                detail: d.detail,
                bg: lensColour[d.name as keyof typeof lensColour].bg,
                src: img.src,
                blur: img.blur,
                alt: img.alt,
              };
            })}
          />
        </Reveal>
        <Reveal className="mt-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <p className="display max-w-[44rem] text-[1.45rem] md:text-[1.7rem]">{triad.close}</p>
          <TextLink href={routes.discover}>Explore our approach</TextLink>
        </Reveal>

        <div className="mt-24 border-t border-line pt-16 md:mt-28 md:pt-20">
          <Reveal className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-[44rem]">
              <Eyebrow>{sensesIntro.kicker}</Eyebrow>
              <Title size="md" className="mt-4">
                {sensesIntro.homeTitle}
              </Title>
              <p className="mt-4">{sensesIntro.homeLead}</p>
            </div>
            <TextLink href={routes.senses}>Explore the Five Senses</TextLink>
          </Reveal>
          <Senses
            items={senses.map((s) => {
              const img = imageData(s.homeImage);
              return { ...s, src: img.src, blur: img.blur, alt: img.alt };
            })}
          />
        </div>
      </Section>

      {/* How will we help you? */}
      <Section id="how" className="wash-sage">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>{phaseOne.how}</Eyebrow>
            <Title className="mt-5">
              Build health and performance into <em>the system.</em>
            </Title>
            <Lead className="mt-7 max-w-[34rem]">{work.lead}</Lead>
            <Button href={routes.work} className="mt-9">
              {work.cta}
            </Button>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
              {work.services.map((s, n) => (
                <li key={s.name} className="bg-white">
                  <Link
                    href={`${routes.work}#${slug(s.name)}`}
                    data-service-link
                    className="group flex h-full flex-col justify-between gap-6 p-6 transition-colors duration-300 hover:bg-paper md:p-7"
                  >
                    <span className="text-[12.5px] font-semibold tracking-[0.14em] text-sage-ink">{String(n + 1).padStart(2, "0")}</span>
                    <span className="flex items-end justify-between gap-4">
                      <span className="display text-[1.5rem] leading-tight md:text-[1.65rem]">{s.name}</span>
                      <ArrowRight size={18} className="mb-1.5 shrink-0 text-sage-ink transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-20">
          <Reveal className="mb-10 max-w-[44rem]">
            <Eyebrow>SAGE OS</Eyebrow>
            <Title size="md" className="mt-4">
              {sageOs.title}
            </Title>
          </Reveal>
          <SageOs steps={sageOs.steps.map((s) => ({ name: s.name, line: s.line, body: s.body }))} />
        </div>
      </Section>

      {/* What will you get by working with us? */}
      <section id="get" className="pb-6 md:pb-10">
        <Wrap>
          <div className="leafcut relative overflow-hidden bg-sage px-6 py-16 text-ink-deep md:px-14 md:py-24">
            <Leaf className="pointer-events-none absolute -bottom-16 -right-6 h-[125%] w-auto text-sage-deep opacity-80 md:right-[8%]" />
            <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
              <Reveal>
                <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em]">{phaseOne.get}</p>
                <p className="display mt-6 text-[clamp(1.9rem,3.6vw,3.1rem)] text-white">{outcomes.statement}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em]">{outcomes.label}</p>
                <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {outcomes.items.map((o) => (
                    <li key={o} className="border-t border-ink-deep/25 pt-3 text-[16px] font-medium leading-snug">
                      {o}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[15px]">{outcomes.note}</p>
                <Button href={routes.contact} tone="white" className="mt-8">
                  Start a Conversation
                </Button>
              </Reveal>
            </div>
          </div>
        </Wrap>
      </section>

      {/* Projects: what she has made */}
      <Section id="projects" tight>
        <Reveal className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-[44rem]">
            <Eyebrow>Projects</Eyebrow>
            <Title size="md" className="mt-4">
              Environments designed for <em>the people inside them</em>
            </Title>
          </div>
          <TextLink href={routes.projects}>All projects</TextLink>
        </Reveal>
        <div className="grid gap-3 md:grid-cols-3">
          {featured.map((p, n) => (
            <Reveal key={p.slug} delay={n * 0.08}>
              <Link href={`${routes.projects}#${p.slug}`} data-home-project className="group block">
                <Pic
                  k={p.images[0]}
                  ratio="4 / 5"
                  sizes="(min-width: 768px) 32vw, 100vw"
                  className={n === featured.length - 1 ? "leafcut" : ""}
                  imgClassName="transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.04]"
                />
                <p className="mt-4 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-sage-ink">{p.kind}</p>
                <p className="display mt-1.5 text-[1.5rem] leading-tight">{p.title}</p>
                <p className="mt-1 text-[15px] text-ink-soft">{p.theme}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The founder */}
      <Section id="founder">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <Reveal>
            <Pic k="founder/seminar-listening" ratio="4 / 3" className="leafcut" sizes="(min-width: 1024px) 44vw, 100vw" pos="50% 30%" />
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>{founderTeaser.kicker}</Eyebrow>
            <p className="mt-2 text-[15px] text-ink-soft">{founderTeaser.role}</p>
            <Title className="mt-5">{founderTeaser.question}</Title>
            <p className="mt-7 max-w-[36rem]">{founderTeaser.body[0]}</p>
            <Button href={routes.founder} tone="outline" className="mt-8">
              {founderTeaser.cta}
            </Button>
          </Reveal>
        </div>
      </Section>

      {/* Further in */}
      <Section className="wash-sage" tight>
        <Reveal className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>Evidence and public knowledge</Eyebrow>
            <Title size="md" className="mt-4">
              Research, evidence and public education
            </Title>
          </div>
          <TextLink href={routes.projects}>See the projects</TextLink>
        </Reveal>
        <ExploreCards />
      </Section>

      <Closing />
    </>
  );
}

/** Three projects shown on the homepage, one per kind of place. */
const featured = ["mangalore", "msap", "valley-view"].map((s) => projects.find((p) => p.slug === s)!);

/** One people-led photograph per lens for the triad panels. */
const lensImage = {
  Biology: "hospitality/wgsha-kitchen-red",
  Environment: "hospitals/mangalore-spiral-reception",
  Behaviour: "academic/classroom-students",
} as const;

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
