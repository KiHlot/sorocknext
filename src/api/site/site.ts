import { createApi } from '@reduxjs/toolkit/query/react';
import { ResponseIF } from '@/types/api';
import {
    BaseData,
    ContactFormIF,
    ContactFormResponseIF,
} from '@/api/site/types';
import { fetchRestApiQuery } from '@/helpers/fetchRestApi/fetchRestApi';

export const siteApi = createApi({
    reducerPath: 'siteApi',
    baseQuery: fetchRestApiQuery('/site'),
    endpoints: (builder) => ({
        getCommonData: builder.query<BaseData | null, void>({
            query: () => ({
                url: `/common-data`,
            }),
            transformResponse(response: ResponseIF<BaseData>) {
                return response?.data;
            },
        }),
        sendContactForm: builder.mutation<
            ResponseIF<ContactFormResponseIF>,
            ContactFormIF
        >({
            query: (contactForm) => ({
                url: `/send-contact-form`,
                method: 'POST',
                body: contactForm,
            }),
        }),
    }),
});
