import type { Chapter, Project } from "@/content/profile";
import { branch } from "@/lib/branch";

type Props = { chapters: Chapter[]; projects: Project[] };

/**
 * The whole journey in one picture: chapters as commits on a horizontal main
 * line, projects as coloured branches. Everything links into the page below.
 */
export function JourneyOverview({ chapters, projects }: Props) {
  const W = 1000;
  const MAIN_Y = 96;
  const lanes = [40, 152]; // above and below the main line
  const x0 = 40;
  const gap = (W - 2 * x0) / (chapters.length - 1);
  const xs = chapters.map((_, i) => x0 + i * gap);

  return (
    <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <svg viewBox={`0 0 ${W} 190`} className="block h-auto w-full min-w-[640px]" role="img" aria-labelledby="overview-title">
        <title id="overview-title">{`Journey overview: ${chapters.map((c) => `${c.year} ${c.place}`).join(", ")}`}</title>
        <line x1={x0} x2={W - x0} y1={MAIN_Y} y2={MAIN_Y} stroke="var(--ink)" strokeWidth="2" />

        {chapters.map((c, i) => {
          const built = (c.projects ?? [])
            .map((slug) => projects.find((p) => p.slug === slug))
            .filter((p): p is Project => Boolean(p));
          const xa = xs[i];
          const xb = xs[i + 1] ?? xa + gap;
          return built.map((p, j) => {
            const y = lanes[j % 2];
            const up = y < MAIN_Y;
            const s = branch[p.color].stroke;
            const fx = xa + 14;
            const mx = xb - 14;
            const d = `M${fx} ${MAIN_Y} C ${fx + 30} ${MAIN_Y}, ${fx + 20} ${y}, ${fx + 50} ${y} L ${mx - 50} ${y} C ${mx - 20} ${y}, ${mx - 30} ${MAIN_Y}, ${mx} ${MAIN_Y}`;
            return (
              <a key={p.slug} href={`#project-${p.slug}`} className="group">
                <path d={d} fill="none" stroke={s} strokeWidth="2.5" />
                <circle cx={(fx + mx) / 2} cy={y} r="6" fill="var(--paper)" stroke={s} strokeWidth="3" />
                <text
                  x={(fx + mx) / 2}
                  y={up ? y - 14 : y + 24}
                  textAnchor="middle"
                  fill={s}
                  className="font-mono text-[13px] font-medium group-hover:underline"
                >
                  {p.title.length > 16 ? p.slug : p.title}
                </text>
              </a>
            );
          });
        })}

        {chapters.map((c, i) => {
          const isHead = i === chapters.length - 1;
          return (
            <a key={c.id} href={`#${c.id}`} className="group">
              <circle cx={xs[i]} cy={MAIN_Y} r="9" fill={isHead ? "var(--ink)" : "var(--paper)"} stroke="var(--ink)" strokeWidth="3" />
              <text x={xs[i]} y={MAIN_Y + 30} textAnchor="middle" fill="var(--ink)" className="text-[17px] font-bold group-hover:underline">
                {c.year}
              </text>
            </a>
          );
        })}
      </svg>
    </div>
  );
}
