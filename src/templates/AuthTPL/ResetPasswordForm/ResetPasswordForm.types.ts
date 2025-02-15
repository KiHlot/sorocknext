import { ActivateUserIF } from '@/api/authApi/types';

export type FieldsNames = 'password' | 'passwordConfirm';

export interface ResetPasswordFormIF {
    password: string;
    passwordConfirm: string;
}

export interface ResetPasswordFormPropsIF {
    creeds: ActivateUserIF;
}
