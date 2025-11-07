import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mundialmegastore.com.br",
        port: "",
        pathname: "/**",
      },
      // Production assets domain
      {
        protocol: "https",
        hostname: "assents01.comsuporte.com.br",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
