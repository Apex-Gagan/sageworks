"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { TriadMark } from "@/components/shared/Triad";
import "./fort.css";

/** Class names in fort.css (a plain stylesheet, see the note at its top). */
const styles = {
  battlement: "fort-battlement",
  bay: "fort-bay",
  bays: "fort-bays",
  bird: "fort-bird",
  cornice: "fort-cornice",
  chhatri: "fort-chhatri",
  depth: "fort-depth",
  dusk: "fort-dusk",
  fort: "fort-fort",
  frame: "fort-frame",
  frieze: "fort-frieze",
  headline: "fort-headline",
  hills: "fort-hills",
  late: "fort-late",
  leaf: "fort-leaf",
  left: "fort-left",
  opening: "fort-opening",
  pages: "fort-pages",
  pennant: "fort-pennant",
  plaque: "fort-plaque",
  plaqueWrap: "fort-plaqueWrap",
  plinth: "fort-plinth",
  ready: "fort-ready",
  recess: "fort-recess",
  rosette: "fort-rosette",
  right: "fort-right",
  rule: "fort-rule",
  scene: "fort-scene",
  sill: "fort-sill",
  sky: "fort-sky",
  slit: "fort-slit",
  stars: "fort-stars",
  through: "fort-through",
  tile: "fort-tile",
  tower: "fort-tower",
  towerBand: "fort-towerBand",
  towerTop: "fort-towerTop",
  veil: "fort-veil",
  view: "fort-view",
  wall: "fort-wall",
  window: "fort-window",
} as const;

/**
 * The overview page as an old fort. Each design sample is a shuttered window:
 * the shutters stand ajar, open further when pointed at, and swing wide when
 * chosen. The view through the window then grows to fill the screen and the
 * sample opens. With reduced motion the links simply navigate.
 */

export type FortSample = {
  id: "1" | "2" | "3";
  name: string;
  line: string;
  references: string;
  type: string;
  palette: string[];
  /** Background and text colour of the sample itself, for the moment of arrival. */
  ground: string;
  ink: string;
  src: string;
  blur: string;
  alt: string;
};

const PAGES = [
  { label: "Homepage", path: "" },
  { label: "Founder page", path: "/founder" },
  { label: "Projects page", path: "/projects" },
];

/* The window's pointed arch as a polygon, so the same outline can be used for
   the stone frame, the opening, and the shape that grows to fill the screen. */
const ARCH_POINTS: [number, number][] = (() => {
  const bez = (t: number, a: number, b: number, c: number, d: number) =>
    (1 - t) ** 3 * a + 3 * (1 - t) ** 2 * t * b + 3 * (1 - t) * t ** 2 * c + t ** 3 * d;
  const left: [number, number][] = [];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    // From the springing point up to the apex, in a 100 by 140 box.
    left.push([bez(t, 0, 0, 24, 50), (bez(t, 52, 26, 12, 0) / 140) * 100]);
  }
  const right = left
    .slice(0, -1)
    .reverse()
    .map(([x, y]) => [100 - x, y] as [number, number]);
  return [...left, ...right];
})();

/** `rise` 1 is the full arch, 0 is a plain rectangle. */
function archPath(rise: number) {
  const top = ARCH_POINTS.map(([x, y]) => `${x.toFixed(2)}% ${(y * rise).toFixed(2)}%`).join(", ");
  return `polygon(0% 100%, ${top}, 100% 100%)`;
}
const ARCH = archPath(1);
const SQUARE = archPath(0);

const SHUTTER_MS = 900;

type Journey = {
  id: FortSample["id"];
  href: string;
  /** shutters: swinging open. through: the view grows. arrive: the sample's own ground. */
  phase: "shutters" | "through" | "arrive";
  rect?: { top: number; left: number; width: number; height: number; vw: number; vh: number };
};

