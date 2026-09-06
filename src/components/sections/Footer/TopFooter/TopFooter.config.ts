export const FOOTER_MENU = {
    CategoriesMenu: {
        label: 'Категории',
        menuList: [
            {
                url: '/clips',
                label: 'Клипы',
            },
            {
                url: '/alboms',
                label: 'Альбомы',
            },
            {
                url: '/concerts',
                label: 'Концерты',
            },
            {
                url: '/rock-films',
                label: 'Фильмы',
            },
            {
                url: '/intervju',
                label: 'Интервью',
            },
            {
                url: '/okolorock',
                label: 'Вокруг рока',
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
                url: '/rock-data',
                label: 'Рок-дата',
            },
            {
                url: '/cool',
                label: 'Видео',
            },
            {
                url: '/reviews',
                label: 'Рецензии',
            },
            {
                url: '/nocommerce',
                label: 'Новый рок',
            },
            {
                url: '/autors',
                label: 'Статьи',
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
