import type { Metadata } from "next";
import { Pic, imageData } from "@/components/shared/Pic";
import { Reveal } from "@/components/shared/Motion";
import { Scroller } from "@/components/shared/Scroller";
import { ProjectsHeroTwo, type HeroCategory } from "@/components/two/Hero";
import { GalleryTwo, type GalleryItem } from "@/components/two/Interactive";
import { ProjectList, type ProjectRow } from "@/components/two/Signature";
import { ButtonTwo, Disc, Glow, Note, Sheet, Wrap } from "@/components/two/ui";
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
  title: "Sample 2 | Projects",
  description:
    "Hospitals, campuses, kitchens and workplaces shaped by Dr Shruti Pai with architects, artists and operating teams.",
};

const seen = new Set<string>();
const galleryItems: GalleryItem[] = projects.flatMap((p) =>
  p.images
    .filter((k) => (seen.has(k) ? false : (seen.add(k), true)))
    .map((k) => {
      const d = imageData(k);
      return {
        key: k,
        src: d.src,
        blur: d.blur,
        w: d.w,
        h: d.h,
        alt: d.alt,
        project: p.title,
        place: p.place,
        category: p.category,
      };
    }),
);

const rows: ProjectRow[] = projects.map((p) => {
  const lead = imageData(p.images[0]);
  return {
    slug: p.slug,
    title: p.title,
    place: p.place,
    theme: p.theme,
    body: p.body,
    credit: p.credit,
    src: lead.src,
    blur: lead.blur,
    alt: lead.alt,
    thumbs: p.images.slice(1, 4).map((k) => {
      const d = imageData(k);
      return { src: d.src, blur: d.blur, alt: d.alt };
    }),
  };
});

/** One photograph for each kind of place; the hero swaps between them. */
const heroPhotos: Record<string, ImageKey> = {
  hospitals: "hospitals/paediatric-ceiling",
  academic: "academic/marc-auditorium",
  hospitality: "hospitality/valley-rangoli-restaurant",
  workplaces: "hospitality/office-lounge",
};

const heroCats: HeroCategory[] = categories.map((c) => {
  const d = imageData(heroPhotos[c.id]);
  return { id: c.id, label: c.label, title: c.title, media: { src: d.src, blur: d.blur, alt: d.alt } };
});

