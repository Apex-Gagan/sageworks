import type { Metadata } from "next";
import { Pic } from "@/components/shared/Pic";
import { Reveal } from "@/components/shared/Motion";
import { Button, Lead } from "@/components/site/ui";
import { GapDiagram, StatLine } from "@/components/two/diagrams";
import { Block, ClosingBand, ExploreRows, Go, H, Loop, PageTop } from "@/components/two/kit";
import { Venn } from "@/components/two/Venn";
import { applies, presentNeed, sageOs } from "@/content/discover";
import { work } from "@/content/home";
import { discoverPage as c } from "@/content/pages";
import { lensColour, tagline, type LensName } from "@/content/site";
import { photo, r2 } from "@/content/two";

export const metadata: Metadata = {
  title: "Discover Sagework",
  description: c.lead,
};

const lensHex: Record<LensName, string> = { Biology: "#9aca28", Environment: "#40b49d", Behaviour: "#edaa1f" };

/** The short list under each lens, from the founder page's three lenses. */
const detail: Record<LensName, string> = {
  Biology: "Nutrition, the gut microbiome, metabolism, sleep, stress physiology, circadian rhythms and preventive health.",
  Environment:
    "Light, sound, air, food, nature, movement, sensory experience and the places in which people live, learn, work, heal and age.",
  Behaviour: "Habits, routines, relationships, culture, purpose, incentives and the actions that become part of everyday life.",
};

/** Discover Sagework (content master, Page 3), in the Design 2 layout. */
export default function DiscoverTwo() {
  return (
    <>
      <PageTop
        n="01"
        label={c.eyebrow}
        title={
          <>
            Designing human systems for health, resilience and <em>performance</em>
          </>
        }
        lead={c.lead}
        banner={photo.discover}
        bannerPos="50% 62%"
      >
        <Button href={r2.contact}>Start a Conversation</Button>
        <Button href="#approach" tone="outline">
          Explore Our Approach
        </Button>
      </PageTop>

      <Block label={tagline}>
        <div className="grid gap-x-14 gap-y-8 lg:grid-cols-2">
          <Reveal>
            <H as="p">{c.pull}</H>
          </Reveal>
          <Reveal delay={0.1}>
            <Lead>{c.body}</Lead>
          </Reveal>
        </div>
      </Block>

      {/* The present need */}
      <Block id="need" n="01" label={c.need.eyebrow} tint>
        <Reveal className="max-w-[58rem]">
          <H>
            Modern systems are changing faster than <em>human biology</em>
          </H>
        </Reveal>
        <div className="mt-12 grid gap-x-14 gap-y-10 lg:grid-cols-2">
          <Reveal>
            <GapDiagram demand="What modern systems demand from people" need="What human biology needs to function well" gap="The Human Adaptation Gap" />
          </Reveal>
          <Reveal delay={0.1}>
            <Lead>{presentNeed.gap}</Lead>
            <p className="mt-5">{c.need.body[0]}</p>
            <p className="mt-4">{c.need.body[1]}</p>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-x-14 gap-y-10 border-t border-line pt-10 lg:grid-cols-2">
          <Reveal>
            <p>{c.need.silos}</p>
            <p className="display mt-5 text-[1.5rem] text-ink-deep">{c.need.close}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <StatLine
              labels={["Sleep and fatigue", "Stress and attention", "Metabolic health"]}
              about="Percentages for the effects named here: disrupted sleep, fatigue, persistent stress, reduced concentration and poorer metabolic health."
            />
          </Reveal>
        </div>
      </Block>

      {/* Our approach */}
      <Block id="approach" n="02" label={c.approach.eyebrow}>
        <Reveal className="max-w-[58rem]">
          <H>
            The SAGE Triad: one human system, <em>three connected forces</em>
          </H>
          <Lead className="mt-7 max-w-[46rem]">{c.approach.lead}</Lead>
        </Reveal>
        <Reveal className="mt-12">
          <Venn
            centre="One human system"
            circles={c.approach.lenses.map((l) => ({
              name: l.name,
              question: l.question,
              body: l.body,
              detail: detail[l.name as LensName],
              colour: lensHex[l.name as LensName],
              dot: lensColour[l.name as LensName].dot,
            }))}
          />
        </Reveal>
        <Reveal className="mt-12">
          <p className="display max-w-[46rem] text-[1.45rem] md:text-[1.7rem]">{c.approach.close}</p>
        </Reveal>
      </Block>

      {/* What we do */}
      <Block id="services" n="03" label={c.does.eyebrow} tint>
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <H>
              Turning evidence into <em>systems change</em>
            </H>
            <p className="mt-7">{c.does.body}</p>
            <Button href={r2.work} className="mt-8">
              Explore Ways to Work Together
            </Button>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <dl className="grid gap-x-10 border-b border-line sm:grid-cols-2">
              {work.services.map((s, n) => (
                <div key={s.name} className="border-t border-line py-5">
                  <dt className="flex items-baseline gap-3">
                    <span className="display text-[1.1rem] text-sage-text">{String(n + 1).padStart(2, "0")}</span>
                    <span className="text-[1.08rem] font-semibold text-ink-deep">{s.name}</span>
                  </dt>
                  <dd className="mt-2 text-[15px] leading-relaxed">{s.body}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Block>

      {/* SAGE OS */}
      <Block id="sage-os" n="04" label="SAGE OS">
        <Reveal className="mb-16 max-w-[52rem]">
          <H>
            A disciplined framework from <em>diagnosis to action</em>
          </H>
          <p className="mt-7">{sageOs.body}</p>
        </Reveal>
        <Loop
          steps={sageOs.steps}
          returns="Learning runs through every stage"
          close={`${sageOs.close.replace("Learning runs through every stage. ", "")} ${c.sageOsFoot}`}
        />
      </Block>

      {/* Where Sagework applies */}
      <Block id="where" n="05" label="Where Sagework applies" tint link={<Go href={r2.gallery}>See these settings in the photo gallery</Go>}>
        <Reveal className="max-w-[52rem]">
          <H>
            Health is shaped wherever people <em>spend their lives</em>
          </H>
          <p className="mt-6">{applies.lead}</p>
        </Reveal>
        <ol className="mt-10 border-b border-line">
          {applies.items.map((a, n) => (
            <li key={a.name} className="grid gap-x-10 gap-y-2 border-t border-line py-5 md:grid-cols-12 md:items-baseline">
              <span className="display text-[1.15rem] text-sage-text md:col-span-1">{String(n + 1).padStart(2, "0")}</span>
              <h3 className="display text-[1.5rem] leading-tight md:col-span-5">{a.name}</h3>
              <p className="text-[15.5px] md:col-span-6">{a.body}</p>
            </li>
          ))}
        </ol>
      </Block>

      {/* Why Sagework */}
      <Block id="why" n="06" label={c.why.eyebrow}>
        <div className="grid items-center gap-x-14 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <H>
              Scientific authority backed by <em>cross sector execution</em>
            </H>
            <p className="mt-7">{c.why.body[0]}</p>
            <p className="mt-4">{c.why.body[2]}</p>
            <Button href={r2.founder} tone="outline" className="mt-8">
              Meet the Founder
            </Button>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <Pic k={photo.discoverWhy} ratio="4 / 3" sizes="(min-width: 1024px) 40vw, 100vw" />
          </Reveal>
        </div>
      </Block>

      <Block label="Evidence and public knowledge" className="pt-0!">
        <Reveal className="mb-10">
          <H size="md">Research evidence and public education</H>
        </Reveal>
        <ExploreRows />
      </Block>

      <ClosingBand />
    </>
  );
}
