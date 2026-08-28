import { ValueOfT } from '@/types/common';
import {
    SERVER_CODES,
    SERVER_ERRORS,
} from '@/helpers/validation/codes/codes.config';
import {
    CatchErrorIF,
    RTQErrorIF,
    ServerErrorDetailsIF,
} from '@/helpers/validation/error/error.types';

const isRTQError = (error: unknown): error is RTQErrorIF =>
    !!error &&
    typeof error === 'object' &&
    ('originalStatus' in error ||
        'error' in error ||
        ('data' in error && typeof error.data === 'string'));

const isServerError = (error: unknown): error is ServerErrorDetailsIF =>
    !!error &&
    typeof error === 'object' &&
    'data' in error &&
    !!error.data &&
    typeof error.data === 'object' &&
    'data' in error.data &&
    typeof error.data?.data === 'object';

export const catchError = (error: unknown): CatchErrorIF => {
    let status = null;

    if (isRTQError(error)) {
        status = error.originalStatus || error.status;
    }

    if (isServerError(error)) {
        status = error.status || error.data?.data?.status;
    }

    return {
        status: String(status || SERVER_CODES.C500) as ValueOfT<
            typeof SERVER_CODES
        >,
        message: SERVER_ERRORS[status || SERVER_CODES.C500],
    };
};
