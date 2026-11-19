"use client";

import { useState } from "react";
import { Leaf } from "@/components/brand/Leaf";

export type SenseItem = {
  name: string;
  line: string;
  figure: string | null;
  figureLabel: string;
  finding: string;
  source: string;
  body: string;
  practice: string;
};

/**
 * The five senses as a ruled table of five columns, each led by the number inside the
 * client's own cited finding. Choosing a sense opens its finding beneath the table.
 * `detailed` adds the explanation and the practice notes, for the Five Senses page.
 */
export function SenseGrid({ items, detailed = false }: { items: SenseItem[]; detailed?: boolean }) {
  const [on, setOn] = useState(1);
  const s = items[on];

  return (
    <div data-sense-grid>
      <div role="tablist" aria-label="The five senses" className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-5">
        {items.map((it, i) => {
          const open = i === on;
          return (
            <button
              key={it.name}
              type="button"
              role="tab"
              id={`sense-tab-${it.name}`}
              aria-selected={open}
              aria-controls="sense-panel"
              data-sense={it.name}
              onClick={() => setOn(i)}
              className={`relative flex min-h-[210px] flex-col border-b border-r border-line p-5 text-left transition-colors duration-300 md:p-6 ${
                open ? "bg-paper" : "bg-white hover:bg-paper"
              }`}
            >
              <span className={`absolute inset-x-0 top-0 h-[3px] origin-left bg-sage transition-transform duration-500 ease-soft ${open ? "scale-x-100" : "scale-x-0"}`} />
              <span className="flex items-baseline justify-between text-[12.5px] font-semibold uppercase tracking-[0.14em] text-sage-ink">
                {it.name}
                <span className="text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
              </span>
              <span className="mt-6 flex h-[3.4rem] items-end">
                {it.figure ? (
                  <span className="display text-[clamp(2.4rem,3.6vw,3.4rem)] leading-none text-ink-deep">{it.figure}</span>
                ) : (
                  <Leaf className="h-[2.9rem] w-auto text-sage" />
                )}
              </span>
              <span className="mt-4 text-[14px] leading-snug text-ink">{it.figureLabel}</span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="sense-panel"
        aria-labelledby={`sense-tab-${s.name}`}
        data-sense-panel={s.name}
        className="grid gap-x-12 gap-y-8 border-b border-line py-8 md:py-10 lg:grid-cols-12"
      >
        <div className="lg:col-span-4">
          <p className="eyebrow">{s.name}</p>
          <p className="display mt-3 text-[1.8rem] leading-tight md:text-[2.1rem]">{s.line}</p>
        </div>
        <div className={detailed ? "lg:col-span-4" : "lg:col-span-7 lg:col-start-6"}>
          <p>{s.finding}</p>
          <p className="mt-3 text-[13.5px] text-ink-soft">Source: {s.source}</p>
        </div>
        {detailed ? (
          <div className="lg:col-span-4">
            <p>{s.body}</p>
            <p className="mt-5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-sage-ink">In practice</p>
            <p className="mt-2 text-[15.5px]">{s.practice}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