function Battlement({ id }: { id: string }) {
  return (
    <svg className={styles.battlement} width="100%" height="40" aria-hidden="true" focusable="false">
      <defs>
        <pattern id={id} width="52" height="40" patternUnits="userSpaceOnUse">
          <path d="M5 40V19C5 11 15 9 26 0c11 9 21 11 21 19v21z" fill="currentColor" />
          <path d="M26 15l3.6 5.5L26 26l-3.6-5.5z" fill="#5b3410" fillOpacity="0.32" />
        </pattern>
      </defs>
      <rect width="100%" height="40" fill={`url(#${id})`} />
    </svg>
  );
}

/** Eight-petalled flower carved into each spandrel of a window. */
function Rosette({ side }: { side: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      className={`${styles.rosette} ${side === "left" ? styles.left : styles.right}`}
      viewBox="0 0 30 30"
      focusable="false"
    >
      <g fill="currentColor">
        {[0, 45, 90, 135].map((r) => (
          <ellipse key={r} cx="15" cy="15" rx="3.4" ry="13" transform={`rotate(${r} 15 15)`} fillOpacity="0.55" />
        ))}
      </g>
      <circle cx="15" cy="15" r="4.2" fill="#f6e3bc" />
      <circle cx="15" cy="15" r="1.8" fill="currentColor" />
    </svg>
  );
}

function Tower({ side }: { side: "left" | "right" }) {
  return (
    <div aria-hidden="true" className={`${styles.tower} ${side === "left" ? styles.left : styles.right}`}>
      <div className={styles.towerTop}>
        <span className={styles.pennant} />
        <svg className={styles.chhatri} viewBox="0 0 140 118" focusable="false">
          <path d="M70 0v15" stroke="currentColor" strokeWidth="2.4" />
          <circle cx="70" cy="17" r="4.2" fill="currentColor" />
          <path d="M34 62C34 32 52 22 70 20c18 2 36 12 36 42z" fill="currentColor" />
          <path d="M70 20c18 2 36 12 36 42H70z" fill="#5b3410" fillOpacity="0.2" />
          <path d="M12 62h116l-9 10H21z" fill="currentColor" />
          <path d="M21 72h98" stroke="#5b3410" strokeOpacity="0.4" strokeWidth="1.5" />
          <path d="M27 72h7v36h-7zM52 72h6v36h-6zM82 72h6v36h-6zM106 72h7v36h-7z" fill="currentColor" />
          <path
            d="M34 108V88c0-10 18-10 18 0v20M58 108V88c0-11 24-11 24 0v20M88 108V88c0-10 18-10 18 0v20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M17 108h106v10H17z" fill="currentColor" />
        </svg>
        <Battlement id={`kangura-${side}`} />
        <div className={styles.towerBand} />
      </div>
      <span className={styles.slit} style={{ top: 96 }} />
      <span className={styles.slit} style={{ top: 330 }} />
      <span className={styles.slit} style={{ top: 580 }} />
    </div>
  );
}

