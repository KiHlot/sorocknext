export interface RegistrationFieldsReqIF {
    name: string;
    surname: string;
    loginEmail: string;
    password: string;
    passwordConfirm: string;
}

export interface ResetPasswordIF {
    confirmCode: string;
    email: string;
    password: string;
    passwordConfirm: string;
}
