import { LinkIF } from '@/types/common';

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
        images?: {url: string}[];
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
