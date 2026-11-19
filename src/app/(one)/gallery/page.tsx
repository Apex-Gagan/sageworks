import type { Metadata } from "next";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { imageData, Pic } from "@/components/shared/Pic";
import { Reveal } from "@/components/shared/Motion";
import { Gallery, type GalleryItem } from "@/components/site/Gallery";
import { Closing } from "@/components/site/sections";
import { Eyebrow, Lead, Note, Section, Title, Wrap } from "@/components/site/ui";
import { groups, journeys } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Photo gallery",
  description: "Photographs of healthcare, hospitality, academic, kitchen and office projects shaped by Dr Shruti Pai and her teams.",
};

const stageTone = {
  "The site": "bg-cream",
  "Work in progress": "bg-aqua-soft",
  Completed: "bg-sage",
} as const;

/**
 * Photo gallery, following "Visual Direction for Website Projects": five project
 * categories, only the photographs Dr Shruti ticked, artwork shown in its space, and
 * the project journey from site to completed space.
 */
export default function GalleryPage() {
  const items: GalleryItem[] = [];
  for (const g of groups) {
    for (const it of g.items) {
      const d = imageData(it.image);
      items.push({ src: d.src, w: d.w, h: d.h, alt: d.alt, title: it.title, note: it.note, group: g.name });
    }
  }

  return (
    <>
      <section className="wash">
        <Wrap className="pb-10 pt-14 md:pb-14 md:pt-20">
          <div className="max-w-[46rem]">
            <Eyebrow>Photo gallery</Eyebrow>
            <Title as="h1" size="xl" className="mt-5">
              The work, <em>in pictures</em>
            </Title>
            <Lead className="mt-7">Healthcare, hospitality, academic institutions, kitchens and offices.</Lead>
          </div>
        </Wrap>
      </section>

      {/* The project journey */}
      <Section id="journey" tight>
        <Reveal className="max-w-[46rem]">
          <Eyebrow>The project journey</Eyebrow>
          <Title className="mt-5">
            The site, work in progress and the <em>completed project</em>
          </Title>
        </Reveal>
        <div className="mt-12 space-y-14">
          {journeys.map((j) => (
            <Reveal key={j.title}>
              <article data-journey>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-line pt-5">
                  <h3 className="display text-[1.7rem]">{j.title}</h3>
                  <p className="text-[15px] text-ink-soft">{j.place}</p>
                </div>
                <ol className={`mt-5 grid gap-3 ${j.stages.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                  {j.stages.map((s, n) => (
                    <li key={s.image} data-stage={s.label} className="relative list-none">
                      <Pic
                        k={s.image}
                        ratio="4 / 3"
                        pos={s.pos}
                        sizes={j.stages.length === 3 ? "(min-width: 768px) 32vw, 100vw" : "(min-width: 768px) 48vw, 100vw"}
                        className={n === j.stages.length - 1 ? "leafcut-sm" : ""}
                      />
                      <p className="mt-3 flex items-center gap-2.5 text-[15px] font-semibold">
                        <span className={`inline-flex h-7 items-center rounded-full px-3 text-[12.5px] text-ink-deep ${stageTone[s.label]}`}>
                          {n + 1}
                        </span>
                        {s.label}
                        {n < j.stages.length - 1 ? <ArrowRight size={15} className="ml-auto hidden text-sage-ink md:block" /> : null}
                      </p>
                    </li>
                  ))}
                </ol>
              </article>
            </Reveal>
          ))}
        </div>
        <Note
          className="mt-10 max-w-[52rem]"
          why="the catalogue asks for the final photographs of the MARC auditorium from Naveen, and the campus stages were matched by us from the site folders."
        >
          Completed, high-resolution photographs of the MARC auditorium (inside and out), and confirmation that the three campus
          photographs show the same project. More journeys can be added as before-and-after pairs arrive, such as the HAL project.
        </Note>
      </Section>

      {/* The five categories, and the teams */}
      <Section id="projects" className="wash-sage" tight>
        <Reveal className="mb-10 max-w-[46rem]">
          <Eyebrow>Projects</Eyebrow>
          <Title size="md" className="mt-4">
            Spaces, and the artwork made for them
          </Title>
        </Reveal>
        <Gallery items={items} groups={groups.map((g) => g.name)} start="Healthcare" />

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Note why="the Visual Direction asks for high-resolution photographs from the project drive or approved online sources; the catalogue pictures are reference only.">
            Original, high-resolution files for the photographs Dr Shruti ticked that are not in the shared folders: the Dwarka exterior
            by day and by night, the Whitefield reception counters, the paediatric ward designed around water, the CT room with the
            nature ceiling, and a real photograph of the Marena building in place of the render.
          </Note>
          <Note
            label="Retouching needed"
            why="the Visual Direction asks to remove identifiable individuals and faculty, remove masks, vary Dr Shruti's attire and show her with generic team members."
          >
            The site photographs under &ldquo;With teams on site&rdquo; are the originals. The reworked versions, with people replaced
            and Dr Shruti composited in, are a retoucher&apos;s job and will replace these when they are ready.
          </Note>
        </div>
      </Section>

      <Closing />
    </>
  );
}
