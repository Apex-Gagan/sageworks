"use client";

import { useState, type ReactNode } from "react";
import { useHash } from "./useHash";

export type ChapterTab = {
  id: string;
  role: string;
  /** Everything shown when the chapter is chosen, rendered on the server. */
  panel: ReactNode;
};

/**
 * The founder page's chapters as tabs: the seven roles listed once, and one chapter
 * open at a time beside them. A link to a chapter (for example /2/founder#scientist)
 * opens that chapter.
 */
export function ChapterTabs({ chapters }: { chapters: ChapterTab[] }) {
  const hash = useHash();
  const [picked, setPicked] = useState<string | null>(null);
  const id = picked ?? (chapters.some((c) => c.id === hash) ? hash : chapters[0].id);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = chapters[(i + d + chapters.length) % chapters.length];
    setPicked(next.id);
    document.getElementById(`chapter-tab-${next.id}`)?.focus();
  };

  return (
    <div data-chapters className="grid gap-x-14 gap-y-8 lg:grid-cols-[300px_minmax(0,1fr)]">
      <div
        role="tablist"
        aria-label="Chapters"
        aria-orientation="vertical"
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:-mx-10 md:px-10 lg:sticky lg:top-44 lg:mx-0 lg:block lg:self-start lg:overflow-visible lg:border-b lg:border-line lg:px-0 lg:pb-0"
      >
        {chapters.map((c, i) => {
          const on = c.id === id;
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              id={`chapter-tab-${c.id}`}
              aria-selected={on}
              aria-controls={`chapter-panel-${c.id}`}
              tabIndex={on ? 0 : -1}
              data-chapter-tab={c.id}
              onClick={() => setPicked(c.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`flex shrink-0 items-baseline gap-4 whitespace-nowrap rounded-full border px-4 py-2 text-left text-[15px] transition-colors duration-300 lg:w-full lg:whitespace-normal lg:rounded-none lg:border-0 lg:border-t lg:border-line lg:px-3 lg:py-4 lg:text-[16px] ${
                on ? "border-transparent bg-mint font-semibold text-ink-deep" : "border-line text-ink hover:text-sage-ink lg:hover:bg-paper"
              }`}
            >
              <span className={`display text-[1.05rem] leading-none ${on ? "text-ink-deep" : "text-sage-text"}`}>{String(i + 1).padStart(2, "0")}</span>
              {c.role}
            </button>
          );
        })}
      </div>

      <div>
        {chapters.map((c) => (
          <div
            key={c.id}
            role="tabpanel"
            id={`chapter-panel-${c.id}`}
            aria-labelledby={`chapter-tab-${c.id}`}
            data-chapter-panel={c.id}
            hidden={c.id !== id}
            tabIndex={0}
          >
            {c.panel}
          </div>
        ))}
      </div>
    </div>
  );
}
