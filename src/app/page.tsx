import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Journey } from "@/components/Journey";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { journey, notes, profile, projects, services, skills } from "@/content/profile";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const shell = "mx-auto max-w-6xl px-5 sm:px-8";

export default function Home() {
  return (
    <>
      <SiteHeader name={profile.name} resumeUrl={profile.resumeUrl} />
      <main>
        <Hero />
        <section id="journey" aria-labelledby="journey-h" className={`${shell} pb-16`}>
          <h2 id="journey-h" className="sr-only">
            The journey so far
          </h2>
          <Journey chapters={journey} projects={projects} />
        </section>
        <Work />
        <WhereNext />
        <section id="contact" aria-labelledby="contact-h" className={`${shell} py-20 sm:py-28`}>
          <h2 id="contact-h" className="display mb-12 text-[clamp(2.75rem,7vw,5rem)]">
            Get in touch
          </h2>
          <ContactForm email={profile.email} endpoint={profile.contactEndpoint} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function Hero() {
  return (
    <section className={`${shell} pb-16 pt-32 sm:pt-40`}>
      <p className="text-lg text-muted">
        {profile.role} in {profile.location.split(",")[0]}, India
      </p>
      <h1 className="display mt-4 text-[clamp(3.6rem,15.5vw,11.5rem)]">
        Kevin
        <br />
        Menpara
      </h1>

      <div className="mt-10 grid items-end gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <p className="max-w-[34ch] text-xl leading-snug sm:text-2xl">{profile.promise}</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:justify-end">
          <a
            href="#journey"
            className="rounded-full bg-cobalt px-6 py-3 font-semibold text-on-cobalt transition hover:opacity-90"
          >
            Follow my journey
          </a>
          <a href={profile.resumeUrl} {...ext} className="font-semibold underline decoration-rule underline-offset-4 hover:decoration-ink">
            Skip to résumé
          </a>
        </div>
      </div>

      {/* Chapter strip: a map of the story below. */}
      <nav aria-label="Journey chapters" className="mt-16 overflow-x-auto pb-2">
        <ol className="relative flex min-w-max gap-0 before:absolute before:inset-x-0 before:top-[7px] before:h-px before:bg-rule">
          {journey.map((c, i) => (
            <li key={c.id} className="relative pr-10 sm:pr-14">
              <a href={`#${c.id}`} className="group block pt-6">
                <span
                  className={`absolute left-0 top-0 size-[15px] rounded-full border-2 ${
                    i === journey.length - 1 ? "border-cobalt bg-cobalt" : "border-rule bg-paper group-hover:border-cobalt"
                  }`}
                  aria-hidden="true"
                />
                <span className="block font-bold [font-stretch:115%]">{c.year}</span>
                <span className="block text-[15px] text-muted group-hover:text-ink">{c.place.split(",")[0]}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
}

function Work() {
  const sorted = [...projects].sort((a, b) => b.year.localeCompare(a.year));
  return (
    <section id="work" aria-labelledby="work-h" className="border-t border-rule bg-surface">
      <div className={`${shell} py-20 sm:py-28`}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="work-h" className="display text-[clamp(2.75rem,7vw,5rem)]">
            Work
          </h2>
          <p className="max-w-[40ch] text-muted">Everything I&apos;ve built, newest first. Each one has a short case study.</p>
        </div>

        <ol className="mt-12 border-t border-ink">
          {sorted.map((p) => (
            <li key={p.slug} className="border-b border-rule">
              <Link
                href={`/work/${p.slug}/`}
                className="group grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-4 gap-y-1 py-6 sm:grid-cols-[4.5rem_minmax(0,15rem)_minmax(0,1fr)] sm:gap-x-8"
              >
                <span className="text-muted">{p.year}</span>
                <span className="text-xl font-bold [font-stretch:110%] group-hover:text-cobalt">{p.title}</span>
                <span className="col-start-2 text-muted sm:col-start-3 sm:row-start-1">
                  {p.summary}
                  <span className="mt-1 block text-[15px] text-muted/80">{p.stack.join(", ")}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>

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
  const routes = [
    {
      title: "Hiring?",
      body: (
        <>
          <p className="text-muted">My résumé has the full picture. LinkedIn has the rest.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={profile.resumeUrl} {...ext} className="rounded-full bg-cobalt px-5 py-2.5 font-semibold text-on-cobalt hover:opacity-90">
              Open résumé
            </a>
            <a href={profile.socials.linkedin} {...ext} className="inline-flex items-center gap-2 rounded-full border border-rule px-5 py-2.5 font-semibold hover:border-ink/30">
              <LinkedInIcon /> LinkedIn
            </a>
          </div>
        </>
      ),
    },
    {
      title: "Building something?",
      body: (
        <>
          <ul className="grid gap-4">
            {services.map((s) => (
              <li key={s.title}>
                <p className="font-semibold">{s.title}</p>
                <p className="text-muted">{s.body}</p>
              </li>
            ))}
          </ul>
          <a href="#contact" className="mt-5 inline-block font-semibold text-cobalt underline underline-offset-4">
            Tell me about your project
          </a>
        </>
      ),
    },
    {
      title: "Try my apps",
      body: (
        <ul className="grid gap-3">
          {apps.map((p) => (
            <li key={p.slug}>
              <a href={p.live} {...ext} className="group block">
                <span className="font-semibold group-hover:text-cobalt">{p.title}</span>
                <span className="block text-[15px] text-muted">{new URL(p.live!).host}</span>
              </a>
            </li>
          ))}
          <li>
            <a href={profile.socials.github} {...ext} className="inline-flex items-center gap-2 font-semibold text-cobalt">
              <GitHubIcon /> More on GitHub
            </a>
          </li>
        </ul>
      ),
    },
    ...(notes.length
      ? [
          {
            title: "Read my notes",
            body: (
              <ul className="grid gap-3">
                {notes.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} {...ext} className="group block">
                      <span className="font-semibold group-hover:text-cobalt">{n.title}</span>
                      <span className="block text-[15px] text-muted">{n.date}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ),
          },
        ]
      : []),
  ];

  return (
    <section aria-labelledby="next-h" className={`${shell} py-20 sm:py-28`}>
      <h2 id="next-h" className="display text-[clamp(2.75rem,7vw,5rem)]">
        Where to next
      </h2>
      <div className={`mt-12 grid gap-12 md:grid-cols-2 ${routes.length > 3 ? "xl:grid-cols-4" : "lg:grid-cols-3"} lg:gap-10`}>
        {routes.map((r) => (
          <div key={r.title} className="border-t-2 border-ink pt-5">
            <h3 className="mb-4 text-2xl font-bold [font-stretch:110%]">{r.title}</h3>
            {r.body}
          </div>
        ))}
      </div>
    </section>
  );
}
