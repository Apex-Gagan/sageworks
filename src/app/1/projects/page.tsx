import type { Metadata } from "next";
import { Pic } from "@/components/shared/Pic";
import { Parallax, Reveal } from "@/components/shared/Motion";
import { ButtonOne, Caption, Container } from "@/components/one/ui";
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
  title: "Sample 1 | Projects",
  description:
    "Hospitals, campuses, kitchens and workplaces shaped by Dr Shruti Pai with architects, artists and operating teams.",
};

export default function ProjectsOne() {
  return (
    <>
      {/* Hero */}
      <section>
        <Container className="pb-12 pt-14 md:pt-20">
          <p className="label text-muted">Projects</p>
          <h1 className="display mt-6 max-w-5xl text-[clamp(2.75rem,6vw,6rem)] leading-[1.02]">
            Environments designed for <em className="italic text-accent">the people inside them</em>
          </h1>
          <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
            <p className="max-w-[52ch] text-[17px] leading-relaxed text-fg/80 md:col-span-6">{projectsHero.sub}</p>
            <nav aria-label="Project categories" className="md:col-span-5 md:col-start-8">
              <ul className="flex flex-wrap gap-2.5 md:justify-end">
                {categories.map((c) => (
                  <li key={c.id}>
                    <a
                      href={`#${c.id}`}
                      className="inline-block whitespace-nowrap border border-line px-4 py-2.5 text-[13px] transition-colors duration-300 hover:border-fg hover:bg-fg hover:text-bg"
                    >
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
        <Parallax className="aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9]" amount={6}>
          <Pic k="hospitals/mangalore-shell-lobby" cover sizes="100vw" preload className="rounded-none" pos="50% 62%" />
        </Parallax>
        <Container className="py-14 md:py-20">
          <p className="display mx-auto max-w-4xl text-center text-[clamp(1.6rem,3vw,2.7rem)] italic leading-[1.2]">
            {projectsHero.note}
          </p>
        </Container>
      </section>

      {/* Categories and projects */}
      {categories.map((cat) => {
        const list = projects.filter((p) => p.category === cat.id);
        return (
          <section key={cat.id} id={cat.id} className="scroll-mt-24 border-t border-line">
            <div className="bg-surface">
              <Container className="py-14 md:py-20">
                <Reveal>
                  <h2 className="display max-w-4xl text-[clamp(2.4rem,5vw,4.6rem)] leading-[1.03]">{cat.title}</h2>
                  <p className="mt-5 max-w-[56ch] text-[16.5px] leading-relaxed text-fg/80">{cat.intro}</p>
                </Reveal>
              </Container>
            </div>

            <Container>
              {list.map((p) => {
                const [lead, ...rest] = p.images;
                return (
                  <article key={p.slug} className="grid gap-10 border-t border-line py-16 first:border-t-0 md:py-24 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                      <div className="lg:sticky lg:top-28">
                        <p className="text-[13.5px] text-muted">{p.place}</p>
                        <h3 className="display mt-3 text-[clamp(2rem,3vw,2.9rem)] leading-[1.06]">{p.title}</h3>
                        <p className="display mt-3 text-[1.4rem] italic leading-snug text-accent">{p.theme}</p>
                        <p className="mt-6 max-w-[42ch] text-[15.5px] leading-relaxed text-fg/80">{p.body}</p>
                        {p.credit ? <p className="mt-5 text-[13px] text-muted">{p.credit}</p> : null}
                      </div>
                    </div>

                    <div className="lg:col-span-8">
                      <Reveal>
                        <figure>
                          <Pic k={lead} ratio="16 / 10" sizes="(min-width: 1024px) 62vw, 100vw" />
                          <Caption>{captions[lead]}.</Caption>
                        </figure>
                      </Reveal>
                      <div className="mt-5 columns-2 gap-5 md:columns-3">
                        {rest.map((k) => (
                          <Reveal key={k} className="mb-5 break-inside-avoid">
                            <figure>
                              <Pic k={k} sizes="(min-width: 1024px) 21vw, 50vw" />
                              <Caption>{captions[k]}.</Caption>
                            </figure>
                          </Reveal>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </Container>
          </section>
        );
      })}

      {/* Site to space */}
      <section className="border-t border-line bg-surface">
        <Container className="py-24 md:py-32">
          <Reveal>
            <h2 className="display max-w-3xl text-[clamp(2.4rem,5vw,4.6rem)] leading-[1.03]">
              From site <em className="italic">to space</em>
            </h2>
            <p className="mt-5 max-w-[54ch] text-[16.5px] leading-relaxed text-fg/80">
              The same places, seen during construction and after completion.
            </p>
          </Reveal>
          <div className="mt-14 space-y-16">
            {transformations.map((t) => (
              <Reveal key={t.title} className="grid gap-5 md:grid-cols-2">
                <figure>
                  <Pic k={t.before} ratio="4 / 3" sizes="(min-width: 768px) 46vw, 100vw" />
                  <Caption>{t.beforeLabel}</Caption>
                </figure>
                <figure>
                  <Pic k={t.after} ratio="4 / 3" sizes="(min-width: 768px) 46vw, 100vw" />
                  <Caption>{t.afterLabel}</Caption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* How the work happens */}
      <section className="border-t border-line">
        <Container className="pb-8 pt-24 md:pt-32">
          <h2 className="display max-w-3xl text-[clamp(2.4rem,5vw,4.6rem)] leading-[1.03]">
            Made with the people <em className="italic">who build and run them</em>
          </h2>
        </Container>
        <div className="no-scrollbar flex snap-x gap-5 overflow-x-auto px-5 pb-24 md:px-10 md:pb-32">
          {processShots.map((k) => (
            <figure key={k} className="w-[70vw] shrink-0 snap-start sm:w-[40vw] lg:w-[26vw]">
              <Pic k={k} ratio="4 / 5" sizes="(min-width: 1024px) 26vw, 70vw" pos="50% 25%" />
              <Caption>{captions[k]}.</Caption>
            </figure>
          ))}
        </div>
      </section>

      {/* Project index and collaborators */}
      <section className="border-t border-line bg-surface">
        <Container className="py-24 md:py-32">
          <h2 className="display text-[clamp(2.4rem,5vw,4.6rem)] leading-[1.03]">Project index</h2>
          <div className="mt-12 grid gap-12 lg:grid-cols-12">
            {index.map((g, gi) => (
              <div key={g.group} className={gi === 0 ? "lg:col-span-6" : "lg:col-span-3"}>
                <h3 className="border-t border-fg pt-4 text-[14px]">{g.group}</h3>
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
            <p className="display mt-5 max-w-5xl text-[clamp(1.5rem,2.6vw,2.3rem)] leading-[1.35]">
              {collaborators.join(", ")}.
            </p>
          </div>

          <div className="mt-16">
            <ButtonOne href={contactHref}>Start a Conversation</ButtonOne>
          </div>
        </Container>
      </section>
    </>
  );
}
