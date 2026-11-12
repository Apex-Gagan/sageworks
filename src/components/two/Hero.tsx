"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "motion/react";
import { ArrowDown } from "@phosphor-icons/react";

/**
 * Sample 2 "Canopy" heroes. Each one answers the pointer: a torch through the
 * mist on the homepage, a portrait that leans on the founder page, and a
 * backdrop that changes with the kind of place on the projects page.
 * Everything else on those pages is unchanged.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const SOFT = { stiffness: 60, damping: 18, mass: 0.6 };

export type HeroMedia = { src: string; blur: string; alt: string };

const group: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const fade: Variants = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
const line: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.055 } },
};
const word: Variants = {
  hidden: { y: "115%" },
  shown: { y: "0%", transition: { duration: 0.95, ease: EASE } },
};
const pop: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  shown: { opacity: 1, scale: 1, transition: { duration: 1, ease: EASE } },
};

/** Words that rise out of a mask. Must sit inside a `line` parent. */
function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i}>
          <span className="-mb-[0.16em] inline-block overflow-hidden pb-[0.16em] align-bottom">
            <motion.span variants={word} className="inline-block will-change-transform">
              {w}
            </motion.span>
          </span>{" "}
        </span>
      ))}
    </>
  );
}

/**
 * Pointer position over an element: `nx`/`ny` run from -0.5 to 0.5 for
 * parallax, `px`/`py` are pixels for the spotlight. Mouse only, so a finger
 * scrolling the page never drags the picture about.
 */
function usePointerField(still: boolean) {
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(e.clientX - r.left);
    py.set(e.clientY - r.top);
    if (still) return;
    nx.set((e.clientX - r.left) / r.width - 0.5);
    ny.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPointerLeave = () => {
    nx.set(0);
    ny.set(0);
  };
  return { nx, ny, px, py, onPointerMove, onPointerLeave };
}

function useShift(v: MotionValue<number>, amount: number) {
  return useTransform(v, [-0.5, 0.5], [-amount, amount]);
}

/* -------------------------------------------------------------------------- */
/* Homepage                                                                    */
/* -------------------------------------------------------------------------- */

export type HeroDisc = HeroMedia & { name: string; line: string };

const DISC_PLACES = [
  { left: "22%", top: "0%", depth: 20, delay: "0s" },
  { left: "0%", top: "40%", depth: -16, delay: "-2.4s" },
  { left: "44%", top: "40%", depth: 28, delay: "-4.6s" },
];

function TriadDisc({
  disc,
  place,
  on,
  nx,
  ny,
  onSelect,
}: {
  disc: HeroDisc;
  place: (typeof DISC_PLACES)[number];
  on: boolean;
  nx: MotionValue<number>;
  ny: MotionValue<number>;
  onSelect: () => void;
}) {
  const x = useShift(nx, place.depth);
  const y = useShift(ny, place.depth);
  return (
    <motion.div
      variants={pop}
      style={{ left: place.left, top: place.top, x, y }}
      className={`absolute w-[56%] ${on ? "z-10" : "z-0"}`}
    >
      <div className="motion-safe:animate-bob" style={{ animationDelay: place.delay }}>
        <button
          type="button"
          aria-label={`Show ${disc.name}`}
          aria-pressed={on}
          onClick={onSelect}
          onMouseEnter={onSelect}
          onFocus={onSelect}
          className={`relative block aspect-square w-full overflow-hidden rounded-full transition-[transform,filter,box-shadow] duration-700 ease-soft ${on ? "scale-[1.06] shadow-[0_0_0_2px_var(--accent),0_30px_60px_-30px_rgba(0,0,0,0.8)]" : "brightness-[0.62] saturate-[0.8] shadow-[0_0_0_1px_rgba(255,255,255,0.25)]"}`}
        >
          <Image
            src={disc.src}
            alt=""
            fill
            sizes="260px"
            placeholder="blur"
            blurDataURL={disc.blur}
            className="object-cover"
          />
        </button>
      </div>
    </motion.div>
  );
}

