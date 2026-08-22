import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';
import { ResponseErrorIF } from '@/types/api';

export type FetchRestApiQuery = BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    object,
    FetchBaseQueryMeta
>;

export interface ParseResponseCallbackIF<DataT = null> {
    data: DataT | null;
    errors?: ResponseErrorIF[] | null;
}
