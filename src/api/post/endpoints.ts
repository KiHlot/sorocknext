import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchRestApiQuery } from '@/store/functions';

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchRestApiQuery(),
    endpoints: builder => ({}),
});
