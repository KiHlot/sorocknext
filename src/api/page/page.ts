import { createApi } from '@reduxjs/toolkit/query/react';
import { HomePageDataIF } from '@/api/page/types';
import { fetchRestApiQuery } from '@/store/functions';

export const pageApi = createApi({
    reducerPath: 'pageApi',
    baseQuery: fetchRestApiQuery('/page'),
    endpoints: builder => ({
        getHomePageData: builder.query<HomePageDataIF, void>({
            query: () => ({
                url: `/home-page-data`,
            }),
        }),
    }),
});
