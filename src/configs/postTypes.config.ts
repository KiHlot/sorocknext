export const POST_TYPES = {
    news: 'Новости',
    autors: 'Статьи',
    cool: 'Видео',
    nocommerce: 'Новый рок',
    reviews: 'Рецензии',
    'rock-data': 'Рок-дата',
} as const;

export type PostTypeT = keyof typeof POST_TYPES;

export const POST_TYPE_SLUGS = Object.keys(POST_TYPES) as PostTypeT[];

export const isPostType = (value: string): value is PostTypeT =>
    value in POST_TYPES;
