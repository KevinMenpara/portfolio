import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { Section, Tag } from "@/components/Section";
import { Typewriter } from "@/components/Typewriter";
import {
  ArrowUpRightIcon,
  CodeIcon,
  FileIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/icons";
import { education, experience, profile, projects, skills } from "@/content/profile";

const btnPrimary =
  "inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition hover:opacity-90";
const btnGhost =
  "inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:border-fg/30 hover:bg-surface-2";
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function Home() {
  return (
    <>
      <Nav name={profile.name} />
      <main id="top">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:px-8">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="font-mono text-xs">Built with Next.js · Hosted on GitHub Pages</p>
        </div>
      </footer>
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto flex min-h-[88svh] max-w-5xl flex-col justify-center px-5 pb-16 pt-28 sm:px-8">
        <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
          <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          Open to new opportunities
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          Hi, I&apos;m {profile.name}.
        </h1>
        <p className="mt-3 font-mono text-xl text-accent sm:text-2xl">
          <Typewriter words={profile.roles} />
        </p>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{profile.tagline}</p>

        <div className="mt-9 flex flex-wrap gap-3">
          <a href="#projects" className={btnPrimary}>
            View my work
          </a>
          <a href={profile.resumeUrl} {...ext} className={btnGhost}>
            <FileIcon /> Résumé
          </a>
          <a href={profile.socials.github} {...ext} className={btnGhost} aria-label="GitHub">
            <GitHubIcon />
          </a>
          <a href={profile.socials.linkedin} {...ext} className={btnGhost} aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" index="01" title="About">
      <div className="grid gap-12 md:grid-cols-5">
        <Reveal className="space-y-4 text-lg leading-relaxed text-muted md:col-span-3">
          {profile.about.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <p className="flex items-center gap-2 pt-2 text-base">
            <MapPinIcon className="text-accent" /> {profile.location}
          </p>
        </Reveal>
        <Reveal className="space-y-5 md:col-span-2">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group}>
              <h3 className="mb-2 font-mono text-xs uppercase tracking-wider text-muted">{group}</h3>
              <div className="flex flex-wrap gap-1.5">
                {items.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" index="02" title="Experience">
      <ol className="relative space-y-6 border-l border-border pl-6 sm:pl-8">
        {experience.map((job) => (
          <li key={job.company + job.period} className="relative">
            <span
              className="absolute -left-[31px] top-2 size-3 rounded-full border-2 border-bg bg-accent ring-1 ring-border sm:-left-[39px]"
              aria-hidden="true"
            />
            <Reveal className="rounded-2xl border border-border bg-surface p-6 sm:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold">
                  {job.role} <span className="text-accent">@ {job.company}</span>
                </h3>
                <span className="font-mono text-xs text-muted">{job.period}</span>
              </div>
              <ul className="mt-4 space-y-2 text-muted">
                {job.highlights.map((h) => (
                  <li key={h.slice(0, 24)} className="flex gap-3 leading-relaxed">
                    <span className="mt-2.5 size-1 shrink-0 rounded-full bg-muted" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
              {job.stack && (
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {job.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              )}
            </Reveal>
          </li>
        ))}
      </ol>

      <h3 className="mb-5 mt-16 font-mono text-xs uppercase tracking-wider text-muted">Education</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {education.map((e) => (
          <Reveal key={e.degree} className="rounded-2xl border border-border bg-surface p-6">
            <p className="font-mono text-xs text-muted">{e.period}</p>
            <h4 className="mt-2 font-semibold">{e.degree}</h4>
            <p className="text-accent">{e.school}</p>
            {e.note && <p className="mt-2 text-sm text-muted">{e.note}</p>}
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects" index="03" title="Projects">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => {
          const href = p.live ?? p.source;
          return (
            <Reveal key={p.title} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5">
                <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-surface-2">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={`Screenshot of ${p.title}`}
                      fill
                      sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="hero-grid absolute inset-0 grid place-items-center">
                      <CodeIcon width={40} height={40} className="text-accent" />
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="flex items-start justify-between gap-2 font-semibold">
                    {href ? (
                      <a href={href} {...ext} className="after:absolute after:inset-0 hover:text-accent">
                        {p.title}
                      </a>
                    ) : (
                      p.title
                    )}
                    <ArrowUpRightIcon className="mt-0.5 shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                  {p.live && p.source && (
                    <a
                      href={p.source}
                      {...ext}
                      className="relative z-10 mt-4 inline-flex w-fit items-center gap-1.5 text-sm text-muted hover:text-fg"
                    >
                      <GitHubIcon width={14} height={14} /> Source
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-10 text-center">
        <a href={profile.socials.github} {...ext} className={btnGhost}>
          <GitHubIcon /> More on GitHub
        </a>
      </Reveal>
    </Section>
  );
}

function Contact() {
  const items = [
    { icon: MailIcon, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: PhoneIcon, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { icon: LinkedInIcon, label: "LinkedIn", value: "kevin-menpara", href: profile.socials.linkedin },
    { icon: GitHubIcon, label: "GitHub", value: "KevinMenpara", href: profile.socials.github },
  ];

  return (
    <Section id="contact" index="04" title="Contact">
      <Reveal className="rounded-3xl border border-border bg-surface p-8 sm:p-12">
        <div className="max-w-xl">
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">Let&apos;s build something together.</h3>
          <p className="mt-3 text-muted">
            Have a question, an opportunity or just want to say hi? My inbox is open.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className={btnPrimary}>
              <MailIcon /> Say hello
            </a>
            <a href={profile.contactFormUrl} {...ext} className={btnGhost}>
              Ask a question
            </a>
          </div>
        </div>

        <ul className="mt-10 grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
          {items.map(({ icon: Icon, label, value, href }) => (
            <li key={label}>
              <a
                href={href}
                {...(href.startsWith("http") ? ext : {})}
                className="flex items-center gap-3 rounded-xl p-2 -m-2 transition hover:bg-surface-2"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Icon />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-muted">{label}</span>
                  <span className="block truncate text-sm font-medium">{value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
