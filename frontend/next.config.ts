import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',   // <--- Tells Next.js to produce static HTML
  images: {
    unoptimized: true // <--- Required for static export (unless you use Cloudinary)
  },
  trailingSlash: true, // Recommended for static export
};

export default nextConfig;
