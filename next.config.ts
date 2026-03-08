import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "realty.trivastu.com" },
      { protocol: "https", hostname: "plot.trivastu.com" },
      { protocol: "https", hostname: "trivastu.com" },
      { protocol: "https", hostname: "www.trivastu.com" },
      { protocol: "https", hostname: "api.trivastu.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "**.amazonaws.com" },
    ],
  },
};

export default nextConfig;
