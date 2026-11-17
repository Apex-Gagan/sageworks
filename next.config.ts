import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Client photographs live in /public/images and are resized on demand.
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    localPatterns: [{ pathname: "/images/**" }, { pathname: "/brand/**" }],
  },
  async redirects() {
    return [
      { source: "/dr-gutsy", destination: "/simply-sage#dr-gutsy", permanent: false },
      { source: "/work", destination: "/work-with-sagework", permanent: false },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
