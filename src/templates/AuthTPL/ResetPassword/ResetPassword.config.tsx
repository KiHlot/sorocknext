import { IoMailOutline } from 'react-icons/io5';
import { PiPassword } from 'react-icons/pi';
import { ButtonGroupIF } from '@/components/interactive/ButtonsGroup/ButtonsGroup.types';
import { ActiveTabT } from '@/templates/AuthTPL/ResetPassword/ResetPassword.types';

export const RESET_PASS_BUTTONS: ButtonGroupIF<ActiveTabT>[] = [
    {
        key: 'mail',
        label: (
            <>
                <IoMailOutline />
                Получить код
            </>
        ),
    },
    {
        key: 'code',
        label: (
            <>
                <PiPassword />
                Ввести код
            </>
        ),
    },
];
