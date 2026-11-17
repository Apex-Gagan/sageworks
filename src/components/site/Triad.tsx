"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus } from "@phosphor-icons/react";

export type TriadLens = {
  name: string;
  question: string;
  body: string;
  detail: string;
  /** Tailwind background class for the lens colour. */
  bg: string;
  src: string;
  blur: string;
  alt: string;
};

/**
 * The SAGE Triad as three connected panels, one colour per lens: Sage Green for
 * Biology, Aqua for Environment, Amber for Behaviour (questionnaire, Q2 comment).
 * One panel is open at a time; the other two stay beside it so the three always read
 * as one system. On phones they stack and each opens in place.
 */
export function Triad({ lenses, start = 0 }: { lenses: TriadLens[]; start?: number }) {
  const [open, setOpen] = useState(start);
  return (
    <div data-triad className="flex flex-col gap-2 lg:h-[520px] lg:flex-row">
      {lenses.map((l, n) => {
        const on = n === open;
        return (
          <div
            key={l.name}
            data-lens={l.name}
            data-open={on}
            className={`relative overflow-hidden ${l.bg} text-ink-deep transition-[flex-grow] duration-700 ease-soft lg:min-w-0 lg:basis-0 ${
              on ? "lg:grow-[2.1]" : "lg:grow"
            } ${n === lenses.length - 1 ? "leafcut-sm" : ""}`}
          >
            <button
              type="button"
              aria-expanded={on}
              aria-controls={`lens-${l.name}`}
              onClick={() => setOpen(n)}
              className="flex w-full items-start justify-between gap-4 p-6 text-left md:p-8 lg:absolute lg:inset-x-0 lg:top-0 lg:z-10"
            >
              <span>
                <span className="block text-[12.5px] font-semibold uppercase tracking-[0.14em]">
                  {String(n + 1).padStart(2, "0")}
                </span>
                {/* Large words on the colour are white; everything smaller stays dark. */}
                <span className="display mt-2 block text-[clamp(1.9rem,2.5vw,2.35rem)] text-white">{l.name}</span>
                <span className="mt-1.5 block text-[15.5px] font-medium">{l.question}</span>
              </span>
              <span
                aria-hidden
                className={`mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink-deep/40 transition-transform duration-500 ${
                  on ? "rotate-45" : ""
                }`}
              >
                <Plus size={16} weight="bold" />
              </span>
            </button>

            <div
              id={`lens-${l.name}`}
              hidden={!on}
              className="px-6 pb-6 md:px-8 md:pb-8 lg:absolute lg:inset-x-0 lg:bottom-0 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-7"
            >
              <div className="max-w-[34rem]">
                <p className="text-[16.5px] leading-relaxed">{l.body}</p>
                <p className="mt-4 border-t border-ink-deep/25 pt-4 text-[14.5px] leading-relaxed">{l.detail}</p>
              </div>
              <div className="relative mt-6 aspect-[4/3] overflow-hidden lg:mt-0">
                <Image
                  src={l.src}
                  alt={l.alt}
                  fill
                  sizes="(min-width: 1024px) 28vw, 90vw"
                  placeholder="blur"
                  blurDataURL={l.blur}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
