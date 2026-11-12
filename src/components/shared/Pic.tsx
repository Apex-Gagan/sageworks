import Image from "next/image";
import manifest from "@/data/images.json";
import { captions, type ImageKey } from "@/content/captions";

type Entry = { src: string; w: number; h: number; blur: string };
const data = manifest as Record<string, Entry>;

export function imageData(k: ImageKey): Entry & { alt: string } {
  return { ...data[k], alt: captions[k] };
}

type PicProps = {
  k: ImageKey;
  /** CSS aspect-ratio for the frame, e.g. "4 / 5". Defaults to the photo's own ratio. */
  ratio?: string;
  /** Classes for the frame (the clipped wrapper). */
  className?: string;
  /** Classes for the <img> itself, e.g. hover zoom. */
  imgClassName?: string;
  sizes?: string;
  /** Preload for the largest above-the-fold image only. */
  preload?: boolean;
  /** object-position, e.g. "50% 30%" */
  pos?: string;
  alt?: string;
  /** When true the frame fills its parent (parent must be positioned). */
  cover?: boolean;
};

/**
 * One consistent way to place a client photograph: clipped frame, blur-up
 * placeholder, object-cover. The frame uses the theme's media radius.
 */
export function Pic({
  k,
  ratio,
  className = "",
  imgClassName = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  preload = false,
  pos,
  alt,
  cover = false,
}: PicProps) {
  const d = data[k];
  return (
    <div
      className={`relative overflow-hidden rounded-media bg-surface ${cover ? "h-full w-full" : ""} ${className}`}
      style={cover ? undefined : { aspectRatio: ratio ?? `${d.w} / ${d.h}` }}
    >
      <Image
        src={d.src}
        alt={alt ?? captions[k]}
        fill
        sizes={sizes}
        preload={preload}
        placeholder="blur"
        blurDataURL={d.blur}
        className={`object-cover ${imgClassName}`}
        style={pos ? { objectPosition: pos } : undefined}
      />
    </div>
  );
}
