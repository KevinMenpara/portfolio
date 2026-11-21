import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { GitHubIcon } from "@/components/icons";
import { journey, profile, projectBySlug, projects } from "@/content/profile";
import { branch } from "@/lib/branch";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = projectBySlug((await params).slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) notFound();

  const c = branch[p.color];
  const chapter = journey.find((ch) => ch.projects?.includes(p.slug) || ch.caseStudy === p.slug);
  const isWork = p.kind === "work";
  const i = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(i + 1) % projects.length];
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  const link = "underline decoration-rule underline-offset-4 hover:decoration-ink";

  return (
    <>
      <SiteHeader name={profile.name} onHome={false} />
      <main className="mx-auto max-w-6xl px-5 pb-24 pt-28 sm:px-8 sm:pt-36">
        <Link href="/#work" className={`text-muted ${link}`}>
          All projects
        </Link>

        {/* The case study runs down its own branch line. */}
        <div className="relative mt-10 pl-8 sm:pl-14">
          <span aria-hidden="true" className={`absolute bottom-2 left-[7px] top-2 w-[3px] rounded-full ${c.bg}`} />
          <span aria-hidden="true" className={`absolute left-0 top-1 size-[17px] rounded-full border-[3px] bg-paper ${c.border}`} />

          <p className={`font-mono text-sm ${c.text}`}>
            {isWork ? `main, at ${p.company}` : `feature/${p.slug}`}
            {chapter && (
              <span className="text-muted">
                {" "}
                {isWork ? "in" : "branched from main in"}{" "}
                <Link href={`/#${chapter.id}`} className={link}>
                  {chapter.year}
                </Link>
              </span>
            )}
          </p>
          <h1 className="display mt-4 text-[clamp(2.75rem,9vw,6.5rem)]">{p.title}</h1>
          <p className="mt-6 max-w-[46ch] text-xl leading-snug sm:text-2xl">{p.summary}</p>

          <dl className="mt-10 grid gap-6 sm:grid-cols-[10rem_minmax(0,1fr)]">
            <div>
              <dt className="text-muted">Year</dt>
              <dd className="font-semibold">{p.year}</dd>
            </div>
            <div>
              <dt className="text-muted">Built with</dt>
              <dd className="font-semibold">{p.stack.join(", ")}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            {p.live && (
              <a href={p.live} {...ext} className="rounded-full bg-ink px-6 py-3 font-semibold text-paper hover:opacity-85">
                Open the live app
              </a>
            )}
            {p.source && (
              <a href={p.source} {...ext} className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-6 py-3 font-semibold hover:border-ink">
                <GitHubIcon /> View the source
              </a>
            )}
          </div>

          {p.diagram && (
            <figure className="mt-14 rounded-2xl border border-rule bg-lift p-6 sm:p-8">
              <figcaption className="text-xl font-semibold tracking-tight">{p.diagram.title}</figcaption>
              <ol className="mt-6 grid gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                {p.diagram.steps.map((step, n) => (
                  <li key={step.name} className="relative flex gap-3">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-ink font-mono text-xs font-semibold text-paper">
                      {n + 1}
                    </span>
                    <span>
                      <span className="block font-semibold">
                        {step.name}
                      </span>
                      <span className="block text-[15px] text-muted">{step.detail}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </figure>
          )}

          {p.image && (
            <div className="mt-14 overflow-hidden rounded-2xl border border-rule bg-lift">
              <Image src={p.image} alt={`Screenshot of ${p.title}`} sizes="(min-width: 1152px) 1040px, 100vw" className="h-auto w-full" priority />
            </div>
          )}

          <div className="mt-16 grid max-w-3xl gap-12">
            <section>
              <h2 className="text-2xl font-semibold tracking-tight">The problem</h2>
              <p className="mt-3 text-lg leading-relaxed text-ink/85">{p.problem}</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold tracking-tight">What I built</h2>
              <ul className="mt-3 grid gap-3 text-lg leading-relaxed text-ink/85">
                {p.approach.map((a) => (
                  <li key={a} className="flex gap-3">
                    <span aria-hidden="true" className={`mt-[0.7em] size-2 shrink-0 rounded-full ${c.bg}`} />
                    {a}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold tracking-tight">The result</h2>
              <p className="mt-3 text-lg leading-relaxed text-ink/85">{p.outcome}</p>
            </section>
          </div>

          <p className={`mt-14 font-mono text-sm ${c.text}`}>{isWork ? `Shipped at ${p.company}` : "Merged into main"}</p>
          <span aria-hidden="true" className={`absolute -bottom-1 left-0 size-[17px] rounded-full border-[3px] border-ink bg-ink`} />
        </div>

        <Link href={`/work/${next.slug}/`} className="group mt-24 block border-t-2 border-ink pt-6">
          <span className="text-muted">Next project</span>
          <span className={`display mt-2 block text-[clamp(2rem,6vw,4rem)] ${branch[next.color].text} group-hover:underline`}>
            {next.title}
          </span>
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
