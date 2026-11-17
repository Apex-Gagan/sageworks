"use client";

import { useState, type ReactNode } from "react";
import { Plus } from "@phosphor-icons/react";

export type AccordionItem = {
  id: string;
  /** Small label before the title, for example a number. */
  tag?: string;
  title: string;
  /** One line shown under the title while closed and open. */
  sub?: string;
  content: ReactNode;
};

/**
 * A list of headings that open one at a time. It is how the longer copy stays
 * available without loading the page with text ("do not overload", non-negotiable 2).
 */
export function Accordion({ items, first = false }: { items: AccordionItem[]; first?: boolean }) {
  const [open, setOpen] = useState<string | null>(first ? items[0]?.id ?? null : null);
  return (
    <div data-accordion className="border-t border-line">
      {items.map((it) => {
        const on = open === it.id;
        return (
          <div key={it.id} id={it.id} className="scroll-mt-28 border-b border-line">
            <h3>
              <button
                type="button"
                aria-expanded={on}
                aria-controls={`${it.id}-panel`}
                onClick={() => setOpen(on ? null : it.id)}
                className="group flex w-full items-start gap-5 py-5 text-left md:py-6"
              >
                {it.tag ? <span className="mt-1.5 w-9 shrink-0 text-[13px] font-semibold tracking-[0.1em] text-sage-ink">{it.tag}</span> : null}
                <span className="flex-1">
                  <span className="display block text-[1.45rem] transition-colors group-hover:text-sage-text md:text-[1.7rem]">{it.title}</span>
                  {it.sub ? <span className="mt-1.5 block max-w-[52rem] text-[15.5px] leading-relaxed text-ink-soft">{it.sub}</span> : null}
                </span>
                <span
                  aria-hidden
                  className={`mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                    on ? "rotate-45 border-sage bg-sage text-ink-deep" : "border-line text-ink"
                  }`}
                >
                  <Plus size={15} weight="bold" />
                </span>
              </button>
            </h3>
            <div
              id={`${it.id}-panel`}
              role="region"
              aria-label={it.title}
              className={`grid transition-[grid-template-rows] duration-500 ease-soft ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden" inert={!on}>
                <div className={`pb-7 ${it.tag ? "pl-14" : ""} max-w-[56rem] text-[16px] leading-relaxed`}>{it.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
