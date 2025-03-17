import { HiOutlineMicrophone } from 'react-icons/hi';
import { IoNewspaperOutline } from 'react-icons/io5';
import { IoCalendarOutline } from 'react-icons/io5';
import { IoLibraryOutline } from 'react-icons/io5';
import { IoFilmOutline } from 'react-icons/io5';
import { IoFileTrayFullOutline } from 'react-icons/io5';
import { IoMegaphoneOutline } from 'react-icons/io5';
import { IoHeadsetOutline } from 'react-icons/io5';
import { IoTicketOutline } from 'react-icons/io5';
import { IoEarthOutline } from 'react-icons/io5';
import { IoFingerPrintOutline } from 'react-icons/io5';
import { PiFilmReel } from 'react-icons/pi';
import { SlSocialYoutube } from 'react-icons/sl';
import { MenuItemIF } from '@/types/common';

export const LEFT_MENU: MenuItemIF[] = [
    {
        url: '/news',
        label: 'Новости',
        icon: <IoNewspaperOutline />,
    },
    {
        url: '/calendar',
        label: 'Рок-дата',
        icon: <IoCalendarOutline />,
    },
    {
        url: '/autors',
        label: 'Посты',
        icon: <IoLibraryOutline />,
    },
    {
        url: '/cool',
        label: 'Видео',
        icon: <IoFilmOutline />,
    },
    {
        url: '/reviews',
        label: 'Рецензии',
        icon: <IoFileTrayFullOutline />,
    },
    {
        url: '/nocommerce',
        label: 'Новый рок',
        icon: <IoMegaphoneOutline />,
        hasBorder: true,
    },
    {
        url: '/alboms',
        label: 'Альбомы',
        icon: <IoHeadsetOutline />,
    },
    {
        url: '/clips',
        label: 'Клипы',
        icon: <SlSocialYoutube />,
    },
    {
        url: '/concerts',
        label: 'Концерты',
        icon: <IoTicketOutline />,
    },
    {
        url: '/rock-films',
        label: 'Фильмы',
        icon: <PiFilmReel />,
    },
    {
        url: '/intervju',
        label: 'Интервью',
        icon: <HiOutlineMicrophone />,
    },
    {
        url: '/okolorock',
        label: 'Вокруг рока',
        icon: <IoEarthOutline />,
        hasBorder: true,
    },
    {
        url: '/about',
        label: 'О нас',
        icon: <IoFingerPrintOutline />,
    },
];
