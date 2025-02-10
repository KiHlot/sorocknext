export type CookieOptionsT = {
    expires?: Date | string | number;
    path?: string;
    domain?: string;
    secure?: boolean;
    samesite?: 'Strict' | 'Lax' | 'None';
};

export interface OptionIF {
    label: string;
    value: string;
}

export interface TagIF {
    id: number;
    slug: string;
    name: string;
    coverImg: string | null;
    innerImg: string | null;
    postsCount: number;
}

export interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}


