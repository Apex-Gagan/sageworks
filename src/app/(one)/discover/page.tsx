import type { Metadata } from "next";
import { imageData, Pic } from "@/components/shared/Pic";
import { Reveal } from "@/components/shared/Motion";
import { Triad } from "@/components/site/Triad";
import { Closing, ExploreCards, SageOs, StatSlots } from "@/components/site/sections";
import { Button, Eyebrow, Lead, PageHero, Section, TextLink, Title } from "@/components/site/ui";
import { applies, presentNeed, sageOs } from "@/content/discover";
import { work } from "@/content/home";
import { discoverPage as c } from "@/content/pages";
import { lensColour, routes, tagline, type LensName } from "@/content/site";

export const metadata: Metadata = {
  title: "Discover Sagework",
  description: c.lead,
};

const lensImage = {
  Biology: "hospitality/wgsha-kitchen-red",
  Environment: "hospitals/mangalore-spiral-reception",
  Behaviour: "academic/classroom-students",
} as const;

export default function Discover() {
  return (
    <>
      <PageHero
        eyebrow={c.eyebrow}
        title={
          <>
            Designing human systems for health, resilience and <em>performance</em>
          </>
        }
        lead={c.lead}
        aside={
          <Reveal delay={0.1}>
            <Pic k="academic/msap-exterior" ratio="4 / 3" className="leafcut" preload sizes="(min-width: 1024px) 44vw, 100vw" />
          </Reveal>
        }
      >
        <Button href={routes.contact}>Start a Conversation</Button>
        <Button href="#approach" tone="outline">
          Explore Our Approach
        </Button>
      </PageHero>

      <Section tight>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">{tagline}</p>
            <p className="display mt-6 text-[clamp(1.8rem,3.2vw,2.7rem)]">{c.pull}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Lead>{c.body}</Lead>
          </Reveal>
        </div>
      </Section>

      {/* The present need */}
      <Section id="need" className="wash-sage">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <Reveal>
            <Eyebrow>{c.need.eyebrow}</Eyebrow>
            <Title className="mt-5">
              Modern systems are changing faster than <em>human biology</em>
            </Title>
            <p className="mt-8">{c.need.body[0]}</p>
            <p className="mt-4">{c.need.body[1]}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Lead>{presentNeed.gap}</Lead>
            <p className="mt-5">{c.need.silos}</p>
            <p className="display mt-7 text-[1.5rem]">{c.need.close}</p>
            <div className="mt-10">
              <StatSlots
                labels={["Sleep and fatigue", "Stress and attention", "Metabolic health"]}
                about="Percentages for the effects named here: disrupted sleep, fatigue, persistent stress, reduced concentration and poorer metabolic health."
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Our approach */}
      <Section id="approach">
        <Reveal className="max-w-[50rem]">
          <Eyebrow>{c.approach.eyebrow}</Eyebrow>
          <Title className="mt-5">
            The SAGE Triad: one human system, <em>three connected forces</em>
          </Title>
          <Lead className="mt-7">{c.approach.lead}</Lead>
        </Reveal>
        <Reveal className="mt-12">
          <Triad
            lenses={c.approach.lenses.map((l) => {
              const img = imageData(lensImage[l.name as LensName]);
              return {
                name: l.name,
                question: l.question,
                body: l.body,
                detail: detail[l.name as LensName],
                bg: lensColour[l.name as LensName].bg,
                src: img.src,
                blur: img.blur,
                alt: img.alt,
              };
            })}
          />
        </Reveal>
        <Reveal className="mt-10">
          <p className="display max-w-[46rem] text-[1.45rem] md:text-[1.7rem]">{c.approach.close}</p>
        </Reveal>
      </Section>

      {/* What we do */}
      <Section id="services" className="wash-sage">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>{c.does.eyebrow}</Eyebrow>
            <Title className="mt-5">
              Turning evidence into <em>systems change</em>
            </Title>
            <p className="mt-7 max-w-[34rem]">{c.does.body}</p>
            <Button href={routes.work} className="mt-9">
              Explore Ways to Work Together
            </Button>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="border-t border-line">
              {work.services.map((s) => (
                <div key={s.name} className="grid gap-2 border-b border-line py-5 md:grid-cols-[14rem_1fr] md:gap-8">
                  <dt className="display text-[1.4rem] leading-tight">{s.name}</dt>
                  <dd className="text-[15.5px] leading-relaxed">{s.body}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* SAGE OS */}
      <Section id="sage-os">
        <Reveal className="mb-12 max-w-[48rem]">
          <Eyebrow>SAGE OS</Eyebrow>
          <Title className="mt-5">
            A disciplined framework from <em>diagnosis to action</em>
          </Title>
          <p className="mt-7">{sageOs.body}</p>
        </Reveal>
        <SageOs steps={sageOs.steps} close={`${sageOs.close} ${c.sageOsFoot}`} />
      </Section>

      {/* Where Sagework applies */}
      <Section id="where" className="wash-sage">
        <Reveal className="mb-12 max-w-[48rem]">
          <Eyebrow>Where Sagework applies</Eyebrow>
          <Title className="mt-5">
            Health is shaped wherever people <em>spend their lives</em>
          </Title>
          <p className="mt-7">{applies.lead}</p>
        </Reveal>
        <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {applies.items.map((a, n) => (
            <li key={a.name} className="bg-white p-7">
              <span className="text-[12.5px] font-semibold tracking-[0.14em] text-sage-ink">{String(n + 1).padStart(2, "0")}</span>
              <h3 className="display mt-4 text-[1.5rem] leading-tight">{a.name}</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed">{a.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <TextLink href={routes.gallery}>See these settings in the photo gallery</TextLink>
        </div>
      </Section>

      {/* Why Sagework */}
      <Section id="why">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <Pic k="people/group-listening" ratio="4 / 3" className="leafcut" sizes="(min-width: 1024px) 40vw, 100vw" />
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>{c.why.eyebrow}</Eyebrow>
            <Title className="mt-5">
              Scientific authority backed by <em>cross sector execution</em>
            </Title>
            <p className="mt-7">{c.why.body[0]}</p>
            <p className="mt-4">{c.why.body[2]}</p>
            <Button href={routes.founder} tone="outline" className="mt-8">
              Meet the Founder
            </Button>
          </Reveal>
        </div>
      </Section>

      <Section className="wash-sage" tight>
        <Reveal className="mb-10">
          <Eyebrow>Evidence and public knowledge</Eyebrow>
          <Title size="md" className="mt-4">
            Research evidence and public education
          </Title>
        </Reveal>
        <ExploreCards />
      </Section>

      <Closing />
    </>
  );
}

/** The short list under each lens, from the founder page's three lenses. */
const detail: Record<LensName, string> = {
  Biology: "Nutrition, the gut microbiome, metabolism, sleep, stress physiology, circadian rhythms and preventive health.",
  Environment:
    "Light, sound, air, food, nature, movement, sensory experience and the places in which people live, learn, work, heal and age.",
  Behaviour: "Habits, routines, relationships, culture, purpose, incentives and the actions that become part of everyday life.",
};
