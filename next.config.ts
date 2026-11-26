import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // static site: deploys to Vercel, GitHub Pages or any host
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
