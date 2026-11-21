import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Journey } from "@/components/Journey";
import { JourneyOverview } from "@/components/JourneyOverview";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { journey, notes, profile, projects, services, skills } from "@/content/profile";
import { branch } from "@/lib/branch";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const shell = "mx-auto max-w-6xl px-5 sm:px-8";
const pillDark = "rounded-full bg-ink px-6 py-3 font-semibold text-paper transition hover:opacity-85";
const pillLine = "rounded-full border border-ink/25 px-6 py-3 font-semibold transition hover:border-ink";

export default function Home() {
  return (
    <>
      <SiteHeader name={profile.name} resumeUrl={profile.resumeUrl} />
      <main>
        <Hero />

        <section id="journey" aria-labelledby="journey-h" className={`${shell} pb-8 pt-20 sm:pt-28`}>
          <SectionHead id="journey-h" title="The journey" note="Each chapter is a commit. Projects branch off where I built them." />
          <Journey chapters={journey} projects={projects} />
        </section>

        <Projects />
        <WhereNext />

        <section id="contact" aria-labelledby="contact-h" className={`${shell} py-20 sm:py-28`}>
          <SectionHead id="contact-h" title="Get in touch" note="Tell me what it's about and I'll reply within a couple of days." />
          <ContactForm email={profile.email} endpoint={profile.contactEndpoint} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function SectionHead({ id, title, note }: { id: string; title: string; note: string }) {
  return (
    <div className="mb-14 flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
      <h2 id={id} className="display text-[clamp(2.75rem,7vw,5.25rem)]">
        {title}
      </h2>
      <p className="max-w-[38ch] text-muted">{note}</p>
    </div>
  );
}

function Hero() {
  return (
    <section className={`${shell} pt-32 sm:pt-40`}>
      <h1 className="display text-[clamp(3.4rem,11.5vw,9.5rem)]">{profile.name}</h1>
      <div className="mt-8 grid items-end gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <p className="max-w-[36ch] text-xl leading-snug sm:text-2xl">
          {profile.role} in {profile.location.split(",")[0]}. {profile.promise}
        </p>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <a href="#journey" className={pillDark}>
            Follow the journey
          </a>
          <a href={profile.resumeUrl} {...ext} className={pillLine}>
            Skip to résumé
          </a>
        </div>
      </div>

      <div className="mt-16 border-y border-rule py-8">
        <JourneyOverview chapters={journey} projects={projects} />
      </div>
    </section>
  );
}

function Projects() {
  const sorted = [...projects].sort((a, b) => b.year.localeCompare(a.year));
  return (
    <section id="work" aria-labelledby="work-h" className="border-t border-rule bg-lift">
      <div className={`${shell} py-20 sm:py-28`}>
        <SectionHead id="work-h" title="Projects" note="Every project from the journey, newest first. Each has a short case study." />
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule sm:grid-cols-2">
          {sorted.map((p) => {
            const c = branch[p.color];
            return (
              <li key={p.slug} className="bg-lift">
                <Link href={`/work/${p.slug}/`} className="group flex h-full gap-5 p-6 transition hover:bg-paper sm:p-8">
                  <span aria-hidden="true" className={`mt-2 h-auto w-[3px] shrink-0 rounded-full ${c.bg}`} />
                  <span className="min-w-0">
                    <span className={`block font-mono text-sm ${c.text}`}>
                      feature/{p.slug} <span className="text-muted">({p.year})</span>
                    </span>
                    <span className="mt-1 block text-2xl font-semibold tracking-tight group-hover:underline">{p.title}</span>
                    <span className="mt-2 block text-muted">{p.summary}</span>
                    <span className="mt-3 block text-[15px] text-muted/80">{p.stack.join(", ")}</span>
                  </span>
                </Link>
              </li>
            );
          })}
          {sorted.length % 2 === 1 && (
            <li className="hidden bg-lift sm:block">
              <a href={profile.socials.github} {...ext} className="flex h-full flex-col justify-end p-8 text-muted transition hover:bg-paper hover:text-ink">
                <span className="text-2xl font-semibold text-ink">More on GitHub</span>
                <span className="mt-2">Experiments, coursework and smaller tools.</span>
              </a>
            </li>
          )}
        </ul>

        <dl className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group}>
              <dt className="font-semibold">{group}</dt>
              <dd className="mt-1 text-muted">{items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function WhereNext() {
  const apps = projects.filter((p) => p.live);
  const rows = [
    {
      q: "Hiring?",
      a: "The résumé has the full picture, LinkedIn has references and the rest.",
      actions: (
        <>
          <a href={profile.resumeUrl} {...ext} className={pillDark}>
            Open résumé
          </a>
          <a href={profile.socials.linkedin} {...ext} className={pillLine}>
            LinkedIn
          </a>
        </>
      ),
    },
    {
      q: "Need something built?",
      a: services.map((s) => s.title).join(", ") + ".",
      actions: (
        <a href="#contact" className={pillDark}>
          Tell me about it
        </a>
      ),
    },
    {
      q: "Want to try my apps?",
      a: "Three of my projects are live. Have a click around.",
      actions: (
        <>
          {apps.map((p) => (
            <a key={p.slug} href={p.live} {...ext} className={`rounded-full border-2 px-5 py-2.5 font-semibold transition hover:opacity-80 ${branch[p.color].border} ${branch[p.color].text}`}>
              {p.title.length > 16 ? p.title.split(" ").map((w) => w[0]).join("") : p.title}
            </a>
          ))}
        </>
      ),
    },
    ...(notes.length
      ? [
          {
            q: "Like to read?",
            a: `${notes.length} note${notes.length === 1 ? "" : "s"} on what I'm building and learning.`,
            actions: (
              <>
                {notes.slice(0, 3).map((n) => (
                  <a key={n.href} href={n.href} {...ext} className={pillLine}>
                    {n.title}
                  </a>
                ))}
              </>
            ),
          },
        ]
      : []),
  ];

  return (
    <section aria-labelledby="next-h" className={`${shell} py-20 sm:py-28`}>
      <SectionHead id="next-h" title="Where to next" note="Pick the line that sounds like you." />
      <ul className="border-t-2 border-ink">
        {rows.map((r) => (
          <li key={r.q} className="grid gap-x-10 gap-y-4 border-b border-rule py-9 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)_minmax(0,4fr)] lg:items-center">
            <h3 className="display text-4xl sm:text-5xl">{r.q}</h3>
            <p className="max-w-[44ch] text-lg text-muted">{r.a}</p>
            <div className="flex flex-wrap gap-3 lg:justify-end">{r.actions}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
