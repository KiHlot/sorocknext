import { ReactElement } from 'react';

export type HTMLString = string;

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

export interface SearchParamsIF {
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
}

export interface MenuItemIF {
    url: string;
    label: string;
    icon?: ReactElement;
    hasBorder?: boolean;
}

export interface FilterIF {
    page: number;
    sort?: {
        column: string;
        direction: 'DESC' | 'ASD';
    };
}

export interface PaginationIF {
    pagesCount?: number;
    page: number;
}

export interface FilteredResultIF<DataIF = null> {
    pagination: PaginationIF;
    filteredData: DataIF | null;
    isRedirect: boolean;
}
