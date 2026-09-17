import { ReactElement } from 'react';
import type { Metadata } from 'next';
import { fetchMetadata } from '@/api/metadata/endpoints';
import { fetchHomePageData } from '@/api/page/endpoints';
import HomePageTPL from '@/templates/HomePageTPL/HomePageTPL.component';

export async function generateMetadata(): Promise<Metadata> {
    return fetchMetadata({ type: 'page' });
}

export default async function HomePage(): Promise<ReactElement> {
    const data = await fetchHomePageData();

    return data ? <HomePageTPL data={data} /> : <div />;
}
