import { NextConfig } from 'next';

const hostname = process.env.NEXT_PUBLIC_WP_HOST || 'st.sorockwp.local';
const protocol = process.env.NEXT_PUBLIC_DOMAIN_URL?.startsWith('https')
    ? 'https'
    : 'http';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol,
                hostname,
                port: '',
                pathname: '/wp-content/uploads/**',
            },
        ],
    },
    reactStrictMode: true,
    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js',
            },
        },
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            use: ['@svgr/webpack'],
        });
        return config;
    },
};

export default nextConfig;
