import { createApi } from '@reduxjs/toolkit/query/react';
import { ResponseIF } from '@/types/api';
import { fetchRestApiQuery } from '@/helpers/fetchRestApi/fetchRestApi';
import { PostShortCardModelIF } from '@/components/cards/PostShortCard/PostShortCard.types';

export const taxonomyApi = createApi({
    reducerPath: 'taxonomyApi',
    baseQuery: fetchRestApiQuery('/taxonomy'),
    endpoints: (builder) => ({
        searchPostsByTag: builder.query<
            ResponseIF<Record<string, PostShortCardModelIF[]>>,
            number
        >({
            query: (tagId) => ({
                url: `/search-posts-by-tag`,
                params: { tagId },
            }),
        }),
    }),
});
