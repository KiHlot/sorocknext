import { FC } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '~/swiper/swiper.min.css';
import '@/styles/global.scss';
import Layout from '@/layouts/Layout/Layout.component';
import StoreProvider from '@/app/StoreProvider';
import { RootLayoutIF } from '@/app/types';

const inter = Inter({ subsets: ['cyrillic'] });

export const metadata: Metadata = {
    title: 'Сайт sorock.ru',
    description: 'Сделано без любви',
    icons: {
        icon: {
            url: '/favicon.svg',
            type: 'shortcut icon',
        },
    },
};

const RootLayout: FC<RootLayoutIF> = async ({ children }) => {
    return (
        <html lang="ru">
            <body className={inter.className}>
                <StoreProvider>
                    <Layout>{children}</Layout>
                </StoreProvider>
            </body>
        </html>
    );
};

export default RootLayout;
