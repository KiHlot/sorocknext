import { FC } from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
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

const RootLayout: FC<RootLayoutIF> = async ({ children }) => (
    <html lang="ru">
        <body className={`${inter.className} defaultTheme`}>
            <StoreProvider>
                <Layout>{children}</Layout>
            </StoreProvider>
        </body>
    </html>
);

export default RootLayout;
