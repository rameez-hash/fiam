import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.fiam.cc",
      },
      {
        protocol: "http",
        hostname: "www.fiam.cc",
      },
    ],
  },
};

export default nextConfig;
