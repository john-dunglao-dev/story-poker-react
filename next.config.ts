import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
    authInterrupts: true,
  },
  allowedDevOrigins: ['www.storypoker.local'],
};

export default nextConfig;
