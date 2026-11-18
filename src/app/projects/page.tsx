import type { Metadata } from "next";
import { Leaf } from "@/components/brand/Leaf";
import { imageData, Pic } from "@/components/shared/Pic";
import { Parallax, Reveal } from "@/components/shared/Motion";
import { ProjectBrowser } from "@/components/site/ProjectBrowser";
import { ReelCard } from "@/components/site/ReelCard";
import { Closing } from "@/components/site/sections";
import { Button, Eyebrow, Lead, Section, TextLink, Title, Wrap } from "@/components/site/ui";
import { journeys } from "@/content/gallery";
import { collaborators, films, index, kinds, projects, projectsPage as c } from "@/content/projects";
import { routes } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: c.lead,
};

/**
 * Projects: every project as an editorial spread, in five kinds of place, followed by
 * one project journey and the client's full project list. Colour-coded by kind of
 * place, as Dr Shruti suggested for the secondary palette.
 */
export default function ProjectsPage() {
  const listed = index.reduce((n, g) => n + g.items.length, 0);
  const journey = journeys[0];

  return (
    <>
      {/* Opening: headline, three figures and a stack of three projects */}
      <section className="wash relative overflow-hidden">
        <Wrap className="grid gap-12 pb-16 pt-14 md:pb-24 md:pt-20 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <Title as="h1" size="xl" className="mt-5">
              Environments designed for <em>the people inside them</em>
            </Title>
            <Lead className="mt-7 max-w-[36rem]">{c.lead}</Lead>
            <dl data-project-stats className="mt-10 grid max-w-[34rem] grid-cols-3 gap-6 border-t border-line pt-7">
              {[
                [String(listed), "projects on the full list"],
                [String(kinds.length), "kinds of place"],
                [String(collaborators.length), "architects and studios worked with"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="display text-[clamp(2.4rem,4vw,3.4rem)] leading-none text-sage-text">{v}</dt>
                  <dd className="mt-2 text-[14px] leading-snug text-ink-soft">{l}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="#all-projects">Browse the projects</Button>
              <Button href={routes.gallery} tone="outline">
                Photo gallery
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
            <div className="relative ml-auto w-[78%]">
              <Pic k="hospitals/mangalore-shell-lobby" ratio="4 / 5" className="leafcut" preload sizes="(min-width: 1024px) 36vw, 78vw" pos="60% 50%" />
            </div>
            <div className="absolute bottom-[8%] left-0 w-[46%] border-[6px] border-white shadow-[0_18px_50px_-24px_rgb(31_40_35/0.45)]">
              <Pic k="academic/msap-exterior" ratio="4 / 3" sizes="(min-width: 1024px) 22vw, 46vw" />
            </div>
            <div className="absolute -top-[4%] left-[6%] hidden w-[30%] border-[6px] border-white shadow-[0_18px_50px_-24px_rgb(31_40_35/0.45)] sm:block">
              <Pic k="hospitality/valley-rangoli-restaurant" ratio="1 / 1" sizes="(min-width: 1024px) 14vw, 30vw" />
            </div>
          </div>
        </Wrap>
      </section>

      {/* Her line on what an environment is */}
      <section className="pb-2">
        <Wrap>
          <div className="leafcut relative overflow-hidden bg-sage px-6 py-14 text-ink-deep md:px-14 md:py-20">
            <Leaf className="pointer-events-none absolute -bottom-16 -right-6 h-[135%] w-auto text-sage-deep opacity-80 md:right-[6%]" />
            <Reveal className="relative max-w-[52rem]">
              <p className="display text-[clamp(1.9rem,3.6vw,3.1rem)] text-white">{c.quote}</p>
            </Reveal>
          </div>
        </Wrap>
      </section>

      {/* Every project, by kind of place */}
      <section id="all-projects" className="scroll-mt-24 pt-10 md:pt-14">
        <Wrap>
          <ProjectBrowser
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
              photos: p.images.map((k) => {
                const d = imageData(k);
                return { src: d.src, w: d.w, h: d.h, alt: d.alt, blur: d.blur };
              }),
            }))}
          />
        </Wrap>
      </section>

      {/* On film: the artists' and the campus's own reels, loaded only on request */}
      <Section id="films">
        <div>
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>On film</Eyebrow>
              <Title className="mt-5">
                The work, <em>in motion</em>
              </Title>
            </div>
            <p className="max-w-[26rem] md:text-right">
              Short films made by the artists and the campus. Each one plays from Instagram, and only when you press play.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {films.map((f, n) => {
              const d = imageData(f.poster);
              return (
                <Reveal key={f.id} delay={n * 0.08} className="h-full">
                  <ReelCard
                    reel={{
                      id: f.id,
                      title: f.title,
                      place: f.place,
                      by: f.by,
                      embed: f.embed,
                      href: `https://www.instagram.com/reel/${f.id}/`,
                      poster: { src: d.src, alt: d.alt, blur: d.blur },
                    }}
                  />
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* One project journey, with the rest in the gallery */}
      <Section className="wash-sage">
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <Eyebrow>The project journey</Eyebrow>
            <Title className="mt-5">
              From work in progress to the <em>completed project</em>
            </Title>
            <p className="mt-6 max-w-[30rem]">
              {journey.title}, {journey.place}: the same room under scaffolding and on the day it was ready.
            </p>
            <TextLink href={`${routes.gallery}#journey`} className="mt-8">
              See every project journey
            </TextLink>
          </Reveal>
          <Reveal delay={0.1}>
            <ol data-projects-journey className="grid gap-3 sm:grid-cols-2">
              {journey.stages.map((s, n) => (
                <li key={s.image} className="list-none">
                  <Parallax className={`aspect-[4/5] ${n === journey.stages.length - 1 ? "leafcut-sm" : ""}`} amount={4}>
                    <Pic k={s.image} cover pos={s.pos} sizes="(min-width: 1024px) 28vw, 50vw" />
                  </Parallax>
                  <p className="mt-3 flex items-center gap-2.5 text-[15px] font-semibold">
                    <span className={`inline-flex h-7 items-center rounded-full px-3 text-[12.5px] text-ink-deep ${n === 0 ? "bg-aqua-soft" : "bg-sage"}`}>
                      {n + 1}
                    </span>
                    {s.label}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* The full list */}
      <Section id="list">
        <Reveal className="max-w-[46rem]">
          <Eyebrow>{c.listTitle}</Eyebrow>
          <Title className="mt-5">
            {listed} projects, and <em>who they were made with</em>
          </Title>
          <p className="mt-6">{c.listLead}</p>
        </Reveal>
        <div className="mt-12 grid gap-12 lg:grid-cols-3 lg:gap-14">
          {index.map((g, gi) => (
            <Reveal key={g.group} delay={gi * 0.06}>
              <h3 className="display border-b border-ink/20 pb-4 text-[1.7rem]">
                {g.group} <span className="ml-1 align-top text-[0.95rem] not-italic text-sage-ink">{g.items.length}</span>
              </h3>
              <ul data-project-list>
                {g.items.map((it) => (
                  <li key={it.name} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                    <span className="text-[16px] font-medium">{it.name}</span>
                    {it.with ? <span className="shrink-0 text-right text-[13.5px] text-ink-soft">{it.with}</span> : null}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <p className="eyebrow">Architects, artists and studios</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {collaborators.map((n) => (
              <li key={n} className="rounded-full border border-line px-4 py-2 text-[14.5px] font-medium">
                {n}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Closing second={{ label: "Work with Sagework", href: routes.work }} />
    </>
  );
}
