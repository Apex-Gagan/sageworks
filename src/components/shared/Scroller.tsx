"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

type Props = {
  children: ReactNode;
  /** Classes for the scrolling track (flex, gap, padding). */
  trackClassName?: string;
  /** Classes for the row that holds the arrow buttons. */
  controlsClassName?: string;
  className?: string;
  /** Arrow button style: "one" square hairline, "two" round, "three" 8px corners. */
  tone?: "one" | "two" | "three";
  /** Accessible name for the strip, e.g. "Selected projects". */
  label: string;
  /**
   * Pixels per second of gentle automatic drift. Needs the children rendered
   * twice in a row so the loop is seamless. Off under reduced motion.
   */
  auto?: number;
};

/**
 * Horizontal strip that works with every input: mouse drag, arrow buttons,
 * keyboard arrows, touch swipe and trackpad. Native scrolling underneath.
 */
export function Scroller({
  children,
  trackClassName = "",
  controlsClassName = "",
  className = "",
  tone = "one",
  label,
  auto,
}: Props) {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, moved: false, startX: 0, startLeft: 0, id: -1 });
  const paused = useRef(false);
  const holdUntil = useRef(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [scrollable, setScrollable] = useState(false);
  const [dragging, setDragging] = useState(false);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollable(max > 4);
    setCanPrev(auto ? true : el.scrollLeft > 4);
    setCanNext(auto ? true : el.scrollLeft < max - 4);
  }, [auto]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    measure();
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [measure]);

  // Gentle automatic drift. Writes scrollLeft directly, never React state.
  useEffect(() => {
    const el = track.current;
    if (!el || !auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let last = performance.now();
    let pos = el.scrollLeft;
    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      if (!paused.current && !drag.current.active && now > holdUntil.current) {
        const half = el.scrollWidth / 2;
        // Re-sync if the user moved the strip themselves.
        if (Math.abs(el.scrollLeft - pos) > 2) pos = el.scrollLeft;
        pos += (auto * dt) / 1000;
        if (half > 0 && pos >= half) pos -= half;
        el.scrollLeft = pos;
      } else {
        pos = el.scrollLeft;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [auto]);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const amount = Math.max(280, el.clientWidth * 0.8) * dir;
    holdUntil.current = performance.now() + 1200;
    if (auto) {
      const half = el.scrollWidth / 2;
      if (dir === -1 && el.scrollLeft + amount < 0) el.scrollLeft += half;
      if (dir === 1 && el.scrollLeft + amount > el.scrollWidth - el.clientWidth) el.scrollLeft -= half;
    }
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = track.current;
    if (!el) return;
    drag.current = { active: true, moved: false, startX: e.clientX, startLeft: el.scrollLeft, id: e.pointerId };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = track.current;
    if (!d.active || !el) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      setDragging(true);
      el.setPointerCapture(d.id);
    }
    if (d.moved) {
      let next = d.startLeft - dx;
      if (auto) {
        const half = el.scrollWidth / 2;
        if (half > 0) next = ((next % half) + half) % half;
      }
      el.scrollLeft = next;
    }
  };

  const endDrag = () => {
    const d = drag.current;
    const el = track.current;
    if (!d.active) return;
    d.active = false;
    if (d.moved && el?.hasPointerCapture(d.id)) el.releasePointerCapture(d.id);
    if (d.moved) window.setTimeout(() => setDragging(false), 0);
  };

  // A drag must not count as a click on a link or button inside the strip.
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  const btn =
    tone === "one"
      ? "border border-line text-fg hover:border-fg hover:bg-fg hover:text-bg disabled:hover:border-line disabled:hover:bg-transparent disabled:hover:text-fg"
      : tone === "two"
        ? "rounded-full border border-fg/25 text-fg hover:border-accent hover:bg-accent hover:text-on-accent disabled:hover:border-fg/25 disabled:hover:bg-transparent disabled:hover:text-fg"
        : "rounded-[8px] border border-line text-fg hover:border-accent hover:bg-accent hover:text-on-accent disabled:hover:border-line disabled:hover:bg-transparent disabled:hover:text-fg";

  return (
    <div
      className={className}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div
        ref={track}
        role="region"
        aria-label={label}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onDragStart={(e) => e.preventDefault()}
        onKeyDown={onKeyDown}
        onFocus={() => (paused.current = true)}
        onBlur={() => (paused.current = false)}
        onTouchStart={() => (paused.current = true)}
        onTouchEnd={() => (paused.current = false)}
        className={`no-scrollbar overflow-x-auto overscroll-x-contain select-none ${scrollable ? (dragging ? "cursor-grabbing" : "cursor-grab") : ""} ${trackClassName}`}
        style={dragging ? { scrollSnapType: "none", scrollBehavior: "auto" } : undefined}
      >
        {children}
      </div>

      {scrollable ? (
        <div className={`flex items-center gap-2 ${controlsClassName}`}>
          <button
            type="button"
            aria-label={`Scroll ${label} back`}
            disabled={!canPrev}
            onClick={() => step(-1)}
            className={`grid h-12 w-12 place-items-center transition-colors duration-300 active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-35 ${btn}`}
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            aria-label={`Scroll ${label} forward`}
            disabled={!canNext}
            onClick={() => step(1)}
            className={`grid h-12 w-12 place-items-center transition-colors duration-300 active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-35 ${btn}`}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
