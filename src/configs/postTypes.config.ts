export const POST_TYPES = {
    article: 'Статьи',
    journal: 'Журнал',
    music: 'Музыка',
    news: 'Новости',
    quiz: 'Тесты',
    'rock-data': 'Рок даты',
    'site-archive': 'Архивные материалы',
    stars: 'Звезды',
    video: 'Видео',
} as const;

export type PostTypeT = keyof typeof POST_TYPES;

export const POST_TYPE_SLUGS = Object.keys(POST_TYPES) as PostTypeT[];

export const isPostType = (value: string): value is PostTypeT =>
    value in POST_TYPES;
