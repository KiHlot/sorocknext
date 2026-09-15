import { ReactElement } from 'react';
import { Inter } from 'next/font/google';
import '@/styles/global.scss';
import Layout from '@/layouts/Layout/Layout.component';
import StoreProvider from '@/app/StoreProvider';
import { LayoutIF } from '@/app/types';

const inter = Inter({
    subsets: ['cyrillic'],
    variable: '--defaultFont',
});

export default async function RootLayout({
    children,
}: LayoutIF): Promise<ReactElement> {
    return (
        <html lang="ru">
            <body
                className={`${inter.variable} ${inter.className} defaultTheme`}
            >
                <StoreProvider>
                    <Layout>{children}</Layout>
                </StoreProvider>
            </body>
        </html>
    );
}
