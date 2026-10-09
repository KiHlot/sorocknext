import { DateWithTimeT } from '@/types/common';

export interface LastNewsPromoCardModelIF {
    title: string;
    url: string;
    innerImg: string | null;
    postDate: DateWithTimeT | null;
    country: string;
    readingTime: number;
    author: string | null;
}

export interface LastNewsPromoCardPropsIF {
    item: LastNewsPromoCardModelIF;
    coverTone: number;
    index: number;
    className?: string;
}
