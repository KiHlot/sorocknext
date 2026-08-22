import { toast } from 'react-toastify';
import { ResponseIF } from '@/types/api';
import { ParseResponseCallbackIF } from '@/helpers/fetchRestApi/fetchRestApi.types';
import { logout } from '@/helpers/logout/logout';
import { ERRORS_CODES } from '@/helpers/validation/codes/codes.config';

export const parseResponse = <DataT = null>(
    data: ResponseIF<DataT>,
    callback: (payload: ParseResponseCallbackIF<DataT>) => void,
): void => {
    if (!data || !data.result) {
        toast.error(ERRORS_CODES.er900);
        return;
    }

    switch (data.result) {
        case 'ok':
        case 'errors': {
            callback({
                data: data?.data || null,
                errors: data?.errors || null,
            });
            break;
        }
        case 'logout': {
            toast.error(ERRORS_CODES.er222);
            logout();
            break;
        }
        case 'redirect': {
            if (data.redirectUrl) {
                window.location.href = data.redirectUrl;
            } else {
                toast.error(ERRORS_CODES.er900);
            }
            break;
        }
        case 'notfound': {
            toast.error(ERRORS_CODES.er900);
            break;
        }
        default: {
            toast.error(ERRORS_CODES.er900);
            break;
        }
    }
};
