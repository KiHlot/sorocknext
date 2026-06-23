import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchRestApiQuery } from '@/store/functions';

export const sportApi = createApi({
    reducerPath: 'sportApi',
    baseQuery: fetchRestApiQuery(),
    endpoints: builder => ({}),
});
