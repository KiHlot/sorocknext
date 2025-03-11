import { toast } from 'react-toastify';
import { redirect } from '~/next/navigation';
import { deleteCookie } from '@/helpers/utils';

export function useLogout() {
    if (typeof window === 'undefined') return null;

    sessionStorage.removeItem('profileData');
    deleteCookie('token');
    toast.warning('Вы вышли из аккаунта!');

    setTimeout(() => {
        redirect('/auth');
    }, 2000);
}
