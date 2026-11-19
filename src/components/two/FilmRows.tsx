"use client";

import { useState } from "react";
import { ArrowUpRight, Play, X } from "@phosphor-icons/react";

export type Film = {
  /** The Instagram reel id, the part after /reel/ in its address. */
  id: string;
  title: string;
  place: string;
  by: string;
  /** False when Instagram does not allow the reel to play on other sites. */
  embed: boolean;
};

/**
 * Films of the work, as a short ruled list. Nothing is requested from Instagram until
 * a visitor presses play; the player then opens beneath that row. A reel that cannot
 * be played on other sites opens on Instagram instead.
 */
export function FilmRows({ films }: { films: Film[] }) {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <ul data-film-rows className="border-b border-line">
      {films.map((f, n) => {
        const href = `https://www.instagram.com/reel/${f.id}/`;
        const on = playing === f.id;
        const round = "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors duration-300";
        return (
          <li key={f.id} data-film-row={f.id} data-playing={on} className="border-t border-line py-5">
            <div className="grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-3 md:grid-cols-[auto_2.5rem_1fr_auto]">
              {f.embed ? (
                <button
                  type="button"
                  data-film-play
                  aria-expanded={on}
                  aria-label={on ? `Close the film: ${f.title}` : `Play the film: ${f.title}. It loads from Instagram.`}
                  onClick={() => setPlaying(on ? null : f.id)}
                  className={`${round} ${on ? "border border-ink/40 bg-white text-ink-deep" : "bg-sage text-ink-deep hover:bg-sage-deep"}`}
                >
                  {on ? <X size={18} weight="bold" /> : <Play size={18} weight="fill" />}
                </button>
              ) : (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  data-film-link
                  aria-label={`Watch the film on Instagram: ${f.title}`}
                  className={`${round} border border-sage-ink/40 text-sage-ink hover:bg-sage hover:text-ink-deep`}
                >
                  <ArrowUpRight size={18} weight="bold" />
                </a>
              )}
              <span className="display hidden text-[1.2rem] text-sage-text md:block">{String(n + 1).padStart(2, "0")}</span>
              <div>
                <p className="display text-[1.5rem] leading-tight">{f.title}</p>
                <p className="mt-0.5 text-[15px] text-ink-soft">{f.place}</p>
              </div>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="col-span-2 inline-flex items-center gap-1.5 text-[14px] font-semibold text-sage-ink underline-offset-4 hover:underline md:col-span-1"
              >
                Film by {f.by}
                <ArrowUpRight size={13} weight="bold" />
              </a>
            </div>
            <p className="mt-2 pl-[68px] text-[13.5px] text-ink-soft md:pl-[128px]">{f.embed ? "Plays here, from Instagram" : "Opens on Instagram"}</p>
            {on ? (
              <div className="relative mt-5 aspect-[9/14] w-full max-w-[420px] overflow-hidden bg-surface md:ml-[128px]">
                <iframe
                  src={`https://www.instagram.com/reel/${f.id}/embed/`}
                  title={`${f.title}: film by ${f.by}, playing from Instagram`}
                  loading="lazy"
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0 bg-white"
                />
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
