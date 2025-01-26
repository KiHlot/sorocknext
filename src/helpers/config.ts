const API_DOMAIN =
    process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_API_ENDPOINT_DEV
        : process.env.NEXT_PUBLIC_API_ENDPOINT_PROD;

export const ADDRESS = {
    WP_AJAX_URL: `${API_DOMAIN}${process.env.NEXT_PUBLIC_AJAX_BASE}`,
    WP_API_URL: `${API_DOMAIN}${process.env.NEXT_PUBLIC_REST_BASE}`,
    WP_JWT_API_URL: `${API_DOMAIN}${process.env.NEXT_PUBLIC_REST_BASE}/jwt-auth/v1`,
};

export const POINTINT = {
    xxs: 340,
    xs: 420,
    sm: 576,
    md: 768,
    xmd: 890,
    lg: 992,
    xl: 1200,
    xxl: 1500,
    xxxl: 1700,
};

export const TIME_FORMAT = {
    common: 'YYYY-MM-DD HH:mm:ss',
    previewWithTime: 'DD-MM-YYYY HH:mm',
};

export const EMAIL = {
    common: 'YYYY-MM-DD HH:mm:ss',
};
