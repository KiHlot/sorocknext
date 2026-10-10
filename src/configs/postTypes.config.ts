export const POST_TYPES = {
    article: 'Статьи',
    journal: 'Журнал',
    music: 'Музыка',
    news: 'Новости',
    quiz: 'Тесты',
    'rock-data': 'Рок даты',
    'site-archive': 'Архивные материалы',
    video: 'Видео',
} as const;

export type PostTypeT = keyof typeof POST_TYPES;

export const POST_TYPE_SLUGS = Object.keys(POST_TYPES) as PostTypeT[];

export const isPostType = (value: string): value is PostTypeT =>
    value in POST_TYPES;

const POST_TYPE_ARCHIVE_SLUGS: Partial<Record<PostTypeT, string>> = {
    article: 'articles',
};

export const getArchiveSlug = (postType: PostTypeT): string =>
    POST_TYPE_ARCHIVE_SLUGS[postType] ?? postType;

export const getPostTypeBySlug = (slug: string): PostTypeT | null => {
    const matched = POST_TYPE_SLUGS.find(
        (postType) => getArchiveSlug(postType) === slug,
    );

    if (matched) {
        return matched;
    }

    return isPostType(slug) ? slug : null;
};

export interface ArchiveSidebarFlagsIF {
    popularTags: boolean;
    taxonomyTerms: boolean;
}

const ARCHIVE_SIDEBAR_FLAGS: Partial<
    Record<PostTypeT, ArchiveSidebarFlagsIF>
> = {
    news: { popularTags: true, taxonomyTerms: true },
    article: { popularTags: true, taxonomyTerms: true },
    music: { popularTags: true, taxonomyTerms: true },
    video: { popularTags: true, taxonomyTerms: true },
    'rock-data': { popularTags: true, taxonomyTerms: false },
    'site-archive': { popularTags: true, taxonomyTerms: false },
};

const HIDDEN_ARCHIVE_SIDEBAR: ArchiveSidebarFlagsIF = {
    popularTags: false,
    taxonomyTerms: false,
};

export const getArchiveSidebarFlags = (
    postType: PostTypeT,
): ArchiveSidebarFlagsIF =>
    ARCHIVE_SIDEBAR_FLAGS[postType] ?? HIDDEN_ARCHIVE_SIDEBAR;

export const isPostTypeSectionPath = (
    pathname: string,
    href: string,
): boolean => {
    if (pathname === href || pathname.startsWith(`${href}/`)) {
        return true;
    }

    const hrefSegment = href.split('/').find(Boolean);
    const pathSegment = pathname.split('/').find(Boolean);
    const postType = hrefSegment ? getPostTypeBySlug(hrefSegment) : null;

    if (
        !postType ||
        !pathSegment ||
        href.split('/').filter(Boolean).length !== 1
    ) {
        return false;
    }

    return pathSegment === postType || pathSegment === getArchiveSlug(postType);
};
