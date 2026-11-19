import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Pic } from "@/components/shared/Pic";
import { Reveal } from "@/components/shared/Motion";
import { Button, Lead, Note } from "@/components/site/ui";
import { ChapterTabs } from "@/components/two/ChapterTabs";
import { Block, ClosingBand, Crumb, Go, H, W } from "@/components/two/kit";
import { career, chapters, founderHero, lenses, researchLinks, type Chapter } from "@/content/founder";
import { lensColour, tagline, type LensName } from "@/content/site";
import { chapterPhoto, photo, r2, two } from "@/content/two";

export const metadata: Metadata = {
  title: "Founder: Dr Shruti Pai",
  description: founderHero.intro[0],
};

/** One chapter, as it appears when its tab is chosen. */
function ChapterPanel({ ch }: { ch: Chapter }) {
  const img = chapterPhoto[ch.id];
  return (
    <div className="grid gap-x-12 gap-y-10 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
      <div>
        <p className="eyebrow">{ch.role}</p>
        <H className="mt-4">{ch.maxim}</H>
        <p className="mt-4 text-[1.15rem] font-semibold text-ink-deep">{ch.title}</p>
        {ch.body.map((p) => (
          <p key={p} className="mt-4">
            {p}
          </p>
        ))}
        {ch.pull ? (
          <blockquote className="mt-8 border-l-2 border-sage pl-5">
            {ch.pullLead ? <p className="text-[15px] text-ink-soft">{ch.pullLead}</p> : null}
            <p className="display mt-2 text-[1.5rem] leading-snug text-ink-deep md:text-[1.7rem]">{ch.pull}</p>
          </blockquote>
        ) : null}
        {ch.facts?.length ? (
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-5 border-t border-line pt-6">
            {ch.facts.map((f) => (
              <div key={f.value}>
                <dt className={`display leading-none text-sage-text ${f.label ? "text-[2.1rem]" : "text-[1.35rem]"}`}>{f.value}</dt>
                {f.label ? <dd className="mt-1.5 max-w-[14rem] text-[14px] text-ink-soft">{f.label}</dd> : null}
              </div>
            ))}
          </dl>
        ) : null}
        {ch.id === "scientist" ? (
          <ul data-research-links className="mt-8 grid gap-3 sm:grid-cols-2">
            {researchLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  data-research-link={l.id}
                  className="group flex h-full items-start gap-3 border border-line p-4 transition-colors duration-300 hover:border-sage hover:bg-paper"
                >
                  <ArrowUpRight size={18} weight="bold" className="mt-0.5 shrink-0 text-sage-ink" />
                  <span className="text-[15px] font-semibold text-ink-deep">
                    {l.label}
                    <span className="mt-0.5 block text-[13.5px] font-normal text-ink-soft">{l.by}. Opens in a new tab.</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
        {ch.link ? (
          <Go href={two(ch.link.href)} className="mt-8">
            {ch.link.label}
          </Go>
        ) : null}
      </div>
      <div>
        {img ? (
          <Pic k={img} ratio="4 / 5" sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 60vw, 100vw" className="max-xl:aspect-[3/2]!" />
        ) : (
          <div className="flex justify-center bg-mint px-8 pt-10">
            <Image
              src="/brand/gutsy/dr-gutsy.webp"
              alt="Dr Gutsy, the character created by Dr Shruti Pai"
              width={543}
              height={1400}
              sizes="260px"
              className="h-[420px] w-auto"
            />
          </div>
        )}
        {ch.id === "scientist" ? (
          <Note className="mt-4" why="the image brief (11 November) asks for laboratories, blood testing and research settings for Biology, and none are in the folders.">
            A photograph of Dr Shruti in a laboratory or research setting, to replace this one.
          </Note>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Founder page (content master, Page 2), in the Design 2 layout. The seven chapters
 * are tabs: the roles are listed once and one chapter is open at a time, so the page
 * stays short. Experience and education are drawn as two timelines.
 */
export default function FounderTwo() {
  return (
    <>
      <section data-page-top>
        <W className="pt-8 md:pt-12">
          <Crumb n="03" label="Founder" />
          <div className="grid gap-x-14 gap-y-10 pb-14 pt-10 md:pb-20 md:pt-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow">{founderHero.title}</p>
              <H as="h1" size="xl" className="mt-5">
                {founderHero.name}
              </H>
              <ol className="mt-9 grid border-b border-line sm:grid-cols-2">
                {founderHero.roles.map((r, n) => (
                  <li key={r} className="flex items-baseline gap-4 border-t border-line py-3.5 text-[16px] font-medium">
                    <span className="display text-[1.05rem] text-sage-text">{String(n + 1).padStart(2, "0")}</span>
                    {r}
                  </li>
                ))}
              </ol>
              <p className="mt-9 text-[1.08rem]">{founderHero.lead}</p>
              <p className="display mt-3 max-w-[36rem] text-[clamp(1.7rem,3vw,2.5rem)] text-sage-text">{founderHero.question}</p>
            </div>
            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
              <Pic k={photo.founder} ratio="4 / 5" preload sizes="(min-width: 1024px) 30vw, 100vw" pos="50% 25%" />
            </Reveal>
          </div>
        </W>
      </section>

      <Block label="In brief" tint>
        <div className="grid gap-x-12 gap-y-6 lg:grid-cols-3">
          <Reveal>
            <Lead>{founderHero.intro[0]}</Lead>
          </Reveal>
          <Reveal delay={0.08}>
            <p>{founderHero.intro[1]}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <p>{founderHero.intro[2]}</p>
          </Reveal>
        </div>
      </Block>

      <Block id="chapters" n="01" label="Seven chapters">
        <ChapterTabs chapters={chapters.map((ch) => ({ id: ch.id, role: ch.role, panel: <ChapterPanel ch={ch} /> }))} />
      </Block>

      {/* Experience and education, from her CV */}
      <Block id="cv" n="02" label="Curriculum vitae" tint>
        <Reveal className="mb-12">
          <H>
            Experience and <em>education</em>
          </H>
        </Reveal>
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-2">
          {[
            { title: "Experience", rows: career.experience },
            { title: "Education", rows: career.education },
          ].map((col) => (
            <Reveal key={col.title}>
              <h3 className="eyebrow">{col.title}</h3>
              <ol data-cv className="mt-6 border-l border-sage">
                {col.rows.map((r) => (
                  <li key={r.role + r.place} className="relative pb-7 pl-7 last:pb-0">
                    <span className="absolute -left-[6px] top-[7px] h-[11px] w-[11px] rounded-full bg-sage ring-4 ring-paper" />
                    <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-sage-ink">{r.when}</p>
                    <p className="display mt-1 text-[1.4rem] leading-tight">{r.role}</p>
                    <p className="mt-1 text-[15px] text-ink-soft">{r.place}</p>
                    {r.link ? (
                      <a
                        href={r.link.href}
                        target="_blank"
                        rel="noreferrer"
                        data-cv-link
                        className="mt-1.5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-sage-ink underline-offset-4 hover:underline"
                      >
                        {r.link.label}
                        <ArrowUpRight size={13} weight="bold" />
                      </a>
                    ) : null}
                  </li>
                ))}
              </ol>
            </Reveal>
          ))}
        </div>
        <Note
          label="To confirm"
          className="mt-12 max-w-[52rem] bg-white"
          why="the CV and the approved website copy differ on these points, and the website should say one thing."
        >
          {career.confirm}
        </Note>
      </Block>

      {/* The three lenses */}
      <Block n="03" label="Three connected lenses">
        <Reveal className="max-w-[52rem]">
          <H>{lenses.final}</H>
          <p className="mt-6">{lenses.lead}</p>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {lenses.items.map((l, n) => (
            <Reveal key={l.name} delay={n * 0.08}>
              <div className="h-full border border-line">
                <span className={`block h-1.5 ${lensColour[l.name as LensName].bg}`} />
                <div className="p-6 md:p-7">
                  <h3 className="display text-[2rem]">{l.name}</h3>
                  <p className="mt-1 text-[15.5px] font-semibold text-ink-deep">{l.line}</p>
                  <p className="mt-4 text-[15.5px]">{l.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 grid gap-x-14 gap-y-8 lg:grid-cols-2 lg:items-end">
          <div>
            {lenses.close.map((line) => (
              <p key={line} className="display text-[1.45rem] leading-snug md:text-[1.7rem]">
                {line}
              </p>
            ))}
          </div>
          <div className="lg:text-right">
            <p className="text-[15px] font-semibold text-sage-ink">{tagline}</p>
            <Button href={r2.work} className="mt-5">
              {lenses.cta}
            </Button>
          </div>
        </Reveal>
      </Block>

      <ClosingBand />
    </>
  );
}
