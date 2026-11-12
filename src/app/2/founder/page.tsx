import type { Metadata } from "next";
import { Pic } from "@/components/shared/Pic";
import { Reveal, ScrollText } from "@/components/shared/Motion";
import { TriadDiagram } from "@/components/shared/Triad";
import { ChapterPills } from "@/components/two/Interactive";
import { ButtonTwo, Note, Wrap } from "@/components/two/ui";
import { captions } from "@/content/captions";
import { chapters, founderHero, lenses } from "@/content/founder";
import { resolve } from "@/content/nav";

export const metadata: Metadata = {
  title: "Sample 2 | Founder, Dr Shruti Pai",
  description:
    "Dr Shruti Pai is a business leader, clinical nutrition scientist, gut microbiome researcher and human systems designer.",
};

export default function FounderTwo() {
  const pills = chapters.map((c) => ({ id: c.id, label: c.role }));

  return (
    <>
      {/* Hero */}
      <section>
        <Wrap className="grid items-end gap-12 pb-16 pt-28 lg:min-h-[100dvh] lg:grid-cols-12 lg:pb-20">
          <div className="lg:col-span-8">
            <p className="label text-muted">{founderHero.title}</p>
            <h1 className="display mt-6 text-[clamp(4rem,12vw,12rem)] leading-[0.86]">
              Dr Shruti <span className="text-accent">Pai</span>
            </h1>
            <ul className="mt-9 flex flex-wrap gap-2">
              {founderHero.roles.map((r) => (
                <li key={r} className="rounded-full border border-fg/20 px-4 py-2 text-[13.5px] text-fg/85">
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-10 max-w-[44ch] text-[16.5px] leading-relaxed text-muted">{founderHero.lead}</p>
            <p className="display mt-3 max-w-3xl text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.04]">
              {founderHero.question}
            </p>
          </div>
          <div className="mx-auto w-full max-w-[420px] lg:col-span-4">
            <div className="overflow-hidden rounded-t-full rounded-b-[28px]">
              <Pic
                k={founderHero.portrait}
                ratio="3 / 4.3"
                sizes="(min-width: 1024px) 30vw, 90vw"
                preload
                pos="50% 12%"
                className="rounded-none"
              />
            </div>
            <Note>Reviewing artwork studies in the design studio.</Note>
          </div>
        </Wrap>
      </section>

      {/* Introduction */}
      <section className="border-t border-line">
        <Wrap className="py-24 md:py-36">
          <div className="lg:pl-[16%]">
            <ScrollText
              text={founderHero.intro.join(" ")}
              className="display text-[clamp(1.6rem,3.2vw,3rem)] leading-[1.18]"
            />
          </div>
        </Wrap>
      </section>

      {/* Chapters */}
      <section>
        <ChapterPills items={pills} />
        <Wrap className="space-y-6 pb-24 pt-10 md:pb-36">
          {chapters.map((c, ci) => (
            <div key={c.id}>
              <article
                id={c.id}
                className={`scroll-mt-40 overflow-hidden rounded-[28px] border border-line ${ci % 2 === 0 ? "bg-surface" : "bg-transparent"}`}
              >
                <div className="grid gap-10 p-7 md:p-12 lg:grid-cols-12 lg:gap-12">
                  <Reveal className="lg:col-span-5">
                    <h2 className="display text-[clamp(2.6rem,5.2vw,5rem)] leading-[0.96]">{c.role}</h2>
                    <p className="mt-4 text-[16px] text-muted">{c.title}</p>
                    <p className="display mt-8 text-[clamp(1.5rem,2.4vw,2.2rem)] leading-[1.1] text-accent">{c.maxim}</p>
                    {c.facts ? (
                      <dl className={`mt-8 ${c.facts.every((f) => !f.label) ? "flex flex-wrap gap-2" : "grid grid-cols-2 gap-x-6 gap-y-6"}`}>
                        {c.facts.map((f) =>
                          f.label ? (
                            <div key={f.value + f.label}>
                              <dt className="display text-[clamp(1.8rem,2.8vw,2.6rem)] leading-none">{f.value}</dt>
                              <dd className="mt-2 text-[13.5px] leading-snug text-muted">{f.label}</dd>
                            </div>
                          ) : (
                            <div key={f.value} className="rounded-full border border-fg/20 px-4 py-2 text-[13.5px]">
                              <dt>{f.value}</dt>
                            </div>
                          ),
                        )}
                      </dl>
                    ) : null}
                  </Reveal>
                  <Reveal className="space-y-5 text-[16.5px] leading-relaxed text-fg/85 lg:col-span-6 lg:col-start-7" delay={0.08}>
                    {c.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                    {c.link ? (
                      <div className="pt-4">
                        <ButtonTwo href={resolve("/2", c.link.href)} tone="ghost">
                          {c.link.label}
                        </ButtonTwo>
                      </div>
                    ) : null}
                  </Reveal>
                </div>

                {c.images.length ? (
                  <div className="no-scrollbar flex snap-x gap-4 overflow-x-auto px-7 pb-8 md:px-12 md:pb-12">
                    {c.images.map((k, i) => (
                      <figure
                        key={k}
                        className={`shrink-0 snap-start ${c.images.length === 1 ? "w-full" : i % 2 === 0 ? "w-[78vw] sm:w-[52vw] lg:w-[44%]" : "w-[58vw] sm:w-[36vw] lg:w-[30%]"}`}
                      >
                        <Pic
                          k={k}
                          ratio={c.images.length === 1 ? "21 / 9" : i % 2 === 0 ? "4 / 3" : "3 / 3.26"}
                          sizes="(min-width: 1024px) 40vw, 78vw"
                          pos="50% 28%"
                        />
                        <Note>{captions[k]}.</Note>
                      </figure>
                    ))}
                  </div>
                ) : null}
              </article>

              {c.pull ? (
                <Reveal className="mx-auto max-w-5xl px-2 py-20 text-center md:py-28">
                  {c.pullLead ? <p className="mx-auto max-w-[52ch] text-[15px] text-muted">{c.pullLead}</p> : null}
                  <p className="display mt-5 text-[clamp(2rem,4.4vw,4.2rem)] leading-[1.02]">{c.pull}</p>
                </Reveal>
              ) : null}
            </div>
          ))}
        </Wrap>
      </section>

      {/* Three lenses */}
      <section className="border-t border-line bg-surface">
        <Wrap className="grid gap-12 py-24 md:py-36 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="max-w-[44ch] text-[16.5px] text-muted">{lenses.lead}</p>
            <TriadDiagram className="mt-8 w-full max-w-[420px] text-fg/75" />
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            {lenses.items.map((l) => (
              <Reveal key={l.name} className="border-t border-line py-8">
                <h3 className="display text-[clamp(2.6rem,5vw,4.6rem)] leading-none">{l.name}</h3>
                <p className="mt-3 text-[17px] text-accent">{l.line}</p>
                <p className="mt-3 max-w-[52ch] text-[15.5px] leading-relaxed text-fg/80">{l.body}</p>
              </Reveal>
            ))}
          </div>
        </Wrap>
        <Wrap className="pb-24 md:pb-36">
          <Reveal>
            {lenses.close.map((line) => (
              <p key={line} className="display text-[clamp(1.8rem,4vw,3.8rem)] leading-[1.08] text-fg/45">
                {line}
              </p>
            ))}
            <p className="display mt-6 text-[clamp(2.4rem,6vw,6rem)] leading-[0.98] text-accent">{lenses.final}</p>
            <p className="label mt-10 text-muted">{lenses.tagline}</p>
            <div className="mt-10">
              <ButtonTwo href="/2#work">{lenses.cta}</ButtonTwo>
            </div>
          </Reveal>
        </Wrap>
      </section>
    </>
  );
}
