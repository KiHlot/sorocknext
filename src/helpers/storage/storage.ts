import { StorageKeyT } from '@/helpers/storage/storage.config';
import { CookieOptionsT } from '@/helpers/storage/storage.types';

export const setCookie = (
    name: StorageKeyT,
    value: string,
    options: CookieOptionsT = {},
): void => {
    const { expires, maxAge, path = '/', domain, secure, samesite } = options;

    const parts = [
        `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
        expires && `expires=${expires}`,
        maxAge && `max-age=${maxAge}`,
        path && `path=${path}`,
        domain && `domain=${domain}`,
        secure && 'secure',
        samesite && `samesite=${samesite}`,
    ].filter(Boolean);

    document.cookie = parts.join('; ');
};

export const getCookie = (name: StorageKeyT): string | null => {
    const matches = document.cookie.match(
        new RegExp(
            `(?:^|; )${name.replaceAll(/([.$?*|{}()+^])/g, String.raw`\$1`)}=([^;]*)`,
        ),
    );
    return matches ? decodeURIComponent(matches[1]) : null;
};

export const deleteCookie = (name: StorageKeyT): void => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const getSessionStorageItem = <ReturnType>(
    name: StorageKeyT,
): ReturnType | null => {
    if (typeof window === 'undefined') {
        return null;
    }

    const storageData: string | null = sessionStorage.getItem(name);

    if (
        !storageData ||
        ['null', 'undefined', '', '{}', 'false'].includes(storageData)
    ) {
        return null;
    }

    try {
        return JSON.parse(storageData);
    } catch {
        return null;
    }
};

export const setSessionStorageItem = <T = unknown>(
    itemName: StorageKeyT,
    data?: T | null,
): boolean => {
    if (typeof window === 'undefined') {
        return false;
    }

    try {
        if (!data) {
            sessionStorage.removeItem(itemName);
            return true;
        }

        sessionStorage.setItem(itemName, JSON.stringify(data));
        return true;
    } catch {
        sessionStorage.removeItem(itemName);
        return false;
    }
};

export const getLocalStorageItem = <ReturnType>(
    name: StorageKeyT,
): ReturnType | null => {
    if (typeof window === 'undefined') {
        return null;
    }

    const storageData: string | null = localStorage.getItem(name);

    if (
        !storageData ||
        ['null', 'undefined', '', '{}', 'false'].includes(storageData)
    ) {
        return null;
    }

    try {
        return JSON.parse(storageData);
    } catch {
        return null;
    }
};

export const setLocalStorageItem = <T = unknown>(
    itemName: StorageKeyT,
    data?: T | null,
): boolean => {
    if (typeof window === 'undefined') {
        return false;
    }

    try {
        if (!data) {
            localStorage.removeItem(itemName);
            return true;
        }

        localStorage.setItem(itemName, JSON.stringify(data));
        return true;
    } catch {
        localStorage.removeItem(itemName);
        return false;
    }
};
