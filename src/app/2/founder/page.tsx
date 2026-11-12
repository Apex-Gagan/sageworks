import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Pic, imageData } from "@/components/shared/Pic";
import { Reveal, ScrollText } from "@/components/shared/Motion";
import { Scroller } from "@/components/shared/Scroller";
import { FounderHeroTwo, type HeroRole } from "@/components/two/Hero";
import { ChapterPills } from "@/components/two/Interactive";
import { TriadCircles, type CircleItem } from "@/components/two/Signature";
import { Arch, ButtonTwo, Disc, Glow, Note, Seal, Sheet, Wrap } from "@/components/two/ui";
import { captions, type ImageKey } from "@/content/captions";
import { chapters, founderHero, lenses, type Chapter } from "@/content/founder";
import { resolve } from "@/content/nav";

export const metadata: Metadata = {
  title: "Sample 2 | Founder, Dr Shruti Pai",
  description:
    "Dr Shruti Pai is a business leader, clinical nutrition scientist, gut microbiome researcher and human systems designer.",
};

const by = Object.fromEntries(chapters.map((c) => [c.id, c])) as Record<string, Chapter>;

const lensImages: ImageKey[] = [
  "hospitals/physio-figures",
  "academic/msap-terrace-steps",
  "academic/msap-courtyard",
];
const lensItems: CircleItem[] = lenses.items.map((l, i) => {
  const d = imageData(lensImages[i]);
  return { name: l.name, line: l.line, body: l.body, src: d.src, blur: d.blur, alt: d.alt };
});

function Head({ c, center = false }: { c: Chapter; center?: boolean }) {
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : ""}>
      <h2 className="display text-[clamp(2.6rem,5.4vw,5.2rem)] leading-[0.96]">{c.role}</h2>
      <p className="mt-4 text-[16px] text-muted">{c.title}</p>
      <p className="display mt-7 text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.08] text-accent">{c.maxim}</p>
    </Reveal>
  );
}

function Body({ c, className = "" }: { c: Chapter; className?: string }) {
  return (
    <Reveal className={`space-y-5 text-[16.5px] leading-relaxed text-fg/85 ${className}`} delay={0.08}>
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
  );
}

/** A closing line set over a photograph, so the chapter ends on an image. */
function PullBand({ c, image }: { c: Chapter; image: ImageKey }) {
  if (!c.pull) return null;
  return (
    <div className="relative isolate overflow-hidden rounded-[32px] md:rounded-[52px]">
      <div className="absolute inset-0 -z-10">
        <Pic k={image} cover sizes="100vw" className="rounded-none" />
        <div className="absolute inset-0 bg-bg/80" />
      </div>
      <Reveal className="mx-auto max-w-5xl px-6 py-20 text-center md:px-16 md:py-32">
        {c.pullLead ? <p className="mx-auto max-w-[52ch] text-[15px] text-fg/75">{c.pullLead}</p> : null}
        <p className="display mt-5 text-[clamp(1.9rem,4.2vw,4rem)] leading-[1.04]">{c.pull}</p>
      </Reveal>
    </div>
  );
}

function PullPlain({ c }: { c: Chapter }) {
  if (!c.pull) return null;
  return (
    <Reveal className="mx-auto max-w-5xl text-center">
      {c.pullLead ? <p className="mx-auto max-w-[52ch] text-[15px] text-muted">{c.pullLead}</p> : null}
      <p className="display mt-5 text-[clamp(1.9rem,4.2vw,4rem)] leading-[1.04]">{c.pull}</p>
    </Reveal>
  );
}

function Anchor({ id, children }: { id: string; children: ReactNode }) {
  return (
    <div id={id} className="scroll-mt-40">
      {children}
    </div>
  );
}

function heroMedia(k: ImageKey) {
  const d = imageData(k);
  return { src: d.src, blur: d.blur, alt: d.alt };
}

/**
 * The four roles under her name each lead to the chapter that tells that part
 * of the story, and preview it in the portrait frame while pointed at.
 */
