import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ada package-lock.json lain di folder induk (D:\MAGANG_AI_ENGINEER); kunci root ke folder ini.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
