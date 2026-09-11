/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // optimize package imports for fast bundling
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
