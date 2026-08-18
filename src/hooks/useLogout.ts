import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';
import { deleteCookie } from '@/helpers/utils';

const DELAY = 2000;

export const useLogout = (isSilent?: boolean): void => {
    if (typeof window === 'undefined') {
        return;
    }

    sessionStorage.removeItem('currentUser');
    deleteCookie('token');

    if (!isSilent) {
        toast.warning('Вы вышли из аккаунта!');
    }

    setTimeout(() => {
        redirect('/auth');
    }, DELAY);
};
