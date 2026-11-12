import type { Metadata } from "next";
import Image from "next/image";
import { Pic, imageData } from "@/components/shared/Pic";
import { Reveal } from "@/components/shared/Motion";
import { GalleryTwo, type GalleryItem } from "@/components/two/Interactive";
import { ButtonTwo, Note, Wrap } from "@/components/two/ui";
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

/** Card widths for the twelve project notes, so the grid has rhythm. */
const noteSpans = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-6",
  "lg:col-span-6",
  "lg:col-span-8",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-8",
  "lg:col-span-6",
  "lg:col-span-6",
];

export default function ProjectsTwo() {
  const heroImg = imageData("hospitals/paediatric-ceiling");

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[92dvh] items-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={heroImg.src}
            alt={heroImg.alt}
            fill
            preload
            sizes="100vw"
            placeholder="blur"
            blurDataURL={heroImg.blur}
            className="animate-breathe object-cover object-[50%_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/20" />
        </div>
        <Wrap className="pb-14 pt-28 md:pb-20">
          <p className="label text-fg/75">Projects</p>
          <h1 className="display mt-6 max-w-[20ch] text-[clamp(2.8rem,6vw,6.25rem)] leading-[0.98]">
            Environments designed for <span className="text-accent">the people inside them</span>
          </h1>
          <p className="mt-8 max-w-[52ch] text-[17px] leading-relaxed text-fg/85">{projectsHero.sub}</p>
        </Wrap>
      </section>

      {/* The wall */}
      <section>
        <Wrap className="py-16 md:py-24">
          <GalleryTwo items={galleryItems} filters={categories.map((c) => ({ id: c.id, label: c.label }))} />
        </Wrap>
      </section>

      {/* Statement */}
      <section className="border-y border-line bg-surface">
        <Wrap className="py-24 md:py-36">
          <Reveal>
            <p className="display mx-auto max-w-5xl text-center text-[clamp(2rem,4.6vw,4.4rem)] leading-[1.02]">
              {projectsHero.note}
            </p>
          </Reveal>
        </Wrap>
      </section>

      {/* Project notes */}
      <section>
        <Wrap className="py-24 md:py-36">
          <h2 className="display max-w-3xl text-[clamp(2.4rem,5.2vw,5rem)] leading-[1]">
            Twelve bodies of work, <span className="text-accent">briefly</span>
          </h2>
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
            {projects.map((p, i) => (
              <Reveal key={p.slug} className={noteSpans[i % noteSpans.length]} delay={(i % 2) * 0.06}>
                <article className="flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-surface">
                  <Pic
                    k={p.images[0]}
                    ratio="16 / 9"
                    sizes="(min-width: 1024px) 56vw, 100vw"
                    className="rounded-none"
                    imgClassName="transition-transform duration-[1400ms] ease-soft hover:scale-[1.04]"
                  />
                  <div className="flex flex-1 flex-col p-7 md:p-9">
                    <p className="text-[13.5px] text-muted">{p.place}</p>
                    <h3 className="display mt-2 text-[clamp(1.7rem,2.6vw,2.4rem)] leading-[1.04]">{p.title}</h3>
                    <p className="mt-2 text-[15.5px] text-accent">{p.theme}</p>
                    <p className="mt-5 max-w-[56ch] text-[15.5px] leading-relaxed text-fg/80">{p.body}</p>
                    {p.credit ? <p className="mt-auto pt-6 text-[13px] text-muted">{p.credit}</p> : null}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      {/* Site to space */}
      <section className="border-y border-line bg-surface">
        <Wrap className="py-24 md:py-36">
          <Reveal>
            <h2 className="display text-[clamp(2.4rem,5.2vw,5rem)] leading-[1]">
              From site <span className="text-accent">to space</span>
            </h2>
            <p className="mt-6 max-w-[54ch] text-[17px] leading-relaxed text-fg/80">
              The same places, seen during construction and after completion.
            </p>
          </Reveal>
          <div className="mt-14 space-y-6">
            {transformations.map((t) => (
              <Reveal key={t.title} className="grid gap-4 md:grid-cols-12">
                <figure className="md:col-span-5">
                  <Pic k={t.before} ratio="4 / 3" sizes="(min-width: 768px) 40vw, 100vw" imgClassName="saturate-[0.7]" />
                  <Note>{t.beforeLabel}</Note>
                </figure>
                <figure className="md:col-span-7">
                  <Pic k={t.after} ratio="16 / 8.57" sizes="(min-width: 768px) 56vw, 100vw" />
                  <Note>{t.afterLabel}</Note>
                </figure>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      {/* People */}
      <section>
        <Wrap className="pb-10 pt-24 md:pt-36">
          <h2 className="display max-w-4xl text-[clamp(2.4rem,5.2vw,5rem)] leading-[1]">
            Made with the people <span className="text-accent">who build and run them</span>
          </h2>
        </Wrap>
        <div className="no-scrollbar flex snap-x gap-4 overflow-x-auto px-5 pb-24 md:px-10 md:pb-36">
          {processShots.map((k) => (
            <figure key={k} className="w-[70vw] shrink-0 snap-start sm:w-[40vw] lg:w-[26vw]">
              <Pic k={k} ratio="4 / 5" sizes="(min-width: 1024px) 26vw, 70vw" pos="50% 25%" />
              <Note>{captions[k]}.</Note>
            </figure>
          ))}
        </div>
      </section>

      {/* Index and collaborators */}
      <section className="border-t border-line bg-surface">
        <Wrap className="py-24 md:py-36">
          <h2 className="display text-[clamp(2.4rem,5.2vw,5rem)] leading-[1]">Project index</h2>
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
      </section>
    </>
  );
}
