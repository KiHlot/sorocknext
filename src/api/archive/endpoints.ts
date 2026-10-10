import { redirect } from 'next/navigation';
import { RESPONSE_RESULT } from '@/types/api';
import {
    FetchArchiveIF,
    FetchArchiveParamsIF,
    FetchArchivePromoIF,
    FetchArchivePromoParamsIF,
    FetchCalendarIF,
    FetchCalendarParamsIF,
} from '@/api/archive/types';
import { fetchApi, fetchApiEnvelope } from '@/helpers/fetchApi';

export const fetchArchive = async ({
    postType,
    page,
    taxonomy,
}: FetchArchiveParamsIF): Promise<FetchArchiveIF | null | undefined> => {
    const searchParams = new URLSearchParams();

    searchParams.append('postType', postType);
    searchParams.append('page', String(page));

    if (taxonomy) {
        searchParams.append('taxonomy', taxonomy);
    }

    const response = await fetchApiEnvelope<FetchArchiveIF>(
        `/archive/archive?${searchParams.toString()}`,
    );

    if (!response) {
        return;
    }

    if (response.result === RESPONSE_RESULT.Redirect && response.redirectUrl) {
        redirect(response.redirectUrl);
    }

    return response.result === RESPONSE_RESULT.Ok ? response.data : null;
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

export const fetchCalendar = async ({
    month,
    day,
}: FetchCalendarParamsIF): Promise<FetchCalendarIF | null | undefined> => {
    const searchParams = new URLSearchParams();

    searchParams.append('month', String(month));
    searchParams.append('day', String(day));

    return fetchApi<FetchCalendarIF>(
        `/archive/calendar?${searchParams.toString()}`,
    );
};

export const fetchArchiveSlugs = async (
    postType: string,
): Promise<string[] | null | undefined> => {
    const searchParams = new URLSearchParams();

    searchParams.append('postType', postType);

    return fetchApi<string[]>(`/archive/get-slugs?${searchParams.toString()}`);
};
