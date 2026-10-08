import { ReactElement } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageProps } from '@/types/common';
import { fetchArchive, fetchArchivePromo } from '@/api/archive/endpoints';
import { fetchMetadata } from '@/api/metadata/endpoints';
import {
    POST_TYPES,
    POST_TYPE_SLUGS,
    isPostType,
} from '@/configs/postTypes.config';
import {
    getTermSegmentsFromCategories,
    nestPostUrl,
} from '@/configs/taxonomies.config';
import {
    parseArchivePage,
    redirectArchivePage,
} from '@/helpers/archive/archive.helpers';
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
    const page = parseArchivePage(queryParams);

    const results = await Promise.allSettled([
        fetchArchive({ postType, page }),
        fetchArchivePromo({ postType }),
    ]);

    const data = results[0].status === 'fulfilled' ? results[0].value : null;
    const promo = results[1].status === 'fulfilled' ? results[1].value : null;

    if (data && queryParams) {
        redirectArchivePage(
            `/${postType}`,
            queryParams,
            page,
            data.paginationInfo.pagesCount,
        );
    }

    return data ? (
        <ArchiveTPL
            pathname={`/${postType}`}
            title={POST_TYPES[postType]}
            postsData={data.postsData?.map((post) => ({
                ...post,
                url: nestPostUrl(
                    postType,
                    post.url,
                    getTermSegmentsFromCategories(postType, post.categories),
                ),
            }))}
            paginationInfo={data.paginationInfo}
            seoData={promo?.seoData}
            archivePromoData={promo?.archivePromoData?.map((post) => ({
                ...post,
                url: nestPostUrl(
                    postType,
                    post.url,
                    getTermSegmentsFromCategories(postType, post.categories),
                ),
            }))}
        />
    ) : (
        <div />
    );
};

export default ArchivePage;
