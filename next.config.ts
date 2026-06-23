import { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: { unoptimized: true },
    reactStrictMode: true,
    turbopack: {
        rules: {
            '*.svg?url': { loaders: ['file-loader'], as: '*.js' },
            '*.svg': { loaders: ['@svgr/webpack'], as: '*.js' },
        },
    },
};

export default nextConfig;
