export interface RegistrationFieldsReqIF {
    name: string;
    surname: string;
    loginEmail: string;
    password: string;
    passwordConfirm: string;
}

export interface ActivateUserIF {
    activateCode: string;
    userId: number;
}

export interface ResetPasswordIF extends ActivateUserIF {
    password: string;
    passwordConfirm: string;
}
