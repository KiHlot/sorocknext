import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchRestApiQuery } from '@/store/functions';
import { ResponseIF } from '@/store/types';
import {
    BaseData,
    CronInfoIF,
    SearchIF,
    SearchResultIF,
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
        getCronInfo: builder.query<ResponseIF, string>({
            query: () => ({
                url: `/get-cron-info`,
            }),
        }),
        updateCronInfo: builder.query<ResponseIF<CronInfoIF | null>, void>({
            query: () => ({
                url: `/update-cron-task`,
            }),
        }),
        updateCronTask: builder.mutation<ResponseIF<CronInfoIF | string>, void>(
            {
                query: taskName => ({
                    url: `/update-cron-info`,
                    method: 'POST',
                    body: {
                        taskName,
                    },
                }),
            },
        ),
    }),
});
