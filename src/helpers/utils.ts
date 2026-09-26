import dayjs from 'dayjs';
import {
    DirectionT,
    FilterIF,
    NormalizeFilterIF,
    NormalizeImageTypeT,
} from '@/types/common';
import empty_user_250_250 from '@/images/img/empty_user_250_250.png';
import empty_user_500_500 from '@/images/img/empty_user_500_500.png';
import empty_user_80_80 from '@/images/img/empty_user_80_80.png';
import { TIME_FORMATS } from '@/configs/timeFormats.config';

export const shuffle = <T>(array: T[]): T[] => {
    const arrayCopy = [...array];

    for (let i = arrayCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [arrayCopy[i]!, arrayCopy[j]!] = [arrayCopy[j]!, arrayCopy[i]!];
    }

    return arrayCopy;
};

export const formatDate = (backDate?: string, type?: 'withTime'): string => {
    if (!backDate) {
        return '';
    }

    const parsed = dayjs(backDate, TIME_FORMATS.BackDateWithTime);

    if (!parsed.isValid()) {
        return '';
    }

    const uiFormat =
        type === 'withTime' ? TIME_FORMATS.DateWithTimeUi : TIME_FORMATS.DateUi;

    return `${parsed.format(uiFormat)}${type ? '' : 'г.'}`;
};

export const normalizeImage = (
    url: string | null | undefined,
    type: NormalizeImageTypeT,
): string => {
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
