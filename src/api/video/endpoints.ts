import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchRestApiQuery } from '@/store/functions';

export const videoApi = createApi({
    reducerPath: 'videoApi',
    baseQuery: fetchRestApiQuery(),
    endpoints: builder => ({}),
});
