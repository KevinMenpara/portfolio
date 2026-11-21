import type { MetadataRoute } from "next";
import { projects, siteUrl } from "@/content/profile";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, priority: 1 },
    ...projects.map((p) => ({ url: `${siteUrl}/work/${p.slug}/`, priority: 0.7 })),
  ];
}
