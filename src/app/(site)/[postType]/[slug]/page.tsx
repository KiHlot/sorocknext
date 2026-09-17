import { ReactElement } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageProps } from '@/types/common';
import { PostIF } from '@/types/post';
import {
    fetchArchivePost,
    fetchArchivePostMetadata,
    fetchArchiveSlugs,
} from '@/api/archive/endpoints';
import { POST_TYPE_SLUGS, isPostType } from '@/configs/postTypes.config';
import PostTPL from '@/templates/PostTPL/PostTPL.component';

type PostPagePropsT = PageProps<{ postType: string; slug: string }>;

export async function generateStaticParams(): Promise<
    { postType: string; slug: string }[]
> {
    const slugGroups = await Promise.all(
        POST_TYPE_SLUGS.map(async (postType) => {
            const slugs = await fetchArchiveSlugs(postType);

            return slugs?.map((slug) => ({ postType, slug })) ?? [];
        }),
    );

    return slugGroups.flat();
}

export async function generateMetadata({
    params,
}: PostPagePropsT): Promise<Metadata> {
    const { postType, slug } = await params;

    if (!isPostType(postType)) {
        notFound();
    }

    return fetchArchivePostMetadata({ postType, slug });
}

export default async function PostPage({
    params,
}: PostPagePropsT): Promise<ReactElement> {
    const { postType, slug } = await params;

    if (!isPostType(postType)) {
        notFound();
    }

    let data: PostIF | null | undefined = null;

    try {
        data = await fetchArchivePost({ postType, slug });
    } catch {
        notFound();
    }

    if (!data) {
        notFound();
    }

    return <PostTPL data={data} pathname={`/${postType}/${slug}`} />;
}
