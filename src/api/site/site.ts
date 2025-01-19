import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchRestApiQuery } from '@/store/functions';
import { SearchIF } from '@/api/site/types';

export const siteApi = createApi({
    reducerPath: 'siteApi',
    baseQuery: fetchRestApiQuery('/site'),
    endpoints: builder => ({
        getCurrentUserData: builder.mutation<any, void>({
            query: () => ({
                url: `/base-data`,
                method: 'POST',
            }),
        }),
        search: builder.mutation<any, SearchIF>({
            query: () => ({
                url: `/search`,
                method: 'POST',
            }),
        }),
    }),
});
