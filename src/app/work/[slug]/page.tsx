import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { GitHubIcon } from "@/components/icons";
import { journey, profile, projectBySlug, projects } from "@/content/profile";

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

  const chapter = journey.find((c) => c.projects?.includes(p.slug));
  const i = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(i + 1) % projects.length];
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

  return (
    <>
      <SiteHeader name={profile.name} resumeUrl={profile.resumeUrl} onHome={false} />
      <main className="mx-auto max-w-6xl px-5 pb-24 pt-28 sm:px-8 sm:pt-36">
        <Link href="/#work" className="text-muted hover:text-ink">
          All work
        </Link>

        <h1 className="display mt-6 text-[clamp(2.75rem,9vw,6.5rem)]">{p.title}</h1>
        <p className="mt-6 max-w-[48ch] text-xl leading-snug sm:text-2xl">{p.summary}</p>

        <dl className="mt-10 grid gap-6 border-t border-rule pt-6 sm:grid-cols-3">
          <div>
            <dt className="text-muted">Year</dt>
            <dd className="font-semibold">{p.year}</dd>
          </div>
          <div>
            <dt className="text-muted">Built with</dt>
            <dd className="font-semibold">{p.stack.join(", ")}</dd>
          </div>
          {chapter && (
            <div>
              <dt className="text-muted">Part of the journey</dt>
              <dd>
                <Link href={`/#${chapter.id}`} className="font-semibold text-cobalt underline underline-offset-4">
                  The {chapter.year} chapter
                </Link>
              </dd>
            </div>
          )}
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          {p.live && (
            <a href={p.live} {...ext} className="rounded-full bg-cobalt px-6 py-3 font-semibold text-on-cobalt hover:opacity-90">
              Open the live app
            </a>
          )}
          {p.source && (
            <a href={p.source} {...ext} className="inline-flex items-center gap-2 rounded-full border border-rule px-6 py-3 font-semibold hover:border-ink/30">
              <GitHubIcon /> View the source
            </a>
          )}
        </div>

        {p.image && (
          <div className="mt-14 overflow-hidden rounded-2xl border border-rule bg-surface">
            <Image src={p.image} alt={`Screenshot of ${p.title}`} sizes="(min-width: 1152px) 1088px, 100vw" className="h-auto w-full" priority />
          </div>
        )}

        <div className="mt-16 grid max-w-3xl gap-12">
          <section>
            <h2 className="text-2xl font-bold [font-stretch:110%]">The problem</h2>
            <p className="mt-3 text-lg leading-relaxed text-ink/85">{p.problem}</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold [font-stretch:110%]">What I built</h2>
            <ul className="mt-3 grid list-disc gap-2 pl-5 text-lg leading-relaxed text-ink/85 marker:text-cobalt">
              {p.approach.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold [font-stretch:110%]">The result</h2>
            <p className="mt-3 text-lg leading-relaxed text-ink/85">{p.outcome}</p>
          </section>
        </div>

        <Link href={`/work/${next.slug}/`} className="group mt-24 block border-t-2 border-ink pt-6">
          <span className="text-muted">Next project</span>
          <span className="display mt-2 block text-[clamp(2rem,6vw,4rem)] group-hover:text-cobalt">{next.title}</span>
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
