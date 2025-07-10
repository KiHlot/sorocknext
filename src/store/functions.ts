import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ErrorOption } from 'react-hook-form';
import { toast } from 'react-toastify';
import { cookies } from 'next/dist/server/request/cookies';
import { UserLoginResponseIF } from '@/api/jwt/types';
import { useLogout } from '@/hooks/useLogout';
import { getCookie } from '@/helpers/utils';
import { ERRORS, SERVER_ERRORS } from '@/configs/codes';
import { ADDRESS } from '@/configs/config';
import { ResponseErrorIF, ResponseIF } from '@/store/types';

const handleAuthError = (status: number, immediate = true) => {
    if ([401, 403].includes(status)) {
        useLogout(immediate);
    }
};

const showErrorToast = (status: number, statusText?: string) => {
    toast.error(
        SERVER_ERRORS[`e${status}`] || `Ошибка ${statusText || status}`,
    );
};

export const fetchRestApiQuery = (baseUrl?: string) => {
    return fetchBaseQuery({
        baseUrl: `${ADDRESS.WP_API_URL}${baseUrl || ''}`,
        prepareHeaders: headers => {
            const token = getCookie('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
        responseHandler: async (response): Promise<ResponseIF | void> => {
            if (response?.status !== 200) {
                showErrorToast(response.status, response.statusText);
                handleAuthError(response.status);
                return;
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

            if (data.result === 'redirect') {
                if (data.redirectUrl) {
                    window.location.href = data.redirectUrl;
                } else {
                    showErrorToast(500);
                }
            }

            if (data.result === 'logout') {
                useLogout(true);
            }

            return data;
        },
    });
};

export const fetchJWTTokenQuery = () => {
    return fetchBaseQuery({
        baseUrl: ADDRESS.WP_JWT_API_URL,
        responseHandler: async response => {
            if (response?.status !== 200) {
                toast.error(ERRORS.er209);
                return null;
            }
            return response.json();
        },
    });
};

export const getApi = async <ResultType>(
    route: string,
    cache: RequestCache = 'force-cache',
): Promise<ResultType | null | undefined> => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || null;

    try {
        console.log('fetch route:', `${ADDRESS.WP_API_URL}${route}`);
        const response = await fetch(`${ADDRESS.WP_API_URL}${route}`, {
            cache,
            ...(token
                ? {
                      credentials: 'include',
                      headers: {
                          Authorization: `Bearer ${token}`,
                      },
                  }
                : {}),
        });

        const { result, data }: ResponseIF<ResultType> = await response.json();

        return result === 'ok' ? data : null;
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
                type: 'server',
                message: `${ERRORS[error.code]}${error?.addInfo ? ` ${error.addInfo}` : ''}`,
            });
        }
    });
};

export const parseResponse = <FieldsNames, DataT = null>(
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
