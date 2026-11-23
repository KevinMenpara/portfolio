import type { BranchColor } from "@/content/profile";

/** Text, background and border classes for each branch colour. */
export const branch: Record<BranchColor, { text: string; bg: string; border: string; stroke: string }> = {
  main: { text: "text-ink", bg: "bg-ink", border: "border-ink", stroke: "var(--ink)" },
  blue: { text: "text-blue", bg: "bg-blue", border: "border-blue", stroke: "var(--blue)" },
  green: { text: "text-green", bg: "bg-green", border: "border-green", stroke: "var(--green)" },
  amber: { text: "text-amber", bg: "bg-amber", border: "border-amber", stroke: "var(--amber)" },
  violet: { text: "text-violet", bg: "bg-violet", border: "border-violet", stroke: "var(--violet)" },
  rose: { text: "text-rose", bg: "bg-rose", border: "border-rose", stroke: "var(--rose)" },
};

/** A stable 7-character "commit hash" for a chapter, derived from its id. */
export function shortHash(input: string): string {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}
