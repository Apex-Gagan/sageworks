import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { Mark } from "@/components/brand/Mark";
import { Reveal } from "@/components/shared/Motion";
import { Button, Lead, Note } from "@/components/site/ui";
import { Block, ClosingBand, Crumb, H, Ticks, W } from "@/components/two/kit";
import { gutsyPage as g } from "@/content/pages";
import { r2 } from "@/content/two";

export const metadata: Metadata = {
  title: "Simply Sage and Dr Gutsy",
  description: g.body[1],
};

/** Empty rows for a list of videos, ready for titles and links. */
function VideoSlots({ count = 3, what }: { count?: number; what: string }) {
  return (
    <ol data-video-slots className="border-b border-line">
      {Array.from({ length: count }, (_, n) => (
        <li key={n} className="grid grid-cols-[3.5rem_1fr] items-baseline gap-3 border-t border-line py-4">
          <span className="display text-[1.15rem] text-sage-text">{String(n + 1).padStart(2, "0")}</span>
          <span className="text-[15.5px] text-ink-soft">
            {what} video {n + 1}: title and link to come
          </span>
        </li>
      ))}
    </ol>
  );
}

/**
 * Page 5 in Dr Shruti's list, in the Design 2 layout: (a) Simply Sage by Dr Shruti and
 * (b) Dr Gutsy, each with a list of videos and links leading to its website. The page
 * opens with the two as a pair of doors. Dr Gutsy's copy is from the content master
 * (Page 5) and the Dr Gutsy brand playbook; Simply Sage has no approved copy yet.
 */
