import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ada package-lock.json lain di folder induk (D:\MAGANG_AI_ENGINEER); kunci root ke folder ini.
  outputFileTracingRoot: path.join(__dirname),
  experimental: {
    // Registrasi mengunggah dokumen maks. 5 MB lewat server action (default Next: 1 MB).
    serverActions: { bodySizeLimit: "6mb" },
  },
};

export default nextConfig;
