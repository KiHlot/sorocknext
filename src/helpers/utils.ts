import dayjs from 'dayjs';
import { TIME_FORMAT } from '@/helpers/config';
import { CookieOptionsT } from '@/types/common';

export const shuffle = (array: any) => {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
};

export const setCookie = (
    name: string,
    value: string,
    options?: CookieOptionsT,
): void => {
    options = {
        path: '/',
        ...options,
    };
    if (options.expires) {
        options.expires = dayjs(options.expires, TIME_FORMAT.common).toDate();
    }

    let updatedCookie =
        encodeURIComponent(name) + '=' + encodeURIComponent(value);

    const optionKeys: (keyof CookieOptionsT)[] = [
        'expires',
        'path',
        'domain',
        'secure',
        'samesite',
    ];

    for (const key of optionKeys) {
        const optionValue = options[key];
        if (optionValue !== undefined) {
            updatedCookie += '; ' + (key as string);
            if (optionValue !== true) {
                updatedCookie += '=' + optionValue;
            }
        }
    }

    document.cookie = updatedCookie;
};

export const getCookie = (name: string): string | null => {
    const matches = document.cookie.match(
        new RegExp(
            '(?:^|; )' + name.replace(/([.$?*|{}()+^])/g, '\\$1') + '=([^;]*)',
        ),
    );
    return matches ? decodeURIComponent(matches[1]) : null;
};

export const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const getLocalStorageItem = <ReturnType>(
    name: string,
): ReturnType | null => {
    const storageData: string | null = window.sessionStorage.getItem(name);

    if (!storageData || storageData === 'undefined') {
        return null;
    }

    const parsedStorageData: ReturnType | {} | boolean =
        !!storageData && JSON.parse(storageData);

    return parsedStorageData && Object.values(parsedStorageData).length
        ? (parsedStorageData as ReturnType)
        : null;
};

export const getFormattedPathName = (pathname: string) => {
    return pathname.length > 1 && pathname.endsWith('/')
        ? pathname.slice(0, -1)
        : pathname;
};

export const deleteSearchParams = () => {
    window.history.replaceState(
        {},
        document.title,
        `${window.location.origin}${window.location.pathname}`,
    );
};
