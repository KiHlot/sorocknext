import { SlSocialYoutube } from 'react-icons/sl';
import { MenuItemIF } from '@/types/common';
import { UserMenuIF } from '@/types/user';

export const COMMON_MENU: MenuItemIF[] = [];

export const MENU_USER: MenuItemIF[] = [
    {
        url: '/auth',
        label: 'Вход',
        icon: <SlSocialYoutube />,
    },
];

export const MENU_GUEST: MenuItemIF[] = [
    {
        url: '/auth',
        label: 'Вход',
        icon: <SlSocialYoutube />,
    },
    {
        url: '/auth/registration',
        label: 'Регистрация',
        icon: <SlSocialYoutube />,
    },
    {
        url: '/auth/reset-password',
        label: 'Забыли пароль?',
        icon: <SlSocialYoutube />,
    },
];

export const getUserMenu = (userData?: UserMenuIF) => {

    return [
        ...(userData
            ? [
                  {
                      url: userData?.userUrl,
                      label: 'Профиль',
                      icon: <SlSocialYoutube />,
                  },
                  {
                      url: '',
                      label: 'Выход',
                      icon: <SlSocialYoutube />,
                      callBackType: 'logout',
                  },
              ]
            : MENU_GUEST),
        ...(userData?.role === 'administrator'
            ? [
                  {
                      url: '/admin',
                      label: 'Админка',
                      icon: <SlSocialYoutube />,
                  },
              ]
            : []),
    ];
};
