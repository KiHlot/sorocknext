import { redirect } from 'next/navigation';
import { LOGOUT_DELAY } from '@/helpers/auth/auth.config';
import { deleteCookie, setSessionStorageItem } from '@/helpers/storage/storage';
import { STORAGE_KEYS } from '@/helpers/storage/storage.config';

export const logout = async (): Promise<void> => {
    setSessionStorageItem(STORAGE_KEYS.CurrentUser, null);
    deleteCookie(STORAGE_KEYS.Token);

    setTimeout(() => {
        redirect('/auth');
    }, LOGOUT_DELAY);
};
