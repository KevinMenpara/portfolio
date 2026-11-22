"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Chapter, Change, Project } from "@/content/profile";
import { branch, shortHash } from "@/lib/branch";

const changeLabel: Record<Change["kind"], string> = {
  added: "Added",
  faster: "Faster",
  safer: "Safer",
  steadier: "Steadier",
  led: "Led",
};

type Props = { chapters: Chapter[]; projects: Project[] };

/**
 * Geometry (px): the main line sits at x = MAIN, branches run in a lane at
 * x = LANE. Text starts after the lane.
 */
const MAIN = 15;
const LANE = 47;

export function Journey({ chapters, projects }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<Record<string, boolean>>({});

  // Draw the main line in step with scrolling.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const drawn = Math.min(1, Math.max(0, (window.innerHeight * 0.65 - r.top) / r.height));
      el.style.setProperty("--drawn", drawn.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={wrap} className="relative">
      <div className="mainline absolute bottom-6 top-6 w-[2px]" style={{ left: MAIN - 1 }} aria-hidden="true" />

      <ol>
        {chapters.map((c, i) => {
          const isHead = i === chapters.length - 1;
          const isOpen = open[c.id] ?? false;
          const built = (c.projects ?? [])
            .map((slug) => projects.find((p) => p.slug === slug))
            .filter((p): p is Project => Boolean(p));

          return (
            <li key={c.id} id={c.id} className="relative pb-16 sm:pb-20">
              {/* Commit dot */}
              <span
                aria-hidden="true"
                className={`absolute top-[0.9rem] size-[18px] rounded-full border-[3px] border-ink sm:top-[1.35rem] ${
                  isHead ? "bg-ink ring-4 ring-ink/15" : "bg-paper"
                }`}
                style={{ left: MAIN - 9 }}
              />

              <div className="pl-12 sm:pl-16 lg:grid lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-x-12">
                <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="display text-5xl sm:text-7xl">{c.year}</span>
                  <span className="font-mono text-sm text-muted">{shortHash(c.id)}</span>
                  {isHead && (
                    <span className="rounded-md bg-ink px-2 py-0.5 font-mono text-xs font-semibold text-paper">HEAD</span>
                  )}
                </div>

                <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {c.title}
                  <span className="font-normal text-muted"> at {c.place}</span>
                </h3>
                <p className="mt-2 max-w-[56ch] text-lg text-ink/85">{c.summary}</p>

                {c.metric && (
                  <p className="mt-5 flex flex-wrap items-baseline gap-x-3 lg:hidden">
                    <span className="display text-4xl sm:text-5xl">{c.metric.value}</span>
                    <span className="text-muted">{c.metric.label}</span>
                  </p>
                )}

                <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${c.id}-details`}
                  onClick={() => setOpen((o) => ({ ...o, [c.id]: !isOpen }))}
                  className="inline-flex items-center gap-2 rounded-full border border-rule px-4 py-1.5 text-[15px] font-medium transition hover:border-ink/40"
                >
                  <span aria-hidden="true" className={`inline-block transition-transform ${isOpen ? "rotate-45" : ""}`}>
                    +
                  </span>
                  {isOpen ? "Hide the details" : "Read the details"}
                </button>
                {(c.caseStudies ?? []).map((slug, _, all) => (
                  <Link
                    key={slug}
                    href={`/work/${slug}/`}
                    className="inline-flex items-center rounded-full bg-ink px-4 py-1.5 text-[15px] font-medium text-paper transition hover:opacity-85"
                  >
                    {all.length === 1 ? "Read the case study" : `Case study: ${projects.find((p) => p.slug === slug)?.title ?? slug}`}
                  </Link>
                ))}
                </div>

                <div id={`${c.id}-details`} className="expand" data-open={isOpen}>
                  <div>
                    <div className="max-w-[60ch] pt-6" inert={!isOpen}>
                      <p className="text-lg leading-relaxed text-ink/85">{c.story}</p>
                      {c.changes.length > 0 && (
                        <dl className="mt-5 grid grid-cols-[5.5rem_minmax(0,1fr)] gap-x-3 gap-y-2">
                          {c.changes.map((ch) => (
                            <div key={ch.text} className="contents">
                              <dt className="font-mono text-sm leading-7 text-muted">{changeLabel[ch.kind]}</dt>
                              <dd>{ch.text}</dd>
                            </div>
                          ))}
                        </dl>
                      )}
                      <p className="mt-4 text-[15px] text-muted">{c.when}</p>
                    </div>
                  </div>
                </div>
                </div>

                {c.metric && (
                  <p className="hidden self-start border-l-2 border-ink pl-6 pt-1 lg:mt-4 lg:block">
                    <span className="display block text-7xl">{c.metric.value}</span>
                    <span className="mt-3 block text-muted">{c.metric.label}</span>
                  </p>
                )}
              </div>

              {/* Branches: each project forks off this commit and merges back. */}
              {built.map((p) => (
                <BranchBlock key={p.slug} project={p} />
              ))}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function BranchBlock({ project: p }: { project: Project }) {
  const c = branch[p.color];
  const curve = (down: boolean) => (
    <svg
      aria-hidden="true"
      width={LANE + 2}
      height="32"
      className="absolute left-0"
      style={down ? { top: 0 } : { bottom: 0 }}
      fill="none"
    >
      <path
        d={down ? `M${MAIN} 0 C ${MAIN} 20, ${LANE} 12, ${LANE} 32` : `M${LANE} 0 C ${LANE} 20, ${MAIN} 12, ${MAIN} 32`}
        stroke={c.stroke}
        strokeWidth="2"
      />
    </svg>
  );

  return (
    <div id={`project-${p.slug}`} className="relative mt-8 scroll-mt-28 py-10">
      {curve(true)}
      <span aria-hidden="true" className={`absolute bottom-8 top-8 w-[2px] ${c.bg}`} style={{ left: LANE - 1 }} />
      <span
        aria-hidden="true"
        className={`absolute top-[2.85rem] size-3.5 rounded-full border-[3px] bg-paper ${c.border}`}
        style={{ left: LANE - 7 }}
      />
      {curve(false)}

      <div className="pl-20 sm:pl-24">
        <p className={`font-mono text-sm ${c.text}`}>feature/{p.slug}</p>
        <h4 className="mt-1 text-xl font-semibold sm:text-2xl">{p.title}</h4>
        <p className="mt-1 max-w-[52ch] text-muted">{p.summary}</p>
        <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[15px] font-medium">
          <Link href={`/work/${p.slug}/`} className="underline decoration-rule underline-offset-4 hover:decoration-ink">
            Case study
          </Link>
          {p.live && (
            <a href={p.live} target="_blank" rel="noopener noreferrer" className="underline decoration-rule underline-offset-4 hover:decoration-ink">
              Live app
            </a>
          )}
          {p.source && (
            <a href={p.source} target="_blank" rel="noopener noreferrer" className="underline decoration-rule underline-offset-4 hover:decoration-ink">
              Source
            </a>
          )}
        </p>
      </div>
    </div>
  );
}
