import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchJWTTokenQuery } from '@/store/functions';
import { LoginFieldsReqIF, LoginResponseIF } from '@/api/jwt/types';

export const jwtApi = createApi({
    reducerPath: 'jwtApi',
    baseQuery: fetchJWTTokenQuery(),
    endpoints: builder => ({
        loginUser: builder.mutation<LoginResponseIF, LoginFieldsReqIF>({
            query: data => ({
                url: `/token`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});
