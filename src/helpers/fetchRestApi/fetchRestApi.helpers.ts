import { toast } from 'react-toastify';
import { ResponseErrorIF, ResponseIF } from '@/types/api';
import { ERRORS, SERVER_ERRORS } from '@/configs/codes';
import { logout } from '@/helpers/auth/auth';

export const parseResponse = <DataT = null>(
    data: ResponseIF<DataT>,
    onSuccess: (data: DataT | null) => void,
    onError: (errors: ResponseErrorIF[] | null) => void,
): void => {
    if (!data || !data.result) {
        toast.error(SERVER_ERRORS.e900);
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
            toast.error(ERRORS.er222);
            logout();
            break;
        }
        case 'redirect': {
            if (data.redirectUrl) {
                window.location.href = data.redirectUrl;
            } else {
                toast.error(SERVER_ERRORS.e900);
            }
            break;
        }
        case 'notfound': {
            toast.error(SERVER_ERRORS.e900);
            break;
        }
        default: {
            toast.error(SERVER_ERRORS.e900);
            break;
        }
    }
};
