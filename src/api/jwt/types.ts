import { CurrentUserIF } from '@/types/user';

export interface UserLoginResponseIF {
    token: string;
    expired: string;
    currentUser: CurrentUserIF;
}

export interface LoginFieldsRequestIF {
    username: string;
    password: string;
}
