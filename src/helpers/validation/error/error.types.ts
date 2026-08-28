import { ValueOfT } from '@/types/common';
import { SERVER_CODES } from '@/helpers/validation/codes/codes.config';

export interface RTQErrorIF {
    data?: string;
    error: string;
    originalStatus?: ValueOfT<typeof SERVER_CODES>;
    status: ValueOfT<typeof SERVER_CODES>;
}

export interface ServerErrorDetailsIF {
    data: {
        code?: string; //[jwt_auth] invalid_username
        message?: string;
        data: {
            status: ValueOfT<typeof SERVER_CODES>;
        };
    };
    status: ValueOfT<typeof SERVER_CODES>;
}

export interface CatchErrorIF {
    status: ValueOfT<typeof SERVER_CODES>;
    message: string;
}
