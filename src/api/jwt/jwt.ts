import { createApi } from '@reduxjs/toolkit/query/react';
import { LoginFieldsReqIF, UserLoginResponseIF } from '@/api/jwt/types';
import { fetchJWTTokenQuery } from '@/store/functions';

export const jwtApi = createApi({
    reducerPath: 'jwtApi',
    baseQuery: fetchJWTTokenQuery(),
    endpoints: builder => ({
        loginUser: builder.mutation<UserLoginResponseIF, LoginFieldsReqIF>({
            query: data => ({
                url: `/token`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});
