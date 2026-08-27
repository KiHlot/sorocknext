import { ReactElement } from 'react';
import type { Metadata } from 'next';
import { PageProps } from '@/types/common';
import { SeoData } from '@/types/post';
import { HomePageDataIF } from '@/api/page/types';
import { fetchApi } from '@/helpers/fetchApi';
import { setSeo } from '@/helpers/setSeo';
import CommonLayout, {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import HomePagePromoSection from '@/components/sections/HomePagePromoSection/HomePagePromoSection.component';
import LoginWidget from '@/components/widgets/LoginWidget/LoginWidget.component';

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;

    const data = await fetchApi<SeoData>(`/news/metadata/${slug}`);

    return await setSeo(data);
}

export default async function HomePage({
    params,
}: PageProps): Promise<ReactElement> {
    const homePageInfo = await fetchApi<HomePageDataIF>('/page/home-page-data');

    return (
        <CommonLayout>
            <Content>
                {homePageInfo && <HomePagePromoSection data={homePageInfo} />}
            </Content>
            <Sidebar>
                <LoginWidget />
            </Sidebar>
        </CommonLayout>
    );
}
