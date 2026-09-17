import { ReactElement } from 'react';
import type { Metadata } from 'next';
import { PageProps } from '@/types/common';
import { fetchMetadata } from '@/api/metadata/endpoints';
import { fetchSearchConfig, fetchSearchData } from '@/api/search/endpoints';
import SearchTPL from '@/templates/SearchTPL/SearchTPL.component';

export async function generateMetadata({
    searchParams,
}: PageProps): Promise<Metadata> {
    const queryParams = await searchParams;

    return fetchMetadata({
        type: 'search',
        param: queryParams?.phrase,
    });
}

export default async function SearchPage({
    searchParams,
}: PageProps): Promise<ReactElement> {
    const queryParams = await searchParams;

    const results = await Promise.allSettled([
        fetchSearchConfig(),
        fetchSearchData(queryParams),
    ]);

    const config = results[0].status === 'fulfilled' ? results[0].value : null;
    const data = results[1].status === 'fulfilled' ? results[1].value : null;

    return (
        <SearchTPL
            searchConfig={config?.searchConfig}
            searchedPages={data?.searchedPages}
            queryParams={queryParams}
        />
    );
}