export function HomeHeroTwo({
  bg,
  capsules,
  discs,
  label,
  sub,
  actions,
}: {
  bg: HeroMedia;
  capsules: HeroMedia[];
  discs: HeroDisc[];
  label: string;
  sub: string;
  /** The two calls to action, rendered on the server. */
  actions: ReactNode;
}) {
  const reduce = useReducedMotion();
  const field = usePointerField(Boolean(reduce));
  const nx = useSpring(field.nx, SOFT);
  const ny = useSpring(field.ny, SOFT);
  const sx = useSpring(field.px, { stiffness: 110, damping: 22, mass: 0.5 });
  const sy = useSpring(field.py, { stiffness: 110, damping: 22, mass: 0.5 });
  const torch = useMotionTemplate`radial-gradient(circle 340px at ${sx}px ${sy}px, transparent 0%, rgba(0,0,0,0.4) 50%, #000 100%)`;
  const glow = useMotionTemplate`radial-gradient(circle 300px at ${sx}px ${sy}px, rgba(233,181,77,0.2) 0%, rgba(233,181,77,0.07) 45%, transparent 75%)`;

  // The torch starts over the hillside rather than in a corner.
  const section = useRef<HTMLElement>(null);
  const { px, py } = field;
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    px.set(el.offsetWidth * 0.62);
    py.set(el.offsetHeight * 0.3);
  }, [px, py]);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 900], [0, 130]);

  const [cap, setCap] = useState(0);
  useEffect(() => {
    if (reduce || capsules.length < 2) return;
    const id = window.setInterval(() => setCap((v) => (v + 1) % capsules.length), 3200);
    return () => window.clearInterval(id);
  }, [reduce, capsules.length]);

  const [sel, setSel] = useState(0);

  return (
    <section
      ref={section}
      data-hero="home-two"
      className="relative isolate flex min-h-[100dvh] items-end overflow-hidden"
      onPointerMove={field.onPointerMove}
      onPointerLeave={field.onPointerLeave}
    >
      <div className="absolute inset-0 -z-10">
        <motion.div className="absolute inset-0" style={reduce ? undefined : { y: bgY }}>
          <Image
            src={bg.src}
            alt={bg.alt}
            fill
            preload
            sizes="100vw"
            placeholder="blur"
            blurDataURL={bg.blur}
            className="animate-breathe object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-bg/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/75 via-bg/10 to-transparent" />
        {/* The torch: extra dusk everywhere except around the pointer */}
        <motion.div
          aria-hidden="true"
          data-torch
          className="absolute inset-0 hidden bg-bg/60 pointer-fine:block"
          style={{ maskImage: torch, WebkitMaskImage: torch }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 hidden mix-blend-screen pointer-fine:block"
          style={{ backgroundImage: glow }}
        />
      </div>

      {/* The triad as three photographs that drift with the pointer */}
      <motion.div
        initial={reduce ? false : "hidden"}
        animate="shown"
        variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.14, delayChildren: 0.7 } } }}
        className="absolute right-[5%] top-[max(100px,12%)] hidden w-[min(27vw,42dvh)] lg:block"
      >
        <div className="relative aspect-square">
          <div aria-hidden="true" className="absolute inset-[9%] rounded-full border border-fg/15" />
          {discs.map((d, i) => (
            <TriadDisc
              key={d.name}
              disc={d}
              place={DISC_PLACES[i % DISC_PLACES.length]}
              on={sel === i}
              nx={nx}
              ny={ny}
              onSelect={() => setSel(i)}
            />
          ))}
        </div>
        <motion.div variants={fade} className="mt-3 min-h-[4.2rem] text-center" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={sel}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <p className="display text-[1.55rem] leading-tight">
                <strong className="text-accent">{discs[sel].name}</strong>
              </p>
              <p className="mt-1 text-[14px] leading-snug text-fg/80">{discs[sel].line}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <motion.div
        initial={reduce ? false : "hidden"}
        animate="shown"
        variants={group}
        className="mx-auto w-full max-w-[1480px] px-5 pb-28 pt-28 md:px-10 md:pb-36"
      >
        <motion.p variants={fade} className="label text-fg/75">
          {label}
        </motion.p>
        <motion.h1
          variants={line}
          className="display mt-6 max-w-[19ch] text-[clamp(2.7rem,6vw,6.25rem)] leading-[0.99]"
        >
          <Words text="Designing human" />
          <motion.span
            variants={{
              hidden: { scaleX: 0, opacity: 0 },
              shown: { scaleX: 1, opacity: 1, transition: { duration: 1, ease: EASE } },
            }}
            aria-hidden="true"
            className="relative mx-[0.04em] inline-block h-[0.72em] w-[1.75em] origin-left translate-y-[0.07em] overflow-hidden rounded-full align-baseline ring-1 ring-fg/25"
          >
            {capsules.map((c, i) => (
              <Image
                key={c.src}
                src={c.src}
                alt=""
                fill
                sizes="180px"
                placeholder="blur"
                blurDataURL={c.blur}
                className={`object-cover transition-[opacity,transform] duration-[1200ms] ease-soft ${i === cap ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
              />
            ))}
          </motion.span>{" "}
          <Words text="systems for" />
          <strong className="text-accent">
            <Words text="health, resilience and performance" />
          </strong>
        </motion.h1>
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p variants={fade} className="max-w-[46ch] text-[17px] leading-relaxed text-fg/85">
            {sub}
          </motion.p>
          <motion.div variants={fade} className="flex flex-wrap gap-3">
            {actions}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Founder                                                                     */
/* -------------------------------------------------------------------------- */

export type HeroRole = { label: string; href: string; maxim: string; media: HeroMedia };

export function FounderHeroTwo({
  title,
  roles,
  lead,
  question,
  portrait,
  caption,
  seal,
}: {
  title: string;
  roles: HeroRole[];
  lead: string;
  question: string;
  portrait: HeroMedia;
  caption: string;
  /** The rotating seal, rendered on the server. */
  seal: ReactNode;
}) {
  const reduce = useReducedMotion();
  const field = usePointerField(Boolean(reduce));
  const nx = useSpring(field.nx, SOFT);
  const ny = useSpring(field.ny, SOFT);
  const rotateY = useTransform(nx, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(ny, [-0.5, 0.5], [6, -6]);
  const ringX = useShift(nx, -26);
  const ringY = useShift(ny, -20);
  const sealX = useShift(nx, 16);
  const sealY = useShift(ny, 12);

  const [active, setActive] = useState<number | null>(null);
  const shown = active === null ? null : roles[active];

  return (
    <section
      data-hero="founder-two"
      className="relative overflow-hidden"
      onPointerMove={field.onPointerMove}
      onPointerLeave={field.onPointerLeave}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(96,146,104,0.2),transparent)]"
      />
      <motion.div
        initial={reduce ? false : "hidden"}
        animate="shown"
        variants={group}
        className="relative mx-auto grid w-full max-w-[1480px] items-end gap-12 px-5 pb-28 pt-28 md:px-10 md:pb-36 lg:min-h-[100dvh] lg:grid-cols-12"
      >
        <div className="lg:col-span-8">
          <motion.p variants={fade} className="label text-muted">
            {title}
          </motion.p>
          <motion.h1 variants={line} className="display mt-6 text-[clamp(4rem,12vw,12rem)] leading-[0.86]">
            <Words text="Dr Shruti" />
            <strong className="text-accent">
              <Words text="Pai" />
            </strong>
          </motion.h1>
          <motion.ul variants={fade} className="mt-9 flex flex-wrap gap-2">
            {roles.map((r, i) => (
              <li key={r.label}>
                <a
                  href={r.href}
                  data-role-pill
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13.5px] transition-colors duration-300 active:scale-[0.98] ${active === i ? "border-accent bg-accent text-on-accent" : "border-fg/20 text-fg/85"}`}
                >
                  {r.label}
                  <ArrowDown size={12} weight="bold" className="opacity-60" />
                </a>
              </li>
            ))}
          </motion.ul>
          <motion.p variants={fade} className="mt-10 max-w-[44ch] text-[16.5px] leading-relaxed text-muted">
            {lead}
          </motion.p>
          <motion.p
            variants={fade}
            className="display mt-3 max-w-3xl text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.04]"
          >
            {question}
          </motion.p>
        </div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 48 },
            shown: { opacity: 1, y: 0, transition: { duration: 1.2, ease: EASE, delay: 0.25 } },
          }}
          className="relative mx-auto w-full max-w-[420px] lg:col-span-4"
          style={{ perspective: 1100 }}
        >
          <motion.div
            aria-hidden="true"
            style={{ x: ringX, y: ringY }}
            className="absolute -right-8 -top-8 h-[62%] w-[62%] rounded-full border border-accent/40"
          />
          <motion.div style={reduce ? undefined : { rotateX, rotateY }} className="relative will-change-transform">
            <div className="arch relative overflow-hidden bg-surface" style={{ aspectRatio: "3 / 4.3" }}>
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                preload
                sizes="(min-width: 1024px) 30vw, 90vw"
                placeholder="blur"
                blurDataURL={portrait.blur}
                className="object-cover"
                style={{ objectPosition: "50% 12%" }}
              />
              {roles.map((r, i) => (
                <Image
                  key={r.label}
                  src={r.media.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 30vw, 90vw"
                  placeholder="blur"
                  blurDataURL={r.media.blur}
                  className={`object-cover transition-[opacity,transform] duration-700 ease-soft ${active === i ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"}`}
                />
              ))}
              <AnimatePresence>
                {shown ? (
                  <motion.p
                    key={shown.label}
                    data-role-maxim
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="absolute inset-x-4 bottom-4 rounded-full bg-bg/85 px-5 py-3 text-center text-[14.5px] leading-snug text-fg backdrop-blur-md"
                  >
                    {shown.maxim}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.div>
          <motion.div style={{ x: sealX, y: sealY }} className="absolute -bottom-10 -left-10 hidden sm:block">
            {seal}
          </motion.div>
          <p className="mt-3 min-h-[2.2rem] text-[12.5px] leading-snug text-muted sm:pl-24">{shown ? `${shown.media.alt}.` : caption}</p>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Projects                                                                    */
/* -------------------------------------------------------------------------- */

export type HeroCategory = { id: string; label: string; title: string; media: HeroMedia };

const PLACE_MS = 6000;

export function ProjectsHeroTwo({
  label,
  sub,
  cats,
}: {
  label: string;
  sub: string;
  cats: HeroCategory[];
}) {
  const reduce = useReducedMotion();
  const field = usePointerField(Boolean(reduce));
  const nx = useSpring(field.nx, SOFT);
  const ny = useSpring(field.ny, SOFT);
  const x = useShift(nx, -18);
  const y = useShift(ny, -14);

  const [i, setI] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const auto = !reduce && !hovered && !keyboardFocus;

  useEffect(() => {
    if (!auto) return;
    const id = window.setTimeout(() => setI((v) => (v + 1) % cats.length), PLACE_MS);
    return () => window.clearTimeout(id);
  }, [i, auto, cats.length]);

  const c = cats[i];

  return (
    <section
      data-hero="projects-two"
      className="relative isolate flex min-h-[92dvh] items-end overflow-hidden"
      onPointerMove={field.onPointerMove}
      onPointerLeave={(e) => {
        field.onPointerLeave();
        if (e.pointerType === "mouse") setHovered(false);
      }}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setHovered(true);
      }}
      onFocus={(e) => setKeyboardFocus((e.target as HTMLElement).matches(":focus-visible"))}
      onBlur={() => setKeyboardFocus(false)}
    >
      <div className="absolute inset-0 -z-10">
        <motion.div className="absolute -inset-6" style={reduce ? undefined : { x, y }}>
          {cats.map((cat, n) => (
            <Image
              key={cat.id}
              src={cat.media.src}
              alt={n === i ? cat.media.alt : ""}
              fill
              preload={n === 0}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={cat.media.blur}
              className={`object-cover transition-[opacity,transform] duration-[1400ms] ease-soft ${n === i ? "scale-100 opacity-100" : "scale-[1.07] opacity-0"}`}
            />
          ))}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-bg/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/60 via-transparent to-transparent" />
      </div>

      <motion.div
        initial={reduce ? false : "hidden"}
        animate="shown"
        variants={group}
        className="mx-auto w-full max-w-[1480px] px-5 pb-28 pt-28 md:px-10 md:pb-36"
      >
        <motion.p variants={fade} className="label text-fg/75">
          {label}
        </motion.p>
        <motion.h1
          variants={line}
          className="display mt-6 max-w-[19ch] text-[clamp(2.7rem,6vw,6.25rem)] leading-[0.99]"
        >
          <Words text="Environments designed for" />
          <strong className="text-accent">
            <Words text="the people inside them" />
          </strong>
        </motion.h1>
        <motion.p variants={fade} className="mt-8 max-w-[52ch] text-[17px] leading-relaxed text-fg/85">
          {sub}
        </motion.p>

        <motion.div
          variants={fade}
          className="mt-10 flex flex-col gap-6 border-t border-fg/15 pt-6 md:flex-row md:items-end md:justify-between"
        >
          <ul className="flex flex-wrap gap-2">
            {cats.map((cat, n) => {
              const on = n === i;
              return (
                <li key={cat.id}>
                  <button
                    type="button"
                    data-place={cat.id}
                    aria-pressed={on}
                    onClick={() => setI(n)}
                    onMouseEnter={() => setI(n)}
                    className={`relative overflow-hidden rounded-full px-5 py-3 text-[14px] font-medium transition-colors duration-300 active:scale-[0.98] ${on ? "bg-accent text-on-accent" : "border border-fg/30 text-fg backdrop-blur-sm hover:border-fg"}`}
                  >
                    {cat.label}
                    {on ? (
                      <span
                        key={`${i}-${auto}`}
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-on-accent/45"
                        style={auto ? { animation: `progress ${PLACE_MS}ms linear forwards` } : { transform: "scaleX(0)" }}
                      />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="min-h-[3.4rem] md:max-w-[38ch] md:text-right" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={c.id}
                data-place-caption
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <p className="label text-fg/70">
                  {String(i + 1).padStart(2, "0")} / {String(cats.length).padStart(2, "0")}
                </p>
                <p className="display mt-1.5 text-[1.35rem] leading-tight">{c.title}</p>
                <p className="mt-1 text-[13px] leading-snug text-fg/70">{c.media.alt}.</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
