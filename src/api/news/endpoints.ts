import { fetchApi } from '@/helpers/fetchApi';
import {
    FetchNewsArchiveIF,
    FetchNewsArchiveParamsIF,
} from '@/api/news/types';

export const fetchNewsArchive = async (
    pagination: FetchNewsArchiveParamsIF,
): Promise<FetchNewsArchiveIF | null | undefined> => {
    const searchParams = new URLSearchParams();

    searchParams.append('page', String(pagination.page));

    if (pagination.pagesCount !== undefined) {
        searchParams.append('pagesCount', String(pagination.pagesCount));
    }

    const queryString = searchParams.toString();

    return fetchApi<FetchNewsArchiveIF>(
        `/news/archive${queryString ? `?${queryString}` : ''}`,
    );
};
