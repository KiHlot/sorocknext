import { HTMLString, OptionIF } from '@/types/common';
import { AuthorIF } from '@/components/elems/Author/Author.types';

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

export interface PostBaseIF {
    author: AuthorIF;
    innerImg: string | null;
    country: string;
    settings: {
        readingTime: number;
    };
    main: {
        titleH1: string;
        titleSeo: string;
        postDate: string;
        content: HTMLString;
    };
    taxonomies: {
        tags: OptionIF[] | null;
        categories: OptionIF[] | null;
    };
}

export interface PostIF {
    promoSection: PromoSectionIF | null; //todo remove
    content: HTMLString; //todo remove
    postBase: PostBaseIF;
}