export default function PublicEducationTwo() {
  const doors = [
    { letter: "a", href: "#simply-sage", label: "Simply Sage by Dr Shruti", mark: <Mark name="simplySageBy" label="Simply Sage by Dr Shruti Pai" className="h-[78px] w-auto md:h-[96px]" /> },
    { letter: "b", href: "#dr-gutsy", label: "Dr Gutsy", mark: <Mark name="drGutsy" label="Dr Gutsy" className="h-[52px] w-auto md:h-[64px]" /> },
  ];

  return (
    <>
      <section data-page-top>
        <W className="pt-8 md:pt-12">
          <Crumb n="05" label="Public education" />
          <div className="grid gap-x-14 gap-y-8 pb-12 pt-10 md:pt-14 lg:grid-cols-12 lg:items-end">
            <H as="h1" size="xl" className="lg:col-span-7">
              Simply Sage and <em>Dr Gutsy</em>
            </H>
            <Lead className="lg:col-span-5">
              Good health education does more than provide answers. It helps people recognise better questions, understand the evidence and
              see where context changes the interpretation.
            </Lead>
          </div>
          <div className="grid border border-line md:grid-cols-2">
            {doors.map((d, n) => (
              <a
                key={d.letter}
                href={d.href}
                data-door={d.letter}
                className={`group flex min-h-[250px] flex-col justify-between p-7 transition-colors duration-300 hover:bg-paper md:p-10 ${n ? "border-t border-line md:border-l md:border-t-0" : ""}`}
              >
                <span className="flex items-center justify-between">
                  <span className="display text-[2.4rem] leading-none text-sage-text">{d.letter}.</span>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sage-ink/40 text-sage-ink transition-colors duration-300 group-hover:bg-sage group-hover:text-ink-deep">
                    <ArrowDown size={17} weight="bold" />
                  </span>
                </span>
                <span>
                  {d.mark}
                  <span className="mt-5 block text-[15px] font-semibold text-ink-deep">{d.label}</span>
                </span>
              </a>
            ))}
          </div>
        </W>
      </section>

      {/* a. Simply Sage */}
      <Block id="simply-sage" n="a" label="Simply Sage by Dr Shruti">
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-2">
          <Reveal>
            <Note why="the content master has no page for Simply Sage, and Dr Shruti asked for our input on how it should appear.">
              Two or three sentences on what Simply Sage is, who it is for and how it relates to Sagework and Dr Gutsy, plus the address of
              its website or channel.
            </Note>
          </Reveal>
          <Reveal delay={0.1}>
            <H size="md">Videos and links</H>
            <p className="mt-3">A list of Simply Sage videos, each leading to the Simply Sage website.</p>
            <div className="mt-6">
              <VideoSlots what="Simply Sage" />
            </div>
            <Note className="mt-5" why="Dr Shruti described this part as a list of videos and links leading to the website.">
              The video titles and links for this list, and whether each opens on this page or on the Simply Sage site.
            </Note>
          </Reveal>
        </div>
      </Block>

      {/* b. Dr Gutsy */}
      <Block id="dr-gutsy" n="b" label="Dr Gutsy" tint>
        <div className="grid items-end gap-x-14 gap-y-10 lg:grid-cols-12">
          <Reveal className="order-2 flex justify-center bg-mint px-8 pt-8 lg:order-1 lg:col-span-4">
            <Image
              src="/brand/gutsy/dr-gutsy.webp"
              alt="Dr Gutsy, the character created by Dr Shruti Pai"
              width={543}
              height={1400}
              preload
              sizes="(min-width: 1024px) 220px, 180px"
              className="h-[400px] w-auto md:h-[470px]"
            />
          </Reveal>
          <Reveal delay={0.1} className="order-1 lg:order-2 lg:col-span-8">
            <H>
              Stay curious. Ask <em>better questions.</em>
            </H>
            <Lead className="mt-7 max-w-[44rem]">{g.lead}</Lead>
            <p className="mt-5 max-w-[44rem]">
              {g.body[0]} {g.body[1]}
            </p>
            <div className="mt-10 border-t border-line pt-8">
              <H size="md">{g.promise.title}</H>
              <p className="mt-4 max-w-[48rem]">{g.promise.body}</p>
            </div>
          </Reveal>
        </div>
      </Block>

      {/* The character */}
      <Block label={g.character.title}>
        <Reveal className="grid gap-x-14 gap-y-6 lg:grid-cols-2">
          <H>
            One curious mind, five ways to make <em>health better</em>
          </H>
          <p>
            {g.character.body[0]} {g.character.body[1]}
          </p>
        </Reveal>
        <ol className="mt-12 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-5">
          {g.character.sides.map((s, n) => (
            <li key={s.name} data-gutsy-side className="border-b border-r border-line p-6">
              <span className="display text-[2.2rem] leading-none text-sage-text">{n + 1}</span>
              <p className="display mt-6 text-[1.5rem] leading-tight">{s.name}</p>
              <p className="mt-2 text-[15px]">{s.drive}</p>
            </li>
          ))}
        </ol>
      </Block>

      {/* Questions */}
      <Block id="questions" label="Dr Gutsy" tint>
        <Reveal>
          <H>
            Explore the <em>questions</em>
          </H>
        </Reveal>
        <ul data-questions className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {g.questions.map((q, n) => (
            <li key={q.topic} className="flex flex-col border border-line bg-white p-6 md:p-7">
              <p className="flex items-baseline justify-between text-[12.5px] font-semibold uppercase tracking-[0.14em] text-sage-ink">
                {q.topic}
                <span className="text-ink-soft">{String(n + 1).padStart(2, "0")}</span>
              </p>
              <p className="display mt-5 text-[1.45rem] leading-snug">{q.question}</p>
              <details className="group mt-auto pt-5">
                <summary className="cursor-pointer list-none text-[14.5px] font-semibold text-sage-ink underline-offset-4 hover:underline [&::-webkit-details-marker]:hidden">
                  <span className="group-open:hidden">What this explores</span>
                  <span className="hidden group-open:inline">Close</span>
                </summary>
                <p className="mt-3 text-[15px]">{q.body}</p>
              </details>
            </li>
          ))}
        </ul>

        <div className="mt-16">
          <p className="eyebrow">{g.method.title}</p>
          <ol className="mt-6 grid gap-x-8 gap-y-8 border-t border-sage sm:grid-cols-2 lg:grid-cols-4">
            {g.method.steps.map((s, n) => (
              <li key={s.name} className="relative pt-8">
                <span className="absolute -top-[13px] left-0 inline-flex h-[26px] w-[26px] items-center justify-center rounded-full bg-sage text-[13px] font-semibold text-ink-deep ring-4 ring-paper">
                  {n + 1}
                </span>
                <p className="display text-[1.6rem]">{s.name}</p>
                <p className="mt-2 text-[15px]">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Block>

      {/* Videos and boundaries */}
      <Block label="Dr Gutsy videos and links">
        <div className="grid gap-x-14 gap-y-12 lg:grid-cols-2">
          <Reveal>
            <p>A list of Dr Gutsy videos, each leading to the Dr Gutsy website.</p>
            <div className="mt-6">
              <VideoSlots what="Dr Gutsy" />
            </div>
            <Note className="mt-5" why="Dr Shruti described this part as a list of videos and links leading to the website. The playbook also names DrGutsyCast and DrGutsyWay.">
              The video titles and links, the address of the Dr Gutsy website, and whether DrGutsyCast and DrGutsyWay should be listed here.
            </Note>
          </Reveal>
          <Reveal delay={0.1}>
            <H size="md" as="h3">
              {g.boundaries.title}
            </H>
            <p className="mt-4">{g.boundaries.body[0]}</p>
            <Ticks
              single
              className="mt-6 border-b border-line"
              items={[
                "The platform provides health education. It does not diagnose conditions, prescribe treatment or replace individual medical care.",
                "We do not use fear, shame or promises of a cure to make an explanation more compelling.",
                "Where a question requires personal assessment, we encourage qualified professional care.",
              ]}
            />
          </Reveal>
        </div>
      </Block>

      {/* Part of Sagework */}
      <Block label="Part of Sagework" tint>
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-2 lg:items-end">
          <div>
            <H>{g.part.title}</H>
            <p className="mt-5 max-w-[40rem]">{g.part.body}</p>
          </div>
          <div className="border-l-2 border-sage pl-6">
            <p className="display text-[1.6rem] md:text-[1.9rem]">{g.sign}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={r2.discover} tone="outline">
                Discover Sagework
              </Button>
              <Button href={r2.founder} tone="outline">
                Meet the Founder
              </Button>
            </div>
          </div>
        </div>
      </Block>

      <ClosingBand />
    </>
  );
}
