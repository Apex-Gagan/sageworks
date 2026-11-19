import type { Metadata } from "next";
import Image from "next/image";
import { Mark } from "@/components/brand/Mark";
import { Reveal } from "@/components/shared/Motion";
import { Accordion } from "@/components/site/Accordion";
import { Closing, LeafList } from "@/components/site/sections";
import { Button, Eyebrow, Lead, Note, Section, Title, Wrap } from "@/components/site/ui";
import { gutsyPage as g } from "@/content/pages";
import { routes } from "@/content/site";

export const metadata: Metadata = {
  title: "Simply Sage and Dr Gutsy",
  description: g.body[1],
};

const sideSize: Record<string, [number, number]> = {
  listener: [524, 1400],
  scientist: [753, 1400],
  investigator: [651, 1400],
  sage: [652, 1400],
  "problem-solver": [720, 1400],
};

/** Empty rows for a list of videos, ready for titles and links. */
function VideoSlots({ count = 3, what }: { count?: number; what: string }) {
  return (
    <ol data-video-slots className="border-t border-line">
      {Array.from({ length: count }, (_, n) => (
        <li key={n} className="flex items-center gap-5 border-b border-line py-4">
          <span className="flex h-12 w-20 shrink-0 items-center justify-center border border-dashed border-ink/30 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft">
            Video
          </span>
          <span className="text-[15.5px] text-ink-soft">
            {what} video {n + 1}: title and link to come
          </span>
        </li>
      ))}
    </ol>
  );
}

/**
 * Page 5 in Dr Shruti's list: (a) SimplySage by Dr Shruti and (b) Dr Gutsy, each with
 * a list of videos and links leading to its website. Dr Gutsy's copy is from the
 * content master (Page 5) and the Dr Gutsy brand playbook. Simply Sage has no approved
 * copy yet, so its part states what is needed.
 */
