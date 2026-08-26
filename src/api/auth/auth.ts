import { createApi } from '@reduxjs/toolkit/query/react';
import { ResponseIF } from '@/types/api';
import {
    ConfirmUserIF,
    RegistrationFieldsIF,
    ResetPasswordIF,
    SendConfirmCodeMailIF,
} from '@/api/auth/types';
import { fetchRestApiQuery } from '@/helpers/fetchRestApi/fetchRestApi';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchRestApiQuery('/auth'),
    endpoints: (builder) => ({
        registerUser: builder.mutation<ResponseIF, RegistrationFieldsIF>({
            query: (data) => ({
                url: `/registration`,
                method: 'POST',
                body: data,
            }),
        }),
        sendConfirmCodeMail: builder.mutation<
            ResponseIF,
            SendConfirmCodeMailIF
        >({
            query: (body) => ({
                url: `/send-confirm-code-mail`,
                method: 'POST',
                body,
            }),
        }),
        confirmUser: builder.mutation<ResponseIF, ConfirmUserIF>({
            query: (body) => ({
                url: `/confirm-user`,
                method: 'POST',
                body,
            }),
        }),
        resetPassword: builder.mutation<ResponseIF, ResetPasswordIF>({
            query: (data) => ({
                url: `/reset-password`,
                method: 'POST',
                body: data,
            }),
        }),
        sendResetPasswordCodeMail: builder.mutation<ResponseIF, string>({
            query: (email) => ({
                url: `/send-reset-pass-code-mail`,
                method: 'POST',
                body: { email },
            }),
        }),
    }),
});
