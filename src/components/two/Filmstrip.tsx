"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import { Slider } from "./Slider";

type Shot = { src: string; w: number; h: number; alt: string; blur: string; title: string; note?: string };
export type StripData = { name: string; line: string; dot?: string; items: Shot[] };

/**
 * The photo gallery in Design 2: one strip for each kind of place, scrolling sideways
 * at one height like a strip of film. Choosing a photograph opens it large, with its
 * caption, and the arrow keys move along the strip.
 */
export function Filmstrip({ strips }: { strips: StripData[] }) {
  const [view, setView] = useState<{ s: number; i: number } | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setView(null), []);
  const step = useCallback(
    (d: 1 | -1) =>
      setView((v) => {
        if (!v) return v;
        const len = strips[v.s].items.length;
        return { s: v.s, i: (v.i + d + len) % len };
      }),
    [strips],
  );

  useEffect(() => {
    // Never come back to an open viewer from the browser's back cache.
    window.addEventListener("pagehide", close);
    return () => window.removeEventListener("pagehide", close);
  }, [close]);

  useEffect(() => {
    if (!view) return;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", key);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", key);
    };
  }, [view, close, step]);

  const cur = view ? strips[view.s].items[view.i] : null;
  const round = "inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors duration-300 hover:border-sage hover:bg-sage hover:text-ink-deep";

  return (
    <div data-filmstrip>
      {strips.map((s, si) => (
        <section key={s.name} data-strip={s.name} className="border-t border-line py-10 md:py-12">
          <div className="mb-7 flex flex-wrap items-baseline gap-x-6 gap-y-1">
            <h3 className="display flex items-center gap-3 text-[1.9rem] md:text-[2.2rem]">
              {s.dot ? <span className={`h-3 w-3 rounded-full ${s.dot}`} /> : null}
              {s.name}
            </h3>
            <p className="text-[15px] text-ink-soft">{s.line}</p>
            <p className="ml-auto text-[12.5px] font-semibold uppercase tracking-[0.14em] text-ink-soft">{s.items.length} photographs</p>
          </div>
          <Slider label={s.name}>
            {s.items.map((it, i) => (
              <figure key={it.src} className="w-[min(82vw,var(--w))] shrink-0 snap-start" style={{ ["--w" as string]: `${Math.round((it.w / it.h) * 340)}px` }}>
                <button
                  type="button"
                  data-strip-photo
                  aria-label={`Open the photograph: ${it.alt}`}
                  onClick={() => setView({ s: si, i })}
                  className="group relative block w-full overflow-hidden bg-surface"
                  style={{ aspectRatio: `${it.w} / ${it.h}` }}
                >
                  <Image
                    src={it.src}
                    alt={it.alt}
                    fill
                    sizes="(min-width: 768px) 520px, 82vw"
                    placeholder="blur"
                    blurDataURL={it.blur}
                    className="object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.03]"
                  />
                </button>
                <figcaption className="mt-3 border-t border-line pt-3">
                  <p className="text-[15px] font-semibold leading-snug">{it.title}</p>
                  {it.note ? <p className="mt-1 text-[13.5px] leading-snug text-ink-soft">{it.note}</p> : null}
                </figcaption>
              </figure>
            ))}
          </Slider>
        </section>
      ))}

      {view && cur ? (
        <div role="dialog" aria-modal="true" aria-label={`${cur.title}, photograph ${view.i + 1} of ${strips[view.s].items.length}`} data-viewer className="fixed inset-0 z-[95] flex flex-col bg-white">
          <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3 md:px-10">
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-sage-ink">
              {strips[view.s].name}
              <span className="ml-3 text-ink-soft">
                {String(view.i + 1).padStart(2, "0")} / {String(strips[view.s].items.length).padStart(2, "0")}
              </span>
            </p>
            <button ref={closeRef} type="button" data-viewer-close onClick={close} aria-label="Close the photograph" className={round}>
              <X size={19} />
            </button>
          </div>
          <div className="relative min-h-0 flex-1">
            <Image key={cur.src} src={cur.src} alt={cur.alt} fill sizes="100vw" className="object-contain p-4 md:p-8" />
          </div>
          <div className="flex items-center gap-4 border-t border-line px-5 py-4 md:px-10">
            <div className="min-w-0 flex-1">
              <p data-viewer-title className="display truncate text-[1.4rem] md:text-[1.6rem]">
                {cur.title}
              </p>
              {cur.note ? <p className="mt-0.5 text-[14px] text-ink-soft">{cur.note}</p> : null}
            </div>
            <button type="button" data-viewer-prev onClick={() => step(-1)} aria-label="Previous photograph" className={round}>
              <ArrowLeft size={18} weight="bold" />
            </button>
            <button type="button" data-viewer-next onClick={() => step(1)} aria-label="Next photograph" className={round}>
              <ArrowRight size={18} weight="bold" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
