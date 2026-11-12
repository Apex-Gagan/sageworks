import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Pic } from "@/components/shared/Pic";
import { TriadMark } from "@/components/shared/Triad";
import type { ImageKey } from "@/content/captions";

/**
 * Sample 2 "Canopy" building blocks.
 * Shape rule: controls are full pills. Photographs sit in arches (.arch),
 * circles or 24px rounded frames. Sections are "sheets" with a large rounded
 * top edge that slide over the section before them.
 */

export function Wrap({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1480px] px-5 md:px-10 ${className}`}>{children}</div>
  );
}

/** A section that slides over the previous one with a rounded top edge. */
export function Sheet({
  children,
  tone = "bg",
  id,
  className = "",
}: {
  children: ReactNode;
  tone?: "bg" | "surface";
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative -mt-10 scroll-mt-16 overflow-clip rounded-t-[40px] md:-mt-16 md:rounded-t-[64px] ${tone === "bg" ? "bg-bg" : "bg-surface"} ${className}`}
    >
      {children}
    </section>
  );
}

/** Soft patch of forest light. Purely atmospheric, never behind body text. */
export function Glow({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(96,146,104,0.2),transparent)] ${className}`}
    />
  );
}

export function ButtonTwo({
  href,
  children,
  tone = "accent",
}: {
  href: string;
  children: ReactNode;
  tone?: "accent" | "ghost";
}) {
  const cls =
    tone === "accent"
      ? "bg-accent text-on-accent hover:bg-fg"
      : "border border-fg/30 text-fg hover:border-fg hover:bg-fg/10 backdrop-blur-sm";
  const className = `group inline-flex items-center gap-2.5 whitespace-nowrap rounded-full px-6 py-3.5 text-[14px] font-medium transition-colors duration-300 active:scale-[0.98] ${cls}`;
  const inner = (
    <>
      <span>{children}</span>
      <ArrowUpRight
        size={16}
        weight="bold"
        className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </>
  );
  return href.startsWith("mailto:") ? (
    <a href={href} className={className}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-[12.5px] leading-snug text-muted">{children}</p>;
}

type FrameProps = {
  k: ImageKey;
  ratio?: string;
  sizes?: string;
  pos?: string;
  preload?: boolean;
  className?: string;
  imgClassName?: string;
};

/** Photograph in an arch. */
export function Arch({ k, ratio = "3 / 4", className = "", ...rest }: FrameProps) {
  return (
    <div className={`arch overflow-hidden ${className}`}>
      <Pic k={k} ratio={ratio} className="rounded-none" {...rest} />
    </div>
  );
}

/** Photograph in a circle. */
export function Disc({ k, className = "", ...rest }: FrameProps) {
  return (
    <div className={`overflow-hidden rounded-full ${className}`}>
      <Pic k={k} ratio="1 / 1" className="rounded-none" {...rest} />
    </div>
  );
}

/** Rotating seal carrying the Sagework line around the triad mark. */
export function Seal({ id, className = "" }: { id: string; className?: string }) {
  return (
    <div aria-hidden="true" className={className}>
      <svg viewBox="0 0 200 200" className="h-full w-full motion-safe:animate-turn">
        <defs>
          <path id={id} d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
        </defs>
        <text
          fill="currentColor"
          fontFamily="var(--font-dm-mono), monospace"
          fontSize="9.4"
          letterSpacing="1.2"
        >
          <textPath href={`#${id}`} textLength="498" lengthAdjust="spacing">
            BUILT ON BIOLOGY · INTEGRATED THROUGH SYSTEMS · SCALED FOR HUMAN POTENTIAL ·
          </textPath>
        </text>
      </svg>
      <TriadMark className="absolute inset-0 m-auto h-9 w-9 text-accent" />
    </div>
  );
}
