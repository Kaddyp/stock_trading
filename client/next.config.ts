import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Force Webpack 5 usage (disable Turbopack)
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  distDir: 'out',
};

export default nextConfig;
