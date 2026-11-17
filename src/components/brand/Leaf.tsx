"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { LEAF } from "./leaf-path";

/** The leaf from the logo, filled with the current text colour. Decorative. */
export function Leaf({ className }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${LEAF.w} ${LEAF.h}`} className={className} aria-hidden="true" focusable="false">
      <path d={LEAF.d} fill="currentColor" />
    </svg>
  );
}

/**
 * The leaf drawing itself once when it scrolls into view (questionnaire, Q19).
 * The real artwork is revealed through a mask that follows its centre line, so the
 * shape itself is never redrawn or altered.
 */
export function LeafDraw({
  className,
  duration = 1.8,
  delay = 0,
  loop = false,
}: {
  className?: string;
  duration?: number;
  delay?: number;
  /** Keep drawing, for the loading mark. */
  loop?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const ref = useRef<SVGSVGElement>(null);
  const reduce = useReducedMotion();
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const still = reduce === true;
  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${LEAF.w} ${LEAF.h}`}
      className={className}
      aria-hidden="true"
      focusable="false"
      data-leaf-draw={seen || still ? "drawn" : "waiting"}
    >
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width={LEAF.w} height={LEAF.h}>
          <path
            d={LEAF.centre}
            fill="none"
            stroke="#fff"
            strokeWidth="11"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={still ? 0 : 1}
            style={
              still || !seen
                ? undefined
                : {
                    animation: `leaf-draw ${duration}s cubic-bezier(0.65, 0, 0.35, 1) ${delay}s ${
                      loop ? "infinite alternate" : "forwards"
                    }`,
                  }
            }
          />
        </mask>
      </defs>
      <path d={LEAF.d} fill="currentColor" mask={`url(#${id})`} />
    </svg>
  );
}

/**
 * A small leaf that trails the pointer (questionnaire, Q19: "Also as a cursor").
 * It follows the real cursor instead of replacing it, so pointing stays exact.
 * Mouse only; hidden on touch screens and under reduced motion.
 */
export function LeafCursor() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });
  const [shown, setShown] = useState(false);
  const [over, setOver] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX + 14);
      y.set(e.clientY + 12);
      setShown(true);
      const t = e.target as Element | null;
      setOver(!!t?.closest?.("a, button, [role='button'], input, select, textarea, summary, label"));
    };
    const leave = () => setShown(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [reduce, x, y]);

  if (reduce) return null;
  return (
    <motion.div
      aria-hidden="true"
      data-leaf-cursor
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden text-sage-ink [@media(pointer:fine)]:block"
      style={{ x: sx, y: sy }}
      animate={{ opacity: shown ? 1 : 0, scale: over ? 1.35 : 1, rotate: over ? -14 : 0 }}
      transition={{ duration: 0.25 }}
    >
      <Leaf className="h-6 w-auto" />
    </motion.div>
  );
}
