import type { Metadata } from "next";
import { Pic } from "@/components/shared/Pic";
import { Reveal } from "@/components/shared/Motion";
import { Closing, LeafList, SageOs } from "@/components/site/sections";
import { Button, Eyebrow, Lead, PageHero, Section, TextLink, Title } from "@/components/site/ui";
import { workPage as c } from "@/content/pages";
import { enquiryHref, routes } from "@/content/site";

export const metadata: Metadata = {
  title: "Work with Sagework",
  description: c.lead,
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/**
 * Work with Sagework (content master, Page 7). Order as the client's designer note
 * asks: hero, audience strip, six service cards with descriptions and possible outputs
 * visible, engagement formats, SAGE OS process, closing invitation.
 */
export default function Work() {
  return (
    <>
      <PageHero
        eyebrow={c.eyebrow}
        title={
          <>
            Build health and performance into the way your organisation <em>works</em>
          </>
        }
        lead={c.lead}
        aside={
          <Reveal delay={0.1}>
            <Pic k="founder/team-table" ratio="4 / 3" className="leafcut" preload sizes="(min-width: 1024px) 44vw, 100vw" />
          </Reveal>
        }
      >
        <Button href={routes.contact}>Start a Conversation</Button>
        <Button href="#services" tone="outline">
          Explore Our Services
        </Button>
      </PageHero>

      {/* Audience strip */}
      <section className="border-y border-line">
        <div className="mx-auto grid w-full max-w-[1320px] gap-6 px-5 py-9 md:px-10 lg:grid-cols-[14rem_1fr] lg:items-center">
          <p className="eyebrow">{c.audience.title}</p>
          <ul className="flex flex-wrap gap-2">
            {c.audience.items.map((a) => (
              <li key={a} className="rounded-full border border-line px-4 py-2 text-[14.5px] font-medium">
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Six services */}
      <Section id="services">
        <Reveal className="mb-12 max-w-[48rem]">
          <Eyebrow>{c.ways.title}</Eyebrow>
          <Title className="mt-5">
            Six ways to work <em>together</em>
          </Title>
          <p className="mt-7">{c.begin}</p>
          <p className="mt-4">{c.ways.body}</p>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {c.services.map((s, n) => (
            <Reveal key={s.name} delay={(n % 3) * 0.06} className="h-full">
              <article
                id={slug(s.name)}
                data-service
                className="flex h-full scroll-mt-28 flex-col border border-line bg-white p-7 md:p-8"
              >
                <span className="text-[12.5px] font-semibold tracking-[0.14em] text-sage-ink">{String(n + 1).padStart(2, "0")}</span>
                <h3 className="display mt-4 text-[1.8rem] leading-tight">{s.name}</h3>
                <p className="mt-4 text-[15.5px] leading-relaxed">{s.body}</p>
                <div className="mt-6 bg-paper p-4">
                  <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-sage-ink">Possible outputs</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed">{s.outputs}</p>
                </div>
                <div className="mt-auto pt-7">
                  <TextLink href={enquiryHref(s.name)}>Discuss {s.name}</TextLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Engagement formats */}
      <Section className="wash-sage">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Engagement</Eyebrow>
            <Title className="mt-5">
              How an engagement can <em>take shape</em>
            </Title>
          </Reveal>
          <Reveal delay={0.1}>
            <LeafList items={c.shape.items} />
            <Lead className="mt-8 border-t border-line pt-8">{c.shape.foot}</Lead>
          </Reveal>
        </div>
      </Section>

      {/* SAGE OS */}
      <Section id="process">
        <Reveal className="mb-12 max-w-[48rem]">
          <Eyebrow>{c.process.title}</Eyebrow>
          <Title className="mt-5">
            SAGE OS provides the <em>structure</em>
          </Title>
          <p className="mt-7">{c.process.lead}</p>
        </Reveal>
        <SageOs steps={c.process.steps} close={c.process.foot} />
      </Section>

      <Closing
        title={c.closing.title}
        body={c.closing.body}
        cta="Start a Conversation"
        second={{ label: "Research and evidence", href: routes.research }}
      />
    </>
  );
}
