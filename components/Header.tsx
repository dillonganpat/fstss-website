"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/content/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/assets/logo-small.png" alt="" width={40} height={40} className="h-10 w-10 rounded-lg" />
          <span className="leading-tight">
            <strong className="block font-display text-[17px] font-bold">{site.name}</strong>
            <span className="block text-[11px] tracking-[0.08em] text-brand">UWI ST. AUGUSTINE</span>
          </span>
        </Link>

        <button
          type="button"
          className="rounded-lg border border-line p-2 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>

        <nav
          id="primary-nav"
          aria-label="Primary"
          className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-full flex-col gap-1 border-b border-line bg-bg p-4 md:static md:flex md:flex-row md:border-0 md:bg-transparent md:p-0`}
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-brand-dark text-white"
                  : "text-dim hover:bg-surface-2 hover:text-text"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
