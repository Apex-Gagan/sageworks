import type { Metadata } from "next";
import { Pic, imageData } from "@/components/shared/Pic";
import { Reveal } from "@/components/shared/Motion";
import { Scroller } from "@/components/shared/Scroller";
import { Catalogue, ThenNow, type CaseItem, type ThenNowItem } from "@/components/three/Interactive";
import { Box, ButtonThree, Fig, Leaf } from "@/components/three/ui";
import { captions } from "@/content/captions";
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

const cases: CaseItem[] = projects.map((p) => ({
  slug: p.slug,
  title: p.title,
  place: p.place,
  theme: p.theme,
  body: p.body,
  credit: p.credit,
  category: p.category,
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

export default function ProjectsThree() {
  return (
    <>
      {/* Hero: headline with three photographs of different work */}
      <section>
        <Box className="pb-14 pt-10 md:pb-20 xl:pt-14">
          <p className="label text-muted">Projects</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-12 lg:items-end">
            <h1 className="display text-[clamp(2.5rem,4.9vw,5rem)] leading-[1.04] lg:col-span-8">
              Environments designed for <em className="text-accent">the people inside them</em>
            </h1>
            <p className="text-[16.5px] leading-relaxed text-fg/80 lg:col-span-4">{projectsHero.sub}</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-12">
            <div className="sm:col-span-6">
              <Leaf k="hospitals/mangalore-shell-lobby" ratio="4 / 3" sizes="(min-width: 640px) 40vw, 100vw" preload />
            </div>
            <div className="sm:col-span-3">
              <Pic k="academic/marc-exterior" ratio="3 / 4.6" sizes="(min-width: 640px) 20vw, 100vw" pos="40% 50%" className="h-full" />
            </div>
            <div className="sm:col-span-3">
              <Leaf
                k="hospitality/wgsha-hexagon"
                ratio="3 / 4.6"
                variant="leaf-flip"
                sizes="(min-width: 640px) 20vw, 100vw"
                className="h-full [&>div]:h-full"
              />
            </div>
          </div>
        </Box>
      </section>

      {/* Statement */}
      <section className="bg-surface">
        <Box className="py-16 md:py-24">
          <Reveal>
            <p className="display mx-auto max-w-[30ch] text-center text-[clamp(1.7rem,3.2vw,3rem)] leading-[1.16]">
              The environment is not simply the setting in which health happens.{" "}
              <em className="text-accent">It is one of the inputs shaping it.</em>
            </p>
          </Reveal>
        </Box>
      </section>

      {/* Catalogue */}
      <section id="catalogue" className="scroll-mt-20">
        <Box className="py-20 md:py-28">
          <Catalogue categories={categories} projects={cases} />
        </Box>
      </section>

      {/* Then and now */}
      <section className="bg-surface">
        <Box className="py-20 md:py-28">
          <Reveal className="grid gap-6 pb-12 lg:grid-cols-12 lg:items-end">
            <h2 className="display text-[clamp(2.1rem,3.9vw,3.6rem)] leading-[1.06] lg:col-span-6">
              From site <em className="text-accent">to space</em>
            </h2>
            <p className="text-[16.5px] leading-relaxed text-fg/80 lg:col-span-5 lg:col-start-8">
              The same places, during construction and after completion. Switch each one between then and now.
            </p>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {thenNow.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.07}>
                <ThenNow item={t} />
              </Reveal>
            ))}
          </div>
        </Box>
      </section>

      {/* People */}
      <section>
        <Box className="pb-10 pt-20 md:pt-28">
          <h2 className="display max-w-[20ch] text-[clamp(2.1rem,3.9vw,3.6rem)] leading-[1.06]">
            Made with the people <em className="text-accent">who build and run them</em>
          </h2>
        </Box>
        <Scroller
          label="photographs of the team at work"
          tone="three"
          className="pb-20 md:pb-28"
          trackClassName="mx-auto flex max-w-[1240px] snap-x snap-proximity scroll-px-5 gap-4 px-5 md:scroll-px-10 md:px-10 xl:scroll-px-14 xl:px-14"
          controlsClassName="mx-auto mt-8 max-w-[1240px] justify-end px-5 md:px-10 xl:px-14"
        >
          {processShots.map((k, i) => (
            <figure key={k} className="w-[68vw] shrink-0 snap-start sm:w-[38vw] lg:w-[300px]">
              <div className={`overflow-hidden ${i % 2 === 0 ? "leaf-sm" : "rounded-[8px]"}`}>
                <Pic k={k} ratio="4 / 5" sizes="(min-width: 1024px) 300px, 68vw" pos="50% 25%" className="rounded-none" />
              </div>
              <Fig>{captions[k]}.</Fig>
            </figure>
          ))}
        </Scroller>
      </section>

      {/* Index and collaborators */}
      <section className="bg-surface">
        <Box className="py-20 md:py-28">
          <h2 className="display text-[clamp(2.1rem,3.9vw,3.6rem)] leading-[1.06]">Project index</h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            {index.map((g, gi) => (
              <div key={g.group} className={gi === 0 ? "lg:col-span-6" : "lg:col-span-3"}>
                <h3 className="border-t border-fg pt-4 text-[14px] font-medium">{g.group}</h3>
                <ul className={`mt-5 gap-x-8 text-[14.5px] ${gi === 0 ? "sm:columns-2" : ""}`}>
                  {g.items.map((it) => (
                    <li key={it.name} className="mb-3 break-inside-avoid leading-snug">
                      {it.name}
                      {it.with ? <span className="block text-[12.5px] text-muted">with {it.with}</span> : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="leaf-sm mt-16 bg-bg p-7 md:p-10">
            <p className="text-[14px] text-muted">Architects, artists and studios we have worked alongside</p>
            <p className="display mt-4 text-[clamp(1.3rem,2.1vw,1.9rem)] leading-[1.4]">{collaborators.join(", ")}.</p>
          </div>

          <div className="mt-12">
            <ButtonThree href={contactHref}>Start a Conversation</ButtonThree>
          </div>
        </Box>
      </section>
    </>
  );
}
