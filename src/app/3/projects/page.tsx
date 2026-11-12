import type { Metadata } from "next";
import { Pic, imageData } from "@/components/shared/Pic";
import { Reveal } from "@/components/shared/Motion";
import { Scroller } from "@/components/shared/Scroller";
import { ProjectBrowser, ThenNow, type ProjectCard, type ThenNowItem } from "@/components/three/Interactive";
import { Heading, Hl, Pill, Small, Wrap3 } from "@/components/three/ui";
import { captions, type ImageKey } from "@/content/captions";
import { contactHref } from "@/content/home";
import {
  categories,
  collaborators,
  index,
  processShots,
  projects,
  projectsHero,
  transformations,
} from "@/content/projects";

export const metadata: Metadata = {
  title: "Sample 3 | Projects",
  description:
    "Hospitals, campuses, kitchens and workplaces shaped by Dr Shruti Pai with architects, artists and operating teams.",
};

const labels = Object.fromEntries(categories.map((c) => [c.id, c.label]));

const cards: ProjectCard[] = projects.map((p) => ({
  slug: p.slug,
  title: p.title,
  place: p.place,
  theme: p.theme,
  body: p.body,
  credit: p.credit,
  category: p.category,
  categoryLabel: labels[p.category],
  images: p.images.map((k) => {
    const d = imageData(k);
    return { src: d.src, blur: d.blur, alt: d.alt };
  }),
}));

const thenNow: ThenNowItem[] = transformations.map((t) => {
  const b = imageData(t.before);
  const a = imageData(t.after);
  return {
    title: t.title,
    before: { src: b.src, blur: b.blur, alt: b.alt, label: t.beforeLabel },
    after: { src: a.src, blur: a.blur, alt: a.alt, label: t.afterLabel },
  };
});

const mosaic: ImageKey[] = [
  "hospitals/mangalore-shell-lobby",
  "academic/marc-exterior",
  "hospitals/dwarka-facade-kites",
  "hospitality/wgsha-kitchen-red",
  "hospitals/whitefield-angel-corridor",
  "academic/library-shelves",
  "hospitality/valley-rangoli-restaurant",
  "hospitals/paediatric-ceiling",
];

export default function ProjectsThree() {
  return (
    <>
      {/* Hero: centred statement over a mosaic of the work */}
      <section>
        <Wrap3 className="pb-16 pt-14 md:pb-24 md:pt-20">
          <div className="mx-auto max-w-[940px] text-center">
            <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-accent-ink">Projects</p>
            <h1 className="display mt-4 text-[clamp(2.5rem,5.6vw,4.75rem)] leading-[1.12]">
              Environments designed for <Hl>the people inside them</Hl>
            </h1>
            <p className="mt-6 text-[19px] leading-relaxed text-fg/85 md:text-[21px]">{projectsHero.sub}</p>
          </div>
          <div className="mt-12 grid grid-cols-2 overflow-hidden rounded-[14px] md:grid-cols-4">
            {mosaic.map((k, i) => (
              <Pic
                key={k}
                k={k}
                ratio="3 / 2"
                sizes="(min-width: 768px) 310px, 50vw"
                preload={i === 0}
                className="rounded-none"
              />
            ))}
          </div>
        </Wrap3>
      </section>

      {/* Statement on the grey panel */}
      <section>
        <Wrap3 className="pb-16 md:pb-24">
          <Reveal className="rounded-[12px] bg-surface-2 px-7 py-10 md:px-14 md:py-14">
            <p className="display max-w-[32ch] text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.25]">
              The environment is not simply the setting in which health happens. It is one of the inputs shaping it.
            </p>
          </Reveal>
        </Wrap3>
      </section>

      {/* Browser */}
      <section id="browse" className="scroll-mt-24 bg-surface">
        <Wrap3 className="py-20 md:py-28">
          <Reveal>
            <Heading
              title={
                <>
                  Twelve bodies of work, <Hl>four kinds of place</Hl>
                </>
              }
              sub="Choose a kind of place, then open any project to see its photographs."
              className="mb-10"
            />
          </Reveal>
          <ProjectBrowser filters={categories.map((c) => ({ id: c.id, label: c.label }))} projects={cards} />
        </Wrap3>
      </section>

      {/* Then and now */}
      <section>
        <Wrap3 className="py-20 md:py-28">
          <Reveal>
            <Heading
              title={
                <>
                  From site <Hl>to space</Hl>
                </>
              }
              sub="The same places, during construction and after completion. Switch each one between then and now."
            />
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {thenNow.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.07}>
                <ThenNow item={t} />
              </Reveal>
            ))}
          </div>
        </Wrap3>
      </section>

      {/* People */}
      <section className="bg-surface">
        <Wrap3 className="pb-10 pt-20 md:pt-28">
          <Reveal>
            <Heading title="Made with the people who build and run them" />
          </Reveal>
        </Wrap3>
        <Scroller
          label="photographs of the team at work"
          tone="two"
          className="pb-20 md:pb-28"
          trackClassName="mx-auto flex max-w-[1240px] snap-x snap-proximity scroll-px-5 gap-5 px-5 md:scroll-px-8 md:px-8"
          controlsClassName="mx-auto mt-8 max-w-[1240px] justify-end px-5 md:px-8"
        >
          {processShots.map((k) => (
            <figure key={k} className="w-[70vw] shrink-0 snap-start sm:w-[300px]">
              <Pic k={k} ratio="4 / 5" sizes="300px" pos="50% 25%" />
              <Small>{captions[k]}.</Small>
            </figure>
          ))}
        </Scroller>
      </section>

      {/* Index and collaborators */}
      <section>
        <Wrap3 className="py-20 md:py-28">
          <Reveal>
            <Heading title="Project index" />
          </Reveal>
          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            {index.map((g, gi) => (
              <div key={g.group} className={gi === 0 ? "lg:col-span-6" : "lg:col-span-3"}>
                <h3 className="rounded-[8px] bg-tint px-4 py-2.5 text-[14px] font-semibold uppercase tracking-[0.08em] text-accent-ink">
                  {g.group}
                </h3>
                <ul className={`mt-5 gap-x-8 px-1 text-[15.5px] ${gi === 0 ? "sm:columns-2" : ""}`}>
                  {g.items.map((it) => (
                    <li key={it.name} className="mb-3.5 break-inside-avoid font-semibold leading-snug">
                      {it.name}
                      {it.with ? <span className="block text-[13.5px] font-normal text-muted">with {it.with}</span> : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-line pt-10 text-center">
            <p className="text-[16px] text-muted">Architects, artists and studios we have worked alongside</p>
            <ul className="mx-auto mt-6 flex max-w-[900px] flex-wrap justify-center gap-2">
              {collaborators.map((c) => (
                <li key={c} className="rounded-full bg-surface-2 px-4 py-2 text-[15px] font-semibold">
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-12">
              <Pill href={contactHref}>Start a Conversation</Pill>
            </div>
          </div>
        </Wrap3>
      </section>
    </>
  );
}
