import { HTMLString, LinkIF, OptionIF } from '@/types/common';
import { AuthorIF } from '@/components/elems/Author/Author.types';

export interface PostArchiveIF {
    defaultData: LinkIF[];
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
    postBase: PostBaseIF;
}
