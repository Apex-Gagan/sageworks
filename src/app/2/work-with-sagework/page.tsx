import type { Metadata } from "next";
import { Reveal } from "@/components/shared/Motion";
import { Button, Lead } from "@/components/site/ui";
import { Block, ClosingBand, Go, H, Loop, PageTop, W } from "@/components/two/kit";
import { workPage as c } from "@/content/pages";
import { enquiry2, photo, r2 } from "@/content/two";

export const metadata: Metadata = {
  title: "Work with Sagework",
  description: c.lead,
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/**
 * Work with Sagework (content master, Page 7), in the Design 2 layout. The order the
 * client's designer note asks for is kept: opening, audience strip, six services with
 * descriptions and possible outputs visible, engagement formats, SAGE OS, invitation.
 * The six services are set as one ruled table instead of six cards.
 */
export default function WorkTwo() {
  return (
    <>
      <PageTop
        n="07"
        label={c.eyebrow}
        title={
          <>
            Build health and performance into the way your organisation <em>works</em>
          </>
        }
        lead={c.lead}
        side={photo.work}
      >
        <Button href={r2.contact}>Start a Conversation</Button>
        <Button href="#services" tone="outline">
          Explore Our Services
        </Button>
      </PageTop>

      {/* Audience strip */}
      <section data-audience className="bg-paper">
        <W className="grid gap-x-10 gap-y-4 py-8 lg:grid-cols-12 lg:items-center">
          <p className="eyebrow lg:col-span-2">{c.audience.title}</p>
          <ul className="flex flex-wrap gap-2 lg:col-span-10">
            {c.audience.items.map((a) => (
              <li key={a} className="rounded-full border border-sage-ink/25 bg-white px-4 py-2 text-[14.5px] font-medium">
                {a}
              </li>
            ))}
          </ul>
        </W>
      </section>

      {/* Six services */}
      <Block id="services" n="01" label={c.ways.title}>
        <Reveal className="grid gap-x-14 gap-y-6 lg:grid-cols-2">
          <H>
            Six ways to work <em>together</em>
          </H>
          <div>
            <Lead>{c.begin}</Lead>
            <p className="mt-4">{c.ways.body}</p>
          </div>
        </Reveal>
        <div className="mt-14 border-b border-ink/25">
          {c.services.map((s, n) => (
            <Reveal key={s.name}>
              <article
                id={slug(s.name)}
                data-service
                className="grid scroll-mt-40 gap-x-10 gap-y-4 border-t border-ink/25 py-8 transition-colors duration-300 target:bg-paper md:px-3 lg:grid-cols-12"
              >
                <div className="flex items-baseline gap-4 lg:col-span-4">
                  <span className="display text-[1.3rem] text-sage-text">{String(n + 1).padStart(2, "0")}</span>
                  <h3 className="display text-[clamp(1.7rem,2.4vw,2.1rem)] leading-tight">{s.name}</h3>
                </div>
                <p className="lg:col-span-4">{s.body}</p>
                <div className="lg:col-span-4">
                  <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-sage-ink">Possible outputs</p>
                  <p className="mt-2 text-[15.5px]">{s.outputs}</p>
                  <Go href={enquiry2(s.name)} className="mt-5">
                    Discuss {s.name}
                  </Go>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Block>

      {/* Engagement formats */}
      <Block n="02" label="Engagement" tint>
        <Reveal className="max-w-[52rem]">
          <H>
            How an engagement can <em>take shape</em>
          </H>
        </Reveal>
        <ol className="mt-10 grid border-l border-t border-line bg-white sm:grid-cols-2 lg:grid-cols-4">
          {c.shape.items.map((it, n) => (
            <li key={it} className="border-b border-r border-line p-6 md:p-7">
              <span className="display text-[2.2rem] leading-none text-sage-text">{n + 1}</span>
              <p className="mt-5 text-[16px] leading-relaxed">{it}</p>
            </li>
          ))}
        </ol>
        <Lead className="mt-8 max-w-[46rem]">{c.shape.foot}</Lead>
      </Block>

      {/* SAGE OS */}
      <Block id="process" n="03" label={c.process.title}>
        <Reveal className="mb-16 grid gap-x-14 gap-y-6 lg:grid-cols-2">
          <H>
            SAGE OS provides the <em>structure</em>
          </H>
          <p>{c.process.lead}</p>
        </Reveal>
        <Loop steps={c.process.steps} close={c.process.foot} />
      </Block>

      <ClosingBand
        title={c.closing.title}
        body={c.closing.body}
        cta="Start a Conversation"
        second={{ label: "Research and evidence", href: r2.research }}
      />
    </>
  );
}
