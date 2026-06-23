import dayjs from 'dayjs';
import {
    CookieOptionsT,
    DirectionT,
    FilterIF,
    NormalizeFilterIF,
    NormalizeImageTypeT,
} from '@/types/common';
import empty_user_80_80 from '@/images/img/empty_user_80_80.png';
import empty_user_250_250 from '@/images/img/empty_user_250_250.png';
import empty_user_500_500 from '@/images/img/empty_user_500_500.png';
import { TIME_FORMAT } from '@/configs/config';

export const shuffle = <T>(array: T[]): T[] => {
    const arrayCopy = [...array];

    for (let index = arrayCopy.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [arrayCopy[index], arrayCopy[randomIndex]] = [
            arrayCopy[randomIndex],
            arrayCopy[index],
        ];
    }
    return arrayCopy;
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
        options.expires = dayjs(options.expires, TIME_FORMAT.cookie).toDate();
    }

    let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

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
            updatedCookie += `; ${key}`;
            if (optionValue !== true) {
                updatedCookie += `=${optionValue}`;
            }
        }
    }

    document.cookie = updatedCookie;
};

export const formatDate = (backDate?: string, type?: 'withTime') => {
    if (!backDate) {
        return 'Нет даты';
    }

    const uiFormat =
        type === 'withTime' ? TIME_FORMAT.dateWithTime : TIME_FORMAT.dateUi;

    return `${dayjs(backDate, TIME_FORMAT.backDateWithTime).format(uiFormat)}${type ? '' : 'г.'}`;
};

export const getCookie = (name: string): string | null => {
    const matches = document.cookie.match(
        new RegExp(
            `(?:^|; )${name.replaceAll(/([.$?*|{}()+^])/g, String.raw`\$1`)}=([^;]*)`,
        ),
    );
    return matches ? decodeURIComponent(matches[1]) : null;
};

export const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const getStorageItem = <ReturnType = string>(
    name: string,
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

export const setStorageItem = <T>(
    data: T | null | undefined,
    itemName: string,
): boolean => {
    if (typeof window === 'undefined') {
        return false;
    }

    try {
        if (!data) {
            sessionStorage.removeItem(itemName);
        }

        sessionStorage.setItem(itemName, JSON.stringify(data));
        return true;
    } catch {
        sessionStorage.removeItem(itemName);
        return false;
    }
};

export const normalizeImage = (
    url: string | null | undefined,
    type: NormalizeImageTypeT,
) => {
    if (url) {
        return url;
    }

    switch (type) {
        case 'user80': {
            return empty_user_80_80.src;
        }
        case 'user250': {
            return empty_user_250_250.src;
        }
        case 'user500': {
            return empty_user_500_500.src;
        }
        default: {
            return '';
        }
    }
};

export const normalizeFilter = ({
    page,
    column,
    direction,
}: NormalizeFilterIF): string => {
    const filter: FilterIF = {
        page: Number(page) || 1,
        column: column || 'id',
        direction: (direction || 'desc') as DirectionT,
    };

    return Object.entries(filter)
        .map(
            ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
        )
        .join('&');
};