const roleChapters: { chapter: string; image: number }[] = [
  { chapter: "business-leader", image: 0 },
  { chapter: "scientist", image: 0 },
  { chapter: "scientist", image: 1 },
  { chapter: "designer", image: 0 },
];

const heroRoles: HeroRole[] = founderHero.roles.map((label, i) => {
  const target = roleChapters[i];
  const c = chapters.find((ch) => ch.id === target.chapter) as Chapter;
  return { label, href: `#${c.id}`, maxim: c.maxim, media: heroMedia(c.images[target.image]) };
});

export default function FounderTwo() {
  const pills = chapters.map((c) => ({ id: c.id, label: c.role }));
  const business = by["business-leader"];
  const scientist = by["scientist"];
  const designer = by["designer"];
  const writer = by["writer"];
  const gutsy = by["dr-gutsy"];
  const global = by["global"];
  const lived = by["lived"];

  return (
    <>
      {/* Hero */}
      <FounderHeroTwo
        title={founderHero.title}
        roles={heroRoles}
        lead={founderHero.lead}
        question={founderHero.question}
        portrait={heroMedia(founderHero.portrait)}
        caption="Reviewing artwork studies in the design studio."
        seal={<Seal id="seal-founder" className="relative h-[132px] w-[132px] rounded-full bg-bg text-fg/75" />}
      />

      {/* Introduction */}
      <Sheet tone="surface">
        <Wrap className="pb-28 pt-24 md:pb-44 md:pt-36">
          <div className="lg:pl-[16%]">
            <ScrollText
              text={founderHero.intro.join(" ")}
              className="display text-[clamp(1.6rem,3.2vw,3rem)] leading-[1.18]"
            />
          </div>
        </Wrap>
      </Sheet>

      <div className="relative">
        <div className="pointer-events-none sticky top-[84px] z-30 -mt-6 h-0 md:top-[92px]">
          <div className="pointer-events-auto">
            <ChapterPills items={pills} />
          </div>
        </div>

        {/* Business Leader: collage and a line over a photograph */}
        <Sheet>
          <Anchor id={business.id}>
            <Wrap className="grid items-center gap-14 pb-16 pt-28 md:pt-40 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <Head c={business} />
                <Body c={business} className="mt-9 max-w-[58ch]" />
                {business.facts ? (
                  <Reveal>
                    <dl className="mt-10 grid grid-cols-2 gap-6">
                      {business.facts.map((f) => (
                        <div key={f.value} className="border-t border-line pt-4">
                          <dt className="display text-[clamp(2.2rem,3.6vw,3.4rem)] leading-none text-accent">{f.value}</dt>
                          <dd className="mt-2 text-[13.5px] leading-snug text-muted">{f.label}</dd>
                        </div>
                      ))}
                    </dl>
                  </Reveal>
                ) : null}
              </div>
              <Reveal className="relative lg:col-span-5 lg:col-start-8" delay={0.1}>
                <Arch
                  k="founder/chef-on-wheels-kitchen"
                  ratio="3 / 4"
                  sizes="(min-width: 1024px) 28vw, 70vw"
                  pos="38% 30%"
                  className="ml-auto w-[72%]"
                />
                <div className="absolute bottom-[6%] left-0 w-[56%] overflow-hidden rounded-[24px] border-[6px] border-bg">
                  <Pic k="hospitality/chef-van-team" ratio="4 / 3" sizes="30vw" className="rounded-none" />
                </div>
                <Disc
                  k="hospitality/chef-van-serving"
                  sizes="180px"
                  pos="70% 40%"
                  className="absolute left-[4%] top-[4%] w-[30%] border-[6px] border-bg"
                />
              </Reveal>
            </Wrap>
            <Wrap className="pb-28 md:pb-44">
              <PullBand c={business} image="hospitality/chef-van-team" />
            </Wrap>
          </Anchor>
        </Sheet>

        {/* Scientist: three degrees as three rings */}
        <Sheet tone="surface">
          <Anchor id={scientist.id}>
            <Glow className="-left-52 top-10" />
            <Wrap className="relative pb-16 pt-24 md:pt-36">
              <Head c={scientist} center />
              {scientist.facts ? (
                <Reveal className="mx-auto mt-14 flex max-w-3xl justify-center">
                  {scientist.facts.map((f, i) => (
                    <div
                      key={f.value}
                      className={`grid aspect-square w-[38%] place-items-center rounded-full border border-accent/50 text-center ${i > 0 ? "-ml-[5%]" : ""}`}
                    >
                      <div className="px-4">
                        <p className="display text-[clamp(1.5rem,3.4vw,3rem)] leading-none text-accent">{f.value}</p>
                        <p className="mt-2 text-[clamp(11px,1.2vw,14px)] leading-snug text-fg/80">{f.label}</p>
                      </div>
                    </div>
                  ))}
                </Reveal>
              ) : null}
              <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:items-center">
                <Body c={scientist} className="lg:col-span-5" />
                <Reveal className="grid grid-cols-12 items-end gap-4 lg:col-span-6 lg:col-start-7" delay={0.1}>
                  <figure className="col-span-7">
                    <div className="overflow-hidden rounded-[24px]">
                      <Pic k="hospitals/tree-of-life-front" ratio="4 / 3" sizes="32vw" className="rounded-none" />
                    </div>
                    <Note>{captions["hospitals/tree-of-life-front"]}.</Note>
                  </figure>
                  <figure className="col-span-5">
                    <Arch k="hospitals/physio-get-set-go" ratio="3 / 4" sizes="22vw" />
                    <Note>{captions["hospitals/physio-get-set-go"]}</Note>
                  </figure>
                </Reveal>
              </div>
            </Wrap>
            <Wrap className="pb-28 pt-10 md:pb-44">
              <PullPlain c={scientist} />
            </Wrap>
          </Anchor>
        </Sheet>

        {/* Designer: a strip of spaces */}
        <Sheet>
          <Anchor id={designer.id}>
            <Wrap className="grid gap-12 pb-14 pt-24 md:pt-36 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-6">
                <Head c={designer} />
              </div>
              <Body c={designer} className="lg:col-span-5 lg:col-start-8" />
            </Wrap>
            <Scroller
              label="spaces shaped by Dr Shruti Pai"
              tone="two"
              trackClassName="flex items-start snap-x snap-proximity scroll-px-5 gap-5 px-5 md:scroll-px-10 md:px-10"
              controlsClassName="mx-auto mt-8 max-w-[1480px] justify-end px-5 md:px-10"
            >
              {designer.images.map((k, i) => {
                const tall = i % 2 === 1;
                return (
                  <figure
                    key={k}
                    className={`shrink-0 snap-start ${tall ? "w-[56vw] sm:w-[32vw] lg:w-[23vw]" : "mt-14 w-[78vw] sm:w-[48vw] lg:w-[36vw]"}`}
                  >
                    <div className={`overflow-hidden ${tall ? "arch" : "rounded-[24px]"}`}>
                      <Pic
                        k={k}
                        ratio={tall ? "3 / 4" : "4 / 3"}
                        sizes="(min-width: 1024px) 36vw, 78vw"
                        pos="50% 28%"
                        className="rounded-none"
                      />
                    </div>
                    <Note>{captions[k]}.</Note>
                  </figure>
                );
              })}
            </Scroller>
            <Wrap className="pb-28 pt-16 md:pb-44">
              <PullBand c={designer} image="hospitals/whitefield-lobby-rings" />
            </Wrap>
          </Anchor>
        </Sheet>

        {/* Writer and Dr Gutsy side by side */}
        <Sheet tone="surface">
          <Wrap className="grid gap-6 pb-28 pt-24 md:pb-44 md:pt-36 lg:grid-cols-2">
            <Anchor id={writer.id}>
              <article className="flex h-full flex-col rounded-[32px] border border-line p-7 md:rounded-[48px] md:p-12">
                <Head c={writer} />
                <Body c={writer} className="mt-8" />
                <div className="mt-auto pt-10">
                  <div className="overflow-hidden rounded-[24px]">
                    <Pic k="founder/team-table" ratio="16 / 9" sizes="(min-width: 1024px) 40vw, 90vw" className="rounded-none" />
                  </div>
                  <Note>{captions["founder/team-table"]}.</Note>
                </div>
              </article>
            </Anchor>
            <Anchor id={gutsy.id}>
              <article className="flex h-full flex-col rounded-[32px] rounded-bl-none border border-accent/30 bg-tint p-7 md:rounded-[48px] md:rounded-bl-none md:p-12">
                <Head c={gutsy} />
                <Body c={gutsy} className="mt-8" />
                <p className="label mt-auto pt-10 text-accent">Stay curious. Stay evidence-led. Stay gutsy.</p>
              </article>
            </Anchor>
          </Wrap>
        </Sheet>

        {/* Global perspective: five places */}
        <Sheet>
          <Anchor id={global.id}>
            <Wrap className="grid gap-12 pb-16 pt-24 md:pt-36 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <Head c={global} />
                <Reveal>
                  <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-1">
                    {(global.facts ?? []).map((f, i) => (
                      <li
                        key={f.value}
                        className={`display text-[clamp(2.2rem,5.4vw,5rem)] leading-[1.05] ${i % 2 === 0 ? "text-fg" : "text-fg/45"}`}
                      >
                        {f.value}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Body c={global} className="mt-10 max-w-[58ch]" />
              </div>
              <Reveal className="relative mx-auto w-[86%] max-w-[440px] lg:col-span-4 lg:col-start-9 lg:w-full" delay={0.1}>
                <Disc k="academic/msap-aerial-mist" sizes="(min-width: 1024px) 30vw, 80vw" />
                <div className="absolute -bottom-10 -left-10 w-[62%] overflow-hidden rounded-[24px] border-[6px] border-bg">
                  <Pic k="hospitals/malaysia-mural" ratio="16 / 10" sizes="26vw" className="rounded-none" />
                </div>
              </Reveal>
            </Wrap>
            <Wrap className="pb-28 pt-16 md:pb-44">
              <PullPlain c={global} />
            </Wrap>
          </Anchor>
        </Sheet>

        {/* Lived experience */}
        <Sheet tone="surface">
          <Anchor id={lived.id}>
            <Wrap className="grid items-center gap-12 pb-28 pt-24 md:pb-44 md:pt-36 lg:grid-cols-12">
              <Reveal className="grid grid-cols-12 items-end gap-4 lg:col-span-5">
                <div className="col-span-7">
                  <Arch k="founder/mosaic-wall" ratio="3 / 4.2" sizes="26vw" pos="50% 40%" />
                </div>
                <div className="col-span-5">
                  <Disc k="founder/site-foundation" sizes="18vw" />
                </div>
              </Reveal>
              <div className="lg:col-span-6 lg:col-start-7">
                <Head c={lived} />
                <Body c={lived} className="mt-9 max-w-[58ch]" />
              </div>
            </Wrap>
          </Anchor>
        </Sheet>
      </div>

      {/* Three lenses */}
      <Sheet>
        <Glow className="-right-40 top-24" />
        <Wrap className="relative py-24 md:py-36">
          <TriadCircles
            items={lensItems}
            heading={
              <p className="display max-w-[20ch] text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.15]">{lenses.lead}</p>
            }
          />
        </Wrap>
        <Wrap className="pb-28 md:pb-44">
          <Reveal>
            {lenses.close.map((line) => (
              <p key={line} className="display text-[clamp(1.8rem,4vw,3.8rem)] leading-[1.08] text-fg/45">
                {line}
              </p>
            ))}
            <p className="display mt-6 text-[clamp(2.4rem,6vw,6rem)] leading-[0.98]">
              Sagework operates <strong className="text-accent">where all three meet.</strong>
            </p>
            <p className="label mt-10 text-muted">{lenses.tagline}</p>
            <div className="mt-10">
              <ButtonTwo href="/2#work">{lenses.cta}</ButtonTwo>
            </div>
          </Reveal>
        </Wrap>
      </Sheet>
    </>
  );
}
