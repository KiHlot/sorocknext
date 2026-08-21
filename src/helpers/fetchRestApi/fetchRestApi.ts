import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ResponseIF } from '@/types/api';
import { FetchRestApiQuery } from '@/helpers/fetchRestApi/fetchRestApi.types';
import { STORAGE_KEYS } from '@/helpers/storage/storage.config';
import { getCookie } from '@/helpers/storage/storage.helpers';

export const fetchRestApiQuery = (baseUrl?: string): FetchRestApiQuery =>
    fetchBaseQuery({
        baseUrl: `${process.env.NEXT_REST_DOMAIN_URL}${process.env.NEXT_REST_BASE}${baseUrl || ''}`,
        prepareHeaders: (headers) => {
            const token = getCookie(STORAGE_KEYS.Token);
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
        responseHandler: async (response): Promise<ResponseIF | void> =>
            response.json(),
    });

export const fetchJWTTokenQuery = (): FetchRestApiQuery =>
    fetchBaseQuery({
        baseUrl: `${process.env.NEXT_REST_DOMAIN_URL}${process.env.NEXT_JWT_BASE}`,
        responseHandler: async (response) => response.json(),
    });
