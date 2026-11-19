"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { List, X } from "@phosphor-icons/react";

type Item = { label: string; href: string };

/**
 * Design 2 header. On a wide screen: the email address, the logo in the centre and the
 * contact button on one line, with the pages on a ruled line beneath. The top line
 * tightens once the page is scrolled. On smaller screens the pages open as a numbered
 * list over the whole screen.
 */
export function HeaderTwoShell({
  logo,
  items,
  cta,
  extra,
  home,
  email,
}: {
  logo: ReactNode;
  items: Item[];
  cta: Item;
  extra: Item[];
  home: string;
  email: string;
}) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", key);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", key);
    };
  }, [open]);

  const active = (href: string) => path === href || path.startsWith(href + "/");

  return (
    <header data-site-header data-scrolled={scrolled} className="sticky top-0 z-50 bg-white">
      <div
        className={`mx-auto grid w-full max-w-[1400px] grid-cols-[1fr_auto] items-center gap-4 px-5 transition-[height] duration-300 md:px-10 xl:px-14 min-[1240px]:grid-cols-[1fr_auto_1fr] ${
          scrolled ? "h-[64px]" : "h-[64px] min-[1240px]:h-[88px]"
        }`}
      >
        <a
          href={`mailto:${email}`}
          className="hidden justify-self-start text-[14.5px] font-semibold text-sage-ink underline-offset-4 hover:underline min-[1240px]:block"
        >
          {email}
        </a>
        <Link href={home} aria-label="Sagework, home" onClick={() => setOpen(false)} className="justify-self-start py-3 pr-3 min-[1240px]:justify-self-center min-[1240px]:px-3">
          {logo}
        </Link>
        <div className="flex items-center gap-3 justify-self-end">
          <Link
            href={cta.href}
            className="hidden rounded-full bg-sage px-5 py-2.5 text-[15px] font-semibold text-ink-deep transition-colors hover:bg-sage-deep sm:inline-flex"
          >
            {cta.label}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 items-center gap-2.5 rounded-full border border-line px-4 text-[15px] font-semibold text-ink min-[1240px]:hidden"
          >
            {open ? <X size={18} /> : <List size={18} />}
            <span aria-hidden="true">{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      <nav aria-label="Main" className="hidden border-y border-line min-[1240px]:block">
        <ul className="mx-auto flex max-w-[1400px] items-center justify-center gap-1.5 px-14 py-2">
          {items.map((it) => (
            <li key={it.href}>
              <Link
                href={it.href}
                aria-current={active(it.href) ? "page" : undefined}
                className={`block rounded-full px-4 py-2 text-[15px] font-medium transition-colors duration-300 ${
                  active(it.href) ? "bg-mint text-ink-deep" : "text-ink hover:bg-paper hover:text-sage-ink"
                }`}
              >
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={`h-px bg-line min-[1240px]:hidden ${scrolled ? "opacity-100" : "opacity-0"}`} />

      <div id="site-menu" hidden={!open} className="fixed inset-x-0 bottom-0 top-[64px] z-50 overflow-y-auto bg-white min-[1240px]:hidden">
        <nav aria-label="Menu" className="mx-auto max-w-[1400px] px-5 pb-16 pt-2 md:px-10">
          <ol className="grid md:grid-cols-2 md:gap-x-12">
            {[...items, ...extra, cta].map((it, n) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  onClick={() => setOpen(false)}
                  aria-current={active(it.href) ? "page" : undefined}
                  className={`flex items-baseline gap-5 border-b border-line py-4 ${active(it.href) ? "text-sage-text" : "text-ink"}`}
                >
                  <span className="w-7 text-[12.5px] font-semibold tracking-[0.14em] text-sage-ink">{String(n + 1).padStart(2, "0")}</span>
                  <span className="display text-[1.75rem]">{it.label}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </header>
  );
}