export function Fort({ samples }: { samples: FortSample[] }) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const openings = useRef(new Map<string, HTMLElement>());
  const timer = useRef<number | null>(null);
  const [ready, setReady] = useState(false);
  const [journey, setJourney] = useState<Journey | null>(null);

  // The shutters start closed and settle ajar once the page is up.
  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 500);
    return () => window.clearTimeout(id);
  }, []);

  // Next keeps this page alive (hidden) after leaving it. Close the windows as
  // it goes, so coming back shows the fort and not the last transition.
  useLayoutEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
      setJourney(null);
    };
  }, []);

  const enter = (e: MouseEvent<HTMLAnchorElement>, id: FortSample["id"], href: string) => {
    if (reduce || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    if (journey) return;
    router.prefetch(href);
    setJourney({ id, href, phase: "shutters" });
    timer.current = window.setTimeout(() => {
      const el = openings.current.get(id);
      if (!el) {
        router.push(href);
        return;
      }
      const r = el.getBoundingClientRect();
      setJourney({
        id,
        href,
        phase: "through",
        rect: {
          top: r.top,
          left: r.left,
          width: r.width,
          height: r.height,
          vw: window.innerWidth,
          vh: window.innerHeight,
        },
      });
    }, SHUTTER_MS);
  };

  const chosen = journey ? samples.find((s) => s.id === journey.id) : undefined;
  const rect = journey?.rect;

  return (
    <main className={`${styles.scene} ${ready ? styles.ready : ""}`} data-fort data-journey={journey?.phase ?? "idle"}>
      {/* Dusk sky */}
      <div className={styles.sky}>
        <span aria-hidden="true" className={styles.stars} />
        <span aria-hidden="true" className={`${styles.stars} ${styles.late}`} />
        {[92, 138, 176].map((top) => (
          <svg
            key={top}
            aria-hidden="true"
            className={`${styles.bird} motion-reduce:hidden`}
            style={{ top }}
            viewBox="0 0 22 10"
            focusable="false"
          >
            <path
              d="M1 7Q6 0 11 6Q16 0 21 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        ))}
        <svg
          aria-hidden="true"
          className={styles.hills}
          viewBox="0 0 1440 190"
          preserveAspectRatio="none"
          focusable="false"
        >
          <path
            d="M0 122C120 72 220 112 340 92 460 70 520 32 640 64c120 30 200-12 320 8 120 20 220-30 340 6 60 16 110 8 140 2v110H0z"
            fill="#4f4466"
            fillOpacity="0.8"
          />
          <path
            d="M0 152c160-40 300 0 460-22 160-22 240 12 400-4 160-16 300 22 440 2 70-10 120 2 140 6v56H0z"
            fill="#6f4f5e"
          />
        </svg>

        <div className="relative mx-auto max-w-[1240px] px-5 md:px-10">
          <header className="flex items-center justify-between border-b border-white/15 py-6">
            <div className="flex items-center gap-2.5">
              <TriadMark className="h-6 w-6 text-[#f3cb8c]" />
              <span className="display text-[1.6rem] leading-none">Sagework</span>
            </div>
            <p className="label text-white/70">Website design samples</p>
          </header>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="mx-auto max-w-[900px] pt-14 text-center md:pt-20"
          >
            <p className="label text-[#f3cb8c]">Three windows, three designs</p>
            <h1 className={`${styles.headline} display mt-5 text-[clamp(2.75rem,6.4vw,5.75rem)] leading-[1.02]`}>
              Three directions for <em>one human system</em>
            </h1>
            <p className="mx-auto mt-7 max-w-[60ch] text-[17px] leading-relaxed text-white/85">
              Each sample covers the same three pages with the same approved copy and photography, so the difference you
              see is the design itself. Open a window to step inside, then use the switch at the bottom of the screen to
              compare them.
            </p>
          </motion.div>
        </div>
      </div>

      {/* The fort */}
      <div className={styles.fort}>
        <Battlement id="kangura-wall" />
        <div className={styles.wall}>
          <Tower side="left" />
          <Tower side="right" />
          <div aria-hidden="true" className={styles.frieze} />

          <ul className={styles.bays}>
            {samples.map((s, i) => {
              const open = journey?.id === s.id;
              return (
                <li key={s.id} className={styles.bay}>
                  <Link
                    href={`/${s.id}`}
                    data-window={s.id}
                    aria-label={`Open the window to sample ${s.id}, ${s.name}`}
                    onClick={(e) => enter(e, s.id, `/${s.id}`)}
                    className={styles.window}
                  >
                    <span className={styles.cornice} />
                    <span className={styles.frame}>
                      <Rosette side="left" />
                      <Rosette side="right" />
                      <span className={styles.recess}>
                        <span
                          ref={(el) => {
                            if (el) openings.current.set(s.id, el);
                            else openings.current.delete(s.id);
                          }}
                          className={styles.opening}
                          style={{ clipPath: ARCH }}
                          data-open={open}
                        >
                          <Image
                            src={s.src}
                            alt={s.alt}
                            fill
                            preload={i === 0}
                            sizes="100vw"
                            placeholder="blur"
                            blurDataURL={s.blur}
                            className={styles.view}
                          />
                          <span className={styles.depth} />
                          <span className={`${styles.leaf} ${styles.left}`} />
                          <span className={`${styles.leaf} ${styles.right}`} />
                        </span>
                      </span>
                    </span>
                    <span className={styles.sill} />
                  </Link>

                  <div className={styles.plaqueWrap}>
                    <div className={styles.plaque}>
                      <p className="label text-[#6a4826]">Sample {s.id}</p>
                      <h2 className="display mt-2 text-[clamp(2.7rem,4.2vw,3.6rem)] leading-none">{s.name}</h2>
                      <p className="mt-4 text-[15px] leading-relaxed text-[#3d2814]">{s.line}</p>

                      <dl className={`${styles.rule} mt-6 grid gap-4 pt-5 text-[13.5px]`}>
                        <div>
                          <dt className="text-[#6a4826]">Draws on</dt>
                          <dd className="mt-1 leading-snug">{s.references}</dd>
                        </div>
                        <div>
                          <dt className="text-[#6a4826]">Typefaces</dt>
                          <dd className="mt-1 leading-snug">{s.type}</dd>
                        </div>
                        <div>
                          <dt className="text-[#6a4826]">Palette</dt>
                          <dd className="mt-2 flex gap-2">
                            {s.palette.map((c) => (
                              <span key={c} title={c} className={styles.tile} style={{ backgroundColor: c }} />
                            ))}
                          </dd>
                        </div>
                      </dl>

                      <ul className={`${styles.pages} ${styles.rule} mt-6`}>
                        {PAGES.map((p, n) => (
                          <li key={p.label} className={n ? styles.rule : undefined}>
                            <Link href={`/${s.id}${p.path}`} onClick={(e) => enter(e, s.id, `/${s.id}${p.path}`)}>
                              <span className="display text-[1.4rem] leading-none">
                                {p.label} {s.id}
                              </span>
                              <ArrowRight size={16} />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <footer className={styles.plinth}>
            <div className="mx-auto flex max-w-[1000px] flex-col gap-2 text-[12.5px] sm:flex-row sm:justify-between">
              <p>Prepared for Dr Shruti Pai and the Sagework team.</p>
              <p>Draft for review. Not indexed by search engines.</p>
            </div>
          </footer>
        </div>
      </div>

      {/* Stepping through the chosen window */}
      {journey && chosen && rect ? (
        <>
          <motion.div
            aria-hidden="true"
            className={styles.dusk}
            style={
              { "--fx": `${rect.left + rect.width / 2}px`, "--fy": `${rect.top + rect.height / 2}px` } as CSSProperties
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            aria-hidden="true"
            data-through
            className={styles.through}
            initial={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height, clipPath: ARCH }}
            animate={{ top: 0, left: 0, width: rect.vw, height: rect.vh, clipPath: SQUARE }}
            transition={{ duration: 1, ease: [0.66, 0, 0.18, 1] }}
            onAnimationComplete={() => setJourney((j) => (j && j.phase === "through" ? { ...j, phase: "arrive" } : j))}
          >
            <Image src={chosen.src} alt="" fill sizes="100vw" placeholder="blur" blurDataURL={chosen.blur} />
          </motion.div>
          {journey.phase === "arrive" ? (
            <motion.div
              role="status"
              data-arrive
              className={styles.veil}
              style={{ backgroundColor: chosen.ground, color: chosen.ink }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              onAnimationComplete={() => router.push(journey.href)}
            >
              <div>
                <p className="label opacity-70">Sample {chosen.id}</p>
                <p className="display mt-3 text-[clamp(3rem,8vw,6rem)] leading-none">{chosen.name}</p>
              </div>
            </motion.div>
          ) : null}
        </>
      ) : null}
    </main>
  );
}
