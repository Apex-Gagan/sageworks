"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export type SenseItem = {
  name: string;
  line: string;
  /** The headline number for this sense, taken from the cited finding. Null when none is supplied yet. */
  figure: string | null;
  figureLabel: string;
  finding: string;
  source: string;
  /** Longer copy, shown on the Five Senses page only. */
  body?: string;
  practice?: string;
  src: string;
  blur: string;
  alt: string;
};

/**
 * The five senses, each led by one number from the research Sagework cites
 * (the client asked for "numerical statistics for the five senses"). Tabs keep the
 * section to one sense on screen at a time, so the page stays light on text.
 */
export function Senses({ items, detailed = false }: { items: SenseItem[]; detailed?: boolean }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const s = items[i];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const n = (i + (e.key === "ArrowRight" ? 1 : -1) + items.length) % items.length;
    setI(n);
    document.getElementById(`sense-tab-${items[n].name}`)?.focus();
  };

  return (
    <div data-senses>
      <div role="tablist" aria-label="The five senses" onKeyDown={onKey} className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {items.map((it, n) => (
          <button
            key={it.name}
            id={`sense-tab-${it.name}`}
            type="button"
            role="tab"
            aria-selected={n === i}
            aria-controls="sense-panel"
            tabIndex={n === i ? 0 : -1}
            onClick={() => setI(n)}
            className={`shrink-0 rounded-full border px-5 py-2.5 text-[15px] font-semibold transition-colors duration-300 ${
              n === i ? "border-sage bg-sage text-ink-deep" : "border-line bg-white text-ink hover:border-sage-ink hover:text-sage-ink"
            }`}
          >
            {it.name}
          </button>
        ))}
      </div>

      <div id="sense-panel" role="tabpanel" aria-labelledby={`sense-tab-${s.name}`} className="mt-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={s.name}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch lg:gap-14"
          >
            <div className="leafcut-sm relative aspect-[4/3] bg-surface lg:aspect-auto lg:min-h-[380px]">
              <Image src={s.src} alt={s.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" placeholder="blur" blurDataURL={s.blur} className="object-cover" />
            </div>

            <div className="flex flex-col justify-center">
              <p className="eyebrow">{s.line}</p>
              {s.figure ? (
                <p data-sense-figure className="display mt-4 text-[clamp(4rem,9vw,7.5rem)] leading-none text-sage-text">
                  {s.figure}
                </p>
              ) : (
                <p data-sense-figure className="display mt-4 text-[clamp(4rem,9vw,7.5rem)] leading-none text-line">
                  %
                </p>
              )}
              <p className="mt-2 text-[15px] font-semibold text-ink">{s.figureLabel}</p>
              <p className="mt-5 max-w-[38rem] text-[16.5px] leading-relaxed">{s.finding}</p>
              <p className="mt-2 text-[13.5px] text-ink-soft">Source: {s.source}</p>
              {detailed && s.body ? <p className="mt-6 max-w-[38rem] border-t border-line pt-6 text-[16px] leading-relaxed">{s.body}</p> : null}
              {detailed && s.practice ? <p className="mt-4 max-w-[38rem] text-[16px] leading-relaxed">{s.practice}</p> : null}
              {!s.figure ? (
                <p data-note className="mt-5 max-w-[38rem] border border-dashed border-amber bg-cream/45 px-4 py-3 text-[14px] leading-snug text-ink-deep">
                  <span className="block text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[#8a5f00]">Content needed</span>
                  A headline figure for {s.name.toLowerCase()}. Why: the cited source for this sense gives recommendations, not a number,
                  and Sagework is supplying the statistics.
                </p>
              ) : null}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
