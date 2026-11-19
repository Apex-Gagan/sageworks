import { Note } from "@/components/site/ui";

/**
 * The Human Adaptation Gap as a drawing: two lines that start together and part.
 * The labels are the client's own words for the two sides of the gap (content master,
 * Page 3). The drawing shows the idea only; it carries no data.
 */
export function GapDiagram({ demand, need, gap }: { demand: string; need: string; gap: string }) {
  return (
    <figure data-gap-diagram className="relative border border-line bg-white p-5 md:p-7">
      <svg viewBox="0 0 520 300" className="w-full" aria-hidden="true" focusable="false">
        <path d="M20 250 C 180 244, 330 200, 500 34 L 500 222 C 330 240, 180 248, 20 250 Z" fill="#cdeace" opacity="0.7" />
        <path d="M20 250 C 180 244, 330 200, 500 34" fill="none" stroke="#edaa1f" strokeWidth="3" strokeLinecap="round" />
        <path d="M20 250 C 180 248, 330 240, 500 222" fill="none" stroke="#9aca28" strokeWidth="3" strokeLinecap="round" />
        <path d="M468 74 L468 212" fill="none" stroke="#1f2823" strokeWidth="1.5" strokeDasharray="4 5" />
        <path d="M462 84 L468 72 L474 84 M462 202 L468 214 L474 202" fill="none" stroke="#1f2823" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="250" r="5" fill="#1f2823" />
      </svg>
      <figcaption className="mt-5 grid gap-3 border-t border-line pt-5 text-[14.5px] leading-snug sm:grid-cols-3">
        <p className="flex gap-2.5">
          <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-amber" />
          {demand}
        </p>
        <p className="flex gap-2.5">
          <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-sage" />
          {need}
        </p>
        <p className="flex gap-2.5 font-semibold text-ink-deep">
          <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-mint ring-1 ring-sage" />
          {gap}
        </p>
      </figcaption>
    </figure>
  );
}

/**
 * Percentage figures the client is supplying (questionnaire, Q23). Three ruled slots,
 * ready for the numbers, and a note saying what is needed.
 */
export function StatLine({ labels, about }: { labels: string[]; about: string }) {
  return (
    <div data-stat-slots>
      <dl className="grid grid-cols-3 border-y border-line">
        {labels.map((l, n) => (
          <div key={l} className={`py-5 pr-3 ${n ? "border-l border-line pl-4 md:pl-6" : ""}`}>
            <dt className="display text-[clamp(1.9rem,3.4vw,3rem)] leading-none text-line">00%</dt>
            <dd className="mt-2 text-[13.5px] font-semibold leading-snug">{l}</dd>
          </div>
        ))}
      </dl>
      <Note className="mt-4" why="Dr Shruti asked for proof numbers as percentages and said Sagework will provide them, with sources.">
        {about}
      </Note>
    </div>
  );
}
