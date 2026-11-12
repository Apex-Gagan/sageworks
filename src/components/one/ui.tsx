import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

/** Sample 1 controls: square, hairline, quiet. */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-5 md:px-10 ${className}`}>{children}</div>
  );
}

export function ButtonOne({
  href,
  children,
  tone = "solid",
}: {
  href: string;
  children: ReactNode;
  tone?: "solid" | "onDeep";
}) {
  const cls =
    tone === "solid"
      ? "border-fg bg-fg text-bg hover:bg-accent hover:border-accent"
      : "border-on-deep bg-on-deep text-deep hover:bg-transparent hover:text-on-deep";
  const external = href.startsWith("mailto:");
  const inner = (
    <>
      <span>{children}</span>
      <ArrowRight size={15} className="transition-transform duration-500 group-hover:translate-x-1" />
    </>
  );
  const className = `group inline-flex items-center gap-3 whitespace-nowrap border px-6 py-3.5 text-[13px] tracking-[0.02em] transition-colors duration-300 active:translate-y-px ${cls}`;
  return external ? (
    <a href={href} className={className}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}

export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const external = href.startsWith("mailto:");
  const inner = (
    <>
      <span className="link-draw pb-1" style={{ backgroundSize: "100% 1px" }}>
        {children}
      </span>
      <ArrowRight size={15} className="transition-transform duration-500 group-hover:translate-x-1" />
    </>
  );
  const cls = `group inline-flex items-center gap-2.5 whitespace-nowrap text-[14px] text-fg ${className}`;
  return external ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function Caption({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-[12.5px] leading-snug text-muted">{children}</p>;
}
