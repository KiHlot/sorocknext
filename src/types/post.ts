import { HTMLString, LinkIF, OptionIF } from '@/types/common';

export interface PostArchiveIF {
    defaultData: LinkIF[];
}

export interface AuthorIF {
    img80?: string | null;
    fullName: string;
    url?: string;
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
        categories: string[] | null;
    };
}

export interface PostIF {
    postBase: PostBaseIF;
}
