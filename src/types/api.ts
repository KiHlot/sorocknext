import { ValueOf } from '@/types/common';

export const RESPONSE_RESULT = {
    Ok: 'ok',
    Errors: 'errors',
    Redirect: 'redirect',
    Logout: 'logout',
    NotFound: 'notfound',
} as const;

export type ResponseErrorIF = {
    code: string;
    fieldName?: string;
    addInfo?: string;
};

export interface ResponseIF<DataIF = null> {
    result: ValueOf<typeof RESPONSE_RESULT>;
    data: DataIF | null;
    errors?: ResponseErrorIF[];
    redirectUrl?: string;
}
