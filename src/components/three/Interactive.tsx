"use client";

import Image from "next/image";
import { useEffect, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Media = { src: string; blur: string; alt: string };

/* -------------------------------------------------------------------------- */
/* Hero slideshow                                                              */
/* -------------------------------------------------------------------------- */

export type Slide = Media & { title: string; place: string };

const SLIDE_MS = 5600;

/**
 * Homepage hero: client photographs cross-fade in a leaf frame. The current
 * slide's caption and the controls sit beside it. Pauses on hover and focus,
 * and does not auto-advance under reduced motion.
 */
export function HeroSlides({ slides, children }: { slides: Slide[]; children: ReactNode }) {
  const [i, setI] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const reduce = useReducedMotion();
  // Hold still while the pointer rests on the photograph or a keyboard user is
  // on the controls. A mouse click on a control must not pause it for good.
  const auto = !reduce && !hovered && !keyboardFocus;

  useEffect(() => {
    if (!auto) return;
    const id = window.setTimeout(() => setI((v) => (v + 1) % slides.length), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [i, auto, slides.length]);

  const go = (dir: number) => setI((v) => (v + dir + slides.length) % slides.length);
  const current = slides[i];

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:grid-rows-[1fr_auto]">
      <div
        className="order-2 lg:order-none lg:col-span-8 lg:col-start-1 lg:row-span-2 lg:row-start-1"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="leaf relative aspect-[4/3] max-h-[56dvh] w-full overflow-hidden bg-surface sm:aspect-[16/10]">
          {slides.map((s, n) => (
            <Image
              key={s.src}
              src={s.src}
              alt={n === i ? s.alt : ""}
              fill
              preload={n === 0}
              sizes="(min-width: 1280px) 52vw, (min-width: 1024px) 64vw, 100vw"
              placeholder="blur"
              blurDataURL={s.blur}
              className={`object-cover transition-[opacity,transform] duration-[1400ms] ease-soft ${n === i ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"}`}
            />
          ))}
        </div>
      </div>

      <div className="order-1 lg:order-none lg:col-span-4 lg:col-start-9 lg:row-start-1">{children}</div>

      <div
        className="order-3 lg:order-none lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:self-end"
        onFocus={(e) => setKeyboardFocus((e.target as HTMLElement).matches(":focus-visible"))}
        onBlur={() => setKeyboardFocus(false)}
      >
        <div>
          <div className="min-h-[3.6rem]" aria-live="polite">
            <p className="display text-[1.35rem] leading-tight">{current.title}</p>
            <p className="mt-1 text-[13px] text-muted">{current.place}</p>
          </div>
          <div className="mt-5 flex items-center gap-4">
            <div className="flex flex-1 gap-1.5">
              {slides.map((s, n) => (
                <button
                  key={s.src}
                  type="button"
                  aria-label={`Show photograph ${n + 1}: ${s.title}`}
                  aria-pressed={n === i}
                  onClick={() => setI(n)}
                  className="group relative h-6 flex-1"
                >
                  <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden bg-fg/15 transition-colors group-hover:bg-fg/35">
                    {n === i ? (
                      <span
                        key={`${i}-${auto}`}
                        className="absolute inset-0 origin-left bg-accent"
                        style={auto ? { animation: `progress ${SLIDE_MS}ms linear forwards` } : undefined}
                      />
                    ) : null}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex gap-1.5">
              <button
                type="button"
                aria-label="Previous photograph"
                onClick={() => go(-1)}
                className="grid h-10 w-10 place-items-center rounded-[8px] border border-line transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-on-accent active:translate-y-px"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                aria-label="Next photograph"
                onClick={() => go(1)}
                className="grid h-10 w-10 place-items-center rounded-[8px] border border-line transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-on-accent active:translate-y-px"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Triad tabs                                                                  */
/* -------------------------------------------------------------------------- */

export type TabItem = Media & { name: string; line: string; body: string; detail?: string };

function useTabKeys(count: number, active: number, set: (n: number) => void) {
  return (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : -1) + count) % count;
    set(next);
    const tabs = e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    tabs[next]?.focus();
  };
}

/** Three domains as tabs over one large photograph and its explanation. */
export function TriadTabs({ items, id = "triad" }: { items: TabItem[]; id?: string }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const onKeyDown = useTabKeys(items.length, active, setActive);
  const current = items[active];

  return (
    <div>
      <div role="tablist" aria-label="The three domains" onKeyDown={onKeyDown} className="flex gap-6 border-b border-line md:gap-12">
        {items.map((item, i) => {
          const on = i === active;
          return (
            <button
              key={item.name}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={on}
              aria-controls={`${id}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              className={`display relative -mb-px border-b-2 pb-4 text-[clamp(1.35rem,3.2vw,2.8rem)] leading-none transition-colors duration-300 ${on ? "border-accent text-fg" : "border-transparent text-fg/40 hover:text-fg/75"}`}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-center"
      >
        <div className="lg:col-span-7">
          <div className="leaf relative aspect-[16/11] overflow-hidden bg-surface">
            {items.map((item, i) => (
              <Image
                key={item.src}
                src={item.src}
                alt={i === active ? item.alt : ""}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                placeholder="blur"
                blurDataURL={item.blur}
                className={`object-cover transition-[opacity,transform] duration-[900ms] ease-soft ${i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"}`}
              />
            ))}
          </div>
        </div>
        <div className="min-h-[15rem] lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <p className="display text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.15] text-accent">
                <em>{current.line}</em>
              </p>
              <p className="mt-5 text-[16.5px] leading-relaxed text-fg/85">{current.body}</p>
              {current.detail ? (
                <p className="mt-5 border-t border-line pt-5 text-[14.5px] leading-relaxed text-muted">{current.detail}</p>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Services: list on the left, detail on the right                             */
/* -------------------------------------------------------------------------- */

export type ServiceItem = Media & { name: string; body: string; outputs: string; href: string };

export function ServiceSelector({ items }: { items: ServiceItem[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = items[active];

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <ul className="flex flex-wrap gap-2 lg:col-span-4 lg:block">
        {items.map((item, i) => {
          const on = i === active;
          return (
            <li key={item.name} className="lg:border-t lg:border-line lg:last:border-b">
              <button
                type="button"
                aria-pressed={on}
                onClick={() => setActive(i)}
                className={`group flex items-center justify-between gap-4 rounded-[8px] border px-3.5 py-2 text-left transition-colors duration-300 lg:w-full lg:rounded-none lg:border-0 lg:px-0 lg:py-[1.15rem] ${on ? "border-accent bg-accent text-on-accent lg:bg-transparent lg:text-accent" : "border-line text-fg/75 hover:text-fg"}`}
              >
                <span className="text-[14px] lg:font-display lg:text-[1.45rem] lg:font-light lg:leading-tight">
                  {item.name}
                </span>
                <ArrowRight
                  size={17}
                  className={`hidden shrink-0 transition-[opacity,transform] duration-500 ease-soft lg:block ${on ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"}`}
                />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="grid gap-8 rounded-[8px] bg-surface p-6 md:grid-cols-2 md:p-9"
          >
            <div className="leaf-sm relative aspect-[4/3] overflow-hidden bg-surface-2 md:aspect-[4/5]">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="(min-width: 1024px) 28vw, 100vw"
                placeholder="blur"
                blurDataURL={current.blur}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="display text-[clamp(1.8rem,2.8vw,2.5rem)] leading-[1.05]">{current.name}</h3>
              <p className="mt-5 text-[16px] leading-relaxed text-fg/85">{current.body}</p>
              <div className="mt-6 border-t border-line pt-5">
                <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-muted">Possible outputs</p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-fg/75">{current.outputs}</p>
              </div>
              <div className="mt-auto pt-8">
                <a
                  href={current.href}
                  className="group inline-flex items-center gap-2.5 whitespace-nowrap rounded-[8px] bg-fg px-5 py-3.5 text-[14px] font-medium text-bg transition-colors duration-300 hover:bg-accent active:translate-y-px"
                >
                  <span>Discuss {current.name}</span>
                  <ArrowRight size={15} weight="bold" className="transition-transform duration-500 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Five senses: a contact sheet with one cited finding each                    */
/* -------------------------------------------------------------------------- */

export type SenseItem = Media & {
  name: string;
  line: string;
  body: string;
  finding: string;
  source: string;
};

export function SensesSheet({ items }: { items: SenseItem[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = items[active];

  return (
    <div>
      <div className="grid grid-cols-5 gap-2 md:gap-4">
        {items.map((item, i) => {
          const on = i === active;
          return (
            <button
              key={item.name}
              type="button"
              aria-pressed={on}
              aria-label={`${item.name}: ${item.line}`}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group text-left"
            >
              <span
                className={`leaf-sm relative block aspect-[3/4] overflow-hidden bg-surface transition-[box-shadow] duration-500 ${on ? "shadow-[0_0_0_2px_var(--accent)]" : ""}`}
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 14vw, 20vw"
                  placeholder="blur"
                  blurDataURL={item.blur}
                  className={`object-cover transition-[filter,transform,opacity] duration-700 ease-soft ${on ? "scale-100 opacity-100 saturate-100" : "scale-105 opacity-70 saturate-[0.25] group-hover:opacity-100"}`}
                />
              </span>
              <span
                className={`display mt-3 block text-[clamp(0.95rem,2vw,1.7rem)] leading-none transition-colors duration-300 ${on ? "text-accent" : "text-fg/55"}`}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 min-h-[17rem] border-t border-line pt-10" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="grid gap-8 lg:grid-cols-12"
          >
            <div className="lg:col-span-5">
              <p className="display text-[clamp(1.6rem,2.6vw,2.3rem)] leading-[1.12]">
                <em>{current.line}</em>
              </p>
              <p className="mt-5 text-[16.5px] leading-relaxed text-fg/85">{current.body}</p>
            </div>
            <div className="rounded-[8px] bg-tint p-6 md:p-8 lg:col-span-6 lg:col-start-7">
              <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-accent">What the evidence shows</p>
              <p className="mt-4 text-[16px] leading-relaxed text-fg">{current.finding}</p>
              <p className="mt-5 font-mono text-[12px] text-muted">Source: {current.source}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Projects catalogue                                                          */
/* -------------------------------------------------------------------------- */

export type CaseItem = {
  slug: string;
  title: string;
  place: string;
  theme: string;
  body: string;
  credit?: string;
  category: string;
  images: Media[];
};

function Case({ p }: { p: CaseItem }) {
  const [sel, setSel] = useState(0);
  const reduce = useReducedMotion();
  const current = p.images[sel];

  return (
    <article className="grid gap-10 border-t border-line py-14 md:py-20 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="leaf relative aspect-[16/11] overflow-hidden bg-surface">
          <AnimatePresence initial={false}>
            <motion.div
              key={current.src}
              initial={reduce ? false : { opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="absolute inset-0"
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="(min-width: 1024px) 44vw, 100vw"
                placeholder="blur"
                blurDataURL={current.blur}
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="mt-3 min-h-[2.2em] text-[12.5px] leading-snug text-muted">{current.alt}.</p>
        <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label={`Photographs of ${p.title}`}>
          {p.images.map((im, i) => (
            <button
              key={im.src}
              type="button"
              aria-label={`Show photograph ${i + 1}: ${im.alt}`}
              aria-pressed={i === sel}
              onClick={() => setSel(i)}
              className={`relative h-16 w-16 overflow-hidden rounded-[6px] bg-surface transition-[box-shadow,opacity] duration-300 sm:h-[72px] sm:w-[72px] ${i === sel ? "shadow-[0_0_0_2px_var(--accent)]" : "opacity-70 hover:opacity-100"}`}
            >
              <Image src={im.src} alt="" fill sizes="72px" placeholder="blur" blurDataURL={im.blur} className="object-cover" />
            </button>
          ))}
        </div>
      </div>
      <div className="lg:col-span-4 lg:col-start-9">
        <p className="text-[13.5px] text-muted">{p.place}</p>
        <h3 className="display mt-3 text-[clamp(1.9rem,3vw,2.8rem)] leading-[1.06]">{p.title}</h3>
        <p className="display mt-3 text-[1.35rem] leading-snug text-accent">
          <em>{p.theme}</em>
        </p>
        <p className="mt-6 text-[16px] leading-relaxed text-fg/85">{p.body}</p>
        {p.credit ? <p className="mt-6 border-t border-line pt-4 text-[13.5px] text-muted">{p.credit}</p> : null}
      </div>
    </article>
  );
}

/**
 * Projects by category. Each project is a small viewer: choose a thumbnail to
 * change the large photograph.
 */
export function Catalogue({
  categories,
  projects,
}: {
  categories: { id: string; label: string; title: string; intro: string }[];
  projects: CaseItem[];
}) {
  const [cat, setCat] = useState(categories[0].id);
  const reduce = useReducedMotion();
  const index = categories.findIndex((c) => c.id === cat);
  const onKeyDown = useTabKeys(categories.length, index, (n) => setCat(categories[n].id));
  const current = categories[index];
  const list = projects.filter((p) => p.category === cat);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Project categories"
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-2"
      >
        {categories.map((c) => {
          const on = c.id === cat;
          const count = projects.filter((p) => p.category === c.id).length;
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              id={`cat-tab-${c.id}`}
              aria-selected={on}
              aria-controls="cat-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setCat(c.id)}
              className={`whitespace-nowrap rounded-[8px] border px-4 py-2.5 text-[14px] transition-colors duration-300 active:translate-y-px ${on ? "border-fg bg-fg text-bg" : "border-line text-fg/80 hover:border-fg hover:text-fg"}`}
            >
              {c.label}
              <span className={`ml-2 font-mono text-[11.5px] ${on ? "text-bg/70" : "text-muted"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={cat}
          id="cat-panel"
          role="tabpanel"
          aria-labelledby={`cat-tab-${cat}`}
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <div className="grid gap-6 pb-12 pt-14 lg:grid-cols-12 lg:items-end">
            <h2 className="display text-[clamp(2.2rem,4.4vw,4rem)] leading-[1.04] lg:col-span-7">{current.title}</h2>
            <p className="text-[16px] leading-relaxed text-fg/80 lg:col-span-4 lg:col-start-9">{current.intro}</p>
          </div>
          {list.map((p) => (
            <Case key={p.slug} p={p} />
          ))}
        </motion.div>
      </AnimatePresence>
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
      <div className="leaf-sm relative aspect-[4/3] overflow-hidden bg-surface">
        {[item.before, item.after].map((im, i) => {
          const on = (i === 1) === now;
          return (
            <Image
              key={im.src}
              src={im.src}
              alt={on ? im.alt : ""}
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              placeholder="blur"
              blurDataURL={im.blur}
              className={`object-cover transition-[opacity,filter] duration-700 ease-soft ${on ? "opacity-100" : "opacity-0"} ${i === 0 ? "saturate-[0.8]" : ""}`}
            />
          );
        })}
      </div>
      <figcaption className="mt-4">
        <div className="flex items-center justify-between gap-4">
          <p className="display text-[1.4rem] leading-tight">{item.title}</p>
          <div className="flex rounded-[8px] border border-line p-0.5" role="group" aria-label={`${item.title}: then or now`}>
            {[
              { label: "Then", value: false },
              { label: "Now", value: true },
            ].map((o) => (
              <button
                key={o.label}
                type="button"
                aria-pressed={now === o.value}
                onClick={() => setNow(o.value)}
                className={`rounded-[6px] px-3.5 py-1.5 text-[13px] transition-colors duration-300 ${now === o.value ? "bg-fg text-bg" : "text-fg/70 hover:text-fg"}`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-2 text-[13.5px] text-muted" aria-live="polite">
          {shown.label}
        </p>
      </figcaption>
    </figure>
  );
}
