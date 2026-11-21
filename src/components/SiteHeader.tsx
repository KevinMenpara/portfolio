"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { CloseIcon, MenuIcon } from "./icons";

type Props = { name: string; resumeUrl: string; onHome?: boolean };

export function SiteHeader({ name, resumeUrl, onHome = true }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On case-study pages the section links point back to the home page.
  const base = onHome ? "" : "/";
  const links = [
    { href: `${base}#journey`, label: "Journey" },
    { href: `${base}#work`, label: "Work" },
    { href: `${base}#contact`, label: "Contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-rule bg-paper/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5 sm:px-8">
        <Link href="/" className="mr-auto text-[15px] font-bold [font-stretch:115%]" onClick={() => setOpen(false)}>
          {name}
        </Link>

        <ul className="hidden items-center gap-7 text-[15px] text-muted md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition hover:text-ink">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-cobalt px-4 py-1.5 text-sm font-semibold text-cobalt transition hover:bg-cobalt hover:text-on-cobalt sm:inline-block"
          >
            Résumé
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full border border-rule text-muted md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="mx-auto grid max-w-6xl gap-1 px-5 pb-5 text-lg md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOpen(false)} className="block py-2">
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="block py-2 text-cobalt">
              Résumé
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
