import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchRestApiQuery } from '@/store/functions';

export const shortsApi = createApi({
    reducerPath: 'shortsApi',
    baseQuery: fetchRestApiQuery(),
    endpoints: builder => ({}),
});
