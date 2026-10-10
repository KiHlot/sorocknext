import { ReactElement } from 'react';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { PageProps } from '@/types/common';
import { fetchArchive, fetchArchivePromo } from '@/api/archive/endpoints';
import { fetchMetadata } from '@/api/metadata/endpoints';
import {
    POST_TYPES,
    POST_TYPE_SLUGS,
    getArchiveSlug,
    getPostTypeBySlug,
} from '@/configs/postTypes.config';
import {
    getTermSegmentsFromCategories,
    isDefaultTerm,
    nestPostUrl,
} from '@/configs/taxonomies.config';
import {
    getArchivePageHref,
    parseArchivePage,
    redirectArchivePage,
} from '@/helpers/archive/archive.helpers';
import { getArchiveTermFilter } from '@/components/interactive/ArchiveTermFilter/ArchiveTermFilter.helpers';
import ArchiveTPL from '@/templates/ArchiveTPL/ArchiveTPL.component';

type ArchivePagePropsT = PageProps<{ postType: string }>;

export const generateStaticParams = (): { postType: string }[] =>
    POST_TYPE_SLUGS.map((postType) => ({ postType: getArchiveSlug(postType) }));

export async function generateMetadata({
    params,
}: ArchivePagePropsT): Promise<Metadata> {
    const { postType: postTypeSlug } = await params;
    const postType = getPostTypeBySlug(postTypeSlug);

    if (!postType) {
        notFound();
    }

    return fetchMetadata({ type: 'archive', slug: postType });
}

const ArchivePage = async ({
    params,
    searchParams,
}: ArchivePagePropsT): Promise<ReactElement> => {
    const { postType: postTypeSlug } = await params;
    const postType = getPostTypeBySlug(postTypeSlug);

    if (!postType) {
        notFound();
    }

    const archiveSlug = getArchiveSlug(postType);
    const queryParams = await searchParams;
    const page = parseArchivePage(queryParams);
    const taxonomy = queryParams?.taxonomy?.trim();

    if (taxonomy || postTypeSlug !== archiveSlug) {
        redirect(
            taxonomy && isDefaultTerm(postType, taxonomy)
                ? `/${archiveSlug}/${taxonomy}/${page}`
                : getArchivePageHref(postType, page),
        );
    }

    const results = await Promise.allSettled([
        fetchArchive({ postType, page }),
        fetchArchivePromo({ postType }),
    ]);

    const data = results[0].status === 'fulfilled' ? results[0].value : null;
    const promo = results[1].status === 'fulfilled' ? results[1].value : null;

    if (data && queryParams) {
        redirectArchivePage(
            `/${archiveSlug}`,
            queryParams,
            data.paginationInfo.currentPage,
        );
    }

    return data ? (
        <ArchiveTPL
            pathname={`/${archiveSlug}`}
            title={POST_TYPES[postType]}
            postType={postType}
            postsData={data.postsData?.map((post) => ({
                ...post,
                url: nestPostUrl(
                    postType,
                    post.url,
                    getTermSegmentsFromCategories(postType, post.taxonomies),
                ),
            }))}
            paginationInfo={data.paginationInfo}
            termFilter={getArchiveTermFilter(postType)}
            getPageHref={(pageNumber) =>
                getArchivePageHref(postType, pageNumber)
            }
            taxonomyTerms={data.taxonomyTerms}
            seoData={promo?.seoData}
            archivePromoData={promo?.archivePromoData?.map((post) => ({
                ...post,
                url: nestPostUrl(
                    postType,
                    post.url,
                    getTermSegmentsFromCategories(postType, post.taxonomies),
                ),
            }))}
        />
    ) : (
        <div />
    );
};

export default ArchivePage;
