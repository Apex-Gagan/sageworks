"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, List, X } from "@phosphor-icons/react";
import { TriadMark } from "@/components/shared/Triad";
import { contactEmail, contactHref } from "@/content/home";
import { navItems } from "@/content/nav";

function Wordmark() {
  return (
    <span className="flex items-center gap-3">
      <TriadMark className="h-7 w-7 text-accent" />
      <span className="font-display text-[15px] font-medium uppercase tracking-[0.3em]">Sagework</span>
    </span>
  );
}

/**
 * Sample 3 navigation. A fixed side rail on wide screens, like the spine of a
 * folio; a compact top bar with a full-screen menu below 1280px.
 */
export function SidebarThree() {
  const pathname = usePathname() ?? "/3";
  const [open, setOpen] = useState(false);
  const items = navItems("/3");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => !href.includes("#") && pathname === href;

  return (
    <>
      {/* Wide screens: side rail */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] flex-col justify-between border-r border-line bg-bg px-8 py-9 xl:flex">
        <div>
          <Link href="/3" aria-label="Sagework home">
            <Wordmark />
          </Link>
          <p className="mt-6 max-w-[22ch] text-[13px] leading-relaxed text-muted">
            Evidence-led advisory and design practice
          </p>
          <nav aria-label="Primary" className="mt-12">
            <ul className="space-y-1">
              {items.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`group flex items-center gap-3 py-2 text-[15px] transition-colors duration-300 ${active ? "text-accent" : "text-fg/80 hover:text-fg"}`}
                    >
                      <span
                        className={`h-px transition-all duration-500 ease-soft ${active ? "w-6 bg-accent" : "w-0 bg-fg group-hover:w-4"}`}
                      />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <div>
          <a
            href={contactHref}
            className="group flex items-center justify-between rounded-[8px] bg-accent px-4 py-3.5 text-[14px] font-medium text-on-accent transition-colors duration-300 hover:bg-fg active:translate-y-px"
          >
            Start a Conversation
            <ArrowRight size={15} weight="bold" className="transition-transform duration-500 group-hover:translate-x-1" />
          </a>
          <a
            href={`mailto:${contactEmail}`}
            className="mt-4 block text-[13px] text-muted transition-colors hover:text-fg"
          >
            {contactEmail}
          </a>
        </div>
      </aside>

      {/* Narrower screens: top bar */}
      <header className="sticky top-0 z-40 flex h-[64px] items-center justify-between border-b border-line bg-bg/92 px-5 backdrop-blur-md md:px-10 xl:hidden">
        <Link href="/3" aria-label="Sagework home" onClick={() => setOpen(false)}>
          <Wordmark />
        </Link>
        <div className="flex items-center gap-2.5">
          <a
            href={contactHref}
            className="hidden whitespace-nowrap rounded-[8px] bg-accent px-4 py-2.5 text-[13.5px] font-medium text-on-accent transition-colors hover:bg-fg sm:inline-block"
          >
            Start a Conversation
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-[8px] border border-line"
            aria-expanded={open}
            aria-controls="nav-three-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <List size={18} />}
          </button>
        </div>
      </header>

      {open ? (
        <div id="nav-three-menu" className="fixed inset-x-0 bottom-0 top-[64px] z-30 overflow-y-auto bg-bg px-5 pb-10 pt-6 md:px-10 xl:hidden">
          <ul>
            {items.map((item) => (
              <li key={item.label} className="border-b border-line">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`display block py-4 text-[1.9rem] leading-tight ${isActive(item.href) ? "text-accent" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={contactHref}
            className="mt-8 inline-block rounded-[8px] bg-accent px-5 py-3.5 text-[14px] font-medium text-on-accent"
          >
            Start a Conversation
          </a>
        </div>
      ) : null}
    </>
  );
}
