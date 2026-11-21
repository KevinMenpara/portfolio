"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Chapter, Change, Project } from "@/content/profile";

const changeLabel: Record<Change["kind"], { word: string; color: string }> = {
  added: { word: "Added", color: "text-cobalt" },
  faster: { word: "Faster", color: "text-faster" },
  safer: { word: "Safer", color: "text-safer" },
  led: { word: "Led", color: "text-led" },
  steadier: { word: "Steadier", color: "text-faster" },
};

type Props = { chapters: Chapter[]; projects: Project[] };

export function Journey({ chapters, projects }: Props) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const current = chapters[active];

  return (
    <div className="grid gap-x-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      {/* Pinned year: the page's one loud element. */}
      <div className="sticky top-16 z-10 -mx-5 border-b border-rule bg-paper/90 px-5 py-3 backdrop-blur-md sm:-mx-8 sm:px-8 lg:top-28 lg:mx-0 lg:self-start lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
        <p aria-hidden="true" className="display overflow-hidden text-[clamp(3rem,13vw,4.5rem)] text-cobalt lg:text-[clamp(5.5rem,10.5vw,9.5rem)]">
          <span key={current.year} className="year-swap inline-block">
            {current.year}
          </span>
        </p>
        <ol className="mt-8 hidden gap-1 lg:grid" aria-label="Chapters">
          {chapters.map((c, i) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                aria-current={i === active ? "step" : undefined}
                className={`flex gap-4 py-1 text-[15px] transition ${i === active ? "text-ink" : "text-muted hover:text-ink"}`}
              >
                <span className="w-12 font-semibold">{c.year}</span>
                <span>{c.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>

      <div>
        {chapters.map((c, i) => {
          const built = (c.projects ?? [])
            .map((slug) => projects.find((p) => p.slug === slug))
            .filter((p): p is Project => Boolean(p));
          return (
            <article
              key={c.id}
              id={c.id}
              data-index={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="border-t border-rule py-14 first:border-t-0 first:pt-10 lg:py-20 lg:first:pt-4"
            >
              <p className="text-[15px] text-muted">
                {c.when}, {c.place}
              </p>
              <h3 className="mt-2 text-3xl font-bold tracking-tight [font-stretch:110%] sm:text-4xl">{c.title}</h3>
              <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-ink/85">{c.story}</p>

              {c.metric && (
                <p className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="display text-5xl text-cobalt sm:text-6xl">{c.metric.value}</span>
                  <span className="max-w-[24ch] text-muted">{c.metric.label}</span>
                </p>
              )}

              {c.changes.length > 0 && (
                <ul className="mt-8 grid gap-3">
                  {c.changes.map((ch) => (
                    <li key={ch.text} className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-3">
                      <span className={`font-semibold ${changeLabel[ch.kind].color}`}>{changeLabel[ch.kind].word}</span>
                      <span>{ch.text}</span>
                    </li>
                  ))}
                </ul>
              )}

              {built.length > 0 && (
                <div className="mt-10">
                  <p className="text-[15px] text-muted">Built during this chapter</p>
                  <ul className="mt-3 grid gap-px overflow-hidden rounded-xl border border-rule bg-rule">
                    {built.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/work/${p.slug}/`}
                          className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 bg-surface px-5 py-4 transition hover:bg-paper"
                        >
                          <span className="font-semibold group-hover:text-cobalt">{p.title}</span>
                          <span className="text-[15px] text-muted">Read the case study</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
