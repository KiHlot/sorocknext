import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ResponseIF } from '@/store/types';
import { logout } from '@/helpers/auth/logout';
import { ADDRESS } from '@/helpers/config';
import { ERRORS, SERVER_ERRORS } from '@/helpers/errors';
import { getCookie } from '@/helpers/utils';

export const fetchAuthBaseQuery = () => {
    return fetchBaseQuery({
        baseUrl: ADDRESS.WP_AJAX_URL,
        responseHandler: async (response): Promise<ResponseIF> => {
            if (response?.status !== 200) {
                // errorNotify(
                //     SERVER_ERRORS[`e${response.status}`] ||
                //         `Ошибка ${response.status}`,
                //     `Код ошибки: ${response.status}`,
                // );
            }

            const data: ResponseIF = await response.json();

            if (data.result === 'errors' && data.errors?.length) {
                data.errors.forEach(({ code, fieldName }) => {
                    if (!fieldName) {
                        // errorNotify(
                        //     ERRORS[code] ||
                        //         `Код ошибки: ${code || 'Неизвестно'}`,
                        // );
                    }
                });
            }

            if (data.result === 'redirect' && data.redirectTo?.text) {
                // warningNotify(data.redirectTo?.text, 'Готовим редирект!');
            }

            if (data.result === 'logout') {
                logout();
            }

            return data;
        },
    });
};

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
                // errorNotify(
                //     SERVER_ERRORS[`e${response.status}`] ||
                //         `Ошибка ${response.statusText || response.status}`,
                //     `Код ошибки: ${response.status}`,
                // );

                if ([401, 403].includes(response?.status)) {
                    logout();
                }

                return null;
            }

            const data: ResponseIF = await response.json();

            if (data.result === 'errors' && data.errors?.length) {
                data.errors.forEach(({ code, fieldName }) => {
                    if (!fieldName) {
                        // errorNotify(
                        //     ERRORS[code] ||
                        //         `Код ошибки: ${code || 'Неизвестно'}`,
                        // );
                    }
                });
            }

            if (data.result === 'redirect' && data.redirectTo?.text) {
                // warningNotify(data.redirectTo?.text, 'Готовим редирект!');
            }

            if (data.result === 'logout') {
                logout();
            }

            return data;
        },
    });
};

export const fetchJWTTokenQuery = () => {
    return fetchBaseQuery({
        baseUrl: ADDRESS.WP_JWT_API_URL,
        responseHandler: async (response): Promise<ResponseIF | null> => {
            if (response?.status !== 200) {
                // errorNotify(ERRORS.er209);

                if ([401, 403].includes(response?.status)) {
                    logout();
                }

                return null;
            }

            return await response.json();
        },
    });
};
