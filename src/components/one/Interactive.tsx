"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Minus, Plus } from "@phosphor-icons/react";

export type MediaItem = {
  name: string;
  line?: string;
  body: string;
  extra?: string;
  src: string;
  blur: string;
  alt: string;
};

/**
 * Services list. One row is open at a time and the photograph beside it
 * changes with the selection, so the list reads as six real offers.
 */
export function ServicesOne({ items }: { items: MediaItem[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28">
          <div className="relative aspect-[4/5] overflow-hidden bg-surface-2">
            {items.map((item, i) => (
              <Image
                key={item.name}
                src={item.src}
                alt={i === active ? item.alt : ""}
                fill
                sizes="(min-width: 1024px) 38vw, 0px"
                placeholder="blur"
                blurDataURL={item.blur}
                className={`object-cover transition-opacity duration-700 ease-soft ${i === active ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
          <p className="mt-3 text-[12.5px] text-muted">{items[active].alt}</p>
        </div>
      </div>

      <ul className="lg:col-span-7">
        {items.map((item, i) => {
          const open = i === active;
          return (
            <li key={item.name} className="border-t border-line last:border-b">
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span
                  className={`display text-[clamp(1.75rem,3vw,2.6rem)] leading-[1.1] transition-colors duration-300 ${open ? "text-fg" : "text-fg/55"}`}
                >
                  {item.name}
                </span>
                <span className="grid h-9 w-9 shrink-0 place-items-center border border-line text-fg">
                  {open ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-500 ease-soft ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <div className="grid gap-6 pb-8 md:grid-cols-2">
                    <p className="text-[15.5px] leading-relaxed text-fg/85">{item.body}</p>
                    {item.extra ? (
                      <div>
                        <p className="label text-muted">Possible outputs</p>
                        <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{item.extra}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * Five senses as five strips of photography. The selected strip opens and its
 * explanation appears beneath, so each sense is tied to a real environment.
 */
export function SensesOne({ items }: { items: MediaItem[] }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      {/* Desktop: expanding strips */}
      <div className="hidden md:block">
        <div className="flex h-[min(62vh,600px)] gap-3">
          {items.map((item, i) => {
            const open = i === active;
            return (
              <button
                key={item.name}
                type="button"
                aria-pressed={open}
                aria-label={`${item.name}: ${item.line ?? ""}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="relative min-w-0 overflow-hidden bg-surface-2 transition-[flex-grow] duration-700 ease-soft"
                style={{ flexGrow: open ? 5 : 1, flexBasis: 0 }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  placeholder="blur"
                  blurDataURL={item.blur}
                  className={`object-cover transition-[filter,transform] duration-700 ease-soft ${open ? "scale-100 saturate-100" : "scale-105 saturate-[0.35]"}`}
                />
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex gap-3">
          {items.map((item, i) => (
            <button
              key={item.name}
              type="button"
              tabIndex={-1}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className="min-w-0 text-left transition-[flex-grow] duration-700 ease-soft"
              style={{ flexGrow: i === active ? 5 : 1, flexBasis: 0 }}
            >
              <span
                className={`display block truncate text-[1.9rem] leading-tight transition-colors duration-300 ${i === active ? "text-fg" : "text-fg/45"}`}
              >
                {item.name}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-6 grid min-h-[7.5rem] gap-6 border-t border-line pt-6 md:grid-cols-12">
          <p className="display text-[1.5rem] italic leading-snug md:col-span-5">
            {items[active].line}
          </p>
          <p className="text-[15.5px] leading-relaxed text-fg/85 md:col-span-6 md:col-start-7">
            {items[active].body}
          </p>
        </div>
      </div>

      {/* Mobile: a plain stack, nothing to tap */}
      <ul className="space-y-10 md:hidden">
        {items.map((item) => (
          <li key={item.name}>
            <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="100vw"
                placeholder="blur"
                blurDataURL={item.blur}
                className="object-cover"
              />
            </div>
            <h3 className="display mt-4 text-[2rem] leading-tight">{item.name}</h3>
            <p className="display mt-1 text-[1.2rem] italic text-muted">{item.line}</p>
            <p className="mt-3 text-[15.5px] leading-relaxed text-fg/85">{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Chapter index for the founder page. Highlights the chapter in view. */
export function ChapterNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="Chapters">
      <ul className="space-y-2.5 text-[13.5px]">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className={`flex items-center gap-3 transition-colors duration-300 ${active === item.id ? "text-fg" : "text-muted hover:text-fg"}`}
            >
              <span
                className={`h-px transition-all duration-500 ease-soft ${active === item.id ? "w-8 bg-accent" : "w-3 bg-line"}`}
              />
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
