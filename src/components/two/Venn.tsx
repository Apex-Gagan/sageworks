"use client";

import { useState } from "react";

export type Circle = {
  name: string;
  question: string;
  body: string;
  detail?: string;
  /** The lens colour as a hex value, for the drawing. */
  colour: string;
  /** Tailwind background class of the same colour, for the list. */
  dot: string;
};

const place = [
  { cx: 210, cy: 140, tx: 210, ty: 92 },
  { cx: 142, cy: 252, tx: 104, ty: 290 },
  { cx: 278, cy: 252, tx: 316, ty: 290 },
];

/**
 * The SAGE Triad as three overlapping circles: three domains, one human system where
 * they meet. Choosing a circle, or its name in the list, shows what that lens covers.
 */
export function Venn({ circles, centre }: { circles: Circle[]; centre: string }) {
  const [on, setOn] = useState(0);
  const words = centre.split(" ");
  const half = Math.ceil(words.length / 2);

  return (
    <div data-venn className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
      <svg viewBox="0 0 420 400" className="mx-auto w-full max-w-[500px]" aria-hidden="true" focusable="false">
        {circles.map((c, i) => (
          <circle
            key={c.name}
            cx={place[i].cx}
            cy={place[i].cy}
            r={118}
            fill={c.colour}
            fillOpacity={i === on ? 0.92 : 0.38}
            stroke={c.colour}
            strokeWidth={i === on ? 2 : 1}
            onClick={() => setOn(i)}
            onMouseEnter={() => setOn(i)}
            style={{ mixBlendMode: "multiply", cursor: "pointer", transition: "fill-opacity 500ms ease" }}
          />
        ))}
        {circles.map((c, i) => (
          <text
            key={c.name}
            x={place[i].tx}
            y={place[i].ty}
            textAnchor="middle"
            className="pointer-events-none fill-ink-deep text-[13px] font-semibold uppercase tracking-[0.14em]"
          >
            {c.name}
          </text>
        ))}
        <circle cx={210} cy={214} r={41} fill="#fff" />
        <text x={210} y={209} textAnchor="middle" className="pointer-events-none fill-ink-deep text-[11.5px] font-semibold">
          <tspan x={210}>{words.slice(0, half).join(" ")}</tspan>
          <tspan x={210} dy={15}>
            {words.slice(half).join(" ")}
          </tspan>
        </text>
      </svg>

      <div className="border-b border-line">
        {circles.map((c, i) => {
          const open = i === on;
          return (
            <div key={c.name} className="border-t border-line">
              <button
                type="button"
                id={`lens-tab-${c.name}`}
                aria-expanded={open}
                aria-controls={`lens-panel-${c.name}`}
                data-venn-tab={c.name}
                onClick={() => setOn(i)}
                className="flex w-full items-center gap-4 py-5 text-left"
              >
                <span className={`h-3.5 w-3.5 shrink-0 rounded-full transition-transform duration-300 ${c.dot} ${open ? "scale-125" : ""}`} />
                <span className="display text-[1.7rem] leading-none md:text-[1.9rem]">{c.name}</span>
                <span className={`ml-auto text-right text-[14.5px] transition-colors ${open ? "font-semibold text-ink-deep" : "text-ink-soft"}`}>{c.question}</span>
              </button>
              <div role="region" id={`lens-panel-${c.name}`} aria-labelledby={`lens-tab-${c.name}`} hidden={!open} className="pb-6 pl-[30px]">
                <p className="max-w-[40rem]">{c.body}</p>
                {c.detail ? <p className="mt-3 max-w-[40rem] text-[15px] text-ink-soft">{c.detail}</p> : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
