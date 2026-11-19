"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * For the review only: a small switch between the two designs, fixed to the corner of
 * every page. It opens the same page in the other design. Remove it, and the design
 * that is not chosen, before launch.
 */
export function DesignSwitch() {
  const path = usePathname() ?? "/";
  const inTwo = path === "/2" || path.startsWith("/2/");
  const one = inTwo ? path.slice(2) || "/" : path;
  const two = inTwo ? path : path === "/" ? "/2" : `/2${path}`;

  const item = (label: string, href: string, on: boolean) => (
    <Link
      href={href}
      aria-current={on ? "true" : undefined}
      data-design={label}
      className={`rounded-full px-3.5 py-1.5 transition-colors ${on ? "bg-sage text-ink-deep" : "text-ink hover:text-sage-ink"}`}
    >
      {label}
    </Link>
  );

  return (
    <nav
      aria-label="Design under review"
      data-design-switch
      className="fixed bottom-4 right-4 z-[80] flex items-center gap-1 rounded-full border border-line bg-white p-1 text-[13px] font-semibold shadow-[0_8px_30px_-12px_rgb(31_40_35/0.35)] print:hidden"
    >
      <span className="hidden pl-3 pr-1 text-[11.5px] uppercase tracking-[0.14em] text-ink-soft sm:inline">Review</span>
      {item("Design 1", one, !inTwo)}
      {item("Design 2", two, inTwo)}
    </nav>
  );
}
