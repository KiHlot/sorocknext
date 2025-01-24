import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ErrorOption } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ResponseErrorIF, ResponseIF } from '@/store/types';
import { logout } from '@/helpers/auth/logout';
import { ADDRESS } from '@/helpers/config';
import { ERRORS, SERVER_ERRORS } from '@/helpers/errors';
import { getCookie } from '@/helpers/utils';

export const fetchRestApiQuery = (baseUrl: string) => {
    return fetchBaseQuery({
        baseUrl: `${ADDRESS.WP_API_URL}${baseUrl}`,
        prepareHeaders: headers => {
            const token = getCookie('token');

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
        responseHandler: async (response): Promise<ResponseIF | null> => {
            if (response?.status !== 200) {
                toast.error(
                    SERVER_ERRORS[`e${response.status}`] ||
                        `Ошибка ${response.statusText || response.status}`,
                );

                if ([401, 403].includes(response?.status)) {
                    logout();
                }

                return null;
            }

            const data: ResponseIF = await response.json();

            if (data.result === 'errors' && data.errors?.length) {
                data.errors.forEach(({ code, fieldName }) => {
                    if (!fieldName) {
                        toast.error(
                            ERRORS[code] ||
                                `Код ошибки: ${code || 'Неизвестно'}`,
                        );
                    }
                });
            }

            if (data.result === 'redirect' && data.redirectTo?.text) {
                toast.warning(`${data.redirectTo?.text} Готовим редирект!`);
            }

            if (data.result === 'logout') {
                logout();
            }

            return data;
        },
    });
};

export const getApi = async <ResultType>(
    route: string,
): Promise<ResultType | undefined> => {
    try {
        console.log('fetch route:', `${ADDRESS.WP_API_URL}/${route}`);
        const response = await fetch(`${ADDRESS.WP_API_URL}/${route}`, {
            cache: 'force-cache',
        });
        return await response.json();
    } catch (e) {
        console.error('error', e);
    }
};

export const setCustomError = <FieldsNames>(
    errors?: ResponseErrorIF[],
    setError?: (name: FieldsNames, error: ErrorOption) => void,
) => {
    if (!errors?.length || !setError) return;

    errors?.forEach(error => {
        if (error.fieldName) {
            setError(error.fieldName as FieldsNames, {
                type: 'manual',
                message: ERRORS[error.code],
            });
        }
    });
};

export const parseResponse = <FieldsNames, DataT>(
    data: ResponseIF<DataT>,
    callback: (data: DataT | null) => void,
    setError?: (name: FieldsNames, error: ErrorOption) => void,
): void => {
    switch (data?.result) {
        case 'ok':
            callback(data?.data || null);
            break;
        case 'errors':
            setCustomError<FieldsNames>(data.errors, setError);
            break;
        case 'redirect':
            console.log('redirect');
            break;
        default:
            break;
    }
};
