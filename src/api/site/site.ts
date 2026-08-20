import { createApi } from '@reduxjs/toolkit/query/react';
import {
    BaseData,
    ContactFormIF,
    SearchIF,
    SearchResultIF,
} from '@/api/site/types';
import { fetchRestApiQuery } from '@/helpers/fetchRestApi/fetchRestApi';
import { ResponseIF } from '@/types/api';

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
        getCommonData: builder.query<BaseData | null, void>({
            query: () => ({
                url: `/common-data`,
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
