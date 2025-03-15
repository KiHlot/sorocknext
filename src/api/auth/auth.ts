import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchRestApiQuery } from '@/store/functions';
import { ResponseIF } from '@/store/types';
import {
    RegistrationFieldsReqIF,
    ResetPasswordIF,
} from '@/api/auth/types';

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
        sendConfirmUserCodeMail: builder.mutation<ResponseIF, void>({
            query: () => ({
                url: `/send-confirm-user-mail`,
                method: 'POST',
            }),
        }),
        confirmUser: builder.mutation<
            ResponseIF,
            string
        >({
            query: data => ({
                url: `/confirm-user`,
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
        resetPassword: builder.mutation<ResponseIF, ResetPasswordIF>({
            query: data => ({
                url: `/reset-password`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});
