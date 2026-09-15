export interface RegistrationFieldsIF {
    name: string;
    surname: string;
    loginEmail: string;
    password: string;
    passwordConfirm: string;
}

export interface ConfirmEmailIF {
    confirmCode: string;
}

export interface SendResetPasswordCodeMailIF {
    email: string;
}

export interface ResetPasswordIF {
    confirmCode: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export interface SendConfirmCodeMailIF {
    email: string;
}
