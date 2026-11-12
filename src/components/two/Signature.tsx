"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { Minus, Plus } from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export type CircleItem = {
  name: string;
  line: string;
  body: string;
  detail?: string;
  src: string;
  blur: string;
  alt: string;
};

const positions = [
  "left-[22%] top-0",
  "left-0 top-[44%]",
  "left-[44%] top-[44%]",
];

/**
 * The SAGE Triad as three overlapping photographs. Selecting a circle brings
 * that domain forward and shows its explanation, so the diagram is the content.
 */
export function TriadCircles({
  items,
  heading,
}: {
  items: CircleItem[];
  heading?: React.ReactNode;
}) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = items[active];

  return (
    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-5">
        {heading}
        <div className="relative mt-10 min-h-[17rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent">{current.line}</p>
              <h3 className="display mt-3 text-[clamp(3rem,6vw,5.5rem)] leading-[0.95]">{current.name}</h3>
              <p className="mt-5 max-w-[46ch] text-[16.5px] leading-relaxed text-fg/85">{current.body}</p>
              {current.detail ? (
                <p className="mt-3 max-w-[46ch] text-[14.5px] leading-relaxed text-muted">{current.detail}</p>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="lg:col-span-7">
        <div className="relative mx-auto aspect-square w-full max-w-[680px]">
          {items.map((item, i) => {
            const on = i === active;
            return (
              <button
                key={item.name}
                type="button"
                aria-pressed={on}
                aria-label={`${item.name}: ${item.line}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`group absolute aspect-square w-[56%] overflow-hidden rounded-full border transition-[transform,border-color,box-shadow] duration-700 ease-soft ${positions[i]} ${on ? "z-10 scale-[1.04] border-accent shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]" : "z-0 border-fg/20 hover:border-fg/50"}`}
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 30vw, 56vw"
                  placeholder="blur"
                  blurDataURL={item.blur}
                  className={`object-cover transition-[filter,transform] duration-[900ms] ease-soft ${on ? "scale-100 saturate-100" : "scale-110 saturate-[0.4]"}`}
                />
                <span
                  className={`absolute inset-0 transition-colors duration-700 ${on ? "bg-bg/25" : "bg-bg/65"}`}
                />
                <span className="absolute inset-0 grid place-items-center">
                  <span
                    className={`display text-[clamp(1.1rem,2.4vw,2rem)] leading-none transition-colors duration-500 ${on ? "text-fg" : "text-fg/75"}`}
                  >
                    {item.name}
                  </span>
                </span>
              </button>
            );
          })}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[57%] z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent ring-8 ring-accent/20"
          />
        </div>
      </div>
    </div>
  );
}

export type ProjectRow = {
  slug: string;
  title: string;
  place: string;
  theme: string;
  body: string;
  credit?: string;
  src: string;
  blur: string;
  alt: string;
  thumbs: { src: string; blur: string; alt: string }[];
};

/**
 * Project list with a photograph that follows the pointer. A row opens on
 * click to show the project note. On touch screens each row carries its own
 * thumbnail instead, since there is no pointer to follow.
 */
export function ProjectList({ items }: { items: ProjectRow[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 140, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 140, damping: 20, mass: 0.6 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;
    x.set(Math.min(e.clientX - r.left + 28, r.width - 300));
    y.set(e.clientY - r.top - 190);
  };

  return (
    <div ref={wrap} className="relative" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
      <ul>
        {items.map((p, i) => {
          const isOpen = open === i;
          return (
            <li key={p.slug} className="border-t border-line last:border-b">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                className="group flex w-full items-center gap-5 py-5 text-left md:py-7"
              >
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-surface lg:hidden">
                  <Image src={p.src} alt="" fill sizes="56px" placeholder="blur" blurDataURL={p.blur} className="object-cover" />
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`display block text-[clamp(1.5rem,3.4vw,3.1rem)] leading-[1.02] transition-[color,transform] duration-500 ease-soft lg:group-hover:translate-x-3 ${isOpen || hover === i ? "text-accent" : "text-fg"}`}
                  >
                    {p.title}
                  </span>
                  <span className="mt-1.5 block text-[13.5px] text-muted">{p.theme}</span>
                </span>
                <span className="hidden text-right text-[13.5px] text-muted md:block">{p.place}</span>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-fg/20 text-fg transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
                  {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-700 ease-soft ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <div className="grid gap-8 pb-9 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                      <p className="max-w-[50ch] text-[16px] leading-relaxed text-fg/85">{p.body}</p>
                      {p.credit ? <p className="mt-4 text-[13.5px] text-muted">{p.credit}</p> : null}
                    </div>
                    <div className="grid grid-cols-3 gap-3 lg:col-span-7">
                      {p.thumbs.map((t, n) => (
                        <div
                          key={t.src}
                          className={`relative aspect-[4/5] overflow-hidden bg-surface ${n === 0 ? "arch" : "rounded-[20px]"}`}
                        >
                          <Image
                            src={t.src}
                            alt={t.alt}
                            fill
                            sizes="(min-width: 1024px) 18vw, 33vw"
                            placeholder="blur"
                            blurDataURL={t.blur}
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Pointer-following photograph, large screens with a mouse only */}
      <motion.div
        aria-hidden="true"
        style={reduce ? { x, y } : { x: sx, y: sy }}
        className={`arch pointer-events-none absolute left-0 top-0 z-10 hidden h-[340px] w-[270px] overflow-hidden bg-surface shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)] transition-opacity duration-300 lg:block ${hover !== null && hover !== open ? "opacity-100" : "opacity-0"}`}
      >
        {items.map((p, i) => (
          <Image
            key={p.slug}
            src={p.src}
            alt=""
            fill
            sizes="270px"
            placeholder="blur"
            blurDataURL={p.blur}
            className={`object-cover transition-opacity duration-500 ${hover === i ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </motion.div>
    </div>
  );
}
