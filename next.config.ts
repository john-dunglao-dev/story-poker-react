import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
    authInterrupts: true,
  },
};

export default nextConfig;
