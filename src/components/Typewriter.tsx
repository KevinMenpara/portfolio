"use client";

import { useEffect, useState } from "react";

type Props = { words: string[]; typeMs?: number; deleteMs?: number; holdMs?: number };

/** Types each word, pauses, deletes it, then moves to the next. */
export function Typewriter({ words, typeMs = 80, deleteMs = 40, holdMs = 1600 }: Props) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0] ?? "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (words.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const word = words[index];
    let delay = deleting ? deleteMs : typeMs;
    if (!deleting && text === word) delay = holdMs;

    const id = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(id);
  }, [text, deleting, index, words, typeMs, deleteMs, holdMs]);

  return (
    <span>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true">
        {text}
        <span className="caret ml-0.5 inline-block w-[2px] translate-y-[2px] bg-accent">&nbsp;</span>
      </span>
    </span>
  );
}
