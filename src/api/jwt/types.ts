export interface LoginUserResponseIF {
    token: string;
    expires: number;
}

export interface LoginUserIF {
    username: string;
    password: string;
}
