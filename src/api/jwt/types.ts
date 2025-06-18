import { CurrentUserIF } from '@/types/user';

export interface UserLoginResponseIF {
    token: string;
    expired: string;
    currentUser: CurrentUserIF;
}

export interface LoginFieldsReqIF {
    username: string;
    password: string;
}
