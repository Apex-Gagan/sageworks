"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

export type FilmSlide = {
  lens: string;
  line: string;
  /** Tailwind background class for the lens colour dot. */
  dot: string;
  src: string;
  blur: string;
  alt: string;
  pos?: string;
};

const SLIDE_MS = 6500;

/**
 * The homepage opening. Dr Shruti asked for a video of images that tells the
 * "designing human systems" story through the three lenses of the SAGE Triad
 * (questionnaire, Q22). Until that film is supplied, this plays the same idea with
 * stills: one photograph per lens, each pushing in slowly and dissolving into the next.
 * Replace the stills with a <video> here when the edited film arrives.
 */
export function HeroFilm({ slides, children }: { slides: FilmSlide[]; children: ReactNode }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const hover = useRef(false);

  const go = useCallback((n: number) => setI(((n % slides.length) + slides.length) % slides.length), [slides.length]);

  // The timer restarts whenever the slide changes, so a lens picked by hand gets its full time.
  useEffect(() => {
    if (reduce || paused) return;
    const t = window.setTimeout(() => setI((v) => (v + 1) % slides.length), SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [i, paused, reduce, slides.length]);

  return (
    <div
      data-hero-film
      data-slide={i}
      className="leafcut relative isolate flex min-h-[560px] flex-col justify-end bg-surface md:min-h-[min(78vh,760px)]"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") {
          hover.current = true;
          setPaused(true);
        }
      }}
      onPointerLeave={() => {
        hover.current = false;
        setPaused(false);
      }}
      onFocusCapture={(e) => {
        if ((e.target as HTMLElement).matches(":focus-visible")) setPaused(true);
      }}
      onBlurCapture={() => {
        if (!hover.current) setPaused(false);
      }}
    >
      {slides.map((s, n) => (
        <div
          key={s.src}
          aria-hidden={n !== i}
          className="absolute inset-0 -z-10 transition-opacity duration-[1400ms] ease-soft"
          style={{ opacity: n === i ? 1 : 0 }}
        >
          <Image
            src={s.src}
            alt={n === i ? s.alt : ""}
            fill
            sizes="(min-width: 1360px) 1240px, 100vw"
            preload={n === 0}
            placeholder="blur"
            blurDataURL={s.blur}
            className="object-cover"
            style={{
              objectPosition: s.pos ?? "50% 50%",
              animation: reduce || n !== i ? undefined : `kenburns ${SLIDE_MS + 1600}ms ease-out both`,
            }}
          />
        </div>
      ))}
      {/*
        Two scrims keep the white words readable on any photograph: one from the left,
        where the headline sits, and one from the bottom, under the buttons and lens
        tabs. The right side of the picture stays clear. A test measures the contrast
        behind the headline on every slide.
      */}
      <div data-hero-scrim className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/60 to-black/40 lg:from-black/70 lg:via-black/30 lg:to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12 lg:p-14">
        <div data-hero-copy className="min-w-0 max-w-[46rem] text-white [text-shadow:0_1px_2px_rgb(0_0_0/0.35),0_2px_28px_rgb(0_0_0/0.45)]">{children}</div>

        <div role="group" aria-label="The three lenses of the SAGE Triad" className="flex min-w-0 flex-col gap-2 sm:flex-row lg:w-[19rem] lg:flex-col lg:gap-2.5">
          {slides.map((s, n) => (
            <button
              key={s.lens}
              type="button"
              data-film-lens={s.lens}
              aria-pressed={n === i}
              onClick={() => go(n)}
              className={`group relative min-w-0 flex-1 overflow-hidden rounded-[3px] px-3.5 py-2.5 text-left backdrop-blur-sm transition-colors duration-300 sm:py-3 ${
                n === i ? "bg-white text-ink-deep" : "bg-black/45 text-white hover:bg-black/60"
              }`}
            >
              <span className="flex items-center gap-2.5 text-[15px] font-semibold">
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${s.dot}`} />
                {s.lens}
              </span>
              <span className={`mt-1 hidden text-[13.5px] leading-snug lg:block ${n === i ? "text-ink" : "text-white/85"}`}>
                {s.line}
              </span>
              {n === i && !reduce ? (
                <span
                  key={`${i}-${paused}`}
                  className={`absolute inset-x-0 bottom-0 h-[3px] origin-left ${s.dot}`}
                  style={{
                    animation: `progress ${SLIDE_MS}ms linear both`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                />
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
