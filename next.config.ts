import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["res.cloudinary.com", "avatars.githubusercontent.com"],
  },
  reactStrictMode: false,
  /* config options here */
};

export default nextConfig;
