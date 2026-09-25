import { ReactElement } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageProps } from '@/types/common';
import { fetchArchiveSlugs } from '@/api/archive/endpoints';
import { fetchMetadata } from '@/api/metadata/endpoints';
import { fetchPost } from '@/api/post/endpoints';
import { POST_TYPE_SLUGS, isPostType } from '@/configs/postTypes.config';
import PostTPL from '@/templates/PostTPL/PostTPL.component';

type PostPagePropsT = PageProps<{ postType: string; slug: string }>;

export async function generateStaticParams(): Promise<
    { postType: string; slug: string }[]
> {
    const slugGroups = await Promise.all(
        POST_TYPE_SLUGS.map(async (postType) => {
            const slugs = await fetchArchiveSlugs(postType);

            if (!Array.isArray(slugs)) {
                return [];
            }

            return slugs.flatMap((slug) =>
                typeof slug === 'string' && slug.trim()
                    ? [{ postType, slug: slug.trim() }]
                    : [],
            );
        }),
    );

    return slugGroups.flat();
}

export async function generateMetadata({
    params,
}: PostPagePropsT): Promise<Metadata> {
    const { postType, slug } = await params;

    if (!isPostType(postType) || !slug.trim()) {
        notFound();
    }

    return fetchMetadata({ type: 'post', slug: slug.trim() });
}

const PostPage = async ({ params }: PostPagePropsT): Promise<ReactElement> => {
    const { postType, slug } = await params;
    const normalizedSlug = slug.trim();

    if (!isPostType(postType) || !normalizedSlug) {
        notFound();
    }

    const data = await fetchPost({ postType, slug: normalizedSlug });

    if (!data?.postBase?.main?.titleH1?.trim()) {
        notFound();
    }

    return <PostTPL data={data} pathname={`/${postType}/${normalizedSlug}`} />;
};

export default PostPage;