export default function PublicEducation() {
  return (
    <>
      <section className="wash relative overflow-hidden">
        <Wrap className="grid gap-12 pb-16 pt-14 md:pb-24 md:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="max-w-[44rem]">
            <Eyebrow>Public education</Eyebrow>
            <Title as="h1" size="xl" className="mt-5">
              Simply Sage and <em>Dr Gutsy</em>
            </Title>
            <Lead className="mt-7">
              Good health education does more than provide answers. It helps people recognise better questions, understand the evidence and
              see where context changes the interpretation.
            </Lead>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <a href="#simply-sage" className="group flex min-h-[170px] flex-col justify-between border border-line bg-white p-6 transition-colors hover:border-sage">
              <Mark name="simplySageBy" label="Simply Sage by Dr Shruti Pai" className="h-[58px] w-auto self-start" />
              <span className="text-[14.5px] font-semibold text-sage-ink">a. Simply Sage by Dr Shruti</span>
            </a>
            <a href="#dr-gutsy" className="leafcut-sm group flex min-h-[170px] flex-col justify-between border border-line bg-white p-6 transition-colors hover:border-sage">
              <Mark name="drGutsy" label="Dr Gutsy" className="h-[46px] w-auto self-start" />
              <span className="text-[14.5px] font-semibold text-sage-ink">b. Dr Gutsy</span>
            </a>
          </div>
        </Wrap>
      </section>

      {/* a. Simply Sage */}
      <Section id="simply-sage" className="scroll-mt-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Part a</Eyebrow>
            <div className="mt-6 inline-block bg-sage p-8">
              <Mark name="simplySageBy" tone="white" label="Simply Sage by Dr Shruti Pai" className="h-[84px] w-auto" />
            </div>
            <Note className="mt-8" why="the content master has no page for Simply Sage, and Dr Shruti asked for our input on how it should appear.">
              Two or three sentences on what Simply Sage is, who it is for and how it relates to Sagework and Dr Gutsy, plus the address of
              its website or channel.
            </Note>
          </Reveal>
          <Reveal delay={0.1}>
            <Title size="md">Videos and links</Title>
            <p className="mt-4">A list of Simply Sage videos, each leading to the Simply Sage website.</p>
            <div className="mt-6">
              <VideoSlots what="Simply Sage" />
            </div>
            <Note className="mt-6" why="Dr Shruti described this part as a list of videos and links leading to the website.">
              The video titles and links for this list, and whether each opens on this page or on the Simply Sage site.
            </Note>
          </Reveal>
        </div>
      </Section>

      {/* b. Dr Gutsy */}
      <section id="dr-gutsy" className="wash-sage scroll-mt-24 py-20 md:py-28">
        <Wrap>
          <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <Reveal>
              <Eyebrow>Part b</Eyebrow>
              <Mark name="drGutsy" label="Dr Gutsy" className="mt-6 h-[64px] w-auto md:h-[80px]" />
              <Title className="mt-8">
                Stay curious. Ask <em>better questions.</em>
              </Title>
              <Lead className="mt-7 max-w-[38rem]">{g.lead}</Lead>
              <p className="mt-5 max-w-[38rem]">
                {g.body[0]} {g.body[1]}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="leafcut flex items-end justify-center bg-mint px-6 pt-10">
                <Image
                  src="/brand/gutsy/five-sides.webp"
                  alt="The five sides of the Dr Gutsy character: Listener, Scientist, Investigator, Sage and Problem Solver"
                  width={1400}
                  height={986}
                  preload
                  sizes="(min-width: 1024px) 40vw, 92vw"
                  className="h-auto w-full"
                />
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-20 grid gap-10 border-t border-line pt-14 lg:grid-cols-2 lg:gap-20">
            <Title size="md">{g.promise.title}</Title>
            <p>{g.promise.body}</p>
          </Reveal>
        </Wrap>
      </section>

      {/* The character */}
      <Section>
        <Reveal className="max-w-[46rem]">
          <Eyebrow>{g.character.title}</Eyebrow>
          <Title className="mt-5">
            One curious mind, five ways to make <em>health better</em>
          </Title>
          <p className="mt-6">
            {g.character.body[0]} {g.character.body[1]}
          </p>
        </Reveal>
        <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-5">
          {g.character.sides.map((s, n) => (
            <Reveal key={s.name} delay={n * 0.06} className="h-full">
              <li data-gutsy-side className="flex h-full list-none flex-col bg-paper">
                <div className="flex h-[260px] items-end justify-center px-4 pt-6 md:h-[300px]">
                  <Image
                    src={`/brand/gutsy/${s.image}.webp`}
                    alt={`Dr Gutsy as ${s.name}`}
                    width={sideSize[s.image][0]}
                    height={sideSize[s.image][1]}
                    sizes="(min-width: 768px) 18vw, 44vw"
                    className="h-full w-auto object-contain object-bottom"
                  />
                </div>
                <div className="border-t border-line bg-white p-4">
                  <p className="display text-[1.3rem] leading-tight">{s.name}</p>
                  <p className="mt-1.5 text-[14px] leading-snug text-ink-soft">{s.drive}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Questions */}
      <Section id="questions" className="wash-sage">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Dr Gutsy</Eyebrow>
            <Title className="mt-5">
              Explore the <em>questions</em>
            </Title>
            <div className="mt-10">
              <p className="text-[15px] font-semibold">{g.method.title}</p>
              <ol className="mt-4 space-y-4">
                {g.method.steps.map((s, n) => (
                  <li key={s.name} className="grid grid-cols-[2.25rem_1fr] gap-2">
                    <span className="display text-[1.5rem] leading-none text-sage-text">{n + 1}</span>
                    <span className="text-[15.5px] leading-relaxed">
                      <strong className="font-semibold">{s.name}.</strong> {s.body}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion
              first
              items={g.questions.map((q, n) => ({
                id: `question-${n + 1}`,
                tag: String(n + 1).padStart(2, "0"),
                title: q.question,
                sub: q.topic,
                content: <p>{q.body}</p>,
              }))}
            />
          </Reveal>
        </div>
      </Section>

      {/* Videos, boundaries, seal */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <Title size="md">Dr Gutsy videos and links</Title>
            <p className="mt-4">A list of Dr Gutsy videos, each leading to the Dr Gutsy website.</p>
            <div className="mt-6">
              <VideoSlots what="Dr Gutsy" />
            </div>
            <Note className="mt-6" why="Dr Shruti described this part as a list of videos and links leading to the website. The playbook also names DrGutsyCast and DrGutsyWay.">
              The video titles and links, the address of the Dr Gutsy website, and whether DrGutsyCast and DrGutsyWay should be listed here.
            </Note>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-start gap-6">
              <Image
                src="/brand/gutsy/seal.webp"
                alt="The Dr Gutsy Verified seal: science first, truth over trends, evidence based"
                width={1396}
                height={1400}
                sizes="140px"
                className="h-auto w-[120px] shrink-0 md:w-[140px]"
              />
              <div>
                <Title size="sm" as="h3">
                  {g.boundaries.title}
                </Title>
                <p className="mt-3 text-[15.5px]">{g.boundaries.body[0]}</p>
              </div>
            </div>
            <LeafList
              className="mt-8 border-t border-line pt-8"
              items={[
                "The platform provides health education. It does not diagnose conditions, prescribe treatment or replace individual medical care.",
                "We do not use fear, shame or promises of a cure to make an explanation more compelling.",
                "Where a question requires personal assessment, we encourage qualified professional care.",
              ]}
            />
          </Reveal>
        </div>
      </Section>

      {/* Part of Sagework */}
      <section className="pb-6 md:pb-10">
        <Wrap>
          <div className="leafcut grid gap-10 bg-sage p-8 text-ink-deep md:p-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em]">Part of Sagework</p>
              <p className="display mt-5 text-[clamp(2rem,3.6vw,3rem)] text-white">{g.part.title}</p>
              <p className="mt-5 max-w-[38rem]">{g.part.body}</p>
            </div>
            <div className="lg:text-right">
              <p className="display text-[1.5rem] text-white">{g.sign}</p>
              <div className="mt-6 flex flex-wrap gap-3 lg:justify-end">
                <Button href={routes.discover} tone="white">
                  Discover Sagework
                </Button>
                <Button href={routes.founder} tone="white">
                  Meet the Founder
                </Button>
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      <Closing />
    </>
  );
}
