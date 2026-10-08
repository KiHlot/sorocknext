export const FOOTER_MENU = {
    CategoriesMenu: {
        label: 'Категории',
        menuList: [
            {
                url: '/video/clip',
                label: 'Клипы',
            },
            {
                url: '/music/album',
                label: 'Альбомы',
            },
            {
                url: '/video/concert',
                label: 'Концерты',
            },
            {
                url: '/video/film',
                label: 'Фильмы',
            },
            {
                url: '/articles/interview',
                label: 'Интервью',
            },
        ],
    },
    PostTypesMenu: {
        label: 'Разделы сайта',
        menuList: [
            {
                url: '/news',
                label: 'Новости',
            },
            {
                url: '/articles',
                label: 'Статьи',
            },
            {
                url: '/music',
                label: 'Музыка',
            },
            {
                url: '/video',
                label: 'Видео',
            },
            {
                url: '/journal',
                label: 'Журнал',
            },
            {
                url: '/quiz',
                label: 'Тесты',
            },
            {
                url: '/stars',
                label: 'Звезды',
            },
            {
                url: '/rock-data',
                label: 'Рок даты',
            },
            {
                url: '/site-archive',
                label: 'Архив',
            },
        ],
    },
    InfoMenu: {
        label: 'Инфо',
        menuList: [
            {
                url: '/users',
                label: 'Пользователи',
            },
            {
                url: '/activity',
                label: 'Активность на сайте',
            },
            {
                url: '/about',
                label: 'О нас',
            },
        ],
    },
} as const;
