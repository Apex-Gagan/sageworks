import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Pic } from "@/components/shared/Pic";
import type { ImageKey } from "@/content/captions";

/**
 * Sample 3 "Folio" building blocks.
 * Shape rule: controls and ordinary photographs use an 8px radius. Feature
 * photographs sit in a leaf (.leaf): two opposite corners rounded.
 */

export function Box({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1240px] px-5 md:px-10 xl:px-14 ${className}`}>{children}</div>
  );
}

export function ButtonThree({
  href,
  children,
  tone = "accent",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: "accent" | "ink" | "line" | "onDeep";
  className?: string;
}) {
  const tones = {
    accent: "bg-accent text-on-accent hover:bg-fg",
    ink: "bg-fg text-bg hover:bg-accent",
    line: "border border-fg/30 text-fg hover:border-fg hover:bg-fg hover:text-bg",
    onDeep: "bg-on-deep text-deep hover:bg-accent hover:text-on-accent",
  };
  const cls = `group inline-flex items-center gap-2.5 whitespace-nowrap rounded-[8px] px-5 py-3.5 text-[14px] font-medium transition-colors duration-300 active:translate-y-px ${tones[tone]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <ArrowRight size={15} weight="bold" className="transition-transform duration-500 group-hover:translate-x-1" />
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

export function LinkThree({ href, children }: { href: string; children: ReactNode }) {
  const cls =
    "group inline-flex items-center gap-2 whitespace-nowrap border-b border-fg/40 pb-1 text-[14.5px] text-fg transition-colors duration-300 hover:border-accent hover:text-accent";
  const inner = (
    <>
      {children}
      <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-1" />
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

export function Fig({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-[12.5px] leading-snug text-muted">{children}</p>;
}

type LeafProps = {
  k: ImageKey;
  ratio?: string;
  sizes?: string;
  pos?: string;
  preload?: boolean;
  className?: string;
  variant?: "leaf" | "leaf-flip" | "leaf-sm";
};

/** Photograph in the leaf frame. */
export function Leaf({ k, ratio = "4 / 5", variant = "leaf", className = "", ...rest }: LeafProps) {
  return (
    <div className={`${variant} overflow-hidden ${className}`}>
      <Pic k={k} ratio={ratio} className="rounded-none" {...rest} />
    </div>
  );
}
