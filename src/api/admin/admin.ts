import { createApi } from '@reduxjs/toolkit/query/react';
import {
    CronInfoIF,
    DeleteUsersResultIF,
    UpdateCronTaskT,
} from '@/api/admin/types';
import { fetchRestApiQuery } from '@/helpers/fetchRestApi/fetchRestApi';
import { ResponseIF } from '@/types/api';

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchRestApiQuery('/admin'),
    endpoints: builder => ({
        getCronInfo: builder.query<ResponseIF<CronInfoIF>, void>({
            query: () => ({
                url: `/get-cron-info`,
            }),
        }),
        updateCronInfo: builder.query<ResponseIF<CronInfoIF>, void>({
            query: () => ({
                url: `/update-cron-info`,
            }),
        }),
        updateCronTask: builder.mutation<ResponseIF<UpdateCronTaskT>, string>({
            query: taskName => ({
                url: `/update-cron-task`,
                method: 'POST',
                body: {
                    taskName,
                },
            }),
        }),
        updateRoles: builder.mutation<ResponseIF, void>({
            query: () => ({
                url: `/update-roles`,
                method: 'POST',
            }),
        }),
        updateUsers: builder.mutation<ResponseIF, number[]>({
            query: usersIds => ({
                url: `/update-users`,
                method: 'POST',
                body: {
                    usersIds,
                },
            }),
        }),
        deleteUsers: builder.mutation<
            ResponseIF<DeleteUsersResultIF>,
            number[]
        >({
            query: usersIds => ({
                url: `/delete-users`,
                method: 'POST',
                body: {
                    usersIds,
                },
            }),
        }),
    }),
});
