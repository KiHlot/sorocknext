export interface UserMetricsIF {
    firstName: string;
    lastName: string;
    birthdate: string | null;
    country: string | null;
}

export interface UserContactsIF {
    email: string | null;
    tgLogin: string | null;
}

export interface UserActivityIF {
    registrationDate: string;
    isActivated: boolean;
}

export interface UserIF {
    userId: number;
    userLogin: string;
    avatarUrl: string | null;
    role: string | null;
    userUrl: string;
    metrics: UserMetricsIF;
    contacts: UserContactsIF;
    activity: UserActivityIF;
}

export interface CurrentUserIF {
    userId: number;
    role: string | null;
    fullName: string;
    avatarUrl: string | null;
    isActivated: boolean;
}
