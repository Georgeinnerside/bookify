import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["via.placeholder.com", "books.google.com"], // ✅ Added domains
  },
};

export default nextConfig;
