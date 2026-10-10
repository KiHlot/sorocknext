import { MAGIC_NUMBERS } from '@/configs/magicNumbers.config';

export const LATEST_POSTS_TITLE_ID = 'latest-posts-title';

export const LATEST_POSTS_LIMIT = MAGIC_NUMBERS.LatestPostsLimit;

export const LATEST_POSTS_COPY = {
    title: 'Последние',
    dotsLabel: 'Слайды публикаций',
} as const;

export const getLatestPostsSlideLabel = (
    index: number,
    total: number,
): string => `Публикация ${index + 1} из ${total}`;
