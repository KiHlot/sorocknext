import { DateWithTimeT } from '@/types/common';
import { AuthorIF } from '@/types/post';

export interface LastNewsPromoCardModelIF {
    title: string;
    url: string;
    innerImg: string;
    postDate: DateWithTimeT;
    country: string;
    readingTime: number;
    author: AuthorIF | null;
}

export interface LastNewsPromoCardPropsIF {
    item: LastNewsPromoCardModelIF;
    coverTone: number;
    index: number;
    className?: string;
}
