import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { FC } from 'react';
import '@/styles/global.scss';
// import MainLayoutComponent from "@/layouts/MainLayout/MainLayout.component"
// import { PopularTagsIF } from "@/components/Blocks/PopularTags/PopularTags.types"
// import { TopMenuIF } from "@/components/Header/TopMenu/TopMenuVerticalSlider/TopMenuVerticalSlider.types"
import MainLayout from '@/layouts/MainLayout/MainLayout.component';
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
    // const headerData = await getApi<TopMenuIF>("get-header-data")
    // const popularTags = await getApi<PopularTagsIF>("get-popular-tags")

    return (
        <html lang="en">
            <body className={inter.className}>
                <MainLayout
                // data={{
                //   topMenuVerticalSliderData: headerData?.topMenuVerticalSliderData,
                //   popularTags: popularTags?.popularTags,
                // }}
                >
                    {children}
                </MainLayout>
            </body>
        </html>
    );
};

export default RootLayout;
