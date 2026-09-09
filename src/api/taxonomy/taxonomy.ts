import { createApi } from '@reduxjs/toolkit/query/react';
import { ResponseIF } from '@/types/api';
import { TagSearchIF } from '@/api/taxonomy/types';
import { fetchRestApiQuery } from '@/helpers/fetchRestApi/fetchRestApi';

export const taxonomyApi = createApi({
    reducerPath: 'taxonomyApi',
    baseQuery: fetchRestApiQuery('/taxonomy'),
    endpoints: (builder) => ({
        searchPostsByTag: builder.query<
            ResponseIF<Record<string, TagSearchIF[]>>,
            number
        >({
            query: (tagId) => ({
                url: `/search-posts-by-tag`,
                params: { tagId },
            }),
        }),
    }),
});
