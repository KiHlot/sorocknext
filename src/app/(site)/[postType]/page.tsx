import { ReactElement } from 'react';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { PageProps } from '@/types/common';
import { fetchArchive } from '@/api/archive/endpoints';
import { fetchMetadata } from '@/api/metadata/endpoints';
import {
    POST_TYPES,
    POST_TYPE_SLUGS,
    isPostType,
} from '@/configs/postTypes.config';
import ArchiveTPL from '@/templates/ArchiveTPL/ArchiveTPL.component';

type ArchivePagePropsT = PageProps<{ postType: string }>;

export const generateStaticParams = (): { postType: string }[] =>
    POST_TYPE_SLUGS.map((postType) => ({ postType }));

export async function generateMetadata({
    params,
}: ArchivePagePropsT): Promise<Metadata> {
    const { postType } = await params;

    if (!isPostType(postType)) {
        notFound();
    }

    return fetchMetadata({ type: 'archive', slug: postType });
}

const ArchivePage = async ({
    params,
    searchParams,
}: ArchivePagePropsT): Promise<ReactElement> => {
    const { postType } = await params;

    if (!isPostType(postType)) {
        notFound();
    }

    const queryParams = await searchParams;
    const parsedPage = Number(queryParams?.page);
    const page = Number.isInteger(parsedPage) ? Math.max(1, parsedPage) : 1;

    const data = await fetchArchive({ postType, page });

    if (data && queryParams?.page !== undefined) {
        const pagesCount = Math.max(1, data.paginationInfo.pagesCount);
        const normalizedPage = Math.min(page, pagesCount);

        if (queryParams.page !== String(normalizedPage)) {
            const normalizedSearchParams = new URLSearchParams();

            for (const [key, value] of Object.entries(queryParams)) {
                if (value !== undefined) {
                    normalizedSearchParams.set(key, value);
                }
            }

            normalizedSearchParams.set('page', String(normalizedPage));
            redirect(`/${postType}?${normalizedSearchParams.toString()}`);
        }
    }

    return data ? (
        <ArchiveTPL
            pathname={`/${postType}`}
            title={POST_TYPES[postType]}
            postsData={data.postsData}
            paginationInfo={data.paginationInfo}
        />
    ) : (
        <div />
    );
};

export default ArchivePage;
