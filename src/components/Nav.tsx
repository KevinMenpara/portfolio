"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { CloseIcon, MenuIcon } from "./icons";

const links = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function Nav({ name }: { name: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Highlight the section that occupies the middle of the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const { id } of links) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled || open ? "border-b border-border bg-bg/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="font-mono text-sm font-semibold tracking-tight" aria-label={`${name} — back to top`}>
          <span className="text-accent">~/</span>
          {initials.toLowerCase()}
        </a>

        <div className="flex items-center gap-2">
          <ul className="hidden items-center gap-1 sm:flex">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={active === l.id ? "true" : undefined}
                  className={`rounded-full px-3 py-1.5 text-sm transition ${
                    active === l.id ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full border border-border text-muted sm:hidden"
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
        <ul id="mobile-menu" className="mx-auto max-w-5xl px-5 pb-4 sm:hidden">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-muted hover:bg-surface-2 hover:text-fg"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
