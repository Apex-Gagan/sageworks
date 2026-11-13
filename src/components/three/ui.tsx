import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

/**
 * Sample 3 "Daylight" building blocks, modelled on mindvalley.com and
 * drchatterjee.com. Bold sans headings, white and cream grounds, one green
 * accent used as a highlighter block (.hl), pill buttons, 10px photographs,
 * and cards with one generous corner (.cut).
 */

export function Wrap3({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-[1240px] px-5 md:px-8 ${className}`}>{children}</div>;
}

const tones = {
  accent: "bg-accent text-on-accent hover:bg-fg hover:text-bg",
  ink: "bg-fg text-bg hover:bg-accent hover:text-on-accent",
  outline: "border-[1.5px] border-fg text-fg hover:bg-fg hover:text-bg",
  outlineLight: "border-[1.5px] border-white text-white hover:bg-white hover:text-[#151b25]",
  onDeep: "bg-accent text-on-accent hover:bg-white hover:text-[#151b25]",
};

export function Pill({
  href,
  children,
  tone = "ink",
  arrow = true,
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: keyof typeof tones;
  arrow?: boolean;
  className?: string;
}) {
  const cls = `group inline-flex items-center gap-2.5 whitespace-nowrap rounded-full px-6 py-3.5 text-[15px] font-semibold transition-colors duration-300 active:scale-[0.98] ${tones[tone]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow ? (
        <ArrowRight size={16} weight="bold" className="transition-transform duration-500 group-hover:translate-x-1" />
      ) : null}
    </>
  );
  return href.startsWith("mailto:") ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** The highlighter: a green block behind the words that matter. */
export function Hl({ children }: { children: ReactNode }) {
  return <span className="hl">{children}</span>;
}

/** Centred section heading in the Mindvalley manner: bold title, plain subtitle. */
export function Heading({
  title,
  sub,
  className = "",
}: {
  title: ReactNode;
  sub?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-[860px] text-center ${className}`}>
      <h2 className="display text-[clamp(2.1rem,4.2vw,3.6rem)] leading-[1.1]">{title}</h2>
      {sub ? <p className="mt-5 text-[18px] leading-relaxed text-fg/80 md:text-[19px]">{sub}</p> : null}
    </div>
  );
}

export function Small({ children }: { children: ReactNode }) {
  return <p className="mt-2.5 text-[13px] leading-snug text-muted">{children}</p>;
}
