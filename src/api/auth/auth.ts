import { createApi } from '@reduxjs/toolkit/query/react';
import { RegistrationFieldsReqIF, ResetPasswordIF } from '@/api/auth/types';
import { fetchRestApiQuery } from '@/store/functions';
import { ResponseIF } from '@/store/types';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchRestApiQuery('/auth'),
    endpoints: builder => ({
        registerUser: builder.mutation<ResponseIF, RegistrationFieldsReqIF>({
            query: data => ({
                url: `/registration`,
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
        sendResetPasswordCodeMail: builder.mutation<ResponseIF, string>({
            query: email => ({
                url: `/send-reset-pass-code-mail`,
                method: 'POST',
                body: { email },
            }),
        }),
        confirmUser: builder.mutation<ResponseIF, string>({
            query: confirmCode => ({
                url: `/confirm-user`,
                method: 'POST',
                body: {
                    confirmCode,
                },
            }),
        }),
        sendConfirmUserCodeMail: builder.mutation<ResponseIF, void>({
            query: () => ({
                url: `/send-confirm-user-mail`,
                method: 'POST',
            }),
        }),
    }),
});
