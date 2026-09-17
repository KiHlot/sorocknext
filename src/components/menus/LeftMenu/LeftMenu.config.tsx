import { GiUnderwearShorts } from 'react-icons/gi';
import {
    IoNewspaperOutline,
    IoCalendarOutline,
    IoLibraryOutline,
    IoFilmOutline,
    IoHeadsetOutline,
    IoFingerPrintOutline,
} from 'react-icons/io5';
import { MenuItemIF } from '@/types/common';

export const LEFT_MENU: MenuItemIF[] = [
    {
        url: '/news',
        label: 'Новости',
        icon: <IoNewspaperOutline />,
    },
    {
        url: '/autors',
        label: 'Статьи',
        icon: <IoLibraryOutline />,
    },
    {
        url: '/cool',
        label: 'Видео',
        icon: <IoFilmOutline />,
    },
    {
        url: '/nocommerce',
        label: 'Новый рок',
        icon: <GiUnderwearShorts />,
    },
    {
        url: '/reviews',
        label: 'Рецензии',
        icon: <IoHeadsetOutline />,
    },
    {
        url: '/rock-data',
        label: 'Рок дата',
        icon: <IoCalendarOutline />,
        hasBorder: true,
    },
    {
        url: '/about',
        label: 'О нас',
        icon: <IoFingerPrintOutline />,
    },
];
