import { ValueOf } from '@/types/common';

export const SESSION_STORAGE_KEYS = {
    CurrentUser: 'CurrentUser',
} as const;

// export const LOCAL_STORAGE_KEYS = {
//     ClothingForm: 'ClothingForm',
// } as const;

export const COOKIE_KEYS = {
    Token: 'Token',
} as const;

export const STORAGE_KEYS = {
    ...COOKIE_KEYS,
    ...SESSION_STORAGE_KEYS,
    // ...LOCAL_STORAGE_KEYS,
} as const;

export type StorageKeyT = ValueOf<typeof STORAGE_KEYS>;
