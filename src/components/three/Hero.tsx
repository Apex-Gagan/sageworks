"use client";

import Image from "next/image";
import { useEffect, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "motion/react";
import { ArrowDown } from "@phosphor-icons/react";

/**
 * Sample 3 "Daylight" heroes for the founder and projects pages. (The homepage
 * hero is the slider in Interactive.tsx.) Same daylight palette and shapes;
 * what is new is how they arrive and how they answer the pointer.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const SOFT = { stiffness: 70, damping: 18, mass: 0.6 };

export type Media3 = { src: string; blur: string; alt: string };

const group: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const fade: Variants = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};
const line: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.07 } },
};
const word: Variants = {
  hidden: { y: "112%" },
  shown: { y: "0%", transition: { duration: 0.9, ease: EASE } },
};

function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i}>
          <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
            <motion.span variants={word} className="inline-block will-change-transform">
              {w}
            </motion.span>
          </span>{" "}
        </span>
      ))}
    </>
  );
}

function useShift(v: MotionValue<number>, amount: number) {
  return useTransform(v, [-0.5, 0.5], [-amount, amount]);
}

/* -------------------------------------------------------------------------- */
/* Founder                                                                     */
/* -------------------------------------------------------------------------- */

export type Role3 = { label: string; href: string; chapter: string; maxim: string };

export function FounderHeroThree({
  title,
  roles,
  lead,
  question,
  portrait,
  caption,
  badge,
  stat,
}: {
  title: string;
  roles: Role3[];
  lead: string;
  /** The driving question, with its highlighted words, rendered on the server. */
  question: ReactNode;
  portrait: Media3;
  caption: string;
  badge: { value: string; label: string };
  stat: { value: string; label: string };
}) {
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const nx = useSpring(rawX, SOFT);
  const ny = useSpring(rawY, SOFT);
  const blockX = useShift(nx, 12);
  const blockY = useShift(ny, 10);
  const badgeX = useShift(nx, -16);
  const badgeY = useShift(ny, -12);
  const statX = useShift(nx, 22);
  const statY = useShift(ny, 16);

  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const [active, setActive] = useState<number | null>(null);
  const shown = active === null ? null : roles[active];

  return (
    <section data-hero="founder-three" className="overflow-hidden bg-surface" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <motion.div
        initial={reduce ? false : "hidden"}
        animate="shown"
        variants={group}
        className="mx-auto grid w-full max-w-[1240px] items-center gap-12 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-12"
      >
        <div className="lg:col-span-7">
          <motion.p
            variants={fade}
            className="text-[13px] font-semibold uppercase tracking-[0.1em] text-accent-ink"
          >
            {title}
          </motion.p>
          <motion.h1
            variants={line}
            className="display mt-4 text-[clamp(3.2rem,7.6vw,6.75rem)] leading-[1] tracking-[-0.04em]"
          >
            <Words text="Dr Shruti Pai" />
          </motion.h1>
          <motion.ul variants={fade} className="mt-7 flex flex-wrap gap-2">
            {roles.map((r, i) => (
              <li key={r.label}>
                <a
                  href={r.href}
                  data-role-chip
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[14.5px] font-semibold transition-[background-color,border-color,transform] duration-300 active:scale-[0.98] ${active === i ? "-translate-y-0.5 border-accent bg-accent text-on-accent" : "border-line bg-bg"}`}
                >
                  {r.label}
                  <ArrowDown size={13} weight="bold" className="opacity-55" />
                </a>
              </li>
            ))}
          </motion.ul>
          <motion.p variants={fade} className="mt-9 text-[17px] text-muted">
            {lead}
          </motion.p>
          <motion.p
            variants={fade}
            className="display mt-2 max-w-[20ch] text-[clamp(1.8rem,3.4vw,2.9rem)] leading-[1.25]"
          >
            {question}
          </motion.p>
        </div>

        <div className="relative lg:col-span-5">
          <div className="relative">
            {/* A block of tint behind the portrait that moves a little against it */}
            <motion.div
              aria-hidden="true"
              variants={{
                hidden: { opacity: 0, scale: 0.94 },
                shown: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: EASE, delay: 0.5 } },
              }}
              style={{ x: blockX, y: blockY }}
              className="cut absolute inset-0 translate-x-3 -translate-y-3 bg-tint md:translate-x-5 md:-translate-y-5"
            />
            <motion.div
              variants={{
                hidden: { clipPath: "inset(0% 0% 100% 0%)" },
                shown: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.2, ease: EASE, delay: 0.15 } },
              }}
              className="cut relative max-h-[72dvh] w-full overflow-hidden bg-surface-2"
              style={{ aspectRatio: "4 / 5" }}
            >
              <motion.div
                variants={{
                  hidden: { scale: 1.14 },
                  shown: { scale: 1, transition: { duration: 1.6, ease: EASE, delay: 0.15 } },
                }}
                className="absolute inset-0"
              >
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  preload
                  sizes="(min-width: 1024px) 480px, 100vw"
                  placeholder="blur"
                  blurDataURL={portrait.blur}
                  className="object-cover"
                  style={{ objectPosition: "50% 16%" }}
                />
              </motion.div>
            </motion.div>

            {/* Floating credential; shows a chapter's principle while its role is pointed at */}
            <motion.div variants={fade} style={{ x: badgeX, y: badgeY }} className="absolute -left-2 bottom-12 md:-left-8">
              <div
                className="max-w-[15rem] rounded-[10px] bg-accent px-5 py-4 text-on-accent shadow-[0_18px_40px_-22px_rgba(21,27,37,0.5)] motion-safe:animate-bob"
                aria-live="polite"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {shown ? (
                    <motion.div
                      key={shown.label}
                      data-role-principle
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25, ease: EASE }}
                    >
                      <p className="text-[11.5px] font-semibold uppercase tracking-[0.08em] opacity-70">{shown.chapter}</p>
                      <p className="display mt-1 text-[1.25rem] leading-[1.2]">{shown.maxim}</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="badge"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25, ease: EASE }}
                    >
                      <p className="display text-[1.7rem] leading-none">{badge.value}</p>
                      <p className="mt-1 text-[13px] font-semibold">{badge.label}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div variants={fade} style={{ x: statX, y: statY }} className="absolute -right-1 top-8 md:-right-5">
              <div
                className="rounded-[10px] bg-bg px-4 py-3 shadow-[0_18px_40px_-22px_rgba(21,27,37,0.45)] motion-safe:animate-bob"
                style={{ animationDelay: "-3.2s" }}
              >
                <p className="display text-[1.5rem] leading-none">{stat.value}</p>
                <p className="mt-1 text-[12.5px] font-semibold text-muted">{stat.label}</p>
              </div>
            </motion.div>
          </div>
          <p className="mt-2.5 text-[13px] leading-snug text-muted">{caption}</p>
        </div>
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Projects                                                                    */
/* -------------------------------------------------------------------------- */

export type MosaicTile = Media3 & { tag: string };

const SPOT_MS = 2800;

export function ProjectsHeroThree({
  label,
  title,
  sub,
  tiles,
  href,
}: {
  label: string;
  /** Headline with its highlighted words, rendered on the server. */
  title: ReactNode;
  sub: string;
  tiles: MosaicTile[];
  /** Where a tile leads. */
  href: string;
}) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);
  const [spot, setSpot] = useState(0);

  // With nobody pointing, the caption moves from one photograph to the next.
  useEffect(() => {
    if (reduce || hover !== null) return;
    const id = window.setInterval(() => setSpot((v) => (v + 3) % tiles.length), SPOT_MS);
    return () => window.clearInterval(id);
  }, [reduce, hover, tiles.length]);

  const lit = hover ?? (reduce ? null : spot);

  return (
    <section data-hero="projects-three">
      <motion.div
        initial={reduce ? false : "hidden"}
        animate="shown"
        variants={group}
        className="mx-auto w-full max-w-[1240px] px-5 pb-16 pt-14 md:px-8 md:pb-24 md:pt-20"
      >
        <div className="mx-auto max-w-[940px] text-center">
          <motion.p variants={fade} className="text-[13px] font-semibold uppercase tracking-[0.1em] text-accent-ink">
            {label}
          </motion.p>
          <motion.h1 variants={fade} className="display mt-4 text-[clamp(2.5rem,5.6vw,4.75rem)] leading-[1.12]">
            {title}
          </motion.h1>
          <motion.p variants={fade} className="mt-6 text-[19px] leading-relaxed text-fg/85 md:text-[21px]">
            {sub}
          </motion.p>
        </div>

        <motion.ul
          variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.06 } } }}
          className="mt-12 grid grid-cols-2 overflow-hidden rounded-[14px] bg-fg md:grid-cols-4"
          onMouseLeave={() => setHover(null)}
        >
          {tiles.map((t, i) => {
            const on = lit === i;
            const dimmed = hover !== null && !on;
            return (
              <motion.li
                key={t.src}
                variants={{
                  hidden: { opacity: 0, scale: 1.08 },
                  shown: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE } },
                }}
                className="relative"
              >
                <a
                  href={href}
                  data-mosaic-tile
                  data-lit={on}
                  onMouseEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  className="relative block aspect-[3/2] overflow-hidden"
                >
                  <Image
                    src={t.src}
                    alt={t.alt}
                    fill
                    preload={i === 0}
                    sizes="(min-width: 768px) 310px, 50vw"
                    placeholder="blur"
                    blurDataURL={t.blur}
                    className={`object-cover transition-[transform,opacity] duration-700 ease-soft ${on ? "scale-[1.07]" : "scale-100"} ${dimmed ? "opacity-45" : "opacity-100"}`}
                  />
                  <span
                    className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#10181f]/90 via-[#10181f]/45 to-transparent px-3 pb-3 pt-10 text-left transition-[opacity,transform] duration-500 ease-soft md:px-4 md:pb-4 ${on ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
                  >
                    <span className="inline-block whitespace-nowrap rounded-[4px] bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-on-accent md:text-[11px]">
                      {t.tag}
                    </span>
                    <span className="mt-1.5 block text-[12.5px] font-semibold leading-snug text-white md:text-[13.5px]">
                      {t.alt}
                    </span>
                  </span>
                </a>
              </motion.li>
            );
          })}
        </motion.ul>
      </motion.div>
    </section>
  );
}
