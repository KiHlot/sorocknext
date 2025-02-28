import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchRestApiQuery } from '@/store/functions';
import { ResponseIF } from '@/store/types';
import {
    BaseData,
    ContactFormIF,
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
        sendContactForm: builder.mutation<
            ResponseIF<{ isSent: boolean }>,
            ContactFormIF
        >({
            query: contactForm => ({
                url: `/send-contact-form`,
                method: 'POST',
                body: contactForm,
            }),
        }),
    }),
});
