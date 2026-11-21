import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "@/components/PrintButton";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { education, journey, profile, projects, skills } from "@/content/profile";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${profile.name}: experience, projects, education and skills.`,
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Resume() {
  // The PDF button appears only once public/resume.pdf exists.
  const hasPdf = fs.existsSync(path.join(process.cwd(), "public", profile.resumePdf));
  const work = journey.filter((c) => c.caseStudy).reverse();
  const personal = projects.filter((p) => p.kind === "personal");
  const caseStudy = (slug?: string) => projects.find((p) => p.slug === slug);

  return (
    <>
      <div className="print:hidden">
        <SiteHeader name={profile.name} onHome={false} />
      </div>
      <main className="mx-auto max-w-4xl px-5 pb-24 pt-28 sm:px-8 sm:pt-36 print:max-w-none print:p-0">
        <div className="flex flex-wrap items-center gap-3 print:hidden">
          {hasPdf && (
            <a
              href={`${basePath}/${profile.resumePdf}`}
              download
              data-goatcounter-click="resume-pdf"
              className="rounded-full bg-ink px-5 py-2.5 font-semibold text-paper hover:opacity-85"
            >
              Download PDF
            </a>
          )}
          <PrintButton />
          <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="px-2 text-muted underline decoration-rule underline-offset-4 hover:text-ink">
            Google Drive version
          </a>
        </div>

        <header className="mt-12 border-b-2 border-ink pb-8 print:mt-0 print:pb-4">
          <h1 className="display text-[clamp(2.75rem,8vw,5rem)] print:text-[34pt]">{profile.name}</h1>
          <p className="mt-4 text-xl print:mt-1 print:text-[12pt]">{profile.role}</p>
          <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-muted print:mt-1">
            <span>{profile.location}</span>
            <a href={`mailto:${profile.email}`} className="hover:text-ink">
              {profile.email}
            </a>
            {profile.showPhone && <span>{profile.phone}</span>}
            <a href={profile.socials.linkedin} className="hover:text-ink">
              LinkedIn
            </a>
            <a href={profile.socials.github} className="hover:text-ink">
              GitHub
            </a>
          </p>
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed print:mt-3 print:text-[11pt]">{profile.promise}</p>
        </header>

        <Block title="Experience">
          {work.map((c) => {
            const p = caseStudy(c.caseStudy);
            return (
              <Entry key={c.id} title={`${c.title}, ${c.place}`} when={c.when}>
                <ul className="mt-2 grid list-disc gap-1 pl-5 marker:text-muted print:mt-1 print:gap-0">
                  {(p?.approach ?? c.changes.map((ch) => ch.text)).map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                {p && (
                  <Link href={`/work/${p.slug}/`} className="mt-2 inline-block text-[15px] text-muted underline underline-offset-4 print:hidden">
                    Case study: {p.title}
                  </Link>
                )}
              </Entry>
            );
          })}
        </Block>

        <Block title="Projects">
          {personal.map((p) => (
            <Entry key={p.slug} title={p.title} when={p.year}>
              <p className="mt-1 print:mt-0">
                {p.summary} <span className="text-muted">({p.stack.join(", ")})</span>
              </p>
            </Entry>
          ))}
        </Block>

        <Block title="Education">
          {education.map((e) => (
            <Entry key={e.title} title={`${e.title}, ${e.place}`} when={e.when}>
              <p className="mt-1">{e.detail}</p>
            </Entry>
          ))}
        </Block>

        <Block title="Skills">
          <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group}>
                <dt className="font-semibold">{group}</dt>
                <dd className="text-muted">{items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Block>
      </main>
      <div className="print:hidden">
        <SiteFooter />
      </div>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12 print:mt-5">
      <h2 className="text-2xl font-semibold tracking-tight print:text-[14pt]">{title}</h2>
      <div className="mt-5 grid gap-6 print:mt-2 print:gap-2.5">{children}</div>
    </section>
  );
}

function Entry({ title, when, children }: { title: string; when: string; children: React.ReactNode }) {
  return (
    <div className="break-inside-avoid">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6">
        <h3 className="text-lg font-semibold print:text-[11pt]">{title}</h3>
        <span className="text-[15px] text-muted">{when}</span>
      </div>
      {children}
    </div>
  );
}
