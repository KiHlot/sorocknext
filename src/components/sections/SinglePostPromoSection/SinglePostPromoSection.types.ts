import { AuthorIF } from '@/components/elems/Author/Author.types';
import { OptionIF } from '@/types/common';

export interface PromoSectionIF {
    innerImg: string | null;
    title: string;
    postDate: string;
    author: AuthorIF;
    country: string;
    tagsList: OptionIF[] | null;
}

export interface SinglePostPromoSectionPropsIF {
    data?: PromoSectionIF | null;
}
