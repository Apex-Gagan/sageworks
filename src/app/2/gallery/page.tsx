import type { Metadata } from "next";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { imageData } from "@/components/shared/Pic";
import { Reveal } from "@/components/shared/Motion";
import { Note } from "@/components/site/ui";
import { Filmstrip } from "@/components/two/Filmstrip";
import { Block, ClosingBand, H, PageTop, Plate } from "@/components/two/kit";
import { kinds } from "@/content/projects";
import { stages, strips } from "@/content/two";

export const metadata: Metadata = {
  title: "Photo gallery",
  description: "Photographs of healthcare, hospitality, academic, kitchen and office projects shaped by Dr Shruti Pai and her teams.",
};

/**
 * Photo gallery, in the Design 2 layout: the project journey first, then one strip of
 * photographs for each kind of place. Each strip opens with the photographs Dr Shruti
 * ticked in her catalogues and continues with others from the Design 2 set. It follows
 * "Visual Direction for Website Projects" as Design 1 does: artwork shown in its space,
 * large projects leading, and nothing from the list of pictures she said no to.
 */
export default function GalleryTwo() {
  return (
    <>
      <PageTop
        n="09"
        label="Photo gallery"
        title={
          <>
            The work, <em>in pictures</em>
          </>
        }
        lead="Healthcare, hospitality, academic institutions, kitchens and offices."
      />

      {/* The project journey */}
      <Block id="journey" n="01" label="The project journey" tint>
        <Reveal className="max-w-[52rem]">
          <H>
            From work in progress to the <em>completed project</em>
          </H>
        </Reveal>
        <div className="mt-12 space-y-14">
          {stages.map((j) => (
            <Reveal key={j.title}>
              <article data-journey className="grid gap-x-10 gap-y-6 lg:grid-cols-12">
                <div className="lg:col-span-3">
                  <h3 className="display text-[1.9rem] leading-tight">{j.title}</h3>
                  <p className="mt-1 text-[15px] text-ink-soft">{j.place}</p>
                </div>
                <ol className="grid items-start gap-5 sm:grid-cols-[1fr_auto_1fr] lg:col-span-9">
                  {j.steps.map((s, n) => (
                    <li key={s.image} data-stage={s.label} className="contents">
                      {n ? (
                        <span aria-hidden="true" className="hidden h-11 w-11 items-center justify-center self-center rounded-full bg-sage text-ink-deep sm:inline-flex">
                          <ArrowRight size={17} weight="bold" />
                        </span>
                      ) : null}
                      <Plate
                        k={s.image}
                        ratio="4 / 3"
                        pos={s.pos}
                        sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 100vw"
                        caption={
                          <span className="font-semibold text-ink-deep">
                            {n + 1}. {s.label}
                          </span>
                        }
                      />
                    </li>
                  ))}
                </ol>
              </article>
            </Reveal>
          ))}
        </div>
        <Note
          className="mt-12 max-w-[60rem] bg-white"
          why="the catalogue asks for the final photographs of the MARC auditorium from Naveen, and the campus pair was matched by us from the site folders."
        >
          Completed, high-resolution photographs of the MARC auditorium (inside and out), and confirmation that the two campus photographs
          show the same project. More journeys can be added as before-and-after pairs arrive, such as the HAL project.
        </Note>
      </Block>

      {/* One strip for each kind of place, and the teams */}
      <Block id="projects" n="02" label="Projects">
        <Reveal className="mb-10">
          <H size="md">Spaces, and the artwork made for them</H>
        </Reveal>
        <Filmstrip
          strips={strips.map((s) => ({
            name: s.name,
            line: s.line,
            dot: kinds.find((k) => k.name === s.name)?.dot,
            items: s.items.map((it) => {
              const d = imageData(it.image);
              return { src: d.src, w: d.w, h: d.h, alt: d.alt, blur: d.blur, title: it.title, note: it.note };
            }),
          }))}
        />
        <div className="mt-10 grid gap-4 border-t border-line pt-10 md:grid-cols-2">
          <Note why="the Visual Direction asks for high-resolution photographs from the project drive or approved online sources; the catalogue pictures are reference only.">
            Original, high-resolution files for the photographs Dr Shruti ticked that are not in the shared folders: the Dwarka exterior by
            day and by night, the Whitefield reception counters, the paediatric ward designed around water, the CT room with the nature
            ceiling, and a real photograph of the Marena building in place of the render.
          </Note>
          <Note
            label="Retouching needed"
            why="the Visual Direction asks to remove identifiable individuals and faculty, remove masks, vary Dr Shruti's attire and show her with generic team members."
          >
            The site photographs under &ldquo;With teams on site&rdquo; are the originals. The reworked versions, with people replaced and
            Dr Shruti composited in, are a retoucher&apos;s job and will replace these when they are ready.
          </Note>
        </div>
      </Block>

      <ClosingBand />
    </>
  );
}
