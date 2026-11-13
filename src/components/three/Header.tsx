"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { TriadMark } from "@/components/shared/Triad";
import { contactHref } from "@/content/home";
import { navItems } from "@/content/nav";

/**
 * Sample 3 header. White bar, small capitals for the links, the current page
 * sits in a green block, and the call to action is an outlined pill.
 */
export function HeaderThree() {
  const pathname = usePathname() ?? "/3";
  const [open, setOpen] = useState(false);
  const items = navItems("/3");
  const isActive = (href: string) => !href.includes("#") && pathname === href;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-6 px-5 md:px-8">
          <Link href="/3" aria-label="Sagework home" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
            <TriadMark className="h-7 w-7 text-accent-ink" />
            <span className="text-[1.3rem] font-bold tracking-[-0.02em]">Sagework</span>
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {items.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`whitespace-nowrap rounded-[8px] px-3 py-2.5 text-[12px] font-semibold uppercase tracking-[0.09em] transition-colors duration-300 ${active ? "bg-accent text-on-accent" : "text-fg/80 hover:bg-tint hover:text-fg"}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={contactHref}
              className="hidden whitespace-nowrap rounded-full border-[1.5px] border-fg px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.09em] transition-colors duration-300 hover:bg-fg hover:text-bg active:scale-[0.98] sm:inline-block"
            >
              Start a Conversation
            </a>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-line xl:hidden"
              aria-expanded={open}
              aria-controls="nav-three-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={19} /> : <List size={19} />}
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div id="nav-three-menu" className="fixed inset-x-0 bottom-0 top-[72px] z-30 overflow-y-auto bg-bg px-5 pb-10 pt-4 md:px-8 xl:hidden">
          <ul>
            {items.map((item) => (
              <li key={item.label} className="border-b border-line">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-[1.6rem] font-semibold tracking-[-0.02em]"
                >
                  {isActive(item.href) ? <span className="hl">{item.label}</span> : item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={contactHref}
            className="mt-8 inline-block rounded-full bg-fg px-6 py-3.5 text-[15px] font-semibold text-bg"
          >
            Start a Conversation
          </a>
        </div>
      ) : null}
    </>
  );
}

/** Persistent, low-pressure call to action on the right edge of wide screens. */
export function SideTab() {
  return (
    <a
      href={contactHref}
      className="fixed right-0 top-1/2 z-30 hidden -translate-y-1/2 rounded-l-[10px] bg-accent px-2.5 py-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-on-accent transition-[padding,background-color] duration-300 [writing-mode:vertical-rl] hover:bg-fg hover:pr-4 hover:text-bg lg:block print:hidden"
    >
      <span className="inline-block rotate-180">Start a Conversation</span>
    </a>
  );
}
