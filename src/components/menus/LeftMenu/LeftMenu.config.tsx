import {
    IoNewspaperOutline,
    IoLibraryOutline,
    IoHeadsetOutline,
    IoFilmOutline,
    IoBookOutline,
    IoHelpCircleOutline,
    IoStarOutline,
    IoCalendarOutline,
    IoArchiveOutline,
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
        url: '/article',
        label: 'Статьи',
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
        url: '/journal',
        label: 'Журнал',
        icon: <IoBookOutline />,
    },
    {
        url: '/quiz',
        label: 'Тесты',
        icon: <IoHelpCircleOutline />,
    },
    {
        url: '/stars',
        label: 'Звезды',
        icon: <IoStarOutline />,
    },
    {
        url: '/rock-data',
        label: 'Рок даты',
        icon: <IoCalendarOutline />,
    },
    {
        url: '/site-archive',
        label: 'Архив',
        icon: <IoArchiveOutline />,
        hasBorder: true,
    },
    {
        url: '/about',
        label: 'О нас',
        icon: <IoFingerPrintOutline />,
    },
];
