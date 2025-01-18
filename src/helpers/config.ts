const API_DOMAIN =
    process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_API_ENDPOINT_DEV
        : process.env.NEXT_PUBLIC_API_ENDPOINT_PROD;

export const ADDRESS = {
    WP_AJAX_URL: `${API_DOMAIN}${process.env.NEXT_PUBLIC_AJAX_BASE}`,
    WP_API_URL:`${API_DOMAIN}${process.env.NEXT_PUBLIC_REST_BASE}`,
};