export default function ProjectsTwo() {

  return (
    <>
      {/* Hero */}
      <ProjectsHeroTwo label="Projects" sub={projectsHero.sub} cats={heroCats} />

      {/* The wall */}
      <Sheet>
        <Wrap className="pb-28 pt-16 md:pb-44 md:pt-24">
          <GalleryTwo items={galleryItems} filters={categories.map((c) => ({ id: c.id, label: c.label }))} />
        </Wrap>
      </Sheet>

      {/* Statement */}
      <Sheet tone="surface">
        <Glow className="-left-40 -top-20" />
        <Wrap className="relative pb-28 pt-24 md:pb-44 md:pt-36">
          <Reveal>
            <p className="display mx-auto max-w-5xl text-center text-[clamp(2rem,4.6vw,4.4rem)] leading-[1.04]">
              The environment is not simply the setting in which health happens.{" "}
              <strong className="text-accent">It is one of the inputs shaping it.</strong>
            </p>
          </Reveal>
        </Wrap>
      </Sheet>

      {/* Project notes */}
      <Sheet>
        <Wrap className="pb-28 pt-24 md:pb-44 md:pt-36">
          <div className="grid gap-8 pb-12 lg:grid-cols-12 lg:items-end">
            <h2 className="display text-[clamp(2.2rem,4.8vw,4.6rem)] leading-[1.02] lg:col-span-7">
              Twelve bodies of work, <strong className="text-accent">in brief</strong>
            </h2>
            <p className="text-[16px] leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
              Select a project to read its note. On a larger screen, move across the list to see each one.
            </p>
          </div>
          <ProjectList items={rows} />
        </Wrap>
      </Sheet>

      {/* Site to space */}
      <Sheet tone="surface">
        <Wrap className="pb-28 pt-24 md:pb-44 md:pt-36">
          <Reveal>
            <h2 className="display text-[clamp(2.2rem,4.8vw,4.6rem)] leading-[1.02]">
              From site <strong className="text-accent">to space</strong>
            </h2>
            <p className="mt-6 max-w-[54ch] text-[17px] leading-relaxed text-fg/80">
              The same places, seen during construction and after completion.
            </p>
          </Reveal>
          <div className="mt-16 space-y-24 md:space-y-28">
            {transformations.map((t, i) => (
              <Reveal key={t.title} className="grid items-center gap-10 lg:grid-cols-12">
                <div className={`relative lg:col-span-8 ${i % 2 === 1 ? "lg:col-start-5" : ""}`}>
                  <div className="overflow-hidden rounded-[28px] md:rounded-[40px]">
                    <Pic k={t.after} ratio="16 / 9" sizes="(min-width: 1024px) 62vw, 100vw" className="rounded-none" />
                  </div>
                  <Disc
                    k={t.before}
                    sizes="(min-width: 1024px) 20vw, 40vw"
                    imgClassName="saturate-[0.65]"
                    className={`absolute -bottom-10 w-[34%] border-[6px] border-surface ${i % 2 === 1 ? "-right-3 md:-right-8" : "-left-3 md:-left-8"}`}
                  />
                </div>
                <div className={`lg:col-span-3 ${i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-10"}`}>
                  <h3 className="display text-[clamp(1.8rem,2.8vw,2.6rem)] leading-[1.04]">{t.title}</h3>
                  <dl className="mt-6 space-y-4 text-[15px]">
                    <div className="border-t border-line pt-3">
                      <dt className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-muted">Then</dt>
                      <dd className="mt-1 text-fg/85">{t.beforeLabel}</dd>
                    </div>
                    <div className="border-t border-line pt-3">
                      <dt className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-accent">Now</dt>
                      <dd className="mt-1 text-fg/85">{t.afterLabel}</dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </Sheet>

      {/* People */}
      <Sheet>
        <Wrap className="pb-12 pt-24 md:pt-36">
          <h2 className="display max-w-4xl text-[clamp(2.2rem,4.8vw,4.6rem)] leading-[1.02]">
            Made with the people <strong className="text-accent">who build and run them</strong>
          </h2>
        </Wrap>
        <Scroller
          label="photographs of the team at work"
          tone="two"
          className="pb-28 md:pb-44"
          trackClassName="flex items-start snap-x snap-proximity scroll-px-5 gap-5 px-5 md:scroll-px-10 md:px-10"
          controlsClassName="mx-auto mt-8 max-w-[1480px] justify-end px-5 md:px-10"
        >
          {processShots.map((k, i) => {
            const arch = i % 2 === 0;
            return (
              <figure
                key={k}
                className={`w-[66vw] shrink-0 snap-start sm:w-[38vw] lg:w-[24vw] ${arch ? "" : "mt-14"}`}
              >
                <div className={`overflow-hidden ${arch ? "arch" : "rounded-[24px]"}`}>
                  <Pic k={k} ratio="4 / 5" sizes="(min-width: 1024px) 24vw, 66vw" pos="50% 25%" className="rounded-none" />
                </div>
                <Note>{captions[k]}.</Note>
              </figure>
            );
          })}
        </Scroller>
      </Sheet>

      {/* Index and collaborators */}
      <Sheet tone="surface">
        <Wrap className="pb-28 pt-24 md:pb-44 md:pt-36">
          <h2 className="display text-[clamp(2.2rem,4.8vw,4.6rem)] leading-[1.02]">Project index</h2>
          <div className="mt-12 grid gap-12 lg:grid-cols-12">
            {index.map((g, gi) => (
              <div key={g.group} className={gi === 0 ? "lg:col-span-6" : "lg:col-span-3"}>
                <h3 className="border-t border-accent pt-4 text-[14px] text-accent">{g.group}</h3>
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

          <div className="mt-20 border-t border-line pt-10">
            <p className="text-[14px] text-muted">Architects, artists and studios we have worked alongside</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {collaborators.map((c) => (
                <li key={c} className="rounded-full border border-fg/20 px-4 py-2 text-[14px] text-fg/85">
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16">
            <ButtonTwo href={contactHref}>Start a Conversation</ButtonTwo>
          </div>
        </Wrap>
      </Sheet>
    </>
  );
}
