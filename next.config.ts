import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: { unoptimized: true },
    webpack: config => {
        // Находим правило для работы с SVG
        const fileLoaderRule = config.module.rules.find(
            (rule: { test: { test: (arg0: string) => any } }) =>
                rule.test && rule.test.test('.svg'),
        );

        // Если нашли правило, удаляем его
        if (fileLoaderRule) {
            config.module.rules.splice(
                config.module.rules.indexOf(fileLoaderRule),
                1,
            );
        }

        // Добавляем новое правило для работы со SVG
        config.module.rules.push({
            test: /\.svg$/,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        babel: false,
                        typescript: true,
                        exportType: 'default',
                        ref: true,
                        svgo: false,
                        titleProp: true,
                    },
                },
            ],
        });

        config.module.rules.push({
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        });

        return config;
    },
    experimental: {
        turbo: {
            rules: {
                '*.svg': {
                    loaders: ['@svgr/webpack'],
                    as: '*.js',
                },
            },
        },
    },
};

export default nextConfig;
