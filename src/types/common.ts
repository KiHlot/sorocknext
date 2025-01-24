export type CookieOptionsT = {
    expires?: Date | string | number;
    path?: string;
    domain?: string;
    secure?: boolean;
    samesite?: 'Strict' | 'Lax' | 'None';
};

export interface OptionIF {
    label: string;
    value: string;
}
