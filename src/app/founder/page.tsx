import type { Metadata } from "next";
import Image from "next/image";
import { Pic } from "@/components/shared/Pic";
import { Reveal } from "@/components/shared/Motion";
import { Closing } from "@/components/site/sections";
import { Button, Eyebrow, Lead, Note, Section, TextLink, Title, Wrap } from "@/components/site/ui";
import type { ImageKey } from "@/content/captions";
import { career, chapters, founderHero, lenses } from "@/content/founder";
import { lensColour, routes, tagline, type LensName } from "@/content/site";

export const metadata: Metadata = {
  title: "Founder: Dr Shruti Pai",
  description: founderHero.intro[0],
};

/** One people-led photograph per chapter, chosen from the client's folders. */
const chapterImage: Record<string, ImageKey | null> = {
  "business-leader": "hospitality/chef-van-serving",
  scientist: "founder/seminar-listening",
  designer: "founder/material-review",
  writer: "founder/classroom-session",
  "dr-gutsy": null,
  global: "hospitals/mmmc-mural",
  lived: "people/park-walk",
};

/**
 * Founder page (content master, Page 2). Each chapter shows its principle and opening
 * paragraph; the rest of the chapter opens on request, so the page reads quickly.
 */
export default function Founder() {
  return (
    <>
      <section className="wash relative overflow-hidden">
        <Wrap className="grid gap-12 pb-16 pt-14 md:pb-24 md:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>{founderHero.title}</Eyebrow>
            <Title as="h1" size="xl" className="mt-5">
              {founderHero.name}
            </Title>
            <ul className="mt-7 flex flex-wrap gap-2">
              {founderHero.roles.map((r) => (
                <li key={r} className="rounded-full border border-line bg-white px-4 py-2 text-[14.5px] font-medium">
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-10 text-[15.5px] text-ink-soft">{founderHero.lead}</p>
            <p className="display mt-3 max-w-[30rem] text-[clamp(1.8rem,3vw,2.5rem)] text-sage-text">{founderHero.question}</p>
          </div>
          <Reveal delay={0.1}>
            <Pic k="founder/portrait-garden" ratio="4 / 5" className="leafcut" preload sizes="(min-width: 1024px) 40vw, 100vw" pos="50% 20%" />
          </Reveal>
        </Wrap>
      </section>

      <Section tight>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Lead>{founderHero.intro[0]}</Lead>
          </Reveal>
          <Reveal delay={0.1}>
            <p>{founderHero.intro[1]}</p>
            <p className="mt-4">{founderHero.intro[2]}</p>
          </Reveal>
        </div>
        <nav aria-label="Chapters" className="mt-12 flex flex-wrap gap-2 border-t border-line pt-8">
          {chapters.map((ch, n) => (
            <a
              key={ch.id}
              href={`#${ch.id}`}
              className="rounded-full border border-line px-4 py-2 text-[14.5px] font-medium transition-colors hover:border-sage-ink hover:text-sage-ink"
            >
              <span className="mr-2 text-sage-ink">{String(n + 1).padStart(2, "0")}</span>
              {ch.role}
            </a>
          ))}
        </nav>
      </Section>

      {chapters.map((ch, n) => {
        const img = chapterImage[ch.id];
        const flip = n % 2 === 1;
        return (
          <section key={ch.id} id={ch.id} data-chapter className={`scroll-mt-24 py-16 md:py-24 ${flip ? "wash-sage" : ""}`}>
            <Wrap className="grid items-start gap-10 lg:grid-cols-2 lg:gap-20">
              <Reveal className={flip ? "lg:order-2" : ""}>
                <p className="eyebrow">
                  {String(n + 1).padStart(2, "0")} &nbsp; {ch.role}
                </p>
                <Title className="mt-5">{ch.maxim}</Title>
                <p className="mt-3 text-[1.1rem] font-medium text-ink">{ch.title}</p>
                <p className="mt-7">{ch.body[0]}</p>
                {ch.body.length > 1 ? (
                  <details className="group mt-4">
                    <summary className="inline-flex cursor-pointer list-none items-center gap-2 text-[15px] font-semibold text-sage-ink underline-offset-4 hover:underline [&::-webkit-details-marker]:hidden">
                      <span className="group-open:hidden">Read the full chapter</span>
                      <span className="hidden group-open:inline">Close the chapter</span>
                    </summary>
                    <div className="mt-4 space-y-4">
                      {ch.body.slice(1).map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                  </details>
                ) : null}
                {ch.pull ? (
                  <blockquote className="mt-8 border-l-2 border-sage pl-5">
                    {ch.pullLead ? <p className="text-[15px] text-ink-soft">{ch.pullLead}</p> : null}
                    <p className="display mt-2 text-[1.5rem] md:text-[1.75rem]">{ch.pull}</p>
                  </blockquote>
                ) : null}
                {ch.facts?.length ? (
                  <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
                    {ch.facts.map((f) => (
                      <div key={f.value}>
                        <dt className="display text-[1.9rem] leading-none text-sage-text">{f.value}</dt>
                        {f.label ? <dd className="mt-1.5 text-[14px] text-ink-soft">{f.label}</dd> : null}
                      </div>
                    ))}
                  </dl>
                ) : null}
                {ch.link ? (
                  <TextLink href={ch.link.href} className="mt-8">
                    {ch.link.label}
                  </TextLink>
                ) : null}
              </Reveal>

              <Reveal delay={0.1} className={flip ? "lg:order-1" : ""}>
                {img ? (
                  <>
                    <Pic k={img} ratio="4 / 3" className={flip ? "leafcut-sm" : "leafcut"} sizes="(min-width: 1024px) 44vw, 100vw" />
                    {ch.id === "scientist" ? (
                      <Note className="mt-4" why="the image brief (11 November) asks for laboratories, blood testing and research settings for Biology, and none are in the folders.">
                        A photograph of Dr Shruti in a laboratory or research setting, to replace this one.
                      </Note>
                    ) : null}
                  </>
                ) : ch.id === "dr-gutsy" ? (
                  <div className="leafcut flex items-end justify-center bg-mint px-8 pt-10">
                    <Image
                      src="/brand/gutsy/five-sides.webp"
                      alt="The five sides of the Dr Gutsy character, standing together"
                      width={1400}
                      height={986}
                      sizes="(min-width: 1024px) 40vw, 90vw"
                      className="h-auto w-full"
                    />
                  </div>
                ) : null}
              </Reveal>
            </Wrap>
          </section>
        );
      })}

      {/* Experience and education, from her CV */}
      <Section id="cv" className="wash-sage">
        <Reveal className="max-w-[46rem]">
          <Eyebrow>Curriculum vitae</Eyebrow>
          <Title className="mt-5">
            Experience and <em>education</em>
          </Title>
        </Reveal>
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-20">
          {[
            { title: "Experience", rows: career.experience },
            { title: "Education", rows: career.education },
          ].map((col) => (
            <Reveal key={col.title}>
              <h3 className="display text-[1.8rem]">{col.title}</h3>
              <ol data-cv className="mt-5 border-t border-line">
                {col.rows.map((r) => (
                  <li key={r.role + r.place} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-4">
                    <span className="text-[14px] font-semibold text-sage-ink">{r.when}</span>
                    <span>
                      <span className="block text-[16px] font-semibold">{r.role}</span>
                      <span className="block text-[15px] text-ink-soft">{r.place}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          ))}
        </div>
        <Note
          label="To confirm"
          className="mt-10 max-w-[52rem]"
          why="the CV and the approved website copy differ on these points, and the website should say one thing."
        >
          {career.confirm}
        </Note>
      </Section>

      {/* The three lenses */}
      <Section>
        <Reveal className="max-w-[46rem]">
          <Eyebrow>Three connected lenses</Eyebrow>
          <Title className="mt-5">{lenses.final}</Title>
          <p className="mt-6">{lenses.lead}</p>
        </Reveal>
        <div className="mt-12 grid gap-2 md:grid-cols-3">
          {lenses.items.map((l, n) => (
            <Reveal key={l.name} delay={n * 0.08} className="h-full">
              <div className={`h-full p-7 text-ink-deep md:p-8 ${lensColour[l.name as LensName].bg} ${n === 2 ? "leafcut-sm" : ""}`}>
                <h3 className="display text-[2.2rem] text-white">{l.name}</h3>
                <p className="mt-1.5 text-[15.5px] font-semibold">{l.line}</p>
                <p className="mt-5 border-t border-ink-deep/25 pt-5 text-[15.5px] leading-relaxed">{l.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            {lenses.close.map((line) => (
              <p key={line} className="display text-[1.5rem] md:text-[1.8rem]">
                {line}
              </p>
            ))}
          </div>
          <div className="md:text-right">
            <p className="eyebrow">{tagline}</p>
            <Button href={routes.work} className="mt-6">
              {lenses.cta}
            </Button>
          </div>
        </Reveal>
      </Section>

      <Closing />
    </>
  );
}
