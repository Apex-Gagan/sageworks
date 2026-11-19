import type { Metadata } from "next";
import { Reveal } from "@/components/shared/Motion";
import { Button, Lead, Note } from "@/components/site/ui";
import { Block, ClosingBand, H, Loop, PageTop } from "@/components/two/kit";
import { SenseGrid } from "@/components/two/SenseGrid";
import { senses, sensesIntro, sensesPage as c } from "@/content/senses";
import { lensColour, type LensName } from "@/content/site";
import { photo, r2 } from "@/content/two";

export const metadata: Metadata = {
  title: "The Five Senses",
  description: sensesIntro.lead,
};

/** The Five Senses (content master, Page 4), in the Design 2 layout. */
export default function FiveSensesTwo() {
  return (
    <>
      <PageTop
        n="04"
        label={sensesIntro.kicker}
        title={
          <>
            How the environment communicates with <em>the body</em>
          </>
        }
        lead={sensesIntro.lead}
        banner={photo.senses}
        bannerPos="50% 58%"
      >
        <Button href={r2.work}>Work With Sagework</Button>
        <Button href={r2.research} tone="outline">
          Research and evidence
        </Button>
      </PageTop>

      <Block label="Where it starts">
        <div className="grid gap-x-14 gap-y-8 lg:grid-cols-2">
          <Reveal>
            <H>{c.begin.title}</H>
          </Reveal>
          <Reveal delay={0.1}>
            <Lead>{c.begin.body[0]}</Lead>
            <p className="mt-5">{c.begin.body[1]}</p>
          </Reveal>
        </div>
      </Block>

      {/* The five senses, each led by its number */}
      <Block id="senses" n="01" label="Sight, sound, smell, taste, touch" tint>
        <Reveal className="mb-10 max-w-[52rem]">
          <H>
            Five senses, <em>one number each</em>
          </H>
          <p className="mt-6">{sensesIntro.body}</p>
        </Reveal>
        <SenseGrid detailed items={senses.map(({ name, line, figure, figureLabel, finding, source, body, practice }) => ({ name, line, figure, figureLabel, finding, source, body, practice }))} />
      </Block>

      {/* The senses work together; three lenses */}
      <Block n="02" label="One experience">
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <H>
              The senses work <em>together</em>
            </H>
            <p className="mt-7">{c.together.body[0]}</p>
            <p className="mt-4">{c.together.body[1]}</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <p className="display text-[1.5rem]">{c.lenses.title}</p>
            <ul className="mt-6 border-b border-line">
              {c.lenses.items.map((l) => (
                <li key={l.name} className="grid grid-cols-[9.5rem_1fr] gap-4 border-t border-line py-4">
                  <span className="flex items-center gap-2.5 self-start text-[15px] font-semibold text-ink-deep">
                    <span className={`h-3 w-3 rounded-full ${lensColour[l.name as LensName].dot}`} />
                    {l.name}
                  </span>
                  <span className="text-[15.5px]">
                    {l.name} {l.body}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[15.5px] text-ink-soft">{c.lenses.close}</p>
          </Reveal>
        </div>
      </Block>

      {/* From understanding to implementation */}
      <Block n="03" label="SAGE OS" tint>
        <Reveal className="mb-16 grid gap-x-14 gap-y-6 lg:grid-cols-2">
          <H>
            From understanding to <em>implementation</em>
          </H>
          <div>
            <p>{c.implement.body[0]}</p>
            <p className="mt-4">{c.implement.body[1]}</p>
          </div>
        </Reveal>
        <Loop steps={c.os.map((s) => ({ name: s.name, body: `${s.name} ${s.body}` }))} close={c.measures} />
      </Block>

      {/* White paper 02 */}
      <Block n="04" label={c.paper.kicker}>
        <Reveal>
          <div data-paper-card className="grid border border-line md:grid-cols-12">
            <div className="flex items-end bg-mint p-7 md:col-span-3 md:p-9">
              <p className="display text-[clamp(4rem,9vw,7rem)] leading-none text-ink-deep">02</p>
            </div>
            <div className="p-7 md:col-span-5 md:p-9">
              <h2 className="display text-[clamp(1.8rem,3vw,2.5rem)]">{c.paper.title}</h2>
              <p className="mt-2 text-[15.5px] font-semibold">{c.paper.sub}</p>
              <p className="mt-5">{c.paper.body}</p>
            </div>
            <div className="border-t border-line p-7 md:col-span-4 md:border-l md:border-t-0 md:p-9">
              <Button href={`${r2.research}#white-papers`}>Research and evidence</Button>
              <Note className="mt-6" why="the paper is listed in the white-paper programme but no file or summary has been shared.">
                The executive summary and the paper itself for White Paper 02.
              </Note>
            </div>
          </div>
        </Reveal>
      </Block>

      <ClosingBand title={c.closing.title} body={c.closing.body} cta="Start a Conversation" />
    </>
  );
}
