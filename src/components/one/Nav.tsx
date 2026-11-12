"use client";

import Link from "next/link";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { TriadMark } from "@/components/shared/Triad";
import { navItems } from "@/content/nav";
import { contactHref } from "@/content/home";

export function NavOne() {
  const [open, setOpen] = useState(false);
  const items = navItems("/1");

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/92 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between gap-6 px-5 md:px-10">
        <Link
          href="/1"
          className="flex items-center gap-2.5"
          aria-label="Sagework home"
          onClick={() => setOpen(false)}
        >
          <TriadMark className="h-6 w-6 text-accent" />
          <span className="display text-[1.6rem] leading-none">Sagework</span>
        </Link>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-7 text-[13px] text-fg/80">
            {items.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="link-draw whitespace-nowrap pb-0.5 hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={contactHref}
            className="hidden whitespace-nowrap border border-fg px-4 py-2.5 text-[13px] transition-colors duration-300 hover:bg-fg hover:text-bg active:translate-y-px sm:inline-block"
          >
            Start a Conversation
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center border border-line xl:hidden"
            aria-expanded={open}
            aria-controls="nav-one-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <List size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="nav-one-menu" className="border-t border-line bg-bg xl:hidden">
          <ul className="mx-auto max-w-[1440px] px-5 py-4 md:px-10">
            {items.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="display block py-2.5 text-[1.75rem] leading-tight"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 sm:hidden">
              <a href={contactHref} className="inline-block border border-fg px-4 py-2.5 text-[13px]">
                Start a Conversation
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
