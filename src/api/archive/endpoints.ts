import {
    FetchArchiveIF,
    FetchArchiveParamsIF,
    FetchArchivePromoIF,
    FetchArchivePromoParamsIF,
} from '@/api/archive/types';
import { fetchApi } from '@/helpers/fetchApi';

export const fetchArchive = async ({
    postType,
    page,
}: FetchArchiveParamsIF): Promise<FetchArchiveIF | null | undefined> => {
    const searchParams = new URLSearchParams();

    searchParams.append('postType', postType);
    searchParams.append('page', String(page));

    return fetchApi<FetchArchiveIF>(
        `/archive/archive?${searchParams.toString()}`,
    );
};

export const fetchArchivePromo = async ({
    postType,
}: FetchArchivePromoParamsIF): Promise<
    FetchArchivePromoIF | null | undefined
> => {
    const searchParams = new URLSearchParams();

    searchParams.append('postType', postType);

    return fetchApi<FetchArchivePromoIF>(
        `/archive/promo-data?${searchParams.toString()}`,
    );
};

export const fetchArchiveSlugs = async (
    postType: string,
): Promise<string[] | null | undefined> => {
    const searchParams = new URLSearchParams();

    searchParams.append('postType', postType);

    return fetchApi<string[]>(`/archive/get-slugs?${searchParams.toString()}`);
};
