export type ResponseResultT = 'ok' | 'errors' | 'redirect' | 'logout';

export type ResponseErrorIF = {
    code: string;
    fieldName?: string;
    addInfo?: string;
};

export interface ResponseIF<DataIF = null> {
    result: ResponseResultT;
    data: DataIF | null;
    errors?: ResponseErrorIF[];
    redirectUrl?: string;
}
