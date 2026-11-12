"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Review-only control so the client can flip between the two samples on the
 * same page. Remove this component once a direction is chosen.
 */
export function SampleSwitcher() {
  const pathname = usePathname() ?? "/";
  const current = pathname.startsWith("/2") ? "2" : "1";
  const rest = pathname.replace(/^\/[12]/, "");
  const other = current === "1" ? "2" : "1";

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 print:hidden">
      <div className="flex items-center gap-0.5 whitespace-nowrap rounded-full border border-black/10 bg-[#f6f6f1]/95 p-1 font-body text-[11.5px] sm:gap-1 sm:text-[12px] text-[#1b2a20] shadow-[0_10px_30px_-12px_rgba(10,25,15,0.45)] backdrop-blur">
        <Link
          href="/"
          className="rounded-full px-2.5 py-1.5 text-[#566557] transition-colors hover:text-[#1b2a20] sm:px-3"
        >
          Overview
        </Link>
        <span
          aria-current="page"
          className="rounded-full bg-[#1b2a20] px-2.5 py-1.5 text-[#f3f4ec] sm:px-3"
        >
          Sample {current}
        </span>
        <Link
          href={`/${other}${rest}`}
          className="rounded-full px-2.5 py-1.5 transition-colors hover:bg-black/5 sm:px-3"
        >
          View sample {other}
        </Link>
      </div>
    </div>
  );
}
