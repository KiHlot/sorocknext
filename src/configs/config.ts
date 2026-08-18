const API_DOMAIN = process.env.NEXT_PUBLIC_DOMEN_URL;

export const ADDRESS = {
    WP_AJAX_URL: `${API_DOMAIN}${process.env.NEXT_PUBLIC_AJAX_URL}`,
    WP_API_URL: `${API_DOMAIN}${process.env.NEXT_PUBLIC_REST_BASE}`,
    WP_JWT_API_URL: `${API_DOMAIN}${process.env.NEXT_PUBLIC_JWT_BASE}`,
};

export const TIME_FORMAT = {
    backDateWithTime: 'YYYY-MM-DD HH:mm:ss',
    dateUi: 'DD.MM.YYYY',
    dateWithTime: 'DD.MM.YYYY HH:mm',
    cookie: 'DD.MM.YYYY HH:mm:ss',
};
