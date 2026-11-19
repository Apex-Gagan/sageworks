"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";

export type Panel = {
  lens: string;
  line: string;
  /** Tailwind background class for the lens colour. */
  dot: string;
  src: string;
  blur: string;
  alt: string;
  pos?: string;
};

/** Each photograph leads for this long: 6 seconds, as the client asked. */
const TURN_MS = 6000;

/**
 * The homepage opening in Design 2: the three lenses of the SAGE Triad side by side,
 * across the full width. One panel leads at a time and opens wider; the others wait
 * beside it. It moves on by itself, and a visitor can choose a panel by pointing at
 * it, pressing it or tabbing to it.
 */
export function Triptych({ panels }: { panels: Panel[] }) {
  const [on, setOn] = useState(0);
  const [held, setHeld] = useState(false);

  // A page can be kept alive while hidden, or restored from the browser's back cache.
  // Either way the opening must be moving again when the visitor returns.
  const release = useCallback(() => setHeld(false), []);
  useLayoutEffect(() => release, [release]);
  useEffect(() => {
    window.addEventListener("pageshow", release);
    window.addEventListener("pagehide", release);
    return () => {
      window.removeEventListener("pageshow", release);
      window.removeEventListener("pagehide", release);
    };
  }, [release]);

  useEffect(() => {
    if (held) return;
    const t = window.setTimeout(() => setOn((v) => (v + 1) % panels.length), TURN_MS);
    return () => window.clearTimeout(t);
  }, [on, held, panels.length]);

  return (
    <div
      data-triptych
      data-active={on}
      data-held={held}
      onMouseLeave={release}
      className="flex h-[78svh] max-h-[720px] min-h-[540px] flex-col gap-1.5 md:h-[calc(100svh-470px)] md:min-h-[420px] md:flex-row md:gap-2"
    >
      {panels.map((p, i) => {
        const lead = i === on;
        return (
          <button
            key={p.lens}
            type="button"
            data-panel={p.lens}
            aria-pressed={lead}
            aria-label={`${p.lens}: ${p.line}`}
            onClick={() => setOn(i)}
            onMouseEnter={() => {
              setOn(i);
              setHeld(true);
            }}
            onFocus={() => setOn(i)}
            style={{ flexGrow: lead ? 2.8 : 1 }}
            className="group relative min-h-0 min-w-0 basis-0 overflow-hidden bg-surface text-left transition-[flex-grow] duration-[1100ms] ease-soft"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              preload={i === 0}
              sizes="(min-width: 768px) 62vw, 100vw"
              placeholder="blur"
              blurDataURL={p.blur}
              className={`object-cover transition-transform duration-[2200ms] ease-soft ${lead ? "scale-100" : "scale-[1.08]"}`}
              style={p.pos ? { objectPosition: p.pos } : undefined}
            />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/5" />
            <span aria-hidden="true" className={`absolute inset-0 bg-white transition-opacity duration-700 ${lead ? "opacity-0" : "opacity-[0.22]"}`} />

            <span className="absolute inset-x-0 bottom-0 flex flex-col p-5 text-white [text-shadow:0_1px_12px_rgb(0_0_0/0.55)] md:p-7">
              <span className="flex items-center gap-2.5 text-[12.5px] font-semibold uppercase tracking-[0.16em]">
                <span className={`h-2.5 w-2.5 rounded-full ${p.dot}`} />
                {p.lens}
              </span>
              <span
                data-panel-line
                className={`display mt-2 block max-w-[24ch] text-[clamp(1.5rem,2.6vw,2.4rem)] transition-all duration-700 ease-soft ${
                  lead ? "translate-y-0 opacity-100" : "pointer-events-none max-h-0 translate-y-3 opacity-0 md:max-h-none"
                }`}
              >
                {p.line}
              </span>
              <span className="mt-4 block h-[2px] w-full overflow-hidden bg-white/35">
                {lead && !held ? (
                  <span key={`${on}`} className="block h-full origin-left bg-white" style={{ animation: `progress ${TURN_MS}ms linear forwards` }} />
                ) : (
                  <span className={`block h-full origin-left bg-white ${lead ? "scale-x-100" : "scale-x-0"}`} />
                )}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
