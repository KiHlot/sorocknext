import { IoEnterOutline } from 'react-icons/io5';
import { LuUserRoundPlus } from 'react-icons/lu';
import { TbArrowBackUp } from 'react-icons/tb';
import { ButtonGroupIF } from '@/components/interactive/ButtonsGroup/ButtonsGroup.types';

export const AUTH_BUTTONS_GROUP_CONFIG: ButtonGroupIF[] = [
    {
        key: 'login',
        label: (
            <>
                <IoEnterOutline />
                Вход
            </>
        ),
        href: '/login',
    },
    {
        key: 'registration',
        label: (
            <>
                <LuUserRoundPlus />
                Регистрация
            </>
        ),
        href: '/registration',
    },
    {
        key: 'reset-password',
        label: (
            <>
                <TbArrowBackUp />
                Сброс пароля
            </>
        ),
        href: '/reset-password',
    },
];
