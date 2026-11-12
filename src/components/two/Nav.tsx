"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { TriadMark } from "@/components/shared/Triad";
import { navItems } from "@/content/nav";
import { contactHref } from "@/content/home";

/** Floating glass bar. Sits over the photography and stays out of its way. */
export function NavTwo() {
  const [open, setOpen] = useState(false);
  const items = navItems("/2");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-3 z-40 px-3 md:top-4 md:px-6">
        <div className="mx-auto flex h-[60px] max-w-[1480px] items-center justify-between gap-4 rounded-full border border-fg/12 bg-bg/65 pl-5 pr-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
          <Link
            href="/2"
            className="flex items-center gap-2.5"
            aria-label="Sagework home"
            onClick={() => setOpen(false)}
          >
            <TriadMark className="h-6 w-6 text-accent" />
            <span className="display text-[1.3rem] leading-none">Sagework</span>
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1 text-[13.5px]">
              {items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="whitespace-nowrap rounded-full px-3.5 py-2 text-fg/80 transition-colors duration-300 hover:bg-fg/10 hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={contactHref}
              className="hidden whitespace-nowrap rounded-full bg-accent px-5 py-2.5 text-[13.5px] font-medium text-on-accent transition-colors duration-300 hover:bg-fg active:scale-[0.98] sm:inline-block"
            >
              Start a Conversation
            </a>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-fg/15 xl:hidden"
              aria-expanded={open}
              aria-controls="nav-two-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} /> : <List size={18} />}
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          id="nav-two-menu"
          className="fixed inset-0 z-30 overflow-y-auto bg-bg/97 px-6 pb-10 pt-28 backdrop-blur-xl xl:hidden"
        >
          <ul>
            {items.map((item) => (
              <li key={item.label} className="border-b border-line">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="display block py-4 text-[2rem] leading-tight"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={contactHref}
            className="mt-8 inline-block rounded-full bg-accent px-6 py-3.5 text-[14px] font-medium text-on-accent"
          >
            Start a Conversation
          </a>
        </div>
      ) : null}
    </>
  );
}
