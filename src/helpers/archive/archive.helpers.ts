import { redirect } from 'next/navigation';
import { SearchParamsT } from '@/types/common';
import { PostTypeT, getArchiveSlug } from '@/configs/postTypes.config';

export const parseArchivePage = (
    searchParams: SearchParamsT | undefined,
): number => {
    const parsedPage = Number(searchParams?.page);

    return Number.isInteger(parsedPage) ? Math.max(1, parsedPage) : 1;
};

export const getArchivePageHref = (
    postType: PostTypeT,
    page: number,
): string => {
    const pathname = `/${getArchiveSlug(postType)}`;

    return page > 1 ? `${pathname}?page=${page}` : pathname;
};

export const redirectArchivePage = (
    pathname: string,
    searchParams: SearchParamsT,
    currentPage: number,
): void => {
    if (searchParams.page === undefined) {
        return;
    }

    if (searchParams.page === String(currentPage)) {
        return;
    }

    const normalizedSearchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(searchParams)) {
        if (value !== undefined) {
            normalizedSearchParams.set(key, value);
        }
    }

    normalizedSearchParams.set('page', String(currentPage));
    redirect(`${pathname}?${normalizedSearchParams.toString()}`);
};
