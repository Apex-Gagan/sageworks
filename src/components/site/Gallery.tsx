"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";

export type GalleryItem = {
  src: string;
  w: number;
  h: number;
  alt: string;
  /** Project or setting the photograph belongs to. */
  title: string;
  /** One line from the client's catalogue comment. */
  note?: string;
  group: string;
};

/**
 * The photo gallery: the one place photographs are shown in number, so the other
 * pages can stay light (non-negotiable 3). Filter by kind of place; open any
 * photograph full screen and move through the set with the arrows or the keyboard.
 */
export function Gallery({ items, groups, start = "All" }: { items: GalleryItem[]; groups: string[]; start?: string }) {
  const [group, setGroup] = useState(start);
  const [at, setAt] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const shown = useMemo(() => (group === "All" ? items : items.filter((i) => i.group === group)), [group, items]);

  const close = useCallback(() => {
    setAt(null);
    opener.current?.focus();
  }, []);
  const step = useCallback((d: number) => setAt((v) => (v === null ? v : (v + d + shown.length) % shown.length)), [shown.length]);

  useEffect(() => {
    if (at === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", key);
    closeBtn.current?.focus();
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", key);
    };
  }, [at, close, step]);

  // Next keeps this page alive after you leave it, and the browser may restore it whole
  // from its Back cache, so close the viewer on the way out in both cases.
  useLayoutEffect(() => () => setAt(null), []);
  useEffect(() => {
    const leave = () => {
      setAt(null);
      document.documentElement.style.overflow = "";
    };
    window.addEventListener("pagehide", leave);
    return () => window.removeEventListener("pagehide", leave);
  }, []);

  const cur = at === null ? null : shown[at];

  return (
    <div data-gallery>
      <div role="group" aria-label="Filter photographs" className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {[...groups, "All"].map((g) => (
          <button
            key={g}
            type="button"
            aria-pressed={group === g}
            onClick={() => setGroup(g)}
            className={`shrink-0 rounded-full border px-5 py-2.5 text-[15px] font-semibold transition-colors duration-300 ${
              group === g ? "border-sage bg-sage text-ink-deep" : "border-line bg-white text-ink hover:border-sage-ink hover:text-sage-ink"
            }`}
          >
            {g}
          </button>
        ))}
      </div>
      <p className="mt-4 text-[14.5px] text-ink-soft" aria-live="polite">
        <span data-gallery-count>{shown.length}</span> photographs
      </p>

      <ul className="mt-6 columns-2 gap-3 md:columns-3 xl:columns-4">
        {shown.map((it, n) => (
          <li key={it.src} className="mb-3 break-inside-avoid">
            <button
              type="button"
              data-gallery-item
              onClick={(e) => {
                opener.current = e.currentTarget;
                setAt(n);
              }}
              className="group relative block w-full overflow-hidden bg-surface text-left"
              style={{ aspectRatio: `${it.w} / ${it.h}` }}
              aria-label={`Open photograph: ${it.alt}`}
            >
              <Image
                src={it.src}
                alt={it.alt}
                fill
                sizes="(min-width: 1280px) 24vw, (min-width: 768px) 32vw, 48vw"
                className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.04]"
              />
              <span className="absolute inset-x-0 bottom-0 translate-y-full bg-white/92 px-3 py-2 text-[13px] font-medium text-ink-deep transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">
                {it.title}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {cur ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photograph viewer"
          data-gallery-viewer
          className="fixed inset-0 z-[80] flex flex-col bg-white"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-10">
            <p className="text-[14.5px] text-ink-soft">
              <span data-viewer-index>{(at ?? 0) + 1}</span> of {shown.length}
            </p>
            <button
              ref={closeBtn}
              type="button"
              onClick={close}
              aria-label="Close viewer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink hover:border-sage-ink hover:text-sage-ink"
            >
              <X size={20} />
            </button>
          </div>
          <div className="relative min-h-0 flex-1 px-5 md:px-20">
            <Image key={cur.src} src={cur.src} alt={cur.alt} fill sizes="100vw" className="object-contain" />
          </div>
          <div className="flex items-center justify-between gap-6 px-5 py-5 md:px-10">
            <div className="min-w-0">
              <p className="display truncate text-[1.4rem]">{cur.title}</p>
              <p data-viewer-note className="line-clamp-2 text-[14.5px] text-ink-soft">
                {cur.note ?? cur.alt}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photograph"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sage text-ink-deep hover:bg-sage-deep"
              >
                <ArrowLeft size={20} weight="bold" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photograph"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sage text-ink-deep hover:bg-sage-deep"
              >
                <ArrowRight size={20} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
