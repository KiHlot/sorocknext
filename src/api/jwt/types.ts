import { ProfileIF } from '@/types/user';

export interface UserLoginResponseIF {
    token: string;
    expired: string;
    profileData: ProfileIF;
}

export interface LoginFieldsReqIF {
    username: string;
    password: string;
}
