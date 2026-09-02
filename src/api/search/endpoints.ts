import { SearchParamsT } from '@/types/common';
import { FetchSearchConfigIF, FetchSearchDataIF } from '@/api/search/types';
import { fetchApi } from '@/helpers/fetchApi';

export const fetchSearchData = async (
    queryParams?: SearchParamsT,
): Promise<FetchSearchDataIF | null | undefined> => {
    if (!queryParams) {
        return fetchApi<FetchSearchDataIF>('/search');
    }

    const searchParams = new URLSearchParams();

    Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
            searchParams.append(key, value);
        }
    });

    const queryString = searchParams.toString();

    return fetchApi<FetchSearchDataIF>(
        `/search${queryString ? `?${queryString}` : ''}`,
    );
};

export const fetchSearchConfig = async (): Promise<
    FetchSearchConfigIF | null | undefined
> => fetchApi<FetchSearchConfigIF>(`/search/get-search-config`);
