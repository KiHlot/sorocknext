import {
    IoPersonCircleOutline,
    IoExitOutline,
    IoEnterOutline,
    IoPersonAddOutline,
} from 'react-icons/io5';
import { PiUserCheck } from 'react-icons/pi';
import { RiChatPrivateLine } from 'react-icons/ri';
import { TbPasswordFingerprint } from 'react-icons/tb';
import { getStorageItem } from '@/helpers/utils';
import { MenuItemIF } from '@/types/common';
import { CurrentUserIF } from '@/types/user';

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
        url: '/auth',
        label: 'Вход',
        icon: <IoEnterOutline />,
    },
    {
        url: '/auth/registration',
        label: 'Регистрация',
        icon: <IoPersonAddOutline />,
    },
    {
        url: '/auth/reset-password',
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
        url: '/auth/confirm-account',
        label: 'Подтверждение',
        icon: <PiUserCheck />,
    },
];

export const getUserMenu = (): MenuItemIF[] => {
    const profileData = getStorageItem<CurrentUserIF>('profileData');

    const baseMenu = profileData ? MENU_USER : MENU_GUEST;

    const adminMenu = profileData?.role === 'administrator' ? ADMIN_MENU : [];

    const activateMenu =
        profileData && !profileData.isActivated ? ACTIVATE_MENU : [];

    return [...adminMenu, ...activateMenu, ...baseMenu];
};
