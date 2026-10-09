import { PostTypeT } from '@/configs/postTypes.config';

export const TAG_PATH = 'tag';

export const STANDARD_TAXONOMIES = {
    post_tag: {
        label: 'Метки',
        hierarchical: false,
    },
} as const;

export const CUSTOM_TAXONOMIES = {
    article_cat: {
        label: 'Категории статей',
        postType: 'article',
        terms: {
            interview: 'Интервью',
            review: 'Рецензии',
            sport: 'Спорт',
            game: 'Игры',
            fact: 'Факты',
            entertaining: 'Развлечения',
            event: 'События',
        },
    },
    music_cat: {
        label: 'Форматы музыки',
        postType: 'music',
        terms: {
            album: 'Альбомы',
            single: 'Синглы',
            ep: 'EP',
            playlist: 'Плейлисты',
            live: 'Концерты',
        },
    },
    news_cat: {
        label: 'Категории новостей',
        postType: 'news',
        terms: {
            society: 'Общество',
            sport: 'Спорт',
            celebrities: 'Знаменитости',
            interesting: 'Интересное',
            advertisement: 'Анонс',
        },
    },
    video_cat: {
        label: 'Категории видео',
        postType: 'video',
        terms: {
            clip: 'Клипы',
            concert: 'Концерты',
            live: 'Живые выступления',
            film: 'Фильмы',
            cool: 'Интересное',
        },
    },
} as const;

export type CustomTaxonomyT = keyof typeof CUSTOM_TAXONOMIES;

export interface ResolvedPostPathIF {
    kind: 'post';
    postSlug: string;
    termSegments: string[];
}

export interface ResolvedTermPathIF {
    kind: 'term';
    termSegments: string[];
    page: number;
}

export type ResolvedContentPathIF = ResolvedPostPathIF | ResolvedTermPathIF;

const ARCHIVE_PAGE_ID = /^[1-9]\d*$/;

export const isArchivePageId = (value: string): boolean =>
    ARCHIVE_PAGE_ID.test(value);

const TAXONOMY_BY_POST_TYPE: Partial<Record<PostTypeT, CustomTaxonomyT>> = {
    article: 'article_cat',
    music: 'music_cat',
    news: 'news_cat',
    video: 'video_cat',
};

export const getCustomTaxonomy = (
    postType: PostTypeT,
): CustomTaxonomyT | null => TAXONOMY_BY_POST_TYPE[postType] ?? null;

export const getDefaultTermSlugs = (postType: PostTypeT): string[] => {
    const taxonomy = getCustomTaxonomy(postType);

    if (!taxonomy) {
        return [];
    }

    return Object.keys(CUSTOM_TAXONOMIES[taxonomy].terms);
};

export const isDefaultTerm = (postType: PostTypeT, slug: string): boolean =>
    getDefaultTermSlugs(postType).includes(slug);

export const getTermLabel = (postType: PostTypeT, slug: string): string => {
    const taxonomy = getCustomTaxonomy(postType);

    if (!taxonomy) {
        return slug;
    }

    const terms: Record<string, string> = CUSTOM_TAXONOMIES[taxonomy].terms;

    return terms[slug] ?? slug;
};

export const getKnownTermLabel = (slug: string): string | null => {
    for (const taxonomy of Object.values(CUSTOM_TAXONOMIES)) {
        const terms: Record<string, string> = taxonomy.terms;

        if (terms[slug]) {
            return terms[slug];
        }
    }

    return null;
};

export const getTermSegmentsFromCategories = (
    postType: PostTypeT,
    categories: string[] | null | undefined,
): string[] => {
    const termSlug = categories?.find((category) =>
        isDefaultTerm(postType, category.trim()),
    );

    return termSlug ? [termSlug.trim()] : [];
};

export const nestPostUrl = (
    postType: PostTypeT,
    url: string,
    termSegments: string[],
): string => {
    const postSlug = url
        .split('?')[0]
        ?.split('#')[0]
        ?.split('/')
        .findLast(Boolean);

    if (!postSlug || termSegments.length === 0) {
        return url;
    }

    return `/${postType}/${termSegments.join('/')}/${postSlug}`;
};

export const resolveContentPath = (
    postType: PostTypeT,
    slug: string[],
): ResolvedContentPathIF | null => {
    const hasEmptySegment = slug.some((part) => !part.trim());
    const firstSegment = slug[0];

    if (!firstSegment || hasEmptySegment) {
        return null;
    }

    if (!getCustomTaxonomy(postType)) {
        return slug.length === 1
            ? { kind: 'post', postSlug: firstSegment, termSegments: [] }
            : null;
    }

    const lastSegment = slug.at(-1) ?? '';
    const hasPageId = slug.length > 1 && isArchivePageId(lastSegment);

    if (hasPageId) {
        const termSegments = slug.slice(0, -1);
        const termSlug = termSegments[0];

        if (
            termSlug &&
            (isDefaultTerm(postType, termSlug) || termSegments.length > 1)
        ) {
            return {
                kind: 'term',
                termSegments,
                page: Number(lastSegment),
            };
        }

        return null;
    }

    if (slug.length === 1) {
        if (isDefaultTerm(postType, firstSegment)) {
            return {
                kind: 'term',
                termSegments: [firstSegment],
                page: 1,
            };
        }

        return {
            kind: 'post',
            postSlug: firstSegment,
            termSegments: [],
        };
    }

    const termSegments = slug.slice(0, -1);
    const termSlug = termSegments[0];

    if (
        !termSlug ||
        (!isDefaultTerm(postType, termSlug) && termSegments.length === 1)
    ) {
        return null;
    }

    return {
        kind: 'post',
        postSlug: lastSegment,
        termSegments,
    };
};
