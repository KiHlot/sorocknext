import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchRestApiQuery } from '@/store/functions';
import { ResponseIF } from '@/store/types';
import { FilteredResultIF } from '@/types/common';
import { UserIF } from '@/types/user';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchRestApiQuery('/users'),
    endpoints: builder => ({
        filter: builder.query<ResponseIF<FilteredResultIF<UserIF[]>>, string>({
            query: params => ({
                url: `/filter?${params}`,
            }),
        }),
        getUserData: builder.mutation<ResponseIF<UserIF>, number>({
            query: userId => ({
                url: `/get-user-data`,
                method: 'POST',
                body: {
                    userId,
                },
            }),
        }),
    }),
});
