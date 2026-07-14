import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a fully static site into `out/` so it can be served by any static
  // host (Vercel static, GitHub Pages, S3, …) without a Node server.
  output: "export",
  // Export every route as a folder with an index.html (e.g. /analyze/ ->
  // analyze/index.html). This avoids 404s on static hosts that don't rewrite
  // extensionless paths.
  trailingSlash: true,
  images: {
    // next/image optimization needs a server; disable it for static export.
    unoptimized: true,
  },
};

export default nextConfig;
