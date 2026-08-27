import { ReactElement } from 'react';
import type { Metadata } from 'next';
import { PageProps } from '@/types/common';
import { SeoData } from '@/types/post';
import { HomePageDataIF } from '@/api/page/types';
import { fetchApi } from '@/helpers/fetchApi';
import { getMetadata } from '@/helpers/getMetadata/getMetadata';
import CommonLayout, {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import styles from '@/components/sections/HomePagePromoSection/HomePagePromoSection.module.scss';
import LastNewsPromoSection from '@/components/sections/LastNewsPromoSection/LastNewsPromoSection.component';
import LoginWidget from '@/components/widgets/LoginWidget/LoginWidget.component';

export async function generateMetadata(): Promise<Metadata> {
    const data = await fetchApi<SeoData>(`/page/metadata/home`);

    return getMetadata(data);
}

export default async function HomePage({
    params,
}: PageProps): Promise<ReactElement> {
    const homePageInfo = await fetchApi<HomePageDataIF>('/page/home-page-data');

    return (
        <CommonLayout>
            <Content>
                <LastNewsPromoSection className={styles.latestNews} data={{}} />
            </Content>
            <Sidebar>
                <LoginWidget />
            </Sidebar>
        </CommonLayout>
    );
}
