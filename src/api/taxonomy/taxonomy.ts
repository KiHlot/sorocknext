import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchRestApiQuery } from '@/store/functions';
import { ResponseIF } from '@/store/types';
import { TagSearchIF } from '@/api/taxonomy/types';

export const taxonomyApi = createApi({
    reducerPath: 'taxonomyApi',
    baseQuery: fetchRestApiQuery('/taxonomy'),
    endpoints: builder => ({
        searchPostsByTag: builder.mutation<ResponseIF<Record<number, TagSearchIF[]>>, number>({
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
