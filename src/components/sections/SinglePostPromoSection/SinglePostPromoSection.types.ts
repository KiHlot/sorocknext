import { AuthorIF } from '@/components/elems/Author/Author.types';
import { OptionIF } from '@/types/common';

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

export interface SinglePostPromoSectionPropsIF {
    data?: PromoSectionIF | null;
}
