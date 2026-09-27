import { createApi } from '@reduxjs/toolkit/query/react';
import { ResponseIF } from '@/types/api';
import {
    FetchCalendarIF,
    FetchCalendarParamsIF,
    FetchRockCalendarIF,
    FetchRockCalendarParamsIF,
} from '@/api/archive/types';
import { fetchRestApiQuery } from '@/helpers/fetchRestApi/fetchRestApi';

export const archiveApi = createApi({
    reducerPath: 'archiveApi',
    baseQuery: fetchRestApiQuery('/archive'),
    endpoints: (builder) => ({
        getCalendar: builder.query<FetchCalendarIF, FetchCalendarParamsIF>({
            query: ({ month, day }) => ({
                url: '/calendar',
                params: { month, day },
            }),
            transformResponse(response: ResponseIF<FetchCalendarIF>) {
                return response?.data ?? null;
            },
        }),
        getRockCalendar: builder.query<
            FetchRockCalendarIF,
            FetchRockCalendarParamsIF
        >({
            query: ({ month }) => ({
                url: '/rock-calendar',
                params: { month },
            }),
            transformResponse(response: ResponseIF<FetchRockCalendarIF>) {
                return response?.data ?? null;
            },
        }),
    }),
});
