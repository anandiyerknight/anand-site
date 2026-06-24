import type { NextConfig } from "next";

const projectRoot = process.cwd();

const config: NextConfig = {
  reactStrictMode: true,
  experimental: { optimizePackageImports: ["framer-motion"] },
  outputFileTracingRoot: projectRoot,
  turbopack: { root: projectRoot },
  transpilePackages: [
    "three",
    "@react-three/fiber",
    "@react-three/drei",
    "@react-three/postprocessing",
  ],
};

export default config;
