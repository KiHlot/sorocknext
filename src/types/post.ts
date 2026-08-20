import { HTMLString, LinkIF, OptionIF } from '@/types/common';
import { AuthorIF } from '@/components/elems/Author/Author.types';

export interface PostArchiveIF {
    defaultData: LinkIF[];
}

export interface SeoData {
    title: string;
    description: string;
    canonical: string;
    innerImg?: string;
    dateGmt: string;
    modifiedGmt: string;
    author: string;
    tags?: string[];
}

export interface Metadata {
    title: string;
    description: string;
    alternates: {
        canonical: string;
    };
    metadataBase: URL;
    openGraph: {
        title: string;
        description: string;
        url: string;
        images?: { url: string }[];
        type: string;
        publishedTime: string;
        modifiedTime: string;
        authors: string[];
        tags: string;
        locale: string;
        siteName: string;
    };
    twitter: {
        card: 'summary_large_image';
        title: string;
        description: string;
        images?: string[];
    };
    verification: {
        yandex: string;
    };
    other: {
        'article:publisher': string;
    };
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
