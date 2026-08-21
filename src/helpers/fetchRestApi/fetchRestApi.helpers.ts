import { toast } from 'react-toastify';
import { ResponseErrorIF, ResponseIF } from '@/types/api';
import { logout } from '@/helpers/logout/logout';
import { ERRORS_CODES } from '@/helpers/validation/codes/codes.config';

export const parseResponse = <DataT = null>(
    data: ResponseIF<DataT>,
    onSuccess: (data: DataT | null) => void,
    onError: (errors: ResponseErrorIF[] | null) => void,
): void => {
    if (!data || !data.result) {
        toast.error(ERRORS_CODES.er900);
        return;
    }

    switch (data.result) {
        case 'ok': {
            onSuccess(data?.data || null);
            break;
        }
        case 'errors': {
            onError(data?.errors || null);
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
