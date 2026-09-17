import { ReactElement } from 'react';
import type { Metadata } from 'next';
import { PageProps } from '@/types/common';
import { fetchMetadata } from '@/api/metadata/endpoints';
import { fetchNewsArchive } from '@/api/news/endpoints';
import NewsArchiveTPL from '@/templates/NewsArchiveTPL/NewsArchiveTPL.component';

export async function generateMetadata(): Promise<Metadata> {
    return fetchMetadata({ type: 'page', route: 'news' });
}

const News = async ({ searchParams }: PageProps): Promise<ReactElement> => {
    const queryParams = await searchParams;
    const parsedPage = Number(queryParams?.page);
    const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

    const data = await fetchNewsArchive({ page });

    return data ? <NewsArchiveTPL data={data} /> : <div />;
};

export default News;
