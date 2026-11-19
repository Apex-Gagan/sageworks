"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

/**
 * A row that scrolls sideways, with previous and next buttons. It also scrolls by
 * touch, trackpad and keyboard, and each item stops cleanly at the left edge.
 */
export function Slider({ children, label, className = "" }: { children: ReactNode; label: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new ResizeObserver(measure);
    io.observe(el);
    el.addEventListener("scroll", measure, { passive: true });
    return () => {
      io.disconnect();
      el.removeEventListener("scroll", measure);
    };
  }, [measure]);

  const move = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * Math.max(320, el.clientWidth * 0.8), behavior: "smooth" });
  };

  const btn = "inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 enabled:hover:border-sage enabled:hover:bg-sage enabled:hover:text-ink-deep disabled:opacity-35";

  return (
    <div data-slider className={className}>
      <div
        ref={ref}
        role="group"
        aria-label={label}
        tabIndex={0}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1"
      >
        {children}
      </div>
      <div className="mt-6 flex items-center gap-2">
        <button type="button" data-slider-prev onClick={() => move(-1)} disabled={edge.start} aria-label={`${label}: previous`} className={btn}>
          <ArrowLeft size={17} weight="bold" />
        </button>
        <button type="button" data-slider-next onClick={() => move(1)} disabled={edge.end} aria-label={`${label}: next`} className={btn}>
          <ArrowRight size={17} weight="bold" />
        </button>
      </div>
    </div>
  );
}
