import { marks, type MarkName } from "./marks";

/**
 * The client's logo artwork, drawn from the vector paths in her trademark PDF.
 * Server component only: `marks.ts` is large, so never import this from a client file.
 * `tone` is limited to the versions the brand manual allows: the artwork's own green,
 * white on green or a photograph, and black.
 */
export function Mark({
  name,
  tone = "brand",
  className,
  label,
}: {
  name: MarkName;
  tone?: "brand" | "white" | "black";
  className?: string;
  /** Accessible name. Omit for decorative use. */
  label?: string;
}) {
  const m = marks[name];
  const fill = tone === "white" ? "#fff" : tone === "black" ? "#000" : undefined;
  return (
    <svg
      viewBox={`0 0 ${m.w} ${m.h}`}
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {m.paths.map((p, i) => (
        <path key={i} d={p.d} fill={fill ?? p.fill} fillRule={p.evenodd ? "evenodd" : undefined} />
      ))}
    </svg>
  );
}
