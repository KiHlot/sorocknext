import { ReactElement } from 'react';

export type HTMLString = string;
export type NormalizeImageTypeT = 'user80' | 'user250' | 'user500';
export type CallBackTypeT = 'logout';
export type ValidatorT = {
    [index: string]: Partial<ValidatorModeIF>;
};
export type ElemVariantT =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger';

interface ValidatorModeIF {
    accept: string[];
    maxSize: number;
    minLength: number;
    maxLength: number;
}

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
        [key: string]: string | undefined;
    }>;
}

export interface MenuItemIF {
    url: string;
    label: string;
    icon?: ReactElement;
    hasBorder?: boolean;
    callBackType?: CallBackTypeT;
}

export type DirectionT = 'desc' | 'asd';

export interface FilterIF {
    page: number;
    column: string;
    direction: DirectionT;
}

export interface NormalizeFilterIF {
    page?: number | string | null;
    column?: string | null;
    direction?: string | DirectionT | null;
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
