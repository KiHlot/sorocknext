import { PaginationIF } from '@/types/common';

export interface PaginationPropsIF {
    pagination: PaginationIF | null;
    getPageHref?: (page: number) => string;
}
