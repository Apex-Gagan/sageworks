import type { Metadata } from "next";
import { Pic } from "@/components/shared/Pic";
import { Parallax, Reveal } from "@/components/shared/Motion";
import { ChapterNav } from "@/components/one/Interactive";
import { ButtonOne, Caption, Container, TextLink } from "@/components/one/ui";
import { captions, type ImageKey } from "@/content/captions";
import { chapters, founderHero, lenses } from "@/content/founder";
import { resolve } from "@/content/nav";

export const metadata: Metadata = {
  title: "Sample 1 | Founder, Dr Shruti Pai",
  description:
    "Dr Shruti Pai is a business leader, clinical nutrition scientist, gut microbiome researcher and human systems designer.",
};

/** Lay out a chapter's photographs according to how many there are. */
function ChapterImages({ images }: { images: ImageKey[] }) {
  if (images.length === 0) return null;
  if (images.length === 1) {
    return (
      <figure>
        <Pic k={images[0]} ratio="16 / 9" sizes="(min-width: 1024px) 60vw, 100vw" />
        <Caption>{captions[images[0]]}.</Caption>
      </figure>
    );
  }
  if (images.length === 2) {
    return (
      <div className="grid gap-5 sm:grid-cols-12">
        <figure className="sm:col-span-7">
          <Pic k={images[0]} ratio="4 / 3" sizes="(min-width: 1024px) 38vw, 100vw" />
          <Caption>{captions[images[0]]}.</Caption>
        </figure>
        <figure className="sm:col-span-5 sm:pt-16">
          <Pic k={images[1]} ratio="4 / 5" sizes="(min-width: 1024px) 26vw, 100vw" />
          <Caption>{captions[images[1]]}.</Caption>
        </figure>
      </div>
    );
  }
  if (images.length === 3) {
    return (
      <div className="grid gap-5 sm:grid-cols-12">
        <figure className="sm:col-span-12">
          <Pic k={images[0]} ratio="16 / 8" sizes="(min-width: 1024px) 62vw, 100vw" />
          <Caption>{captions[images[0]]}.</Caption>
        </figure>
        <figure className="sm:col-span-5">
          <Pic k={images[1]} ratio="4 / 5" sizes="(min-width: 1024px) 26vw, 100vw" pos="40% 30%" />
          <Caption>{captions[images[1]]}.</Caption>
        </figure>
        <figure className="sm:col-span-7 sm:pt-14">
          <Pic k={images[2]} ratio="4 / 3" sizes="(min-width: 1024px) 36vw, 100vw" />
          <Caption>{captions[images[2]]}.</Caption>
        </figure>
      </div>
    );
  }
  const [lead, ...rest] = images;
  return (
    <div className="space-y-5">
      <figure>
        <Pic k={lead} ratio="16 / 9" sizes="(min-width: 1024px) 62vw, 100vw" />
        <Caption>{captions[lead]}.</Caption>
      </figure>
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {rest.map((k, i) => (
          <figure key={k} className={i % 2 === 1 ? "lg:pt-10" : ""}>
            <Pic k={k} ratio="3 / 4" sizes="(min-width: 1024px) 16vw, 50vw" />
            <Caption>{captions[k]}.</Caption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function FounderOne() {
  const navItems = chapters.map((c) => ({ id: c.id, label: c.role }));

  return (
    <>
      {/* Hero */}
      <section>
        <Container className="grid items-end gap-12 pb-16 pt-12 lg:min-h-[calc(100dvh-68px)] lg:grid-cols-12 lg:gap-8 lg:pb-20">
          <div className="lg:col-span-7">
            <p className="label text-muted">{founderHero.title}</p>
            <h1 className="display mt-6 text-[clamp(4rem,10vw,10rem)] leading-[0.92]">
              Dr Shruti <em className="italic">Pai</em>
            </h1>
            <ul className="mt-8 grid max-w-xl grid-cols-2 gap-x-8 gap-y-2 text-[14.5px] text-fg/80">
              {founderHero.roles.map((r) => (
                <li key={r} className="border-t border-line pt-2">
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-10 max-w-[40ch] text-[16.5px] leading-relaxed text-muted">{founderHero.lead}</p>
            <p className="display mt-3 max-w-2xl text-[clamp(1.9rem,3.2vw,3rem)] italic leading-[1.14] text-accent">
              {founderHero.question}
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Pic
              k={founderHero.portrait}
              ratio="3 / 4"
              sizes="(min-width: 1024px) 32vw, 100vw"
              preload
              pos="50% 15%"
            />
            <Caption>Reviewing artwork studies in the design studio.</Caption>
          </div>
        </Container>
      </section>

      {/* Introduction */}
      <section className="border-t border-line">
        <Container className="grid gap-10 py-20 md:grid-cols-12 md:py-28">
          <Reveal className="md:col-span-6 md:col-start-2">
            <p className="display text-[clamp(1.7rem,2.8vw,2.6rem)] leading-[1.22]">{founderHero.intro[0]}</p>
          </Reveal>
          <Reveal className="space-y-5 text-[16.5px] leading-relaxed text-fg/80 md:col-span-4 md:col-start-8" delay={0.1}>
            <p>{founderHero.intro[1]}</p>
            <p>{founderHero.intro[2]}</p>
          </Reveal>
        </Container>
      </section>

      {/* Chapters */}
      <section className="border-t border-line">
        <Container className="grid gap-12 py-20 md:py-28 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <ChapterNav items={navItems} />
            </div>
          </aside>

          <div className="space-y-28 lg:col-span-9 md:space-y-36">
            {chapters.map((c) => (
              <article key={c.id} id={c.id} className="scroll-mt-28">
                <Reveal>
                  <h2 className="display text-[clamp(2.6rem,5vw,4.8rem)] leading-[1.02]">{c.role}</h2>
                  <p className="mt-3 text-[16px] text-muted">{c.title}</p>
                </Reveal>

                <div className="mt-10 grid gap-10 md:grid-cols-12">
                  <Reveal className="md:col-span-4">
                    <p className="display text-[clamp(1.6rem,2.4vw,2.2rem)] italic leading-[1.18] text-accent">
                      {c.maxim}
                    </p>
                    {c.facts ? (
                      <dl className="mt-8 space-y-4">
                        {c.facts.map((f) => (
                          <div key={f.value + f.label} className="border-t border-line pt-3">
                            <dt className="display text-[1.7rem] leading-none">{f.value}</dt>
                            {f.label ? <dd className="mt-1.5 text-[13.5px] text-muted">{f.label}</dd> : null}
                          </div>
                        ))}
                      </dl>
                    ) : null}
                  </Reveal>
                  <Reveal className="space-y-5 text-[16.5px] leading-relaxed text-fg/85 md:col-span-8" delay={0.08}>
                    {c.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                    {c.link ? (
                      <div className="pt-3">
                        <TextLink href={resolve("/1", c.link.href)}>{c.link.label}</TextLink>
                      </div>
                    ) : null}
                  </Reveal>
                </div>

                {c.images.length ? (
                  <Reveal className="mt-12">
                    <ChapterImages images={c.images} />
                  </Reveal>
                ) : null}

                {c.pull ? (
                  <Reveal className="mt-14 border-l border-accent pl-6 md:pl-10">
                    {c.pullLead ? <p className="max-w-[52ch] text-[15px] text-muted">{c.pullLead}</p> : null}
                    <p className="display mt-3 max-w-3xl text-[clamp(1.8rem,3.2vw,3rem)] leading-[1.16]">{c.pull}</p>
                  </Reveal>
                ) : null}
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Three lenses */}
      <section className="border-t border-line bg-surface">
        <Container className="py-24 md:py-32">
          <Reveal>
            <p className="max-w-[50ch] text-[16.5px] text-muted">{lenses.lead}</p>
          </Reveal>
          <div className="mt-10">
            {lenses.items.map((l) => (
              <Reveal key={l.name} className="grid gap-4 border-t border-line py-8 md:grid-cols-12 md:items-baseline">
                <h3 className="display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-none md:col-span-4">{l.name}</h3>
                <p className="display text-[1.5rem] italic leading-snug text-accent md:col-span-3">{l.line}</p>
                <p className="text-[15.5px] leading-relaxed text-fg/80 md:col-span-5">{l.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
        <Parallax className="aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9]" amount={6}>
          <Pic k="hospitals/reception-colour-frieze" cover sizes="100vw" className="rounded-none" pos="50% 42%" />
        </Parallax>
        <Container className="py-24 md:py-32">
          <Reveal className="max-w-4xl">
            {lenses.close.map((line) => (
              <p key={line} className="display text-[clamp(1.8rem,3.4vw,3.2rem)] leading-[1.2] text-fg/60">
                {line}
              </p>
            ))}
            <p className="display mt-6 text-[clamp(2.2rem,4.4vw,4.2rem)] italic leading-[1.1]">{lenses.final}</p>
            <p className="label mt-10 text-muted">{lenses.tagline}</p>
            <div className="mt-10">
              <ButtonOne href="/1#work">{lenses.cta}</ButtonOne>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
