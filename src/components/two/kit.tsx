import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowsClockwise } from "@phosphor-icons/react/dist/ssr";
import { Leaf } from "@/components/brand/Leaf";
import { Mark } from "@/components/brand/Mark";
import { Pic } from "@/components/shared/Pic";
import { Reveal } from "@/components/shared/Motion";
import { Button, Lead } from "@/components/site/ui";
import type { ImageKey } from "@/content/captions";
import { closing } from "@/content/home";
import { r2 } from "@/content/two";

/**
 * Design 2 building blocks. Same colours, typefaces, logo and wording as Design 1;
 * a different way of laying them out. Where Design 1 is a picture-led editorial page
 * with one rounded corner on its cards, Design 2 is a ruled index: hairlines, numbered
 * parts, square photographs and diagrams that explain the ideas.
 */

/** Page width and gutters. */
export function W({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1400px] px-5 md:px-10 xl:px-14 ${className}`}>{children}</div>;
}

/** The ruled bar that opens a part of a page: a number, a label and an optional link. */
export function Bar({ n, label, children }: { n?: string; label: string; children?: ReactNode }) {
  return (
    <div data-bar className="flex items-center gap-4 border-t border-ink/25 pt-4">
      {n ? <span className="display text-[1.35rem] leading-none text-sage-text">{n}</span> : null}
      <p className="eyebrow">{label}</p>
      {children ? <div className="ml-auto">{children}</div> : null}
    </div>
  );
}

/** One part of a page: the ruled bar, then the content. */
export function Block({
  id,
  n,
  label,
  link,
  children,
  className = "",
  tint = false,
}: {
  id?: string;
  n?: string;
  label: string;
  link?: ReactNode;
  children: ReactNode;
  className?: string;
  /** A very pale band of Sage Green behind the part. */
  tint?: boolean;
}) {
  return (
    <section id={id} className={`scroll-mt-36 py-14 md:py-20 ${tint ? "bg-paper [--loop-bg:var(--color-paper)]" : ""} ${className}`}>
      <W>
        <Bar n={n} label={label}>
          {link}
        </Bar>
        <div className="mt-10 md:mt-14">{children}</div>
      </W>
    </section>
  );
}

/** Headline in the manual's title style. Wrap key words in <em> for the green. */
export function H({
  children,
  as: Tag = "h2",
  size = "lg",
  className = "",
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "p";
  size?: "xl" | "lg" | "md" | "sm";
  className?: string;
}) {
  const sizes = {
    xl: "text-[clamp(2.7rem,6.4vw,5.9rem)]",
    lg: "text-[clamp(2.1rem,4vw,3.5rem)]",
    md: "text-[clamp(1.6rem,2.5vw,2.2rem)]",
    sm: "text-[1.35rem] md:text-[1.5rem]",
  };
  return <Tag className={`display ${sizes[size]} ${className}`}>{children}</Tag>;
}

/** A text link with an arrow in a ring, in the darker green approved for small text. */
export function Go({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-3 text-[15px] font-semibold text-sage-ink ${className}`}>
      <span className="underline-offset-4 group-hover:underline">{children}</span>
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-sage-ink/40 transition-colors duration-300 group-hover:bg-sage group-hover:text-ink-deep">
        <ArrowRight size={14} weight="bold" />
      </span>
    </Link>
  );
}

/** The ruled line at the top of an inner page: where the page sits in the site. */
export function Crumb({ n, label }: { n: string; label: string }) {
  return (
    <div data-crumb className="flex items-center justify-between gap-6 border-b border-line pb-4 text-[12.5px] font-semibold uppercase tracking-[0.14em]">
      <p className="text-ink-soft">
        <Link href={r2.home} className="hover:text-sage-ink">
          Sagework
        </Link>
        <span className="mx-2.5 text-line">/</span>
        <span className="text-sage-ink">{label}</span>
      </p>
      <p className="text-ink-soft">
        {n} <span className="text-line">/</span> 09
      </p>
    </div>
  );
}

