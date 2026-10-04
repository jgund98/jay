import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The site launched on the Epic subdomain before Jay's domain was connected.
  // Both still serve this project, so send the old host to the real one —
  // two copies of every page split whatever ranking the site earns.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "jay.epicdevsolutions.com" }],
        destination: "https://www.gamechangerautomotive.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
