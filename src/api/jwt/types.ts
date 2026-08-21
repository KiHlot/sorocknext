import { CurrentUserIF } from '@/types/user';

export interface LoginUserResponseIF {
    token: string;
    expires: string;
    currentUser: CurrentUserIF;
}

export interface LoginUserIF {
    username: string;
    password: string;
}