/**
 * Top of every inner page: a ruled line with the page's place in the site, the
 * headline across the full width, and the introduction set to the right beneath it.
 */
export function PageTop({
  n,
  label,
  title,
  lead,
  children,
  banner,
  bannerPos,
  side,
}: {
  n: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  /** A wide photograph beneath the opening. */
  banner?: ImageKey;
  bannerPos?: string;
  /** A smaller photograph beside the introduction. */
  side?: ImageKey;
}) {
  return (
    <section data-page-top>
      <W className="pt-8 md:pt-12">
        <Crumb n={n} label={label} />
        <div className="grid gap-x-10 gap-y-10 pb-12 pt-10 md:pb-16 md:pt-14 lg:grid-cols-12">
          <H as="h1" size="xl" className="lg:col-span-11">
            {title}
          </H>
          {side ? (
            <Reveal className="lg:col-span-6">
              <Pic k={side} ratio="16 / 9" preload sizes="(min-width: 1024px) 46vw, 100vw" />
            </Reveal>
          ) : null}
          <div className={side ? "lg:col-span-5 lg:col-start-8 lg:self-end" : "lg:col-span-6 lg:col-start-7"}>
            {lead ? <Lead>{lead}</Lead> : null}
            {children ? <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div> : null}
          </div>
        </div>
      </W>
      {banner ? (
        <W>
          <Reveal>
            <Pic k={banner} ratio="21 / 8" preload pos={bannerPos} sizes="(min-width: 1400px) 1300px, 100vw" className="max-md:aspect-[4/3]!" />
          </Reveal>
        </W>
      ) : null}
    </section>
  );
}

/**
 * SAGE OS drawn as a loop. The four steps sit on one line that closes on itself, and
 * the initials on the line spell the name: Scan, Analyse, Generate, Execute.
 */
