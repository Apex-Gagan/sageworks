import Link from "next/link";
import type { ReactNode } from "react";
import { imageData, Pic } from "@/components/shared/Pic";
import { Reveal } from "@/components/shared/Motion";
import { Button, Lead, Note } from "@/components/site/ui";
import { GapDiagram, StatLine } from "@/components/two/diagrams";
import { Bar, Block, ClosingBand, ExploreRows, Go, H, Loop, Plate, Ticks, W } from "@/components/two/kit";
import { Rail } from "@/components/two/Rail";
import { Rows } from "@/components/two/Rows";
import { SenseGrid } from "@/components/two/SenseGrid";
import { Slider } from "@/components/two/Slider";
import { Triptych } from "@/components/two/Triptych";
import { Venn } from "@/components/two/Venn";
import { presentNeed, sageOs } from "@/content/discover";
import { about, founderTeaser, hero, outcomes, triad, work } from "@/content/home";
import { kinds, projects } from "@/content/projects";
import { senses, sensesIntro } from "@/content/senses";
import { lensColour, phaseOne, type LensName } from "@/content/site";
import { homeProjects, lensPhoto, photo, projectPhotos, r2 } from "@/content/two";

const lensHex: Record<LensName, string> = { Biology: "#9aca28", Environment: "#40b49d", Behaviour: "#edaa1f" };

const questions = [
  { id: "who", q: phaseOne.who },
  { id: "why", q: phaseOne.why },
  { id: "what", q: phaseOne.what },
  { id: "how", q: phaseOne.how },
  { id: "get", q: phaseOne.get },
];

