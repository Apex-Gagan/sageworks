import type { Metadata } from "next";
import { Reveal } from "@/components/shared/Motion";
import { PaperRequest, Subscribe } from "@/components/site/Forms";
import { Button, Lead, Note } from "@/components/site/ui";
import { Bar, Block, ClosingBand, H, PageTop, Ticks, W } from "@/components/two/kit";
import { Rows } from "@/components/two/Rows";
import { evidenceNotes } from "@/content/discover";
import { researchLinks } from "@/content/founder";
import { researchPage as c } from "@/content/pages";
import { contactEmail } from "@/content/site";
import { r2 } from "@/content/two";

export const metadata: Metadata = {
  title: "Research and evidence",
  description: c.lead,
};

const parts = [
  { href: "#academic", label: "Academic research" },
  { href: "#publications", label: "Publications" },
  { href: "#white-papers", label: "White papers" },
  { href: "#subscribe", label: "Stay informed" },
  { href: "#library", label: "Evidence library" },
];

/**
 * Research and evidence (content master, Page 6), in the Design 2 layout. A line of
 * links at the top leads to each part. Publications and papers are ruled rows that
 * open on request; the two white-paper series sit side by side. White papers follow
 * the hybrid model the client chose: an open summary, the full paper on request.
 */
export default function ResearchTwo() {
  return (
    <>
      <PageTop
        n="06"
        label={c.eyebrow}
        title={
          <>
            The research behind <em>the perspective</em>
          </>
        }
        lead={c.lead}
      />

      <W>
        <nav aria-label="On this page" data-page-index className="no-scrollbar flex gap-2 overflow-x-auto border-y border-line py-3">
          {parts.map((p, n) => (
            <a
              key={p.href}
              href={p.href}
              className="flex shrink-0 items-baseline gap-2.5 rounded-full px-4 py-2 text-[15px] font-medium transition-colors duration-300 hover:bg-paper hover:text-sage-ink"
            >
              <span className="display text-[1rem] text-sage-text">{String(n + 1).padStart(2, "0")}</span>
              {p.label}
            </a>
          ))}
        </nav>
      </W>

      {/* Academic research */}
      <Block id="academic" n="01" label={c.academic.eyebrow}>
        <div className="grid gap-x-14 gap-y-8 lg:grid-cols-2">
          <Reveal>
            <H>
              From early-life biology to a connected understanding of <em>health</em>
            </H>
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
      </Block>

      {/* Publications */}
      <Block id="publications" n="02" label="Academic publications" tint>
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <H>
              Published research and <em>original sources</em>
            </H>
          </Reveal>
          <div className="lg:col-span-8">
            <Rows
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
          </div>
        </div>

        <div className="mt-16 grid gap-x-14 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Research papers and preprints</p>
            <H size="md" className="mt-4">
              {c.preprints.title}
            </H>
            <p className="mt-4 text-[15.5px]">{c.preprints.note}</p>
          </Reveal>
          <div className="lg:col-span-8">
            <Rows
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
            <Note className="mt-6 bg-white" why="each entry ends with a Read the publication or View the manuscript link in the content master.">
              The web address or DOI for each of the five publications and three preprints.
            </Note>
          </div>
        </div>
      </Block>

      {/* White papers */}
      <Block id="white-papers" n="03" label={c.papers.eyebrow}>
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-2">
          <Reveal>
            <H>
              Connecting evidence with <em>human systems</em>
            </H>
            <p className="mt-7">{c.papers.body}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow mb-4">How access works</p>
            <Ticks
              single
              className="border-b border-line"
              items={[
                "Each paper opens with an executive summary anyone can read.",
                "The full paper is sent after you leave your name, occupation and email address.",
                "You can also subscribe to receive new white papers and the newsletter.",
              ]}
            />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-14 gap-y-14 xl:grid-cols-2">
          {c.papers.series.map((s) => (
            <div key={s.id} id={s.id} data-series className="scroll-mt-40">
              <Bar label={`${s.papers.length} papers`} />
              <h3 className="display mt-6 text-[2rem]">{s.name}</h3>
              <p className="mt-1.5 text-[15.5px] font-medium">{s.line}</p>
              <Rows
                className="mt-6"
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
              <p className="mt-5 text-[15px] text-ink-soft">{s.foot}</p>
            </div>
          ))}
        </div>
        <Note className="mt-10 max-w-[60rem]" why="the content master says each paper's availability and publication status will be clearly identified.">
          For each of the thirteen papers: an executive summary, the paper as a PDF if it is ready, and its status (published, in review or
          in development).
        </Note>
      </Block>

      {/* Subscribe */}
      <section id="subscribe" className="scroll-mt-36 bg-mint text-ink-deep">
        <W className="grid gap-x-14 gap-y-8 py-14 md:py-20 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow text-ink-deep">Stay informed</p>
            <H className="mt-5">New white papers and the Sagework newsletter</H>
          </div>
          <div>
            <Subscribe to={contactEmail} />
            <Note label="Decision needed" className="mt-5 bg-white/70" why="Sagework has no newsletter service yet and asked for a suggestion.">
              Our suggestion: one mailing service, such as Brevo or Mailchimp, for both the newsletter and the white-paper requests, so every
              sign-up lands in one list. Until it is chosen, this form opens an email instead.
            </Note>
          </div>
        </W>
      </section>

      {/* Evidence library, articles, books */}
      <Block id="library" n="04" label="Evidence library">
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-2">
          <Reveal>
            <H>
              Follow the sources behind <em>the ideas</em>
            </H>
            <p className="mt-7">{evidenceNotes[2].body}</p>
            <ul className="mt-8 grid border-b border-line sm:grid-cols-2 sm:gap-x-8">
              {c.library.topics.map((t) => (
                <li key={t} className="border-t border-line py-3 text-[15px] font-medium">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="space-y-8">
            {c.more.map((m) => (
              <div key={m.title} className="border border-line p-6 md:p-7">
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
      </Block>

      {/* How we work with evidence */}
      <Block n="05" label="Evidence in use" tint>
        <div className="grid gap-x-14 gap-y-10 md:grid-cols-2">
          {evidenceNotes.slice(0, 2).map((e, n) => (
            <Reveal key={e.title} delay={n * 0.08}>
              <p className="eyebrow">{e.title}</p>
              <H size="md" as="h3" className="mt-4">
                {e.sub}
              </H>
              <p className="mt-5">{e.body}</p>
            </Reveal>
          ))}
        </div>
      </Block>

      <ClosingBand second={{ label: "Explore the Five Senses", href: r2.senses }} />
    </>
  );
}
