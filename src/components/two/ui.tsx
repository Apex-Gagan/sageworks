import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

/**
 * Sample 2 controls. Shape rule for this sample: controls are full pills,
 * photographs and panels use a 20 to 28px radius, portraits sit in an arch.
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
