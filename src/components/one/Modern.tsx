"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

/**
 * Sample 1's motion layer. Same paper, ink and serif as before; these pieces
 * add how things arrive and how sections respond to scroll.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

type Segment = { text: string; className?: string };

/**
 * Headline words rise out of a mask, one after another.
 *
 * The trigger sits on the unmasked outer span and the words follow through
 * variants. A fully masked element counts as "not visible" to the browser, so
 * watching the masked words themselves would never fire.
 */
export function WordsUp({
  segments,
  delay = 0,
  inView = false,
}: {
  segments: Segment[];
  delay?: number;
  /** Wait until the headline scrolls into view (for headings below the fold). */
  inView?: boolean;
}) {
  const reduce = useReducedMotion();
  const trigger = inView
    ? { whileInView: "shown", viewport: { once: true, amount: 0.5 } }
    : { animate: "shown" };
  return (
    <motion.span
      initial={reduce ? false : "hidden"}
      {...trigger}
      transition={{ staggerChildren: 0.05, delayChildren: delay }}
    >
      {segments.map((seg, si) => (
        <span key={si} className={seg.className}>
          {seg.text.split(" ").map((word, wi) => (
            <span key={wi}>
              <span className="-mx-[0.08em] -mb-[0.16em] inline-block overflow-hidden px-[0.08em] pb-[0.16em] align-bottom">
                <motion.span
                  className="inline-block will-change-transform"
                  variants={{ hidden: { y: "118%" }, shown: { y: "0%" } }}
                  transition={{ duration: 0.95, ease: EASE }}
                >
                  {word}
                </motion.span>
              </span>{" "}
            </span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}

/**
 * A photograph is uncovered from the bottom while it settles from a slight
 * zoom. As with WordsUp, the outer wrapper is the trigger and is never masked.
 */
export function Curtain({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, amount: 0.12 }}
    >
      <motion.div
        className="h-full w-full overflow-hidden"
        variants={{
          hidden: { clipPath: "inset(100% 0% 0% 0%)" },
          shown: { clipPath: "inset(0% 0% 0% 0%)" },
        }}
        transition={{ duration: 1.25, delay, ease: EASE }}
      >
        <motion.div
          className="h-full w-full will-change-transform"
          variants={{ hidden: { scale: 1.16 }, shown: { scale: 1 } }}
          transition={{ duration: 1.7, delay, ease: EASE }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/** Moves a little against the scroll, so overlapping photographs separate in depth. */
export function Drift({
  children,
  className = "",
  distance = 60,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <motion.div ref={ref} style={reduce ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
}

/** Counts up to a figure the first time it is seen. Text such as "PhD" is left alone. */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const match = value.match(/^([\d,]+)(.*)$/);

  useEffect(() => {
    if (!match || !seen || reduce || !ref.current) return;
    const el = ref.current;
    const end = Number(match[1].replace(/,/g, ""));
    const controls = animate(0, end, {
      duration: 1.9,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = Math.round(v).toLocaleString("en-GB") + match[2];
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen, reduce, value]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {value}
    </span>
  );
}

/** Reading progress along the bottom edge of the header. */
export function ProgressLine() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="absolute inset-x-0 -bottom-px h-[2px] origin-left bg-accent"
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Scroll steps: the photograph stays, the explanation scrolls past it          */
/* -------------------------------------------------------------------------- */

export type Step = {
  name: string;
  question: string;
  body: string;
  detail: string;
  src: string;
  blur: string;
  alt: string;
};

export function ScrollSteps({ items }: { items: Step[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-5">
        {items.map((item, i) => (
          <div
            key={item.name}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-step={i}
            className={`flex flex-col justify-center border-t border-line py-10 transition-opacity duration-700 lg:min-h-[72vh] lg:border-t-0 lg:py-0 ${active === i ? "lg:opacity-100" : "lg:opacity-30"}`}
          >
            {/* Small screens: each step carries its own photograph */}
            <div className="relative mb-7 aspect-[16/10] overflow-hidden bg-surface lg:hidden">
              <Image src={item.src} alt={item.alt} fill sizes="100vw" placeholder="blur" blurDataURL={item.blur} className="object-cover" />
            </div>
            <p className="display text-[1.35rem] italic leading-snug text-accent">{item.question}</p>
            <h3 className="display mt-2 text-[clamp(3rem,6vw,5.5rem)] leading-[0.95]">{item.name}</h3>
            <p className="mt-6 max-w-[42ch] text-[16.5px] leading-relaxed text-fg/85">{item.body}</p>
            <p className="mt-4 max-w-[42ch] border-t border-line pt-4 text-[14.5px] leading-relaxed text-muted">
              {item.detail}
            </p>
          </div>
        ))}
      </div>

      <div className="hidden lg:col-span-6 lg:col-start-7 lg:block">
        <div className="sticky top-24 flex h-[calc(100dvh-8rem)] items-center gap-6">
          <div className="relative h-full max-h-[720px] flex-1 overflow-hidden bg-surface">
            {items.map((item, i) => (
              <Image
                key={item.src}
                src={item.src}
                alt={i === active ? item.alt : ""}
                fill
                sizes="46vw"
                placeholder="blur"
                blurDataURL={item.blur}
                className="object-cover transition-[clip-path,transform] duration-[1100ms] ease-soft"
                style={{
                  clipPath: i <= active ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
                  transform: i === active ? "scale(1)" : "scale(1.08)",
                  zIndex: i,
                }}
              />
            ))}
          </div>
          <ol className="flex flex-col gap-3" aria-hidden="true">
            {items.map((item, i) => (
              <li key={item.name} className="flex items-center gap-3">
                <span
                  className={`block w-px transition-all duration-700 ease-soft ${i === active ? "h-14 bg-accent" : "h-6 bg-line"}`}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Pinned gallery: vertical scroll pans the row sideways                        */
/* -------------------------------------------------------------------------- */

export type PinItem = {
  src: string;
  blur: string;
  alt: string;
  title: string;
  place: string;
};

/**
 * Wide screens with motion allowed: the section pins and the photographs pan
 * as the page scrolls. Everything else gets the ordinary slider passed in as
 * `fallback`. The switch is done in CSS so server and client markup match.
 */
export function PinnedGallery({
  items,
  header,
  fallback,
}: {
  items: PinItem[];
  header: ReactNode;
  fallback: ReactNode;
}) {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0, 1], [0.04, 1]);

  return (
    <>
      <div
        ref={section}
        data-pinned-gallery
        className="relative hidden lg:motion-safe:block"
        style={{ height: `calc(100dvh + ${distance}px)` }}
      >
        <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden">
          {header}
          <motion.div ref={track} style={{ x }} className="flex w-max items-end gap-8 px-10 will-change-transform">
            {items.map((g, i) => {
              const tall = i % 3 === 1;
              return (
                <figure key={g.src} className={`shrink-0 ${tall ? "w-[19vw]" : "w-[34vw]"}`}>
                  <div
                    className="relative overflow-hidden bg-surface-2"
                    style={{ aspectRatio: tall ? "3 / 4" : "4 / 3" }}
                  >
                    <Image
                      src={g.src}
                      alt={g.alt}
                      fill
                      sizes="34vw"
                      placeholder="blur"
                      blurDataURL={g.blur}
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-4">
                    <p className="display text-[1.4rem] leading-tight">{g.title}</p>
                    <p className="mt-1 text-[13px] text-muted">{g.place}</p>
                  </figcaption>
                </figure>
              );
            })}
          </motion.div>
          <div className="mx-10 mt-10 h-px bg-line">
            <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-accent" />
          </div>
        </div>
      </div>
      <div className="lg:motion-safe:hidden">{fallback}</div>
    </>
  );
}
