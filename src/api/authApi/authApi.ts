import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchRestApiQuery } from '@/store/functions';
import { ResponseIF } from '@/store/types';
import {
    ActivateUserIF,
    RegistrationFieldsReqIF,
    ResetPasswordIF,
} from '@/api/authApi/types';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchRestApiQuery('/auth'),
    endpoints: builder => ({
        registerUser: builder.mutation<
            ResponseIF<null>,
            RegistrationFieldsReqIF
        >({
            query: data => ({
                url: `/registration`,
                method: 'POST',
                body: data,
            }),
        }),
        activateUser: builder.mutation<ResponseIF<null>, ActivateUserIF>({
            query: data => ({
                url: `/activate-user`,
                method: 'POST',
                body: data,
            }),
        }),
        sendResetPasswordCode: builder.mutation<
            ResponseIF<{ isSent: boolean }>,
            { email: string }
        >({
            query: data => ({
                url: `/send-reset-pass-code`,
                method: 'POST',
                body: data,
            }),
        }),
        resetPassword: builder.mutation<ResponseIF<null>, ResetPasswordIF>({
            query: data => ({
                url: `/reset-password`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});
