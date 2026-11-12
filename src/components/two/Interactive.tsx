"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export type MediaItem = {
  name: string;
  line?: string;
  body: string;
  src: string;
  blur: string;
  alt: string;
};

/**
 * Five senses with one large photograph that changes with the selected sense.
 * Hover, focus or tap a sense to tie it to a real environment.
 */
export function SensesTwo({ items }: { items: MediaItem[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-6">
        <div className="arch relative aspect-[4/3] overflow-hidden bg-surface-2 lg:sticky lg:top-28 lg:aspect-[4/5]">
          {items.map((item, i) => (
            <Image
              key={item.name}
              src={item.src}
              alt={i === active ? item.alt : ""}
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              placeholder="blur"
              blurDataURL={item.blur}
              className={`object-cover transition-[opacity,transform] duration-[900ms] ease-soft ${i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
            />
          ))}
        </div>
      </div>

      <ul className="lg:col-span-6 lg:py-6">
        {items.map((item, i) => {
          const open = i === active;
          return (
            <li key={item.name} className="border-b border-line first:border-t">
              <button
                type="button"
                aria-expanded={open}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="group flex w-full items-baseline justify-between gap-6 py-5 text-left md:py-7"
              >
                <span
                  className={`display text-[clamp(2.6rem,5.4vw,5rem)] leading-none transition-colors duration-500 ${open ? "text-accent" : "text-fg/35 group-hover:text-fg/70"}`}
                >
                  {item.name}
                </span>
                <span
                  className={`hidden text-right text-[14px] transition-opacity duration-500 sm:block ${open ? "text-fg/80 opacity-100" : "opacity-0"}`}
                >
                  {item.line}
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-700 ease-soft ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-[52ch] pb-7 text-[16px] leading-relaxed text-fg/80">{item.body}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** The questions Dr Gutsy asks, one at a time. Static list under reduced motion. */
export function QuestionRotator({ questions }: { questions: string[] }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % questions.length), 5200);
    return () => window.clearInterval(id);
  }, [questions.length, reduce]);

  if (reduce) {
    return (
      <ul className="space-y-6">
        {questions.map((q) => (
          <li key={q} className="display text-[1.8rem] leading-[1.15]">
            {q}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <div className="relative min-h-[13rem] sm:min-h-[15rem] lg:min-h-[19rem]" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="display text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.08]"
          >
            {questions[i]}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="mt-6 flex gap-2">
        {questions.map((q, n) => (
          <button
            key={q}
            type="button"
            aria-label={`Show question ${n + 1}`}
            aria-pressed={n === i}
            onClick={() => setI(n)}
            className={`h-1.5 rounded-full transition-all duration-500 ease-soft ${n === i ? "w-10 bg-accent" : "w-4 bg-fg/25 hover:bg-fg/50"}`}
          />
        ))}
      </div>
    </div>
  );
}

/** Sticky chapter pills for the founder page. Highlights the chapter in view. */
export function ChapterPills({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const rail = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  useEffect(() => {
    const el = rail.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    const parent = rail.current;
    if (el && parent) {
      parent.scrollTo({ left: el.offsetLeft - parent.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
    }
  }, [active]);

  return (
    <nav aria-label="Chapters" className="sticky top-[84px] z-20 md:top-[92px]">
      <ul
        ref={rail}
        className="no-scrollbar mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-full border border-fg/12 bg-bg/75 p-1 backdrop-blur-xl"
      >
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              data-id={item.id}
              aria-current={active === item.id ? "true" : undefined}
              className={`block whitespace-nowrap rounded-full px-4 py-2 text-[13px] transition-colors duration-300 ${active === item.id ? "bg-accent text-on-accent" : "text-fg/75 hover:text-fg"}`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export type GalleryItem = {
  key: string;
  src: string;
  blur: string;
  w: number;
  h: number;
  alt: string;
  project: string;
  place: string;
  category: string;
};

/**
 * Every project photograph in one filterable wall. Selecting a photograph
 * opens it large with its project and caption; arrow keys move between them.
 */
export function GalleryTwo({
  items,
  filters,
}: {
  items: GalleryItem[];
  filters: { id: string; label: string }[];
}) {
  const [filter, setFilter] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  const shown = filter === "all" ? items : items.filter((i) => i.category === filter);
  const current = openIndex === null ? null : shown[openIndex];

  const step = useCallback(
    (dir: number) => {
      setOpenIndex((v) => (v === null ? v : (v + dir + shown.length) % shown.length));
    },
    [shown.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, step]);

  return (
    <div>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0" role="tablist" aria-label="Filter projects">
        {[{ id: "all", label: "All work" }, ...filters].map((f) => {
          const on = f.id === filter;
          const count = f.id === "all" ? items.length : items.filter((i) => i.category === f.id).length;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => {
                setFilter(f.id);
                setOpenIndex(null);
              }}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-[14px] transition-colors duration-300 active:scale-[0.98] ${on ? "bg-accent text-on-accent" : "border border-fg/20 text-fg/80 hover:border-fg/60 hover:text-fg"}`}
            >
              {f.label}
              <span className={`ml-2 font-mono text-[11.5px] ${on ? "text-on-accent/70" : "text-muted"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 columns-2 gap-3 md:columns-3 md:gap-5 xl:columns-4">
        {shown.map((item, i) => (
          <motion.button
            key={`${filter}-${item.key}`}
            type="button"
            onClick={() => setOpenIndex(i)}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: EASE, delay: (i % 4) * 0.05 }}
            className="group mb-3 block w-full break-inside-avoid text-left md:mb-5"
            aria-label={`Open photograph: ${item.alt}`}
          >
            <span
              className="relative block overflow-hidden rounded-[18px] bg-surface"
              style={{ aspectRatio: `${item.w} / ${item.h}` }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1280px) 24vw, (min-width: 768px) 32vw, 50vw"
                placeholder="blur"
                blurDataURL={item.blur}
                className="object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.04]"
              />
            </span>
            <span className="mt-2.5 block text-[13.5px] leading-snug text-fg/90">{item.project}</span>
            <span className="block text-[12.5px] leading-snug text-muted">{item.place}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {current ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            className="fixed inset-0 z-[70] flex flex-col bg-deep/96 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpenIndex(null)}
          >
            <div className="flex items-center justify-between px-5 py-4 md:px-8">
              <p className="font-mono text-[12px] text-muted">
                {(openIndex ?? 0) + 1} / {shown.length}
              </p>
              <button
                ref={closeRef}
                type="button"
                aria-label="Close"
                onClick={() => setOpenIndex(null)}
                className="grid h-11 w-11 place-items-center rounded-full border border-fg/20 text-fg hover:bg-fg/10"
              >
                <X size={18} />
              </button>
            </div>
            <div className="relative min-h-0 flex-1 px-4 md:px-20" onClick={(e) => e.stopPropagation()}>
              <motion.div
                key={current.key}
                initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="relative h-full w-full"
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="100vw"
                  placeholder="blur"
                  blurDataURL={current.blur}
                  className="object-contain"
                />
              </motion.div>
              <button
                type="button"
                aria-label="Previous photograph"
                onClick={() => step(-1)}
                className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-fg/20 bg-deep/60 text-fg hover:bg-fg/10 md:left-6"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next photograph"
                onClick={() => step(1)}
                className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-fg/20 bg-deep/60 text-fg hover:bg-fg/10 md:right-6"
              >
                <ArrowRight size={18} />
              </button>
            </div>
            <div className="px-5 pb-6 pt-4 text-center md:px-8" onClick={(e) => e.stopPropagation()}>
              <p className="display text-[1.35rem] leading-tight">{current.project}</p>
              <p className="mt-1 text-[13.5px] text-muted">{current.alt}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
