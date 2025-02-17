export interface LoginResponseIF {
    token: string;
    expired: string;
}

export interface LoginFieldsReqIF {
    username: string;
    password: string;
}
