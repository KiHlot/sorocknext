'use client';

import { LOGOUT_DELAY } from '@/helpers/logout/logout.config';
import { STORAGE_KEYS } from '@/helpers/storage/storage.config';
import {
    deleteCookie,
    setSessionStorageItem,
} from '@/helpers/storage/storage.helpers';

export const logout = async (): Promise<void> => {
    setSessionStorageItem(STORAGE_KEYS.CurrentUser, null);
    deleteCookie(STORAGE_KEYS.Token);

    setTimeout(() => {
        window.location.href = '/auth';
    }, LOGOUT_DELAY);
};
