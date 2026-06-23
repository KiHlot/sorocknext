import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchRestApiQuery } from '@/store/functions';

export const publicationsApi = createApi({
    reducerPath: 'publicationsApi',
    baseQuery: fetchRestApiQuery(),
    endpoints: builder => ({}),
});
