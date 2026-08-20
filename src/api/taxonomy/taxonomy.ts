import { createApi } from '@reduxjs/toolkit/query/react';
import { TagSearchIF } from '@/api/taxonomy/types';
import { fetchRestApiQuery } from '@/helpers/fetchRestApi/fetchRestApi';
import { ResponseIF } from '@/types/api';

export const taxonomyApi = createApi({
    reducerPath: 'taxonomyApi',
    baseQuery: fetchRestApiQuery('/taxonomy'),
    endpoints: builder => ({
        searchPostsByTag: builder.mutation<
            ResponseIF<Record<string, TagSearchIF[]>>,
            number
        >({
            query: tagId => ({
                url: `/search-posts-by-tag`,
                method: 'POST',
                body: {
                    tagId,
                },
            }),
        }),
    }),
});
