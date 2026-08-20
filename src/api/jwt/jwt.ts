import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchJWTTokenQuery } from '@/helpers/fetchRestApi/fetchRestApi';

export const jwtApi = createApi({
    reducerPath: 'jwtApi',
    baseQuery: fetchJWTTokenQuery(),
    endpoints: (builder) => ({
        loginUser: builder.mutation<any, any>({
            query: (data) => ({
                url: `/token`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});
