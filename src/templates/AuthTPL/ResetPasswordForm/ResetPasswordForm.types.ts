import { ActivateUserIF } from '@/api/auth/types';

export type FieldsNames = 'password' | 'passwordConfirm';

export interface ResetPasswordFormIF {
    password: string;
    passwordConfirm: string;
}

export interface ResetPasswordFormPropsIF {
    creeds: ActivateUserIF;
}
