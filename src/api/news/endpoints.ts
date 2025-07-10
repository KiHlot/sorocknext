import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchRestApiQuery } from '@/store/functions';

export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchRestApiQuery(),
    endpoints: builder => ({
    }),
});
