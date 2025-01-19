export type FileInputT = 'image';

export type ImageTypeT = 'AVATAR' | 'AVATAR_MINI' | 'INFO';

export type CookieOptionsT = {
    expires?: Date | string | number;
    path?: string;
    domain?: string;
    secure?: boolean;
    samesite?: 'Strict' | 'Lax' | 'None';
};

export interface ValidatorModeIF {
    accept: string[];
    maxSize: number;
    minLength: number;
    maxLength: number;
}

export type ValidatorT = {
    [index: string]: Partial<ValidatorModeIF>;
};
