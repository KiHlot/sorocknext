import { redirect } from 'next/navigation';
import { SearchParamsT } from '@/types/common';

export const parseArchivePage = (
    searchParams: SearchParamsT | undefined,
): number => {
    const parsedPage = Number(searchParams?.page);

    return Number.isInteger(parsedPage) ? Math.max(1, parsedPage) : 1;
};

export const redirectArchivePage = (
    pathname: string,
    searchParams: SearchParamsT,
    page: number,
    pagesCount: number,
): void => {
    if (searchParams.page === undefined) {
        return;
    }

    const normalizedPage = Math.min(page, Math.max(1, pagesCount));

    if (searchParams.page === String(normalizedPage)) {
        return;
    }

    const normalizedSearchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(searchParams)) {
        if (value !== undefined) {
            normalizedSearchParams.set(key, value);
        }
    }

    normalizedSearchParams.set('page', String(normalizedPage));
    redirect(`${pathname}?${normalizedSearchParams.toString()}`);
};