/** One of the five answers: its number and question on a ruled line, then the answer. */
function Answer({ id, children }: { id: string; children: ReactNode }) {
  const n = questions.findIndex((q) => q.id === id);
  return (
    <section id={id} data-question className="scroll-mt-40">
      <Bar n={String(n + 1).padStart(2, "0")} label={questions[n].q} />
      <div className="mt-9 md:mt-12">{children}</div>
    </section>
  );
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/**
 * Design 2 homepage. The five questions the client set for phase 1 stay beside the
 * page as a list, and the page answers them in order. The wording is the same as
 * Design 1; the ideas are drawn as diagrams where Design 1 uses photographs.
 */
export default function HomeTwo() {
  const featured = homeProjects.map((s) => projects.find((p) => p.slug === s)!);

  return (
    <>
      {/* Opening: the headline on white, then the three lenses across the full width */}
      <section>
        <W className="grid gap-x-12 gap-y-7 pb-9 pt-9 md:pb-12 md:pt-14 lg:grid-cols-12 lg:items-end">
          <h1 className="display text-[clamp(2.5rem,4.9vw,4.7rem)] lg:col-span-8">
            Designing human systems for <em>health, resilience and performance</em>
          </h1>
          <div className="lg:col-span-4">
            <p className="text-[1.08rem] leading-relaxed">{hero.sub}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={r2.discover}>{hero.cta}</Button>
              <Button href={r2.projects} tone="outline">
                See the projects
              </Button>
            </div>
          </div>
        </W>
        <div className="px-1.5 md:px-2">
          <Triptych
            panels={lensPhoto.map((l) => {
              const d = imageData(l.image);
              const t = triad.domains.find((x) => x.name === l.lens)!;
              return { lens: l.lens, line: t.question, dot: lensColour[l.lens].dot, src: d.src, blur: d.blur, alt: d.alt, pos: l.pos };
            })}
          />
        </div>
        <W>
          <Note className="mt-4 max-w-[52rem]" why="Dr Shruti chose a video opening: images describing designing human systems through the three pillars of the SAGE Triad.">
            The edited hero video. Until it arrives, three stills stand in its place, one for each pillar.
          </Note>
        </W>
      </section>

      {/* The five questions, answered in order */}
      <W className="py-16 md:py-24">
        <div className="lg:grid lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[250px_minmax(0,1fr)] xl:gap-20">
          <aside className="hidden lg:block">
            <Rail items={questions} />
          </aside>

          <div className="space-y-20 md:space-y-28">
            <Answer id="who">
              <Reveal>
                <H>
                  Health is shaped by <em>systems.</em>
                </H>
                <div className="mt-8 grid gap-x-12 gap-y-6 md:grid-cols-2">
                  <Lead>{about.lead}</Lead>
                  <div>
                    <p>{about.body[1]}</p>
                    <Go href={r2.discover} className="mt-6">
                      Discover Sagework
                    </Go>
                  </div>
                </div>
              </Reveal>
              <Reveal className="mt-12">
                <Plate
                  k={photo.homeWho}
                  ratio="21 / 9"
                  sizes="(min-width: 1024px) 70vw, 100vw"
                  caption="Manipal Hospital Bengaluru: marine and coral artwork above the outpatient reception."
                />
              </Reveal>
            </Answer>

            <Answer id="why">
              <Reveal>
                <H>
                  Modern systems are changing faster than <em>human biology</em>
                </H>
              </Reveal>
              <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
                <Reveal>
                  <GapDiagram demand="What modern systems demand from people" need="What human biology needs to function well" gap="The Human Adaptation Gap" />
                </Reveal>
                <Reveal delay={0.1}>
                  <Lead>{presentNeed.gap}</Lead>
                  <p className="mt-5">{presentNeed.close}</p>
                  <div className="mt-8">
                    <StatLine
                      labels={["Human Adaptation Gap", "The SAGE Triad", "The five senses"]}
                      about="Three headline percentages: one for the Human Adaptation Gap, one for the SAGE Triad and one for the five senses."
                    />
                  </div>
                </Reveal>
              </div>
            </Answer>

            <Answer id="what">
              <Reveal>
                <H>
                  Three domains. One <em>human system.</em>
                </H>
                <Lead className="mt-7 max-w-[46rem]">{triad.intro}</Lead>
              </Reveal>
              <Reveal className="mt-10">
                <Venn
                  centre="One human system"
                  circles={triad.domains.map((d) => ({
                    name: d.name,
                    question: d.question,
                    body: d.body,
                    detail: d.detail,
                    colour: lensHex[d.name as LensName],
                    dot: lensColour[d.name as LensName].dot,
                  }))}
                />
              </Reveal>
              <Reveal className="mt-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <p className="display max-w-[44rem] text-[1.4rem] md:text-[1.65rem]">{triad.close}</p>
                <Go href={r2.discover} className="shrink-0">
                  Explore our approach
                </Go>
              </Reveal>

              <div className="mt-20">
                <Bar label={sensesIntro.kicker}>
                  <Go href={r2.senses}>Explore the Five Senses</Go>
                </Bar>
                <Reveal className="mb-9 mt-9 max-w-[46rem]">
                  <H size="md">{sensesIntro.homeTitle}</H>
                  <p className="mt-4">{sensesIntro.homeLead}</p>
                </Reveal>
                <SenseGrid items={senses.map(({ name, line, figure, figureLabel, finding, source, body, practice }) => ({ name, line, figure, figureLabel, finding, source, body, practice }))} />
              </div>
            </Answer>

            <Answer id="how">
              <div className="grid gap-x-12 gap-y-10 xl:grid-cols-[0.8fr_1.2fr]">
                <Reveal>
                  <H>
                    Build health and performance into <em>the system.</em>
                  </H>
                  <Lead className="mt-7">{work.lead}</Lead>
                  <Button href={r2.work} className="mt-8">
                    {work.cta}
                  </Button>
                </Reveal>
                <Reveal delay={0.1}>
                  <Rows
                    first
                    items={work.services.map((s, n) => ({
                      id: `service-${slug(s.name)}`,
                      tag: String(n + 1).padStart(2, "0"),
                      title: s.name,
                      content: (
                        <>
                          <p>{s.body}</p>
                          <p className="mt-4 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-sage-ink">Possible outputs</p>
                          <p className="mt-1.5 text-[15.5px]">{s.outputs}</p>
                          <Link
                            href={`${r2.work}#${slug(s.name)}`}
                            data-service-link
                            className="mt-4 inline-block text-[15px] font-semibold text-sage-ink underline underline-offset-4"
                          >
                            More on {s.name}
                          </Link>
                        </>
                      ),
                    }))}
                  />
                </Reveal>
              </div>

              <div className="mt-20">
                <Bar label="SAGE OS" />
                <Reveal className="mb-14 mt-9 max-w-[46rem]">
                  <H size="md">{sageOs.title}</H>
                </Reveal>
                <Loop steps={sageOs.steps} returns="Learning runs through every stage" />
              </div>
            </Answer>

            <Answer id="get">
              <Reveal>
                <p className="display max-w-[52rem] text-[clamp(1.8rem,3.2vw,2.8rem)]">{outcomes.statement}</p>
              </Reveal>
              <Reveal delay={0.1} className="mt-12">
                <p className="eyebrow mb-4">{outcomes.label}</p>
                <Ticks items={outcomes.items} className="border-b border-line" />
                <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                  <p className="text-[15px] text-ink-soft">{outcomes.note}</p>
                  <Button href={r2.contact}>Start a Conversation</Button>
                </div>
              </Reveal>
            </Answer>
          </div>
        </div>
      </W>

      {/* Projects: what she has made */}
      <Block id="projects" label="Projects" tint link={<Go href={r2.projects}>All projects</Go>}>
        <Reveal className="mb-10 max-w-[46rem]">
          <H>
            Environments designed for <em>the people inside them</em>
          </H>
        </Reveal>
        <Slider label="Projects">
          {featured.map((p) => {
            const k = kinds.find((x) => x.name === p.kind)!;
            return (
              <Link key={p.slug} href={`${r2.projects}#${p.slug}`} data-home-project className="group w-[min(82vw,460px)] shrink-0 snap-start bg-white">
                <Pic
                  k={projectPhotos[p.slug][0]}
                  ratio="4 / 3"
                  sizes="(min-width: 768px) 460px, 82vw"
                  imgClassName="transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.04]"
                />
                <div className="p-5 md:p-6">
                  <p className="flex items-center gap-2.5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-sage-ink">
                    <span className={`h-2.5 w-2.5 rounded-full ${k.dot}`} />
                    {p.kind}
                  </p>
                  <p className="display mt-2 text-[1.5rem] leading-tight">{p.title}</p>
                  <p className="mt-1 text-[15px] text-ink-soft">{p.theme}</p>
                </div>
              </Link>
            );
          })}
        </Slider>
      </Block>

      {/* The founder: her one appearance on the homepage */}
      <Block id="founder" label={founderTeaser.kicker}>
        <div className="grid items-end gap-x-14 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="text-[15px] text-ink-soft">{founderTeaser.role}</p>
            <H className="mt-4">{founderTeaser.question}</H>
            <p className="mt-7">{founderTeaser.body[0]}</p>
            <Button href={r2.founder} tone="outline" className="mt-8">
              {founderTeaser.cta}
            </Button>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <Pic k={photo.homeFounder} ratio="3 / 2" sizes="(min-width: 1024px) 56vw, 100vw" pos="50% 35%" />
          </Reveal>
        </div>
      </Block>

      {/* Further in */}
      <Block label="Evidence and public knowledge" className="pt-0!">
        <Reveal className="mb-10">
          <H size="md">Research, evidence and public education</H>
        </Reveal>
        <ExploreRows />
      </Block>

      <ClosingBand />
    </>
  );
}
