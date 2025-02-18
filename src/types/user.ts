export type UserRoleT = 'lobby' | 'member' | 'editor' | 'admin';
export type SoclinkT = 'vk' | 'in' | 'fb' | 'tt' | 'yt';

export interface UserMetricsIF {
    firstName: string;
    lastName: string;
    birthdate: string | null;
    country: string | null;
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
