"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { List, X } from "@phosphor-icons/react";

type Item = { label: string; href: string };

/**
 * The white header (questionnaire, Q15). The logo is passed in from the server so the
 * logo artwork is not shipped to the browser as script.
 */
export function HeaderShell({
  logo,
  items,
  cta,
  extra,
}: {
  logo: ReactNode;
  items: Item[];
  cta: Item;
  /** Extra links shown only in the small-screen menu. */
  extra: Item[];
}) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // The menu closes when one of its links is chosen (see onClick below). The header
  // lives in the root layout, so it is never left behind in a hidden page.

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
    <header
      data-site-header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_0_var(--color-line)]" : ""
      }`}
    >
      <div className="mx-auto flex h-[76px] w-full max-w-[1320px] items-center justify-between gap-6 px-5 md:h-[88px] md:px-10">
        <Link href="/" aria-label="Sagework, home" onClick={() => setOpen(false)} className="shrink-0 py-3 pr-3">
          {logo}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 min-[1180px]:flex">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              aria-current={active(it.href) ? "page" : undefined}
              className={`relative py-2 text-[15px] font-medium transition-colors hover:text-sage-ink ${
                active(it.href) ? "text-sage-ink" : "text-ink"
              }`}
            >
              {it.label}
              <span
                className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left bg-sage transition-transform duration-300 ${
                  active(it.href) ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink min-[1180px]:hidden"
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      <div
        id="site-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[76px] z-50 overflow-y-auto bg-white md:top-[88px] min-[1180px]:hidden"
      >
        <nav aria-label="Menu" className="mx-auto flex max-w-[1320px] flex-col px-5 pb-12 pt-4 md:px-10">
          {[...items, ...extra, cta].map((it) => (
            <Link
              key={it.href}
              href={it.href}
              onClick={() => setOpen(false)}
              aria-current={active(it.href) ? "page" : undefined}
              className={`display border-b border-line py-4 text-[1.9rem] ${active(it.href) ? "text-sage-text" : "text-ink"}`}
            >
              {it.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
