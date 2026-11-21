import { Reveal } from "./Reveal";

type Props = {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
};

/** A page section with a numbered heading. */
export function Section({ id, index, title, children }: Props) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
      <Reveal>
        <h2 className="mb-10 flex items-center gap-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          <span className="font-mono text-sm font-normal text-accent">{index}</span>
          {title}
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
        </h2>
      </Reveal>
      {children}
    </section>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-surface-2 px-2.5 py-0.5 font-mono text-xs text-muted">
      {children}
    </span>
  );
}
