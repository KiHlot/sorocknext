import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchRestApiQuery } from '@/store/config';

export const siteApi = createApi({
    reducerPath: 'siteApi',
    baseQuery: fetchRestApiQuery('/site'),
    endpoints: (builder) => ({
        getCurrentUserData: builder.mutation<any, void>({
            query: () => ({
                url: `/base-data`,
                method: 'POST',
            }),
        }),
    }),
});
