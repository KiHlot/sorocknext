export type ResponseResultT = 'ok' | 'errors' | 'redirect' | 'logout';

export type ResponseErrorIF = {
    code: string;
    fieldName?: string;
    addInfo?: string;
};

export type ResponseRedirectToIF = {
    url: string;
    text?: string;
};

export interface ResponseIF<DataIF = any> {
    result: ResponseResultT;
    data: DataIF | null;
    errors?: ResponseErrorIF[];
    redirectTo?: ResponseRedirectToIF;
}
