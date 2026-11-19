"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight, FilmSlate, BookOpenText } from "@phosphor-icons/react";
import { useHash } from "./useHash";

type Photo = { src: string; w: number; h: number; alt: string; blur: string };

export type IndexProject = {
  slug: string;
  title: string;
  place: string;
  kind: string;
  theme: string;
  body: string;
  credit?: string;
  links?: { kind: "story" | "film"; label: string; by: string; href: string }[];
  photos: Photo[];
};

type KindInfo = { name: string; dot: string; soft: string; line: string };

/**
 * Every project as an index: the list on the left, grouped by kind of place and
 * colour-coded, and the chosen project on the right with its photographs. On a small
 * screen the list becomes a row of names above the project.
 */
export function ProjectIndex({ kinds, projects }: { kinds: KindInfo[]; projects: IndexProject[] }) {
  const hash = useHash();
  const [picked, setPicked] = useState<string | null>(null);
  const fromHash = projects.some((p) => p.slug === hash) ? hash : null;
  // Open on the first project that has photographs (all of them do today).
  const slug = picked ?? fromHash ?? (projects.find((x) => x.photos.length) ?? projects[0]).slug;
  const p = projects.find((x) => x.slug === slug)!;
  const kind = kinds.find((k) => k.name === p.kind)!;

  const [shot, setShot] = useState<{ slug: string; n: number }>({ slug, n: 0 });
  const n = shot.slug === slug ? shot.n : 0;
  const lead = p.photos[n];

  // Arriving from a link to one project: bring the project into view.
  useEffect(() => {
    if (fromHash) document.getElementById("project-detail")?.scrollIntoView({ block: "start" });
  }, [fromHash]);

  const choose = (s: string) => {
    setPicked(s);
    setShot({ slug: s, n: 0 });
  };

  return (
    <div data-project-index className="grid gap-x-14 gap-y-8 lg:grid-cols-[320px_minmax(0,1fr)]">
      {/* The list */}
      <nav aria-label="Projects" className="min-w-0 lg:sticky lg:top-44 lg:max-h-[calc(100vh-13rem)] lg:self-start lg:overflow-y-auto lg:pr-2">
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:-mx-10 md:px-10 lg:mx-0 lg:block lg:overflow-visible lg:px-0 lg:pb-0">
          {kinds.map((k) => {
            const list = projects.filter((x) => x.kind === k.name);
            if (!list.length) return null;
            return (
              <div key={k.name} data-kind={k.name} className="flex shrink-0 items-center gap-2 lg:mb-7 lg:block">
                <p className="hidden items-center gap-2.5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-ink-soft lg:flex">
                  <span className={`h-2.5 w-2.5 rounded-full ${k.dot}`} />
                  {k.name}
                  <span className="ml-auto">{String(list.length).padStart(2, "0")}</span>
                </p>
                <ul className="flex gap-2 lg:mt-2 lg:block lg:border-b lg:border-line">
                  {list.map((x) => {
                    const on = x.slug === slug;
                    return (
                      <li key={x.slug} className="shrink-0">
                        <button
                          type="button"
                          data-project-item={x.slug}
                          aria-pressed={on}
                          onClick={() => choose(x.slug)}
                          className={`flex items-center gap-2.5 whitespace-nowrap rounded-full border px-4 py-2 text-left text-[14.5px] font-medium transition-colors duration-300 lg:w-full lg:whitespace-normal lg:rounded-none lg:border-0 lg:border-t lg:border-line lg:px-3 lg:py-3 lg:text-[15.5px] ${
                            on ? `border-transparent text-ink-deep ${k.soft}` : "border-line text-ink hover:text-sage-ink lg:hover:bg-paper"
                          }`}
                        >
                          <span className={`h-2 w-2 shrink-0 rounded-full lg:hidden ${k.dot}`} />
                          {x.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </nav>

      {/* The chosen project */}
      <article id="project-detail" data-project-detail={p.slug} className="min-w-0 scroll-mt-40">
        {lead ? (
          <>
            <div className="relative aspect-[16/10] overflow-hidden bg-surface">
              <Image
                key={lead.src}
                src={lead.src}
                alt={lead.alt}
                fill
                sizes="(min-width: 1024px) 62vw, 100vw"
                placeholder="blur"
                blurDataURL={lead.blur}
                className="object-cover"
              />
              <p className="absolute left-0 top-0 bg-white px-3.5 py-2 text-[12.5px] font-semibold tracking-[0.14em] text-ink-deep">
                {String(n + 1).padStart(2, "0")} / {String(p.photos.length).padStart(2, "0")}
              </p>
            </div>
            {p.photos.length > 1 ? (
              <ul className="no-scrollbar mt-2 flex gap-2 overflow-x-auto">
                {p.photos.map((ph, i) => (
                  <li key={ph.src} className="shrink-0">
                    <button
                      type="button"
                      data-project-thumb
                      aria-label={`Show photograph ${i + 1}: ${ph.alt}`}
                      aria-pressed={i === n}
                      onClick={() => setShot({ slug, n: i })}
                      className={`relative block h-[68px] w-[96px] overflow-hidden bg-surface outline-offset-2 transition-opacity duration-300 md:h-[84px] md:w-[124px] ${
                        i === n ? "opacity-100 ring-2 ring-sage ring-offset-2" : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={ph.src} alt="" fill sizes="124px" className="object-cover" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        ) : (
          <div className={`flex aspect-[16/7] items-end p-7 md:p-10 ${kind.soft}`}>
            <p className="display max-w-[18ch] text-[clamp(2rem,4.4vw,3.6rem)] text-ink-deep">{p.theme}</p>
          </div>
        )}

        <div className="mt-8 grid gap-x-12 gap-y-6 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="flex items-center gap-2.5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-sage-ink">
              <span className={`h-2.5 w-2.5 rounded-full ${kind.dot}`} />
              {p.kind}
            </p>
            <h3 className="display mt-3 text-[clamp(1.9rem,3vw,2.6rem)]">{p.title}</h3>
            <p className="mt-2 text-[15px] text-ink-soft">{p.place}</p>
          </div>
          <div className="md:col-span-7">
            {lead ? <p className="display text-[1.45rem] leading-snug text-sage-text">{p.theme}</p> : null}
            <p className={lead ? "mt-4" : ""}>{p.body}</p>
            {p.credit ? <p className="mt-4 border-t border-line pt-4 text-[14.5px] text-ink-soft">{p.credit}</p> : null}
            {p.links?.length ? (
              <ul className="mt-5 space-y-2.5">
                {p.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      data-project-link={l.kind}
                      className="group inline-flex items-start gap-3 text-[15px] font-semibold text-sage-ink"
                    >
                      {l.kind === "film" ? <FilmSlate size={19} className="mt-0.5 shrink-0" /> : <BookOpenText size={19} className="mt-0.5 shrink-0" />}
                      <span>
                        <span className="underline-offset-4 group-hover:underline">{l.label}</span>
                        <span className="block text-[13.5px] font-normal text-ink-soft">
                          {l.by}. Opens in a new tab. <ArrowUpRight size={12} weight="bold" className="inline" />
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
            {!lead ? (
              <aside data-note className="mt-6 border border-dashed border-amber bg-cream/45 px-4 py-3 text-[14px] leading-snug text-ink-deep">
                <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[#8a5f00]">Photographs needed</p>
                <p className="mt-1.5">Photographs of this project, so that it can be shown in pictures here.</p>
                <p className="mt-1.5 text-ink-soft">Why: we hold no photograph of this project that Dr Shruti has approved.</p>
              </aside>
            ) : null}
          </div>
        </div>
      </article>
    </div>
  );
}
