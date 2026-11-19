import type { Metadata } from "next";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { imageData, Pic } from "@/components/shared/Pic";
import { Reveal } from "@/components/shared/Motion";
import { Button, Lead } from "@/components/site/ui";
import { FilmRows } from "@/components/two/FilmRows";
import { Block, ClosingBand, Crumb, Go, H, Plate, W } from "@/components/two/kit";
import { ProjectIndex } from "@/components/two/ProjectIndex";
import { collaborators, films, index, kinds, projects, projectsPage as c } from "@/content/projects";
import { photo, projectPhotos, r2, stages } from "@/content/two";

export const metadata: Metadata = {
  title: "Projects",
  description: c.lead,
};

/**
 * Projects, in the Design 2 layout: an index of every project with the chosen one
 * shown beside it, the films as a ruled list, one project journey and the client's
 * full project list. Colour-coded by kind of place, as in Design 1.
 */
export default function ProjectsTwo() {
  const listed = index.reduce((n, g) => n + g.items.length, 0);
  const journey = stages[0];

  return (
    <>
      <section data-page-top>
        <W className="pt-8 md:pt-12">
          <Crumb n="02" label={c.eyebrow} />
          <div className="grid gap-x-14 gap-y-10 pb-12 pt-10 md:pt-14 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <H as="h1" size="xl">
                Environments designed for <em>the people inside them</em>
              </H>
              <Lead className="mt-7 max-w-[38rem]">{c.lead}</Lead>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#all-projects">Browse the projects</Button>
                <Button href={r2.gallery} tone="outline">
                  Photo gallery
                </Button>
              </div>
            </div>
            <Reveal delay={0.1} className="lg:col-span-5">
              <Pic k={photo.projectsLead} ratio="4 / 3" preload sizes="(min-width: 1024px) 40vw, 100vw" />
            </Reveal>
          </div>
          <dl data-project-stats className="grid border-y border-ink/25 sm:grid-cols-3">
            {[
              [String(listed), "projects on the full list"],
              [String(kinds.length), "kinds of place"],
              [String(collaborators.length), "architects and studios worked with"],
            ].map(([v, l], n) => (
              <div key={l} className={`flex items-baseline gap-4 py-6 ${n ? "border-t border-line sm:border-l sm:border-t-0 sm:pl-8" : ""}`}>
                <dt className="display text-[clamp(2.6rem,4.6vw,4rem)] leading-none text-sage-text">{v}</dt>
                <dd className="text-[15px] font-medium leading-snug">{l}</dd>
              </div>
            ))}
          </dl>
        </W>
      </section>

      {/* Her line on what an environment is */}
      <section className="py-14 md:py-20">
        <W>
          <Reveal>
            <p className="display max-w-[60rem] border-l-2 border-sage pl-6 text-[clamp(1.7rem,3.2vw,2.8rem)] md:pl-9">{c.quote}</p>
          </Reveal>
        </W>
      </section>

      {/* Every project, by kind of place */}
      <Block id="all-projects" n="01" label="Every project, by kind of place" tint>
        <ProjectIndex
          kinds={kinds}
          projects={projects.map((p) => ({
            slug: p.slug,
            title: p.title,
            place: p.place,
            kind: p.kind,
            theme: p.theme,
            body: p.body,
            credit: p.credit,
            links: p.links,
            photos: projectPhotos[p.slug].map((k) => {
              const d = imageData(k);
              return { src: d.src, w: d.w, h: d.h, alt: d.alt, blur: d.blur };
            }),
          }))}
        />
      </Block>

      {/* On film: the artists' and the campus's own reels, loaded only on request */}
      <Block id="films" n="02" label="On film">
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <H>
              The work, <em>in motion</em>
            </H>
            <p className="mt-6">Short films made by the artists and the campus. Each one plays from Instagram, and only when you press play.</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <FilmRows films={films.map((f) => ({ id: f.id, title: f.title, place: f.place, by: f.by, embed: f.embed }))} />
          </Reveal>
        </div>
      </Block>

      {/* One project journey, with the rest in the gallery */}
      <Block n="03" label="The project journey" tint link={<Go href={`${r2.gallery}#journey`}>See every project journey</Go>}>
        <Reveal className="max-w-[52rem]">
          <H>
            From work in progress to the <em>completed project</em>
          </H>
          <p className="mt-6">
            {journey.title}, {journey.place}: the building under construction and the hall on the day it was ready.
          </p>
        </Reveal>
        <ol data-projects-journey className="mt-10 grid items-start gap-6 md:grid-cols-[1fr_auto_1fr]">
          {journey.steps.map((s, n) => (
            <li key={s.image} className="contents">
              {n ? (
                <span aria-hidden="true" className="hidden h-12 w-12 items-center justify-center self-center rounded-full bg-sage text-ink-deep md:inline-flex">
                  <ArrowRight size={19} weight="bold" />
                </span>
              ) : null}
              <Plate
                k={s.image}
                ratio="4 / 3"
                pos={s.pos}
                sizes="(min-width: 768px) 44vw, 100vw"
                caption={
                  <span className="font-semibold text-ink-deep">
                    {n + 1}. {s.label}
                  </span>
                }
              />
            </li>
          ))}
        </ol>
      </Block>

      {/* The full list */}
      <Block id="list" n="04" label={c.listTitle}>
        <Reveal className="max-w-[52rem]">
          <H>
            {listed} projects, and <em>who they were made with</em>
          </H>
          <p className="mt-6">{c.listLead}</p>
        </Reveal>
        <div className="mt-12 grid gap-x-12 gap-y-12 lg:grid-cols-3">
          {index.map((g, gi) => (
            <Reveal key={g.group} delay={gi * 0.06}>
              <h3 className="flex items-baseline justify-between border-b border-ink/25 pb-3">
                <span className="display text-[1.6rem]">{g.group}</span>
                <span className="text-[12.5px] font-semibold tracking-[0.14em] text-sage-ink">{String(g.items.length).padStart(2, "0")}</span>
              </h3>
              <ul data-project-list>
                {g.items.map((it) => (
                  <li key={it.name} className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 text-[15px]">
                    <span className="font-medium">{it.name}</span>
                    {it.with ? <span className="text-right text-[13.5px] text-ink-soft">{it.with}</span> : null}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 grid gap-x-10 gap-y-4 border-t border-line pt-8 lg:grid-cols-12">
          <p className="eyebrow lg:col-span-3">Architects, artists and studios</p>
          <ul className="flex flex-wrap gap-2 lg:col-span-9">
            {collaborators.map((n) => (
              <li key={n} className="rounded-full border border-line px-4 py-2 text-[14.5px] font-medium">
                {n}
              </li>
            ))}
          </ul>
        </Reveal>
      </Block>

      <ClosingBand second={{ label: "Work with Sagework", href: r2.work }} />
    </>
  );
}
