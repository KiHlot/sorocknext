import { PostArchiveCardModelIF } from '@/components/cards/PostArchiveCard/PostArchiveCard.types';
import { LATEST_POSTS_LIMIT } from '@/components/widgets/LatestPostsWidget/LatestPostsWidget.config';

const getPathSlug = (path: string): string =>
    path.split('?')[0]?.split('#')[0]?.split('/').findLast(Boolean) ?? '';

export const getLatestSidebarPosts = (
    posts: PostArchiveCardModelIF[] | null,
    pathname: string,
): PostArchiveCardModelIF[] => {
    const currentSlug = getPathSlug(pathname);

    return (posts ?? [])
        .slice(0, LATEST_POSTS_LIMIT)
        .filter((post) => getPathSlug(post.url) !== currentSlug);
};
