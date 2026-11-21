"use client";

import { MoonIcon, SunIcon } from "./icons";

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="grid size-9 place-items-center rounded-full border border-border text-muted transition hover:text-fg hover:border-fg/30"
    >
      {/* Both icons render; CSS picks one so server HTML matches any theme. */}
      <SunIcon className="hidden dark:block" />
      <MoonIcon className="block dark:hidden" />
    </button>
  );
}
