import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchRestApiQuery } from '@/store/functions';
import { ResponseIF } from '@/store/types';
import { FilteredResultIF, FilterIF } from '@/types/common';
import { UserIF } from '@/types/user';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchRestApiQuery('/users'),
    endpoints: builder => ({
        filter: builder.mutation<
            ResponseIF<FilteredResultIF<UserIF[]>>,
            FilterIF
        >({
            query: body => ({
                url: `/filter`,
                method: 'POST',
                body,
            }),
        }),
    }),
});
