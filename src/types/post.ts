import { AuthorIF } from '@/components/elems/Author/Author.types';
import { HTMLString, OptionIF } from '@/types/common';

export interface PromoSectionIF {
    innerImg: string | null;
    titleH1: string;
    titleSeo: string;
    postDate: string;
    author: AuthorIF;
    country: string;
    tagsList: OptionIF[] | null;
    readingTime: number;
}

export interface SinglePostIF {
    promoSection: PromoSectionIF | null;
    content: HTMLString;
}
