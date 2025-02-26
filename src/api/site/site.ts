import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchRestApiQuery } from '@/store/functions';
import { ResponseIF } from '@/store/types';
import {
    BaseData,
    ContactFormIF,
    CronInfoIF,
    SearchIF,
    SearchResultIF, UpdateCronTaskT,
} from '@/api/site/types';

export const siteApi = createApi({
    reducerPath: 'siteApi',
    baseQuery: fetchRestApiQuery('/site'),
    endpoints: builder => ({
        search: builder.mutation<ResponseIF<SearchResultIF[]>, SearchIF>({
            query: body => ({
                url: `/search`,
                method: 'POST',
                body,
            }),
        }),
        getBaseData: builder.mutation<BaseData | null, void>({
            query: () => ({
                url: `/base-data`,
                method: 'POST',
            }),
            transformResponse(response: ResponseIF<BaseData>) {
                return response?.data;
            },
        }),
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
        updateCronTask: builder.mutation<ResponseIF<UpdateCronTaskT>, string>(
            {
                query: taskName => ({
                    url: `/update-cron-task`,
                    method: 'POST',
                    body: {
                        taskName,
                    },
                }),
            },
        ),
        updateRoles: builder.mutation<ResponseIF, void>(
            {
                query: () => ({
                    url: `/update-roles`,
                }),
            },
        ),
        updateUsers: builder.mutation<ResponseIF, number[]>(
            {
                query: (usersIds) => ({
                    url: `/update-users`,
                    method: 'POST',
                    body: {
                        usersIds,
                    },
                }),
            },
        ),
        sendContactForm: builder.mutation<ResponseIF<{ isSent: boolean }>, ContactFormIF>({
            query: contactForm => ({
                url: `/send-contact-form`,
                method: 'POST',
                body: contactForm,
            }),
        }),
    }),
});
