import { GoTasklist } from 'react-icons/go';
import { GrOverview } from 'react-icons/gr';
import { IoSkullOutline } from 'react-icons/io5';
import { MenuItemIF } from '@/types/common';

export const ADMIN_MENU: MenuItemIF[] = [
    {
        url: '/admin',
        label: 'Обзор',
        icon: <GrOverview />,
        hasBorder: true,
    },
    {
        url: '/admin/cron',
        label: 'Крон',
        icon: <GoTasklist />,
    },
    {
        url: '/admin/users',
        label: 'Пользователи',
        icon: <IoSkullOutline />,
    },
];
