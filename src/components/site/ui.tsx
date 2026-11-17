import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

/** Page width and gutters. */
export function Wrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1320px] px-5 md:px-10 ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
  id,
  tight = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tight?: boolean;
}) {
  return (
    <section id={id} className={`${tight ? "py-14 md:py-20" : "py-20 md:py-28"} ${className}`}>
      <Wrap>{children}</Wrap>
    </section>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

/** Section headline in the manual's title style. Wrap key words in <em> for the green. */
export function Title({
  children,
  as: Tag = "h2",
  size = "lg",
  className = "",
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  size?: "xl" | "lg" | "md" | "sm";
  className?: string;
}) {
  const sizes = {
    xl: "text-[clamp(2.6rem,6vw,5.25rem)]",
    lg: "text-[clamp(2.1rem,4.2vw,3.6rem)]",
    md: "text-[clamp(1.7rem,2.8vw,2.4rem)]",
    sm: "text-[1.45rem] md:text-[1.6rem]",
  };
  return <Tag className={`display ${sizes[size]} ${className}`}>{children}</Tag>;
}

export function Lead({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[1.12rem] leading-relaxed text-ink md:text-[1.22rem] ${className}`}>{children}</p>;
}

type ButtonTone = "sage" | "outline" | "white" | "ghost";

const tones: Record<ButtonTone, string> = {
  // Sage Green buttons carry dark text: white on this green is too faint to read at button size.
  sage: "bg-sage text-ink-deep hover:bg-sage-deep",
  outline: "border border-ink/25 text-ink hover:border-sage-ink hover:text-sage-ink",
  white: "bg-white text-ink-deep hover:bg-mint",
  ghost: "border border-white/70 text-white hover:bg-white hover:text-ink-deep",
};

export function Button({
  href,
  children,
  tone = "sage",
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  tone?: ButtonTone;
  className?: string;
  external?: boolean;
}) {
  const cls = `group inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-[15px] font-semibold leading-none transition-colors duration-300 ${tones[tone]} ${className}`;
  const icon = external ? (
    <ArrowUpRight size={16} weight="bold" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
  ) : (
    <ArrowRight size={16} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
  );
  if (external || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
        {children}
        {icon}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      {icon}
    </Link>
  );
}

/** A quiet text link with an arrow, in the darker green approved for small text. */
export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-[15px] font-semibold text-sage-ink underline-offset-4 hover:underline ${className}`}
    >
      {children}
      <ArrowRight size={15} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

/**
 * A marker for something the client still has to supply. It sits in the section it
 * belongs to, says what is missing and why, and is removed when the content arrives.
 * Search the project for `<Note` to list every open item.
 */
export function Note({
  children,
  why,
  label = "Content needed",
  className = "",
}: {
  children: ReactNode;
  why?: ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <aside
      data-note
      className={`border border-dashed border-amber bg-cream/45 px-4 py-3 text-[14px] leading-snug text-ink-deep ${className}`}
    >
      <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[#8a5f00]">{label}</p>
      <p className="mt-1.5">{children}</p>
      {why ? <p className="mt-1.5 text-ink-soft">Why: {why}</p> : null}
    </aside>
  );
}

/** Top of every inner page: label, headline, short introduction. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="wash relative overflow-hidden">
      <Wrap className={`grid gap-10 pb-16 pt-14 md:pb-24 md:pt-20 ${aside ? "lg:grid-cols-[1.05fr_0.95fr] lg:items-end" : ""}`}>
        <div className="max-w-[46rem]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Title as="h1" size="xl" className="mt-5">
            {title}
          </Title>
          {lead ? <Lead className="mt-7 max-w-[40rem]">{lead}</Lead> : null}
          {children ? <div className="mt-9 flex flex-wrap items-center gap-3">{children}</div> : null}
        </div>
        {aside}
      </Wrap>
    </section>
  );
}
