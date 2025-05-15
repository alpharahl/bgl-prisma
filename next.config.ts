import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  staticPageGenerationTimeout: 100,
  images: {
    domains: [
      "cdn.discordapp.com"
    ]
  }
};

export default nextConfig;
