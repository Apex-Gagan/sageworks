"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, ArrowsOutSimple, PlayCircle, X } from "@phosphor-icons/react";
import { Reveal } from "@/components/shared/Motion";

export type ProjectPhoto = { src: string; w: number; h: number; alt: string; blur: string };

export type ProjectCard = {
  slug: string;
  title: string;
  place: string;
  kind: string;
  theme: string;
  body: string;
  credit?: string;
  photos: ProjectPhoto[];
  links?: { kind: "story" | "film"; label: string; by: string; href: string }[];
};

export type KindChip = { name: string; dot: string; soft: string; line: string };

/**
 * The Projects page: every project as an editorial spread, filtered by kind of place.
 * Each spread leads with one large photograph and follows with up to three more;
 * any photograph opens the project's full set in a viewer (arrow keys, Escape).
 */
export function ProjectBrowser({ projects, kinds }: { projects: ProjectCard[]; kinds: KindChip[] }) {
  const [kind, setKind] = useState("All");
  const [view, setView] = useState<{ p: number; i: number } | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const shown = useMemo(() => projects.map((p, n) => ({ p, n })).filter(({ p }) => kind === "All" || p.kind === kind), [kind, projects]);
  const chip = (name: string) => kinds.find((k) => k.name === name)!;

  const close = useCallback(() => {
    setView(null);
    opener.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) =>
      setView((v) => {
        if (!v) return v;
        const len = projects[v.p].photos.length;
        return { p: v.p, i: (v.i + d + len) % len };
      }),
    [projects],
  );

  useEffect(() => {
    if (!view) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", key);
    closeBtn.current?.focus();
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", key);
    };
  }, [view, close, step]);

  // Close the viewer when the page is left: Next keeps it alive, and the browser may
  // restore it whole from its Back cache.
  useLayoutEffect(() => () => setView(null), []);
  useEffect(() => {
    const leave = () => {
      setView(null);
      document.documentElement.style.overflow = "";
    };
    window.addEventListener("pagehide", leave);
    return () => window.removeEventListener("pagehide", leave);
  }, []);

  const open = (p: number, i: number) => (e: React.MouseEvent<HTMLElement>) => {
    opener.current = e.currentTarget;
    setView({ p, i });
  };

  const cur = view ? projects[view.p] : null;
  const photo = view && cur ? cur.photos[view.i] : null;

  return (
    <div data-projects>
      {/* Filter: one colour per kind of place */}
      <div className="sticky top-[76px] z-30 -mx-5 border-y border-line bg-white/95 px-5 backdrop-blur-sm md:top-[88px] md:-mx-10 md:px-10">
        <div role="group" aria-label="Filter projects by kind of place" className="no-scrollbar flex gap-2 overflow-x-auto py-3">
          {[{ name: "All", dot: "bg-ink", soft: "", line: "" }, ...kinds].map((k) => {
            const count = k.name === "All" ? projects.length : projects.filter((p) => p.kind === k.name).length;
            const on = kind === k.name;
            return (
              <button
                key={k.name}
                type="button"
                data-kind={k.name}
                aria-pressed={on}
                onClick={() => setKind(k.name)}
                className={`inline-flex shrink-0 items-center gap-2.5 rounded-full border px-4 py-2 text-[15px] font-semibold transition-colors duration-300 ${
                  on ? "border-sage bg-sage text-ink-deep" : "border-line bg-white text-ink hover:border-sage-ink hover:text-sage-ink"
                }`}
              >
                <span className={`h-2.5 w-2.5 rounded-full ${on ? "bg-ink-deep" : k.dot}`} />
                {k.name}
                <span className={`text-[13px] font-medium ${on ? "text-ink-deep/75" : "text-ink-soft"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        <span data-project-count>{shown.length}</span> projects shown
      </p>

      <div className="divide-y divide-line">
        {shown.map(({ p, n }, row) => {
          const k = chip(p.kind);
          const flip = row % 2 === 1;
          const [lead, ...rest] = p.photos;
          const thumbs = rest.slice(0, 3);
          const more = rest.length - thumbs.length;
          return (
            <article key={p.slug} id={p.slug} data-project={p.slug} className="scroll-mt-40 py-14 md:py-20">
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                {/* Words */}
                <Reveal className={`lg:col-span-4 ${flip ? "lg:order-2" : ""}`}>
                  <div className="lg:sticky lg:top-44">
                    <div className="flex items-center gap-3">
                      <span className="display text-[2.4rem] leading-none text-line">{String(n + 1).padStart(2, "0")}</span>
                      <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12.5px] font-semibold text-ink-deep ${k.soft}`}>
                        <span className={`h-2 w-2 rounded-full ${k.dot}`} />
                        {p.kind}
                      </span>
                    </div>
                    <h2 className="display mt-5 text-[clamp(2rem,3vw,2.75rem)]">{p.title}</h2>
                    <p className="mt-2 text-[15px] text-ink-soft">{p.place}</p>
                    <p className="display mt-6 border-l-2 border-sage pl-4 text-[1.35rem] text-sage-text">{p.theme}</p>
                    <p className="mt-5 text-[16.5px] leading-relaxed">{p.body}</p>
                    {p.credit ? <p className="mt-5 text-[14px] leading-relaxed text-ink-soft">{p.credit}</p> : null}
                    {p.links?.length ? (
                      <ul className="mt-5 space-y-2 border-t border-line pt-5">
                        {p.links.map((l) => (
                          <li key={l.href}>
                            <a
                              href={l.href}
                              target="_blank"
                              rel="noreferrer"
                              data-project-link={l.kind}
                              className="group inline-flex items-start gap-2.5 text-[15px] font-semibold text-ink underline-offset-4 hover:text-sage-ink hover:underline"
                            >
                              {l.kind === "film" ? (
                                <PlayCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-sage-ink" />
                              ) : (
                                <ArrowUpRight size={18} weight="bold" className="mt-0.5 shrink-0 text-sage-ink" />
                              )}
                              <span>
                                {l.label}
                                <span className="block text-[13px] font-normal text-ink-soft">{l.by}. Opens in a new tab.</span>
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <button
                      type="button"
                      onClick={open(n, 0)}
                      className="group mt-7 inline-flex items-center gap-2 text-[15px] font-semibold text-sage-ink underline-offset-4 hover:underline"
                    >
                      View {p.photos.length} photographs
                      <ArrowsOutSimple size={15} weight="bold" className="transition-transform duration-300 group-hover:scale-110" />
                    </button>
                  </div>
                </Reveal>

                {/* Pictures */}
                <Reveal delay={0.08} className={`lg:col-span-8 ${flip ? "lg:order-1" : ""}`}>
                  <button
                    type="button"
                    data-project-photo
                    onClick={open(n, 0)}
                    aria-label={`Open photograph: ${lead.alt}`}
                    className={`group relative block w-full overflow-hidden bg-surface ${flip ? "leafcut-sm" : "leafcut"}`}
                    style={{ aspectRatio: lead.w >= lead.h ? "3 / 2" : "4 / 5" }}
                  >
                    <Image
                      src={lead.src}
                      alt={lead.alt}
                      fill
                      sizes="(min-width: 1024px) 62vw, 100vw"
                      placeholder="blur"
                      blurDataURL={lead.blur}
                      preload={row === 0}
                      className="object-cover transition-transform duration-[1400ms] ease-soft group-hover:scale-[1.035]"
                    />
                  </button>
                  {thumbs.length ? (
                    <div className={`mt-3 grid gap-3 ${thumbs.length === 1 ? "grid-cols-2" : thumbs.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                      {thumbs.map((t, i) => (
                        <button
                          key={t.src}
                          type="button"
                          data-project-photo
                          onClick={open(n, i + 1)}
                          aria-label={`Open photograph: ${t.alt}`}
                          className="group relative block aspect-[4/3] overflow-hidden bg-surface"
                        >
                          <Image
                            src={t.src}
                            alt={t.alt}
                            fill
                            sizes="(min-width: 1024px) 21vw, 33vw"
                            placeholder="blur"
                            blurDataURL={t.blur}
                            className="object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.05]"
                          />
                          {i === thumbs.length - 1 && more > 0 ? (
                            <span className="absolute inset-0 flex items-center justify-center bg-ink-deep/55 text-[1.3rem] font-semibold text-white">
                              +{more} more
                            </span>
                          ) : null}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </Reveal>
              </div>
            </article>
          );
        })}
      </div>

      {cur && photo && view ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${cur.title}: photograph viewer`}
          data-project-viewer
          className="fixed inset-0 z-[80] flex flex-col bg-white"
        >
          <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-10">
            <p className="text-[14.5px] text-ink-soft">
              <span data-viewer-index>{view.i + 1}</span> of {cur.photos.length}
            </p>
            <button
              ref={closeBtn}
              type="button"
              onClick={close}
              aria-label="Close viewer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink hover:border-sage-ink hover:text-sage-ink"
            >
              <X size={20} />
            </button>
          </div>
          <div className="relative min-h-0 flex-1 px-5 md:px-20">
            <Image key={photo.src} src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-contain" />
          </div>
          <div className="flex items-center justify-between gap-6 px-5 py-5 md:px-10">
            <div className="min-w-0">
              <p className="display truncate text-[1.4rem]">{cur.title}</p>
              <p className="truncate text-[14.5px] text-ink-soft">{photo.alt}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photograph"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sage text-ink-deep hover:bg-sage-deep"
              >
                <ArrowLeft size={20} weight="bold" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photograph"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sage text-ink-deep hover:bg-sage-deep"
              >
                <ArrowRight size={20} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
