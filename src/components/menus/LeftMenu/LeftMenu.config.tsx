import { GiUnderwearShorts } from 'react-icons/gi';
import {
    IoNewspaperOutline,
    IoCalendarOutline,
    IoLibraryOutline,
    IoFilmOutline,
    IoHeadsetOutline,
    IoFingerPrintOutline,
} from 'react-icons/io5';
import { MdOutlineSportsSoccer } from 'react-icons/md';
import { MenuItemIF } from '@/types/common';

export const LEFT_MENU: MenuItemIF[] = [
    {
        url: '/admin',
        label: 'Админка',
        icon: <IoNewspaperOutline />,
    },
    {
        url: '/news',
        label: 'Новости',
        icon: <IoNewspaperOutline />,
    },
    {
        url: '/shorts',
        label: 'Шортс',
        icon: <GiUnderwearShorts />,
    },
    {
        url: '/sport',
        label: 'Спорт',
        icon: <MdOutlineSportsSoccer />,
    },
    {
        url: '/publications',
        label: 'Публикации',
        icon: <IoLibraryOutline />,
    },
    {
        url: '/music',
        label: 'Музыка',
        icon: <IoHeadsetOutline />,
    },
    {
        url: '/video',
        label: 'Видео',
        icon: <IoFilmOutline />,
    },
    {
        url: '/calendar',
        label: 'Календарь',
        icon: <IoCalendarOutline />,
        hasBorder: true,
    },
    {
        url: '/about',
        label: 'О нас',
        icon: <IoFingerPrintOutline />,
    },
];
