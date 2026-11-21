import type { NextConfig } from "next";

// GitHub Pages serves project sites from /<repo>. The deploy workflow passes
// the right prefix (empty when a custom domain is configured).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
