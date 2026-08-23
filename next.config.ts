import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/sofas/l-shaped", destination: "/sofas/l-shaped-sofas", permanent: true },
      { source: "/sofas/3-seater", destination: "/sofas/3-seater-sofas", permanent: true },
      { source: "/sofas/2-seater", destination: "/sofas/2-seater-sofas", permanent: true },
      { source: "/sofas/recliner", destination: "/sofas/recliner-sofas", permanent: true },
      { source: "/sofas/sectional", destination: "/sofas/sectional-sofas", permanent: true },
      { source: "/sofas/custom", destination: "/sofas/custom-sofas", permanent: true },
    ];
  },
};

export default nextConfig;
