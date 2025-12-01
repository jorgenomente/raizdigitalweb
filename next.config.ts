import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Force tracing to stay inside this workspace (fixes multi-lockfile root warnings).
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
