export type UserRoleT =
    | 'lobby'
    | 'member'
    | 'editor'
    | 'admin'
    | 'administrator';
export type SoclinkT = 'vk' | 'in' | 'fb' | 'tt' | 'yt';

export interface UserMetricsIF {
    firstName: string;
    lastName: string;
    birthdate: string | null;
    country: string;
    city: string | null;
}

export interface UserContactsIF {
    emailPublic: string | null;
    phone: string | null;
    tgLogin: string | null;
    waLogin: string | null;
}

export type SocLinksIF = { [key in SoclinkT]: string | null }[];

export interface UserActivity {
    registrationDate: string;
    lastActivity: string;
    isActivated: boolean;
    isCookieAccepted: boolean;
}

export interface UserIF {
    userId: number;
    userLogin: string;
    avatarUrl: string | null;
    role: UserRoleT;
    userUrl: string;
    metrics: UserMetricsIF;
    contacts: UserContactsIF;
    socLinks: SocLinksIF;
    activity: UserActivity;
}

export interface ProfileIF {
    userId: number;
    role: UserRoleT;
    fullName: string;
    avatarUrl: string | null;
}
