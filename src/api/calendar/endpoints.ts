import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchRestApiQuery } from '@/store/functions';

export const calendarApi = createApi({
    reducerPath: 'calendarApi',
    baseQuery: fetchRestApiQuery(),
    endpoints: builder => ({
    }),
});
