import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Leaf, LeafDraw } from "@/components/brand/Leaf";
import { Mark } from "@/components/brand/Mark";
import { Reveal } from "@/components/shared/Motion";
import { closing } from "@/content/home";
import { routes } from "@/content/site";
import { Button, Eyebrow, Lead, Note, Title, Wrap } from "./ui";

/** SAGE OS as four steps on one line, joined by a hairline with a leaf at each step. */
export function SageOs({
  steps,
  close,
}: {
  steps: { name: string; line?: string; body: string }[];
  close?: string;
}) {
  return (
    <div data-sage-os>
      <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, n) => (
          <Reveal key={s.name} delay={n * 0.08}>
            <li className="relative list-none border-t border-ink/20 pt-6">
              <span className="absolute -top-[13px] left-0 inline-flex h-[26px] items-center bg-white pr-3 text-sage">
                <Leaf className="h-[26px] w-auto" />
              </span>
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-sage-ink">Step {n + 1}</p>
              <h3 className="display mt-2 text-[2rem]">{s.name}</h3>
              {s.line ? <p className="mt-1 text-[15.5px] font-semibold text-ink">{s.line}</p> : null}
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink">{s.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
      {close ? <p className="mt-10 max-w-[46rem] border-l-2 border-sage pl-5 text-[16px] leading-relaxed text-ink">{close}</p> : null}
    </div>
  );
}

/**
 * Percentage figures the client is supplying (questionnaire, Q23: "in percentages ...
 * we will provide all stats"). The slots are laid out so the numbers drop straight in.
 */
export function StatSlots({ labels, about }: { labels: string[]; about: string }) {
  return (
    <div data-stat-slots>
      <dl className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
        {labels.map((l) => (
          <div key={l} className="bg-white p-6 md:p-8">
            <dt className="display text-[clamp(3.2rem,6vw,5rem)] leading-none text-line">00%</dt>
            <dd className="mt-3 text-[15px] font-semibold text-ink">{l}</dd>
          </div>
        ))}
      </dl>
      <Note className="mt-4" why="Dr Shruti asked for proof numbers as percentages and said Sagework will provide them, with sources.">
        {about}
      </Note>
    </div>
  );
}

/** The three ways further into the site, in the client's words (content master, Page 3). */
export function ExploreCards() {
  const cards: { kicker: string; body: string; href: string; cta: string; top: ReactNode; bg: string }[] = [
    {
      kicker: "The Five Senses",
      body: "A closer look at light, sound, smell, taste and touch as biological pathways through which the environment communicates with the body.",
      href: routes.senses,
      cta: "Explore the Five Senses",
      top: <span className="display text-[2.6rem] leading-none text-ink">5</span>,
      bg: "bg-aqua-soft",
    },
    {
      kicker: "Dr Gutsy",
      body: "Dr Gutsy is Sagework's public education platform, founded by Dr Shruti Pai. It explores curious, evidence-led health questions and a more connected understanding of the body, its environment and everyday behaviour.",
      href: routes.education,
      cta: "Explore Dr Gutsy",
      top: <Mark name="drGutsy" label="Dr Gutsy" className="h-[38px] w-auto" />,
      bg: "bg-mint",
    },
    {
      kicker: "Research and evidence",
      body: "Peer-reviewed research, evidence reviews, white papers and perspectives connecting biology, environment and behaviour.",
      href: routes.research,
      cta: "Research and evidence",
      top: <span className="display text-[2.6rem] leading-none text-ink">Aa</span>,
      bg: "bg-cream",
    },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((c, n) => (
        <Reveal key={c.kicker} delay={n * 0.08} className="h-full">
          <Link
            href={c.href}
            data-explore-card
            className={`group flex h-full min-h-[300px] flex-col justify-between p-7 transition-transform duration-500 ease-soft hover:-translate-y-1.5 md:p-8 ${c.bg} ${
              n === cards.length - 1 ? "leafcut-sm" : ""
            }`}
          >
            <div>
              <div className="flex h-12 items-center">{c.top}</div>
              <p className="eyebrow mt-6 text-ink-deep">{c.kicker}</p>
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink-deep">{c.body}</p>
            </div>
            <span className="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-ink-deep">
              {c.cta}
              <ArrowRight size={15} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

/** The closing invitation used at the foot of most pages. */
export function Closing({
  title = closing.title,
  body = closing.body,
  cta = closing.cta,
  href = routes.contact,
  second,
}: {
  title?: string;
  body?: string;
  cta?: string;
  href?: string;
  second?: { label: string; href: string };
}) {
  return (
    <section data-closing className="wash relative overflow-hidden">
      <LeafDraw className="pointer-events-none absolute -bottom-10 right-[4%] hidden h-[115%] w-auto text-mint md:block" duration={2.4} />
      <Wrap className="relative py-24 md:py-32">
        <Reveal className="max-w-[46rem]">
          <Eyebrow>Start a conversation</Eyebrow>
          <Title className="mt-5">{title}</Title>
          <Lead className="mt-6">{body}</Lead>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={href}>{cta}</Button>
            {second ? (
              <Button href={second.href} tone="outline">
                {second.label}
              </Button>
            ) : null}
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}

/** A leaf used as the bullet in short lists (questionnaire, Q19). */
export function LeafList({ items, className = "" }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((it, n) => (
        <li key={n} className="flex gap-3.5 text-[16px] leading-relaxed">
          <Leaf className="mt-[3px] h-[20px] w-auto shrink-0 text-sage" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
