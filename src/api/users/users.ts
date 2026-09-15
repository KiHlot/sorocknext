import { createApi } from '@reduxjs/toolkit/query/react';
import { ResponseIF } from '@/types/api';
import { FilteredResultIF } from '@/types/common';
import { CurrentUserIF, UserIF } from '@/types/user';
import { fetchRestApiQuery } from '@/helpers/fetchRestApi/fetchRestApi';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchRestApiQuery('/users'),
    endpoints: (builder) => ({
        filter: builder.query<ResponseIF<FilteredResultIF<UserIF[]>>, string>({
            query: (parameters) => ({
                url: `/filter?${parameters}`,
            }),
        }),
        getUserData: builder.mutation<ResponseIF<UserIF>, number>({
            query: (userId) => ({
                url: `/get-user-data`,
                method: 'POST',
                body: {
                    userId,
                },
            }),
        }),
        getCurrentUser: builder.query<ResponseIF<CurrentUserIF | null>, void>({
            query: () => ({
                url: `/get-current-user`,
            }),
        }),
    }),
});
