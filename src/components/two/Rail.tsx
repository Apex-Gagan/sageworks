"use client";

import { useEffect, useState } from "react";

/**
 * The five questions the client set for phase 1, kept beside the homepage as a list
 * that stays in view. It marks the question being answered and jumps to any other.
 */
export function Rail({ items }: { items: { id: string; q: string }[] }) {
  const [at, setAt] = useState(items[0].id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setAt(e.target.id);
      },
      // A band across the upper middle of the screen decides which answer is current.
      { rootMargin: "-35% 0px -55% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="The five questions" data-rail className="sticky top-44">
      <p className="eyebrow">Five questions</p>
      <ol className="mt-5 border-l border-line">
        {items.map((it, n) => {
          const on = it.id === at;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                aria-current={on ? "true" : undefined}
                className={`-ml-px flex gap-3.5 border-l-2 py-3 pl-5 pr-2 text-[15px] leading-snug transition-colors duration-300 ${
                  on ? "border-sage font-semibold text-ink-deep" : "border-transparent text-ink-soft hover:text-sage-ink"
                }`}
              >
                <span className={`display text-[1.05rem] leading-none ${on ? "text-sage-text" : ""}`}>{String(n + 1).padStart(2, "0")}</span>
                {it.q}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
