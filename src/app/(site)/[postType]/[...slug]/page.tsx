import { ReactElement } from 'react';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { PageProps } from '@/types/common';
import { fetchArchive, fetchArchiveSlugs } from '@/api/archive/endpoints';
import { fetchMetadata } from '@/api/metadata/endpoints';
import { fetchPost } from '@/api/post/endpoints';
import { POST_TYPE_SLUGS, isPostType } from '@/configs/postTypes.config';
import {
    getDefaultTermSlugs,
    getTermLabel,
    getTermSegmentsFromCategories,
    isArchivePageId,
    isDefaultTerm,
    nestPostUrl,
    resolveContentPath,
} from '@/configs/taxonomies.config';
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
            const termParams = getDefaultTermSlugs(postType).flatMap((term) => [
                { postType, slug: [term, '1'] },
                { postType, slug: [term] },
            ]);

            return [...termParams, ...postParams];
        }),
    );

    return slugGroups.flat();
}

export async function generateMetadata({
    params,
}: ContentPagePropsT): Promise<Metadata> {
    const { postType, slug } = await params;

    if (!isPostType(postType)) {
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
    const { postType, slug } = await params;

    if (!isPostType(postType)) {
        notFound();
    }

    const path = resolveContentPath(postType, slug);

    if (path?.kind === 'term') {
        const termPath = `/${postType}/${path.termSegments.join('/')}`;
        const termSlug = path.termSegments.at(-1) ?? '';
        const hasPageId =
            slug.length > path.termSegments.length &&
            isArchivePageId(slug.at(-1) ?? '');

        if (!hasPageId) {
            redirect(`${termPath}/1`);
        }

        const data = await fetchArchive({ postType, page: path.page });

        if (data) {
            const pagesCount = Math.max(1, data.paginationInfo.pagesCount);

            if (path.page > pagesCount) {
                redirect(`${termPath}/${pagesCount}`);
            }
        }

        const postsData = data?.postsData?.map((post) => ({
            ...post,
            url: nestPostUrl(postType, post.url, path.termSegments),
        }));

        return data ? (
            <ArchiveTPL
                pathname={termPath}
                title={getTermLabel(postType, termSlug)}
                postsData={postsData}
                paginationInfo={data.paginationInfo}
                getPageHref={(page) => `${termPath}/${page}`}
            />
        ) : (
            <div />
        );
    }

    if (path?.kind !== 'post' || !path.postSlug.trim()) {
        notFound();
    }

    const postSlug = path.postSlug.trim();
    const data = await fetchPost({ postType, slug: postSlug });

    if (!data?.postBase?.main?.titleH1?.trim()) {
        notFound();
    }

    const termSegments =
        path.termSegments.length > 0
            ? path.termSegments
            : getTermSegmentsFromCategories(
                  postType,
                  data.postBase.taxonomies.categories,
              );

    if (path.termSegments.length === 0 && termSegments.length > 0) {
        redirect(`/${postType}/${termSegments.join('/')}/${postSlug}`);
    }

    const pathname =
        termSegments.length > 0
            ? `/${postType}/${termSegments.join('/')}/${postSlug}`
            : `/${postType}/${postSlug}`;

    return <PostTPL data={data} pathname={pathname} />;
};

export default ContentPage;
