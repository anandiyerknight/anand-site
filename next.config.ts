import type { NextConfig } from "next";

const projectRoot = process.cwd();

const config: NextConfig = {
  reactStrictMode: true,
  experimental: { optimizePackageImports: ["framer-motion"] },
  outputFileTracingRoot: projectRoot,
  turbopack: { root: projectRoot },
};

export default config;
