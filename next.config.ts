import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: { unoptimized: true },
    reactStrictMode: true,
    turbopack: {
        rules: {
            // Импорты с ?url — возвращаем URL строку
            '*.svg?url': {
                loaders: ['file-loader'], // можно заменить на встроенный asset
                as: '*.js',
            },
            // Обычные SVG — превращаем в React-компоненты через @svgr/webpack
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js',
            },
        },
    },
};

export default nextConfig;