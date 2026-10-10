import { ReactElement } from 'react';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { PageProps } from '@/types/common';
import { fetchArchive, fetchArchiveSlugs } from '@/api/archive/endpoints';
import { fetchMetadata } from '@/api/metadata/endpoints';
import { fetchPost } from '@/api/post/endpoints';
import {
    POST_TYPE_SLUGS,
    getArchiveSlug,
    getPostTypeBySlug,
} from '@/configs/postTypes.config';
import {
    getDefaultTermSlugs,
    getTermLabel,
    getTermSegmentsFromCategories,
    isArchivePageId,
    isDefaultTerm,
    nestPostUrl,
    resolveContentPath,
} from '@/configs/taxonomies.config';
import { getArchiveTermFilter } from '@/components/interactive/ArchiveTermFilter/ArchiveTermFilter.helpers';
import ArchiveTPL from '@/templates/ArchiveTPL/ArchiveTPL.component';
import PostTPL from '@/templates/PostTPL/PostTPL.component';

type ContentPagePropsT = PageProps<{ postType: string; slug: string[] }>;

export async function generateStaticParams(): Promise<
    { postType: string; slug: string[] }[]
> {
    const slugGroups = await Promise.all(
        POST_TYPE_SLUGS.map(async (postType) => {
            const slugs = await fetchArchiveSlugs(postType);
            const postParams = Array.isArray(slugs)
                ? slugs.flatMap((slug) => {
                      const normalized =
                          typeof slug === 'string' ? slug.trim() : '';

                      if (!normalized || isDefaultTerm(postType, normalized)) {
                          return [];
                      }

                      return [{ postType, slug: [normalized] }];
                  })
                : [];
            const archiveSlug = getArchiveSlug(postType);
            const termParams = getDefaultTermSlugs(postType).flatMap((term) => [
                { postType: archiveSlug, slug: [term, '1'] },
                { postType: archiveSlug, slug: [term] },
            ]);

            return [...termParams, ...postParams];
        }),
    );

    return slugGroups.flat();
}

export async function generateMetadata({
    params,
}: ContentPagePropsT): Promise<Metadata> {
    const { postType: postTypeSlug, slug } = await params;
    const postType = getPostTypeBySlug(postTypeSlug);

    if (!postType) {
        notFound();
    }

    const path = resolveContentPath(postType, slug);

    if (path?.kind === 'post') {
        return fetchMetadata({ type: 'post', slug: path.postSlug.trim() });
    }

    if (path?.kind === 'term') {
        return fetchMetadata({ type: 'archive', slug: postType });
    }

    notFound();
}

const ContentPage = async ({
    params,
}: ContentPagePropsT): Promise<ReactElement> => {
    const { postType: postTypeSlug, slug } = await params;
    const postType = getPostTypeBySlug(postTypeSlug);

    if (!postType) {
        notFound();
    }

    const path = resolveContentPath(postType, slug);
    const archiveSlug = getArchiveSlug(postType);

    if (path?.kind === 'term') {
        const termPath = `/${archiveSlug}/${path.termSegments.join('/')}`;
        const termSlug = path.termSegments.at(-1) ?? '';
        const hasPageId =
            slug.length > path.termSegments.length &&
            isArchivePageId(slug.at(-1) ?? '');

        if (!hasPageId || postTypeSlug !== archiveSlug) {
            redirect(`${termPath}/${path.page}`);
        }

        const data = await fetchArchive({
            postType,
            page: path.page,
            taxonomy: termSlug || undefined,
        });

        if (data && path.page !== data.paginationInfo.currentPage) {
            redirect(`${termPath}/${data.paginationInfo.currentPage}`);
        }

        const postsData = data?.postsData?.map((post) => ({
            ...post,
            url: nestPostUrl(postType, post.url, path.termSegments),
        }));

        return data ? (
            <ArchiveTPL
                pathname={termPath}
                title={getTermLabel(postType, termSlug)}
                postType={postType}
                postsData={postsData}
                paginationInfo={data.paginationInfo}
                termFilter={getArchiveTermFilter(postType, termSlug)}
                taxonomyTerms={data.taxonomyTerms}
                getPageHref={(page) => `${termPath}/${page}`}
            />
        ) : (
            <div />
        );
    }

    if (path?.kind !== 'post' || !path.postSlug.trim()) {
        notFound();
    }

    if (postTypeSlug !== postType) {
        const segments = [...path.termSegments, path.postSlug.trim()];

        redirect(`/${postType}/${segments.join('/')}`);
    }

    const postSlug = path.postSlug.trim();
    const [data, archiveData] = await Promise.all([
        fetchPost({ postType, slug: postSlug }),
        fetchArchive({ postType, page: 1 }),
    ]);

    if (!data?.postBase?.main?.titleH1?.trim()) {
        notFound();
    }

    const termSegments =
        path.termSegments.length > 0
            ? path.termSegments
            : getTermSegmentsFromCategories(
                  postType,
                  data.postBase.taxonomies.taxonomies,
              );

    if (path.termSegments.length === 0 && termSegments.length > 0) {
        redirect(`/${postType}/${termSegments.join('/')}/${postSlug}`);
    }

    const pathname =
        termSegments.length > 0
            ? `/${postType}/${termSegments.join('/')}/${postSlug}`
            : `/${postType}/${postSlug}`;

    return (
        <PostTPL
            data={data}
            latestPosts={archiveData?.postsData ?? null}
            pathname={pathname}
            postType={postType}
        />
    );
};

export default ContentPage;
