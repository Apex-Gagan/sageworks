import type { Metadata } from "next";
import { Reveal } from "@/components/shared/Motion";
import { Accordion } from "@/components/site/Accordion";
import { PaperRequest, Subscribe } from "@/components/site/Forms";
import { Closing, LeafList } from "@/components/site/sections";
import { Button, Eyebrow, Lead, Note, PageHero, Section, Title } from "@/components/site/ui";
import { evidenceNotes } from "@/content/discover";
import { researchLinks } from "@/content/founder";
import { researchPage as c } from "@/content/pages";
import { contactEmail, routes } from "@/content/site";

export const metadata: Metadata = {
  title: "Research and evidence",
  description: c.lead,
};

/**
 * Research and evidence (content master, Page 6). Publications and papers sit in
 * lists that open on request. White papers follow the hybrid model the client chose:
 * an open executive summary, and the full paper after the reader leaves a few details.
 */
export default function Research() {
  return (
    <>
      <PageHero
        eyebrow={c.eyebrow}
        title={
          <>
            The research behind <em>the perspective</em>
          </>
        }
        lead={c.lead}
      >
        <Button href="#white-papers">Sagework white papers</Button>
        <Button href="#publications" tone="outline">
          Academic publications
        </Button>
      </PageHero>

      {/* Academic research */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <Reveal>
            <Eyebrow>{c.academic.eyebrow}</Eyebrow>
            <Title className="mt-5">
              From early-life biology to a connected understanding of <em>health</em>
            </Title>
          </Reveal>
          <Reveal delay={0.1}>
            <Lead>{c.academic.body[0]}</Lead>
            <p className="mt-5">{c.academic.body[1]}</p>
            <p className="mt-5">Explore her doctoral thesis and related academic publications below.</p>
            <div data-research-buttons className="mt-8 flex flex-wrap gap-3">
              <Button href={researchLinks[0].href} external>
                Read the PhD Thesis
              </Button>
              <Button href={researchLinks[1].href} tone="outline" external>
                View ResearchGate Profile
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Publications */}
      <Section id="publications" className="wash-sage">
        <Reveal className="mb-10 max-w-[46rem]">
          <Eyebrow>Academic publications</Eyebrow>
          <Title className="mt-5">
            Published research and <em>original sources</em>
          </Title>
        </Reveal>
        <Accordion
          items={c.publications.items.map((p, n) => ({
            id: `publication-${n + 1}`,
            tag: p.year,
            title: p.title,
            sub: p.journal,
            content: (
              <>
                <p>{p.body}</p>
                <p className="mt-3 text-[14px] text-ink-soft">Link to the publication to be added.</p>
              </>
            ),
          }))}
        />
        <div className="mt-14">
          <p className="eyebrow">Research papers and preprints</p>
          <h3 className="display mt-4 text-[1.9rem]">{c.preprints.title}</h3>
          <p className="mt-4 max-w-[52rem] text-[15.5px]">{c.preprints.note}</p>
          <div className="mt-6">
            <Accordion
              items={c.preprints.items.map((p, n) => ({
                id: `preprint-${n + 1}`,
                tag: "Pre",
                title: p.title,
                sub: "Shruti Pai | Preprints.org",
                content: (
                  <>
                    <p>{p.body}</p>
                    <p className="mt-3 text-[14px] text-ink-soft">Link to the manuscript to be added.</p>
                  </>
                ),
              }))}
            />
          </div>
          <Note className="mt-6 max-w-[52rem]" why="each entry ends with a Read the publication or View the manuscript link in the content master.">
            The web address or DOI for each of the five publications and three preprints.
          </Note>
        </div>
      </Section>

      {/* White papers */}
      <Section id="white-papers">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>{c.papers.eyebrow}</Eyebrow>
            <Title className="mt-5">
              Connecting evidence with <em>human systems</em>
            </Title>
            <p className="mt-7">{c.papers.body}</p>
            <div className="mt-8 border-t border-line pt-8">
              <p className="text-[15px] font-semibold">How access works</p>
              <LeafList
                className="mt-4"
                items={[
                  "Each paper opens with an executive summary anyone can read.",
                  "The full paper is sent after you leave your name, occupation and email address.",
                  "You can also subscribe to receive new white papers and the newsletter.",
                ]}
              />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="space-y-14">
            {c.papers.series.map((s) => (
              <div key={s.id} id={s.id} className="scroll-mt-28">
                <h3 className="display text-[2rem]">{s.name}</h3>
                <p className="mt-1.5 text-[15.5px] font-medium">{s.line}</p>
                <div className="mt-6">
                  <Accordion
                    items={s.papers.map((p) => ({
                      id: `${s.id}-${p.code}`,
                      tag: p.code,
                      title: p.title,
                      content: (
                        <>
                          <p>{p.question}</p>
                          <p className="mt-3 text-[14px] text-ink-soft">Executive summary to be added. Publication status will be shown here.</p>
                          <div className="mt-4">
                            <PaperRequest paper={`${s.name} ${p.code}: ${p.title}`} to={contactEmail} />
                          </div>
                        </>
                      ),
                    }))}
                  />
                </div>
                <p className="mt-5 text-[15px] text-ink-soft">{s.foot}</p>
              </div>
            ))}
            <Note why="the content master says each paper's availability and publication status will be clearly identified.">
              For each of the thirteen papers: an executive summary, the paper as a PDF if it is ready, and its status (published, in
              review or in development).
            </Note>
          </Reveal>
        </div>
      </Section>

      {/* Subscribe */}
      <section id="subscribe" className="pb-6 md:pb-10">
        <div className="mx-auto w-full max-w-[1320px] px-5 md:px-10">
          <div className="leafcut grid gap-10 bg-mint p-8 text-ink-deep md:p-14 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="eyebrow text-ink-deep">Stay informed</p>
              <h2 className="display mt-5 text-[clamp(2rem,3.4vw,2.9rem)]">New white papers and the Sagework newsletter</h2>
            </div>
            <div>
              <Subscribe to={contactEmail} />
              <Note
                label="Decision needed"
                className="mt-5 bg-white/70"
                why="Sagework has no newsletter service yet and asked for a suggestion."
              >
                Our suggestion: one mailing service, such as Brevo or Mailchimp, for both the newsletter and the white-paper requests, so
                every sign-up lands in one list. Until it is chosen, this form opens an email instead.
              </Note>
            </div>
          </div>
        </div>
      </section>

      {/* Evidence library, articles, books */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Evidence library</Eyebrow>
            <Title className="mt-5">
              Follow the sources behind <em>the ideas</em>
            </Title>
            <p className="mt-7">{evidenceNotes[2].body}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {c.library.topics.map((t) => (
                <li key={t} className="rounded-full border border-line px-4 py-2 text-[14.5px] font-medium">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="space-y-8">
            {c.more.map((m) => (
              <div key={m.title} className="border-t border-line pt-6">
                <h3 className="display text-[1.8rem]">{m.title}</h3>
                <p className="mt-1.5 text-[15.5px] font-medium">{m.sub}</p>
                <p className="mt-3">{m.body}</p>
              </div>
            ))}
            <Note why="these three sections are described in the content master but nothing has been published in them yet.">
              The first entries for the evidence library, articles and books, or confirmation that these sections wait for a later phase.
            </Note>
          </Reveal>
        </div>
      </Section>

      {/* How we work with evidence */}
      <Section className="wash-sage" tight>
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          {evidenceNotes.slice(0, 2).map((e, n) => (
            <Reveal key={e.title} delay={n * 0.08}>
              <p className="eyebrow">{e.title}</p>
              <h3 className="display mt-4 text-[1.9rem]">{e.sub}</h3>
              <p className="mt-5">{e.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Closing second={{ label: "Explore the Five Senses", href: routes.senses }} />
    </>
  );
}
