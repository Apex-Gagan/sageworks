import type { Metadata } from "next";
import { imageData, Pic } from "@/components/shared/Pic";
import { Reveal } from "@/components/shared/Motion";
import { Senses } from "@/components/site/Senses";
import { Closing, SageOs } from "@/components/site/sections";
import { Button, Eyebrow, Lead, Note, PageHero, Section, Title } from "@/components/site/ui";
import { senses, sensesIntro, sensesPage as c } from "@/content/senses";
import { lensColour, routes, type LensName } from "@/content/site";

export const metadata: Metadata = {
  title: "The Five Senses",
  description: sensesIntro.lead,
};

/** The Five Senses (content master, Page 4). */
export default function FiveSenses() {
  return (
    <>
      <PageHero
        eyebrow={sensesIntro.kicker}
        title={
          <>
            How the environment communicates with <em>the body</em>
          </>
        }
        lead={sensesIntro.lead}
        aside={
          <Reveal delay={0.1}>
            <Pic k="people/group-walk" ratio="4 / 3" className="leafcut" preload sizes="(min-width: 1024px) 44vw, 100vw" />
          </Reveal>
        }
      >
        <Button href={routes.work}>Work With Sagework</Button>
        <Button href={routes.research} tone="outline">
          Research and evidence
        </Button>
      </PageHero>

      <Section tight>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Title size="md">{c.begin.title}</Title>
          </Reveal>
          <Reveal delay={0.1}>
            <Lead>{c.begin.body[0]}</Lead>
            <p className="mt-5">{c.begin.body[1]}</p>
          </Reveal>
        </div>
      </Section>

      {/* The five senses, one at a time, each led by its number */}
      <Section id="senses" className="wash-sage">
        <Reveal className="mb-10 max-w-[46rem]">
          <Eyebrow>Sight, sound, smell, taste, touch</Eyebrow>
          <Title className="mt-5">
            Five senses, <em>one number each</em>
          </Title>
          <p className="mt-6">{sensesIntro.body}</p>
        </Reveal>
        <Senses
          detailed
          items={senses.map((s) => {
            const img = imageData(s.image);
            return { ...s, src: img.src, blur: img.blur, alt: img.alt };
          })}
        />
      </Section>

      {/* The senses work together; three lenses */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>One experience</Eyebrow>
            <Title className="mt-5">
              The senses work <em>together</em>
            </Title>
            <p className="mt-7">{c.together.body[0]}</p>
            <p className="mt-4">{c.together.body[1]}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">{c.lenses.title}</p>
            <ul className="mt-6 space-y-2">
              {c.lenses.items.map((l) => (
                <li key={l.name} className={`${lensColour[l.name as LensName].soft} p-5 text-ink-deep`}>
                  <span className="flex items-center gap-2.5 text-[15px] font-semibold">
                    <span className={`h-2.5 w-2.5 rounded-full ${lensColour[l.name as LensName].dot}`} />
                    {l.name}
                  </span>
                  <span className="mt-1.5 block text-[15.5px] leading-relaxed">
                    {l.name} {l.body}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6">{c.lenses.close}</p>
          </Reveal>
        </div>
      </Section>

      {/* From understanding to implementation */}
      <Section className="wash-sage">
        <Reveal className="mb-12 max-w-[48rem]">
          <Eyebrow>SAGE OS</Eyebrow>
          <Title className="mt-5">
            From understanding to <em>implementation</em>
          </Title>
          <p className="mt-7">{c.implement.body[0]}</p>
          <p className="mt-4">{c.implement.body[1]}</p>
        </Reveal>
        <SageOs steps={c.os.map((s) => ({ name: s.name, body: `${s.name} ${s.body}` }))} close={c.measures} />
      </Section>

      {/* White paper 02 */}
      <Section tight>
        <Reveal>
          <div className="leafcut grid gap-8 bg-aqua-soft p-8 text-ink-deep md:p-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="eyebrow text-ink-deep">{c.paper.kicker}</p>
              <h2 className="display mt-5 text-[clamp(2rem,3.6vw,3rem)]">{c.paper.title}</h2>
              <p className="mt-2 text-[1.1rem] font-medium">{c.paper.sub}</p>
              <p className="mt-5 max-w-[38rem]">{c.paper.body}</p>
            </div>
            <div>
              <Button href={`${routes.research}#white-papers`} tone="white">
                Research and evidence
              </Button>
              <Note className="mt-5 bg-white/70" why="the paper is listed in the white-paper programme but no file or summary has been shared.">
                The executive summary and the paper itself for White Paper 02.
              </Note>
            </div>
          </div>
        </Reveal>
      </Section>

      <Closing title={c.closing.title} body={c.closing.body} cta="Start a Conversation" />
    </>
  );
}
