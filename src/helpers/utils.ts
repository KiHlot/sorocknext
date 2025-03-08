import dayjs from 'dayjs';
import empty_user_80_80 from '@/images/img/empty_user_80_80.png';
import empty_user_250_250 from '@/images/img/empty_user_250_250.png';
import empty_user_500_500 from '@/images/img/empty_user_500_500.png';
import { TIME_FORMAT } from '@/helpers/config';
import {
    CookieOptionsT,
    DirectionT,
    FilterIF,
    NormalizeFilterIF,
    NormalizeImageTypeT,
} from '@/types/common';

export const shuffle = <T>(array: T[]): T[] => {
    const arrayCopy = [...array];

    for (let i = arrayCopy.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [arrayCopy[i], arrayCopy[randomIndex]] = [
            arrayCopy[randomIndex],
            arrayCopy[i],
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

export const normalizeImage = (
    url: string | null | undefined,
    type: NormalizeImageTypeT,
) => {
    if (url) return url;

    switch (type) {
        case 'user80':
            return empty_user_80_80.src;
        case 'user250':
            return empty_user_250_250.src;
        case 'user500':
            return empty_user_500_500.src;
        default:
            return '';
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
