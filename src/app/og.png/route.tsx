import { ImageResponse } from "next/og";
import { journey, profile } from "@/content/profile";

export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

/** Social preview: name, role, and the journey line with its commits. */
export function GET() {
  const n = journey.length;
  const tagline = `${profile.role}: secure systems, infrastructure and LLM tooling`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f3f3ef", color: "#1a1c21", padding: "72px 80px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 112, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{profile.name}</div>
          <div style={{ display: "flex", fontSize: 40, marginTop: 24, color: "#62666f" }}>{tagline}</div>
        </div>
        <div style={{ display: "flex", position: "relative", height: 110 }}>
          <div style={{ display: "flex", position: "absolute", left: 20, right: 20, top: 18, height: 4, background: "#1a1c21" }} />
          {journey.map((c, i) => (
            <div key={c.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "absolute", top: 0, left: `${(i / (n - 1)) * 1000 - 20}px`, width: 80 }}>
              <div style={{ display: "flex", width: 40, height: 40, borderRadius: 20, border: "6px solid #1a1c21", background: i === n - 1 ? "#1a1c21" : "#f3f3ef" }} />
              <div style={{ display: "flex", fontSize: 26, fontWeight: 700, marginTop: 12 }}>{c.year}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
