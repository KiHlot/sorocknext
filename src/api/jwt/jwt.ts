import { createApi } from '@reduxjs/toolkit/query/react';
import { LoginUserIF, LoginUserResponseIF } from '@/api/jwt/types';
import { fetchJWTTokenQuery } from '@/helpers/fetchRestApi/fetchRestApi';

export const jwtApi = createApi({
    reducerPath: 'jwtApi',
    baseQuery: fetchJWTTokenQuery(),
    endpoints: (builder) => ({
        loginUser: builder.mutation<LoginUserResponseIF, LoginUserIF>({
            query: (data) => ({
                url: `/token`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});
