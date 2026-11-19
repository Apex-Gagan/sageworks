"use client";

import { useState, type ReactNode } from "react";
import { Minus, Plus } from "@phosphor-icons/react";

export type Row = {
  id: string;
  /** Small label at the start of the row: a number, a year or a code. */
  tag: string;
  title: string;
  sub?: string;
  content: ReactNode;
};

/**
 * Ruled rows that open one at a time. The closed row is one line, so a long list stays
 * short; the detail is there for whoever wants it.
 */
export function Rows({ items, first = false, className = "" }: { items: Row[]; first?: boolean; className?: string }) {
  const [open, setOpen] = useState<string | null>(first ? items[0].id : null);

  return (
    <div data-rows className={`border-b border-line ${className}`}>
      {items.map((it) => {
        const on = open === it.id;
        return (
          <div key={it.id} id={it.id} data-row data-open={on} className="scroll-mt-40 border-t border-line">
            <h3>
              <button
                type="button"
                aria-expanded={on}
                aria-controls={`${it.id}-panel`}
                onClick={() => setOpen(on ? null : it.id)}
                className="group grid w-full grid-cols-[3.25rem_1fr_auto] items-center gap-x-3 py-5 text-left md:grid-cols-[4.5rem_1fr_auto] md:py-6"
              >
                <span className="display text-[1.25rem] leading-none text-sage-text">{it.tag}</span>
                <span>
                  <span className={`block text-[1.12rem] font-semibold leading-snug transition-colors md:text-[1.2rem] ${on ? "text-ink-deep" : "text-ink group-hover:text-sage-ink"}`}>
                    {it.title}
                  </span>
                  {it.sub ? <span className="mt-1 block text-[14.5px] text-ink-soft">{it.sub}</span> : null}
                </span>
                <span
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 ${
                    on ? "border-sage bg-sage text-ink-deep" : "border-line text-ink group-hover:border-sage-ink"
                  }`}
                >
                  {on ? <Minus size={16} weight="bold" /> : <Plus size={16} weight="bold" />}
                </span>
              </button>
            </h3>
            <div id={`${it.id}-panel`} hidden={!on} className="pb-7 pl-[3.25rem] pr-4 text-[16px] leading-relaxed md:pl-[4.5rem] md:pr-16">
              {it.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
