import { IoEnterOutline } from 'react-icons/io5';
import { LuUserRoundPlus } from 'react-icons/lu';
import { TbArrowBackUp } from 'react-icons/tb';
import { ButtonGroupIF } from '@/components/interactive/ButtonsGroup/ButtonsGroup.types';

export const AUTH_TPL_CONFIG: ButtonGroupIF[] = [
    {
        key: 'auth',
        label: (
            <>
                <IoEnterOutline />
                Вход
            </>
        ),
        href: '/auth',
    },
    {
        key: 'registration',
        label: (
            <>
                <LuUserRoundPlus />
                Регистрация
            </>
        ),
        href: '/auth/registration',
    },
    {
        key: 'reset-password',
        label: (
            <>
                <TbArrowBackUp />
                Сброс пароля
            </>
        ),
        href: '/auth/reset-password',
    },
];