export function Loop({
  steps,
  returns,
  close,
}: {
  steps: { name: string; line?: string; body: string }[];
  /** The words on the returning line, where the last step leads back to the first. */
  returns?: string;
  close?: string;
}) {
  return (
    <div data-sage-loop>
      <div className="relative lg:rounded-[48px] lg:border lg:border-sage lg:px-10 lg:pb-14">
        <ol className="space-y-10 border-l border-sage lg:grid lg:grid-cols-4 lg:gap-10 lg:space-y-0 lg:border-l-0">
          {steps.map((s, n) => (
            <li key={s.name} className="relative pl-10 lg:pl-0">
              <span className="absolute -left-[22px] top-0 inline-flex h-11 w-11 items-center justify-center rounded-full bg-sage text-[17px] font-semibold text-ink-deep ring-8 ring-[color:var(--loop-bg,#fff)] lg:static lg:-mt-[22px]">
                {s.name.charAt(0)}
              </span>
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-sage-ink lg:mt-5">Step {n + 1}</p>
              <h3 className="display mt-1.5 text-[1.9rem]">{s.name}</h3>
              {s.line ? <p className="mt-1 text-[15.5px] font-semibold">{s.line}</p> : null}
              <p className="mt-3 text-[15.5px] leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 translate-y-1/2 items-center gap-2.5 whitespace-nowrap bg-[var(--loop-bg,#fff)] px-5 text-[13.5px] font-semibold text-sage-ink lg:inline-flex">
          <ArrowsClockwise size={19} weight="bold" />
          {returns}
        </p>
      </div>
      {close ? <p className="mt-12 max-w-[52rem] text-[16px] leading-relaxed">{close}</p> : null}
    </div>
  );
}

/** A short list with the leaf from the logo as its bullet, in two columns unless `single`. */
export function Ticks({ items, className = "", single = false }: { items: ReactNode[]; className?: string; single?: boolean }) {
  return (
    <ul className={`grid gap-x-10 ${single ? "" : "sm:grid-cols-2"} ${className}`}>
      {items.map((it, n) => (
        <li key={n} className="flex items-start gap-3.5 border-t border-line py-4 text-[16px] font-medium leading-snug">
          <Leaf className="mt-[2px] h-[19px] w-auto shrink-0 text-sage" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/** The three ways further into the site, as ruled rows (content master, Page 3). */
export function ExploreRows() {
  const rows: { kicker: string; body: string; href: string; cta: string; top: ReactNode }[] = [
    {
      kicker: "The Five Senses",
      body: "A closer look at light, sound, smell, taste and touch as biological pathways through which the environment communicates with the body.",
      href: r2.senses,
      cta: "Explore the Five Senses",
      top: <span className="display text-[3.2rem] leading-none text-sage-text">5</span>,
    },
    {
      kicker: "Dr Gutsy",
      body: "Dr Gutsy is Sagework's public education platform, founded by Dr Shruti Pai. It explores curious, evidence-led health questions and a more connected understanding of the body, its environment and everyday behaviour.",
      href: r2.education,
      cta: "Explore Dr Gutsy",
      top: <Mark name="drGutsy" label="Dr Gutsy" className="h-[40px] w-auto" />,
    },
    {
      kicker: "Research and evidence",
      body: "Peer-reviewed research, evidence reviews, white papers and perspectives connecting biology, environment and behaviour.",
      href: r2.research,
      cta: "Research and evidence",
      top: <span className="display text-[3.2rem] leading-none text-sage-text">Aa</span>,
    },
  ];
  return (
    <ul className="border-b border-line">
      {rows.map((r) => (
        <li key={r.kicker}>
          <Link
            href={r.href}
            data-explore-row
            className="group grid items-center gap-x-10 gap-y-4 border-t border-line py-8 transition-colors duration-300 hover:bg-paper md:grid-cols-12 md:px-4"
          >
            <span className="flex h-14 items-center md:col-span-2">{r.top}</span>
            <span className="display text-[1.7rem] leading-tight md:col-span-3">{r.kicker}</span>
            <span className="text-[15.5px] leading-relaxed md:col-span-5">{r.body}</span>
            <span className="inline-flex items-center gap-3 text-[15px] font-semibold text-sage-ink md:col-span-2 md:justify-end">
              <span className="md:sr-only">{r.cta}</span>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sage-ink/40 transition-colors duration-300 group-hover:bg-sage group-hover:text-ink-deep">
                <ArrowRight size={17} weight="bold" />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * The closing invitation: a full band of Sage Green. White is kept for the large
 * headline; the smaller words are dark so they can be read on the green.
 */
export function ClosingBand({
  title = closing.title,
  body = closing.body,
  cta = closing.cta,
  href = r2.contact,
  second,
}: {
  title?: string;
  body?: string;
  cta?: string;
  href?: string;
  second?: { label: string; href: string };
}) {
  return (
    <section data-closing className="relative overflow-hidden bg-sage text-ink-deep">
      <Leaf className="pointer-events-none absolute -left-10 -top-16 h-[150%] w-auto text-sage-deep opacity-60" />
      <W className="relative grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7">
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em]">Start a conversation</p>
          <H className="mt-5 text-white">{title}</H>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
          <p className="text-[1.08rem] leading-relaxed">{body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={href} tone="white">
              {cta}
            </Button>
            {second ? (
              <Link
                href={second.href}
                className="inline-flex items-center rounded-full border border-ink-deep/40 px-6 py-3 text-[15px] font-semibold leading-none transition-colors duration-300 hover:bg-white"
              >
                {second.label}
              </Link>
            ) : null}
          </div>
        </Reveal>
      </W>
    </section>
  );
}

/** A photograph with its caption on a ruled line beneath it. */
export function Plate({
  k,
  ratio,
  pos,
  sizes,
  caption,
  className = "",
  preload = false,
}: {
  k: ImageKey;
  ratio?: string;
  pos?: string;
  sizes?: string;
  caption?: ReactNode;
  className?: string;
  preload?: boolean;
}) {
  return (
    <figure className={className}>
      <Pic k={k} ratio={ratio} pos={pos} sizes={sizes} preload={preload} />
      {caption ? <figcaption className="mt-3 border-t border-line pt-3 text-[13.5px] text-ink-soft">{caption}</figcaption> : null}
    </figure>
  );
}
