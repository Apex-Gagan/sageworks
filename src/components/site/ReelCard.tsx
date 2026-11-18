"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Play } from "@phosphor-icons/react";

export type Reel = {
  /** The Instagram reel id, the part after /reel/ in its address. */
  id: string;
  title: string;
  place: string;
  /** Who made and posted the film. */
  by: string;
  href: string;
  /** False when Instagram does not allow the reel to play on other sites. */
  embed: boolean;
  poster: { src: string; alt: string; blur: string };
};

/**
 * A film that plays in place, but only once the visitor asks for it. Until the play
 * button is pressed the card shows one of our own photographs and nothing is requested
 * from Instagram: no script, no cookie, no slower page. Reels that cannot be embedded
 * open on Instagram instead.
 */
export function ReelCard({ reel }: { reel: Reel }) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure data-reel={reel.id} data-playing={playing} className="flex h-full flex-col">
      {/* Tall enough for Instagram's own player, which needs about 330px of width. */}
      <div className="relative mx-auto aspect-[9/14] w-full max-w-[420px] overflow-hidden bg-surface">
        {playing ? (
          <iframe
            src={`https://www.instagram.com/reel/${reel.id}/embed/`}
            title={`${reel.title}: film by ${reel.by}, playing from Instagram`}
            loading="lazy"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0 bg-white"
          />
        ) : (
          <>
            <Image
              src={reel.poster.src}
              alt={reel.poster.alt}
              fill
              sizes="(min-width: 640px) 420px, 100vw"
              placeholder="blur"
              blurDataURL={reel.poster.blur}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            {reel.embed ? (
              <button
                type="button"
                data-reel-play
                onClick={() => setPlaying(true)}
                aria-label={`Play the film: ${reel.title}. It loads from Instagram.`}
                className="group absolute inset-0 flex items-center justify-center"
              >
                <span className="inline-flex h-[72px] w-[72px] items-center justify-center rounded-full bg-sage text-ink-deep shadow-[0_10px_40px_-10px_rgb(0_0_0/0.6)] transition-transform duration-300 group-hover:scale-110">
                  <Play size={28} weight="fill" />
                </span>
              </button>
            ) : (
              <a
                href={reel.href}
                target="_blank"
                rel="noreferrer"
                data-reel-link
                aria-label={`Watch the film on Instagram: ${reel.title}`}
                className="group absolute inset-0 flex items-center justify-center"
              >
                <span className="inline-flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white text-ink-deep shadow-[0_10px_40px_-10px_rgb(0_0_0/0.6)] transition-transform duration-300 group-hover:scale-110">
                  <ArrowUpRight size={28} weight="bold" />
                </span>
              </a>
            )}
            <p className="pointer-events-none absolute inset-x-0 bottom-0 p-4 text-[13.5px] font-medium text-white">
              {reel.embed ? "Plays here, from Instagram" : "Opens on Instagram"}
            </p>
          </>
        )}
      </div>
      <figcaption className="mx-auto mt-4 w-full max-w-[420px]">
        <p className="display text-[1.4rem] leading-tight">{reel.title}</p>
        <p className="mt-1 text-[15px] text-ink-soft">{reel.place}</p>
        <a
          href={reel.href}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 text-[14px] font-semibold text-sage-ink underline-offset-4 hover:underline"
        >
          Film by {reel.by}
          <ArrowUpRight size={13} weight="bold" />
        </a>
      </figcaption>
    </figure>
  );
}
