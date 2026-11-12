"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, CaretDown, CheckCircle, Images, X } from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Media = { src: string; blur: string; alt: string };

/* -------------------------------------------------------------------------- */
/* Hero slider                                                                 */
/* -------------------------------------------------------------------------- */

export type HeroSlide = Media & {
  /** Headline split so the key words can sit in the highlighter. */
  pre: string;
  mark: string;
  post?: string;
  sub: string;
  cta: { label: string; href: string };
};

const SLIDE_MS = 7000;
const SWIPE_PX = 48;

/**
 * Full-width photo slider with a centred message on each slide. The current
 * photograph pushes in slowly, the key words are highlighted as they arrive,
 * and the row of small photographs underneath shows what comes next.
 * Move with the arrows, the thumbnails, the left and right keys or a swipe.
 * Pauses while the pointer rests on it or a keyboard user is on its controls,
 * and does not move on its own under reduced motion.
 */
export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  // `prev` keeps the outgoing photograph moving while it fades, so it never snaps back.
  const [{ i, prev }, setAt] = useState<{ i: number; prev: number | null }>({ i: 0, prev: null });
  const [hovered, setHovered] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const touchX = useRef<number | null>(null);
  const reduce = useReducedMotion();
  const auto = !reduce && !hovered && !keyboardFocus;

  const show = useCallback(
    (next: number | ((v: number) => number)) =>
      setAt((s) => {
        const n = typeof next === "function" ? next(s.i) : next;
        return n === s.i ? s : { i: n, prev: s.i };
      }),
    [],
  );
  const go = useCallback(
    (dir: number) => show((v) => (v + dir + slides.length) % slides.length),
    [show, slides.length],
  );

  useEffect(() => {
    if (!auto) return;
    const id = window.setTimeout(() => go(1), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [i, auto, go]);

  const s = slides[i];
  const Title = i === 0 ? "h1" : "p";
  const external = s.cta.href.startsWith("mailto:");
  const ctaClass =
    "inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border-[1.5px] border-white px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:bg-white hover:text-[#151b25] active:scale-[0.98]";

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Sagework at a glance"
      className="relative isolate overflow-hidden bg-deep"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={(e) => setKeyboardFocus((e.target as HTMLElement).matches(":focus-visible"))}
      onBlur={() => setKeyboardFocus(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > SWIPE_PX) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className="absolute inset-0 -z-10">
        {slides.map((slide, n) => {
          const moving = n === i || n === prev;
          return (
            <Image
              key={slide.src}
              src={slide.src}
              alt={n === i ? slide.alt : ""}
              fill
              preload={n === 0}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={slide.blur}
              className={`object-cover transition-opacity duration-[1600ms] ease-soft ${n === i ? "opacity-100" : "opacity-0"}`}
              style={{
                transformOrigin: n % 2 ? "70% 40%" : "30% 60%",
                animation: moving && !reduce ? `kenburns ${SLIDE_MS + 2600}ms ease-out forwards` : undefined,
              }}
            />
          );
        })}
        <div className="absolute inset-0 bg-[#10181f]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#10181f]/80 via-transparent to-[#10181f]/25" />
      </div>

      <div className="mx-auto flex min-h-[min(80dvh,780px)] max-w-[1100px] flex-col items-center justify-center px-14 pb-36 pt-16 text-center text-white md:min-h-[min(84dvh,820px)] md:px-24 md:pb-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -14 }}
            transition={{ duration: 0.6, ease: EASE }}
            aria-live="polite"
          >
            <Title className="display mx-auto max-w-[20ch] text-[clamp(2.2rem,5.2vw,4.5rem)] leading-[1.12]">
              {s.pre} <span className="hl-wipe">{s.mark}</span>
              {s.post ? ` ${s.post}` : ""}
            </Title>
            <p className="mx-auto mt-6 max-w-[52ch] text-[17px] leading-relaxed text-white/90 md:text-[19px]">{s.sub}</p>
            <div className="mt-9">
              {external ? (
                <a href={s.cta.href} className={ctaClass}>
                  {s.cta.label}
                </a>
              ) : (
                <Link href={s.cta.href} className={ctaClass}>
                  {s.cta.label}
                </Link>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(-1)}
        className="absolute left-3 top-[44%] grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/50 text-white transition-colors duration-300 hover:bg-white hover:text-[#151b25] md:left-8 md:h-12 md:w-12"
      >
        <ArrowLeft size={18} />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(1)}
        className="absolute right-3 top-[44%] grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/50 text-white transition-colors duration-300 hover:bg-white hover:text-[#151b25] md:right-8 md:h-12 md:w-12 lg:right-16"
      >
        <ArrowRight size={18} />
      </button>

      {/* What comes next: a small photograph per slide, the current one filling up */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2.5 px-5 md:bottom-8 md:gap-3">
        {slides.map((slide, n) => {
          const on = n === i;
          return (
            <button
              key={slide.src}
              type="button"
              data-slide-thumb
              aria-label={`Show slide ${n + 1}: ${slide.pre} ${slide.mark}`}
              aria-pressed={on}
              onClick={() => show(n)}
              className={`group relative h-11 w-[4.25rem] overflow-hidden rounded-[8px] transition-[transform,box-shadow] duration-500 ease-soft md:h-[3.75rem] md:w-24 ${on ? "-translate-y-1 shadow-[0_0_0_2px_var(--accent)]" : "shadow-[0_0_0_1px_rgba(255,255,255,0.45)] hover:-translate-y-0.5"}`}
            >
              <Image
                src={slide.src}
                alt=""
                fill
                sizes="96px"
                placeholder="blur"
                blurDataURL={slide.blur}
                className="object-cover"
              />
              <span
                className={`absolute inset-0 bg-[#10181f] transition-opacity duration-500 ${on ? "opacity-0" : "opacity-55 group-hover:opacity-20"}`}
              />
              <span className="absolute inset-x-0 bottom-0 h-[3px] bg-white/30">
                {on ? (
                  <span
                    key={`${i}-${auto}`}
                    className="absolute inset-0 origin-left bg-accent"
                    style={auto ? { animation: `progress ${SLIDE_MS}ms linear forwards` } : undefined}
                  />
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Services list (on the slate panel)                                          */
/* -------------------------------------------------------------------------- */

export type ServiceRow = { name: string; body: string; outputs: string; href: string };

export function ServiceList({ items }: { items: ServiceRow[] }) {
  const [open, setOpen] = useState(0);
  return (
    <ul>
      {items.map((item, i) => {
        const on = i === open;
        return (
          <li key={item.name} className="border-b border-white/15 first:border-t">
            <button
              type="button"
              aria-expanded={on}
              onClick={() => setOpen(on ? -1 : i)}
              className="group flex w-full items-center gap-4 py-5 text-left"
            >
              <CheckCircle size={26} weight="fill" className="shrink-0 text-accent" />
              <span className="flex-1 text-[clamp(1.15rem,1.7vw,1.45rem)] font-semibold leading-tight tracking-[-0.01em]">
                {item.name}
              </span>
              <CaretDown
                size={18}
                weight="bold"
                className={`shrink-0 text-on-deep-muted transition-transform duration-500 ease-soft group-hover:text-white ${on ? "rotate-180" : ""}`}
              />
            </button>
            <div className={`grid transition-[grid-template-rows] duration-500 ease-soft ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <div className="pb-7 pl-[42px]">
                  <p className="text-[16px] leading-relaxed text-on-deep/90">{item.body}</p>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-on-deep-muted">
                    <span className="font-semibold text-accent">Possible outputs: </span>
                    {item.outputs}
                  </p>
                  <a
                    href={item.href}
                    tabIndex={on ? 0 : -1}
                    className="group/link mt-5 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/40 px-5 py-2.5 text-[14px] font-semibold transition-colors duration-300 hover:bg-white hover:text-[#151b25]"
                  >
                    Discuss {item.name}
                    <ArrowRight size={15} weight="bold" className="transition-transform duration-500 group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/* Principles carousel                                                         */
/* -------------------------------------------------------------------------- */

export type Principle = { role: string; maxim: string; text: string };

/** One card at a time with side arrows, like the endorsement cards it borrows from. */
export function PrincipleCarousel({ items }: { items: Principle[] }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const go = (dir: number) => setI((v) => (v + dir + items.length) % items.length);
  const p = items[i];

  return (
    <div className="relative mx-auto max-w-[1100px]">
      <div className="mx-auto max-w-[780px] px-12 md:px-16">
        <AnimatePresence mode="wait">
          <motion.figure
            key={i}
            initial={reduce ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -24 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="cut relative bg-bg px-7 pb-10 pt-12 text-center shadow-[0_24px_60px_-30px_rgba(21,27,37,0.35)] md:px-12"
            aria-live="polite"
          >
            <span
              aria-hidden="true"
              className="absolute -top-9 left-8 select-none text-[7rem] font-bold leading-none text-fg"
            >
              &ldquo;
            </span>
            <blockquote className="display text-[clamp(1.35rem,2.4vw,2rem)] leading-[1.25]">{p.text}</blockquote>
            <figcaption className="mt-7">
              <span className="hl text-[13px] font-semibold uppercase tracking-[0.1em]">{p.maxim}</span>
              <span className="mt-3 block text-[14px] text-muted">From her work as {p.role}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <button
        type="button"
        aria-label="Previous principle"
        onClick={() => go(-1)}
        className="absolute left-0 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line text-fg transition-colors duration-300 hover:bg-fg hover:text-bg"
      >
        <ArrowLeft size={18} />
      </button>
      <button
        type="button"
        aria-label="Next principle"
        onClick={() => go(1)}
        className="absolute right-0 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line text-fg transition-colors duration-300 hover:bg-fg hover:text-bg"
      >
        <ArrowRight size={18} />
      </button>

      <div className="mt-8 flex justify-center gap-2">
        {items.map((it, n) => (
          <button
            key={it.maxim}
            type="button"
            aria-label={`Show principle ${n + 1}`}
            aria-pressed={n === i}
            onClick={() => setI(n)}
            className={`h-2.5 rounded-full transition-all duration-500 ease-soft ${n === i ? "w-8 bg-accent" : "w-2.5 bg-fg/20 hover:bg-fg/40"}`}
          />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Accordion                                                                   */
/* -------------------------------------------------------------------------- */

export type AccordionItem = { title: string; sub?: string; body: string };

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState(0);
  return (
    <ul>
      {items.map((item, i) => {
        const on = i === open;
        return (
          <li key={item.title} className="border-b border-line first:border-t">
            <button
              type="button"
              aria-expanded={on}
              onClick={() => setOpen(on ? -1 : i)}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span>
                <span className="block text-[clamp(1.15rem,1.8vw,1.5rem)] font-semibold leading-tight tracking-[-0.01em]">
                  {item.title}
                </span>
                {item.sub ? <span className="mt-1 block text-[15px] text-muted">{item.sub}</span> : null}
              </span>
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors duration-300 ${on ? "bg-accent text-on-accent" : "bg-surface-2 text-fg group-hover:bg-tint"}`}
              >
                <CaretDown size={17} weight="bold" className={`transition-transform duration-500 ease-soft ${on ? "rotate-180" : ""}`} />
              </span>
            </button>
            <div className={`grid transition-[grid-template-rows] duration-500 ease-soft ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <p className="max-w-[72ch] pb-7 text-[16.5px] leading-relaxed text-fg/80">{item.body}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/* Project browser: filter, cards, and a photo viewer                          */
/* -------------------------------------------------------------------------- */

export type ProjectCard = {
  slug: string;
  title: string;
  place: string;
  theme: string;
  body: string;
  credit?: string;
  category: string;
  categoryLabel: string;
  images: Media[];
};

function Viewer({ p, onClose }: { p: ProjectCard; onClose: () => void }) {
  const [sel, setSel] = useState(0);
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const current = p.images[sel];

  const step = useCallback(
    (dir: number) => setSel((v) => (v + dir + p.images.length) % p.images.length),
    [p.images.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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
  }, [onClose, step]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${p.title}: photographs`}
      className="fixed inset-0 z-[70] overflow-y-auto bg-[#10181f]/80 p-3 backdrop-blur-sm md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? undefined : { opacity: 0, y: 20 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="relative mx-auto grid max-w-[1180px] gap-6 rounded-[16px] bg-bg p-4 md:p-7 lg:grid-cols-12 lg:gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          aria-label="Close photographs"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-fg text-bg transition-colors duration-300 hover:bg-accent hover:text-on-accent md:right-5 md:top-5"
        >
          <X size={18} weight="bold" />
        </button>

        <div className="lg:col-span-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-surface-2">
            <AnimatePresence initial={false}>
              <motion.div
                key={current.src}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="(min-width: 1024px) 760px, 100vw"
                  placeholder="blur"
                  blurDataURL={current.blur}
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <button
              type="button"
              aria-label="Previous photograph"
              onClick={() => step(-1)}
              className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-bg/90 text-fg transition-colors duration-300 hover:bg-accent"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next photograph"
              onClick={() => step(1)}
              className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-bg/90 text-fg transition-colors duration-300 hover:bg-accent"
            >
              <ArrowRight size={18} />
            </button>
          </div>
          <p className="mt-3 min-h-[1.5em] text-[13.5px] text-muted" aria-live="polite">
            {current.alt}.
          </p>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Choose a photograph">
            {p.images.map((im, n) => (
              <button
                key={im.src}
                type="button"
                aria-label={`Show photograph ${n + 1}: ${im.alt}`}
                aria-pressed={n === sel}
                onClick={() => setSel(n)}
                className={`relative h-14 w-14 overflow-hidden rounded-[8px] bg-surface-2 transition-[box-shadow,opacity] duration-300 sm:h-16 sm:w-16 ${n === sel ? "shadow-[0_0_0_3px_var(--accent)]" : "opacity-65 hover:opacity-100"}`}
              >
                <Image src={im.src} alt="" fill sizes="64px" placeholder="blur" blurDataURL={im.blur} className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 lg:pr-10 lg:pt-12">
          <span className="rounded-full bg-tint px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-accent-ink">
            {p.categoryLabel}
          </span>
          <h3 className="display mt-5 text-[clamp(1.7rem,2.6vw,2.3rem)] leading-[1.12]">{p.title}</h3>
          <p className="mt-2 text-[15px] text-muted">{p.place}</p>
          <p className="mt-5 text-[17px] font-semibold leading-snug">
            <span className="hl">{p.theme}</span>
          </p>
          <p className="mt-5 text-[16px] leading-relaxed text-fg/80">{p.body}</p>
          {p.credit ? <p className="mt-6 border-t border-line pt-4 text-[14px] text-muted">{p.credit}</p> : null}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectBrowser({
  filters,
  projects,
}: {
  filters: { id: string; label: string }[];
  projects: ProjectCard[];
}) {
  const [filter, setFilter] = useState("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const shown = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const active = projects.find((p) => p.slug === openSlug) ?? null;
  const close = useCallback(() => setOpenSlug(null), []);

  return (
    <div>
      <div role="tablist" aria-label="Filter projects" className="flex flex-wrap justify-center gap-2">
        {[{ id: "all", label: "All projects" }, ...filters].map((f) => {
          const on = f.id === filter;
          const count = f.id === "all" ? projects.length : projects.filter((p) => p.category === f.id).length;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setFilter(f.id)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-[14.5px] font-semibold transition-colors duration-300 active:scale-[0.98] ${on ? "bg-fg text-bg" : "bg-surface-2 text-fg/80 hover:bg-tint hover:text-fg"}`}
            >
              {f.label}
              <span className={`ml-2 text-[12.5px] font-normal ${on ? "text-bg/70" : "text-muted"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <motion.article
            key={`${filter}-${p.slug}`}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.06 }}
            className="flex flex-col"
          >
            <button
              type="button"
              onClick={() => setOpenSlug(p.slug)}
              aria-label={`Open photographs of ${p.title}`}
              className="group relative block aspect-[3/2] overflow-hidden rounded-[10px] bg-surface-2 text-left"
            >
              <Image
                src={p.images[0].src}
                alt={p.images[0].alt}
                fill
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                placeholder="blur"
                blurDataURL={p.images[0].blur}
                className="object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.05]"
              />
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-bg/95 px-3 py-1.5 text-[12.5px] font-semibold text-fg">
                <Images size={15} weight="bold" />
                {p.images.length}
              </span>
            </button>
            <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-accent-ink">{p.categoryLabel}</p>
            <h3 className="display mt-2 text-[1.55rem] leading-[1.15]">{p.title}</h3>
            <p className="mt-1.5 text-[15px] text-muted">{p.theme}</p>
            <p className="mt-3 text-[15.5px] leading-relaxed text-fg/80">{p.body}</p>
            <div className="mt-auto pt-5">
              <button
                type="button"
                onClick={() => setOpenSlug(p.slug)}
                data-open={p.slug}
                className="group/btn inline-flex items-center gap-2 whitespace-nowrap rounded-full border-[1.5px] border-fg px-5 py-2.5 text-[14px] font-semibold transition-colors duration-300 hover:bg-fg hover:text-bg active:scale-[0.98]"
              >
                View photographs
                <ArrowRight size={15} weight="bold" className="transition-transform duration-500 group-hover/btn:translate-x-1" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>{active ? <Viewer key={active.slug} p={active} onClose={close} /> : null}</AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Then and now                                                                */
/* -------------------------------------------------------------------------- */

export type ThenNowItem = {
  title: string;
  before: Media & { label: string };
  after: Media & { label: string };
};

/** One frame, two moments: switch between the building site and the finished space. */
export function ThenNow({ item }: { item: ThenNowItem }) {
  const [now, setNow] = useState(true);
  const shown = now ? item.after : item.before;

  return (
    <figure>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-surface-2">
        {[item.before, item.after].map((im, i) => {
          const on = (i === 1) === now;
          return (
            <Image
              key={im.src}
              src={im.src}
              alt={on ? im.alt : ""}
              fill
              sizes="(min-width: 768px) 400px, 100vw"
              placeholder="blur"
              blurDataURL={im.blur}
              className={`object-cover transition-opacity duration-700 ease-soft ${on ? "opacity-100" : "opacity-0"}`}
            />
          );
        })}
        <div
          className="absolute left-3 top-3 flex rounded-full bg-bg/95 p-1"
          role="group"
          aria-label={`${item.title}: then or now`}
        >
          {[
            { label: "Then", value: false },
            { label: "Now", value: true },
          ].map((o) => (
            <button
              key={o.label}
              type="button"
              aria-pressed={now === o.value}
              onClick={() => setNow(o.value)}
              className={`rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors duration-300 ${now === o.value ? "bg-accent text-on-accent" : "text-fg/70 hover:text-fg"}`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
      <figcaption className="mt-4">
        <p className="display text-[1.35rem] leading-tight">{item.title}</p>
        <p className="mt-1.5 text-[14.5px] text-muted" aria-live="polite">
          {shown.label}
        </p>
      </figcaption>
    </figure>
  );
}
