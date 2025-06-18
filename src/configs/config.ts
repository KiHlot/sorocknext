const API_DOMAIN =
    process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_API_ENDPOINT_DEV
        : process.env.NEXT_PUBLIC_API_ENDPOINT_PROD;

export const ADDRESS = {
    WP_AJAX_URL: `${API_DOMAIN}${process.env.NEXT_PUBLIC_AJAX_BASE}`,
    WP_API_URL: `${API_DOMAIN}${process.env.NEXT_PUBLIC_REST_BASE}`,
    WP_JWT_API_URL: `${API_DOMAIN}${process.env.NEXT_PUBLIC_JWT_BASE}/jwt-auth/v1`,
};

export const TIME_FORMAT = {
    backDateWithTime: 'YYYY-MM-DD HH:mm:ss',
    dateUi: 'DD.MM.YYYY',
    dateWithTime: 'DD-MM-YYYY HH:mm',
    cookie: 'DD.MM.YYYY HH:mm:ss',
};
