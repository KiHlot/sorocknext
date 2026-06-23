import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';
import { deleteCookie } from '@/helpers/utils';

export function useLogout(isSilent?: boolean) {
    if (typeof window === 'undefined') {
        return null;
    }

    sessionStorage.removeItem('currentUser');
    deleteCookie('token');
    !isSilent && toast.warning('Вы вышли из аккаунта!');

    setTimeout(() => {
        redirect('/auth');
    }, 2000);
}
