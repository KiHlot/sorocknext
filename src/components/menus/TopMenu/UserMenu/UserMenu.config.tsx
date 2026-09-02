import {
    IoPersonCircleOutline,
    IoExitOutline,
    IoEnterOutline,
    IoPersonAddOutline,
} from 'react-icons/io5';
import { PiUserCheck } from 'react-icons/pi';
import { RiChatPrivateLine } from 'react-icons/ri';
import { TbPasswordFingerprint } from 'react-icons/tb';
import { MenuItemIF } from '@/types/common';
import { CurrentUserIF } from '@/types/user';
import { STORAGE_KEYS } from '@/helpers/storage/storage.config';
import { getSessionStorageItem } from '@/helpers/storage/storage.helpers';

export const MENU_USER: MenuItemIF[] = [
    {
        url: '/profile',
        label: 'Профиль',
        icon: <IoPersonCircleOutline />,
    },
    {
        url: '',
        label: 'Выход',
        icon: <IoExitOutline />,
        callBackType: 'logout',
    },
];

export const MENU_GUEST: MenuItemIF[] = [
    {
        url: '/login',
        label: 'Вход',
        icon: <IoEnterOutline />,
    },
    {
        url: '/registration',
        label: 'Регистрация',
        icon: <IoPersonAddOutline />,
    },
    {
        url: '/reset-password',
        label: 'Забыли пароль?',
        icon: <TbPasswordFingerprint />,
    },
];

const ADMIN_MENU: MenuItemIF[] = [
    {
        url: '/admin',
        label: 'Админка',
        icon: <RiChatPrivateLine />,
    },
];

const ACTIVATE_MENU: MenuItemIF[] = [
    {
        url: '/confirm-account',
        label: 'Подтверждение',
        icon: <PiUserCheck />,
    },
];

export const getUserMenu = (): MenuItemIF[] => {
    const currentUser = getSessionStorageItem<CurrentUserIF>(
        STORAGE_KEYS.CurrentUser,
    );

    const baseMenu = currentUser ? MENU_USER : MENU_GUEST;

    const adminMenu = currentUser?.role === 'administrator' ? ADMIN_MENU : [];

    const activateMenu =
        currentUser && !currentUser.isActivated ? ACTIVATE_MENU : [];

    return [...adminMenu, ...activateMenu, ...baseMenu];
};
