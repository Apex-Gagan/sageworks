"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const samples = ["1", "2", "3"] as const;

/**
 * Review-only control so the client can flip between the samples on the
 * same page. Remove this component once a direction is chosen.
 */
export function SampleSwitcher() {
  const pathname = usePathname() ?? "/";
  const current = pathname.match(/^\/([123])/)?.[1] ?? "1";
  const rest = pathname.replace(/^\/[123]/, "");

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 print:hidden">
      <nav
        aria-label="Design samples"
        className="flex items-center gap-0.5 whitespace-nowrap rounded-full border border-black/10 bg-[#f6f6f3]/95 p-1 font-body text-[11.5px] text-[#1c2430] shadow-[0_10px_30px_-12px_rgba(10,20,25,0.5)] backdrop-blur sm:gap-1 sm:text-[12px]"
      >
        <Link
          href="/"
          className="rounded-full px-2.5 py-1.5 text-[#5a6370] transition-colors hover:text-[#1c2430] sm:px-3"
        >
          Overview
        </Link>
        {samples.map((s) =>
          s === current ? (
            <span
              key={s}
              aria-current="page"
              className="rounded-full bg-[#1c2430] px-2.5 py-1.5 text-[#f6f6f3] sm:px-3"
            >
              Sample {s}
            </span>
          ) : (
            <Link
              key={s}
              href={`/${s}${rest}`}
              aria-label={`View sample ${s}`}
              className="rounded-full px-2.5 py-1.5 transition-colors hover:bg-black/5 sm:px-3"
            >
              <span className="sm:hidden">{s}</span>
              <span className="hidden sm:inline">Sample {s}</span>
            </Link>
          ),
        )}
      </nav>
    </div>
  );
}
