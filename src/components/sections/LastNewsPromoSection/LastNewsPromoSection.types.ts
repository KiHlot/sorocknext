import { DateWithTimeT, OptionIF } from '@/types/common';

export interface LastNewsPromoDataIF {
    titleH1: string;
    content: string;
    author: string | null;
    innerImg: string;
    country: string;
    readingTime: number;
    postDate: DateWithTimeT;
    tags: OptionIF[] | null;
    taxonomies: string[] | null;
}

export interface LastNewsPromoSectionPropsIF {
    lastNewsPromoData: LastNewsPromoDataIF[];
}
